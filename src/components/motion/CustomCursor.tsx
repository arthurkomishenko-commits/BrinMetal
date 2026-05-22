"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("lg");

  useEffect(() => {
    if (!isDesktop || !cursorRef.current || !cursorDotRef.current) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let gsap: typeof import("gsap").gsap;

    import("gsap").then((mod) => {
      gsap = mod.default;

      function moveCursor() {
        gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.5, ease: "power3.out" });
        gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.15, ease: "power2.out" });
      }

      function onMouseMove(e: MouseEvent) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        moveCursor();
      }

      function onMouseEnterInteractive() {
        gsap.to(cursor, { scale: 2.5, opacity: 0.15, duration: 0.4, ease: "power3.out" });
        gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power3.out" });
      }

      function onMouseEnterAccent() {
        gsap.to(cursor, { scale: 3, opacity: 0.1, borderColor: "var(--copper)", duration: 0.4, ease: "power3.out" });
        gsap.to(dot, { scale: 0, duration: 0.3, ease: "power3.out" });
      }

      function onMouseLeaveInteractive() {
        gsap.to(cursor, { scale: 1, opacity: 0.4, borderColor: "var(--off-white)", duration: 0.4, ease: "power3.out" });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
      }

      function onMouseLeave() { gsap.to([cursor, dot], { opacity: 0, duration: 0.3 }); }
      function onMouseEnter() { gsap.to(cursor, { opacity: 0.4, duration: 0.3 }); gsap.to(dot, { opacity: 1, duration: 0.3 }); }

      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mouseenter", onMouseEnter);

      function bindElements() {
        document.querySelectorAll("a, button, input, textarea, [data-cursor-interact]").forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnterInteractive);
          el.addEventListener("mouseleave", onMouseLeaveInteractive);
        });
        document.querySelectorAll("[data-cursor-accent]").forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnterAccent);
          el.addEventListener("mouseleave", onMouseLeaveInteractive);
        });
      }

      bindElements();
      const observer = new MutationObserver(bindElements);
      observer.observe(document.body, { childList: true, subtree: true });

      // Store for cleanup
      (cursor as unknown as Record<string, unknown>).__cleanup = () => {
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mouseenter", onMouseEnter);
        observer.disconnect();
      };
    });

    return () => {
      const cleanup = (cursor as unknown as Record<string, unknown>).__cleanup as (() => void) | undefined;
      cleanup?.();
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed top-0 start-0 z-[9999] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[var(--off-white)] opacity-40 mix-blend-difference will-change-transform" style={{ left: 0, top: 0 }} />
      <div ref={cursorDotRef} className="pointer-events-none fixed top-0 start-0 z-[9999] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--copper)] will-change-transform" style={{ left: 0, top: 0 }} />
    </>
  );
}
