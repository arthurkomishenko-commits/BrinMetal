"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");

    // Placeholder -- will be replaced with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormState("success");

    // Reset after 3s
    setTimeout(() => setFormState("idle"), 3000);
  }

  return (
    <section
      id="contact"
      className="section-padding relative bg-[var(--gunmetal)]"
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left -- Info */}
          <div className="lg:col-span-5">
            <RevealOnScroll>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--copper)] font-medium">
                {t("subtitle")}
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-[var(--off-white)]">
                {t("title")}
              </h2>
              <div className="mt-6 w-16 h-[2px] bg-[var(--copper)]" />
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="mt-10 flex flex-col gap-5">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="group flex items-center gap-4 text-[var(--titanium)] hover:text-[var(--off-white)] transition-colors"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-[var(--copper)]/20 group-hover:border-[var(--copper)] transition-colors">
                    <Phone size={16} className="text-[var(--copper)]" />
                  </div>
                  <span dir="ltr">{siteConfig.contact.phone}</span>
                </a>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="group flex items-center gap-4 text-[var(--titanium)] hover:text-[var(--off-white)] transition-colors"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-[var(--copper)]/20 group-hover:border-[var(--copper)] transition-colors">
                    <Mail size={16} className="text-[var(--copper)]" />
                  </div>
                  {siteConfig.contact.email}
                </a>

                <div className="flex items-center gap-4 text-[var(--titanium)]">
                  <div className="w-10 h-10 flex items-center justify-center border border-[var(--copper)]/20">
                    <MapPin size={16} className="text-[var(--copper)]" />
                  </div>
                  {siteConfig.contact.address[locale]}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right -- Form */}
          <div className="lg:col-span-7">
            <RevealOnScroll direction="right">
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6 md:p-8 border border-white/[0.04] bg-[var(--graphite)]/50"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase tracking-[0.1em] text-[var(--titanium)] mb-2"
                    >
                      {t("name")} *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className={cn(
                        "w-full px-4 py-3 bg-[var(--graphite)] border border-white/[0.08]",
                        "text-[var(--off-white)] text-sm placeholder:text-[var(--titanium)]/40",
                        "focus:border-[var(--copper)] focus:outline-none transition-colors duration-300"
                      )}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs uppercase tracking-[0.1em] text-[var(--titanium)] mb-2"
                    >
                      {t("phone")} *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      dir="ltr"
                      className={cn(
                        "w-full px-4 py-3 bg-[var(--graphite)] border border-white/[0.08]",
                        "text-[var(--off-white)] text-sm placeholder:text-[var(--titanium)]/40",
                        "focus:border-[var(--copper)] focus:outline-none transition-colors duration-300"
                      )}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-[0.1em] text-[var(--titanium)] mb-2"
                  >
                    {t("email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    dir="ltr"
                    className={cn(
                      "w-full px-4 py-3 bg-[var(--graphite)] border border-white/[0.08]",
                      "text-[var(--off-white)] text-sm placeholder:text-[var(--titanium)]/40",
                      "focus:border-[var(--copper)] focus:outline-none transition-colors duration-300"
                    )}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-[0.1em] text-[var(--titanium)] mb-2"
                  >
                    {t("message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className={cn(
                      "w-full px-4 py-3 bg-[var(--graphite)] border border-white/[0.08] resize-none",
                      "text-[var(--off-white)] text-sm placeholder:text-[var(--titanium)]/40",
                      "focus:border-[var(--copper)] focus:outline-none transition-colors duration-300"
                    )}
                  />
                </div>

                {/* Submit */}
                <MagneticElement strength={0.15}>
                <button
                  type="submit"
                  data-cursor-accent
                  disabled={formState === "sending" || formState === "success"}
                  className={cn(
                    "w-full py-3.5 text-[13px] uppercase tracking-[0.1em] font-semibold transition-all duration-300",
                    formState === "success"
                      ? "bg-green-700/80 text-white"
                      : "bg-[var(--copper)] text-[var(--graphite)] hover:bg-[var(--copper)]/90",
                    "disabled:opacity-70"
                  )}
                >
                  {formState === "sending"
                    ? "..."
                    : formState === "success"
                      ? t("success")
                      : t("send")}
                </button>
                </MagneticElement>

                {formState === "error" && (
                  <p className="text-sm text-red-400 text-center">
                    {t("error")}
                  </p>
                )}
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
