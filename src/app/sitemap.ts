import type { MetadataRoute } from "next";

const BASE_URL = "https://brinmetal.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["he", "ru"];
  const now = new Date();

  const pages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${page.path}`])
          ),
        },
      });
    }
  }

  return entries;
}
