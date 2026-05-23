"use client";

import { createContext, useEffect, useState } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    // Force scroll to top on mount
    window.scrollTo(0, 0);

    if (isTouch) {
      Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]).then(([gsapModule, stModule]) => {
        const gsap = gsapModule.default;
        const { ScrollTrigger } = stModule;
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.refresh();
      });
      return;
    }

    // Desktop: Lenis smooth scroll
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
      import("@/lib/motion/lenis-config"),
    ]).then(([gsapModule, stModule, lenisModule, configModule]) => {
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      const LenisClass = lenisModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenisInstance = new LenisClass(configModule.lenisConfig);
      setLenis(lenisInstance);

      lenisInstance.on("scroll", ScrollTrigger.update);

      const rafCallback = (time: number) => {
        lenisInstance.raf(time * 1000);
      };
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);

      // Store cleanup data
      (window as unknown as Record<string, unknown>).__lenisCleanup = { gsap, rafCallback, lenisInstance };
    });

    return () => {
      const cleanup = (window as unknown as Record<string, unknown>).__lenisCleanup as {
        gsap: typeof import("gsap").gsap;
        rafCallback: (time: number) => void;
        lenisInstance: Lenis;
      } | undefined;
      if (cleanup) {
        cleanup.gsap.ticker.remove(cleanup.rafCallback);
        cleanup.lenisInstance.destroy();
      }
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
