"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLenis } from "@/hooks/useLenis";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

const NAV_ITEMS = [
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.contact", href: "#contact" },
] as const;

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { scrollTo } = useLenis();
  const year = new Date().getFullYear();

  function handleNavClick(href: string) {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
      }
    }
  }

  return (
    <footer className="relative bg-[var(--graphite)] border-t border-white/[0.06]">
      {/* Accent line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--copper)]/30 to-transparent" />

      <div className="container-wide pt-16 pb-8 md:pt-20 md:pb-10">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand Column */}
            <div className="md:col-span-4">
              <div className="mb-4">
                <span className="text-2xl font-bold tracking-[-0.02em] text-[var(--off-white)]">
                  BRIN
                </span>
                <span className="text-2xl font-bold tracking-[-0.02em] text-[var(--copper)]">
                  METAL
                </span>
              </div>
              <p className="text-sm text-[var(--titanium)] leading-relaxed max-w-xs">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3">
              <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--warm-steel)] mb-5">
                {t("nav.home")}
              </h4>
              <nav className="flex flex-col gap-2.5">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm text-[var(--titanium)] hover:text-[var(--off-white)] transition-colors duration-200 text-start"
                  >
                    {t(item.key)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-5">
              <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--warm-steel)] mb-5">
                {t("contact.title")}
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-3 text-sm text-[var(--titanium)] hover:text-[var(--off-white)] transition-colors group"
                >
                  <Phone
                    size={14}
                    className="text-[var(--copper)] shrink-0"
                  />
                  <span dir="ltr">{siteConfig.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-sm text-[var(--titanium)] hover:text-[var(--off-white)] transition-colors"
                >
                  <Mail size={14} className="text-[var(--copper)] shrink-0" />
                  {siteConfig.contact.email}
                </a>
                <div className="flex items-center gap-3 text-sm text-[var(--titanium)]">
                  <MapPin
                    size={14}
                    className="text-[var(--copper)] shrink-0"
                  />
                  {siteConfig.contact.address[locale]}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--titanium)]/60">
            &copy; {year} {siteConfig.name}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-5">
            {siteConfig.social.whatsapp && (
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--titanium)]/60 hover:text-[var(--copper)] transition-colors duration-300"
              >
                WhatsApp
              </a>
            )}
            {siteConfig.social.facebook && (
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--titanium)]/60 hover:text-[var(--copper)] transition-colors duration-300"
              >
                Facebook
              </a>
            )}
            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--titanium)]/60 hover:text-[var(--copper)] transition-colors duration-300"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
