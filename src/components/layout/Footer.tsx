"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLenis } from "@/hooks/useLenis";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
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
        scrollTo(el as HTMLElement, { offset: -70, duration: 1.2 });
      }
    }
  }

  return (
    <footer className="relative bg-[var(--graphite)] border-t border-white/[0.06]">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--copper)]/30 to-transparent" />

      <div className="container-wide pt-12 pb-6 sm:pt-16 sm:pb-8 md:pt-20 md:pb-10">
        <RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 md:gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-4">
              <div className="mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[var(--off-white)]">
                  BRIN
                </span>
                <span className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[var(--copper)]">
                  METAL
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--titanium)] leading-relaxed max-w-xs">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3">
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--warm-steel)] mb-3 sm:mb-5">
                {t("nav.home")}
              </h4>
              <nav className="flex flex-col gap-2 sm:gap-2.5">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    className="text-xs sm:text-sm text-[var(--titanium)] active:text-[var(--off-white)] md:hover:text-[var(--off-white)] transition-colors duration-200 text-start min-h-[36px] sm:min-h-0 flex items-center"
                  >
                    {t(item.key)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="md:col-span-5">
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--warm-steel)] mb-3 sm:mb-5">
                {t("contact.title")}
              </h4>
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[var(--titanium)] active:text-[var(--off-white)] md:hover:text-[var(--off-white)] transition-colors min-h-[36px] sm:min-h-0"
                >
                  <Phone size={13} className="text-[var(--copper)] shrink-0" />
                  <span dir="ltr">{siteConfig.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[var(--titanium)] active:text-[var(--off-white)] md:hover:text-[var(--off-white)] transition-colors min-h-[36px] sm:min-h-0"
                >
                  <Mail size={13} className="text-[var(--copper)] shrink-0" />
                  {siteConfig.contact.email}
                </a>
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[var(--titanium)]">
                  <MapPin size={13} className="text-[var(--copper)] shrink-0" />
                  {siteConfig.contact.address[locale]}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Bottom */}
        <div className="mt-10 sm:mt-14 pt-5 sm:pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-[var(--titanium)]/60">
            &copy; {year} {siteConfig.name}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4 sm:gap-5">
            {siteConfig.social.whatsapp && (
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-xs text-[var(--titanium)]/60 active:text-[var(--copper)] md:hover:text-[var(--copper)] transition-colors duration-300 min-h-[36px] sm:min-h-0 flex items-center"
              >
                WhatsApp
              </a>
            )}
            {siteConfig.social.facebook && (
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-xs text-[var(--titanium)]/60 active:text-[var(--copper)] md:hover:text-[var(--copper)] transition-colors duration-300 min-h-[36px] sm:min-h-0 flex items-center"
              >
                Facebook
              </a>
            )}
            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-xs text-[var(--titanium)]/60 active:text-[var(--copper)] md:hover:text-[var(--copper)] transition-colors duration-300 min-h-[36px] sm:min-h-0 flex items-center"
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
