"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { GlobalAudioPlayer } from "@/features/audio/components/global-audio-player";

/**
 * Public site chrome. Admin pages get their own sidebar layout, so the
 * public navbar, footer, WhatsApp button and audio player are hidden
 * under /admin/* instead of stacking on top of the dashboard.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWhatsapp />
      <GlobalAudioPlayer />
    </>
  );
}
