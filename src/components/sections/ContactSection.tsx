"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";
import { AssembleSection } from "@/components/motion/AssembleSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const isDesktop = useMediaQuery("lg");
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");
    await new Promise((r) => setTimeout(r, 1000));
    setFormState("success");
    setTimeout(() => setFormState("idle"), 3000);
  }

  const SubmitWrapper = isDesktop ? MagneticElement : "div";

  return (
    <AssembleSection id="contact" className="section-padding relative bg-[var(--gunmetal)]">
      <div className="absolute top-1/3 end-1/4 w-[450px] h-[450px] rounded-full bg-[var(--copper)] opacity-[0.02] blur-[110px] animate-[glow-breathe_9s_ease-in-out_infinite_1s] pointer-events-none" />
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span data-assemble="up" data-assemble-delay="0" className="inline-block text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">{t("subtitle")}</span>
            <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">{t("title")}</h2>
            <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />

            <div data-assemble="up" data-assemble-delay="3" className="mt-8 sm:mt-10 flex flex-col gap-4 sm:gap-5">
              <a href={`tel:${siteConfig.contact.phone}`} className="group flex items-center gap-3 sm:gap-4 text-[var(--titanium)] active:text-[var(--off-white)] md:hover:text-[var(--off-white)] transition-colors min-h-[44px]">
                <div className="w-10 h-10 flex items-center justify-center border border-[var(--copper)]/20 md:group-hover:border-[var(--copper)] transition-colors shrink-0"><Phone size={16} className="text-[var(--copper)]" /></div>
                <span dir="ltr" className="text-sm sm:text-base">{siteConfig.contact.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="group flex items-center gap-3 sm:gap-4 text-[var(--titanium)] active:text-[var(--off-white)] md:hover:text-[var(--off-white)] transition-colors min-h-[44px]">
                <div className="w-10 h-10 flex items-center justify-center border border-[var(--copper)]/20 md:group-hover:border-[var(--copper)] transition-colors shrink-0"><Mail size={16} className="text-[var(--copper)]" /></div>
                <span className="text-sm sm:text-base break-all">{siteConfig.contact.email}</span>
              </a>
              <div className="flex items-center gap-3 sm:gap-4 text-[var(--titanium)] min-h-[44px]">
                <div className="w-10 h-10 flex items-center justify-center border border-[var(--copper)]/20 shrink-0"><MapPin size={16} className="text-[var(--copper)]" /></div>
                <span className="text-sm sm:text-base">{siteConfig.contact.address[locale]}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7" data-assemble="right" data-assemble-delay="4">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 p-5 sm:p-6 md:p-8 border border-white/[0.04] bg-[var(--graphite)]/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="name" className="block text-[10px] sm:text-xs uppercase tracking-[0.1em] text-[var(--titanium)] mb-1.5 sm:mb-2">{t("name")} *</label>
                  <input id="name" name="name" type="text" required className={cn("w-full px-3 sm:px-4 py-3 bg-[var(--graphite)] border border-white/[0.08] text-[var(--off-white)] text-sm focus:border-[var(--copper)] focus:outline-none transition-colors min-h-[44px]")} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[10px] sm:text-xs uppercase tracking-[0.1em] text-[var(--titanium)] mb-1.5 sm:mb-2">{t("phone")} *</label>
                  <input id="phone" name="phone" type="tel" required dir="ltr" className={cn("w-full px-3 sm:px-4 py-3 bg-[var(--graphite)] border border-white/[0.08] text-[var(--off-white)] text-sm focus:border-[var(--copper)] focus:outline-none transition-colors min-h-[44px]")} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-[10px] sm:text-xs uppercase tracking-[0.1em] text-[var(--titanium)] mb-1.5 sm:mb-2">{t("email")}</label>
                <input id="email" name="email" type="email" dir="ltr" className={cn("w-full px-3 sm:px-4 py-3 bg-[var(--graphite)] border border-white/[0.08] text-[var(--off-white)] text-sm focus:border-[var(--copper)] focus:outline-none transition-colors min-h-[44px]")} />
              </div>
              <div>
                <label htmlFor="message" className="block text-[10px] sm:text-xs uppercase tracking-[0.1em] text-[var(--titanium)] mb-1.5 sm:mb-2">{t("message")} *</label>
                <textarea id="message" name="message" rows={4} required className={cn("w-full px-3 sm:px-4 py-3 bg-[var(--graphite)] border border-white/[0.08] resize-none text-[var(--off-white)] text-sm focus:border-[var(--copper)] focus:outline-none transition-colors")} />
              </div>
              <SubmitWrapper {...(isDesktop ? { strength: 0.15 } : {})}>
                <button type="submit" data-cursor-accent disabled={formState === "sending" || formState === "success"} className={cn("w-full py-3.5 text-[12px] sm:text-[13px] uppercase tracking-[0.1em] font-semibold transition-all duration-300 min-h-[48px]", formState === "success" ? "bg-green-700/80 text-white" : "bg-[var(--copper)] text-[var(--graphite)] active:bg-[var(--copper)]/80 md:hover:bg-[var(--copper)]/90", "disabled:opacity-70")}>
                  {formState === "sending" ? "..." : formState === "success" ? t("success") : t("send")}
                </button>
              </SubmitWrapper>
              {formState === "error" && <p className="text-sm text-red-400 text-center">{t("error")}</p>}
            </form>
          </div>
        </div>
      </div>
    </AssembleSection>
  );
}
