"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
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
  const [gsap, setGsap] = useState<typeof import("gsap").gsap | null>(null);

  useEffect(() => {
    if (isDesktop) {
      import("gsap").then((mod) => setGsap(mod.default));
    }
  }, [isDesktop]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktop || !ref.current || !gsap) return;
      const rect = ref.current.getBoundingClientRect();
      const deltaX = (e.clientX - rect.left - rect.width / 2) * strength;
      const deltaY = (e.clientY - rect.top - rect.height / 2) * strength;
      gsap.to(ref.current, { x: deltaX, y: deltaY, duration: 0.4, ease: "power3.out" });
    },
    [isDesktop, strength, gsap]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop || !ref.current || !gsap) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  }, [isDesktop, gsap]);

  return (
    <Component ref={ref} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </Component>
  );
}
