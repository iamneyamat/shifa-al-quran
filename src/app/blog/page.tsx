import { BlogClient } from "./blog-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ব্লগ ও আর্টিকেল | শিফা আল কুরআন",
  description: "রুকইয়াহ শারইয়াহ, সুন্নাহ এবং সুস্থতা নিয়ে আমাদের সর্বশেষ লেখাগুলো পড়ুন।",
};

export default function BlogPage() {
  return <BlogClient />;
}
