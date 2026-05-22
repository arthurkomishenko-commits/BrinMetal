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

    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    // Dynamic import to guarantee client-side only execution
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, stModule]) => {
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);

      const elements = section.querySelectorAll("[data-assemble]");
      if (!elements.length) return;

      const mobile = window.innerWidth < 768;
      const dist = mobile ? 25 : 45;

      // Group elements by delay
      const groups = new Map<number, Element[]>();
      elements.forEach((el) => {
        const delay = parseInt(el.getAttribute("data-assemble-delay") || "0", 10);
        if (!groups.has(delay)) groups.set(delay, []);
        groups.get(delay)!.push(el);
      });
      const sortedKeys = Array.from(groups.keys()).sort((a, b) => a - b);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: mobile ? "top 85%" : "top 80%",
            end: mobile ? "bottom 15%" : "bottom 20%",
            scrub: mobile ? 0.6 : 1.2,
          },
        });

        // Phase 1: ASSEMBLE (0% → 40%)
        sortedKeys.forEach((key, groupIndex) => {
          const groupEls = groups.get(key)!;
          groupEls.forEach((el) => {
            const dir = el.getAttribute("data-assemble") || "up";
            const enterFrom: gsap.TweenVars = { opacity: 0 };
            const enterTo: gsap.TweenVars = { opacity: 1, duration: 0.4 };

            switch (dir) {
              case "left":
                enterFrom.x = -dist;
                enterTo.x = 0;
                break;
              case "right":
                enterFrom.x = dist;
                enterTo.x = 0;
                break;
              case "scale":
                enterFrom.scale = 0.92;
                enterTo.scale = 1;
                break;
              case "line":
                enterFrom.scaleX = 0;
                enterTo.scaleX = 1;
                break;
              default:
                enterFrom.y = dist;
                enterTo.y = 0;
                break;
            }

            gsap.set(el, enterFrom);
            const offset = groupIndex * 0.03;
            tl.to(el, enterTo, offset);
          });
        });

        // Phase 3: DISASSEMBLE (60% → 100%)
        const reverseKeys = [...sortedKeys].reverse();
        reverseKeys.forEach((key, groupIndex) => {
          const groupEls = groups.get(key)!;
          groupEls.forEach((el) => {
            const dir = el.getAttribute("data-assemble") || "up";
            const exitTo: gsap.TweenVars = { opacity: 0, duration: 0.4 };

            switch (dir) {
              case "left":
                exitTo.x = dist;
                break;
              case "right":
                exitTo.x = -dist;
                break;
              case "scale":
                exitTo.scale = 0.92;
                break;
              case "line":
                exitTo.scaleX = 0;
                break;
              default:
                exitTo.y = -dist;
                break;
            }

            const offset = 0.6 + groupIndex * 0.03;
            tl.to(el, exitTo, offset);
          });
        });
      }, section);
    });

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    // @ts-expect-error -- dynamic tag
    <Tag ref={ref} id={id} className={cn(className)}>
      {children}
    </Tag>
  );
}
