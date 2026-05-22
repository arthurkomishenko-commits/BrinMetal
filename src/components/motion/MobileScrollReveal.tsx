"use client";

import { useEffect } from "react";

/**
 * Uses IntersectionObserver to add 'in-view' class to [data-assemble]
 * elements when they scroll into view. CSS handles the actual animation.
 * This is the mobile fallback -- works on all browsers, no GSAP needed.
 */
export function MobileScrollReveal() {
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (!isTouch) return;

    const elements = document.querySelectorAll("[data-assemble]");
    if (!elements.length) return;

    // Reset: pause animations until element is in view
    elements.forEach((el) => {
      (el as HTMLElement).style.animationPlayState = "paused";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationPlayState = "running";
          } else {
            // Reset animation when out of view (for bidirectional)
            const el = entry.target as HTMLElement;
            el.style.animation = "none";
            // Force reflow
            void el.offsetHeight;
            el.style.animation = "";
            el.style.animationPlayState = "paused";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
