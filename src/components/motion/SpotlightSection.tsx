"use client";

import { useRef, useCallback } from "react";
import { gsap } from "@/lib/motion/gsap-config";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface SpotlightSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  color?: string; // CSS color for the spotlight
  size?: number; // radius in px
  intensity?: number; // 0-1
}

export function SpotlightSection({
  children,
  className,
  as: Component = "div",
  color = "var(--copper)",
  size = 400,
  intensity = 0.06,
}: SpotlightSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("lg");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktop || !ref.current || !spotlightRef.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(spotlightRef.current, {
        x: x - size / 2,
        y: y - size / 2,
        opacity: intensity,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    [isDesktop, size, intensity]
  );

  const handleMouseLeave = useCallback(() => {
    if (!spotlightRef.current) return;

    gsap.to(spotlightRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <Component
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight gradient that follows cursor */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute opacity-0 will-change-transform"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />
      {children}
    </Component>
  );
}
