import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
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
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { AudioProvider } from "@/features/audio/context/AudioContext";
import { GlobalAudioPlayer } from "@/features/audio/components/global-audio-player";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind",
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
  metadataBase: new URL("https://shifa-al-quran.vercel.app"),
  openGraph: {
    title: "Shifa Al Quran - Islamic Ruqyah Center",
    description: "Professional Islamic Ruqyah center providing Quranic healing.",
    url: "https://shifa-al-quran.vercel.app",
    siteName: "Shifa Al Quran",
    locale: "bn_BD",
    type: "website",
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
      className={`${inter.variable} ${hindSiliguri.variable} ${notoSerifBengali.variable} ${amiriQuran.variable} ${arefRuqaa.variable} ${scheherazade.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Shifa Al Quran - শিফা আল কুরআন",
              "image": "https://shifa-al-quran.vercel.app/logo.png",
              "@id": "https://shifa-al-quran.vercel.app",
              "url": "https://shifa-al-quran.vercel.app",
              "telephone": "09639-000999",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Dhaka",
                "addressLocality": "Dhaka",
                "addressRegion": "Dhaka",
                "postalCode": "1000",
                "addressCountry": "BD"
              }
            })
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
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FloatingWhatsapp />
            <GlobalAudioPlayer />
          </ThemeProvider>
        </AudioProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
