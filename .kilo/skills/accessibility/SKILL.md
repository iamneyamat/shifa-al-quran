---
name: accessibility
description: Accessibility specialist. Use when auditing a11y, improving keyboard navigation, focus states, contrast, form labels, ARIA, or reduced-motion support. Ensures WCAG 2.1 AA compliance and avoids hydration issues from media queries.
---

# Accessibility

## When to use
- accessibility audits
- improving keyboard navigation
- fixing focus visibility
- checking color contrast
- improving form labels and validation feedback
- adding or refining ARIA
- supporting prefers-reduced-motion
- reviewing hydration safety for media-query-based UI

## Requirements
- Semantic HTML with meaningful heading hierarchy.
- Keyboard accessibility for all interactive elements.
- Visible focus states that work in both light and dark themes.
- Color contrast meeting WCAG 2.1 AA.
- Accessible form labels, errors, and validation states.
- ARIA only when semantically necessary; never for decoration.
- Respect prefers-reduced-motion; never leave content hidden behind animation state.
- Do not rely on color alone to communicate critical state.
- Preserve readability for Bengali and Arabic typography.
- Avoid hydration mismatches caused by browser media queries or client-only state.

## Verification
- Test keyboard navigation through interactive elements.
- Test with a screen reader where practical.
- Verify focus indicators are visible in both themes.
- Verify reduced motion does not hide content.
- Run build and lint; confirm no new warnings or errors.
