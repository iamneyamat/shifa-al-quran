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
    .select("title, excerpt, cover_image_url")
    .eq("slug", params.id)
    .eq("status", "published")
    .single();
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | শিফা আল কুরআন`,
    description: post.excerpt,
    openGraph: post.cover_image_url ? {
      images: [
        {
          url: post.cover_image_url,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    } : undefined,
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

  return (articles || []).map((post) => ({
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

  return <BlogPostClient post={post} relatedPosts={relatedPosts || []} />;
}
