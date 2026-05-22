"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap-config";
import { cn } from "@/lib/utils";
import { useLenis } from "@/hooks/useLenis";
import type { Locale } from "@/types";

const NAV_ITEMS = [
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const { scrollTo } = useLenis();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const alternateLocale: Locale = locale === "he" ? "ru" : "he";
  const alternateLabel = locale === "he" ? "RU" : "עב";

  // Track scroll position for header background
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Animate header entrance
  useGSAP(() => {
    gsap.from("[data-header]", {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    });
  });

  // Animate mobile menu
  useGSAP(
    () => {
      if (mobileOpen) {
        const tl = gsap.timeline();
        tl.fromTo(
          "[data-mobile-menu]",
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.6,
            ease: "power4.inOut",
          }
        );
        tl.from(
          "[data-mobile-link]",
          {
            y: 40,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.2"
        );
      }
    },
    { dependencies: [mobileOpen] }
  );

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) {
          scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
        }
      }
    },
    [scrollTo]
  );

  const closeMobile = useCallback(() => {
    if (mobileOpen) {
      gsap.to("[data-mobile-menu]", {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => setMobileOpen(false),
      });
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        data-header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-[var(--graphite)]/95 backdrop-blur-lg border-b border-white/[0.06] shadow-[0_1px_20px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="container-wide flex items-center justify-between h-18 md:h-22">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="relative z-50 group"
            onClick={() => mobileOpen && closeMobile()}
          >
            <span className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-[var(--off-white)] transition-colors duration-300 group-hover:text-[var(--copper)]">
              BRIN
            </span>
            <span className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-[var(--copper)] transition-colors duration-300 group-hover:text-[var(--off-white)]">
              METAL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="relative px-4 py-2 text-[13px] uppercase tracking-[0.08em] font-medium text-[var(--titanium)] hover:text-[var(--off-white)] transition-colors duration-300 group"
              >
                {t(item.key)}
                <span className="absolute bottom-0 inset-x-4 h-[1px] bg-[var(--copper)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-start" />
              </button>
            ))}

            {/* Accent divider */}
            <div className="w-[1px] h-5 bg-white/10 mx-3" />

            {/* Language Switcher */}
            <Link
              href={`/${alternateLocale}`}
              className="px-3 py-1.5 text-[12px] uppercase tracking-[0.1em] font-medium text-[var(--titanium)] border border-white/10 hover:border-[var(--copper)] hover:text-[var(--copper)] transition-all duration-300"
            >
              {alternateLabel}
            </Link>

            {/* CTA Button */}
            <Link
              href={`/${locale}#contact`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="ms-4 px-6 py-2.5 text-[12px] uppercase tracking-[0.1em] font-semibold bg-[var(--copper)] text-[var(--graphite)] hover:bg-[var(--copper)]/90 transition-all duration-300"
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
            className="relative z-50 lg:hidden flex flex-col justify-center items-center w-10 h-10"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={cn(
                "block w-6 h-[1.5px] bg-[var(--off-white)] transition-all duration-300 ease-[cubic-bezier(0.77,0,0.18,1)]",
                mobileOpen
                  ? "rotate-45 translate-y-[3px]"
                  : "translate-y-[-3px]"
              )}
            />
            <span
              className={cn(
                "block w-6 h-[1.5px] bg-[var(--off-white)] transition-all duration-300 ease-[cubic-bezier(0.77,0,0.18,1)]",
                mobileOpen
                  ? "-rotate-45 -translate-y-[0px]"
                  : "translate-y-[3px]"
              )}
            />
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      {mobileOpen && (
        <div
          data-mobile-menu
          className="fixed inset-0 z-30 bg-[var(--graphite)] flex flex-col justify-center items-center"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        >
          <nav className="flex flex-col items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                data-mobile-link
                onClick={() => handleNavClick(item.href)}
                className="text-3xl sm:text-4xl font-bold text-[var(--off-white)] hover:text-[var(--copper)] transition-colors duration-300 py-3"
              >
                {t(item.key)}
              </button>
            ))}

            {/* Language + CTA in mobile */}
            <div
              data-mobile-link
              className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10"
            >
              <Link
                href={`/${alternateLocale}`}
                className="px-5 py-2 text-sm uppercase tracking-[0.1em] font-medium text-[var(--titanium)] border border-white/10 hover:border-[var(--copper)] hover:text-[var(--copper)] transition-all duration-300"
              >
                {alternateLabel}
              </Link>
              <button
                onClick={() => handleNavClick("#contact")}
                className="px-6 py-2.5 text-sm uppercase tracking-[0.1em] font-semibold bg-[var(--copper)] text-[var(--graphite)]"
              >
                {t("contact")}
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
