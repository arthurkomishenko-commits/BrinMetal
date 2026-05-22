import type { Locale, NavigationItem } from "@/types";

export const siteConfig = {
  name: "BrinMetal",
  defaultLocale: "he" as Locale,
  locales: ["he", "ru"] as Locale[],

  contact: {
    phone: "+972-00-000-0000",
    email: "info@brinmetal.co.il",
    address: {
      he: "\u05d0\u05d6\u05d5\u05e8 \u05e0\u05ea\u05e0\u05d9\u05d4, \u05d9\u05e9\u05e8\u05d0\u05dc",
      ru: "\u0420\u0430\u0439\u043e\u043d \u041d\u0435\u0442\u0430\u043d\u0438\u0438, \u0418\u0437\u0440\u0430\u0438\u043b\u044c",
    },
  },

  social: {
    facebook: "https://facebook.com/brinmetal",
    instagram: "https://instagram.com/brinmetal",
    whatsapp: "https://wa.me/97200000000",
  },
} as const;

export const navigationItems: NavigationItem[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.about", href: "/#about" },
  { labelKey: "nav.services", href: "/#services" },
  { labelKey: "nav.projects", href: "/#projects" },
  { labelKey: "nav.contact", href: "/#contact" },
];
