"use client";

import { useState, useEffect } from "react";

const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;

type Breakpoint = keyof typeof breakpoints;

/**
 * Responsive breakpoint hook.
 * Accepts a raw media query string or a named breakpoint.
 */
export function useMediaQuery(query: string | Breakpoint): boolean {
  const resolvedQuery =
    query in breakpoints
      ? breakpoints[query as Breakpoint]
      : query;

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(resolvedQuery);
    setMatches(mediaQuery.matches);

    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [resolvedQuery]);

  return matches;
}
