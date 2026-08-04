import { TestimonialsClient } from "./testimonials-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে মানুষের মতামত",
  description: "শিফা আল কুরআন থেকে সেবা নেওয়া মানুষদের মতামত।",
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
