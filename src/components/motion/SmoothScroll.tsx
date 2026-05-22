"use client";

import { createContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-config";
import { lenisConfig } from "@/lib/motion/lenis-config";

export const LenisContext = createContext<Lenis | null>(null);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis(lenisConfig);
    setLenis(lenisInstance);

    // Connect Lenis scroll to ScrollTrigger -- critical for GSAP animations
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Sync Lenis with GSAP ticker
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(lenisInstance.raf);
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
