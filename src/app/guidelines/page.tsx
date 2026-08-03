import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "রোগীদের নির্দেশনা",
  description: "রুকইয়াহ চিকিৎসার পূর্বে ও পরে রোগীদের পালনীয় নিয়মাবলি।",
};

export default function GuidelinesPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            রোগীদের প্রতি নির্দেশনা
          </h1>
          <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">চিকিৎসার পূর্বে করণীয়</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-slate-700 dark:text-slate-300">পাঁচ ওয়াক্ত নামাজ পড়া বাধ্যতামূলক।</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-slate-700 dark:text-slate-300">সকল প্রকার গান-বাজনা শোনা থেকে বিরত থাকা।</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-slate-700 dark:text-slate-300">তাবিজ-কবজ থাকলে তা খুলে পুড়িয়ে ফেলা।</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-slate-700 dark:text-slate-300">শিরক ও বিদআতমুক্ত আকিদা রাখা।</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">চিকিৎসা চলাকালীন নিয়ম</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-slate-700 dark:text-slate-300">রাকির দেওয়া আমলগুলো নিয়মমতো করা।</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-slate-700 dark:text-slate-300">সকাল-সন্ধ্যার মাসনুন দোয়াসমূহ পড়া।</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-slate-700 dark:text-slate-300">ধৈর্য ধারণ করা এবং আল্লাহর ওপর তাওয়াক্কুল রাখা।</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 mt-1">✓</span>
                <span className="text-slate-700 dark:text-slate-300">ঘুমানোর আগে অযু করা এবং সুন্নাহ মেনে ঘুমানো।</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
