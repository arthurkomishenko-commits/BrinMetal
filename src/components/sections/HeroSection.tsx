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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktop || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left - centerX;
      const mouseY = e.clientY - rect.top - centerY;

      if (gridRef.current) {
        gsap.to(gridRef.current, {
          x: mouseX * -0.02,
          y: mouseY * -0.02,
          duration: 1,
          ease: "power2.out",
        });
      }

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
      const isMobile = window.innerWidth < 768;
      const tl = gsap.timeline({ delay: isMobile ? 0.2 : 0.5 });

      tl.from("[data-hero-line]", {
        scaleX: 0,
        duration: isMobile ? 0.5 : 0.8,
        ease: "power3.inOut",
      });

      tl.from(
        "[data-hero-title] > span",
        {
          y: isMobile ? 30 : 60,
          opacity: 0,
          duration: isMobile ? 0.6 : 0.9,
          ease: "power4.out",
          stagger: isMobile ? 0.06 : 0.1,
        },
        "-=0.2"
      );

      tl.from(
        "[data-hero-subtitle]",
        {
          y: isMobile ? 15 : 25,
          opacity: 0,
          duration: isMobile ? 0.5 : 0.7,
          ease: "power3.out",
        },
        "-=0.2"
      );

      tl.from(
        "[data-hero-cta]",
        {
          y: 10,
          opacity: 0,
          duration: isMobile ? 0.4 : 0.5,
          ease: "power3.out",
        },
        "-=0.15"
      );

      if (!isMobile) {
        tl.from(
          "[data-hero-scroll]",
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.1"
        );
      }

      // Desktop-only scroll effects
      if (window.innerWidth >= 1024) {
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
      }
    },
    { scope: containerRef }
  );

  function handleCTAClick() {
    const el = document.querySelector("#contact");
    if (el) {
      scrollTo(el as HTMLElement, { offset: -70, duration: 1.2 });
    }
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--graphite)] via-[var(--graphite)] to-[var(--gunmetal)]" />

        <div
          ref={gridRef}
          className="absolute -inset-10 opacity-[0.03] will-change-transform hidden md:block"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute bottom-0 start-0 w-2/3 md:w-1/2 h-1/3 bg-gradient-to-tr from-[var(--copper)]/[0.04] to-transparent" />
        <div className="absolute top-0 end-0 w-1/3 h-1/3 bg-gradient-to-bl from-white/[0.01] to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        data-hero-content
        className="container-wide relative z-10 pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-24 will-change-transform"
      >
        <div
          data-hero-line
          className="w-10 sm:w-16 h-[2px] bg-[var(--copper)] mb-5 sm:mb-8 origin-start"
        />

        <h1
          data-hero-title
          className="text-[clamp(1.75rem,7vw,5.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--off-white)] max-w-4xl"
        >
          <span className="block overflow-hidden">
            <span className="block">{t("title")}</span>
          </span>
        </h1>

        <p
          data-hero-subtitle
          className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-[var(--titanium)] leading-relaxed max-w-xl md:max-w-2xl"
        >
          {t("subtitle")}
        </p>

        <div data-hero-cta className="mt-8 sm:mt-10 md:mt-12 flex items-center gap-4">
          {isDesktop ? (
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
          ) : (
            <button
              onClick={handleCTAClick}
              className="px-7 py-3.5 bg-[var(--copper)] text-[var(--graphite)] text-[13px] uppercase tracking-[0.1em] font-semibold active:bg-[var(--copper)]/80 transition-colors min-h-[48px]"
            >
              {t("cta")}
            </button>
          )}
        </div>
      </div>

      {/* Scroll indicator -- hidden on very small screens */}
      <div
        data-hero-scroll
        className="absolute bottom-6 sm:bottom-8 start-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex"
      >
        <div className="w-[1px] h-10 sm:h-12 bg-gradient-to-b from-[var(--copper)] to-transparent animate-pulse" />
      </div>

      {/* Side accent -- desktop only */}
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
