"use client";

import { createContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisConfig } from "@/lib/motion/lenis-config";

// Ensure registration
gsap.registerPlugin(ScrollTrigger);

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

    if (isTouch) {
      // Mobile: no Lenis, native scroll only
      // Just refresh ScrollTrigger after DOM is ready
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
      return;
    }

    // Desktop: Lenis smooth scroll
    const lenisInstance = new Lenis(lenisConfig);
    setLenis(lenisInstance);

    lenisInstance.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
