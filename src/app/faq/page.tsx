"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "রুকইয়াহ কী?",
    answer: "রুকইয়াহ হলো কোরআনের আয়াত, আল্লাহর সুন্দর নামসমূহ এবং রাসূল (সা.) থেকে বর্ণিত দোয়াসমূহের মাধ্যমে চিকিৎসা করা। এটি সম্পূর্ণ শরীয়াহ সম্মত এবং নিরাপদ।",
  },
  {
    question: "রুকইয়াহ করার জন্য কি বিশেষ কোনো প্রস্তুতির প্রয়োজন আছে?",
    answer: "হ্যাঁ, রুকইয়াহ করার আগে কিছু প্রস্তুতি নেওয়া জরুরি। যেমন- সঠিক নিয়ত করা, হালাল খাবার খাওয়া, পাঁচ ওয়াক্ত নামাজ পড়া এবং গুনাহ থেকে বেঁচে থাকা।",
  },
  {
    question: "জাদুটোনা বা জিন আসরের চিকিৎসা কতদিন লাগতে পারে?",
    answer: "এটি সম্পূর্ণ রোগীর সমস্যার ধরন এবং আল্লাহর ইচ্ছার উপর নির্ভর করে। তবে নিয়মিত রুকইয়াহ এবং আমল করলে ইনশাআল্লাহ দ্রুত সুস্থতা লাভ করা সম্ভব।",
  },
  {
    question: "আপনাদের চিকিৎসা ফি কত?",
    answer: "আমাদের নির্দিষ্ট কোনো ফি নেই (বা ফি সম্পর্কে বিস্তারিত জানতে আমাদের সাথে সরাসরি যোগাযোগ করুন)। আমরা সাধ্যমত সেবা দেওয়ার চেষ্টা করি।",
  },
  {
    question: "মহিলাদের রুকইয়াহ করার ব্যবস্থা আছে কি?",
    answer: "হ্যাঁ, মহিলাদের রুকইয়াহ করার সময় অবশ্যই তাদের সাথে একজন মাহরাম (যেমন- স্বামী, বাবা, ভাই বা ছেলে) থাকা বাধ্যতামূলক। পর্দা রক্ষা করে চিকিৎসা দেওয়া হয়।",
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            সাধারণ জিজ্ঞাসা (FAQ)
          </h1>
          <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 dark:text-slate-300">
            রুকইয়াহ সম্পর্কে আপনাদের মনে থাকা সাধারণ প্রশ্নগুলোর উত্তর নিচে দেওয়া হলো।
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full p-5 text-left focus:outline-none"
              >
                <span className="font-semibold text-slate-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-emerald-600 dark:text-emerald-400 transition-transform duration-300 flex-shrink-0",
                    openIndex === index ? "rotate-180" : ""
                  )} 
                />
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="p-5 pt-0 text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
