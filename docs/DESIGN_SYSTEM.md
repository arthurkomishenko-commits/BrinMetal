# BrinMetal -- Design System

## Foundation

This design system defines the visual and structural rules for every element on the BrinMetal website. All values are production tokens -- not suggestions.

## Spacing Scale

Base unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Tight internal padding |
| space-2 | 8px | Icon gaps, tight spacing |
| space-3 | 12px | Form input padding |
| space-4 | 16px | Card padding (mobile), standard gap |
| space-6 | 24px | Card padding (desktop), section gaps |
| space-8 | 32px | Component spacing |
| space-10 | 40px | Section padding (mobile) |
| space-12 | 48px | Medium section spacing |
| space-16 | 64px | Section padding (desktop) |
| space-20 | 80px | Large section spacing |
| space-24 | 96px | Major section breaks |
| space-32 | 128px | Hero-level spacing |

## Border Radius

Brutalist approach -- minimal rounding.

| Token | Value | Usage |
|-------|-------|-------|
| radius-none | 0px | Default for most elements |
| radius-sm | 2px | Buttons, inputs, cards |
| radius-md | 4px | Modals, dropdowns |
| radius-full | 9999px | Pills, badges only |

## Shadows

Subtle, layered shadows on dark backgrounds.

| Token | Value | Usage |
|-------|-------|-------|
| shadow-sm | 0 1px 2px rgba(0,0,0,0.3) | Subtle elevation |
| shadow-md | 0 4px 12px rgba(0,0,0,0.4) | Cards, dropdowns |
| shadow-lg | 0 8px 24px rgba(0,0,0,0.5) | Modals, popovers |
| shadow-glow | 0 0 20px rgba(196,149,106,0.15) | Copper accent glow |

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| z-base | 0 | Default |
| z-dropdown | 10 | Dropdowns, tooltips |
| z-sticky | 20 | Sticky header |
| z-modal | 30 | Modals, overlays |
| z-toast | 40 | Notifications |
| z-max | 50 | Critical overlays |

## Breakpoints

| Name | Value | Target |
|------|-------|--------|
| mobile | 375px | Mobile phones |
| tablet | 768px | Tablets, small laptops |
| desktop | 1280px | Standard desktops |
| wide | 1440px | Wide screens |
| ultra | 1920px | Large displays |

## Grid System

- 12-column grid
- Gutter: 16px (mobile), 24px (tablet), 32px (desktop)
- Max content width: 1440px
- Side padding: 16px (mobile), 32px (tablet), 64px (desktop)
- Full-bleed sections allowed for hero and impact areas

## Component Patterns

### Buttons

#### Primary Button
- Background: copper (#c4956a)
- Text: graphite (#1a1a1a)
- Border: none
- Radius: 2px
- Padding: 12px 32px
- Font: label style, uppercase, letter-spacing 0.05em
- Hover: copper-hover (#d4a57a), subtle scale(1.02)
- Active: slightly darker copper
- Transition: 0.3s power2.out feel

#### Secondary Button
- Background: transparent
- Text: off-white (#f5f5f0)
- Border: 1px solid warm-steel (#b0a999)
- Radius: 2px
- Padding: 12px 32px
- Hover: border-color copper, text copper
- Transition: 0.3s

#### Ghost Button
- Background: transparent
- Text: titanium (#8a8d93)
- Border: none
- Padding: 8px 16px
- Hover: text off-white
- Used for navigation items, secondary actions

### Cards

- Background: gunmetal (#2a2d35)
- Border: 1px solid rgba(255,255,255,0.05)
- Radius: 2px
- Padding: 24px (mobile), 32px (desktop)
- Hover: border-color warm-steel at 30% opacity
- No shadow by default, shadow-md on hover

### Section Containers

- Full viewport width
- Content constrained to max-width 1440px
- Vertical padding: 64px (mobile), 96px (desktop), 128px (hero)
- Alternating background depths for visual rhythm

### Dividers

- Horizontal: 1px solid rgba(255,255,255,0.08)
- Accent divider: 2px solid copper, max-width 60px (section accents)
- Vertical: 1px solid rgba(255,255,255,0.08), used in grids

### Form Inputs

- Background: graphite (#1a1a1a)
- Border: 1px solid dark-steel (#353840)
- Text: off-white
- Placeholder: titanium at 60% opacity
- Focus: border-color copper
- Radius: 2px
- Padding: 12px 16px
- Transition: border-color 0.3s

## Layout Patterns

### Section Rhythm

Sections alternate between:
1. Standard content width (max 1440px, centered)
2. Full-bleed backgrounds with contained content
3. Split layouts (text + visual, 50/50 or 40/60)

### Visual Hierarchy

1. Hero -- maximum impact, full viewport
2. Primary sections -- large headings, generous spacing
3. Supporting sections -- detailed content, tighter spacing
4. CTA sections -- focused, singular purpose

### RTL Considerations

- All layouts must mirror correctly for Hebrew (RTL)
- Use logical properties (margin-inline-start, not margin-left)
- Icon positions flip in RTL
- Text alignment follows document direction
- Grid/flex layouts reverse automatically with dir="rtl"
