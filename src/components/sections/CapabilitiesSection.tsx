"use client";

import { useTranslations } from "next-intl";
import { AssembleSection } from "@/components/motion/AssembleSection";
import { Building2, Shield, DoorOpen, Fence, ArrowUpDown, Palette, Zap, Wrench } from "lucide-react";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2, Shield, DoorOpen, Fence, ArrowUpDown, Palette, Zap, Wrench,
};

export function CapabilitiesSection() {
  const t = useTranslations();
  const tSection = useTranslations("services");

  return (
    <AssembleSection id="services" className="section-padding relative base-layer edge-glint panel-thickness">
      <div className="container-wide relative z-10">
        {/* Header with engineering spec */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 sm:mb-14 md:mb-20">
          <div>
            <span data-assemble="up" data-assemble-delay="0" className="inline-block serial-mark text-[var(--copper)]">{tSection("subtitle")}</span>
            <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{tSection("title")}</h2>
            <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />
          </div>
          <div data-assemble="right" data-assemble-delay="2" className="hidden lg:block">
            <span className="eng-label">8 DISCIPLINES | FULL SPECTRUM</span>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((service, i) => {
            const IconComponent = ICON_MAP[service.icon];
            return (
              <div
                key={service.id}
                data-assemble="scale"
                data-assemble-delay={`${3 + i}`}
                className="group relative p-6 md:p-7 pressure-hover"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.08) 100%), rgba(42,45,53,0.35)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)",
                }}
              >
                {/* Service number */}
                <div className="absolute top-4 end-4">
                  <span className="eng-label">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <div className="w-11 h-11 flex items-center justify-center mb-5 border border-white/[0.04] bg-white/[0.015]">
                  {IconComponent && <IconComponent size={20} className="text-[var(--copper)]" />}
                </div>
                <h3 className="text-base font-semibold text-[var(--off-white)] mb-2 tracking-tight">{t(service.titleKey)}</h3>
                <p className="text-base text-[var(--titanium)] leading-relaxed">{t(service.descriptionKey)}</p>

                {/* Bottom hover line */}
                <div className="absolute bottom-0 inset-x-0 h-[1px] bg-[var(--copper)]/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-start" />
              </div>
            );
          })}
        </div>
      </div>
    </AssembleSection>
  );
}
