"use client";

import { useTranslations } from "next-intl";
import { AssembleSection } from "@/components/motion/AssembleSection";

const METRICS = [
  { value: "20+", key: "years" },
  { value: "500+", key: "projects" },
  { value: "300+", key: "clients" },
  { value: "\u00b11mm", key: "tolerance" },
] as const;

export function PrecisionSection() {
  const t = useTranslations("precision");

  return (
    <AssembleSection id="precision" className="section-padding relative steel-gradient cold-rolled anodized-dark milled-edge section-edges">
      <div className="absolute top-1/4 start-1/3 w-[500px] h-[400px] rounded-full bg-[var(--copper)] opacity-[0.02] blur-[120px] animate-[glow-breathe_12s_ease-in-out_infinite_3s] pointer-events-none" />
      <div className="container-wide">
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <span data-assemble="up" data-assemble-delay="0" className="inline-block eng-label text-[var(--copper)]">{t("subtitle")}</span>
          <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{t("title")}</h2>
          <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 mx-auto w-12 sm:w-16 h-[2px] bg-[var(--copper)] accent-line-shimmer" />
          <p data-assemble="up" data-assemble-delay="3" className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-[var(--titanium)] leading-[1.7] max-w-2xl mx-auto">{t("description")}</p>
        </div>

        {/* Metrics -- inset chambers with rivet details */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {METRICS.map((metric, i) => (
            <div
              key={metric.key}
              data-assemble="scale"
              data-assemble-delay={`${4 + i}`}
              className="text-center p-5 sm:p-6 md:p-8 lg:p-10 inset-chamber lathe-marks relative machined-corners corner-sparks stamp-indent"
            >
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--copper)] tracking-tight text-stamped">{metric.value}</span>
              <span className="block mt-2 sm:mt-3 eng-label text-[var(--titanium)]">{t(`metric_${metric.key}` as "metric_years")}</span>
            </div>
          ))}
        </div>
      </div>
    </AssembleSection>
  );
}
