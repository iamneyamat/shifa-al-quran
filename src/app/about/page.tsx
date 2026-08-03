import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে",
  description: "শিফা আল কুরআন সম্পর্কে বিস্তারিত জানুন।",
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            আমাদের সম্পর্কে
          </h1>
          <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-emerald max-w-none">
          <p className="lead text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed text-center">
            শিফা আল কুরআন হলো এমন একটি নির্ভরযোগ্য প্রতিষ্ঠান, যা কুরআন ও সুন্নাহর আলোকে আধ্যাত্মিক ও শারীরিক অসুস্থতার চিকিৎসা প্রদান করে।
          </p>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12 mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              বর্তমান সমাজে জাদুটোনা, বদনজর এবং জিন ঘটিত সমস্যা ব্যাপকভাবে বৃদ্ধি পেয়েছে। অনেকেই সঠিক চিকিৎসার অভাবে ভুল পথে পা বাড়াচ্ছেন এবং শিরক ও বিদআতে লিপ্ত হচ্ছেন। আমাদের মূল লক্ষ্য হলো মানুষকে শিরক ও বিদআতমুক্ত সঠিক সুন্নাহ ভিত্তিক চিকিৎসা প্রদান করা।
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              আমরা বিশ্বাস করি যে, আল্লাহ সুবহানাহু ওয়া তায়ালা কুরআনে মানুষের জন্য শিফা বা আরোগ্য রেখেছেন। আমরা কেবল একটি মাধ্যম হিসেবে কাজ করি, প্রকৃত সুস্থতা দানকারী একমাত্র আল্লাহ।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
              <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-3">কেন আমরা নির্ভরযোগ্য?</h3>
              <ul className="list-disc pl-5 text-emerald-700 dark:text-emerald-400 space-y-2">
                <li>১০০% সুন্নাহ সম্মত চিকিৎসা পদ্ধতি</li>
                <li>দীর্ঘদিনের অভিজ্ঞ ও বিজ্ঞ রাকি</li>
                <li>যেকোনো প্রকার বিদআত ও শিরক মুক্ত</li>
                <li>রোগীদের সর্বোচ্চ গোপনীয়তা রক্ষা</li>
                <li>সুন্নাহসম্মত কাউন্সেলিং প্রদান</li>
              </ul>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">আমাদের অঙ্গীকার</h3>
              <p className="text-slate-600 dark:text-slate-400">
                আমরা কখনোই এমন কোনো কাজ করি না যা ইসলামি শরীয়তের পরিপন্থী। আমরা রোগীদের কোরআন ও হাদিস ভিত্তিক আমল শেখাই এবং তাদের ঈমান ও আকিদা মজবুত করতে সাহায্য করি।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
