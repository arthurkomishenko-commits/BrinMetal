"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, defaultScrollTriggerConfig, easings, durations } from "@/lib/motion/gsap-config";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  as?: React.ElementType;
}

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = durations.standard,
  className,
  as: Component = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const fromVars: gsap.TweenVars = {
        opacity: 0,
        duration,
        delay,
        ease: easings.industrial,
      };

      if (direction === "up") {
        fromVars.y = 60;
      } else if (direction === "left") {
        fromVars.x = -80;
      } else if (direction === "right") {
        fromVars.x = 80;
      }

      gsap.from(ref.current, {
        ...fromVars,
        scrollTrigger: {
          trigger: ref.current,
          ...defaultScrollTriggerConfig,
        },
      });
    },
    { scope: ref }
  );

  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  );
}
