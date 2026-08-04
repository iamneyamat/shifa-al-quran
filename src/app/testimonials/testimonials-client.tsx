"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star } from "lucide-react";

export function TestimonialsClient() {
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
    <div className="bg-light-bg-main dark:bg-[#020817] min-h-screen relative font-sans overflow-hidden">
      
      {/* Global Page Pattern Overlay */}
      <div 
        className="fixed inset-0 z-[5] opacity-[0.02] dark:opacity-[0.03] dark:invert pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Soft Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-400/10 dark:bg-emerald-900/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
            <MessageSquareQuote className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-light-heading dark:text-white tracking-tight mb-6">
            রোগীদের <span className="text-emerald-600 dark:text-emerald-400">মতামত</span>
          </h1>
          <p className="text-lg md:text-xl text-light-text dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium">
            শিফা আল কুরআন থেকে সেবা নেওয়া মানুষদের কিছু বাস্তব অভিজ্ঞতা।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 md:p-10 rounded-[32px] shadow-sm border border-light-border dark:border-slate-800 flex flex-col h-full group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-light-text dark:text-slate-300 text-lg leading-relaxed flex-grow italic mb-8 relative z-10">
                &quot;{t.review}&quot;
              </p>
              <div className="relative z-10 border-t border-light-border dark:border-slate-800/50 pt-6 mt-auto">
                <p className="font-extrabold text-light-heading dark:text-white text-lg">{t.name}</p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
