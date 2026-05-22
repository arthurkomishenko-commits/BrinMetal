"use client";

import { createContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-config";
import { lenisConfig } from "@/lib/motion/lenis-config";

export const LenisContext = createContext<Lenis | null>(null);

interface SmoothScrollProps {
  children: React.ReactNode;
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // On touch/mobile devices: skip Lenis entirely, use native scroll
    if (isTouchDevice()) {
      // Just make sure ScrollTrigger uses native scroll
      ScrollTrigger.defaults({
        scroller: window,
      });
      ScrollTrigger.refresh();
      return;
    }

    // Desktop: use Lenis smooth scroll
    const lenisInstance = new Lenis(lenisConfig);
    setLenis(lenisInstance);

    // Connect Lenis to ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Sync with GSAP ticker
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
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
