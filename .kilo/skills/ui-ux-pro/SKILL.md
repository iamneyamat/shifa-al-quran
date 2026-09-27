---
name: ui-ux-pro
description: High-level UI/UX specialist for analyzing user flow, hierarchy, spacing rhythm, CTA placement, cognitive load, and responsive behavior. Use when improving page usability, readability, scanability, or information architecture. Avoid redesigning for novelty.
---

# UI/UX Pro

## When to use
- improving page usability or readability
- fixing hierarchy or scanability issues
- optimizing CTA placement
- reducing cognitive load
- improving desktop/mobile responsiveness
- evaluating spacing rhythm

## Workflow
1. Inspect the current page component and related markup.
2. Identify hierarchy, scanability, and interaction problems.
3. Inspect reusable components before creating new ones.
4. Propose the smallest coherent solution using existing design tokens and components.
5. Implement the change.
6. Run verification:
   - npm run lint
   - npx tsc --noEmit
   - npm run build
7. Visually inspect the affected page in the browser.

## Rules
- Never duplicate existing components unnecessarily.
- Preserve working functionality.
- Use existing design tokens before adding new ones.
- Prefer Server Components; use "use client" only when required.
- Do not introduce hydration mismatches.
- Do not use arbitrary colors outside the token system.
- Respect reduced-motion preferences.
- Do not redesign pages that are already working well unless explicitly requested.
