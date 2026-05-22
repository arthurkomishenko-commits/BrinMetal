"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, easings } from "@/lib/motion/gsap-config";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const METRICS = [
  { value: "20+", key: "years" },
  { value: "500+", key: "projects" },
  { value: "300+", key: "clients" },
  { value: "\u00b11mm", key: "tolerance" },
] as const;

export function PrecisionSection() {
  const t = useTranslations("precision");
  const metricsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = metricsRef.current?.querySelectorAll("[data-metric]");
      if (!items?.length) return;

      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: easings.industrial,
        stagger: 0.12,
        scrollTrigger: {
          trigger: metricsRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: metricsRef }
  );

  return (
    <section
      id="precision"
      className="section-padding relative bg-[var(--gunmetal)]"
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="container-wide">
        <RevealOnScroll>
          <div className="text-center mb-10 sm:mb-14 md:mb-20">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">
              {t("subtitle")}
            </span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">
              {t("title")}
            </h2>
            <div className="mt-5 sm:mt-6 mx-auto w-12 sm:w-16 h-[2px] bg-[var(--copper)]" />
            <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-[var(--titanium)] leading-[1.7] max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
        </RevealOnScroll>

        <div
          ref={metricsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          {METRICS.map((metric) => (
            <div
              key={metric.key}
              data-metric
              className="text-center p-5 sm:p-6 md:p-8 lg:p-10 border border-white/[0.04] bg-[var(--graphite)]/50"
            >
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--copper)] tracking-tight">
                {metric.value}
              </span>
              <span className="block mt-2 sm:mt-3 text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] text-[var(--titanium)]">
                {t(`metric_${metric.key}` as "metric_years")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
