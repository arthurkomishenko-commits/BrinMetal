"use client";

import { useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AssembleSection } from "@/components/motion/AssembleSection";
import { Building2, Shield, DoorOpen, Fence, ArrowUpDown, Palette, Zap, Wrench } from "lucide-react";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2, Shield, DoorOpen, Fence, ArrowUpDown, Palette, Zap, Wrench,
};

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("lg");

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 4;
    gsap.to(cardRef.current, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 800 });
  }, [isDesktop]);

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop || !cardRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  }, [isDesktop]);

  return (
    <div ref={cardRef} className={cn("will-change-transform", className)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

export function CapabilitiesSection() {
  const t = useTranslations();
  const tSection = useTranslations("services");

  return (
    <AssembleSection id="services" className="section-padding relative scratches weld-seam section-edges">
      <div className="absolute bottom-1/4 start-1/5 w-[400px] h-[300px] rounded-full bg-[var(--copper)] opacity-[0.015] blur-[100px] animate-[glow-breathe_11s_ease-in-out_infinite_4s] pointer-events-none" />
      <div className="container-wide">
        <div className="mb-10 sm:mb-14 md:mb-20">
          <span data-assemble="up" data-assemble-delay="0" className="inline-block text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">{tSection("subtitle")}</span>
          <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{tSection("title")}</h2>
          <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((service, i) => {
            const IconComponent = ICON_MAP[service.icon];
            return (
              <TiltCard key={service.id} className={cn("group relative p-6 md:p-7 overflow-hidden", "bg-[var(--gunmetal)]/50 steel-border metal-surface bolt-corners edge-gleam frame-glow", "hover:border-[var(--copper)]/20 hover:bg-[var(--gunmetal)]", "transition-all duration-500 cursor-default")}>
                <div data-assemble="scale" data-assemble-delay={`${3 + i}`}>
                  {IconComponent && <IconComponent size={28} className="text-[var(--copper)] mb-5 transition-transform duration-500 group-hover:scale-110" />}
                  <h3 className="text-base font-semibold text-[var(--off-white)] mb-2 tracking-tight">{t(service.titleKey)}</h3>
                  <p className="text-sm text-[var(--titanium)] leading-relaxed">{t(service.descriptionKey)}</p>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[var(--copper)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-start" />
              </TiltCard>
            );
          })}
        </div>
      </div>
    </AssembleSection>
  );
}
