"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let tween: { kill: () => void; scrollTrigger?: { kill: () => void } } | null = null;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, stModule]) => {
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);

      const mobile = window.innerWidth < 768;
      const dist = mobile ? 30 : direction === "up" ? 50 : 70;
      const dur = mobile ? 0.5 : 0.7;
      const d = mobile ? Math.min(delay, 0.05) : delay;

      const fromVars: Record<string, number> = { opacity: 0 };
      if (direction === "up") fromVars.y = dist;
      else if (direction === "left") fromVars.x = -dist;
      else if (direction === "right") fromVars.x = dist;

      gsap.set(el, fromVars);

      tween = gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: dur,
        delay: d,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: mobile ? "top 98%" : "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      if (tween) {
        tween.kill();
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
      }
    };
  }, [direction, delay]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
