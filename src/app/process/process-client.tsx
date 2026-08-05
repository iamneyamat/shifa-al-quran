"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle2 } from "lucide-react";
import { HowItWorksSection } from "@/components/home/how-it-works";

export function ProcessClient() {
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

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 md:pt-32 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
            <Activity className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-light-heading dark:text-white tracking-tight mb-6">
            আমাদের চিকিৎসা <span className="text-emerald-600 dark:text-emerald-400">পদ্ধতি</span>
          </h1>
          <p className="text-lg md:text-xl text-light-text dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium">
            সম্পূর্ণ সুন্নাহ সম্মত উপায়ে কীভাবে আমরা চিকিৎসা প্রদান করে থাকি, তা নিচে ধাপে ধাপে বর্ণনা করা হলো।
          </p>
        </motion.div>
      </div>
      
      {/* Re-use the home page component, ensuring it renders above the pattern */}
      <div className="relative z-10 -mt-10 md:-mt-16">
        <HowItWorksSection />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-32 -mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-6 md:p-12 rounded-2xl md:rounded-[32px] shadow-sm border border-light-border dark:border-slate-800 relative overflow-hidden group hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <h2 className="text-xl md:text-3xl font-extrabold text-light-heading dark:text-white mb-6 md:mb-8 relative z-10 flex items-center gap-3">
            <span className="w-2 h-6 md:h-8 rounded-full bg-emerald-500 block" />
            চিকিৎসার পূর্বে কিছু গুরুত্বপূর্ণ নিয়মাবলি
          </h2>
          
          <ul className="space-y-4 md:space-y-6 relative z-10">
            {[
              "পাঁচ ওয়াক্ত নামাজ সঠিকভাবে আদায় করতে হবে।",
              "সকাল ও সন্ধ্যার সুন্নাহসম্মত যিকিরগুলো নিয়মিত করতে হবে।",
              "সকল প্রকার শিরক, বিদআত এবং কবিরা গুনাহ থেকে নিজেকে মুক্ত রাখার চেষ্টা করতে হবে।",
              "সম্পূর্ণ একিন ও বিশ্বাসের সাথে আল্লাহর কাছে সুস্থতা কামনা করতে হবে।"
            ].map((text, i) => (
              <motion.li key={i} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center mt-0.5 border border-emerald-100 dark:border-emerald-800/50">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{i + 1}</span>
                </div>
                <span className="text-light-text dark:text-slate-300 font-medium text-[17px] leading-relaxed pt-1">
                  {text}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
