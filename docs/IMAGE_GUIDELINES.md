# BrinMetal -- Image Guidelines

## Formats

| Format | Usage |
|--------|-------|
| WebP | Primary format for all images |
| AVIF | Progressive enhancement (Next.js auto) |
| PNG | Logos, icons with transparency |
| SVG | Icons, simple graphics |

## Sizes

| Usage | Dimensions | Max File Size |
|-------|-----------|---------------|
| Hero background | 1920x1080 | 300KB |
| Project card | 800x600 | 150KB |
| Project detail | 1200x800 | 250KB |
| Thumbnail | 400x300 | 80KB |
| OpenGraph | 1200x630 | 200KB |
| Favicon | 32x32, 180x180, 512x512 | 20KB |

## Compression

- Quality: 80-85% for photographs
- Quality: 90% for text/UI screenshots
- Use squoosh.app or sharp for manual optimization
- Next.js Image handles runtime optimization

## Naming Convention

```
{section}-{description}-{size}.{format}
```

Examples:
- hero-workshop-1920.webp
- project-custom-gate-800.webp
- workshop-welding-detail-400.webp

## Photography Style

- Cinematic, dramatic lighting
- Architectural composition
- Close-up detail of metalwork quality
- Desaturated color grading (warm shadows, cool highlights)
- No stock photography
- No cluttered backgrounds
- Workshop shots: controlled, professional
- Finished work: in-situ, in context

## Alt Text

- Descriptive, specific to the image content
- Translated per locale (he, ru)
- Include material type, project type when relevant
- Decorative images: alt=""
- Max length: 125 characters

## Implementation

- Always use Next.js Image component
- Set explicit width and height (prevent CLS)
- Use priority prop for above-fold images
- Use placeholder="blur" with blurDataURL for key images
- Use sizes prop for responsive behavior
