# BrinMetall - Development Instructions

## Project Overview
Premium industrial website for BrinMetall metal fabrication company. Next.js App Router + TypeScript + Tailwind + GSAP + next-intl.

## Critical Rules

### Design
- Dark-only theme. NOT pitch black -- use layered graphite/gunmetal/titanium grays
- No emojis anywhere in the codebase or UI
- No generic welding aesthetics, no orange spark overload, no cheap metallic textures
- Premium industrial feel: Porsche precision, Caterpillar power
- Brutalist geometry, architectural grids, large typography

### Animation (GSAP)
- Every motion must have MASS -- feel like moving steel, not floating divs
- Use industrial easing (power3-4), never bouncy/elastic
- GSAP + ScrollTrigger for scroll animations, Lenis for smooth scroll
- GPU-accelerated transforms only (translate, scale, opacity, rotate)
- 60fps minimum, test on mobile

### Architecture
- App Router with [locale] routing (he, ru)
- Hebrew is RTL, Russian is LTR -- handle dir attribute properly
- Server Components by default, 'use client' only when needed
- All text content via next-intl translation keys, never hardcoded
- SEO-first: semantic HTML, schema.org, proper metadata per page

### Code Standards
- TypeScript strict mode, no `any`
- Components: PascalCase files, one component per file
- Utilities: camelCase
- CSS: Tailwind classes via cn() utility, design system tokens as CSS variables
- No component duplication -- extract reusable patterns

### Colors (CSS Variables)
- --graphite: #1a1a1a (darkest background)
- --gunmetal: #2a2d35 (card/section backgrounds)
- --titanium: #8a8d93 (secondary text)
- --warm-steel: #b0a999 (accents, borders)
- --copper: #c4956a (primary accent/CTA)
- --off-white: #f5f5f0 (primary text)

### File Organization
- src/components/ui/ -- buttons, inputs, cards
- src/components/layout/ -- header, footer, nav
- src/components/sections/ -- page sections
- src/components/motion/ -- GSAP wrappers
- src/lib/motion/ -- animation configs and factories
- src/lib/seo/ -- metadata and schema utilities
- src/messages/ -- he.json, ru.json

## Commands
- `npm run dev` -- development server
- `npm run build` -- production build
- `npm run lint` -- ESLint check
