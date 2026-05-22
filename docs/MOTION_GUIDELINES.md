# BrinMetal -- Motion Guidelines

## Philosophy

Every animation on this website must feel like it has physical mass. Elements do not float, bounce, or pop. They move like engineered machinery -- with weight, precision, and controlled power.

## Core Principles

### 1. Mass Over Playfulness
Animations must feel heavy. A section revealing should feel like a steel panel sliding into position, not a card popping up.

### 2. Engineering Over Decoration
Every animation must serve a purpose: guiding attention, revealing content, or communicating hierarchy. No animation exists for aesthetic reasons alone.

### 3. Precision Over Flash
Timing and easing are exact. No wobbly overshoots. No elastic bounces. Controlled deceleration, like hydraulic machinery coming to rest.

### 4. Cinematic Over Trendy
Animations should feel like a premium product film -- controlled camera movements, deliberate reveals, architectural pacing.

## Technology Stack

| Tool | Purpose |
|------|---------|
| GSAP | Primary animation engine |
| ScrollTrigger | Scroll-based animations |
| Lenis | Smooth scrolling |
| Framer Motion | Layout animations, presence (where GSAP is overkill) |

## Easing Presets

| Name | GSAP Value | Feel | Usage |
|------|-----------|------|-------|
| industrial | power3.out | Heavy deceleration | Default reveal animations |
| heavy | power4.inOut | Massive, deliberate | Large panel movements |
| precise | power2.out | Controlled, clean | Subtle UI transitions |
| cinematic | expo.out | Dramatic deceleration | Hero animations, major reveals |
| mechanical | power3.inOut | Symmetrical, mechanical | Sliding panels, toggles |

### Forbidden Easings

- elastic -- never use, too playful
- bounce -- never use, undermines authority
- back (with overshoot) -- never use, too casual
- linear -- avoid for UI, feels robotic (acceptable for infinite loops like loading)

## Duration Scale

| Name | Duration | Usage |
|------|----------|-------|
| micro | 0.2s | Hover states, small UI feedback |
| fast | 0.4s | Button transitions, toggles |
| standard | 0.6s | Default content reveals |
| moderate | 0.8s | Section transitions |
| dramatic | 1.2s | Large element reveals |
| cinematic | 1.8s | Hero animations, major moments |

### Duration Rules

1. Never exceed 2.0s for any single animation
2. Stagger delays: 0.08-0.15s between elements
3. ScrollTrigger scrub durations follow scroll speed, not fixed timing
4. Mobile durations: reduce by 20-30% for perceived performance

## Animation Patterns

### Reveal Up (Default Content Reveal)

```javascript
{
  y: 60,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out",
  stagger: 0.1
}
```

Content slides up from below with fade. The y distance (60px) gives weight to the movement.

### Reveal Slide (Horizontal Entry)

```javascript
{
  x: 80, // or -80 for left entry
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
}
```

Elements slide in from the side. Use for split layouts.

### Parallax Depth

```javascript
{
  y: () => -100, // moves slower than scroll
  ease: "none",
  scrollTrigger: {
    scrub: 1.5
  }
}
```

Subtle depth parallax. Used sparingly for background elements and images.

### Text Reveal (Line by Line)

```javascript
// Split text into lines, then:
{
  y: "100%",
  duration: 0.8,
  ease: "power4.out",
  stagger: 0.06
}
```

Each line slides up from a masked container. Premium, architectural feel.

### Scale Reveal (Images/Cards)

```javascript
{
  scale: 1.05,
  opacity: 0,
  duration: 1.0,
  ease: "power3.out"
}
```

Subtle scale-down reveal. Makes elements feel like they're being placed into position.

### Stagger Grid

```javascript
{
  y: 40,
  opacity: 0,
  duration: 0.5,
  ease: "power3.out",
  stagger: {
    amount: 0.4,
    grid: "auto",
    from: "start"
  }
}
```

For service grids, project cards, and similar layouts.

## ScrollTrigger Configuration

### Default Settings

```javascript
{
  trigger: element,
  start: "top 85%",
  end: "bottom 20%",
  toggleActions: "play none none none"
}
```

### Pinned Sections

Use pinned sections only for:
- Hero to first section transition
- Process/workshop timeline
- Major narrative moments

Never pin more than 2 sections on a single page.

### Scrub Animations

Scrub value of 1-2 for smooth following. Never use scrub: true (too direct, no smoothing).

## Lenis Configuration

```javascript
{
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2
}
```

## Hover Interactions

### Button Hover
- Scale: 1.02 (barely perceptible, adds physicality)
- Background transition: 0.3s
- No transform on mobile (touch devices)

### Card Hover
- Border color shift: 0.3s
- Subtle shadow increase: 0.4s
- Optional: image scale 1.03 within overflow:hidden

### Link Hover
- Underline animation: width 0 to 100%, 0.3s power2.out
- Color shift to copper: 0.2s

## Performance Rules

1. Only animate transform and opacity (GPU-accelerated)
2. Use will-change sparingly and only on animated elements
3. Remove will-change after animation completes
4. Disable complex animations on reduced-motion preference
5. Limit simultaneous animations to 5-8 elements
6. Use requestAnimationFrame for custom animations
7. ScrollTrigger: use batch() for repeated similar elements
8. Test at 60fps on mid-range mobile devices

## Reduced Motion

```javascript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  // Replace all motion with instant state changes
  // Keep opacity fades at 0.2s max
  // Remove all scroll-based animations
  // Remove parallax
  // Keep hover color changes only
}
```

## Anti-Patterns (Never Do)

1. Bouncing elements
2. Rotating/spinning decorative elements
3. Infinite floating animations
4. Particle effects
5. Parallax on text content
6. Scroll-jacking (beyond Lenis smoothing)
7. Animation delays longer than 0.5s from trigger
8. Elements animating off-screen
9. Text scramble/typewriter effects
10. 3D transforms without clear purpose
