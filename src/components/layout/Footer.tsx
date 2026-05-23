"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin, ChevronUp } from "lucide-react";
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

  function handleBackToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative bg-[var(--graphite)] footer-shimmer">

      {/* Engineering tagline bar */}
      <div className="border-b border-white/[0.04]">
        <div className="container-wide py-4 sm:py-5 flex items-center justify-between">
          <span className="eng-label text-[var(--warm-steel)] tracking-[0.15em] opacity-40 text-base">
            STRUCTURAL ENGINEERING | METAL FABRICATION | EST. 2004
          </span>
          <button
            onClick={handleBackToTop}
            aria-label="Back to top"
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 border border-white/[0.06] text-[var(--titanium)] active:text-[var(--copper)] md:hover:text-[var(--copper)] md:hover:border-[var(--copper)]/30 transition-colors duration-300"
          >
            <ChevronUp size={16} />
          </button>
        </div>
      </div>

      <div className="container-wide pt-10 pb-6 sm:pt-14 sm:pb-8 md:pt-16 md:pb-10">
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
              <p className="text-base text-[var(--titanium)] leading-relaxed max-w-xs">
                {t("footer.tagline")}
              </p>
              <div className="mt-4 w-10 h-[1px] bg-[var(--copper)]/20" />
            </div>

            {/* Navigation */}
            <div className="md:col-span-3">
              <h4 className="text-base sm:text-base uppercase tracking-[0.15em] font-semibold text-[var(--warm-steel)] mb-3 sm:mb-5">
                {t("nav.home")}
              </h4>
              <nav className="flex flex-col gap-2 sm:gap-2.5">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.href)}
                    className="text-base text-[var(--titanium)] active:text-[var(--off-white)] md:hover:text-[var(--off-white)] transition-colors duration-200 text-start min-h-[36px] sm:min-h-0 flex items-center"
                  >
                    {t(item.key)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="md:col-span-5">
              <h4 className="text-base sm:text-base uppercase tracking-[0.15em] font-semibold text-[var(--warm-steel)] mb-3 sm:mb-5">
                {t("contact.title")}
              </h4>
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2.5 sm:gap-3 text-base text-[var(--titanium)] active:text-[var(--off-white)] md:hover:text-[var(--off-white)] transition-colors min-h-[36px] sm:min-h-0"
                >
                  <Phone size={13} className="text-[var(--copper)] shrink-0" />
                  <span dir="ltr">{siteConfig.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2.5 sm:gap-3 text-base text-[var(--titanium)] active:text-[var(--off-white)] md:hover:text-[var(--off-white)] transition-colors min-h-[36px] sm:min-h-0"
                >
                  <Mail size={13} className="text-[var(--copper)] shrink-0" />
                  {siteConfig.contact.email}
                </a>
                <div className="flex items-center gap-2.5 sm:gap-3 text-base text-[var(--titanium)]">
                  <MapPin size={13} className="text-[var(--copper)] shrink-0" />
                  {siteConfig.contact.address[locale]}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Bottom */}
        <div className="mt-10 sm:mt-14 pt-5 sm:pt-6 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-base sm:text-base text-[var(--titanium)]/60">
              &copy; {year} {siteConfig.name}. {t("footer.rights")}
            </p>
            <div className="flex items-center gap-4 sm:gap-5">
              {siteConfig.social.whatsapp && (
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-base text-[var(--titanium)]/60 active:text-[var(--copper)] md:hover:text-[var(--copper)] transition-colors duration-300 min-h-[36px] sm:min-h-0 flex items-center"
                >
                  WhatsApp
                </a>
              )}
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-base text-[var(--titanium)]/60 active:text-[var(--copper)] md:hover:text-[var(--copper)] transition-colors duration-300 min-h-[36px] sm:min-h-0 flex items-center"
                >
                  Facebook
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-base text-[var(--titanium)]/60 active:text-[var(--copper)] md:hover:text-[var(--copper)] transition-colors duration-300 min-h-[36px] sm:min-h-0 flex items-center"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Heavy bottom edge */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[var(--copper)]/20 to-transparent" />
    </footer>
  );
}
