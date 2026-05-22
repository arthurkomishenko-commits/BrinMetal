"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
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
    async (e: React.MouseEvent) => {
      if (!isDesktop || !containerRef.current) return;
      const { default: gsap } = await import("gsap");
      const rect = containerRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      if (gridRef.current) {
        gsap.to(gridRef.current, { x: mx * -0.02, y: my * -0.02, duration: 1, ease: "power2.out" });
      }
      if (contentRef.current) {
        gsap.to(contentRef.current, { x: mx * 0.008, y: my * 0.005, duration: 1.2, ease: "power2.out" });
      }
    },
    [isDesktop]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, stModule]) => {
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);

      const mobile = window.innerWidth < 768;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: mobile ? 0.15 : 0.5 });

      tl.from("[data-hero-line]", {
        scaleX: 0,
        duration: mobile ? 0.4 : 0.8,
        ease: "power3.inOut",
      });

      tl.from(
        "[data-hero-title] > span",
        {
          y: mobile ? 25 : 60,
          opacity: 0,
          duration: mobile ? 0.5 : 0.9,
          ease: "power4.out",
          stagger: mobile ? 0.05 : 0.1,
        },
        "-=0.15"
      );

      tl.from(
        "[data-hero-subtitle]",
        {
          y: mobile ? 12 : 25,
          opacity: 0,
          duration: mobile ? 0.4 : 0.7,
          ease: "power3.out",
        },
        "-=0.2"
      );

      tl.from(
        "[data-hero-cta]",
        {
          y: 10,
          opacity: 0,
          duration: mobile ? 0.3 : 0.5,
          ease: "power3.out",
        },
        "-=0.15"
      );

      if (!mobile) {
        tl.from("[data-hero-scroll]", { opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.1");

        gsap.to("[data-hero-content]", {
          y: -80,
          ease: "none",
          scrollTrigger: { trigger: container, start: "top top", end: "bottom top", scrub: 1.5 },
        });

        gsap.to(container, {
          opacity: 0.3,
          ease: "none",
          scrollTrigger: { trigger: container, start: "60% top", end: "bottom top", scrub: 1 },
        });
        }
      }, container);
    });

    return () => { ctx?.revert(); };
  }, []);

  function handleCTAClick() {
    const el = document.querySelector("#contact");
    if (el) scrollTo(el as HTMLElement, { offset: -70, duration: 1.2 });
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--graphite)] via-[var(--graphite)] to-[var(--gunmetal)]" />
        <div
          ref={gridRef}
          className="absolute -inset-10 opacity-[0.03] will-change-transform hidden md:block"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute bottom-0 start-0 w-2/3 md:w-1/2 h-1/3 bg-gradient-to-tr from-[var(--copper)]/[0.04] to-transparent" />

        {/* Ambient copper glow -- breathing */}
        <div className="absolute top-1/3 end-1/4 w-[500px] h-[500px] rounded-full bg-[var(--copper)] opacity-[0.02] blur-[120px] animate-[glow-breathe_8s_ease-in-out_infinite] pointer-events-none" />
      </div>

      <div ref={contentRef} data-hero-content className="container-wide relative z-10 pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-24 will-change-transform">
        <div data-hero-line className="w-10 sm:w-16 h-[2px] bg-[var(--copper)] accent-line-shimmer mb-5 sm:mb-8 origin-start" />

        <h1 data-hero-title className="text-[clamp(1.75rem,7vw,5.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--off-white)] text-stamped max-w-4xl">
          <span className="block overflow-hidden">
            <span className="block">{t("title")}</span>
          </span>
        </h1>

        <p data-hero-subtitle className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-[var(--titanium)] leading-relaxed max-w-xl md:max-w-2xl">
          {t("subtitle")}
        </p>

        <div data-hero-cta className="mt-8 sm:mt-10 md:mt-12 flex items-center gap-4">
          {isDesktop ? (
            <MagneticElement strength={0.25}>
              <button data-cursor-accent onClick={handleCTAClick} className="group relative px-8 py-3.5 bg-[var(--copper)] text-[var(--graphite)] text-[13px] uppercase tracking-[0.1em] font-semibold overflow-hidden active:scale-[0.98]">
                <span className="relative z-10">{t("cta")}</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]" />
              </button>
            </MagneticElement>
          ) : (
            <button onClick={handleCTAClick} className="px-7 py-3.5 bg-[var(--copper)] text-[var(--graphite)] text-[13px] uppercase tracking-[0.1em] font-semibold active:bg-[var(--copper)]/80 min-h-[48px]">
              {t("cta")}
            </button>
          )}
        </div>
      </div>

      <div data-hero-scroll className="absolute bottom-6 sm:bottom-8 start-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex">
        <div className="w-[1px] h-10 sm:h-12 bg-gradient-to-b from-[var(--copper)] to-transparent animate-pulse" />
      </div>

      <div className="absolute end-6 md:end-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--titanium)]/30 font-medium" style={{ writingMode: "vertical-rl" }}>
          Est. 2004 — Engineering Excellence
        </span>
      </div>
    </section>
  );
}
