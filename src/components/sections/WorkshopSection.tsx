"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, easings, durations } from "@/lib/motion/gsap-config";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const STEPS = [
  { num: "01", key: "step1", icon: "consultation" },
  { num: "02", key: "step2", icon: "engineering" },
  { num: "03", key: "step3", icon: "fabrication" },
  { num: "04", key: "step4", icon: "installation" },
] as const;

export function WorkshopSection() {
  const t = useTranslations("workshop");
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const steps = stepsRef.current?.querySelectorAll("[data-step]");
      if (!steps?.length) return;

      gsap.from(steps, {
        x: -40,
        opacity: 0,
        duration: durations.standard,
        ease: easings.industrial,
        stagger: 0.15,
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 75%",
        },
      });

      // Animate the connecting line
      gsap.from("[data-step-line]", {
        scaleY: 0,
        duration: durations.cinematic,
        ease: easings.heavy,
        transformOrigin: "top",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: stepsRef }
  );

  return (
    <section id="workshop" className="section-padding relative">
      <div className="container-wide">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-14 md:mb-20">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">
              {t("subtitle")}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">
              {t("title")}
            </h2>
            <div className="mt-6 w-16 h-[2px] bg-[var(--copper)]" />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="text-base md:text-lg text-[var(--titanium)] leading-[1.7] max-w-2xl mb-14">
            {t("description")}
          </p>
        </RevealOnScroll>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connecting line */}
          <div
            data-step-line
            className="absolute start-6 md:start-8 top-0 bottom-0 w-[1px] bg-white/[0.06] hidden sm:block"
          />

          <div className="flex flex-col gap-8 md:gap-10">
            {STEPS.map((step) => (
              <div
                key={step.num}
                data-step
                className="group flex items-start gap-6 md:gap-8"
              >
                {/* Step number */}
                <div className="relative shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-[var(--copper)]/30 bg-[var(--graphite)] z-10 group-hover:border-[var(--copper)] transition-colors duration-500">
                  <span className="text-sm md:text-base font-bold text-[var(--copper)]">
                    {step.num}
                  </span>
                </div>

                {/* Step content */}
                <div className="pt-2 md:pt-3">
                  <h3 className="text-lg md:text-xl font-semibold text-[var(--off-white)] mb-1">
                    {t(`${step.key}.title` as "step1.title")}
                  </h3>
                  <p className="text-sm text-[var(--titanium)] leading-relaxed max-w-md">
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
