"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function PrivacyClient() {
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
            <Shield className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-light-heading dark:text-white tracking-tight mb-6">
            প্রাইভেসি <span className="text-emerald-600 dark:text-emerald-400">পলিসি</span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-[32px] md:rounded-[40px] p-8 md:p-16 border border-light-border dark:border-slate-800 shadow-xl"
        >
          <div className="prose prose-lg md:prose-xl dark:prose-invert prose-emerald max-w-none prose-headings:font-bold">
            <p className="text-xl md:text-2xl text-light-text dark:text-slate-300 leading-relaxed font-medium mb-10 italic border-l-4 border-emerald-500 pl-6">
              শিফা আল কুরআন - এ আপনাদের গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা কীভাবে আপনাদের তথ্য সংগ্রহ করি এবং ব্যবহার করি তা এই পলিসিতে উল্লেখ করা হলো।
            </p>
            
            <h2 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-white mt-10 mb-4 flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-emerald-500 block" />
              তথ্য সংগ্রহ
            </h2>
            <p className="text-light-text dark:text-slate-300 leading-relaxed">
              অ্যাপয়েন্টমেন্ট বুকিং বা যোগাযোগের সময় আমরা আপনার নাম, ফোন নম্বর এবং সমস্যার সাধারণ বিবরণ সংগ্রহ করতে পারি। এই তথ্যগুলো শুধুমাত্র আপনার সাথে যোগাযোগ এবং চিকিৎসার সুবিধার্থে ব্যবহার করা হয়।
            </p>

            <h2 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-white mt-10 mb-4 flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-emerald-500 block" />
              তথ্য সুরক্ষা
            </h2>
            <p className="text-light-text dark:text-slate-300 leading-relaxed">
              আমরা আপনাদের ব্যক্তিগত তথ্য সম্পূর্ণ গোপন রাখি। রোগীর কোনো ব্যক্তিগত তথ্য বা রোগের বিবরণ তৃতীয় কোনো পক্ষের সাথে শেয়ার করা হয় না।
            </p>

            <h2 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-white mt-10 mb-4 flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-emerald-500 block" />
              যোগাযোগ
            </h2>
            <p className="text-light-text dark:text-slate-300 leading-relaxed">
              আমাদের প্রাইভেসি পলিসি সম্পর্কে কোনো প্রশ্ন থাকলে <a href="mailto:shifaalquran11@gmail.com" className="text-emerald-600 dark:text-emerald-400 no-underline hover:underline font-bold">shifaalquran11@gmail.com</a> ঠিকানায় যোগাযোগ করতে পারেন।
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
