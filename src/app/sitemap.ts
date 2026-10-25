import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://saq.pro.bd";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/process`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/evidence`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/guidelines`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/testimonials`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/appointment`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/audio`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/diagnosis`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/diagnosis/destroy-amulets`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Published blog posts — previously missing entirely, and every entry
  // carried lastModified: new Date(), which made the sitemap unstable.
  // Now each post gets its real published/created date; if Supabase/env
  // is unavailable (e.g. local build without env), only static pages
  // are returned instead of breaking the build.
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) return staticPages;

    const supabase = createClient(url, anonKey);
    const { data: articles } = await supabase
      .from("articles")
      .select("slug, published_at, created_at")
      .eq("status", "published");

    const blogPages: MetadataRoute.Sitemap = (articles || [])
      .filter((a) => a.slug)
      .map((a) => ({
        url: `${baseUrl}/blog/${a.slug}`,
        lastModified: a.published_at || a.created_at || undefined,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

    return [...staticPages, ...blogPages];
  } catch {
    return staticPages;
  }
}
