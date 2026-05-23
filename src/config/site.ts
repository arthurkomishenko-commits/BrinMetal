import type { Locale } from "@/types";

export const siteConfig = {
  name: "BrinMetall",
  defaultLocale: "he" as Locale,
  locales: ["he", "ru"] as Locale[],

  contact: {
    phone: "055-972-2255",
    email: "info@brinmetal.co.il",
    address: {
      he: "\u05d0\u05d6\u05d5\u05e8 \u05e0\u05ea\u05e0\u05d9\u05d4, \u05d9\u05e9\u05e8\u05d0\u05dc",
      ru: "\u0420\u0430\u0439\u043e\u043d \u041d\u0435\u0442\u0430\u043d\u0438\u0438, \u0418\u0437\u0440\u0430\u0438\u043b\u044c",
    },
  },

  social: {
    facebook: "https://facebook.com/brinmetal",
    instagram: "https://instagram.com/brinmetal",
    whatsapp: "https://wa.me/9720559722255?text=%D7%A9%D7%9C%D7%95%D7%9D%2C+%D7%90%D7%A0%D7%99+%D7%9E%D7%AA%D7%A2%D7%A0%D7%99%D7%99%D7%9F+%D7%91%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99+%D7%9E%D7%AA%D7%9B%D7%AA",
  },
} as const;
