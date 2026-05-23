"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
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
  const [activeSection, setActiveSection] = useState("");

  const alternateLocale: Locale = locale === "he" ? "ru" : "he";
  const alternateLabel = locale === "he" ? "RU" : "עב";

  // Track scroll + active section
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);

      // Find which section is in viewport center
      const sections = ["about", "services", "projects", "contact"];
      const viewportCenter = window.innerHeight / 2;
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    import("gsap").then(({ default: gsap }) => {
      const tl = gsap.timeline();
      tl.fromTo("[data-mobile-menu]", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" });
      tl.from("[data-mobile-link]", { y: 40, opacity: 0, duration: 0.4, ease: "power3.out", stagger: 0.08 }, "-=0.2");
    });
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      if (href.startsWith("#")) {
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) scrollTo(el as HTMLElement, { offset: -70, duration: 1.2 });
        }, 100);
      }
    },
    [scrollTo]
  );

  const closeMobile = useCallback(() => {
    if (mobileOpen) {
      import("gsap").then(({ default: gsap }) => {
        gsap.to("[data-mobile-menu]", { clipPath: "inset(0 0 100% 0)", duration: 0.4, ease: "power3.inOut", onComplete: () => setMobileOpen(false) });
      });
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        data-header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-700",
          scrolled
            ? "backdrop-blur-xl border-b shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        )}
        style={scrolled ? {
          background: "linear-gradient(180deg, rgba(17,17,19,0.97) 0%, rgba(22,22,25,0.95) 100%)",
          borderColor: "rgba(255,255,255,0.04)",
          borderBottomWidth: "1px",
        } : undefined}
      >
        <div className="container-wide flex items-center justify-between py-4 sm:py-5 md:py-6">
          {/* Logo */}
          <Link href={`/${locale}`} className="relative z-50 group" onClick={() => mobileOpen && closeMobile()}>
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-[-0.02em] text-[var(--off-white)] transition-colors duration-300 group-hover:text-[var(--copper)]">BRIN</span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-[-0.02em] text-[var(--copper)] transition-colors duration-300 group-hover:text-[var(--off-white)]">METAL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "relative px-4 py-2 text-base uppercase tracking-[0.08em] font-medium transition-colors duration-300",
                    isActive ? "text-[var(--off-white)]" : "text-[var(--titanium)] hover:text-[var(--off-white)]"
                  )}
                >
                  {t(item.key)}
                  <span className={cn(
                    "absolute bottom-0 inset-x-4 h-[1px] bg-[var(--copper)] transition-transform duration-300 origin-start",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </button>
              );
            })}

            <div className="w-[1px] h-5 bg-white/10 mx-3" />

            <Link href={`/${alternateLocale}`} className="px-3 py-1.5 text-base uppercase tracking-[0.1em] font-medium text-[var(--titanium)] border border-white/10 hover:border-[var(--copper)] hover:text-[var(--copper)] transition-all duration-300">
              {alternateLabel}
            </Link>

            <Link
              href={`/${locale}#contact`}
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="ms-4 px-6 py-2.5 text-base uppercase tracking-[0.1em] font-semibold bg-[var(--copper)] text-[var(--graphite)] hover:bg-[var(--copper)]/90 transition-all duration-300"
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Mobile: language + hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href={`/${alternateLocale}`}
              className="relative z-50 px-3 py-1.5 text-base uppercase tracking-[0.08em] font-medium text-[var(--titanium)] border border-white/10 active:border-[var(--copper)] active:text-[var(--copper)] min-h-[40px] flex items-center"
            >
              {alternateLabel}
            </Link>
          <button
            onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
            className="relative z-50 flex flex-col justify-center items-center w-11 h-11"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className={cn("block w-5 sm:w-6 h-[1.5px] bg-[var(--off-white)] transition-all duration-300 ease-[cubic-bezier(0.77,0,0.18,1)]", mobileOpen ? "rotate-45 translate-y-[3px]" : "translate-y-[-3px]")} />
            <span className={cn("block w-5 sm:w-6 h-[1.5px] bg-[var(--off-white)] transition-all duration-300 ease-[cubic-bezier(0.77,0,0.18,1)]", mobileOpen ? "-rotate-45 -translate-y-[0px]" : "translate-y-[3px]")} />
          </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      {mobileOpen && (
        <div data-mobile-menu className="fixed inset-0 z-30 bg-[var(--graphite)] flex flex-col justify-center items-center px-6" style={{ clipPath: "inset(0 0 100% 0)" }}>
          <div className="absolute top-1/4 start-6 w-12 h-[1px] bg-[var(--copper)]/30" />
          <nav className="flex flex-col items-center gap-1 sm:gap-2">
            {NAV_ITEMS.map((item, i) => (
              <button key={item.key} data-mobile-link onClick={() => handleNavClick(item.href)} className="text-[28px] sm:text-4xl font-bold text-[var(--off-white)] active:text-[var(--copper)] transition-colors duration-200 py-3 sm:py-4 min-h-[48px] flex items-center">
                <span className="text-[var(--copper)]/40 text-base font-normal me-3 tabular-nums">0{i + 1}</span>
                {t(item.key)}
              </button>
            ))}
            <div data-mobile-link className="flex items-center gap-3 sm:gap-4 mt-8 sm:mt-10 pt-8 border-t border-white/10 w-full justify-center">
              <Link href={`/${alternateLocale}`} className="px-5 py-2.5 text-base uppercase tracking-[0.1em] font-medium text-[var(--titanium)] border border-white/10 active:border-[var(--copper)] active:text-[var(--copper)] transition-all duration-200 min-h-[44px] flex items-center">
                {alternateLabel}
              </Link>
              <button onClick={() => handleNavClick("#contact")} className="px-6 py-2.5 text-base uppercase tracking-[0.1em] font-semibold bg-[var(--copper)] text-[var(--graphite)] active:bg-[var(--copper)]/80 min-h-[44px] flex items-center">
                {t("contact")}
              </button>
            </div>
          </nav>
          <div data-mobile-link className="absolute bottom-8 inset-x-6 text-center">
            <p className="eng-label opacity-20">STRUCTURAL ENGINEERING SINCE 2004</p>
          </div>
        </div>
      )}
    </>
  );
}
