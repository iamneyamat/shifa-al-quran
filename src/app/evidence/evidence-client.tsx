"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2 } from "lucide-react";

export function EvidenceClient() {
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 dark:bg-emerald-800/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
            <BookOpen className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-light-heading dark:text-white tracking-tight mb-6">
            কুরআন ও সুন্নাহর <span className="text-emerald-600 dark:text-emerald-400">প্রমাণ</span>
          </h1>
          <p className="text-lg md:text-xl text-light-text dark:text-slate-300 leading-relaxed font-medium">
            রুকইয়াহ শারইয়াহ কোনো নতুন বা মনগড়া চিকিৎসা নয়, বরং এটি স্বয়ং আল্লাহ এবং তাঁর রাসূল (সা.) থেকে প্রমাণিত।
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {/* Quranic Evidence */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-[32px] md:rounded-[40px] p-8 md:p-12 border border-light-border dark:border-slate-800 shadow-sm"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-white mb-8 flex items-center gap-4">
              <span className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 h-12 w-12 rounded-full flex items-center justify-center text-xl shadow-sm">১</span>
              পবিত্র কুরআন থেকে প্রমাণ
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 md:p-8 bg-light-bg-main/50 dark:bg-slate-800/50 rounded-3xl border border-light-border dark:border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                <p className="text-2xl md:text-3xl font-arabic text-right mb-6 text-light-heading dark:text-slate-200 leading-relaxed" dir="rtl">
                  وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ
                </p>
                <p className="text-light-text dark:text-slate-300 font-medium text-lg mb-2">
                  অর্থ: &quot;আমি কুরআনে এমন বিষয় নাযিল করি যা মুমিনদের জন্য আরোগ্য ও রহমত।&quot;
                </p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">— (সূরা বনী ইসরাঈল: ৮২)</p>
              </div>

              <div className="p-6 md:p-8 bg-light-bg-main/50 dark:bg-slate-800/50 rounded-3xl border border-light-border dark:border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                <p className="text-2xl md:text-3xl font-arabic text-right mb-6 text-light-heading dark:text-slate-200 leading-relaxed" dir="rtl">
                  قُلْ هُوَ لِلَّذِينَ آمَنُوا هُدًى وَشِفَاءٌ
                </p>
                <p className="text-light-text dark:text-slate-300 font-medium text-lg mb-2">
                  অর্থ: &quot;বলুন, এটি (কুরআন) মুমিনদের জন্য হেদায়েত ও আরোগ্য।&quot;
                </p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">— (সূরা হা-মীম সিজদাহ: ৪৪)</p>
              </div>
            </div>
          </motion.div>

          {/* Hadith Evidence */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-[32px] md:rounded-[40px] p-8 md:p-12 border border-light-border dark:border-slate-800 shadow-sm"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-white mb-8 flex items-center gap-4">
              <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 h-12 w-12 rounded-full flex items-center justify-center text-xl shadow-sm">২</span>
              হাদিস থেকে প্রমাণ
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 md:p-8 bg-light-bg-main/50 dark:bg-slate-800/50 rounded-3xl border border-light-border dark:border-slate-700/50 hover:border-blue-500/30 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-light-text dark:text-slate-300 mb-4 text-lg leading-relaxed font-medium">
                    আয়েশা (রা.) থেকে বর্ণিত, রাসূলুল্লাহ (সা.) যখন অসুস্থ হতেন, তখন তিনি সূরা ফালাক ও সূরা নাস পড়ে নিজের ওপর ফুঁ দিতেন।
                  </p>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">— (সহিহ বুখারি: ৫০১৬)</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 md:p-8 bg-light-bg-main/50 dark:bg-slate-800/50 rounded-3xl border border-light-border dark:border-slate-700/50 hover:border-blue-500/30 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-light-text dark:text-slate-300 mb-4 text-lg leading-relaxed font-medium">
                    আবু সাঈদ খুদরি (রা.) থেকে বর্ণিত, একদল সাহাবী এক গোত্রপতির সাপে কাটার চিকিৎসা করেছিলেন সূরা ফাতিহা পড়ে ফুঁ দেওয়ার মাধ্যমে এবং সে ব্যক্তি সম্পূর্ণ সুস্থ হয়ে যায়। রাসূল (সা.) পরবর্তীতে এই কাজটিকে সমর্থন করেছিলেন।
                  </p>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">— (সহিহ বুখারি: ২২৭৬)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
