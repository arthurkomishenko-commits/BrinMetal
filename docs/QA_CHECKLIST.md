# BrinMetal -- QA Checklist

## Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome mobile (Android)
- [ ] Safari mobile (iOS)

## Device Testing

- [ ] iPhone SE (375px)
- [ ] iPhone 14/15 (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1280px)
- [ ] Wide desktop (1440px)
- [ ] Ultra wide (1920px)

## Performance

- [ ] Lighthouse Performance 95+
- [ ] Lighthouse SEO 100
- [ ] Lighthouse Accessibility 95+
- [ ] Lighthouse Best Practices 95+
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 100ms
- [ ] No layout shifts on load
- [ ] Images optimized (WebP/AVIF)
- [ ] Fonts load without FOUT/FOIT

## Animation

- [ ] All animations 60fps (desktop)
- [ ] All animations 60fps (mobile)
- [ ] ScrollTrigger fires correctly
- [ ] No animation glitches on fast scroll
- [ ] Reduced motion respected
- [ ] Lenis smooth scroll works
- [ ] No janky transitions

## Accessibility

- [ ] Keyboard navigation complete
- [ ] Focus indicators visible
- [ ] Screen reader tested (VoiceOver)
- [ ] Heading hierarchy correct
- [ ] Alt text on all images
- [ ] Form labels and ARIA
- [ ] Color contrast meets WCAG AA
- [ ] Skip to content link works

## i18n

- [ ] Hebrew content complete
- [ ] Russian content complete
- [ ] RTL layout correct (Hebrew)
- [ ] LTR layout correct (Russian)
- [ ] Language switcher works
- [ ] Metadata translated per locale
- [ ] hreflang tags present

## Forms

- [ ] Contact form validates
- [ ] Required fields enforced
- [ ] Error messages display correctly
- [ ] Success state works
- [ ] Phone number format validated
- [ ] Email format validated
- [ ] No submission without required fields

## SEO

- [ ] Metadata present on all pages
- [ ] Schema.org validates (Google Rich Results)
- [ ] Sitemap accessible
- [ ] robots.txt correct
- [ ] Canonical URLs correct
- [ ] OpenGraph images render
- [ ] No broken links (404s)

## General

- [ ] 404 page works and is styled
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build succeeds without warnings
- [ ] Mobile menu opens/closes correctly
- [ ] All anchor links scroll to target
- [ ] External links open in new tab
