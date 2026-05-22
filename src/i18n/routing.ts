import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["he", "ru"],
  defaultLocale: "he",
  localePrefix: "always",
});
