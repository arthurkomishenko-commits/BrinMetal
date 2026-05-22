"use client";

import { useRef, useCallback } from "react";
import { gsap } from "@/lib/motion/gsap-config";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0-1, default 0.3
  as?: React.ElementType;
}

export function MagneticElement({
  children,
  className,
  strength = 0.3,
  as: Component = "div",
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("lg");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktop || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(ref.current, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    [isDesktop, strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop || !ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, [isDesktop]);

  return (
    <Component
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Component>
  );
}
