import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে মানুষের মতামত",
  description: "শিফা আল কুরআন থেকে সেবা নেওয়া মানুষদের মতামত।",
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "আব্দুর রহমান",
      location: "ঢাকা",
      review: "আলহামদুলিল্লাহ, দীর্ঘদিন ধরে শারীরিক ও মানসিক সমস্যায় ভুগছিলাম। শিফা আল কুরআনে রুকইয়াহ করানোর পর আল্লাহর রহমতে এখন সম্পূর্ণ সুস্থ। তাদের সুন্নাহ সম্মত চিকিৎসা পদ্ধতি সত্যিই অসাধারণ।",
    },
    {
      name: "নাম প্রকাশে অনিচ্ছুক",
      location: "সিলেট",
      review: "পরিবারে দীর্ঘদিনের অশান্তি ছিল। অনেক জায়গায় গিয়েছি কিন্তু কোনো সমাধান পাইনি। শেষে এখানে আসি এবং উনাদের নির্দেশনা অনুযায়ী আমল করি। এখন আল্লাহ অনেক শান্তিতে রেখেছেন।",
    },
    {
      name: "উম্মে ফাতিমা",
      location: "চট্টগ্রাম",
      review: "জিনের সমস্যার কারণে স্বাভাবিক জীবনযাপন কঠিন হয়ে পড়েছিল। উনাদের কাছে রুকইয়াহ সেশনের পর আল্লাহর রহমতে আমি সম্পূর্ণ সুস্থ। সবচেয়ে ভালো লেগেছে যে উনারা শিরক ও বিদআতমুক্ত চিকিৎসা করেন।",
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            রোগীদের মতামত
          </h1>
          <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full">
              <div className="flex text-gold mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 flex-grow italic mb-6">
                &quot;{t.review}&quot;
              </p>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                <p className="text-sm text-slate-500">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
