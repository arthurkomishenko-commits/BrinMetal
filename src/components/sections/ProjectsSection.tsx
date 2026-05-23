"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AssembleSection } from "@/components/motion/AssembleSection";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { id: 1, category: "gates", titleKey: "gate_title", aspect: "sm:col-span-2 sm:row-span-2", image: "/images/projects/gate-wood-metal.jpg", alt: "Architectural gate with wood and metal" },
  { id: 2, category: "railings", titleKey: "railing_title", aspect: "", image: "/images/projects/railing-installed.jpg", alt: "Ornamental wrought iron balcony railing" },
  { id: 3, category: "staircases", titleKey: "staircase_title", aspect: "", image: "/images/projects/staircase-stringers.jpg", alt: "Structural staircase frame" },
  { id: 4, category: "staircases", titleKey: "staircase_title", aspect: "sm:col-span-2", image: "/images/projects/staircase-grating.jpg", alt: "Industrial staircase with metal grating" },
  { id: 5, category: "railings", titleKey: "railing_title", aspect: "", image: "/images/projects/railing-balcony.jpg", alt: "Balcony railing with glass and ornaments" },
  { id: 6, category: "gates", titleKey: "gate_title", aspect: "", image: "/images/projects/gate-black.jpg", alt: "Black steel entrance gate" },
  { id: 7, category: "structures", titleKey: "structure_title", aspect: "", image: "/images/projects/building-full.jpg", alt: "Full building with metal railings and stairs" },
  { id: 8, category: "art", titleKey: "structure_title", aspect: "sm:col-span-2 sm:row-span-2", image: "/images/projects/forged-rose.jpg", alt: "Forged iron rose -- artistic metalwork" },
] as const;

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <AssembleSection id="projects" className="section-standard steel-module overhead-light panel-thickness">
      <div className="container-wide relative z-10">
        <div className="mb-10 sm:mb-14 md:mb-20">
          <span data-assemble="up" data-assemble-delay="0" className="inline-block serial-mark text-[var(--copper)]">{t("subtitle")}</span>
          <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{t("title")}</h2>
          <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 auto-rows-[220px] sm:auto-rows-[240px] md:auto-rows-[280px]">
          {PROJECTS.map((project, i) => {
            return (
              <div key={project.id} data-assemble="scale" data-assemble-delay={`${3 + i}`} className={cn(project.aspect, "group relative overflow-hidden pressure-hover cursor-pointer")} style={{
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}>
                <Image src={project.image} alt={project.alt} fill className="object-cover transition-all duration-700 brightness-[0.35] md:group-hover:brightness-[0.65] md:group-hover:scale-105" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                  <span className="serial-mark text-[var(--copper)] text-base">{t(project.titleKey)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects link */}
        <div data-assemble="up" data-assemble-delay="8" className="mt-10 sm:mt-14 flex justify-center">
          <a href="#contact" className="group inline-flex items-center gap-3 text-[var(--copper)] text-base uppercase tracking-[0.12em] font-semibold transition-colors duration-300 active:opacity-70 md:hover:text-[var(--off-white)]">
            <span>{t("viewAll")}</span>
            <div className="w-8 h-[1px] bg-current transition-all duration-300 md:group-hover:w-12" />
          </a>
        </div>
      </div>
    </AssembleSection>
  );
}
