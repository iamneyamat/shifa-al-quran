---
name: design-audit
description: Forensic design audit specialist. Use before redesigning a page. Inspects component trees, CSS utilities, responsive behavior, shared components, visual debt, duplicate patterns, and design-system inconsistencies. Produces a concise implementation plan.
---

# Design Audit

## When to use
- before any major page redesign
- when asked to audit the design
- when asked to improve visual hierarchy
- when asked to modernize the UI
- when asked to fix layout issues
- when the user says "make this more premium"

## Workflow
1. Inspect the full component tree for the target page.
2. Inspect related CSS, utilities, and design tokens.
3. Inspect responsive behavior across breakpoints.
4. Inspect shared components for reuse opportunities.
5. Identify visual debt, duplicate patterns, and design-system inconsistencies.
6. Create a concise implementation plan with priorities.
7. State clearly what works, what feels outdated, what should remain, and what should change.

## Output format
- Current state summary
- Problems identified
- Reusable assets/components
- Proposed changes (smallest coherent set)
- Risks and mitigations
- Verification steps

## Rules
- Never begin a major redesign blindly.
- Do not rewrite working pages unless explicitly requested.
- Preserve all real content and functionality.
- Use existing design tokens before adding new ones.
- Do not invent data or content.
- Do not touch unrelated files.
