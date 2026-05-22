"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SpotlightSection } from "@/components/motion/SpotlightSection";
import { Building2, Shield, DoorOpen, Fence, ArrowUpDown, Palette, Zap, Wrench } from "lucide-react";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2, Shield, DoorOpen, Fence, ArrowUpDown, Palette, Zap, Wrench,
};

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("lg");

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    gsap.to(cardRef.current, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 800 });
    if (glareRef.current) gsap.to(glareRef.current, { x: x - 100, y: y - 100, opacity: 0.07, duration: 0.4, ease: "power2.out" });
  }, [isDesktop]);

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop || !cardRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
    if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.4 });
  }, [isDesktop]);

  return (
    <div ref={cardRef} className={cn("will-change-transform", className)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transformStyle: "preserve-3d" }}>
      <div ref={glareRef} className="pointer-events-none absolute w-[200px] h-[200px] rounded-full bg-white opacity-0 blur-2xl" />
      {children}
    </div>
  );
}

export function CapabilitiesSection() {
  const t = useTranslations();
  const tSection = useTranslations("services");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-service-card]");
    if (!cards.length) return;

    const mobile = window.innerWidth < 768;

    // Set initial state
    gsap.set(cards, { y: mobile ? 25 : 50, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: mobile ? 0.4 : 0.6,
        ease: "power3.out",
        stagger: { amount: mobile ? 0.3 : 0.5, from: "start" },
        scrollTrigger: {
          trigger: gridRef.current,
          start: mobile ? "top 95%" : "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, gridRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <SpotlightSection as="section" className="section-padding" color="var(--copper)" intensity={0.05}>
      <div id="services" className="container-wide">
        <div className="mb-10 sm:mb-14 md:mb-20">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">{tSection("subtitle")}</span>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">{tSection("title")}</h2>
          <div className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)]" />
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((service) => {
            const IconComponent = ICON_MAP[service.icon];
            return (
              <TiltCard key={service.id} className={cn("group relative p-6 md:p-7 overflow-hidden", "bg-[var(--gunmetal)]/50 border border-white/[0.04]", "hover:border-[var(--copper)]/20 hover:bg-[var(--gunmetal)]", "transition-all duration-500 cursor-default")}>
                <div data-service-card>
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
    </SpotlightSection>
  );
}
