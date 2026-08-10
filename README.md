# Shifa Al Quran

## 1. Project Overview

Shifa Al Quran is an Islamic Ruqyah information and service platform designed to provide guidance, resources, and treatment information for physical and spiritual ailments. The platform adheres to authentic Islamic teachings and facilitates Ruqyah services for those in need.

**Important Note:** This platform provides information and services based on Quranic healing. We do not make guaranteed medical or healing claims, as healing is entirely by the will of Allah (Subhanahu wa Ta'ala).

## 2. Current Features

The project currently includes the following active features:

- Responsive design for all devices
- Dark mode and Light mode toggling
- Bilingual support (Bengali / English) content structure (primarily Bengali UI)
- Pages: Home, About, Services, Ruqyah Information, Islamic Evidence, Treatment Process, Patient Guidelines, Testimonials, FAQ, Contact, Appointment
- WhatsApp floating integration
- Audio library with an integrated Audio player
- Audio search and download capabilities
- Blog/articles section with search functionality
- FAQ search functionality
- SEO optimization (Metadata, Sitemap, Robots.txt, JSON-LD Structured Data)
- Accessibility features (Semantic HTML, aria attributes)
- Advanced UI animations (Framer Motion)
- Performance tracking (Vercel Analytics & Speed Insights)
- Appointment form with client-side validation

## 3. Technology Stack

- **Framework:** Next.js (v16.2.12)
- **Library:** React (v19.2.4)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Form Handling & Validation:** React Hook Form & Zod
- **Icons:** Lucide React & React Icons
- **Theming:** Next Themes
- **Analytics & Performance:** Vercel Analytics, Vercel Speed Insights

## 4. Project Structure

The repository follows standard Next.js App Router conventions:

- `src/` - Main source code directory
  - `app/` - Next.js application routes and layouts (e.g., about, audio, appointment, blog, faq, etc.)
  - `components/` - Reusable UI components (e.g., navbar, footer, appointment form, theme toggles)
  - `lib/` - Utility functions and data objects (e.g., `utils.ts`, `blog-data.ts`)
- `public/` - Static assets like images and icons
- `audios.json` - Data source for the audio library located in the root directory

## 5. Requirements

- Node.js (v20+ recommended)
- npm
- Git

## 6. Installation

Follow these instructions to run the project locally:

```bash
git clone https://github.com/iamneyamat/shifa-al-quran.git
cd shifa-al-quran
npm install
npm run dev
```

The application will be available at `http://localhost:3000` for local development.

## 7. Available Commands

- `npm run dev` - Starts the local development server with hot-reloading.
- `npm run build` - Builds the application for production deployment.
- `npm start` - Starts the Next.js production server.
- `npm run lint` - Runs ESLint to identify and report on patterns and errors in the code.

## 8. Environment Variables

Currently, the project does not require any environment variables to run locally or build.

If environment variables are added in the future, create a `.env.local` file in the root directory. Use placeholder values in any committed examples (e.g., `.env.example`).
**Security Rule:** Never commit real secret values to the repository. Ensure `.env.local` remains in `.gitignore`.

## 9. Appointment System

The appointment system currently consists of a frontend interface located at `src/components/appointment-form.tsx`.
- **Validation:** Uses React Hook Form and Zod to enforce strict client-side validation rules.
- **Data Destination:** The form simulates an API submission with a timeout delay and shows a success state.
- **API/Database:** There are currently no backend API routes, Google Sheets integrations, or database connections configured for this form.

## 10. Audio System

The audio system plays Ruqyah recitations and Islamic audio.
- **Data Source:** Audio metadata (title, size, URL) is loaded from the root `audios.json` file.
- **Player:** The audio player is built into `src/app/audio/audio-player-client.tsx` and provides playback, search, and download features.
- **Adding Audio:** Developers can add new audio files by simply adding a new JSON object with `title`, `size`, and `url` to the `audios.json` array.

## 11. Content Management

Content is currently managed directly in the codebase:
- **Text & UI Elements:** Hardcoded within the respective page and component `.tsx` files.
- **Blog Articles:** Managed via TypeScript objects in `src/lib/blog-data.ts`.
- **Audio:** Managed via the `audios.json` file.
- **Services & Testimonials:** Managed via local arrays in their respective page components.

## 12. Design System

- **Colors:** The primary theme uses Emerald/Green tones, with Slate/Dark backgrounds for the dark theme.
- **Theming:** Implements full Dark and Light themes via `next-themes`.
- **Typography:** Uses Inter, Hind Siliguri (for Bengali), and Noto Naskh Arabic fonts.
- **UI Elements:** Extensively uses glassmorphism effects, border radiuses (`rounded-2xl`, `rounded-full`), soft shadows, and vibrant gradients.
- **Animations:** Interactive hover states and smooth page transitions using Framer Motion.
- **Responsiveness:** Fully mobile-responsive using Tailwind utility classes.

## 13. SEO

The project implements modern SEO standards:
- **Metadata:** Comprehensive static and dynamic metadata is defined in `src/app/layout.tsx`.
- **Structured Data:** LocalBusiness schema is injected via JSON-LD in `layout.tsx`.
- **Sitemap & Robots:** Automated generation using `src/app/sitemap.ts` and `src/app/robots.ts`.
- **Open Graph:** Defined for proper social media sharing.

## 14. Accessibility

- **Semantic HTML:** Correct usage of main, nav, section, and article tags.
- **Focus States:** Tailwind classes (`focus-visible:ring-2`) are used for keyboard navigation.
- **Color Contrast:** The dark and light color palettes maintain strong readability for visually impaired users.

## 15. Deployment

The production application is deployed using Vercel.
- **Architecture:** GitHub → Vercel → https://saq.pro.bd
- **Process:** Any push to the `main` branch automatically triggers a production build and deployment on Vercel.

## 16. Backup and Recovery

- **Primary Source:** GitHub is the central source of truth for the codebase.
- **Backups:** Local ZIP backups of the repository should be maintained independently of Git.
- **Restoration:** To restore the project on another machine, clone the repository and run `npm install`. Note that `node_modules` and `.next` are generated folders and should never be backed up or committed.
- **Secrets:** Any future environment secrets must be securely stored in a password manager and manually injected into the Vercel dashboard.

## 17. AI Development

This project includes an `AGENTS.md` file in the root directory. AI coding agents should strictly read and adhere to the guidelines in `AGENTS.md` before analyzing or modifying the project.

## 18. Safe Development Workflow

1. Pull latest changes
2. Inspect project
3. Make small changes
4. npm run lint
5. npm run build
6. Test locally
7. Review changes
8. Git commit
9. Git push
10. Verify Vercel deployment

## 19. Security Rules

- Never commit secrets
- Never expose API keys
- Never expose private appointment data
- Never commit .env.local
- Never expose service account credentials

## 20. Future Roadmap (FUTURE / PLANNED)

The following features are **NOT** currently implemented but may be planned for the future:

- React Native / Expo mobile app
- Push notifications
- User accounts
- Appointment tracking
- Daily Azkar
- Daily Quran verse
- Offline audio
- Favorites
- Admin dashboard
- Centralized API
- CMS
- Dedicated audio storage/CDN
