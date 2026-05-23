"use client";

import { useTranslations } from "next-intl";
import { AssembleSection } from "@/components/motion/AssembleSection";
import { Shield, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  { key: "item1", icon: Shield, label: "01" },
  { key: "item2", icon: Clock, label: "02" },
  { key: "item3", icon: CheckCircle, label: "03" },
] as const;

export function TrustSection() {
  const t = useTranslations("trust");

  return (
    <AssembleSection id="trust" className="section-compressed relative base-layer panel-thickness">
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
              <div
                key={item.key}
                data-assemble="up"
                data-assemble-delay={`${3 + i}`}
                className="group text-center p-6 sm:p-8 md:p-10 pressure-hover relative"
                style={{
                  background: "linear-gradient(102deg, rgba(255,255,255,0.03) 0%, transparent 15%), linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 40%, rgba(0,0,0,0.08) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.03), 0 2px 4px rgba(0,0,0,0.22), 0 10px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03), inset 0 -2px 4px rgba(0,0,0,0.5)",
                }}
              >
                {/* Engineering label in corner */}
                <div className="absolute top-3 end-3 hidden sm:block">
                  <span className="eng-label">{item.label}</span>
                </div>

                <div className="inline-flex items-center justify-center w-14 h-14 mb-5 border border-white/[0.04] bg-white/[0.02]">
                  <Icon size={22} className="text-[var(--copper)]" />
                </div>
                <p className="text-base sm:text-base text-[var(--titanium)] leading-relaxed">{t(item.key)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </AssembleSection>
  );
}
