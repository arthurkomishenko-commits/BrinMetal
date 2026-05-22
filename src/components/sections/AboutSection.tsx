"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, easings, durations } from "@/lib/motion/gsap-config";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const STATS = [
  { key: "experience", value: "20+" },
  { key: "projects_count", value: "500+" },
  { key: "satisfaction", value: "100%" },
] as const;

export function AboutSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      gsap.from("[data-about-accent]", {
        scaleX: 0,
        duration: isMobile ? 0.6 : durations.dramatic,
        ease: easings.industrial,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 95%" : "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative bg-[var(--gunmetal)]"
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Text */}
          <div className="lg:col-span-7">
            <RevealOnScroll>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">
                {t("subtitle")}
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] leading-tight">
                {t("title")}
              </h2>
            </RevealOnScroll>

            <div
              data-about-accent
              className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start"
            />

            <RevealOnScroll delay={0.2}>
              <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-[var(--titanium)] leading-[1.7] max-w-xl">
                {t("description")}
              </p>
            </RevealOnScroll>
          </div>

          {/* Stats */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
              {STATS.map((stat, i) => (
                <RevealOnScroll key={stat.key} delay={0.1 * i}>
                  <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 lg:p-6 border border-white/[0.06] bg-[var(--graphite)]/50">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--copper)] tracking-tight min-w-[60px] sm:min-w-[80px]">
                      {stat.value}
                    </span>
                    <span className="text-xs sm:text-sm text-[var(--titanium)] uppercase tracking-[0.05em]">
                      {t(stat.key)}
                    </span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
