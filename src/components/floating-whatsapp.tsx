"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsapp() {
  return (
    <Link
      href="https://wa.me/8801840601484"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-background"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </Link>
  );
}
