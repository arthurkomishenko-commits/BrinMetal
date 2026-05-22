# BrinMetal -- Translation Guide

## Locales

| Locale | Language | Direction | Primary |
|--------|----------|-----------|---------|
| he | Hebrew | RTL | Yes |
| ru | Russian | LTR | No |

Default locale: he

## Key Naming Convention

```
section.element.modifier
```

Examples: hero.title, services.gates.description, contact.form.namePlaceholder

Rules:
1. Group by section first
2. camelCase for multi-word keys
3. Max 3 nesting levels
4. Consistent suffixes: .title, .description, .cta, .placeholder, .error

## Usage

Server: `import { useTranslations } from "next-intl"`
Client: same import with "use client" directive
Metadata: `import { getTranslations } from "next-intl/server"`
Parameters: `t("yearsExperience", { count: 20 })`

## RTL Support

- HTML: `<html lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>`
- Use logical CSS properties: ms-4 (not ml-4), me-4 (not mr-4), text-start (not text-left)
- Flexbox/Grid auto-reverse with dir="rtl"
- Flip directional icons for Hebrew

## Adding a New Language

1. Create src/messages/{locale}.json
2. Add locale to src/i18n/routing.ts
3. Add locale to src/config/site.ts
4. Update LanguageSwitcher
5. Add hreflang in SEO metadata
6. Test layout direction
