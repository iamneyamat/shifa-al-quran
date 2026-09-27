# Shifa Al Quran — AI Agent Operating Manual

## Project Identity
- **Name**: Shifa Al Quran
- **Purpose**: Islamic Ruqyah healing platform (Quranic + Sunnah-based)
- **Production domain**: https://saq.pro.bd
- **Platform**: Vercel
- **Language**: Bengali-first, with Arabic Quranic text

## Tech Stack
- Next.js 16 App Router
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion
- next-themes
- Supabase (SSR + client)
- React Hook Form + Zod

## Design System
- **Themes**: Light parchment / dark ink (semantic CSS variables)
- **Typography**: Hind Siliguri + Noto Serif Bengali + Amiri Quran
- **Accents**: Emerald (action), gold (citation/spiritual), restrained usage
- **Motion**: `Reveal` component via Framer Motion; always respect reduced motion
- **Tokens**: Use existing semantic tokens; never hardcode arbitrary colors

## Protected Functionality
Never break without explicit instruction:
- Routing, navigation, SEO, metadata
- Appointment and contact forms
- Audio player and library
- Blog and admin systems
- Supabase integrations
- Theme switching
- Authentication and sensitive data handling

## Current State
- Homepage partially redesigned with premium sections
- All 22 routes build successfully (46 static pages)
- Hydration issues fixed
- Reveal component working correctly
- Existing functionality fully preserved

## Visual Direction
The site must feel:
- Premium, calm, trustworthy, spiritual, modern, refined
- Not generic SaaS, not template-like, not over-animated
- Islamic without stereotypical motifs
- Professional without feeling corporate

## Required Workflow
1. Inspect existing code before editing.
2. Reuse components; avoid duplication.
3. Make the smallest correct change.
4. Run verification:
   - npm run lint
   - npx tsc --noEmit
   - npm run build
5. Test locally for both themes and responsive breakpoints.
6. Report exact files changed and remaining issues.

## Prohibited Patterns
- Blind rewrites or full-project refactors
- Installing packages without checking existing solutions
- Using Date.now/Math.random in render output
- Browser-only API access during SSR
- suppressHydrationWarning as a shortcut
- Inventing content, testimonials, or religious claims
- Changing deployment config without instruction
- Destructive Git operations without explicit request

## Skill System
This project uses Kilo Code skills in `.kilo/skills/`:
- `ui-ux-pro` — user flow and hierarchy analysis
- `premium-web-design` — art direction and premium polish
- `nextjs-frontend` — Next.js/React/Tailwind implementation
- `design-audit` — forensic design inspection before redesign
- `accessibility` — a11y audits and WCAG compliance
- `shifa-brand` — brand guardian for visual and content identity
- `safe-refactor` — incremental, verified continuation discipline

Rules are in `.kilo/rules/project-guardrails.md`.
