"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarHeart, PhoneCall } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.6, ease: "easeOut" }
  })
};

export function CTASection() {
  return (
    <section className="relative py-16 md:py-24 bg-transparent overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto relative rounded-[40px] overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-800 p-10 md:p-20 text-center shadow-[0_20px_50px_rgba(4,120,87,0.3)] dark:shadow-[0_20px_50px_rgba(4,120,87,0.15)] group border border-emerald-500/30"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] rounded-[40px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Soft background pulses */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-32 -top-32 w-96 h-96 bg-emerald-400/40 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }} 
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -left-32 -bottom-32 w-80 h-80 bg-blue-400/40 rounded-full blur-[100px] pointer-events-none"
            />

            <motion.h2 
              custom={0}
              variants={fadeUpVariants}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 md:mb-8 tracking-tight leading-tight drop-shadow-lg relative z-10 text-center"
            >
              সুস্থতার জন্য আজই <span className="text-amber-300">যোগাযোগ</span> করুন
            </motion.h2>
            
            <motion.p 
              custom={1}
              variants={fadeUpVariants}
              className="text-emerald-50/90 text-lg md:text-xl font-medium mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed relative z-10 text-center"
            >
              শারীরিক কিংবা মানসিক যেকোনো সমস্যায় কোরআন ও সুন্নাহ ভিত্তিক চিকিৎসার জন্য আমাদের সাথে পরামর্শ করুন। আমরা আপনার গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ।
            </motion.p>

            <motion.div 
              custom={2}
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative z-10"
            >
              <Link
                href="/appointment"
                className="btn-premium group relative flex px-8 py-4 md:px-10 md:py-5 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white text-lg font-bold text-emerald-700 hover:bg-emerald-50 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                <CalendarHeart className="h-5 w-5 md:h-6 md:w-6" />
                <span>অ্যাপয়েন্টমেন্ট নিন</span>
              </Link>
              
              <a
                href="tel:09639000999"
                className="btn-premium group relative flex px-8 py-4 md:px-10 md:py-5 w-full sm:w-auto items-center justify-center gap-3 rounded-full border-2 border-white/40 bg-black/20 backdrop-blur-md text-lg font-bold text-white hover:bg-black/30 hover:border-white/60"
              >
                <PhoneCall className="h-5 w-5 md:h-6 md:w-6 text-amber-300 group-hover:animate-bounce" />
                <span>09639-000999</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
