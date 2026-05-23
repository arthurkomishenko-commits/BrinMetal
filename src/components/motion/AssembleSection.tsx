"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AssembleSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}

export function AssembleSection({
  children,
  className,
  id,
  as: Tag = "section",
}: AssembleSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    const elements = section.querySelectorAll("[data-assemble]");
    if (!elements.length) return;

    // Mobile: CSS transitions handle animations (no GSAP)
    if (isTouch) return;

    // Desktop: GSAP toggleActions (play once, reverse on leave -- NOT scrub)
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, stModule]) => {
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);

      const dist = 40;

      ctx = gsap.context(() => {
        elements.forEach((el) => {
          const dir = el.getAttribute("data-assemble") || "up";
          const delayIdx = parseInt(el.getAttribute("data-assemble-delay") || "0", 10);
          const delay = delayIdx * 0.06;

          const from: gsap.TweenVars = { opacity: 0, duration: 0.7, delay, ease: "power3.out" };

          switch (dir) {
            case "up":    from.y = dist; break;
            case "left":  from.x = -dist; break;
            case "right": from.x = dist; break;
            case "scale": from.scale = 0.92; break;
            case "line":  from.scaleX = 0; delete from.opacity; break;
          }

          gsap.from(el, {
            ...from,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        });
      }, section);
    });

    return () => { ctx?.revert(); };
  }, []);

  return (
    // @ts-expect-error -- dynamic tag
    <Tag ref={ref} id={id} className={cn(className)}>
      {children}
    </Tag>
  );
}
