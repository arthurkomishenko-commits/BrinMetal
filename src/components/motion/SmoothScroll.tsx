"use client";

import { createContext } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <LenisContext.Provider value={null}>{children}</LenisContext.Provider>
  );
}
