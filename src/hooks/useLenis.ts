"use client";

import { useContext, useCallback } from "react";
import { LenisContext } from "@/components/motion/SmoothScroll";
import type Lenis from "lenis";

/**
 * Access the Lenis smooth scroll instance.
 */
export function useLenis() {
  const lenis = useContext(LenisContext);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
      }
    ) => {
      if (!lenis) return;
      lenis.scrollTo(target, options);
    },
    [lenis]
  );

  const stop = useCallback(() => {
    lenis?.stop();
  }, [lenis]);

  const start = useCallback(() => {
    lenis?.start();
  }, [lenis]);

  return {
    lenis,
    scrollTo,
    stop,
    start,
  };
}
