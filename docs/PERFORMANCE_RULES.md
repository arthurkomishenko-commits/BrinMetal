# BrinMetal -- Performance Rules

## Performance Budget

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| LCP | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| Total bundle (JS) | < 200KB gzipped |
| First load (per route) | < 80KB gzipped |

## Image Optimization

- Use Next.js Image component exclusively
- Formats: WebP primary, AVIF progressive enhancement
- Quality: 80-85%
- Lazy loading for below-fold images
- Blur placeholders for above-fold images (blurDataURL)
- Responsive srcset with proper sizes attribute
- No images larger than 400KB

## Font Loading

- Self-host fonts via next/font
- display: swap for heading fonts
- display: optional for body fonts (prevents FOIT)
- Subset fonts to needed characters (Latin, Hebrew, Cyrillic)
- Preload critical fonts

## Code Splitting

- Next.js automatic per-route splitting
- Dynamic import for GSAP: `dynamic(() => import(...), { ssr: false })`
- Dynamic import for heavy client components
- No barrel exports that prevent tree shaking

## Animation Performance

- GPU-accelerated properties ONLY: transform, opacity
- Never animate: width, height, top, left, margin, padding, background-color
- Use will-change sparingly, remove after animation
- Limit simultaneous animations to 5-8 elements
- ScrollTrigger: use batch() for repeated elements
- Test at 60fps on mid-range mobile

## CSS Rules

- Tailwind purges unused styles automatically
- No runtime CSS-in-JS
- CSS variables for design tokens (no JS overhead)
- Avoid complex selectors (max 3 levels)

## Caching

- Static assets: immutable, max-age=31536000
- HTML pages: s-maxage=31536000 with revalidation
- API routes: appropriate Cache-Control headers
- Service worker: future consideration

## Monitoring

- Lighthouse CI in build pipeline
- Web Vitals reporting (analytics)
- Bundle analyzer: periodic checks
- Real user monitoring (future)
