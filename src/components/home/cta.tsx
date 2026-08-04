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
    <section className="relative py-24 bg-transparent overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-[#020817] p-[1px] shadow-2xl group"
        >
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-amber-400 to-blue-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-700" />
          
          <div className="relative bg-slate-950/40 backdrop-blur-3xl rounded-[31px] px-6 py-16 md:px-16 md:py-20 flex flex-col items-center text-center overflow-hidden border border-white/10">
            
            {/* Soft background pulses */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-32 -top-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }} 
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -left-32 -bottom-32 w-80 h-80 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none"
            />

            <motion.h2 
              custom={0}
              variants={fadeUpVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-sm relative z-10"
            >
              সুস্থতার জন্য আজই <span className="text-amber-400">যোগাযোগ</span> করুন
            </motion.h2>
            
            <motion.p 
              custom={1}
              variants={fadeUpVariants}
              className="text-blue-100/80 text-[15px] md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed relative z-10"
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
                className="group relative flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 text-[15px] font-bold text-light-heading shadow-[0_8px_20px_rgb(217,119,6,0.3)] transition-all hover:shadow-[0_8px_25px_rgb(217,119,6,0.5)] hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-light-bg-alt2/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <CalendarHeart className="h-5 w-5 relative z-10" />
                <span className="relative z-10">অ্যাপয়েন্টমেন্ট নিন</span>
              </Link>
              
              <a
                href="tel:09639000999"
                className="group relative flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-xl border border-white/20 bg-light-bg-alt2/5 backdrop-blur-sm px-8 text-[15px] font-bold text-white transition-all hover:bg-light-bg-alt2/10 hover:border-white/30 hover:-translate-y-0.5 shadow-sm"
              >
                <PhoneCall className="h-5 w-5 text-amber-400 group-hover:animate-bounce" />
                <span>09639-000999</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
