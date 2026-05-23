# BrinMetall - Development Instructions

## Project Overview
Premium industrial website for BrinMetall -- metal fabrication company in Netanya, Israel.
Owner: Andrey, 20+ years experience. Phone: 055-972-2255.

**Live site:** https://brinmetall.vercel.app
**Repo:** https://github.com/arthurkomishenko-commits/BrinMetal
**Path:** /Volumes/Artur 2 TB/Projects/BrinMetal

## Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"`, `@utility` syntax)
- **Animation:** GSAP (desktop only, dynamic import), CSS transitions (mobile)
- **i18n:** next-intl -- Hebrew RTL (default), Russian LTR
- **Fonts:** Space Grotesk (headings), Inter (body)
- **Deploy:** Vercel (auto-deploy from GitHub)
- **Proxy:** src/proxy.ts (Next.js 16 uses "proxy" not "middleware")

## Critical Architecture Decisions

### Lenis REMOVED
Lenis smooth scroll was removed -- caused scroll-to-bottom bug and blocked navigation clicks.
All scrolling is native `window.scrollTo({ behavior: "smooth" })`.
`SmoothScroll.tsx` is a passthrough wrapper (kept for context provider shape).

### GSAP Desktop Only
GSAP loads via dynamic `import("gsap")` inside `useEffect`. Never at module top-level.
On mobile (touch devices), `AssembleSection` returns early -- no GSAP.
Mobile has no scroll animations -- content shows immediately.

### No Custom Cursor
CustomCursor was removed -- `mix-blend-difference` on `z-[9999]` blocked pointer events.

### No Loading Screen
`loading.tsx` was removed -- `position:fixed` with `z-index:9998` blocked all clicks.

### Scroll-to-Top
`history.scrollRestoration='manual'` + `window.scrollTo(0,0)` in `<head>` inline script.
No other scroll hacks. This is the only correct approach for Next.js App Router.

## Section Structure (page order)
1. Hero -- split layout (text left, photo right), logo, CTA
2. TrustStrip -- thin bar with 4 trust indicators
3. About -- text + Andrey's portrait photo
4. Services -- 4x2 grid of 8 service cards
5. Workshop -- text + photo + 4 process step cards
6. Precision -- 4 metric cards centered
7. Projects -- 8 real project photos in grid
8. Trust -- 3 trust cards
9. Contact -- WhatsApp/Call buttons (mobile), contacts + form

## Section Rhythm (3 types)
- `section-standard` -- auto height + clamp padding (most sections)
- `section-compressed` -- 60svh min-height (Precision, Trust)
- Hero has its own `min-h-[100svh]`

## CSS Architecture
- `src/styles/globals.css` -- base styles, utilities, section types, Safari fallbacks
- `src/styles/metal-textures.css` -- steel-module, edge-glint, section-seam, text-stamped, etc.
- Card styles use **inline style={{}}** to avoid pseudo-element conflicts
- No SVG filters, no mix-blend-mode (performance)
- `body::after` removed (was overlapping images)

## Colors (CSS Variables)
- `--graphite: #1a1a1a` -- darkest background
- `--gunmetal: #2a2d35` -- card backgrounds
- `--titanium: #8a8d93` -- secondary text
- `--warm-steel: #b0a999` -- engineering labels
- `--copper: #c4956a` -- primary accent, CTAs
- `--off-white: #f5f5f0` -- primary text

## Translation Rules
- All visible text MUST go through next-intl (`useTranslations`)
- Each section uses its own namespace: `useTranslations("hero")`, `useTranslations("about")`, etc.
- Translation keys for labels go in the section's namespace (e.g. `hero.trust_years`)
- Files: `src/messages/he.json`, `src/messages/ru.json`
- All keys must exist in BOTH files (verified by script)

## Text Size Rules
- Minimum 16px (`text-base`) for ALL text -- site must be readable for older users
- `eng-label` class: 16px, monospace, uppercase, --titanium color
- `serial-mark` class: 16px, monospace, uppercase, --titanium color
- No `text-xs`, `text-[9px]`...`text-[13px]` anywhere

## Images
- All in `public/images/` (about/, hero/, projects/, workshop/)
- Real photos from Andrey's portfolio
- Next.js Image component with `fill` + `object-cover`
- Compressed via sips (max 1600x1200)
- Do NOT use `unoptimized` prop

## Navigation
- All nav clicks use native `window.scrollTo` with offset -80px
- No Lenis, no custom scroll handlers
- Active section tracked via scroll position in Header

## Mobile
- Touch detection: `"ontouchstart" in window || navigator.maxTouchPoints > 0`
- No GSAP on mobile (AssembleSection returns early)
- MobileCTA: sticky bottom bar (WhatsApp + Call)
- WhatsApp button: floating green circle
- All touch targets: min 44px
- `active:` states instead of `hover:`

## Deploy
```bash
cd "/Volumes/Artur 2 TB/Projects/BrinMetal"
npx vercel --yes  # creates preview
npx vercel promote <url> --yes  # promotes to production
```
Or combined: deploy + promote in one flow.

## Key Files
| File | Purpose |
|------|---------|
| src/app/[locale]/layout.tsx | Root layout, fonts, schema.org, viewport |
| src/app/[locale]/page.tsx | Homepage sections assembly |
| src/components/sections/*.tsx | 9 page sections |
| src/components/layout/Header.tsx | Fixed header with nav |
| src/components/layout/Footer.tsx | Footer with tagbar |
| src/components/motion/AssembleSection.tsx | GSAP scroll animation wrapper |
| src/components/mobile/MobileCTA.tsx | Sticky bottom CTA bar |
| src/app/api/contact/route.ts | Contact form API (rate limited) |
| src/config/site.ts | Phone, email, social links |
| src/messages/he.json | Hebrew translations |
| src/messages/ru.json | Russian translations |

## What NOT to Do
- Do NOT add Lenis back
- Do NOT add loading.tsx (blocks clicks)
- Do NOT add CustomCursor (blocks clicks)
- Do NOT use SVG filters or mix-blend-mode (performance)
- Do NOT use body::after overlays (covers images)
- Do NOT import GSAP at module top-level (SSR breaks)
- Do NOT use `text-xs` or any font smaller than 16px
- Do NOT hardcode English text in components
- Do NOT use `scrollRestoration` hacks beyond the one in `<head>`
- Do NOT add `unoptimized` to Image components

## Remaining TODO
- [ ] Buy real domain (brinmetall.co.il or .com)
- [ ] Connect Resend for contact form emails
- [ ] Get more project photos from Andrey
- [ ] Real stats (confirm 500+ projects, 300+ clients)
- [ ] Google Business Profile setup
- [ ] Lighthouse audit and optimization
- [ ] Remove unused npm packages (framer-motion, lenis, class-variance-authority)
