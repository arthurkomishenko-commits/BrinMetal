# BrinMetal -- Component Rules

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Component files | PascalCase | HeroSection.tsx |
| Component names | PascalCase | export function HeroSection() |
| Hook files | camelCase with use prefix | useGsap.ts |
| Utility files | kebab-case | gsap-config.ts |
| CSS variables | kebab-case | --warm-steel |
| Translation keys | dot-separated lowercase | hero.title |

## Component Template

Server component (default):
```tsx
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const t = useTranslations("hero");
  return (
    <section className={cn("...", className)}>
      {/* content */}
    </section>
  );
}
```

Client component (when hooks/events needed):
```tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
```

## Animation Integration Pattern

```tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASINGS, DURATIONS } from "@/lib/motion/gsap-config";

export function AnimatedComponent() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(ref.current, {
      y: 60, opacity: 0,
      duration: DURATIONS.standard,
      ease: EASINGS.industrial,
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  }, { scope: ref });
  return <div ref={ref}>...</div>;
}
```

## Rules

1. Server Components by default, 'use client' only when needed
2. One component per file
3. Maximum 8 props per component
4. No `any` types
5. Always accept className prop for overrides
6. Mobile-first responsive (Tailwind: md:, lg:, xl:)
7. Touch targets: min 44x44px on mobile
8. All text via useTranslations(), never hardcoded
9. Images via Next.js Image component only
10. Keyboard accessible, proper ARIA labels
