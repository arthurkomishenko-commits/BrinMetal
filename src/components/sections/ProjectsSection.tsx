"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    category: "structures",
    aspect: "sm:col-span-2 sm:row-span-2",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    alt: "Heavy metal structure fabrication",
  },
  {
    id: 2,
    category: "gates",
    aspect: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    alt: "Custom metal gate",
  },
  {
    id: 3,
    category: "staircases",
    aspect: "",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    alt: "Metal staircase fabrication",
  },
  {
    id: 4,
    category: "fences",
    aspect: "sm:col-span-2",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80",
    alt: "Architectural metal fence",
  },
] as const;

export function ProjectsSection() {
  const t = useTranslations("projects");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll("[data-project-item]");
    if (!items.length) return;

    const mobile = window.innerWidth < 768;

    gsap.set(items, { scale: mobile ? 0.97 : 1.05, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        scale: 1,
        opacity: 1,
        duration: mobile ? 0.5 : 1.0,
        ease: "power3.out",
        stagger: mobile ? 0.1 : 0.15,
        scrollTrigger: {
          trigger: gridRef.current,
          start: mobile ? "top 95%" : "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, gridRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section-padding relative bg-[var(--gunmetal)]">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="container-wide">
        <RevealOnScroll>
          <div className="mb-10 sm:mb-14 md:mb-20">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">{t("subtitle")}</span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">{t("title")}</h2>
            <div className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)]" />
          </div>
        </RevealOnScroll>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[260px]">
          {PROJECTS.map((project) => (
            <div key={project.id} data-project-item className={cn(project.aspect, "group relative overflow-hidden border border-white/[0.04]", "active:border-[var(--copper)]/20 md:hover:border-[var(--copper)]/20 transition-all duration-500")}>
              <Image
                src={project.image}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-700 md:group-hover:scale-105 brightness-[0.6] md:group-hover:brightness-[0.75]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-[var(--copper)] font-medium">{project.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
