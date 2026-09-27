"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useAudio } from "@/features/audio/context/AudioContext";
import { cn } from "@/lib/utils";

export function FloatingWhatsapp() {
  const { currentTrack } = useAudio();

  return (
    <Link
      href="https://wa.me/8801353301772"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed right-4 sm:right-6 z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-background",
        currentTrack
          ? "bottom-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] sm:bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))]"
          : "bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:bottom-6"
      )}
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
    </Link>
  );
}
