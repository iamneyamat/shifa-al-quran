import { EvidenceClient } from "./evidence-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ইসলামিক প্রমাণ",
  description: "কোরআন ও সুন্নাহর আলোকে রুকইয়াহ শারইয়াহ এর প্রমাণসমূহ।",
};

export default function EvidencePage() {
  return <EvidenceClient />;
}
