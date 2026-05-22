"use client";

import { useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-config";
import { useLenis } from "@/hooks/useLenis";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MagneticElement } from "@/components/motion/MagneticElement";

export function HeroSection() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();
  const isDesktop = useMediaQuery("lg");

  // Mouse parallax on hero layers
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktop || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left - centerX;
      const mouseY = e.clientY - rect.top - centerY;

      // Grid moves opposite to cursor (depth effect)
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          x: mouseX * -0.02,
          y: mouseY * -0.02,
          duration: 1,
          ease: "power2.out",
        });
      }

      // Content moves slightly with cursor
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          x: mouseX * 0.008,
          y: mouseY * 0.005,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    },
    [isDesktop]
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.6 });

      // Accent line draws in
      tl.from("[data-hero-line]", {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });

      // Title reveals with weight
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

      // Subtitle
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

      // CTA
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

      // Scroll indicator
      tl.from(
        "[data-hero-scroll]",
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.1"
      );

      // Parallax on scroll
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

      // Fade out on scroll
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
      onMouseMove={handleMouseMove}
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--graphite)] via-[var(--graphite)] to-[var(--gunmetal)]" />

        {/* Subtle grid pattern -- moves with mouse */}
        <div
          ref={gridRef}
          className="absolute -inset-10 opacity-[0.03] will-change-transform"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Copper accent gradient */}
        <div className="absolute bottom-0 start-0 w-1/2 h-1/3 bg-gradient-to-tr from-[var(--copper)]/[0.04] to-transparent" />

        {/* Top right subtle glow */}
        <div className="absolute top-0 end-0 w-1/3 h-1/3 bg-gradient-to-bl from-white/[0.01] to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        data-hero-content
        className="container-wide relative z-10 pt-24 md:pt-32 will-change-transform"
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

        {/* CTA -- magnetic */}
        <div data-hero-cta className="mt-10 md:mt-12 flex items-center gap-4">
          <MagneticElement strength={0.25}>
            <button
              data-cursor-accent
              onClick={handleCTAClick}
              className="group relative px-8 py-3.5 bg-[var(--copper)] text-[var(--graphite)] text-[13px] uppercase tracking-[0.1em] font-semibold overflow-hidden transition-transform duration-300 active:scale-[0.98]"
            >
              <span className="relative z-10">{t("cta")}</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]" />
            </button>
          </MagneticElement>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="absolute bottom-8 start-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--copper)] to-transparent animate-pulse" />
      </div>

      {/* Side accent */}
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
