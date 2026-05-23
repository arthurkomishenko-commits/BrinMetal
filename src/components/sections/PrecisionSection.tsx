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
    <AssembleSection id="precision" className="section-padding steel-gradient edge-glint panel-thickness">
      <div className="container-wide relative z-10">
        {/* Centered header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <span data-assemble="up" data-assemble-delay="0" className="inline-block serial-mark text-[var(--copper)]">{t("subtitle")}</span>
          <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{t("title")}</h2>
          <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 mx-auto w-12 sm:w-16 h-[2px] bg-[var(--copper)] accent-line-shimmer" />
          <p data-assemble="up" data-assemble-delay="3" className="mt-6 sm:mt-8 text-base sm:text-base md:text-lg text-[var(--titanium)] leading-[1.7] max-w-2xl mx-auto">{t("description")}</p>
        </div>

        {/* Metrics -- large numbers with engineering labels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {METRICS.map((metric, i) => (
            <div
              key={metric.key}
              data-assemble="scale"
              data-assemble-delay={`${4 + i}`}
              className="relative text-center p-6 sm:p-8 md:p-10 pressure-hover"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.02)",
              }}
            >
              <span className="block text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--copper)] tracking-tight text-stamped">{metric.value}</span>
              <span className="block mt-3 serial-mark text-[var(--titanium)]">{t(`metric_${metric.key}` as "metric_years")}</span>
              {/* Engineering corner mark */}
              <div className="absolute top-3 end-3 hidden sm:block">
                <span className="eng-label">M-{String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom engineering note */}
        <div data-assemble="up" data-assemble-delay="8" className="mt-8 text-center">
          <span className="eng-label">TOLERANCE VERIFIED | QUALITY ASSURED | ISRAELI STANDARD</span>
        </div>
      </div>
    </AssembleSection>
  );
}
