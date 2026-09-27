---
name: safe-refactor
description: Safe refactoring and continuation specialist for this project. Use when continuing interrupted work, fixing regressions, or making incremental improvements. Enforces inspect-first, minimal-change, and verification-after-every-step discipline.
---

# Safe Refactor

## When to use
- continuing interrupted or partially completed work
- fixing regressions caused by previous changes
- making incremental improvements
- any task where preserving working functionality is critical
- when the project has experienced budget exhaustion or broken checkpoints

## Principles
This project has already experienced:
- paid token budget exhaustion
- interrupted AI work
- hydration mismatches
- invisible content caused by animation state
- partially completed redesign

Therefore every agent must:
- Inspect before changing.
- Minimize unrelated modifications.
- Work in controlled increments.
- Preserve working functionality.
- Verify after each meaningful task.
- Report exact files changed, exact commands run, and remaining issues honestly.

## Workflow
1. Inspect the current state of the affected files and related systems.
2. Identify the smallest change that resolves the issue.
3. Make the change.
4. Run targeted verification:
   - npm run lint
   - npx tsc --noEmit
   - npm run build
5. Visually inspect if the change affects UI.
6. Report exact results. Do not claim success without verification.

## Redesign discipline
- Do not change the whole repository at once.
- Work on one page or one coherent feature group at a time.
- Preserve a stable checkpoint after each page or group.
- Do not redesign unrelated pages.
- Do not introduce new dependencies without checking existing solutions first.

## Anti-patterns to avoid
- Blindly rewriting files.
- Speculative changes without evidence.
- Full-project scans for small tasks.
- Repeatedly reading the same files.
- Generating large reports unnecessarily.
- Claiming completion without verification.
- Hiding errors or using suppressHydrationWarning as a shortcut.
