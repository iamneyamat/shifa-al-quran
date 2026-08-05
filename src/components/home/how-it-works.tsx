"use client";

import * as React from "react";
import { ClipboardList, PhoneCall, HeartHandshake, UserCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function HowItWorksSection() {
  const steps = [
    {
      title: "সমস্যা চিহ্নিতকরণ",
      description: "প্রথমে রোগীর সমস্যাগুলো মনোযোগ দিয়ে শোনা হয় এবং কোরআন সুন্নাহর আলোকে সমস্যার মূল কারণ চিহ্নিত করা হয়।",
      icon: ClipboardList,
    },
    {
      title: "পরামর্শ ও নির্দেশনা",
      description: "সমস্যা অনুযায়ী রোগীকে সঠিক আমল ও রুকইয়াহর গাইডলাইন দেওয়া হয় যা তাকে মেনে চলতে হয়।",
      icon: PhoneCall,
    },
    {
      title: "সরাসরি রুকইয়াহ",
      description: "প্রয়োজন হলে অভিজ্ঞ রাকির মাধ্যমে সরাসরি কোরআন তিলাওয়াত করে রুকইয়াহ করা হয়।",
      icon: HeartHandshake,
    },
    {
      title: "ফলোআপ",
      description: "চিকিৎসা শেষে রোগীর বর্তমান অবস্থা সম্পর্কে খোঁজখবর নেওয়া হয় এবং পরবর্তী করণীয় সম্পর্কে নির্দেশনা দেওয়া হয়।",
      icon: UserCheck,
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-light-bg-alt2 dark:bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-emerald-400/5 dark:bg-emerald-600/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-blue-400/5 dark:bg-blue-600/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-light-heading dark:text-white mb-4 md:mb-6 tracking-tight leading-tight">
              আমাদের চিকিৎসা পদ্ধতি
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-6 md:mb-8" />
            <p className="text-base md:text-lg text-light-text dark:text-slate-400 leading-relaxed">
              আমাদের চিকিৎসা পদ্ধতি অত্যন্ত সহজ এবং সম্পূর্ণ শরীয়াহ সম্মত। আমরা ধাপে ধাপে রোগীর সুস্থতার জন্য কাজ করি।
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 md:top-14 left-[12%] right-[12%] border-t-2 border-dashed border-emerald-300/50 dark:border-emerald-700/50 z-0" />
          {/* Connecting line for mobile */}
          <div className="md:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-emerald-300/50 dark:border-emerald-700/50 z-0" />
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10"
          >
            {steps.map((step, index) => (
              <motion.div variants={fadeUp} key={index} className="flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500">
                <div className="bg-light-bg-alt2 dark:bg-slate-950 p-2 rounded-full mb-4 relative z-10">
                  <div className="icon-container-premium w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center relative group-hover:scale-105 group-hover:brightness-110 transition-all duration-500 ease-out">
                    <div className="absolute inset-0 rounded-full bg-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                    <step.icon className="h-8 w-8 md:h-10 md:w-10 text-emerald-600 dark:text-emerald-500 relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-md group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <div className="relative z-10 bg-light-bg-alt2 dark:bg-slate-950 py-2 w-full">
                  <h3 className="text-lg md:text-xl font-bold text-light-heading dark:text-slate-100 mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[14px] md:text-base text-light-text dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
