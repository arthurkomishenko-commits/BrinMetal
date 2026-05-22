"use client";

import { useEffect } from "react";

/**
 * Adds .revealed class to [data-assemble] elements when they enter the viewport.
 * CSS transitions handle the actual animation. Works on ALL browsers.
 * On desktop, GSAP AssembleSection handles animations instead (scrub-based).
 */
export function MobileScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-assemble]");
    if (!elements.length) return;

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
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
