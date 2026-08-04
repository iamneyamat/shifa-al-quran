import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, ChevronRight } from "lucide-react";

export const metadata = {
  title: "ব্লগ ও আর্টিকেল | শিফা আল কুরআন",
  description: "রুকইয়াহ শারইয়াহ, সুন্নাহ এবং সুস্থতা নিয়ে আমাদের সর্বশেষ লেখাগুলো পড়ুন।",
};

const blogPosts = [
  {
    id: 1,
    title: "সুন্নাহর আলোকে বদনজরের চিকিৎসা ও প্রতিকার",
    excerpt: "বদনজর বা 'আইন' একটি সত্য বিষয়। কীভাবে আমরা নিজেদের এবং পরিবারকে বদনজর থেকে সুরক্ষিত রাখতে পারি, এবং আক্রান্ত হলে সুন্নাহ সম্মত চিকিৎসা কী হতে পারে তা নিয়ে বিস্তারিত আলোচনা।",
    image: "/api/images/blog_quran_ruqyah", // Note: Need to copy generated images to public folder or use local file protocol. For Next.js image to work with absolute local paths outside public, we need a workaround or simply copy them.
    // Wait, the generated images are in the brain folder. I should copy them to public folder in the build process or just read them from a public URL if available.
    // I will write a small node script or just run bash commands to copy the images. Let's use placeholder strings here for a moment and replace them after copying.
    imageRef: "blog_quran_ruqyah",
    category: "সুন্নাহ",
    date: "১৫ আগস্ট, ২০২৬",
    author: "শিফা আল কুরআন"
  },
  {
    id: 2,
    title: "নামাজ ও যিকিরের মাধ্যমে মানসিক প্রশান্তি",
    excerpt: "বর্তমান সময়ের হতাশা, দুশ্চিন্তা ও মানসিক অস্থিরতা থেকে মুক্তি পেতে পাঁচ ওয়াক্ত নামাজ এবং সকাল-সন্ধ্যার যিকির কতটা গুরুত্বপূর্ণ তা কুরআন ও হাদিসের আলোকে তুলে ধরা হলো।",
    imageRef: "blog_prayer_peace",
    category: "মানসিক স্বাস্থ্য",
    date: "১০ আগস্ট, ২০২৬",
    author: "শিফা আল কুরআন"
  },
  {
    id: 3,
    title: "প্রাকৃতিক উপায়ে সুস্থতা এবং রুকইয়াহ",
    excerpt: "মধু, কালোজিরা, জমজমের পানি এবং জলপাই তেলের মত সুন্নাহ নির্দেশিত প্রাকৃতিক উপাদানগুলো কীভাবে আমাদের শারীরিক সুস্থতার পাশাপাশি রুকইয়াহ এর চিকিৎসায় সাহায্য করে।",
    imageRef: "blog_nature_healing",
    category: "রুকইয়াহ",
    date: "৫ আগস্ট, ২০২৬",
    author: "শিফা আল কুরআন"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-light-bg-main dark:bg-slate-950 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl font-extrabold tracking-tight text-light-heading dark:text-white sm:text-5xl mb-6">
            ব্লগ ও আর্টিকেল
          </h1>
          <div className="h-1 w-20 bg-emerald-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-light-text dark:text-slate-300 leading-relaxed">
            রুকইয়াহ শারইয়াহ, সুন্নাহ এবং সুস্থতা নিয়ে আমাদের সর্বশেষ লেখাগুলো পড়ুন।
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="flex flex-col bg-light-bg-alt2 dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-light-border dark:border-slate-800 transition-all hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 group"
            >
              {/* Image Section */}
              <div className="relative h-64 w-full overflow-hidden bg-emerald-900/20">
                <div className="absolute inset-0 bg-emerald-900 flex items-center justify-center text-emerald-500">
                  <span className="text-2xl font-bold opacity-20">শিফা আল কুরআন</span>
                </div>
                {/* Image tag will go here once images are copied */}
                <Image
                  src={`/${post.imageRef}.png`}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-grow p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium gap-1.5">
                    <Clock className="w-4 h-4" />
                    <time>{post.date}</time>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-light-heading dark:text-slate-100 mb-4 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>

                <p className="text-light-text dark:text-slate-400 mb-6 line-clamp-3 text-[15px] leading-relaxed flex-grow">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-light-border dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-light-text dark:text-slate-400 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    {post.author}
                  </div>
                  
                  <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-bold group-hover:translate-x-1 transition-transform">
                    বিস্তারিত <ChevronRight className="w-4 h-4 ml-0.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
