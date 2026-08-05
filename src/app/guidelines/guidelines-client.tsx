"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ClipboardList, CheckCircle2 } from "lucide-react";

export function GuidelinesClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

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
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-900/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-400/10 dark:bg-emerald-800/20 rounded-full blur-[120px] translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="icon-container-premium mb-6 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] text-emerald-600 dark:text-emerald-400">
            <ClipboardList className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-light-heading dark:text-white tracking-tight leading-tight mb-6">
            রোগীদের প্রতি <span className="text-emerald-600 dark:text-emerald-400">নির্দেশনা</span>
          </h1>
          <p className="text-lg md:text-2xl text-light-text dark:text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
            রুকইয়াহ চিকিৎসার পূর্বে ও পরে রোগীদের পালনীয় নিয়মাবলি। এই নিয়মগুলো সঠিকভাবে পালন করলে ইনশাআল্লাহ দ্রুত সুস্থতা লাভ করা সম্ভব।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Before Treatment */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card p-6 md:p-10 rounded-2xl md:rounded-[32px] relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <h2 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-white mb-6 md:mb-8 relative z-10 flex items-center gap-3">
              <span className="w-2 h-6 md:h-8 rounded-full bg-emerald-500 block" />
              চিকিৎসার পূর্বে করণীয়
            </h2>
            
            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6 relative z-10"
            >
              {[
                "পাঁচ ওয়াক্ত নামাজ পড়া বাধ্যতামূলক।",
                "সকল প্রকার গান-বাজনা শোনা থেকে সম্পূর্ণ বিরত থাকা।",
                "তাবিজ-কবজ থাকলে তা খুলে পুড়িয়ে ফেলা বা নষ্ট করা।",
                "শিরক ও বিদআতমুক্ত আকিদা রাখা এবং আল্লাহর কাছে সাহায্য চাওয়া।",
                "বাড়িতে কোনো প্রাণীর ছবি বা মূর্তি থাকলে তা সরিয়ে ফেলা।"
              ].map((text, i) => (
                <motion.li key={i} variants={itemVariants} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-light-text dark:text-slate-300 font-medium text-base md:text-lg leading-relaxed pt-1">
                    {text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* During/After Treatment */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card p-6 md:p-10 rounded-2xl md:rounded-[32px] relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <h2 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-white mb-6 md:mb-8 relative z-10 flex items-center gap-3">
              <span className="w-2 h-6 md:h-8 rounded-full bg-blue-500 block" />
              চিকিৎসা চলাকালীন নিয়ম
            </h2>
            
            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6 relative z-10"
            >
              {[
                "রাকির দেওয়া আমলগুলো ও রুটিন নিয়মমতো পালন করা।",
                "সকাল-সন্ধ্যার মাসনুন দোয়াসমূহ (হিসনুল মুসলিম) পড়া।",
                "ধৈর্য ধারণ করা এবং আল্লাহর ওপর পূর্ণ তাওয়াক্কুল (ভরসা) রাখা।",
                "ঘুমানোর আগে অযু করা এবং সুন্নাহ মেনে ডান কাতে ঘুমানো।",
                "অসুস্থতার জন্য কাউকে দোষারোপ না করা বা সন্দেহ না করা।"
              ].map((text, i) => (
                <motion.li key={i} variants={itemVariants} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-light-text dark:text-slate-300 font-medium text-base md:text-lg leading-relaxed pt-1">
                    {text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
