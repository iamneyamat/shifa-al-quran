import { BlogPostClient } from "./blog-post-client";
import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts.find(p => p.id === params.id);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | শিফা আল কুরআন`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === params.id);
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
