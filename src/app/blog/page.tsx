import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "ব্লগ ও আর্টিকেল",
  description: "রুকইয়াহ, সুন্নাহ এবং সুস্থতা নিয়ে ইসলামিক আর্টিকেলসমূহ।",
};

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "সকাল-সন্ধ্যার মাসনুন দোয়াসমূহ ও এর ফজিলত",
      excerpt: "রাসূল (সা.) শিখিয়েছেন কীভাবে আমরা সকাল ও সন্ধ্যায় আল্লাহর কাছে পানাহ চাইতে পারি। এই দোয়াগুলো আমাদের সারাদিনের সুরক্ষা দেয়...",
      date: "১৫ আগস্ট, ২০২৬",
      category: "সুন্নাহ",
    },
    {
      id: 2,
      title: "বদনজর (আইন) থেকে বাঁচার উপায়",
      excerpt: "বদনজর একটি সত্য বিষয়। এর প্রভাবে মানুষ অসুস্থ হতে পারে। কোরআন ও সুন্নাহর আলোকে বদনজর থেকে বাঁচার উপায়গুলো জেনে নিন...",
      date: "১০ আগস্ট, ২০২৬",
      category: "রুকইয়াহ",
    },
    {
      id: 3,
      title: "ডিপ্রেশন বা মানসিক অবসাদে ইসলামের সমাধান",
      excerpt: "হতাশা ও ডিপ্রেশন আজকাল একটি সাধারণ সমস্যা। আল্লাহ তায়ালা কোরআনে কীভাবে এর সমাধান দিয়েছেন তা নিয়ে আলোচনা...",
      date: "৫ আগস্ট, ২০২৬",
      category: "মানসিক স্বাস্থ্য",
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            ব্লগ ও আর্টিকেল
          </h1>
          <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-300">
            রুকইয়াহ শারইয়াহ, সুন্নাহ এবং সুস্থতা নিয়ে আমাদের সর্বশেষ লেখাগুলো পড়ুন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col group">
              <div className="h-48 bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center relative overflow-hidden">
                {/* Decorative background instead of image */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent group-hover:scale-110 transition-transform duration-500"></div>
                <span className="font-bold text-xl text-emerald-800/50 dark:text-emerald-400/50">শিফা আল কুরআন</span>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.date}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <Link href="#" className="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-500 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  বিস্তারিত পড়ুন
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
