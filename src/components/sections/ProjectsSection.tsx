"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AssembleSection } from "@/components/motion/AssembleSection";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { id: 1, category: "structures", aspect: "sm:col-span-2 sm:row-span-2", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", alt: "Heavy metal structure" },
  { id: 2, category: "gates", aspect: "", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", alt: "Custom metal gate" },
  { id: 3, category: "staircases", aspect: "", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", alt: "Metal staircase" },
  { id: 4, category: "fences", aspect: "sm:col-span-2", image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80", alt: "Architectural metal fence" },
] as const;

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <AssembleSection id="projects" className="section-padding relative bg-[var(--gunmetal)]">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="container-wide">
        <div className="mb-10 sm:mb-14 md:mb-20">
          <span data-assemble="up" data-assemble-delay="0" className="inline-block text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">{t("subtitle")}</span>
          <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">{t("title")}</h2>
          <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[260px]">
          {PROJECTS.map((project, i) => (
            <div key={project.id} data-assemble="scale" data-assemble-delay={`${3 + i}`} className={cn(project.aspect, "group relative overflow-hidden border border-white/[0.04] active:border-[var(--copper)]/20 md:hover:border-[var(--copper)]/20 transition-all duration-500")}>
              <Image src={project.image} alt={project.alt} fill className="object-cover transition-transform duration-700 md:group-hover:scale-105 brightness-[0.6] md:group-hover:brightness-[0.75]" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-[var(--copper)] font-medium">{project.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AssembleSection>
  );
}
