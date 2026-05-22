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

    // DEBUG: runs FIRST, before any checks
    let dbg = document.getElementById("dbg-panel");
    if (!dbg) {
      dbg = document.createElement("div");
      dbg.id = "dbg-panel";
      dbg.style.cssText = "position:fixed;bottom:0;left:0;right:0;background:rgba(0,0,0,0.95);color:#0f0;font:11px/1.4 monospace;padding:8px 12px;z-index:99999;max-height:40vh;overflow:auto";
      document.body.appendChild(dbg);
    }

    if (!section) {
      dbg.innerHTML += "section ref: NULL<br>";
      return;
    }

    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    const elements = section.querySelectorAll("[data-assemble]");

    dbg.innerHTML += `[${section.id || "?"}] ref:OK touch:${isTouch} els:${elements.length}<br>`;

    if (!elements.length) return;

    // ==========================================
    // MOBILE: Inline styles + IntersectionObserver
    // Zero CSS dependency. Bulletproof.
    // ==========================================
    if (isTouch) {
      const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

      // DEBUG panel
      let dbg = document.getElementById("dbg-panel");
      if (!dbg) {
        dbg = document.createElement("div");
        dbg.id = "dbg-panel";
        dbg.style.cssText = "position:fixed;bottom:0;left:0;right:0;background:rgba(0,0,0,0.9);color:#0f0;font:11px/1.4 monospace;padding:8px 12px;z-index:99999;max-height:30vh;overflow:auto";
        document.body.appendChild(dbg);
      }
      const sectionId = section.id || "unknown";
      dbg.innerHTML += `[${sectionId}] touch:YES els:${elements.length}<br>`;

      // Step 1: Set hidden state WITHOUT transition (instant, no animation)
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const dir = el.getAttribute("data-assemble") || "up";
        htmlEl.style.transition = "none";
        switch (dir) {
          case "up":    htmlEl.style.opacity = "0"; htmlEl.style.transform = "translateY(30px)"; break;
          case "left":  htmlEl.style.opacity = "0"; htmlEl.style.transform = "translateX(-30px)"; break;
          case "right": htmlEl.style.opacity = "0"; htmlEl.style.transform = "translateX(30px)"; break;
          case "scale": htmlEl.style.opacity = "0"; htmlEl.style.transform = "scale(0.93)"; break;
          case "line":  htmlEl.style.transform = "scaleX(0)"; break;
        }
      });

      // Step 2: Force browser to apply hidden state before adding transitions
      // Without this reflow, browser batches the style changes and skips the animation
      void section.offsetHeight;

      // Step 3: NOW add transitions (after hidden state is painted)
      requestAnimationFrame(() => {
        elements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          const delayIdx = parseInt(el.getAttribute("data-assemble-delay") || "0", 10);
          const delay = Math.min(delayIdx * 0.06, 0.4);
          htmlEl.style.transition = `opacity 0.6s ${easing} ${delay}s, transform 0.6s ${easing} ${delay}s`;
        });
      });

      // Reveal via IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const htmlEl = entry.target as HTMLElement;
            // DEBUG
            const dp = document.getElementById("dbg-panel");
            if (dp) dp.innerHTML += `IO: ${entry.isIntersecting ? "IN" : "OUT"} ${htmlEl.getAttribute("data-assemble")}<br>`;

            if (entry.isIntersecting) {
              htmlEl.style.opacity = "1";
              htmlEl.style.transform = "none";
            } else {
              // Re-hide when leaving viewport
              const dir = htmlEl.getAttribute("data-assemble") || "up";
              switch (dir) {
                case "up":    htmlEl.style.opacity = "0"; htmlEl.style.transform = "translateY(30px)"; break;
                case "left":  htmlEl.style.opacity = "0"; htmlEl.style.transform = "translateX(-30px)"; break;
                case "right": htmlEl.style.opacity = "0"; htmlEl.style.transform = "translateX(30px)"; break;
                case "scale": htmlEl.style.opacity = "0"; htmlEl.style.transform = "scale(0.93)"; break;
                case "line":  htmlEl.style.transform = "scaleX(0)"; break;
              }
            }
          });
        },
        { threshold: 0.05, rootMargin: "20px" }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
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
