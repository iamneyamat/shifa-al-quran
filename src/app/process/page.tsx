import { ProcessClient } from "./process-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "চিকিৎসা পদ্ধতি",
  description: "শিফা আল কুরআন এর চিকিৎসা পদ্ধতি সম্পর্কে বিস্তারিত জানুন।",
};

export default function ProcessPage() {
  return <ProcessClient />;
}
