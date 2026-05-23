"use client";

import { useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AssembleSection } from "@/components/motion/AssembleSection";
import { Building2, Shield, DoorOpen, Fence, ArrowUpDown, Palette, Zap, Wrench } from "lucide-react";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2, Shield, DoorOpen, Fence, ArrowUpDown, Palette, Zap, Wrench,
};

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("lg");
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDesktop || !cardRef.current) return;
    import("gsap").then(({ default: gsap }) => {
      const rect = cardRef.current!.getBoundingClientRect();
      gsap.to(cardRef.current, { rotateX: ((e.clientY - rect.top - rect.height/2) / (rect.height/2)) * -3, rotateY: ((e.clientX - rect.left - rect.width/2) / (rect.width/2)) * 3, duration: 0.5, ease: "power2.out", transformPerspective: 800 });
    });
  }, [isDesktop]);
  const handleMouseLeave = useCallback(() => {
    if (!isDesktop || !cardRef.current) return;
    import("gsap").then(({ default: gsap }) => { gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" }); });
  }, [isDesktop]);
  return <div ref={cardRef} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transformStyle: "preserve-3d", ...style }}>{children}</div>;
}

export function CapabilitiesSection() {
  const t = useTranslations();
  const tSection = useTranslations("services");

  return (
    <AssembleSection id="services" className="section-padding relative base-layer edge-glint panel-thickness">
      <div className="container-wide relative z-10">
        <div className="mb-10 sm:mb-14 md:mb-20">
          <span data-assemble="up" data-assemble-delay="0" className="inline-block serial-mark text-[var(--copper)]">{tSection("subtitle")}</span>
          <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{tSection("title")}</h2>
          <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((service, i) => {
            const IconComponent = ICON_MAP[service.icon];
            return (
              <TiltCard key={service.id} className={cn("group relative p-6 md:p-7", "pressure-hover")} style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.1) 100%), rgba(42,45,53,0.4)",
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)",
              }}>
                <div data-assemble="scale" data-assemble-delay={`${3 + i}`} className="relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center mb-5 border border-white/[0.04] bg-white/[0.02]">
                    {IconComponent && <IconComponent size={22} className="text-[var(--copper)]" />}
                  </div>
                  <h3 className="text-base font-semibold text-[var(--off-white)] mb-2 tracking-tight">{t(service.titleKey)}</h3>
                  <p className="text-sm text-[var(--titanium)] leading-relaxed">{t(service.descriptionKey)}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </AssembleSection>
  );
}
