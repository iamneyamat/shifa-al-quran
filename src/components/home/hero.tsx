"use client";

import * as React from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Video,
  MessageCircle,
  CalendarHeart
} from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
  })
};

const infoData = [
  {
    icon: Phone,
    title: "হটলাইন নাম্বার",
    details: "09639-000999"
  },
  {
    icon: MessageCircle,
    title: "হোয়াটসঅ্যাপ",
    details: "+88 01840601484"
  },
  {
    icon: Clock,
    title: "অ্যাপয়েন্টমেন্ট সময়",
    details: "সকাল ১০টা - রাত ৮টা"
  },
  {
    icon: MapPin,
    title: "অফিসের ঠিকানা",
    details: "#535/C Khilgaon, Dhaka"
  },
  {
    icon: Video,
    title: "পরামর্শ",
    details: "অনলাইন ও অফলাইন"
  }
];

export function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center">
      
      {/* Hero Top Section with Background */}
      <div className="relative w-full overflow-hidden bg-light-bg-main dark:bg-[#020817] pt-20 pb-36 lg:pt-36 lg:pb-48 flex flex-col items-center justify-center">
        
        {/* 1. Subtle Animated Blue-Gold Gradient Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] right-[10%] h-[350px] w-[350px] rounded-full bg-blue-400/20 dark:bg-blue-600/15 blur-[100px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[10%] left-[10%] h-[400px] w-[400px] rounded-full bg-amber-300/20 dark:bg-amber-500/10 blur-[100px]"
          />
        </div>

        {/* 2. Low-opacity Islamic geometric pattern (2%) */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.03] dark:invert pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center flex flex-col items-center">
            
            {/* Main Quranic Verse Container */}
            <motion.div 
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="mb-8 flex flex-col items-center gap-4 relative w-full"
            >
              {/* Soft glow behind the Arabic verse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-blue-300/20 dark:bg-amber-400/10 blur-[60px] rounded-full -z-10 pointer-events-none" />
              
              <h1 
                dir="rtl" 
                lang="ar" 
                className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold leading-tight tracking-normal text-light-heading dark:text-slate-100 drop-shadow-md font-arabic px-2"
              >
                وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ
              </h1>
              
              <div className="flex flex-col items-center gap-3 mt-2">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-light-text dark:text-slate-300 max-w-3xl leading-relaxed drop-shadow-sm text-center px-4">
                  আমি <span className="text-blue-700 dark:text-blue-400 font-extrabold">কুরআনে</span> এমন বিষয় নাযিল করি যা মুমিনদের জন্য <span className="text-amber-600 dark:text-amber-400 font-extrabold">আরোগ্য (শিফা)</span> ও <span className="text-amber-600 dark:text-amber-400 font-extrabold">রহমত</span>
                </h2>
                
                {/* Compact Pill Badge for Surah */}
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-light-bg-alt2/80 dark:bg-slate-800/80 border border-light-border/50 dark:border-slate-700/50 shadow-sm backdrop-blur-sm mt-4">
                  <p className="text-sm font-bold text-light-text dark:text-slate-400">
                    — সূরা আল-ইসরা : ৮২
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.p 
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="mx-auto max-w-3xl text-base md:text-lg text-light-text dark:text-slate-400 leading-relaxed mt-6 mb-10 font-medium px-4"
            >
              শিফা আল কুরআন - এ আমরা সুন্নাহ সম্মত উপায়ে রুকইয়াহ শারইয়াহ এর মাধ্যমে জাদুটোনা, বদনজর, জিনগত সমস্যা এবং বিভিন্ন শারীরিক ও মানসিক সমস্যার চিকিৎসা প্রদান করে থাকি।
            </motion.p>
            
            <motion.div 
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none px-4"
            >
              <Link href="/appointment" className="btn-premium flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 text-[15px] font-bold text-emerald-700 bg-white hover:bg-emerald-50 transition-colors">
                <CalendarHeart className="h-5 w-5" />
                <span>অ্যাপয়েন্টমেন্ট নিন</span>
              </Link>
              <Link href="/services" className="glass-card flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 text-[15px] font-bold text-light-heading dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <span>আমাদের সেবাসমূহ</span>
              </Link>
            </motion.div>
            
          </div>
        </div>
      </div>

      {/* 3. Floating Information Card */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 -mt-24 lg:-mt-28 mb-16">
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="glass-card rounded-3xl md:rounded-[32px] p-4 sm:p-8 lg:p-10 max-w-6xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/40 dark:border-slate-700/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-8 md:gap-x-0 md:gap-y-0 divide-y-0 md:divide-x divide-light-border/50 dark:divide-slate-800/60">
            {infoData.map((info, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex flex-col items-center justify-start text-center group px-2 lg:px-4",
                  idx === 4 ? "col-span-2 md:col-span-1" : ""
                )}
              >
                <div className="icon-container-premium mb-5 inline-flex items-center justify-center rounded-2xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:brightness-110 transition-all duration-300 w-14 h-14 shadow-sm">
                  <info.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[13px] font-bold text-light-text dark:text-slate-400 uppercase tracking-widest mb-2">
                  {info.title}
                </h3>
                <p className="text-[15px] font-extrabold text-light-heading dark:text-slate-100 leading-snug">
                  {info.details}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
