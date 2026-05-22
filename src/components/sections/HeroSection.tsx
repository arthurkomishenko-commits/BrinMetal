"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-config";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.6 });

      // Accent line draws in
      tl.from("[data-hero-line]", {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });

      // Title reveals line by line
      tl.from(
        "[data-hero-title] > span",
        {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
        },
        "-=0.3"
      );

      // Subtitle fades in
      tl.from(
        "[data-hero-subtitle]",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // CTA slides up
      tl.from(
        "[data-hero-cta]",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

      // Scroll indicator fades in
      tl.from(
        "[data-hero-scroll]",
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.1"
      );

      // Parallax on scroll -- title moves up slowly
      gsap.to("[data-hero-content]", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Fade out hero on scroll
      gsap.to(containerRef.current, {
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  function handleCTAClick() {
    const el = document.querySelector("#contact");
    if (el) {
      scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
    }
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--graphite)] via-[var(--graphite)] to-[var(--gunmetal)]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Copper accent gradient -- very subtle */}
        <div className="absolute bottom-0 start-0 w-1/2 h-1/3 bg-gradient-to-tr from-[var(--copper)]/[0.04] to-transparent" />
      </div>

      {/* Content */}
      <div
        data-hero-content
        className="container-wide relative z-10 pt-24 md:pt-32"
      >
        {/* Accent line */}
        <div
          data-hero-line
          className="w-16 h-[2px] bg-[var(--copper)] mb-8 origin-start"
        />

        {/* Title */}
        <h1
          data-hero-title
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--off-white)] max-w-4xl"
        >
          <span className="block overflow-hidden">
            <span className="block">{t("title")}</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          data-hero-subtitle
          className="mt-6 md:mt-8 text-lg md:text-xl text-[var(--titanium)] leading-relaxed max-w-2xl"
        >
          {t("subtitle")}
        </p>

        {/* CTA */}
        <div data-hero-cta className="mt-10 md:mt-12 flex items-center gap-4">
          <button
            onClick={handleCTAClick}
            className="group relative px-8 py-3.5 bg-[var(--copper)] text-[var(--graphite)] text-[13px] uppercase tracking-[0.1em] font-semibold overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">{t("cta")}</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]" />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="absolute bottom-8 start-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--copper)] to-transparent animate-pulse" />
      </div>

      {/* Side accent -- vertical text */}
      <div className="absolute end-6 md:end-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <span
          className="text-[10px] uppercase tracking-[0.3em] text-[var(--titanium)]/30 font-medium"
          style={{ writingMode: "vertical-rl" }}
        >
          Est. 2004 — Engineering Excellence
        </span>
      </div>
    </section>
  );
}
