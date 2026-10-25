import { BlogPostClient } from "./blog-post-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60; // ISR revalidation every 60 seconds

export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("articles")
    .select("title, excerpt, cover_image_url, published_at, created_at")
    .eq("slug", params.id)
    .eq("status", "published")
    .single();

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const description = post.excerpt || `${post.title} — শিফা আল কুরআন ব্লগে পড়ুন।`;
  const canonical = `https://saq.pro.bd/blog/${params.id}`;
  const publishedTime = post.published_at || post.created_at || undefined;

  return {
    // সাফিক্স বাদ: লেআউট টেমপ্লেটই ব্র্যান্ড যোগ করে।
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      publishedTime,
      images: post.cover_image_url ? [
        {
          url: post.cover_image_url,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

import { createClient as createSupabaseJsClient } from "@supabase/supabase-js";

export async function generateStaticParams() {
  const supabase = createSupabaseJsClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { data: articles } = await supabase
    .from("articles")
    .select("slug")
    .eq("status", "published");

  return (articles || []).filter((post) => post.slug).map((post) => ({
    id: post.slug,
  }));
}

export default async function BlogPostPage(
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("articles")
    .select(`
      *,
      category:content_categories(
        id,
        name,
        slug
      )
    `)
    .eq("slug", params.id)
    .eq("status", "published")
    .single();
  
  if (!post) {
    notFound();
  }

  // Fetch related posts (same category, excluding current)
  const { data: relatedPosts } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      slug,
      created_at,
      published_at,
      cover_image_url,
      category:content_categories(
        id,
        name,
        slug
      )
    `)
    .eq("category_id", post.category_id || '')
    .eq("status", "published")
    .neq("id", post.id)
    .order("created_at", { ascending: false })
    .limit(3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.cover_image_url || undefined,
    author: { "@type": "Organization", name: "Shifa Al Quran", url: "https://saq.pro.bd" },
    publisher: { "@type": "Organization", name: "Shifa Al Quran", url: "https://saq.pro.bd" },
    datePublished: post.published_at || post.created_at || undefined,
    dateModified: post.updated_at || undefined,
    mainEntityOfPage: `https://saq.pro.bd/blog/${params.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostClient post={post} relatedPosts={relatedPosts || []} />
    </>
  );
}
