# BrinMetal -- Technical Architecture

## Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js (App Router) | SSG/SSR, routing, API routes |
| Language | TypeScript (strict) | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| Animation | GSAP + ScrollTrigger | Scroll and interaction animations |
| Smooth Scroll | Lenis | Premium scroll behavior |
| Motion (UI) | Framer Motion | Layout animations, presence |
| i18n | next-intl | Multilingual support (he, ru) |
| Icons | lucide-react | Consistent icon system |
| Utilities | clsx, tailwind-merge, cva | Class management |

## Directory Structure

```
/
├── docs/                          # Project documentation
├── public/
│   ├── fonts/                     # Self-hosted fonts
│   ├── images/                    # Static images
│   │   ├── hero/
│   │   ├── projects/
│   │   ├── workshop/
│   │   └── og/                    # OpenGraph images
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx         # Root locale layout
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── not-found.tsx      # 404 page
│   │   │   └── (pages)/           # Future sub-pages
│   │   │       ├── services/
│   │   │       ├── projects/
│   │   │       ├── about/
│   │   │       ├── contact/
│   │   │       └── blog/
│   │   ├── sitemap.ts             # Dynamic sitemap
│   │   └── robots.ts              # robots.txt generation
│   ├── components/
│   │   ├── ui/                    # Reusable primitives
│   │   ├── layout/                # Layout components
│   │   ├── sections/              # Page sections
│   │   └── motion/                # Animation wrappers
│   ├── lib/
│   │   ├── utils.ts               # cn() and general utilities
│   │   ├── motion/                # GSAP utilities
│   │   └── seo/                   # SEO utilities
│   ├── hooks/                     # Custom React hooks
│   ├── styles/                    # Global styles
│   ├── types/                     # TypeScript types
│   ├── config/                    # Site configuration
│   ├── messages/                  # i18n translation files
│   ├── i18n/                      # next-intl config
│   └── middleware.ts              # Locale middleware
├── CLAUDE.md
├── README.md
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Rendering Strategy

| Content | Strategy | Reason |
|---------|----------|--------|
| Homepage | SSG | Static content, maximum performance |
| Service pages | SSG | Static content |
| Project pages | SSG (ISR future) | Static with future dynamic updates |
| Blog posts | ISR | Dynamic content with revalidation |
| Contact form | Client + API Route | Client-side form, server-side processing |

## Component Architecture

### Principles

1. Server Components by default -- only add 'use client' when needed
2. Composition over inheritance
3. Single responsibility -- one component, one purpose
4. Props over context -- use context only for truly global state

### Data Flow

```
Translation Files (messages/*.json)
  → next-intl Provider
    → Layout (locale, dir)
      → Page (assembles sections)
        → Sections (compose UI + Motion)
          → UI Components (render)
```

## CMS-Ready Architecture

Content layer is abstracted for future CMS integration:
1. Translation files serve as initial content source
2. Type definitions match future CMS schema
3. Data fetching isolated in lib/ functions
4. Components receive typed props, agnostic to data source

## Database-Ready Architecture

PostgreSQL support planned for: lead storage, project catalog, blog posts, analytics, client management. ORM decision deferred (Prisma or Drizzle).
