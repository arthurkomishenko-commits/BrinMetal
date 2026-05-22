# BrinMetal -- Content Structure

## Overview

The website is a single-page corporate experience with anchor-based navigation. Future expansion will add dedicated service pages, project detail pages, and a blog.

## Languages

- **Hebrew (he)** -- Primary language, RTL layout
- **Russian (ru)** -- Secondary language, LTR layout

All content is managed through next-intl translation files (messages/he.json, messages/ru.json).

---

## Section 1: Hero

**Purpose:** Immediate authority and impact. First impression defines the brand.

**Layout:** Full viewport height. Cinematic composition.

**Content:**
- Main headline (large, display typography)
- Supporting subtitle (one line, engineering positioning)
- Primary CTA button ("Contact Us" / "Get a Quote")
- Background: dark with subtle texture or abstract metalwork visual
- Optional: subtle animated accent line or geometric element

**Hebrew:**
- Headline: "הנדסת מתכת ברמה אחרת"
- Subtitle: "20+ שנות ניסיון בייצור מתכת, ריתוך מקצועי ופתרונות הנדסיים מותאמים אישית"

**Russian:**
- Headline: "Металлоконструкции высшего уровня"
- Subtitle: "20+ лет опыта в металлообработке, профессиональной сварке и инженерных решениях"

**Animation:** Cinematic text reveal (line by line), CTA fade-in with delay, background subtle parallax.

---

## Section 2: About / Philosophy

**Purpose:** Establish Andrey's expertise and the company's engineering approach.

**Layout:** Split layout -- text on one side, visual on the other.

**Content:**
- Section title: "About BrinMetal" / "Engineering Philosophy"
- Andrey's story (concise, authoritative)
- Key differentiators: 20+ years experience, engineering-first approach, custom solutions
- Copper accent divider
- Optional: small portrait or workshop photo

**Key Messages:**
- This is engineering, not just welding
- Every project starts with precise planning
- Experience that spans two decades and hundreds of projects

**Animation:** Reveal up for text, slide in for visual, stagger for key points.

---

## Section 3: Capabilities / Services

**Purpose:** Clearly communicate what BrinMetal does.

**Layout:** Grid layout -- 2 columns mobile, 4 columns desktop.

**Content (8 services):**

| # | Service | Hebrew | Russian |
|---|---------|--------|---------|
| 1 | Heavy Metal Structures | מבנים כבדים ממתכת | Тяжёлые металлоконструкции |
| 2 | Structural Reinforcement | חיזוק מבנים | Усиление конструкций |
| 3 | Gates | שערים | Ворота |
| 4 | Fences | גדרות | Заборы |
| 5 | Custom Staircases | מדרגות בהתאמה אישית | Лестницы на заказ |
| 6 | Architectural Fabrication | ייצור מתכת אדריכלי | Архитектурный металл |
| 7 | Emergency Metal Works | עבודות מתכת חירום | Аварийные работы |
| 8 | Custom Engineering | פתרונות הנדסיים מותאמים | Индивидуальные решения |

Each service card includes:
- Icon (lucide-react or custom SVG)
- Title
- Brief description (1-2 sentences)
- Future: link to dedicated service page

**Animation:** Stagger grid reveal, cards appear sequentially.

---

## Section 4: Featured Projects

**Purpose:** Show completed work. Build trust through visual proof.

**Layout:** Cinematic grid -- asymmetric, architectural composition. NOT a uniform grid.

**Content:**
- Section title: "Featured Projects"
- 4-6 featured projects
- Each project: large image, title, category tag, brief description
- Future: link to full project detail page with gallery

**Photography Style:**
- Dramatic lighting
- Architectural angles
- Detail close-ups
- In-situ (installed, in context)
- Professional color grading

**Animation:** Scale reveal for images, reveal up for text, stagger for grid items.

---

## Section 5: Workshop / Process

**Purpose:** Show how BrinMetal works. Demystify the process. Build confidence.

**Layout:** Horizontal process timeline or vertical step-by-step.

**Content (4 steps):**

| Step | Title (EN) | Hebrew | Russian |
|------|-----------|--------|---------|
| 1 | Consultation | ייעוץ ותכנון | Консультация |
| 2 | Engineering | הנדסה ועיצוב | Проектирование |
| 3 | Fabrication | ייצור | Изготовление |
| 4 | Installation | התקנה | Монтаж |

Each step includes:
- Step number (large, copper accent)
- Title
- Brief description
- Optional: process photo

**Animation:** Sequential reveal as user scrolls, potential pinned section.

---

## Section 6: Engineering Precision

**Purpose:** Quantify expertise. Provide concrete trust signals.

**Layout:** Stats bar or metrics grid.

**Content:**

| Metric | Value | Hebrew | Russian |
|--------|-------|--------|---------|
| Years of Experience | 20+ | 20+ שנות ניסיון | 20+ лет опыта |
| Projects Completed | 500+ | 500+ פרויקטים | 500+ проектов |
| Satisfied Clients | 300+ | 300+ לקוחות מרוצים | 300+ довольных клиентов |
| Types of Services | 8+ | 8+ סוגי שירותים | 8+ видов услуг |

Note: Numbers are placeholders -- Andrey to confirm actual figures.

**Animation:** Number count-up on scroll trigger, reveal up for labels.

---

## Section 7: Trust / Why Clients Choose Us

**Purpose:** Social proof and trust reinforcement.

**Layout:** Testimonial cards or trust statement grid.

**Content:**
- Section title: "Why Clients Trust Us"
- 3-4 client testimonials or trust statements
- Client name, company (if B2B), brief quote
- Optional: client logos for B2B credibility

**Trust Points:**
- 20+ years proven track record
- Engineering-grade precision
- On-time delivery
- Custom solutions for every project
- Emergency response capability
- Full project lifecycle support

**Animation:** Card stagger reveal, quote marks as accent elements.

---

## Section 8: CTA / Contact

**Purpose:** Convert interest into action. Clear, singular call to action.

**Layout:** Centered, focused. Minimal distractions.

**Content:**
- Headline: "Start Your Project" / "Let's Build Together"
- Contact form:
  - Name (required)
  - Phone (required)
  - Email (optional)
  - Message / Project Description (required)
  - Submit button
- Direct contact info:
  - Phone number (clickable tel: link)
  - Email (clickable mailto: link)
  - Service area: Netanya and central Israel
- Working hours (if relevant)

**Form Behavior:**
- Client-side validation
- Server-side submission (API route)
- Success/error states
- Future: CRM integration

**Animation:** Reveal up, form fields stagger in.

---

## Footer

**Content:**
- BrinMetal logo
- Navigation links (anchor links to sections)
- Contact information
- Language switcher
- Copyright notice
- Future: social media links

---

## Future Content Expansion

### Service Detail Pages
- One page per service category
- Extended description, related projects, FAQ
- Dedicated SEO optimization per service

### Project Detail Pages
- Full project gallery
- Project specifications
- Before/after (where applicable)
- Client testimonial

### Blog / Articles
- Industry insights
- Project case studies
- Technical articles
- SEO content strategy

### FAQ Page
- Common questions per service
- Schema.org FAQPage markup
- Expandable accordion format
