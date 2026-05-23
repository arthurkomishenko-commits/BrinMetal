"use client";

import Image from "next/image";
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
    <AssembleSection id="workshop" className="section-standard relative oxidized-surface panel-thickness">
      <div className="container-wide relative z-10">
        {/* Top: Header + Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-10 sm:mb-14 md:mb-20">
          {/* Text */}
          <div className="flex flex-col justify-center">
            <span data-assemble="up" data-assemble-delay="0" className="inline-block serial-mark text-[var(--copper)]">{t("subtitle")}</span>
            <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{t("title")}</h2>
            <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />
            <p data-assemble="up" data-assemble-delay="3" className="mt-6 sm:mt-8 text-base md:text-lg text-[var(--titanium)] leading-[1.7] max-w-lg">{t("description")}</p>
          </div>

          {/* Workshop photo */}
          <div data-assemble="right" data-assemble-delay="3" className="relative aspect-[4/3] overflow-hidden" style={{
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.22), 0 12px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}>
            <Image
              src="/images/workshop/andrey-working.jpg"
              alt="Andrey working with metal -- sparks flying"
              fill
              className="object-cover brightness-[0.7]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 start-4">
              <span className="eng-label text-white/70">{t("labels.fabrication" as "title")}</span>
            </div>
          </div>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              data-assemble="up"
              data-assemble-delay={`${4 + i}`}
              className="group relative p-5 sm:p-6 pressure-hover"
              style={{
                background: "linear-gradient(102deg, rgba(255,255,255,0.03) 0%, transparent 15%), linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 40%, rgba(0,0,0,0.08) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.03), 0 2px 4px rgba(0,0,0,0.22), 0 10px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03), inset 0 -2px 4px rgba(0,0,0,0.5)",
              }}
            >
              <span className="block text-3xl sm:text-4xl font-bold text-[var(--copper)]/20 mb-3 tracking-tight">{step.num}</span>
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
