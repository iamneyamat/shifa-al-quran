import { TermsClient } from "./terms-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "শর্তাবলি",
  description: "শিফা আল কুরআন ওয়েবসাইট ব্যবহারের শর্তাবলি — সেবা, অ্যাপয়েন্টমেন্ট ও কনটেন্ট সংক্রান্ত নিয়ম।",
};

export default function TermsPage() {
  return <TermsClient />;
}
