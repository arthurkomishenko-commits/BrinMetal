"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLenis } from "@/hooks/useLenis";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useLenis();
  const isDesktop = useMediaQuery("lg");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, stModule]) => {
      const gsap = gsapModule.default;
      const { ScrollTrigger } = stModule;
      gsap.registerPlugin(ScrollTrigger);
      const mobile = window.innerWidth < 768;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: mobile ? 0.1 : 0.3 });
        tl.from("[data-hero-logo]", { scale: 0.9, opacity: 0, duration: 0.8, ease: "power3.out" });
        tl.from("[data-hero-title]", { y: 30, opacity: 0, duration: 0.7, ease: "power4.out" }, "-=0.3");
        tl.from("[data-hero-subtitle]", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");
        tl.from("[data-hero-cta]", { y: 15, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.15");
        tl.from("[data-hero-trust]", { opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.1");
        if (!mobile) {
          gsap.to(container, { opacity: 0.2, ease: "none", scrollTrigger: { trigger: container, start: "70% top", end: "bottom top", scrub: true } });
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
    <section ref={containerRef} id="hero" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0c0c0e 0%, #111113 25%, #161618 50%, #1a1a1c 75%, #1e1e22 100%)" }} />
      <div className="absolute inset-0 hidden lg:block pointer-events-none opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(196,149,106,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(196,149,106,0.3) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Content -- split layout on desktop, stacked on mobile */}
      <div className="container-wide relative z-10 py-20 sm:py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text + CTA */}
          <div>
            {/* Logo compact */}
            <div data-hero-logo className="mb-6 sm:mb-8">
              <Image
                src="/images/hero/logo-brinmetall.jpg"
                alt="BrinMetall"
                width={400}
                height={220}
                className="w-[200px] sm:w-[260px] md:w-[320px] h-auto object-contain"
                style={{ filter: "drop-shadow(0 0 30px rgba(196,149,106,0.12))" }}
                priority
              />
            </div>

            <h1 data-hero-title className="text-[clamp(1.35rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--off-white)] text-stamped max-w-[20rem] sm:max-w-sm">
              {t("title")}
            </h1>

            <p data-hero-subtitle className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[var(--titanium)] leading-relaxed max-w-md">
              {t("subtitle")}
            </p>

            <div data-hero-cta className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              {isDesktop ? (
                <MagneticElement strength={0.2}>
                  <button data-cursor-accent onClick={handleCTAClick} className="group relative px-8 py-3.5 bg-[var(--copper)] text-[var(--graphite)] text-base uppercase tracking-[0.08em] font-semibold overflow-hidden active:scale-[0.98]" style={{
                    boxShadow: "0 0 20px rgba(196,149,106,0.15), 0 4px 16px rgba(0,0,0,0.4)"
                  }}>
                    <span className="relative z-10">{t("cta")}</span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)]" />
                  </button>
                </MagneticElement>
              ) : (
                <button onClick={handleCTAClick} className="px-8 py-3.5 bg-[var(--copper)] text-[var(--graphite)] text-base uppercase tracking-[0.08em] font-semibold active:bg-[var(--copper)]/80 min-h-[52px]" style={{
                  boxShadow: "0 0 15px rgba(196,149,106,0.12), 0 4px 12px rgba(0,0,0,0.4)"
                }}>
                  {t("cta")}
                </button>
              )}
              <a href={`tel:${siteConfig.contact.phone}`} className="text-[var(--titanium)] hover:text-[var(--off-white)] active:text-[var(--off-white)] transition-colors text-base" dir="ltr">
                {siteConfig.contact.phone}
              </a>
            </div>

            {/* Micro trust */}
            <div data-hero-trust className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[var(--titanium)]">
              <span className="eng-label">{t("trust_years")}</span>
              <span className="text-[var(--copper)]">/</span>
              <span className="eng-label">{t("trust_projects")}</span>
              <span className="text-[var(--copper)]">/</span>
              <span className="eng-label">{t("trust_location")}</span>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden" style={{
              border: "1px solid rgba(255,255,255,0.04)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}>
              <Image
                src="/images/workshop/andrey-working.jpg"
                alt="Metal fabrication -- sparks flying"
                fill
                className="object-cover brightness-[0.6]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="absolute bottom-4 start-4">
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center">
        <div className="w-[1px] h-10 bg-gradient-to-b from-[var(--copper)]/40 to-transparent" />
      </div>
    </section>
  );
}

