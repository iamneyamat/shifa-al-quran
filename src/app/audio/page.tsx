import * as React from "react";
import { AudioPlayerClient } from "./audio-player-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "রুকইয়া অডিও লাইব্রেরি",
  description: "কুরআন ও সুন্নাহ ভিত্তিক রুকইয়া শারইয়া অডিও শুনুন এবং ডাউনলোড করুন।",
};

export default function AudioPage() {
  return <AudioPlayerClient />;
}
