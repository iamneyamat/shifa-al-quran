# Architecture Document: Shifa Al Quran

This document provides a comprehensive overview of the Shifa Al Quran project's architecture, including its current implementation and future roadmap. It is intended for senior developers, junior developers, AI coding agents, and future maintainers to understand the system at a glance.

---

## 1. Project Overview

Shifa Al Quran is an Islamic Ruqyah information and service platform. Its primary purpose is to provide authentic guidance, resources, and treatment information for physical and spiritual ailments in accordance with Islamic teachings. The platform serves as a digital touchpoint for users to learn about Ruqyah, access audio resources, read related articles, and request appointments.

---

## 2. High-Level Architecture (Current Implementation)

The current architecture is a statically generated and client-hydrated web application with no dynamic backend:

**Browser**
  ↓ (HTTP Requests)
**Next.js Server (Vercel Edge Network)**
  ↓ (Renders)
**Pages (`src/app`)**
  ↓ (Compose)
**Components (`src/components`)**
  ↓ (Consume)
**Static Data / Local State (`audios.json`, `.ts` data files)**
  ↓ (Links out to)
**External Services (WhatsApp routing, Audio CDN)**

---

## 3. Next.js Architecture

The project heavily utilizes Next.js (currently version 16.2.12) features:

- **App Router:** The project uses the modern App Router architecture (`src/app`).
- **Pages/Routes:** Each directory in `app/` with a `page.tsx` represents a route.
- **Layouts:** `src/app/layout.tsx` serves as the root layout, injecting providers (theme, analytics) and global UI (Navbar, Footer, WhatsApp button).
- **Server Components:** Used by default for pages to minimize client bundle size and optimize SEO.
- **Client Components:** Identified by `"use client"`, used specifically for interactive UI (e.g., `appointment-form.tsx`, `audio-player-client.tsx`, `theme-provider.tsx`).
- **API Routes:** *Currently not implemented.*
- **Middleware:** *Currently not implemented.*

---

## 4. Folder Architecture

The repository follows a clean, component-driven structure:

- `src/` - The root directory for all application source code.
  - `app/` - Next.js App Router directory containing all page routes, layouts, and SEO configurations (`sitemap.ts`, `robots.ts`).
  - `components/` - Reusable React components (Navbar, Footer, Forms).
  - `lib/` - Utility functions (e.g., `utils.ts` for Tailwind merging) and static data objects (e.g., `blog-data.ts`).
- `public/` - Static assets such as images, favicons, and fonts.
- `audios.json` - (Root level) Data file serving as the database for the audio library.

---

## 5. Routing Architecture

The application implements the following static routes:

- `/` (Home) - Landing page with hero section, service highlights, and call-to-actions.
- `/about` - Information about the Ruqyah center.
- `/services` - Details of services provided.
- `/evidence` - Islamic evidence and authentic sources for Ruqyah.
- `/process` - Explanation of the treatment process.
- `/guidelines` - Guidelines for patients before and after treatment.
- `/testimonials` - Feedback and reviews from previous patients.
- `/faq` - Frequently Asked Questions with an interactive client-side search.
- `/appointment` - The appointment booking page containing the interactive form.
- `/contact` - Contact information and location.
- `/audio` - Audio library with a built-in player.
- `/blog` - Articles and resources with search capabilities.
- `/blog/[id]` - Dynamic route statically generated for individual blog posts.
- `/privacy` - Privacy policy.
- `/terms` - Terms of service.

---

## 6. Component Architecture

The project relies on a modular component architecture. Key reusable components located in `src/components/` include:

- **Navbar / Footer:** Global layout components.
- **AppointmentForm:** A complex, client-side validated form (`appointment-form.tsx`).
- **FloatingWhatsapp:** A floating action button for direct communication.
- **ThemeToggle / ThemeProvider:** Components handling dark/light mode switching.
- **AudioPlayerClient:** An interactive, specialized media player (located in `src/app/audio/`).
- **UI Primitives:** Tailwind utility classes handle Cards, Buttons, and Modals inline, utilizing glassmorphism and subtle Framer Motion animations.

---

## 7. Data Architecture

The current application is entirely stateless on the backend. Data is sourced from:

- **Static JSON:** `audios.json` acts as the data source for the audio library.
- **Static TypeScript Objects:** `src/lib/blog-data.ts` acts as the database for blog posts.
- **Hardcoded Content:** Page text, services, and testimonials are hardcoded within their respective `.tsx` files.
- **API / Database / Google Sheets:** *Currently not implemented.*

---

## 8. Appointment Architecture

The current appointment flow is a frontend-only implementation:

**User** 
  ↓ (Fills out form) 
**Appointment Form (`appointment-form.tsx`)** 
  ↓ (Validates input) 
**Zod Validation / React Hook Form** 
  ↓ (Simulates submission) 
**Mock API Call (`setTimeout` delay)** 
  ↓ (Returns status) 
**Success State UI (Visual confirmation only)**

*Note: No data is currently saved to a database or sent via email/external service.*

---

## 9. Audio Architecture

The audio system provides playback of Ruqyah recitations:

- **Metadata Source:** Root `audios.json` file contains an array of objects.
- **Data Structure:** Each audio entry requires a `title`, `size`, and `url`.
- **Audio Files (Storage):** Audio files are not hosted within this repository; they are streamed from external CDN URLs (e.g., `files.ruqyahbd.org`).
- **Audio Player:** Implemented in `audio-player-client.tsx`, featuring play, pause, progress tracking, search filtering, and direct file download capabilities.

---

## 10. Content Architecture

Content is currently managed by developers directly modifying the codebase:

- **Articles:** Added by creating objects in `blog-data.ts`.
- **Audio:** Added by appending JSON objects to `audios.json`.
- **Services/Testimonials/Evidence:** Managed by directly editing the arrays or HTML within the corresponding route's `page.tsx` file.

---

## 11. Theme Architecture

The visual identity is managed through a comprehensive Tailwind CSS setup:

- **Theming Strategy:** `next-themes` toggles a `dark` class on the root HTML element.
- **Color System:** Emerald/Green primary accents, with Slate/Navy providing structural colors.
- **CSS Architecture:** Tailwind v4 handles styling entirely through utility classes, with custom variables defined in `src/app/globals.css`.

---

## 12. Language Architecture

- **Implementation:** The application interface is primarily in Bengali, with English used where necessary.
- **Architecture:** Translations are hardcoded directly into the TSX files. There is currently no dynamic i18n routing or translation library (like `next-i18next`) implemented.

---

## 13. SEO Architecture

The project has robust static SEO features:

- **Metadata:** Root and page-level metadata defined via Next.js Metadata API.
- **Structured Data:** JSON-LD schema (LocalBusiness) is injected directly in `layout.tsx`.
- **Sitemap & Robots:** Dynamically generated at build time using `sitemap.ts` and `robots.ts`.

---

## 14. Analytics

- **Vercel Analytics:** Integrated via `@vercel/analytics/react`.
- **Vercel Speed Insights:** Integrated via `@vercel/speed-insights/next`.

---

## 15. External Services

The project currently relies on the following external services:

- **Vercel:** Hosting, Analytics, and CI/CD Pipeline.
- **RuqyahBD CDN:** External hosting for MP3 audio files.
- **WhatsApp:** URL routing for direct messaging via the floating action button.

---

## 16. Environment Variables

*Currently, no environment variables are required to build or run this project.*

Future environment variables must be defined in a `.env.local` file (which is git-ignored) and never committed to the repository.

---

## 17. Security Architecture

- **Input Validation:** Strict client-side validation using Zod ensures the appointment form rejects malformed data.
- **Data Protection:** Since there is no backend or database, no user data is collected, stored, or exposed by the server.
- **Secret Management:** The repository relies on `.gitignore` to prevent accidental commits of `.env` files.

---

## 18. Performance Architecture

- **Server Components:** By default, pages ship zero JavaScript to the client.
- **Static Generation:** All routes are pre-rendered as static HTML (SSG) at build time for instant loading.
- **Code Splitting:** Handled automatically by the Next.js App Router.
- **Edge Caching:** Vercel automatically caches static assets and pages at the edge.

---

## 19. Deployment Architecture

The application uses a continuous deployment pipeline:

**GitHub Repository** (`main` branch)
  ↓ (Webhook trigger on push)
**Vercel Build Server** (Runs `npm run build`)
  ↓ (Deploys static assets)
**Vercel Edge Network** (Production environment at https://saq.pro.bd)

---

## 20. Backup and Recovery

- **Source Code:** GitHub is the primary remote backup.
- **Local Backup:** Developers are expected to maintain local ZIP backups of the repository (excluding `node_modules` and `.next`).
- **Restoration:** A new instance can be spun up on any machine by running `git clone`, `npm install`, and `npm run dev`.

---

==================================================
# FUTURE / PLANNED ARCHITECTURE
==================================================

*The following sections outline the intended future state of the Shifa Al Quran platform. These features and systems **DO NOT** currently exist.*

## 21. Future Mobile App Architecture

A React Native or Expo mobile application is planned for the future. To support this, the architecture will evolve to decouple data from the web UI:

- **Shared APIs:** The web platform's Next.js API routes (to be created) will serve JSON data to both the Web frontend and the Mobile App.
- **Shared Content:** Articles, audio metadata, and Islamic content will be fetched from this centralized API rather than hardcoded `.ts` files.
- **Feature Parity:** The mobile app will consume the exact same appointment, authentication, and notification systems as the web application.

## 22. Future Backend Architecture

To support dynamic features like user accounts, appointment tracking, and content management, the architecture will transition to a dynamic system:

**Clients (Next.js Web + Expo Mobile App)**
  ↓ (REST/GraphQL HTTP Requests)
**Central API Layer (Next.js API Routes or separate Node.js server)**
  ↓
**Database Layer (PostgreSQL / MongoDB)** 
  + 
**Object Storage/CDN (AWS S3 / Cloudflare R2 for dedicated audio hosting)**

This planned architecture will allow for an Admin Dashboard (CMS) to manage the platform dynamically without requiring codebase updates for content changes.
