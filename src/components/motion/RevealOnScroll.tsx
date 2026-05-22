"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, easings, durations } from "@/lib/motion/gsap-config";
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
  duration,
  className,
  as: Component = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const isMobile = window.innerWidth < 768;
      const dur = duration ?? (isMobile ? 0.5 : durations.standard);
      const distance = isMobile ? 30 : direction === "up" ? 60 : 80;

      const fromVars: gsap.TweenVars = {
        opacity: 0,
        duration: dur,
        delay: isMobile ? Math.min(delay, 0.1) : delay,
        ease: easings.industrial,
      };

      if (direction === "up") {
        fromVars.y = distance;
      } else if (direction === "left") {
        fromVars.x = -distance;
      } else if (direction === "right") {
        fromVars.x = distance;
      }

      gsap.from(ref.current, {
        ...fromVars,
        scrollTrigger: {
          trigger: ref.current,
          start: isMobile ? "top 92%" : "top 85%",
          toggleActions: "play none none none",
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
