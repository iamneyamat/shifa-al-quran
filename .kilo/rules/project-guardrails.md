# Project Guardrails

## Package management
- Do not install packages without checking whether the project already has a solution.
- Do not upgrade dependencies without a clear, explicit reason.
- Do not add unnecessary dependencies.

## Code modification
- Do not rewrite working components unnecessarily.
- Do not change unrelated files.
- Do not touch authentication, Supabase, forms, database logic, audio player, SEO, or admin functionality unless the task explicitly requires it.
- Do not alter Quran text or religious content without explicit instruction.
- Before a major page redesign, inspect existing implementation.
- Use existing design tokens before adding new ones.
- Prefer extending the design system instead of hardcoding one-off styles.
- Do not use arbitrary colors.
- Do not use random inline styles when reusable utilities exist.
- Avoid !important unless absolutely necessary.

## Theming and motion
- Preserve dark and light theme behavior.
- Verify responsive behavior.
- Respect reduced-motion preferences.
- Never introduce a hydration mismatch.
- Never hide page content behind an animation state that can persist.
- Use `useSyncExternalStore` for browser media queries instead of useEffect + state for hydration-safe reads.

## Verification
- Run targeted checks after modifications.
- For substantial work, run:
  - npm run lint
  - npx tsc --noEmit
  - npm run build
- If a command fails, investigate the failure. Distinguish new failures from pre-existing issues. Do not hide errors.

## Git safety
- Never perform destructive Git operations automatically.
- Never run `git reset --hard`, `git clean -fd`, or `git push --force` unless explicitly requested.
- Never delete user changes.

## Content integrity
- Do not invent data, testimonials, statistics, or religious claims.
- Do not alter existing SEO, canonical URLs, Open Graph, or structured data.
- Preserve all existing routes and functionality.
