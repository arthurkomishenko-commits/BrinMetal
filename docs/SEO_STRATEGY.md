# BrinMetal -- SEO Strategy

## Overview

SEO is built into the architecture from day one. Every page, component, and content decision considers search visibility. Target market: Israel, primarily central region. The goal is to establish BrinMetal as the top-ranking metal fabrication company in the Netanya/Central Israel region across Hebrew, Russian, and English search results.

---

## 1. Schema.org Structured Data

### 1.1 LocalBusiness (Sitewide)

Applied site-wide via JSON-LD in the root layout.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://brinmetal.co.il/#business",
  "name": "BrinMetal",
  "alternateName": ["BrinMetal Ltd", "BrinMetal Metalworks"],
  "description": "Professional metal fabrication, welding, gates, fences, staircases, and structural steelwork in Netanya, Israel.",
  "url": "https://brinmetal.co.il",
  "telephone": "+972-XX-XXX-XXXX",
  "email": "info@brinmetal.co.il",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "TBD",
    "addressLocality": "Netanya",
    "addressRegion": "Center District",
    "postalCode": "XXXXX",
    "addressCountry": "IL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "32.3215",
    "longitude": "34.8532"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$-$$$",
  "image": "https://brinmetal.co.il/images/og/default.jpg",
  "sameAs": [
    "https://www.facebook.com/brinmetal",
    "https://www.instagram.com/brinmetal"
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "32.3215",
      "longitude": "34.8532"
    },
    "geoRadius": "50000"
  }
}
```

### 1.2 Service Schema (Per Service)

Applied on each service/capability page.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Metal Gate Fabrication",
  "provider": { "@id": "https://brinmetal.co.il/#business" },
  "areaServed": {
    "@type": "State",
    "name": "Central District, Israel"
  },
  "description": "Custom metal gate design and fabrication.",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "ILS"
    }
  }
}
```

### 1.3 Product Schema (Project Showcase)

Applied on project showcase items (completed works).

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Custom Wrought Iron Gate",
  "description": "Hand-forged wrought iron entrance gate with decorative elements.",
  "image": "https://brinmetal.co.il/images/projects/gate-01.jpg",
  "brand": { "@id": "https://brinmetal.co.il/#business" },
  "manufacturer": { "@id": "https://brinmetal.co.il/#business" }
}
```

### 1.4 FAQPage Schema

Applied on FAQ sections within service pages.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does a custom gate take to fabricate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typical gate fabrication takes 2-4 weeks from design approval."
      }
    }
  ]
}
```

### 1.5 BreadcrumbList (All Pages)

Generated dynamically per page for navigation trail markup.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://brinmetal.co.il/he"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://brinmetal.co.il/he/services"
    }
  ]
}
```

---

## 2. Local SEO for Israel / Netanya

### 2.1 Google Business Profile

- Claim and verify Google Business Profile for "BrinMetal" in Netanya.
- Set primary category: "Metal Fabrication Company".
- Set secondary categories: "Welder", "Fence Contractor", "Gate Contractor".
- Upload high-quality photos of completed projects regularly.
- Respond to all reviews within 24 hours.
- Post weekly updates (project completions, new capabilities).

### 2.2 Local Citations

Register on the following Israeli business directories:

- d.co.il (Dapei Zahav / Yellow Pages Israel)
- b144.co.il
- infoglobus.co.il
- locali.co.il
- Google Maps
- Waze Business

### 2.3 NAP Consistency

Name, Address, Phone must be identical across all listings:

```
BrinMetal
[Full street address], Netanya, Israel [Postal Code]
+972-XX-XXX-XXXX
```

### 2.4 Local Content Strategy

- Create location-specific landing pages:
  - `/he/metalwork-netanya`
  - `/he/metalwork-herzliya`
  - `/he/metalwork-hadera`
  - `/he/metalwork-tel-aviv`
- Each page targets "[service] + [city]" keywords.
- Include local landmarks, area-specific project references.

### 2.5 Reviews Integration (Future)

- Collect reviews on Google Business Profile.
- Display review aggregate rating via schema markup.
- Respond to all reviews publicly.

---

## 3. Metadata System

### 3.1 Per-Page Metadata Function

Every page generates unique metadata via the `generateMetadata()` function:

```typescript
// src/lib/seo/metadata.ts

export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  image?: string;
  noindex?: boolean;
  alternates?: { locale: string; url: string }[];
}

export function generatePageMetadata(
  meta: PageMeta,
  locale: string
): Metadata {
  const siteName = 'BrinMetal';
  const baseUrl = 'https://brinmetal.co.il';

  return {
    title: `${meta.title} | ${siteName}`,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}${meta.canonical}`,
      languages: Object.fromEntries(
        (meta.alternates ?? []).map((alt) => [
          alt.locale,
          `${baseUrl}${alt.url}`,
        ])
      ),
    },
    openGraph: {
      title: `${meta.title} | ${siteName}`,
      description: meta.description,
      url: `${baseUrl}/${locale}${meta.canonical}`,
      siteName,
      images: [
        {
          url: meta.image ?? `${baseUrl}/images/og/default.jpg`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      locale: locale === 'he' ? 'he_IL' : locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | ${siteName}`,
      description: meta.description,
      images: [meta.image ?? `${baseUrl}/images/og/default.jpg`],
    },
    robots: meta.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
```

### 3.2 Page-Level Metadata

Each route defines its own metadata:

| Page         | Title (HE)                                           | Description                                                |
| ------------ | ---------------------------------------------------- | ---------------------------------------------------------- |
| Home         | BrinMetal -- ייצור מתכת מקצועי ופתרונות הנדסיים     | Professional metal fabrication, welding, and structural work |
| About        | About BrinMetal                                      | Our story, team, and commitment to quality metalwork       |
| Capabilities | Our Capabilities                                     | Full-service metal fabrication: gates, fences, stairs      |
| Projects     | Our Projects                                         | Portfolio of completed metalwork projects in Israel        |
| Contact      | Contact Us                                           | Get a free quote for your metal fabrication project        |

---

## 4. OpenGraph and Twitter Cards

### 4.1 Default OG Image

- Dimensions: 1200x630px.
- Format: JPEG, optimized (<200KB).
- Content: BrinMetal logo on dark metallic background with tagline.
- Location: `/public/images/og/default.jpg`.

### 4.2 Per-Page OG Images

Generate unique OG images for key pages using `next/og` (ImageResponse API) or pre-designed static images:

- Home: Hero shot of signature project.
- Capabilities: Grid of service categories.
- Projects: Featured project highlight.
- Contact: Map/location visual.

### 4.3 Twitter Card Configuration

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@brinmetal" />
```

---

## 5. Sitemap Strategy

### 5.1 Dynamic Sitemap Generation

Dynamic sitemap generated via `app/sitemap.ts`:

```typescript
// src/app/sitemap.ts

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://brinmetal.co.il';
  const locales = ['he', 'ru'];
  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/projects', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page.path}`])
          ),
        },
      });
    }
  }

  return entries;
}
```

### 5.2 Sitemap Index (Future)

When blog/catalog pages are added, split into multiple sitemaps:

- `sitemap-pages.xml` -- static pages
- `sitemap-projects.xml` -- project catalog
- `sitemap-blog.xml` -- blog posts
- `sitemap-index.xml` -- index file referencing all above

---

## 6. robots.txt

```txt
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://brinmetal.co.il/sitemap.xml
```

---

## 7. Core Web Vitals and Performance Targets

| Metric                        | Target    | Strategy                                                  |
| ----------------------------- | --------- | --------------------------------------------------------- |
| Largest Contentful Paint (LCP)| < 2.5s    | Next/Image optimization, preload hero images, edge CDN    |
| First Input Delay (FID) / INP | < 100ms   | Minimal JS on initial load, code splitting, defer scripts |
| Cumulative Layout Shift (CLS) | < 0.1     | Explicit image dimensions, font-display: swap, no FOUC    |
| Time to First Byte (TTFB)     | < 600ms   | SSG for static pages, CDN edge caching                    |
| First Contentful Paint (FCP)  | < 1.8s    | Inline critical CSS, preload fonts                        |
| Lighthouse Performance        | 95+       | Full optimization pipeline                                |
| Lighthouse SEO                | 100       | Complete metadata, schema, semantic HTML                   |
| Lighthouse Accessibility      | 95+       | WCAG 2.1 AA compliance                                    |
| Lighthouse Best Practices     | 95+       | Security headers, HTTPS, modern APIs                       |

### 7.1 Performance Budget

- Total page weight (initial load): < 500KB.
- JavaScript bundle (first load): < 150KB gzipped.
- Images per page: max 10 initially visible, lazy-load the rest.
- Font files: max 2 font families, subset to used characters.
- Third-party scripts: defer all, load after interaction.

### 7.2 Image Optimization

- Next.js Image component for all images.
- WebP/AVIF formats via Next.js automatic conversion.
- Responsive srcset with proper `sizes` attribute.
- Blur placeholders for above-fold images.
- Lazy loading for below-fold images.
- Descriptive alt text in both languages.

### 7.3 Semantic HTML

- Proper heading hierarchy (single H1 per page).
- Semantic elements: header, nav, main, section, article, footer.
- ARIA landmarks where needed.
- Proper list markup for navigation.
- Figure/figcaption for project images.

---

## 8. Multilingual SEO (hreflang)

### 8.1 Supported Locales

| Locale | Language | Direction | Primary Audience             |
| ------ | -------- | --------- | ---------------------------- |
| `he`   | Hebrew   | RTL       | Israeli Hebrew speakers      |
| `ru`   | Russian  | LTR       | Russian-speaking Israelis    |

### 8.2 hreflang Tags

Rendered in `<head>` on every page:

```html
<link rel="alternate" hreflang="he" href="https://brinmetal.co.il/he/about" />
<link rel="alternate" hreflang="ru" href="https://brinmetal.co.il/ru/about" />
<link rel="alternate" hreflang="x-default" href="https://brinmetal.co.il/he/about" />
```

- `x-default` points to Hebrew (primary market).
- Implemented via Next.js `generateMetadata` alternates.

### 8.3 URL Structure

```
/he/           -- Hebrew homepage
/he/about      -- Hebrew about page
/ru/           -- Russian homepage
/ru/about      -- Russian about page
```

---

## 9. Target Keywords

### 9.1 Hebrew Keywords (Primary)

| Category         | Primary Keywords                                             |
| ---------------- | ------------------------------------------------------------ |
| Core             | ייצור מתכת, ריתוך מקצועי, עבודות מתכת, מסגרות מתכת        |
| Structures       | מבנים ממתכת, מבני פלדה, מבנים כבדים, קונסטרוקציות מתכת     |
| Gates            | שערים ממתכת, שערים מעוצבים, שערי כניסה, שערי חשמל, שערי ברזל |
| Fences           | גדרות מתכת, גדרות ברזל, גידור, מעקות, מעקה מדרגות          |
| Staircases       | מדרגות ברזל, מדרגות מתכת, מדרגות בהתאמה אישית, מדרגות לולייניות |
| Reinforcement    | חיזוק מבנים, חיזוק מבני פלדה                               |
| Welding          | ריתוך, שירותי ריתוך, ריתוך TIG, ריתוך MIG                  |
| Location         | ריתוך בנתניה, עבודות מתכת נתניה, מסגר נתניה, עבודות מתכת מרכז |
| Emergency        | ריתוך חירום, תיקון מתכת דחוף                               |
| Outdoor          | פרגולות, פרגולות מתכת, סככות                               |

### 9.2 Russian Keywords (Secondary)

| Category         | Primary Keywords                                             |
| ---------------- | ------------------------------------------------------------ |
| Core             | металлоконструкции, сварка в Израиле, металлоизготовление, металлообработка |
| Structures       | металлические конструкции, стальные конструкции               |
| Gates            | ворота на заказ, кованые ворота, автоматические ворота, железные ворота |
| Fences           | заборы металлические, металлические ограждения, перила, кованые заборы |
| Staircases       | лестницы из металла, лестницы на заказ, металлические лестницы, винтовые лестницы |
| Welding          | сварочные работы, профессиональная сварка, сварка TIG/MIG     |
| Location         | сварка Нетания, металлоконструкции центр Израиля              |
| Outdoor          | перголы, навесы металлические                                |

---

## 10. Content SEO Strategy

### 10.1 Homepage

- Target: brand + core service keywords.
- Title: "BrinMetal | ייצור מתכת מקצועי ופתרונות הנדסיים"
- Comprehensive service overview.
- Trust signals (years, projects, clients).
- Location signals (Netanya, central Israel).

### 10.2 Future Service Pages

Each service gets a dedicated page:

```
/[locale]/services/heavy-structures
/[locale]/services/gates
/[locale]/services/fences
/[locale]/services/staircases
/[locale]/services/welding
/[locale]/services/pergolas
/[locale]/services/railings
/[locale]/services/reinforcement
```

Each with unique content, related projects, FAQ section (with FAQPage schema), and CTA.

### 10.3 Location Pages (Future)

```
/[locale]/areas/netanya
/[locale]/areas/herzliya
/[locale]/areas/hadera
/[locale]/areas/tel-aviv
/[locale]/areas/raanana
/[locale]/areas/kfar-saba
```

Each page: location-specific content, nearby project references, map embed.

### 10.4 Blog / Knowledge Base (Future)

```
/[locale]/blog
/[locale]/blog/[slug]
```

Content pillars:
- Industry articles in Hebrew.
- Project case studies with behind-the-scenes process.
- Technical content (material guides, steel types, corrosion protection).
- Location-based content ("Metal fabrication in Netanya").
- Maintenance tips for metal structures.

### 10.5 Project Catalog (Future)

```
/[locale]/projects/[category]
/[locale]/projects/[category]/[slug]
```

Filterable by: category, material, year, location.

---

## 11. Monitoring

- Google Search Console -- configured for all locale variants.
- Google Analytics 4 -- conversion tracking (form submissions, phone clicks, WhatsApp clicks).
- Core Web Vitals monitoring -- monthly Lighthouse audits.
- Keyword ranking tracking -- monthly position reports.
- Organic traffic analysis -- trend monitoring.
- Bing Webmaster Tools -- secondary search engine coverage.

---

## 12. Technical SEO Checklist

- [ ] All pages return 200 status codes.
- [ ] Canonical URLs set on every page.
- [ ] hreflang tags on every page.
- [ ] Schema.org JSON-LD on every page (LocalBusiness, Service, BreadcrumbList).
- [ ] No duplicate content across locales (unique translations).
- [ ] Image alt text in the page language.
- [ ] Proper heading hierarchy (single H1 per page).
- [ ] Internal linking structure between related pages.
- [ ] 404 page with navigation back to main content.
- [ ] SSL certificate active and redirecting HTTP to HTTPS.
- [ ] Mobile-responsive on all pages.
- [ ] Lighthouse scores above 95 in all categories.
- [ ] Structured data validated via Google Rich Results Test.
- [ ] Google Search Console configured.
- [ ] Bing Webmaster Tools configured.
- [ ] Sitemap submitted to search engines.
- [ ] robots.txt properly configured.
- [ ] No broken links.
