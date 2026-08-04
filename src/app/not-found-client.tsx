"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export function NotFoundClient() {
  return (
    <div className="bg-light-bg-main dark:bg-[#020817] min-h-screen relative font-sans overflow-hidden flex items-center justify-center">
      
      {/* Global Page Pattern Overlay */}
      <div 
        className="fixed inset-0 z-[5] opacity-[0.02] dark:opacity-[0.03] dark:invert pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Soft Background Gradients */}
      <div className="absolute top-1/2 right-1/2 w-[500px] h-[500px] bg-red-400/10 dark:bg-red-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center max-w-2xl py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-[40px] p-10 md:p-16 border border-light-border dark:border-slate-800 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-[2rem] bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 border border-red-100 dark:border-red-800/50 shadow-sm">
            <SearchX className="h-12 w-12" />
          </div>
          
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-800 mb-6 drop-shadow-sm">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-white mb-4">
            পৃষ্ঠাটি পাওয়া যায়নি
          </h2>
          <p className="text-light-text dark:text-slate-400 mb-10 text-lg leading-relaxed">
            আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা লিংকটি ভুল। দয়া করে সঠিক লিংক ব্যবহার করুন অথবা হোম পেজে ফিরে যান।
          </p>
          
          <Link 
            href="/" 
            className="group relative inline-flex h-16 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 overflow-hidden"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>হোম পেজে ফিরে যান</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
