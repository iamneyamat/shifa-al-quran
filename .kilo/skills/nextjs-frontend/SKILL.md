---
name: nextjs-frontend
description: Next.js 16 / React 19 / Tailwind v4 implementation specialist. Use when implementing features, fixing bugs, refactoring components, or modifying routing. Ensures hydration safety, server/client boundaries, TypeScript strictness, and build integrity.
---

# Next.js Frontend

## When to use
- implementing new features or pages
- fixing Next.js or React bugs
- refactoring components
- modifying routing, layouts, or metadata
- working with Server Components, Client Components, or Framer Motion

## Tech stack
- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- TypeScript strict mode
- Framer Motion
- next-themes
- Supabase client/server utilities

## Rules
- Preserve Server/Client component boundaries.
- Do not introduce hydration mismatches.
- Do not use Date.now() or Math.random() during render output.
- Do not branch server/client markup based on browser-only state during hydration.
- Use existing utilities and design tokens.
- Avoid unnecessary dependencies and unnecessary Client Components.
- Keep TypeScript strict; avoid `any` and `@ts-ignore`.
- Preserve route structure and SEO unless explicitly asked to change.
- Do not replace working architecture unnecessarily.
- Use `useSyncExternalStore` for browser media queries instead of useEffect + state for hydration-safe media-query reads.

## Verification
After every meaningful change:
- npm run lint
- npx tsc --noEmit
- npm run build
- Check local preview for console errors and hydration issues.

## Common pitfalls
- Do not access `window`, `document`, or `localStorage` during SSR render.
- Do not render different element types or class names between server and initial client render.
- Do not rely on browser extensions or user-specific DOM mutations for functionality.
- Do not suppress hydration warnings unless the root cause is proven and suppression is truly appropriate.
