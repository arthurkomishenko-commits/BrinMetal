"use client";

import { useTranslations } from "next-intl";
import { AssembleSection } from "@/components/motion/AssembleSection";

const STEPS = [
  { num: "01", key: "step1" },
  { num: "02", key: "step2" },
  { num: "03", key: "step3" },
  { num: "04", key: "step4" },
] as const;

export function WorkshopSection() {
  const t = useTranslations("workshop");

  return (
    <AssembleSection id="workshop" className="section-padding relative base-layer panel-thickness">
      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 sm:mb-14 md:mb-20">
          <div>
            <span data-assemble="up" data-assemble-delay="0" className="inline-block serial-mark text-[var(--copper)]">{t("subtitle")}</span>
            <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{t("title")}</h2>
            <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />
          </div>
          {/* Engineering spec label */}
          <div data-assemble="right" data-assemble-delay="2" className="hidden lg:block">
            <span className="eng-label">PROCESS SPEC: BM-WF-2024</span>
          </div>
        </div>

        <p data-assemble="up" data-assemble-delay="3" className="text-base sm:text-base md:text-lg text-[var(--titanium)] leading-[1.7] max-w-2xl mb-10 sm:mb-14">{t("description")}</p>

        {/* Process steps -- horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-5">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              data-assemble="up"
              data-assemble-delay={`${4 + i}`}
              className="group relative p-5 sm:p-6 pressure-hover"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.02)",
              }}
            >
              {/* Step number -- large, copper, stamped */}
              <span className="block text-3xl sm:text-4xl font-bold text-[var(--copper)]/20 mb-3 tracking-tight">{step.num}</span>
              {/* Thin copper line */}
              <div className="w-8 h-[1px] bg-[var(--copper)]/30 mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-[var(--off-white)] mb-1.5">{t(`${step.key}.title` as "step1.title")}</h3>
              <p className="text-base text-[var(--titanium)] leading-relaxed">{t(`${step.key}.description` as "step1.description")}</p>
            </div>
          ))}
        </div>
      </div>
    </AssembleSection>
  );
}
