"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLenis } from "@/hooks/useLenis";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MagneticElement } from "@/components/motion/MagneticElement";

export function HeroSection() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();
  const isDesktop = useMediaQuery("lg");

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
        const tl = gsap.timeline({ delay: mobile ? 0.15 : 0.4 });

        tl.from("[data-hero-line]", { scaleX: 0, duration: 0.6, ease: "power3.inOut" });
        tl.from("[data-hero-title] > span", { y: mobile ? 20 : 40, opacity: 0, duration: 0.7, ease: "power4.out", stagger: 0.08 }, "-=0.2");
        tl.from("[data-hero-subtitle]", { y: 15, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");
        tl.from("[data-hero-cta]", { y: 10, opacity: 0, duration: 0.4, ease: "power3.out" }, "-=0.15");

        if (!mobile) {
          gsap.to(container, {
            opacity: 0.3,
            ease: "none",
            scrollTrigger: { trigger: container, start: "60% top", end: "bottom top", scrub: true },
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
    >
      {/* Background -- heavy steel wall */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #0e0e10 0%, #131315 20%, #181819 45%, #1d1d20 70%, #222226 100%)"
      }} />

      {/* Directional steel grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: "repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.03) 1px, transparent 2px, transparent 5px)",
      }} />

      {/* Blueprint grid -- desktop only */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(196,149,106,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(196,149,106,0.3) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Subtle warm glow from below */}
      <div className="absolute bottom-0 inset-x-0 h-1/3" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(196,149,106,0.04) 0%, transparent 70%)"
      }} />

      {/* Content */}
      <div className="container-wide relative z-10 pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-24">
        {/* Logo */}
        <div data-hero-line className="mb-6 sm:mb-8">
          <Image
            src="/images/hero/logo-brinmetall.jpg"
            alt="BrinMetall logo"
            width={280}
            height={160}
            className="w-[180px] sm:w-[220px] md:w-[280px] h-auto object-contain"
            priority
          />
        </div>

        {/* Engineering coordinates */}
        <div className="hidden lg:flex items-center gap-3 mb-6">
          <span className="eng-label">055-972-2255</span>
          <div className="w-8 h-[1px] bg-[var(--copper)]/30" />
          <span className="eng-label">NETANYA, ISRAEL</span>
        </div>

        <div data-hero-line className="w-10 sm:w-16 h-[2px] bg-[var(--copper)] mb-5 sm:mb-8 origin-start accent-line-shimmer" />

        <h1 data-hero-title className="text-[clamp(1.75rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--off-white)] text-stamped max-w-4xl">
          <span className="block overflow-hidden">
            <span className="block">{t("title")}</span>
          </span>
        </h1>

        <p data-hero-subtitle className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-[var(--titanium)] leading-relaxed max-w-xl md:max-w-2xl">
          {t("subtitle")}
        </p>

        <div data-hero-cta className="mt-8 sm:mt-10 md:mt-12 flex items-center gap-5">
          {isDesktop ? (
            <MagneticElement strength={0.2}>
              <button data-cursor-accent onClick={handleCTAClick} className="group relative px-8 py-3.5 bg-[var(--copper)] text-[var(--graphite)] text-base uppercase tracking-[0.1em] font-semibold overflow-hidden active:scale-[0.98]" style={{
                boxShadow: "0 0 15px rgba(196,149,106,0.1), 0 4px 12px rgba(0,0,0,0.4)"
              }}>
                <span className="relative z-10">{t("cta")}</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]" />
              </button>
            </MagneticElement>
          ) : (
            <button onClick={handleCTAClick} className="px-7 py-3.5 bg-[var(--copper)] text-[var(--graphite)] text-base uppercase tracking-[0.1em] font-semibold active:bg-[var(--copper)]/80 min-h-[48px]">
              {t("cta")}
            </button>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 start-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center">
        <div className="w-[1px] h-10 bg-gradient-to-b from-[var(--copper)]/40 to-transparent" />
      </div>

      {/* Bottom edge shadow */}
      <div className="absolute bottom-0 inset-x-0 h-[4px] bg-gradient-to-b from-transparent to-black/40" />
    </section>
  );
}
