"use client";

import * as React from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Video,
  MessageCircle
} from "lucide-react";
import { motion, Variants } from "framer-motion";

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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold leading-tight tracking-normal text-light-heading dark:text-slate-100 drop-shadow-md font-arabic"
              >
                وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ
              </h1>
              
              <div className="flex flex-col items-center gap-3 mt-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-light-text dark:text-slate-300 max-w-3xl leading-relaxed drop-shadow-sm text-center">
                  আমি <span className="text-blue-700 dark:text-blue-400 font-extrabold">কুরআনে</span> এমন বিষয় নাযিল করি যা মুমিনদের জন্য <span className="text-amber-600 dark:text-amber-400 font-extrabold">আরোগ্য (শিফা)</span> ও <span className="text-amber-600 dark:text-amber-400 font-extrabold">রহমত</span>
                </h2>
                
                {/* Compact Pill Badge for Surah */}
                <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-light-bg-alt2/80 dark:bg-slate-800/80 border border-light-border/50 dark:border-slate-700/50 shadow-sm backdrop-blur-sm mt-2">
                  <p className="text-xs md:text-sm font-semibold text-light-text dark:text-slate-400">
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
              className="mx-auto max-w-2xl text-[15px] md:text-base text-light-text dark:text-slate-400 leading-relaxed"
            >
              শিফা আল কুরআন - এ আমরা সুন্নাহ সম্মত উপায়ে রুকইয়াহ শারইয়াহ এর মাধ্যমে জাদুটোনা, বদনজর, জিনগত সমস্যা এবং বিভিন্ন শারীরিক ও মানসিক সমস্যার চিকিৎসা প্রদান করে থাকি।
            </motion.p>
            
          </div>
        </div>
      </div>

      {/* 3. Floating Information Card */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 -mt-24 lg:-mt-32 mb-16">
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-light-border/60 dark:border-slate-700/60 rounded-[32px] shadow-premium-soft dark:shadow-none p-6 sm:p-8 lg:p-10 max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row w-full divide-y md:divide-y-0 md:divide-x divide-light-border/50 dark:divide-slate-800">
            {infoData.map((info, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center justify-center text-center group flex-1 px-2 lg:px-4 py-6 md:py-0 ${
                  idx === 0 ? 'pt-0 md:pt-0' : ''
                } ${
                  idx === infoData.length - 1 ? 'pb-0 md:pb-0' : ''
                }`}
              >
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-amber-500 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-all duration-300">
                  <info.icon className="h-5 w-5" />
                </div>
                <h3 className="text-[13px] font-bold text-light-text dark:text-slate-400 uppercase tracking-wider mb-1">
                  {info.title}
                </h3>
                <p className="text-[15px] font-semibold text-light-heading dark:text-slate-100">
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
