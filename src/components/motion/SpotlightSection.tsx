"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface SpotlightSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  color?: string;
  size?: number;
  intensity?: number;
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
  const [gsap, setGsap] = useState<typeof import("gsap").gsap | null>(null);

  useEffect(() => {
    if (isDesktop) {
      import("gsap").then((mod) => setGsap(mod.default));
    }
  }, [isDesktop]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktop || !ref.current || !spotlightRef.current || !gsap) return;
      const rect = ref.current.getBoundingClientRect();
      gsap.to(spotlightRef.current, {
        x: e.clientX - rect.left - size / 2,
        y: e.clientY - rect.top - size / 2,
        opacity: intensity,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    [isDesktop, size, intensity, gsap]
  );

  const handleMouseLeave = useCallback(() => {
    if (!spotlightRef.current || !gsap) return;
    gsap.to(spotlightRef.current, { opacity: 0, duration: 0.8, ease: "power2.out" });
  }, [gsap]);

  return (
    <Component ref={ref} className={cn("relative overflow-hidden", className)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div ref={spotlightRef} className="pointer-events-none absolute opacity-0 will-change-transform" style={{ width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }} />
      {children}
    </Component>
  );
}
