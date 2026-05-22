# BrinMetal

Premium industrial engineering website for a metal fabrication company based in Israel (Netanya area).

## About

BrinMetal specializes in heavy metal structures, structural reinforcement, gates, fences, custom staircases, architectural metal fabrication, emergency metal works, and custom engineering solutions. 20+ years of professional experience.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** GSAP + ScrollTrigger + Lenis smooth scroll
- **Motion:** Framer Motion (where needed)
- **i18n:** next-intl (Hebrew primary, Russian secondary)
- **UI Utilities:** clsx, tailwind-merge, class-variance-authority, lucide-react

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
  app/[locale]/        # Locale-based routing (he, ru)
  components/
    ui/                # Reusable UI primitives
    layout/            # Header, Footer, Navigation
    sections/          # Page sections (Hero, About, etc.)
    motion/            # GSAP animation wrappers
  lib/
    motion/            # GSAP utilities and configs
    seo/               # SEO metadata and schema utilities
  hooks/               # Custom React hooks
  styles/              # Global styles
  types/               # TypeScript type definitions
  config/              # Site configuration
  messages/            # i18n translation files (he.json, ru.json)
  i18n/                # next-intl configuration
docs/                  # Project documentation
```

## Documentation

All project documentation is in the `docs/` directory. Key files:

- `PROJECT_MANIFESTO.md` - Vision and mission
- `BRAND_DNA.md` - Brand identity system
- `DESIGN_SYSTEM.md` - Design tokens and patterns
- `MOTION_GUIDELINES.md` - Animation philosophy and rules
- `ARCHITECTURE.md` - Technical architecture
- `ROADMAP.md` - Implementation phases
- `SEO_STRATEGY.md` - SEO infrastructure plan

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Design Philosophy

Dark-only, premium industrial aesthetic. Inspired by architectural engineering studios, not generic welding websites. Every animation has physical mass. Every element has purpose.

## Languages

- Hebrew (primary, RTL)
- Russian (secondary, LTR)
