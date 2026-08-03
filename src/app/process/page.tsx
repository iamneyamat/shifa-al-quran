import type { Metadata } from "next";
import { HowItWorksSection } from "@/components/home/how-it-works";

export const metadata: Metadata = {
  title: "চিকিৎসা পদ্ধতি",
  description: "শিফা আল কুরআন এর চিকিৎসা পদ্ধতি সম্পর্কে বিস্তারিত জানুন।",
};

export default function ProcessPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 pt-10">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            আমাদের চিকিৎসা পদ্ধতি
          </h1>
          <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full mb-8"></div>
        </div>
      </div>
      
      <HowItWorksSection />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mt-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">চিকিৎসার পূর্বে কিছু গুরুত্বপূর্ণ নিয়মাবলি:</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-0.5">১</span>
              <p className="text-slate-700 dark:text-slate-300">পাঁচ ওয়াক্ত নামাজ সঠিকভাবে আদায় করতে হবে।</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-0.5">২</span>
              <p className="text-slate-700 dark:text-slate-300">সকাল ও সন্ধ্যার সুন্নাহসম্মত যিকিরগুলো নিয়মিত করতে হবে।</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-0.5">৩</span>
              <p className="text-slate-700 dark:text-slate-300">সকল প্রকার শিরক, বিদআত এবং কবিরা গুনাহ থেকে নিজেকে মুক্ত রাখার চেষ্টা করতে হবে।</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-0.5">৪</span>
              <p className="text-slate-700 dark:text-slate-300">সম্পূর্ণ একিন ও বিশ্বাসের সাথে আল্লাহর কাছে সুস্থতা কামনা করতে হবে।</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
