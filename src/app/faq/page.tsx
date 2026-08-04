import { FaqClient } from "./faq-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "সাধারণ জিজ্ঞাসা (FAQ) | শিফা আল কুরআন",
  description: "রুকইয়াহ সম্পর্কে সাধারণ জিজ্ঞাসা ও তার উত্তর।",
};

export default function FAQPage() {
  return <FaqClient />;
}
