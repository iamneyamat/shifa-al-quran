import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import {
  Inter,
  Hind_Siliguri,
  Noto_Serif_Bengali,
  Amiri_Quran,
  Aref_Ruqaa,
  Scheherazade_New,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AudioProvider } from "@/features/audio/context/AudioContext";
import { SiteChrome } from "@/components/site-chrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind",
});

const headlineBangla = localFont({
  src: "../fonts/headline-bangla.otf",
  variable: "--font-headline-bangla",
  display: "swap",
});

// Bengali display serif. Weights 600/700 only — headings never exceed 700.
const notoSerifBengali = Noto_Serif_Bengali({
  weight: ["600", "700"],
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
});

// Quranic naskh font
const amiriQuran = Amiri_Quran({
  weight: "400",
  subsets: ["arabic"],
  variable: "--font-amiri",
});

// Arabic Calligraphy font (Ruqaa script)
const arefRuqaa = Aref_Ruqaa({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-aref-ruqaa",
});

// Arabic Calligraphy font (Scheherazade Naskh & Thuluth)
const scheherazade = Scheherazade_New({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-scheherazade",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Shifa Al Quran - Islamic Ruqyah Center",
    default: "Shifa Al Quran - Islamic Ruqyah Center",
  },
  description: "Professional Islamic Ruqyah center providing Quranic healing for various physical and spiritual ailments. Learn about Ruqyah, get treatments, and find peace.",
  // Site-wide keywords: these are the site's own topics/services, not
  // invented claims. Per-page metadata still overrides where it exists.
  keywords: [
    "রুকইয়া",
    "রুকইয়া শারইয়া",
    "শিফা আল কুরআন",
    "কুরআনিক চিকিৎসা",
    "বদনজর চিকিৎসা",
    "জাদু চিকিৎসা",
    "জিনের সমস্যা",
    "সেলফ রুকইয়া",
    "ঢাকা রুকইয়া সেন্টার",
    "Ruqyah",
    "Ruqyah Shariah",
    "Islamic healing Bangladesh",
    "Dhaka Ruqyah center",
  ],
  metadataBase: new URL("https://saq.pro.bd"),
  openGraph: {
    title: "Shifa Al Quran - Islamic Ruqyah Center",
    description: "Professional Islamic Ruqyah center providing Quranic healing.",
    url: "https://saq.pro.bd",
    siteName: "Shifa Al Quran",
    locale: "bn_BD",
    type: "website",
    images: [{ url: "https://saq.pro.bd/logo.png", alt: "Shifa Al Quran logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shifa Al Quran - Islamic Ruqyah Center",
    description: "Professional Islamic Ruqyah center providing Quranic healing.",
    images: ["https://saq.pro.bd/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    // Matches --surface-base in each theme: parchment and ink.
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${inter.variable} ${hindSiliguri.variable} ${headlineBangla.variable} ${notoSerifBengali.variable} ${amiriQuran.variable} ${arefRuqaa.variable} ${scheherazade.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Shifa Al Quran - শিফা আল কুরআন",
              "image": "https://saq.pro.bd/logo.png",
              "@id": "https://saq.pro.bd",
              "url": "https://saq.pro.bd",
              "telephone": "09639-000999",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "#535/C Khilgaon, Dhaka",
                "addressLocality": "Khilgaon",
                "addressRegion": "Dhaka",
                "addressCountry": "BD"
              },
              "openingHours": "Sa-Th 10:00-20:00",
              "sameAs": [
                "https://facebook.com/shifaquran",
                "https://www.youtube.com/@ShifaAlQuran786"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Shifa Al Quran",
              url: "https://saq.pro.bd",
              inLanguage: "bn",
            }),
          }}
        />
        <AudioProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {/* Global Islamic geometric pattern background */}
            <div
              className="fixed inset-0 z-[-1] opacity-[0.02] dark:opacity-[0.03] dark:invert pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            <SiteChrome>{children}</SiteChrome>
          </ThemeProvider>
        </AudioProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
