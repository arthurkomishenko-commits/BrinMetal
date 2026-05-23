"use client";

import { useTranslations } from "next-intl";
import { AssembleSection } from "@/components/motion/AssembleSection";
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
    <AssembleSection id="trust" className="section-padding relative base-layer rust-aged oil-film panel-thickness">
      <div className="container-wide relative z-10">
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <span data-assemble="up" data-assemble-delay="0" className="inline-block serial-mark text-[var(--copper)]">{t("subtitle")}</span>
          <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{t("title")}</h2>
          <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 mx-auto w-12 sm:w-16 h-[2px] bg-[var(--copper)] accent-line-shimmer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-8">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.key} data-assemble="up" data-assemble-delay={`${3 + i}`} className={cn("group text-center p-6 sm:p-8 md:p-10", "pressure-hover")} style={{
                background: "linear-gradient(180deg, #3a3f46 0%, #2d3138 18%, #262a31 50%, #1f2329 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderTopColor: "rgba(255,255,255,0.09)",
                borderBottomColor: "rgba(0,0,0,0.25)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.3)",
              }}>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-5 border border-[var(--copper)]/20 bg-[var(--graphite)]">
                    <Icon size={22} className="text-[var(--copper)]" />
                  </div>
                  <p className="text-sm sm:text-base text-[var(--titanium)] leading-relaxed">{t(item.key)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AssembleSection>
  );
}
