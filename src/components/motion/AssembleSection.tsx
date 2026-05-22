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

    // ==========================================
    // MOBILE: CSS transitions + IntersectionObserver
    // ==========================================
    if (isTouch) {
      // Force-reveal elements that are already visible on load
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("revealed");
        }
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
            } else {
              entry.target.classList.remove("revealed");
            }
          });
        },
        { threshold: 0, rootMargin: "50px" }
      );

      elements.forEach((el) => observer.observe(el));

      // Safety net: if after 3s elements are still hidden, force show
      const safety = setTimeout(() => {
        elements.forEach((el) => el.classList.add("revealed"));
      }, 3000);

      return () => {
        observer.disconnect();
        clearTimeout(safety);
      };
    }

    // ==========================================
    // DESKTOP: GSAP scrub-based assemble/disassemble
    // ==========================================
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, stModule]) => {
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);

      // Mark as GSAP-controlled
      elements.forEach((el) => {
        el.setAttribute("data-gsap", "true");
        (el as HTMLElement).style.transition = "none";
      });

      const dist = 45;

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
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.2,
          },
        });

        // ASSEMBLE (0% → 40%)
        sortedKeys.forEach((key, groupIndex) => {
          groups.get(key)!.forEach((el) => {
            const dir = el.getAttribute("data-assemble") || "up";
            const enterFrom: gsap.TweenVars = { opacity: 0 };
            const enterTo: gsap.TweenVars = { opacity: 1, duration: 0.4 };

            switch (dir) {
              case "left":  enterFrom.x = -dist; enterTo.x = 0; break;
              case "right": enterFrom.x = dist;  enterTo.x = 0; break;
              case "scale": enterFrom.scale = 0.92; enterTo.scale = 1; break;
              case "line":  enterFrom.scaleX = 0; enterTo.scaleX = 1; break;
              default:      enterFrom.y = dist;   enterTo.y = 0; break;
            }

            gsap.set(el, enterFrom);
            tl.to(el, enterTo, groupIndex * 0.03);
          });
        });

        // DISASSEMBLE (60% → 100%)
        [...sortedKeys].reverse().forEach((key, groupIndex) => {
          groups.get(key)!.forEach((el) => {
            const dir = el.getAttribute("data-assemble") || "up";
            const exitTo: gsap.TweenVars = { opacity: 0, duration: 0.4 };

            switch (dir) {
              case "left":  exitTo.x = dist;    break;
              case "right": exitTo.x = -dist;   break;
              case "scale": exitTo.scale = 0.92; break;
              case "line":  exitTo.scaleX = 0;   break;
              default:      exitTo.y = -dist;    break;
            }

            tl.to(el, exitTo, 0.6 + groupIndex * 0.03);
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
