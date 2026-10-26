import { createClient } from "@/lib/supabase/server";
import { TestimonialsClient } from "./testimonials-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে মানুষের মতামত",
  description: "শিফা আল কুরআন থেকে সেবা নেওয়া মানুষদের মতামত।",
};

export default async function TestimonialsPage() {
  const supabase = await createClient();

  // Live data from the admin-managed testimonials table.
  // Only published rows are shown, in the same order as the app:
  // sort_order first, then newest.
  const { data } = await supabase
    .from("testimonials")
    .select(
      "id, customer_name, location, content, category, rating, is_featured, media_type, video_url, image_url, audio_url, sort_order, created_at"
    )
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return <TestimonialsClient testimonials={data || []} />;
}
