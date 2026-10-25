import { PrivacyClient } from "./privacy-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "প্রাইভেসি পলিসি",
  description: "শিফা আল কুরআন ওয়েবসাইটের প্রাইভেসি পলিসি — আপনার তথ্য কীভাবে সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখা হয়।",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
