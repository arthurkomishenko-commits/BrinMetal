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

    // Mobile: public/scroll-reveal.js handles all animations
    if (isTouch) return;

    // Desktop: GSAP scrub-based assemble/disassemble
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, stModule]) => {
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);

      elements.forEach((el) => {
        el.setAttribute("data-gsap", "true");
        (el as HTMLElement).style.transition = "none";
      });

      const dist = 45;
      const groups = new Map<number, Element[]>();
      elements.forEach((el) => {
        const d = parseInt(el.getAttribute("data-assemble-delay") || "0", 10);
        if (!groups.has(d)) groups.set(d, []);
        groups.get(d)!.push(el);
      });
      const sortedKeys = Array.from(groups.keys()).sort((a, b) => a - b);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.2,
          },
        });

        sortedKeys.forEach((key, gi) => {
          groups.get(key)!.forEach((el) => {
            const dir = el.getAttribute("data-assemble") || "up";
            const from: gsap.TweenVars = { opacity: 0 };
            const to: gsap.TweenVars = { opacity: 1, duration: 0.4 };
            switch (dir) {
              case "left":  from.x = -dist; to.x = 0; break;
              case "right": from.x = dist;  to.x = 0; break;
              case "scale": from.scale = 0.92; to.scale = 1; break;
              case "line":  from.scaleX = 0; to.scaleX = 1; break;
              default:      from.y = dist;   to.y = 0; break;
            }
            gsap.set(el, from);
            tl.to(el, to, gi * 0.03);
          });
        });

        [...sortedKeys].reverse().forEach((key, gi) => {
          groups.get(key)!.forEach((el) => {
            const dir = el.getAttribute("data-assemble") || "up";
            const exit: gsap.TweenVars = { opacity: 0, duration: 0.4 };
            switch (dir) {
              case "left":  exit.x = dist;    break;
              case "right": exit.x = -dist;   break;
              case "scale": exit.scale = 0.92; break;
              case "line":  exit.scaleX = 0;   break;
              default:      exit.y = -dist;    break;
            }
            tl.to(el, exit, 0.6 + gi * 0.03);
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
