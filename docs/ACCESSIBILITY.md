# BrinMetal -- Accessibility Standards

## Target: WCAG 2.1 Level AA

## Color Contrast

| Text | Background | Ratio | Status |
|------|-----------|-------|--------|
| Off-white on graphite | #f5f5f0 / #1a1a1a | ~14:1 | Pass |
| Titanium on graphite | #8a8d93 / #1a1a1a | ~5.5:1 | Pass |
| Copper on graphite | #c4956a / #1a1a1a | ~4.8:1 | Pass |
| Copper on gunmetal | #c4956a / #2a2d35 | ~4.2:1 | Pass (large text) |

## Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--copper);
  outline-offset: 2px;
}
```

## Keyboard Navigation

- Tab order follows visual layout
- Skip to main content link (first focusable)
- Escape closes modals/menus
- Focus trapped in open modals
- Arrow keys for menu navigation

## Screen Reader

- Single h1 per page, sequential heading levels
- Semantic landmarks: header, nav, main, footer
- All images have descriptive alt text (translated per locale)
- aria-live for form feedback
- aria-labels on icon-only buttons

## Reduced Motion

Respect prefers-reduced-motion:
- Disable GSAP animations
- Disable Lenis smooth scroll
- Keep content visible without animation
- Opacity fades only at 0.2s max

## Language Attributes

```html
<html lang="he" dir="rtl">
<html lang="ru" dir="ltr">
```

## Testing Tools

- axe DevTools, Lighthouse, VoiceOver, WAVE, keyboard-only navigation
