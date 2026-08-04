import { GuidelinesClient } from "./guidelines-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "রোগীদের নির্দেশনা",
  description: "রুকইয়াহ চিকিৎসার পূর্বে ও পরে রোগীদের পালনীয় নিয়মাবলি।",
};

export default function GuidelinesPage() {
  return <GuidelinesClient />;
}
