import { BlogClient } from "./blog-client";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  // সাফিক্স বাদ: লেআউট টেমপ্লেটই ব্র্যান্ড যোগ করে, নইলে ট্যাবে দুইবার দেখায়।
  title: "ব্লগ ও আর্টিকেল",
  description: "রুকইয়াহ শারইয়াহ, সুন্নাহ এবং সুস্থতা নিয়ে আমাদের সর্বশেষ লেখাগুলো পড়ুন।",
  alternates: { canonical: "https://saq.pro.bd/blog" },
};

export const revalidate = 60;

export default async function BlogPage() {
  const supabase = await createClient();

  const [articlesRes, categoriesRes] = await Promise.all([
    supabase
      .from("articles")
      .select(`
        id,
        title,
        slug,
        excerpt,
        cover_image_url,
        created_at,
        published_at,
        featured,
        category:content_categories(
          id,
          name,
          slug
        )
      `)
      .eq("status", "published")
      .order("published_at", { ascending: false }),
    supabase
      .from("content_categories")
      .select("id, name, slug")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
  ]);

  const articles = articlesRes.data || [];
  const categories = categoriesRes.data || [];
  // আগে এরর হলে চুপচাপ "কোনো আর্টিকেল পাওয়া যায়নি" দেখাত — এখন
  // এরর আলাদা করে পাঠানো হচ্ছে, যাতে খালি আর ব্যর্থতা গুলিয়ে না যায়।
  const loadError = Boolean(articlesRes.error || categoriesRes.error);

  return <BlogClient initialPosts={articles} initialCategories={categories} loadError={loadError} />;
}
