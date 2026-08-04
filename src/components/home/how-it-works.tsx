"use client";

import * as React from "react";
import { ClipboardList, PhoneCall, HeartHandshake } from "lucide-react";
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
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-light-heading dark:text-white mb-4 md:mb-6 tracking-tight">
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
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-800/60 to-transparent" />
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10"
          >
            {steps.map((step, index) => (
              <motion.div variants={fadeUp} key={index} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-light-bg-main dark:bg-[#020817] border-[4px] border-emerald-50 dark:border-slate-800 shadow-premium-soft flex items-center justify-center mb-6 relative group-hover:border-emerald-100 dark:group-hover:border-slate-700 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-full bg-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  <step.icon className="h-8 w-8 md:h-10 md:w-10 text-emerald-600 dark:text-emerald-500 relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-md">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-[19px] md:text-xl font-bold text-light-heading dark:text-slate-100 mb-2 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-light-text dark:text-slate-400 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
