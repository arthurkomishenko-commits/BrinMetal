"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-config";

interface UseGsapOptions {
  scope?: React.RefObject<HTMLElement | null>;
  dependencies?: unknown[];
}

/**
 * Consistent GSAP hook wrapper for components.
 * Automatically scopes animations and handles cleanup.
 */
export function useGsapAnimation(
  callback: (context: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }) => void,
  options: UseGsapOptions = {}
) {
  const { scope, dependencies = [] } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const scopeRef = scope || containerRef;

  useGSAP(
    () => {
      callback({ gsap, ScrollTrigger });
    },
    {
      scope: scopeRef,
      dependencies,
    }
  );

  return { containerRef: scopeRef };
}

/**
 * Creates a reusable timeline factory scoped to a container.
 */
export function useGsapTimeline(options: UseGsapOptions = {}) {
  const { scope, dependencies = [] } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const scopeRef = scope || containerRef;
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const createTimeline = useCallback((config?: gsap.TimelineVars) => {
    timelineRef.current = gsap.timeline(config);
    return timelineRef.current;
  }, []);

  useGSAP(
    () => {
      return () => {
        timelineRef.current?.kill();
      };
    },
    {
      scope: scopeRef,
      dependencies,
    }
  );

  return { containerRef: scopeRef, createTimeline, timeline: timelineRef };
}
