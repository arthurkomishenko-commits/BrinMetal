"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, easings, durations } from "@/lib/motion/gsap-config";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { cn } from "@/lib/utils";

// Placeholder project data -- will be replaced with real content
const PROJECTS = [
  { id: 1, category: "structures", aspect: "col-span-1 sm:col-span-2 row-span-2" },
  { id: 2, category: "gates", aspect: "col-span-1 row-span-1" },
  { id: 3, category: "staircases", aspect: "col-span-1 row-span-1" },
  { id: 4, category: "fences", aspect: "col-span-1 sm:col-span-2 row-span-1" },
] as const;

export function ProjectsSection() {
  const t = useTranslations("projects");
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gridRef.current?.querySelectorAll("[data-project-item]");
      if (!items?.length) return;

      gsap.from(items, {
        scale: 1.05,
        opacity: 0,
        duration: durations.dramatic,
        ease: easings.industrial,
        stagger: 0.15,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: gridRef }
  );

  return (
    <section
      id="projects"
      className="section-padding relative bg-[var(--gunmetal)]"
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="container-wide">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="mb-14 md:mb-20">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">
              {t("subtitle")}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">
              {t("title")}
            </h2>
            <div className="mt-6 w-16 h-[2px] bg-[var(--copper)]" />
          </div>
        </RevealOnScroll>

        {/* Cinematic Grid -- placeholder layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[250px]"
        >
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              data-project-item
              className={cn(
                project.aspect,
                "group relative overflow-hidden bg-[var(--graphite)] border border-white/[0.04]",
                "hover:border-[var(--copper)]/20 transition-all duration-500 cursor-pointer"
              )}
            >
              {/* Placeholder gradient -- will be replaced with actual images */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gunmetal)] to-[var(--graphite)]" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[var(--copper)]/0 group-hover:bg-[var(--copper)]/[0.08] transition-colors duration-500" />

              {/* Category label */}
              <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 bg-gradient-to-t from-black/50 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--copper)] font-medium">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
