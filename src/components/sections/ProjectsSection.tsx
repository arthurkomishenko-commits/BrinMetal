"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AssembleSection } from "@/components/motion/AssembleSection";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { id: 1, category: "structures", aspect: "sm:col-span-2 sm:row-span-2", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=700&fit=crop&q=80", alt: "Heavy metal structure" },
  { id: 2, category: "gates", aspect: "", image: "https://images.unsplash.com/photo-1530639834082-05bafb67fbbe?w=600&h=400&fit=crop&q=80", alt: "Custom metal gate" },
  { id: 3, category: "staircases", aspect: "", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop&q=80", alt: "Metal staircase" },
  { id: 4, category: "fences", aspect: "sm:col-span-2", image: "https://images.unsplash.com/photo-1597423244036-ef5020e83f3c?w=900&h=400&fit=crop&q=80", alt: "Architectural metal" },
] as const;

export function ProjectsSection() {
  const t = useTranslations("projects");

  return (
    <AssembleSection id="projects" className="section-padding steel-module overhead-light oil-film panel-thickness">
      <div className="container-wide relative z-10">
        <div className="mb-10 sm:mb-14 md:mb-20">
          <span data-assemble="up" data-assemble-delay="0" className="inline-block serial-mark text-[var(--copper)]">{t("subtitle")}</span>
          <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{t("title")}</h2>
          <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 auto-rows-[220px] sm:auto-rows-[240px] md:auto-rows-[280px]">
          {PROJECTS.map((project, i) => (
            <div key={project.id} data-assemble="scale" data-assemble-delay={`${3 + i}`} className={cn(project.aspect, "group relative overflow-hidden inset-chamber pressure-hover machined-corners")}>
              <Image src={project.image} alt={project.alt} fill className="object-cover transition-transform duration-700 md:group-hover:scale-105 brightness-[0.45] md:group-hover:brightness-[0.6]" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                <span className="serial-mark text-[var(--copper)] text-[11px]">{project.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AssembleSection>
  );
}
