"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, easings, durations } from "@/lib/motion/gsap-config";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { id: 1, category: "structures", aspect: "sm:col-span-2 sm:row-span-2" },
  { id: 2, category: "gates", aspect: "" },
  { id: 3, category: "staircases", aspect: "" },
  { id: 4, category: "fences", aspect: "sm:col-span-2" },
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
          start: "top 85%",
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
        <RevealOnScroll>
          <div className="mb-10 sm:mb-14 md:mb-20">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">
              {t("subtitle")}
            </span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">
              {t("title")}
            </h2>
            <div className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)]" />
          </div>
        </RevealOnScroll>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[250px]"
        >
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              data-project-item
              className={cn(
                project.aspect,
                "group relative overflow-hidden bg-[var(--graphite)] border border-white/[0.04]",
                "active:border-[var(--copper)]/20 md:hover:border-[var(--copper)]/20 transition-all duration-500"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gunmetal)] to-[var(--graphite)]" />
              <div className="absolute inset-0 bg-[var(--copper)]/0 md:group-hover:bg-[var(--copper)]/[0.08] transition-colors duration-500" />

              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 md:p-5 bg-gradient-to-t from-black/50 to-transparent md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-[var(--copper)] font-medium">
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
