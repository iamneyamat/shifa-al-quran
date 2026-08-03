import type { Metadata, Viewport } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind",
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
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
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
      className={`${inter.variable} ${hindSiliguri.variable} scroll-smooth`}
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingWhatsapp />
        </ThemeProvider>
      </body>
    </html>
  );
}
