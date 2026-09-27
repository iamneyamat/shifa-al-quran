"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { 
  Stethoscope, 
  Eye, 
  Baby, 
  Wand2, 
  Ghost, 
  BrainCircuit, 
  FileX2, 
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Activity,
  Sparkles
} from "lucide-react";
import { diagnosisCategories } from "../data/diagnosisData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  Eye,
  Baby,
  Wand2,
  Ghost,
  BrainCircuit,
  FileX2,
  MessageSquare,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function DiagnosisPortal() {
  return (
    <div className="relative min-h-screen pt-8 pb-20 lg:pt-12 lg:pb-32 overflow-hidden font-sans">
      {/* Dynamic Ambient Liquid Mesh Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-amber-500/10 blur-[140px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="shell relative z-10">
        
        {/* Header Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="glass-panel relative rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-white/50 dark:border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden mb-12"
        >
          {/* Subtle Top Specular Glass Edge Highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
          
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/15 px-4 py-1.5 backdrop-blur-xl mb-6 shadow-sm">
              <Activity className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span className="type-citation text-xs font-semibold text-emerald-900 dark:text-emerald-300 tracking-wide">
                আত্মিক স্বাস্থ্য নির্দেশিকা
              </span>
            </div>

            <h1 className="type-display text-ink-strong tracking-tight text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-[1.2]">
              সেলফ রুকইয়াহ <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-200">ডায়াগনোসিস</span> পোর্টাল
            </h1>

            <p className="type-body-lg mt-6 text-ink-body leading-relaxed font-normal">
              কুরআন ও সহীহ সুন্নাহর আলোকে আপনার ও আপনার পরিবারের আত্মিক ও শারীরিক লক্ষণসমূহ যাচাই করুন। কোনো ক্যাটাগরি নির্বাচন করে নিজেই সুন্নাহসম্মত ফলাফল ও আমলের প্রেসক্রিপশন পান।
            </p>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-ink-muted border-t border-hairline/60 pt-6">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>শতভাগ শরীয়াহ সম্মত</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>তাৎক্ষণিক প্রেসক্রিপশন ফলাফল</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 8 Categories Liquid Glass Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {diagnosisCategories.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Stethoscope;
            const targetHref = cat.isInteractiveTest
              ? `/diagnosis/test?category=${cat.id}`
              : cat.customRoute || "/contact";

            return (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col justify-between rounded-3xl glass-card border border-white/40 dark:border-white/10 p-7 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-900/10 overflow-hidden"
              >
                <Link href={targetHref} className="flex flex-col justify-between h-full">
                  {/* Subtle top edge highlight */}
                  <div className="absolute top-0 right-8 h-px w-24 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-interactive transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <span className="inline-block rounded-full border border-gold-ornament/40 bg-gold-soft/40 dark:bg-gold-soft/20 px-3 py-1 text-[11px] font-semibold text-amber-900 dark:text-gold-ink tracking-wide">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="type-title text-lg sm:text-xl font-bold text-ink-strong group-hover:text-interactive transition-colors">
                      {cat.title}
                    </h3>
                    <p className="type-citation text-xs font-medium text-emerald-800 dark:text-emerald-400 mt-1">
                      {cat.subtitle}
                    </p>
                    <p className="type-body-sm mt-3 text-ink-body leading-relaxed text-sm font-normal">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-hairline/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-interactive group-hover:underline">
                      {cat.isInteractiveTest ? "পরীক্ষা শুরু করুন" : "বিস্তারিত দেখুন"}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-interactive transition-transform group-hover:translate-x-1 group-hover:bg-interactive group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
