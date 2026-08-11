"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, useInView, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  EyeOff, 
  Ghost, 
  Brain, 
  Frown, 
  Users, 
  Activity,
  ArrowRight,
  ShieldAlert,
  CalendarHeart
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Custom Animated Counter ---
function AnimatedCounter({ value, duration = 2, suffix = "" }: { value: number, duration?: number, suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    bounce: 0,
    duration: duration * 1000,
  });

  React.useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  const displayValue = useTransform(springValue, (current) => 
    Math.round(current).toLocaleString("bn-BD") + suffix
  );

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}


// --- Services Data ---
const categories = ["সবগুলো", "জাদুটোনা", "বদনজর", "জ্বিন", "মানসিক সমস্যা", "পারিবারিক"];

const services = [
  {
    id: "jadu",
    category: "জাদুটোনা",
    title: "জাদুটোনা (সিহর)",
    description: "কালো জাদু বা সিহরের কারণে হওয়া শারীরিক ও মানসিক সমস্যার কোরআন সুন্নাহ ভিত্তিক সমাধান। জাদুর প্রভাব নষ্ট করে স্বাভাবিক জীবনে ফিরে আসার জন্য রুকইয়াহ।",
    icon: Ghost,
  },
  {
    id: "nazar",
    category: "বদনজর",
    title: "বদনজর (আইন)",
    description: "বদনজরের কারণে হওয়া হঠাৎ অসুস্থতা, ব্যবসায় ক্ষতি বা পড়াশোনায় অমনোযোগিতার চিকিৎসা। মানুষের কুনজর থেকে বাঁচতে সুন্নাহ সম্মত আমল।",
    icon: EyeOff,
  },
  {
    id: "jinn",
    category: "জ্বিন",
    title: "জ্বিন আছর",
    description: "জিনের উপদ্রব, ভয় পাওয়া, বা অস্বাভাবিক আচরণের জন্য বিশেষ রুকইয়াহ। কোরআন তিলাওয়াতের মাধ্যমে রোগীর উপর থেকে জিনের প্রভাব দূর করা।",
    icon: Users,
  },
  {
    id: "mental",
    category: "মানসিক সমস্যা",
    title: "মানসিক অস্থিরতা",
    description: "অতিরিক্ত দুশ্চিন্তা, হতাশা, ডিপ্রেশন এবং মানসিক অবসাদ দূর করতে রুকইয়াহ। আত্মিক শান্তির জন্য কোরআনিক কাউন্সেলিং।",
    icon: Brain,
  },
  {
    id: "physical",
    category: "সবগুলো", // Uncategorized ones will show under "সবগুলো", but actually "অজানা রোগ" could fit into physical
    title: "অজানা রোগ",
    description: "ডাক্তারি পরীক্ষায় ধরা পড়ে না এমন শারীরিক ব্যথাবেদনা ও অসুস্থতার চিকিৎসা। দীর্ঘমেয়াদি অজানা রোগের কোরআনিক সমাধান।",
    icon: Activity,
  },
  {
    id: "family",
    category: "পারিবারিক",
    title: "পারিবারিক কলহ",
    description: "স্বামী-স্ত্রীর অমিল বা পরিবারে অশান্তি দূর করতে সুন্নাহ সম্মত পরামর্শ ও রুকইয়াহ। বদনজর বা জাদুর কারণে সৃষ্ট পারিবারিক সমস্যার সমাধান।",
    icon: Frown,
  }
];

export function ServicesClient() {
  const [activeCategory, setActiveCategory] = useState("সবগুলো");

  const filteredServices = activeCategory === "সবগুলো" 
    ? services 
    : services.filter(service => service.category === activeCategory || service.title.includes(activeCategory));

  return (
    <div className="min-h-screen bg-light-bg-main dark:bg-[#020817] flex flex-col font-sans relative">
      
      {/* Global Page Pattern Overlay */}
      <div 
        className="fixed inset-0 z-[5] opacity-[0.02] dark:opacity-[0.03] dark:invert pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* 1. Hero Introduction */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-36 lg:pb-32 bg-light-bg-alt1 dark:bg-[#020817]">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 dark:bg-emerald-800/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-900/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-light-heading dark:text-white tracking-tight mb-6 md:mb-8">
              আমাদের <span className="text-emerald-600 dark:text-emerald-400">সেবাসমূহ</span>
            </h1>
            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-8 md:mb-10" />
            
            <p className="text-lg md:text-2xl text-light-text dark:text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
              আমরা সম্পূর্ণ শরীয়াহ সম্মত উপায়ে জাদুটোনা, বদনজর ও জিন ঘটিত বিভিন্ন আধ্যাত্মিক ও শারীরিক সমস্যার রুকইয়াহ করে থাকি। আপনার সমস্যার ধরন অনুযায়ী সঠিক চিকিৎসা বেছে নিন।
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Treatment Statistics */}
      <section className="py-12 md:py-16 bg-emerald-600 dark:bg-emerald-900 border-y border-emerald-700/30 dark:border-emerald-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="container relative mx-auto px-4 sm:px-6 max-w-6xl z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-white">
            {[
              { label: "সমাধানকৃত কেস", value: 20000, suffix: "+" },
              { label: "অভিজ্ঞ রাকি", value: 20, suffix: "+" },
              { label: "পারিবারিক কাউন্সেলিং", value: 5000, suffix: "+" },
              { label: "সন্তুষ্ট রোগী", value: 98, suffix: "%" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <h4 className="text-3xl md:text-5xl font-extrabold mb-2 text-amber-300 drop-shadow-md">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-sm md:text-lg font-medium text-emerald-50 opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Category Filter & Service Cards */}
      <section className="py-16 md:py-24 bg-light-bg-main dark:bg-[#020817]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 shadow-sm",
                  activeCategory === category
                    ? "bg-emerald-600 text-white shadow-emerald-600/30 dark:shadow-emerald-900/50 scale-105"
                    : "bg-light-bg-alt2 dark:bg-slate-900 text-light-text dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-light-border dark:border-slate-800"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Service Cards Grid with AnimatePresence */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={service.id}
                  className="flex flex-col glass-card p-6 md:p-8 rounded-2xl md:rounded-[32px] relative group overflow-hidden"
                >
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                  
                  {/* Icon */}
                  <div className="icon-container-premium mb-4 md:mb-6 inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:brightness-110 transition-all duration-500 z-10 relative">
                    <service.icon className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.5} />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex-grow flex flex-col">
                    <h3 className="text-[17px] md:text-xl font-bold text-light-heading dark:text-slate-100 mb-2 md:mb-3 tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[14px] md:text-base text-light-text dark:text-slate-400 leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    
                    {/* CTA Button */}
                    <div className="mt-8">
                      <Link 
                        href="/appointment"
                        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group/btn"
                      >
                        অ্যাপয়েন্টমেন্ট নিন 
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Empty State fallback (if needed) */}
          {filteredServices.length === 0 && (
            <div className="text-center py-20 text-light-text dark:text-slate-400">
              দুঃখিত, এই ক্যাটাগরিতে কোনো সেবা পাওয়া যায়নি।
            </div>
          )}

        </div>
      </section>

      {/* 4. Disclaimer Section */}
      <section className="py-16 bg-light-bg-alt2 dark:bg-[#020817] border-y border-light-border dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-6 bg-amber-50 dark:bg-amber-950/20 p-8 md:p-10 rounded-[32px] border border-amber-200 dark:border-amber-900/50 shadow-sm"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-500">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-amber-800 dark:text-amber-500 mb-2 tracking-tight">গুরুত্বপূর্ণ সতর্কতা</h4>
              <p className="text-base text-amber-700/80 dark:text-amber-500/80 leading-relaxed">
                আমরা কোনো জাদুকর বা অলৌকিক ক্ষমতার অধিকারী নই। আমরা কেবল কুরআন ও সুন্নাহর আলোকে একটি মাধ্যম হিসেবে কাজ করি। রোগমুক্তি কেবল মহান আল্লাহর ইচ্ছাধীন।
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-light-bg-main dark:bg-[#020817]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-emerald-600 to-blue-700 p-10 md:p-24 text-center shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-tight text-center">
                আপনার সুস্থতার যাত্রা আজই শুরু করুন
              </h2>
              <p className="text-emerald-50 text-base md:text-lg max-w-3xl mx-auto mb-8 md:mb-10 opacity-90 leading-relaxed text-center">
                সঠিক সুন্নাহ ভিত্তিক চিকিৎসার মাধ্যমে নিজে সুস্থ থাকুন এবং পরিবারকে নিরাপদে রাখুন।
              </p>
              
              <Link 
                href="/appointment"
                className="btn-premium inline-flex items-center gap-2 md:gap-3 bg-white text-emerald-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-emerald-50"
              >
                <CalendarHeart className="w-5 h-5 md:w-6 md:h-6" />
                অ্যাপয়েন্টমেন্ট নিন
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
