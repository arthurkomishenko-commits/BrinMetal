"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, easings, durations, defaultScrollTriggerConfig } from "@/lib/motion/gsap-config";
import {
  Building2,
  Shield,
  DoorOpen,
  Fence,
  ArrowUpDown,
  Palette,
  Zap,
  Wrench,
} from "lucide-react";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2,
  Shield,
  DoorOpen,
  Fence,
  ArrowUpDown,
  Palette,
  Zap,
  Wrench,
};

export function CapabilitiesSection() {
  const t = useTranslations();
  const tSection = useTranslations("services");
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll("[data-service-card]");
      if (!cards?.length) return;

      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: durations.standard,
        ease: easings.industrial,
        stagger: {
          amount: 0.5,
          grid: "auto",
          from: "start",
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: gridRef }
  );

  return (
    <section id="services" className="section-padding relative">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-14 md:mb-20">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">
            {tSection("subtitle")}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">
            {tSection("title")}
          </h2>
          <div className="mt-6 w-16 h-[2px] bg-[var(--copper)]" />
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {services.map((service) => {
            const IconComponent = ICON_MAP[service.icon];
            return (
              <div
                key={service.id}
                data-service-card
                className={cn(
                  "group relative p-6 md:p-7",
                  "bg-[var(--gunmetal)]/50 border border-white/[0.04]",
                  "hover:border-[var(--copper)]/20 hover:bg-[var(--gunmetal)]",
                  "transition-all duration-500 cursor-default"
                )}
              >
                {/* Icon */}
                {IconComponent && (
                  <IconComponent
                    size={28}
                    className="text-[var(--copper)] mb-5 transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                {/* Title */}
                <h3 className="text-base font-semibold text-[var(--off-white)] mb-2 tracking-tight">
                  {t(service.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--titanium)] leading-relaxed">
                  {t(service.descriptionKey)}
                </p>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[var(--copper)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-start" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
