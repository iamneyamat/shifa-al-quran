import type { Metadata } from "next";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | Shifa Al Quran",
  description: "শিফা আল কুরআন সম্পর্কে বিস্তারিত জানুন। আমাদের লক্ষ্য, উদ্দেশ্য এবং সুন্নাহ ভিত্তিক চিকিৎসা পদ্ধতি সম্পর্কে জানুন।",
};

export default function AboutPage() {
  return <AboutClient />;
}
