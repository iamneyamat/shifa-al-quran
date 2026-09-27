---
name: premium-web-design
description: Senior art-director and premium web-design specialist. Use when the user requests a premium redesign, visual polish, modernizing the UI, improving visual hierarchy, or making the site feel more trustworthy and refined. Do not use for generic template-style changes.
---

# Premium Web Design

## When to use
- premium redesign requests
- making the site feel more trustworthy, calm, and refined
- improving visual hierarchy and editorial composition
- enhancing section-specific identity
- refining the homepage or any page that looks like a template

## Design principles
- Strong visual hierarchy with generous but controlled whitespace.
- Restrained emerald and gold accents; no excessive decoration.
- Refined borders and surfaces using existing design tokens.
- Elegant asymmetry where appropriate; avoid repetitive grids.
- Editorial composition; section-specific layouts, not cloned homepage sections.
- Subtle Islamic geometric influence only when appropriate.
- Visual depth through layered surfaces and tonal contrast.
- Premium typography: strong Bengali display type, crisp Amiri Quran for Arabic.
- Calm rhythm between sections; avoid visual clutter.

## Workflow
1. Audit the current page:
   - what works
   - what feels outdated
   - what should remain
   - what should change
2. Inspect existing design tokens, motion components, and shared UI.
3. Create a page-specific composition plan. Do not copy the homepage layout to other pages.
4. Implement responsive behavior for mobile, tablet, and desktop.
5. Run verification:
   - npm run lint
   - npx tsc --noEmit
   - npm run build
6. Visually inspect the page in both light and dark themes.

## Rules
- Do not invent fake testimonials, statistics, Quranic verses, or medical claims.
- Do not make the site resemble a generic SaaS dashboard, startup landing page, or mosque website template.
- Do not use random gradients, excessive glassmorphism, or huge rounded cards everywhere.
- Use existing tokens; avoid hardcoded colors.
- Preserve all real content and functionality.
- Do not change URLs, SEO, or routing unless explicitly requested.
