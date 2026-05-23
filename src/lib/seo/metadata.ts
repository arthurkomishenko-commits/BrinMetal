import type { Metadata } from "next";
import type { Locale } from "@/types";

const SITE_URL = "https://brinmetal.co.il";

const defaultMeta = {
  he: {
    title: "BrinMetallll | \u05d9\u05d9\u05e6\u05d5\u05e8 \u05de\u05ea\u05db\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9",
    description:
      "\u05d9\u05d9\u05e6\u05d5\u05e8 \u05de\u05ea\u05db\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9, \u05e8\u05d9\u05ea\u05d5\u05da \u05de\u05e7\u05e6\u05d5\u05e2\u05d9, \u05e9\u05e2\u05e8\u05d9\u05dd, \u05d2\u05d3\u05e8\u05d5\u05ea, \u05de\u05d3\u05e8\u05d2\u05d5\u05ea \u05d5\u05e4\u05ea\u05e8\u05d5\u05e0\u05d5\u05ea \u05d4\u05e0\u05d3\u05e1\u05d9\u05d9\u05dd \u05de\u05d5\u05ea\u05d0\u05de\u05d9\u05dd \u05d0\u05d9\u05e9\u05d9\u05ea. \u05d0\u05d6\u05d5\u05e8 \u05e0\u05ea\u05e0\u05d9\u05d4.",
  },
  ru: {
    title: "BrinMetallll | \u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0435 \u043c\u0435\u0442\u0430\u043b\u043b\u043e\u0438\u0437\u0433\u043e\u0442\u043e\u0432\u043b\u0435\u043d\u0438\u0435",
    description:
      "\u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0435 \u043c\u0435\u0442\u0430\u043b\u043b\u043e\u0438\u0437\u0433\u043e\u0442\u043e\u0432\u043b\u0435\u043d\u0438\u0435, \u0441\u0432\u0430\u0440\u043a\u0430, \u0432\u043e\u0440\u043e\u0442\u0430, \u043e\u0433\u0440\u0430\u0436\u0434\u0435\u043d\u0438\u044f, \u043b\u0435\u0441\u0442\u043d\u0438\u0446\u044b \u0438 \u0438\u043d\u0436\u0435\u043d\u0435\u0440\u043d\u044b\u0435 \u0440\u0435\u0448\u0435\u043d\u0438\u044f \u043d\u0430 \u0437\u0430\u043a\u0430\u0437. \u0420\u0430\u0439\u043e\u043d \u041d\u0435\u0442\u0430\u043d\u0438\u0438.",
  },
} as const;

interface MetadataParams {
  title?: string;
  description?: string;
  locale: Locale;
  path?: string;
}

export function generateMetadata({
  title,
  description,
  locale,
  path = "",
}: MetadataParams): Metadata {
  const defaults = defaultMeta[locale];
  const resolvedTitle = title || defaults.title;
  const resolvedDescription = description || defaults.description;
  const url = `${SITE_URL}/${locale}${path}`;

  const alternateLocale: Locale = locale === "he" ? "ru" : "he";

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        [alternateLocale]: `${SITE_URL}/${alternateLocale}${path}`,
      },
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: "BrinMetallll",
      locale: locale === "he" ? "he_IL" : "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
    },
  };
}

export { SITE_URL, defaultMeta };
