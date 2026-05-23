"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AssembleSection } from "@/components/motion/AssembleSection";

const STATS = [
  { key: "experience", value: "20+", label: "YRS" },
  { key: "projects_count", value: "500+", label: "PRJ" },
  { key: "satisfaction", value: "100%", label: "SAT" },
] as const;

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <AssembleSection id="about" className="section-standard steel-module overhead-light panel-thickness">
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Left -- Text */}
          <div className="flex flex-col justify-center">
            <span data-assemble="up" data-assemble-delay="0" className="inline-block serial-mark text-[var(--copper)]">{t("subtitle")}</span>
            <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped leading-tight">{t("title")}</h2>
            <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />
            <p data-assemble="up" data-assemble-delay="3" className="mt-6 sm:mt-8 text-base sm:text-base md:text-lg text-[var(--titanium)] leading-[1.7] max-w-lg">{t("description")}</p>

            {/* Stats row */}
            <div data-assemble="up" data-assemble-delay="4" className="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              {STATS.map((stat) => (
                <div key={stat.key} className="text-center sm:text-start">
                  <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--copper)] tracking-tight text-stamped">{stat.value}</span>
                  <span className="block mt-1 text-base text-[var(--titanium)] uppercase tracking-[0.1em]">{t(stat.key)}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right -- Photo frame */}
          <div data-assemble="right" data-assemble-delay="3" className="flex items-center">
            <div
              className="relative w-full aspect-[4/3] lg:aspect-[3/4] flex items-center justify-center"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(0,0,0,0.05) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.02)",
              }}
            >
              {/* Photo */}
              <Image
                src="/images/about/andrey-portrait.jpg"
                alt="Andrey — BrinMetall founder"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Corner marks */}
              <div className="absolute top-3 start-3 sm:top-4 sm:start-4 w-4 h-4 border-t border-s border-[var(--copper)]/30" />
              <div className="absolute bottom-3 end-3 sm:bottom-4 sm:end-4 w-4 h-4 border-b border-e border-[var(--copper)]/30" />

              {/* Label */}
              <div className="absolute bottom-3 start-3 sm:bottom-4 sm:start-4">
                <span className="eng-label text-white/60">ANDREY | FOUNDER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AssembleSection>
  );
}
