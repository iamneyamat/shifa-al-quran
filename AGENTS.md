<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI Coding Agent Configuration Rulebook

Welcome, AI Agent. This is the comprehensive and permanent development rulebook for the Shifa Al Quran project. You **MUST** read and adhere to all rules below before executing any actions.

## 1. INSPECT BEFORE EDITING

Before modifying any file, you must:
1. Inspect the existing code.
2. Inspect related components.
3. Inspect imports.
4. Inspect data flow.
5. Search for reusable components.
6. Understand the current implementation.
7. Check whether the requested functionality already exists.

Never blindly rewrite files. Prefer the smallest possible correct change.

## 2. PRESERVE FUNCTIONALITY

Never break existing:
- Routing
- Navigation
- Forms
- Appointment system
- Contact system
- WhatsApp
- Audio player
- Audio library
- Search
- Theme switching
- Language switching
- SEO
- Analytics
- Accessibility

Unless the user explicitly requests the change.

## 3. DESIGN SYSTEM

The existing website design is approved. Do not redesign the entire website unless explicitly requested. Maintain the existing visual identity.

Maintain:
- Premium Islamic aesthetic
- Emerald accents
- Blue accents
- Gold accents
- Dark navy
- Elegant light mode
- Glass effects where already used
- Soft shadows
- Rounded cards
- Subtle animations
- Professional healthcare-inspired appearance

All pages must feel like the same website.

## 4. COMPONENT REUSE

Before creating a new component:
1. Search the repository.
2. Reuse existing components whenever possible.

Avoid duplicating: Buttons, Cards, Inputs, Modals, Headers, Footers, Forms, and Navigation components.

## 5. TYPESCRIPT

- Use strict TypeScript.
- Avoid unnecessary `any`.
- Never suppress errors without a documented reason.
- Avoid `@ts-ignore`.
- Maintain reusable types.

## 6. NEXT.JS

- Respect the installed Next.js version.
- Inspect existing patterns before using new APIs.
- Do not assume older Next.js behavior.
- Preserve the current App Router architecture if present.

## 7. SERVER VS CLIENT

- Prefer Server Components.
- Use `"use client"` only when required.
- Do not convert entire pages to Client Components unnecessarily.

## 8. STYLING

- Use the existing Tailwind CSS architecture.
- Do not introduce another styling framework.
- Keep responsive design.
- Maintain the existing design system.

## 9. ANIMATION

- Use the existing Framer Motion architecture.
- Animations must be: subtle, fast, and professional.
- Avoid excessive animation.
- Respect reduced-motion preferences where appropriate.

## 10. ACCESSIBILITY

All new UI must maintain:
- Semantic HTML
- Keyboard navigation
- Focus states
- Accessible labels
- ARIA where necessary
- Adequate contrast
- Screen-reader support

Icons must not be the only label for important actions.

## 11. FORMS

- Preserve existing validation.
- Use existing form architecture.
- Use Zod where already implemented.
- Forms should provide: Loading, Success, Error, and Validation feedback.

## 12. APPOINTMENT DATA

- Appointment information is sensitive.
- Never expose private patient information.
- Never unnecessarily log sensitive information.
- Never expose API credentials.
- Never put sensitive appointment information in public client-side code.

## 13. ENVIRONMENT VARIABLES

Never commit:
- `.env`, `.env.local`, `.env.production`
- API keys, Private keys, Tokens, Passwords, Service account credentials

If a new environment variable is required:
- Document the variable name.
- Never document the secret value.

## 14. AUDIO

- Preserve the existing audio architecture.
- Before changing audio: inspect existing audio data and player components.
- Avoid unnecessary duplication of large audio files.
- Maintain existing functionality.

## 15. IMAGES AND ASSETS

- Reuse existing assets.
- Do not duplicate assets unnecessarily.
- Optimize large images.
- Do not delete assets without checking usage.

## 16. SEO

Never accidentally remove:
- Metadata
- Canonical URLs
- Open Graph
- Twitter metadata
- Structured data
- Sitemap
- robots.txt

When creating new pages, add appropriate SEO metadata.

## 17. PERFORMANCE

- Avoid unnecessary JavaScript.
- Avoid unnecessary Client Components.
- Avoid unnecessary dependencies.
- Avoid unnecessary re-renders.
- Optimize images.
- Lazy-load expensive content where appropriate.

## 18. RESPONSIVE DESIGN

Every change must work on:
- 320px, 375px, 390px, 414px, 768px, 1024px, Desktop

Never break existing desktop layouts while fixing mobile.

## 19. ISLAMIC CONTENT

- Use respectful Islamic language.
- Never make guaranteed healing claims.
- Never invent Quran references.
- Never invent Hadith.
- Never use fabricated narrations.
- Healing is by the will of Allah.

## 20. SECURITY

- Never expose secrets.
- Validate user input.
- Protect server-side endpoints.
- Do not expose internal errors.
- Do not expose private API responses.

## 21. FILE MODIFICATION

- Modify the smallest number of files necessary.
- Do not rewrite entire components for small changes.
- Do not format unrelated files.
- Do not modify unrelated parts of the project.

## 22. TESTING

After meaningful changes run:
```bash
npm run lint
npm run build
```
Fix all errors before finishing. Never leave the repository in a broken build state.

## 23. DEVELOPMENT WORKFLOW

For every task:
1. Inspect
2. Plan
3. Modify
4. Run lint
5. Run build
6. Test locally
7. Review changes
8. Report changed files

## 24. GIT SAFETY

Never perform destructive Git operations automatically.
Never run:
- `git reset --hard`
- `git clean -fd`
- `git push --force`
...unless explicitly requested.
Never delete user changes.

## 25. DEPLOYMENT

- Current production platform: Vercel
- Production domain: https://saq.pro.bd
- Do not change deployment configuration unless explicitly requested.

## 26. FUTURE MOBILE APP

A future React Native / Expo application may use this project as the web platform.
When changing data structures:
- Prefer reusable and API-friendly structures.
- Do not tightly couple content unnecessarily to UI.

Potential future shared systems:
- Articles
- Audio
- Appointments
- Islamic content
- Notifications
- User accounts

Do not implement these unless explicitly requested.

## 27. REDESIGN RULE

If a user requests a UI change, determine whether it is a Micro UI improvement or a Major redesign.
- For micro improvements: Keep the current layout.
- For major redesign: Create a plan before modifying multiple pages. Never redesign unrelated pages.

## 28. FINAL REPORT

After completing a task, report:
- What changed
- Files changed
- Tests run
- Build result
- Remaining issues

---

### FINAL PRINCIPLE

- Preserve working functionality.
- Make the smallest correct change.
- Keep the project secure.
- Keep the project accessible.
- Keep the project performant.
- Keep the design consistent.
- Never break the production website.
