import { PrivacyClient } from "./privacy-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "প্রাইভেসি পলিসি | শিফা আল কুরআন",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
