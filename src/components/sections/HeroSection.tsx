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
        const tl = gsap.timeline({ delay: mobile ? 0.1 : 0.3 });

        // Logo scales in
        tl.from("[data-hero-logo]", { scale: 0.85, opacity: 0, duration: 1, ease: "power3.out" });
        // Subtitle
        tl.from("[data-hero-subtitle]", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
        // CTA
        tl.from("[data-hero-cta]", { y: 15, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");
        // Info bar
        tl.from("[data-hero-info]", { opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.1");

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
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #0c0c0e 0%, #111113 25%, #161618 50%, #1a1a1c 75%, #1e1e22 100%)"
      }} />

      {/* Radial glow behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px]" style={{
        background: "radial-gradient(circle, rgba(196,149,106,0.06) 0%, rgba(196,149,106,0.02) 30%, transparent 60%)"
      }} />

      {/* Blueprint grid */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(196,149,106,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(196,149,106,0.3) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Content -- centered */}
      <div className="container-wide relative z-10 text-center py-20 sm:py-24">
        {/* Logo -- hero visual */}
        <div data-hero-logo className="mx-auto mb-6 sm:mb-8 md:mb-10">
          <Image
            src="/images/hero/logo-brinmetall.jpg"
            alt="BrinMetall -- Professional Metal Fabrication"
            width={600}
            height={340}
            className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[560px] h-auto mx-auto object-contain"
            style={{
              filter: "drop-shadow(0 0 40px rgba(196,149,106,0.15)) drop-shadow(0 0 80px rgba(196,149,106,0.08))",
            }}
            priority
          />
        </div>

        {/* Subtitle */}
        <p data-hero-subtitle className="mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--titanium)] leading-relaxed max-w-xl md:max-w-2xl">
          {t("subtitle")}
        </p>

        {/* CTA */}
        <div data-hero-cta className="mt-8 sm:mt-10 flex justify-center gap-5">
          {isDesktop ? (
            <MagneticElement strength={0.2}>
              <button data-cursor-accent onClick={handleCTAClick} className="group relative px-10 py-4 bg-[var(--copper)] text-[var(--graphite)] text-base uppercase tracking-[0.1em] font-semibold overflow-hidden active:scale-[0.98]" style={{
                boxShadow: "0 0 20px rgba(196,149,106,0.15), 0 4px 16px rgba(0,0,0,0.4)"
              }}>
                <span className="relative z-10">{t("cta")}</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]" />
              </button>
            </MagneticElement>
          ) : (
            <button onClick={handleCTAClick} className="px-9 py-4 bg-[var(--copper)] text-[var(--graphite)] text-base uppercase tracking-[0.1em] font-semibold active:bg-[var(--copper)]/80 min-h-[52px]" style={{
              boxShadow: "0 0 15px rgba(196,149,106,0.12), 0 4px 12px rgba(0,0,0,0.4)"
            }}>
              {t("cta")}
            </button>
          )}
        </div>

        {/* Info bar */}
        <div data-hero-info className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <a href="tel:055-972-2255" className="eng-label text-[var(--copper)] hover:text-[var(--off-white)] transition-colors" dir="ltr">055-972-2255</a>
          <div className="hidden sm:block w-[1px] h-4 bg-white/10" />
          <span className="eng-label">NETANYA, ISRAEL</span>
          <div className="hidden sm:block w-[1px] h-4 bg-white/10" />
          <span className="eng-label">EST. 2004</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center">
        <div className="w-[1px] h-10 bg-gradient-to-b from-[var(--copper)]/40 to-transparent" />
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 inset-x-0 h-[4px] bg-gradient-to-b from-transparent to-black/40" />
    </section>
  );
}
