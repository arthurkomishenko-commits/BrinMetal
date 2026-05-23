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
    <AssembleSection id="workshop" className="section-padding relative base-layer forge-heat arc-weld-border section-edges spark-trail">
      <div className="container-wide">
        <div className="mb-10 sm:mb-14 md:mb-20">
          <span data-assemble="up" data-assemble-delay="0" className="inline-block eng-label text-[var(--copper)]">{t("subtitle")}</span>
          <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{t("title")}</h2>
          <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />
        </div>
        <p data-assemble="up" data-assemble-delay="3" className="text-sm sm:text-base md:text-lg text-[var(--titanium)] leading-[1.7] max-w-2xl mb-10 sm:mb-14">{t("description")}</p>

        {/* Process steps -- each is an assembled steel module */}
        <div className="relative">
          {/* Connecting line -- imperfect, slightly offset */}
          <div className="absolute start-5 sm:start-6 md:start-8 top-0 bottom-0 w-[1px] hidden sm:block"
               style={{ background: "linear-gradient(180deg, transparent, rgba(196,149,106,0.12) 10%, rgba(196,149,106,0.06) 30%, rgba(196,149,106,0.1) 50%, rgba(196,149,106,0.04) 70%, rgba(196,149,106,0.08) 90%, transparent)" }} />

          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
            {STEPS.map((step, i) => (
              <div key={step.num} data-assemble="left" data-assemble-delay={`${4 + i}`} className="group flex items-start gap-4 sm:gap-6 md:gap-8">
                {/* Step number -- inset chamber */}
                <div className="relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center inset-chamber z-10 corner-sparks">
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[var(--copper)]">{step.num}</span>
                </div>
                {/* Step content -- steel panel */}
                <div className="flex-1 pt-0 sm:pt-1 steel-panel grinding-marks p-4 sm:p-5 md:p-6 pressure-hover bevel-cut">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[var(--off-white)] mb-1">{t(`${step.key}.title` as "step1.title")}</h3>
                  <p className="text-xs sm:text-sm text-[var(--titanium)] leading-relaxed max-w-md">{t(`${step.key}.description` as "step1.description")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AssembleSection>
  );
}
