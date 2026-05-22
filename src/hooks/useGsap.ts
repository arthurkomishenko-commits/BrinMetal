"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGsapOptions {
  scope?: React.RefObject<HTMLElement | null>;
  dependencies?: unknown[];
}

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
