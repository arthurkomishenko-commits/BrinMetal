"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { AssembleSection } from "@/components/motion/AssembleSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

const CONTACT_ITEMS = [
  { icon: Phone, href: `tel:${siteConfig.contact.phone}`, getValue: () => siteConfig.contact.phone, dir: "ltr" as const },
  { icon: Mail, href: `mailto:${siteConfig.contact.email}`, getValue: () => siteConfig.contact.email },
  { icon: MapPin, getValue: (locale: Locale) => siteConfig.contact.address[locale] },
];

export function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const isDesktop = useMediaQuery("lg");
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormState("success");
        e.currentTarget.reset();
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 3000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  }

  const SubmitWrapper = isDesktop ? MagneticElement : "div";
  const inputClass = "w-full px-3 sm:px-4 py-3 bg-[var(--graphite)] border border-white/[0.06] text-[var(--off-white)] text-base focus:outline-none focus:border-[var(--copper)]/30 transition-colors min-h-[44px]";

  return (
    <AssembleSection id="contact" className="section-standard steel-module overhead-light panel-thickness">
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Left -- Info */}
          <div className="flex flex-col justify-center">
            <span data-assemble="up" data-assemble-delay="0" className="inline-block serial-mark text-[var(--copper)]">{t("subtitle")}</span>
            <h2 data-assemble="up" data-assemble-delay="1" className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)] text-stamped">{t("title")}</h2>
            <div data-assemble="line" data-assemble-delay="2" className="mt-5 sm:mt-6 w-12 sm:w-16 h-[2px] bg-[var(--copper)] origin-start accent-line-shimmer" />

            <div data-assemble="up" data-assemble-delay="3" className="mt-8 sm:mt-10 flex flex-col gap-4">
              {CONTACT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                const value = item.getValue?.(locale) ?? "";
                const content = (
                  <div className="flex items-center gap-3 sm:gap-4 text-[var(--titanium)] active:text-[var(--off-white)] md:hover:text-[var(--off-white)] transition-colors min-h-[44px]">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0 border border-white/[0.04] bg-white/[0.02]">
                      <Icon size={16} className="text-[var(--copper)]" />
                    </div>
                    <span dir={item.dir} className="text-base sm:text-base">{value}</span>
                  </div>
                );
                return item.href ? (
                  <a key={i} href={item.href}>{content}</a>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}

              {/* WhatsApp direct */}
              <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 text-[var(--titanium)] active:text-[var(--off-white)] md:hover:text-[var(--off-white)] transition-colors min-h-[44px]">
                <div className="w-10 h-10 flex items-center justify-center shrink-0 border border-[#25D366]/20 bg-[#25D366]/[0.03]">
                  <MessageCircle size={16} className="text-[#25D366]" />
                </div>
                <span className="text-base sm:text-base">WhatsApp</span>
              </a>
            </div>

            {/* Hours */}
            <div data-assemble="up" data-assemble-delay="4" className="mt-6 flex items-center gap-3">
              <div className="w-6 h-[1px] bg-[var(--copper)]" />
              <span className="eng-label">{t("hours")}</span>
            </div>
          </div>

          {/* Right -- Form */}
          <div data-assemble="right" data-assemble-delay="4" className="flex items-center">
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-4 sm:space-y-5 p-5 sm:p-6 md:p-8"
              style={{
                background: "linear-gradient(98deg, rgba(255,255,255,0.025) 0%, transparent 12%), linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 40%, rgba(0,0,0,0.08) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.03), 0 2px 4px rgba(0,0,0,0.22), 0 10px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03), inset 0 -2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="eng-label">{t("form_label")}</span>
                
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="name" className="block serial-mark text-[var(--titanium)] mb-1.5">{t("name")} *</label>
                  <input id="name" name="name" type="text" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className="block serial-mark text-[var(--titanium)] mb-1.5">{t("phone")} *</label>
                  <input id="phone" name="phone" type="tel" required dir="ltr" className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block serial-mark text-[var(--titanium)] mb-1.5">{t("email")}</label>
                <input id="email" name="email" type="email" dir="ltr" className={inputClass} />
              </div>
              <div>
                <label htmlFor="message" className="block serial-mark text-[var(--titanium)] mb-1.5">{t("message")} *</label>
                <textarea id="message" name="message" rows={4} required className={cn(inputClass, "resize-none")} />
              </div>

              <SubmitWrapper {...(isDesktop ? { strength: 0.15 } : {})}>
                <button
                  type="submit"
                  data-cursor-accent
                  disabled={formState === "sending" || formState === "success"}
                  className={cn(
                    "w-full py-3.5 text-base sm:text-base uppercase tracking-[0.1em] font-semibold transition-all duration-300 min-h-[48px]",
                    formState === "success" ? "bg-green-700/80 text-white" : "bg-[var(--copper)] text-[var(--graphite)] active:bg-[var(--copper)]/80 md:hover:bg-[var(--copper)]/90",
                    "disabled:opacity-70"
                  )}
                  style={{ boxShadow: "0 0 12px rgba(196,149,106,0.08), 0 4px 12px rgba(0,0,0,0.3)" }}
                >
                  {formState === "sending" ? "..." : formState === "success" ? t("success") : t("send")}
                </button>
              </SubmitWrapper>
              {formState === "error" && <p className="text-base text-red-400 text-center">{t("error")}</p>}
            </form>
          </div>
        </div>
      </div>
    </AssembleSection>
  );
}
