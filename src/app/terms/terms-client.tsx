"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export function TermsClient() {
  return (
    <div className="bg-light-bg-main dark:bg-[#020817] min-h-screen relative font-sans overflow-hidden">
      
      {/* Global Page Pattern Overlay */}
      <div 
        className="fixed inset-0 z-[5] opacity-[0.02] dark:opacity-[0.03] dark:invert pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Soft Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-800/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
            <FileText className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-light-heading dark:text-white tracking-tight mb-6">
            <span className="text-emerald-600 dark:text-emerald-400">শর্তাবলি</span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-[32px] md:rounded-[40px] p-8 md:p-16 border border-light-border dark:border-slate-800 shadow-xl"
        >
          <div className="prose prose-lg md:prose-xl dark:prose-invert prose-emerald max-w-none prose-headings:font-bold prose-li:text-light-text dark:prose-li:text-slate-300">
            <p className="text-xl md:text-2xl text-light-text dark:text-slate-300 leading-relaxed font-medium mb-10 italic border-l-4 border-emerald-500 pl-6">
              শিফা আল কুরআন - এর ওয়েবসাইট এবং সেবা ব্যবহারের আগে অনুগ্রহ করে নিচের শর্তাবলি পড়ে নিন।
            </p>
            
            <h2 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-white mt-10 mb-6 flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-emerald-500 block" />
              সাধারণ শর্তাবলি
            </h2>
            <ul className="space-y-3 marker:text-emerald-500">
              <li>আমরা শুধুমাত্র কুরআন ও সুন্নাহ ভিত্তিক শরীয়াহ সম্মত রুকইয়াহ করে থাকি।</li>
              <li>চিকিৎসার ফলাফল সম্পূর্ণ আল্লাহর ওপর নির্ভরশীল। আমরা কোনো গ্যারান্টি প্রদান করি না।</li>
              <li>রোগীকে অবশ্যই ইসলামী শরীয়তের বিধান (নামাজ, পর্দা ইত্যাদি) মেনে চলতে হবে।</li>
              <li>মহিলা রোগীদের রুকইয়াহ করার সময় অবশ্যই মাহরাম সাথে থাকতে হবে।</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-white mt-12 mb-6 flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-emerald-500 block" />
              অ্যাপয়েন্টমেন্ট
            </h2>
            <p className="text-light-text dark:text-slate-300 leading-relaxed">
              অ্যাপয়েন্টমেন্ট বাতিল বা পরিবর্তন করতে চাইলে অনুগ্রহ করে কমপক্ষে ২৪ ঘণ্টা আগে আমাদের অবহিত করুন। সিরিয়াল অনুযায়ী চিকিৎসা প্রদান করা হয়।
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
