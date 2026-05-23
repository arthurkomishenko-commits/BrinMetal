"use client";

import { useTranslations } from "next-intl";
import { AssembleSection } from "@/components/motion/AssembleSection";

const STATS = [
  { key: "experience", value: "20+" },
  { key: "projects_count", value: "500+" },
  { key: "satisfaction", value: "100%" },
] as const;

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <AssembleSection id="about" className="section-padding steel-module overhead-light oil-film panel-thickness">
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <span data-assemble="up" data-assemble-delay="0" className="inline-block serial-mark text-[var(--copper)]">{t("subtitle")}</span>
            <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped leading-tight">{t("title")}</h2>
            <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />
            <p data-assemble="up" data-assemble-delay="3" className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-[var(--titanium)] leading-[1.7] max-w-xl">{t("description")}</p>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
              {STATS.map((stat, i) => (
                <div key={stat.key} data-assemble="right" data-assemble-delay={`${i + 2}`} className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 lg:p-6 pressure-hover" style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.015) 100%), rgba(26,26,26,0.7)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderTopColor: "rgba(0,0,0,0.4)",
                  borderBottomColor: "rgba(255,255,255,0.04)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4) inset, 0 1px 0 rgba(255,255,255,0.02), 0 4px 12px rgba(0,0,0,0.3)",
                }}>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--copper)] tracking-tight min-w-[60px] sm:min-w-[80px] stamp-indent">{stat.value}</span>
                  <div className="w-[1px] h-8 bg-white/[0.06] shrink-0" />
                  <span className="text-xs sm:text-sm text-[var(--titanium)] uppercase tracking-[0.05em]">{t(stat.key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AssembleSection>
  );
}
