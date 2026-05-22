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
          <div className="text-center mb-14 md:mb-20">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">
              {t("subtitle")}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">
              {t("title")}
            </h2>
            <div className="mt-6 mx-auto w-16 h-[2px] bg-[var(--copper)]" />
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={item.key} delay={0.1 * i}>
                <div
                  className={cn(
                    "group text-center p-8 md:p-10",
                    "border border-white/[0.04] bg-[var(--gunmetal)]/30",
                    "hover:border-[var(--copper)]/15 transition-all duration-500"
                  )}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 border border-[var(--copper)]/20 mb-6 group-hover:border-[var(--copper)]/40 transition-colors duration-500">
                    <Icon
                      size={24}
                      className="text-[var(--copper)]"
                    />
                  </div>
                  <p className="text-base text-[var(--titanium)] leading-relaxed">
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
