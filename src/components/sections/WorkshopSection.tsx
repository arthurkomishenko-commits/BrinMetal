"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, easings, durations } from "@/lib/motion/gsap-config";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const STEPS = [
  { num: "01", key: "step1" },
  { num: "02", key: "step2" },
  { num: "03", key: "step3" },
  { num: "04", key: "step4" },
] as const;

export function WorkshopSection() {
  const t = useTranslations("workshop");
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const steps = stepsRef.current?.querySelectorAll("[data-step]");
      if (!steps?.length) return;

      const isMobile = window.innerWidth < 768;

      gsap.from(steps, {
        x: isMobile ? -15 : -30,
        opacity: 0,
        duration: isMobile ? 0.4 : durations.standard,
        ease: easings.industrial,
        stagger: isMobile ? 0.1 : 0.15,
        scrollTrigger: {
          trigger: stepsRef.current,
          start: isMobile ? "top 95%" : "top 80%",
        },
      });

      if (!isMobile) {
        gsap.from("[data-step-line]", {
          scaleY: 0,
          duration: durations.cinematic,
          ease: easings.heavy,
          transformOrigin: "top",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
          },
        });
      }
    },
    { scope: stepsRef }
  );

  return (
    <section id="workshop" className="section-padding relative">
      <div className="container-wide">
        <RevealOnScroll>
          <div className="mb-10 sm:mb-14 md:mb-20">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">
              {t("subtitle")}
            </span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">
              {t("title")}
            </h2>
            <div className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)]" />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="text-sm sm:text-base md:text-lg text-[var(--titanium)] leading-[1.7] max-w-2xl mb-10 sm:mb-14">
            {t("description")}
          </p>
        </RevealOnScroll>

        <div ref={stepsRef} className="relative">
          {/* Connecting line -- hidden on mobile */}
          <div
            data-step-line
            className="absolute start-5 sm:start-6 md:start-8 top-0 bottom-0 w-[1px] bg-white/[0.06] hidden sm:block"
          />

          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
            {STEPS.map((step) => (
              <div
                key={step.num}
                data-step
                className="group flex items-start gap-4 sm:gap-6 md:gap-8"
              >
                <div className="relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center border border-[var(--copper)]/30 bg-[var(--graphite)] z-10 group-hover:border-[var(--copper)] transition-colors duration-500">
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[var(--copper)]">
                    {step.num}
                  </span>
                </div>

                <div className="pt-1 sm:pt-2 md:pt-3 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[var(--off-white)] mb-1">
                    {t(`${step.key}.title` as "step1.title")}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--titanium)] leading-relaxed max-w-md">
                    {t(`${step.key}.description` as "step1.description")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
