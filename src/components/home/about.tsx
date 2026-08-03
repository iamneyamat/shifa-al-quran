import * as React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function AboutSection() {
  const points = [
    "কুরআন এবং সুন্নাহ ভিত্তিক বিশুদ্ধ চিকিৎসা",
    "দীর্ঘদিনের অভিজ্ঞ ও বিজ্ঞ রাকি দ্বারা পরিচালিত",
    "রোগীদের সর্বোচ্চ গোপনীয়তা রক্ষা করা হয়",
    "যেকোনো প্রকার বিদআত ও শিরক মুক্ত পদ্ধতি",
    "পারিবারিক ও মানসিক শান্তির জন্য কাউন্সেলিং",
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual side */}
          <div className="relative rounded-2xl bg-slate-100 dark:bg-slate-900 p-8 flex items-center justify-center min-h-[400px]">
            {/* Placeholder for an actual image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/50 to-emerald-50/10 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-2xl"></div>
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto bg-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
                <span className="text-3xl font-bold text-white">SAQ</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">শিফা আল কুরআন</h3>
              <p className="text-emerald-700 dark:text-emerald-400 font-medium">নির্ভরযোগ্য রুকইয়াহ সেন্টার</p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gold/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
          </div>

          {/* Text content side */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
              আমরা কেন অন্যান্য রুকইয়াহ সেন্টার থেকে আলাদা?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              শিফা আল কুরআন কোনো সাধারণ চিকিৎসা কেন্দ্র নয়, বরং এটি একটি সুন্নাহ ভিত্তিক রুকইয়াহ শারইয়াহ সেন্টার। আমাদের মূল উদ্দেশ্য হলো কোরআন ও হাদিসের আলোকে মানুষের শারীরিক ও আধ্যাত্মিক সুস্থতা নিশ্চিত করা। আমরা বিশ্বাস করি প্রকৃত আরোগ্য কেবল আল্লাহ সুবহানাহু ওয়া তায়ালার পক্ষ থেকেই আসে।
            </p>

            <ul className="space-y-4 mb-10">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              আমাদের সম্পর্কে আরও জানুন
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
