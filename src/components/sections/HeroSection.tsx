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

        tl.from("[data-hero-line]", { scaleX: 0, duration: mobile ? 0.4 : 0.8, ease: "power3.inOut" });
        tl.from("[data-hero-title] > span", { y: mobile ? 25 : 60, opacity: 0, duration: mobile ? 0.5 : 0.9, ease: "power4.out", stagger: mobile ? 0.05 : 0.1 }, "-=0.15");
        tl.from("[data-hero-subtitle]", { y: mobile ? 12 : 25, opacity: 0, duration: mobile ? 0.4 : 0.7, ease: "power3.out" }, "-=0.2");
        tl.from("[data-hero-cta]", { y: 10, opacity: 0, duration: mobile ? 0.3 : 0.5, ease: "power3.out" }, "-=0.15");

        if (!mobile) {
          tl.from("[data-hero-scroll]", { opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.1");
          gsap.to("[data-hero-content]", { y: -80, ease: "none", scrollTrigger: { trigger: container, start: "top top", end: "bottom top", scrub: 1.5 } });
          gsap.to(container, { opacity: 0.3, ease: "none", scrollTrigger: { trigger: container, start: "60% top", end: "bottom top", scrub: 1 } });
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
      className="relative min-h-[100svh] flex items-center overflow-hidden cold-rolled"
      onMouseMove={handleMouseMove}
    >
      {/* === LAYERED METAL BACKGROUND === */}
      <div className="absolute inset-0">
        {/* Base: deep forge darkness */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, #111113 0%, #151517 20%, #1a1a1c 50%, #1e1e22 80%, #222228 100%)"
        }} />

        {/* Cold-rolled steel grain -- directional */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            repeating-linear-gradient(92deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px),
            repeating-linear-gradient(88deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)
          `,
        }} />

        {/* Grid pattern -- structural blueprint */}
        <div
          ref={gridRef}
          className="absolute -inset-10 opacity-[0.025] will-change-transform hidden md:block"
          style={{
            backgroundImage: "linear-gradient(rgba(196,149,106,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(196,149,106,0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Heat glow from below -- forge light */}
        <div className="absolute bottom-0 inset-x-0 h-1/2" style={{
          background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(196,149,106,0.06) 0%, rgba(139,90,43,0.03) 30%, transparent 70%)"
        }} />

        {/* Side light -- cold industrial */}
        <div className="absolute top-0 end-0 w-1/2 h-full opacity-[0.03]" style={{
          background: "linear-gradient(250deg, rgba(180,200,220,0.15) 0%, transparent 50%)"
        }} />

        {/* Micro scratches overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(125deg, transparent 42%, rgba(255,255,255,0.2) 42.3%, transparent 42.6%),
            linear-gradient(118deg, transparent 58%, rgba(255,255,255,0.15) 58.2%, transparent 58.4%),
            linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.1) 25.15%, transparent 25.3%)
          `,
        }} />
      </div>

      {/* === CONTENT === */}
      <div ref={contentRef} data-hero-content className="container-wide relative z-10 pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-24 will-change-transform">
        {/* Engineering coordinates -- like CNC reference */}
        <div className="hidden lg:flex items-center gap-3 mb-6 opacity-20">
          <span className="eng-label">REF: 32.32°N 34.85°E</span>
          <div className="w-8 h-[1px] bg-[var(--copper)]/30" />
          <span className="eng-label">EST. 2004</span>
        </div>

        {/* Accent line -- like a laser cut mark */}
        <div data-hero-line className="w-10 sm:w-16 h-[2px] mb-5 sm:mb-8 origin-start accent-line-shimmer" style={{
          background: "linear-gradient(90deg, var(--copper), rgba(196,149,106,0.4))"
        }} />

        {/* Title -- stamped into steel */}
        <h1 data-hero-title className="text-[clamp(1.75rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--off-white)] text-stamped max-w-4xl">
          <span className="block overflow-hidden">
            <span className="block">{t("title")}</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p data-hero-subtitle className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-[var(--titanium)] leading-relaxed max-w-xl md:max-w-2xl">
          {t("subtitle")}
        </p>

        {/* CTA */}
        <div data-hero-cta className="mt-8 sm:mt-10 md:mt-12 flex items-center gap-5">
          {isDesktop ? (
            <MagneticElement strength={0.25}>
              <button data-cursor-accent onClick={handleCTAClick} className="group relative px-8 py-3.5 bg-[var(--copper)] text-[var(--graphite)] text-[13px] uppercase tracking-[0.1em] font-semibold overflow-hidden active:scale-[0.98]" style={{
                boxShadow: "0 0 20px rgba(196,149,106,0.15), 0 4px 12px rgba(0,0,0,0.4)"
              }}>
                <span className="relative z-10">{t("cta")}</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]" />
              </button>
            </MagneticElement>
          ) : (
            <button onClick={handleCTAClick} className="px-7 py-3.5 bg-[var(--copper)] text-[var(--graphite)] text-[13px] uppercase tracking-[0.1em] font-semibold active:bg-[var(--copper)]/80 min-h-[48px]" style={{
              boxShadow: "0 0 15px rgba(196,149,106,0.12), 0 4px 12px rgba(0,0,0,0.4)"
            }}>
              {t("cta")}
            </button>
          )}

          {/* Secondary indicator -- tension line */}
          <div className="hidden sm:block w-12 h-[1px]" style={{
            background: "linear-gradient(90deg, rgba(196,149,106,0.3), transparent)"
          }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div data-hero-scroll className="absolute bottom-6 sm:bottom-8 start-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex">
        <div className="w-[1px] h-12" style={{
          background: "linear-gradient(180deg, var(--copper), rgba(196,149,106,0.1), transparent)"
        }}>
          <div className="w-full h-1/3 bg-[var(--copper)]/60 animate-[shimmer-line_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Side accent -- engineering reference */}
      <div className="absolute end-6 md:end-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="eng-label font-medium opacity-20" style={{ writingMode: "vertical-rl" }}>
          BRINMETAL — STRUCTURAL ENGINEERING
        </span>
      </div>

      {/* Bottom structural edge -- heavy shadow gap */}
      <div className="absolute bottom-0 inset-x-0 h-[6px]" style={{
        background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.8))"
      }} />
    </section>
  );
}
