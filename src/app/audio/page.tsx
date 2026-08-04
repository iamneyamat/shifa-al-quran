import * as React from "react";
import { AudioPlayerClient } from "./audio-player-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "রুকইয়াহ অডিও লাইব্রেরি | শিফা আল কুরআন",
  description: "কুরআন ও সুন্নাহ ভিত্তিক রুকইয়াহ শারইয়াহ অডিও শুনুন এবং ডাউনলোড করুন।",
};

export default function AudioPage() {
  return <AudioPlayerClient />;
}
