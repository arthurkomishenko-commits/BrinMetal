"use client";

import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { Shield, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  { key: "item1", icon: Shield },
  { key: "item2", icon: Clock },
  { key: "item3", icon: CheckCircle },
] as const;

export function TrustSection() {
  const t = useTranslations("trust");

  return (
    <section id="trust" className="section-padding relative">
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
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-8">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={item.key} delay={0.1 * i}>
                <div
                  className={cn(
                    "group text-center p-6 sm:p-8 md:p-10",
                    "border border-white/[0.04] bg-[var(--gunmetal)]/30",
                    "md:hover:border-[var(--copper)]/15 transition-all duration-500"
                  )}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 border border-[var(--copper)]/20 mb-4 sm:mb-6 md:group-hover:border-[var(--copper)]/40 transition-colors duration-500">
                    <Icon
                      size={20}
                      className="text-[var(--copper)] sm:[&]:w-6 sm:[&]:h-6"
                    />
                  </div>
                  <p className="text-sm sm:text-base text-[var(--titanium)] leading-relaxed">
                    {t(item.key)}
                  </p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
