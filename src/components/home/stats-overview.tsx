"use client";

import * as React from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Users, Headphones, BookOpen, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// A custom component for animated numbers
function AnimatedCounter({ value, duration = 2 }: { value: number, duration?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
    Math.round(current).toLocaleString("bn-BD")
  );

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

const statsData = [
  {
    id: 1,
    icon: Users,
    counter: 30000,
    suffix: "+",
    title: "গত এক বছরে সেবা গ্রহণকারী",
    description: "গত এক বছরে অনলাইন ও অফলাইন মিলিয়ে প্রায় ৩০,০০০+ মানুষ আমাদের সেবা গ্রহণ করেছেন।"
  },
  {
    id: 2,
    icon: Headphones,
    title: "রুকইয়াহ অডিও",
    description: "কুরআন ও সুন্নাহভিত্তিক রুকইয়াহ অডিও লাইব্রেরি"
  },
  {
    id: 3,
    icon: BookOpen,
    title: "ইসলামিক আর্টিকেল",
    description: "শিক্ষামূলক ইসলামিক প্রবন্ধ ও নির্দেশনা"
  },
  {
    id: 4,
    icon: MessageCircle,
    title: "অনলাইন পরামর্শ",
    description: "সহজে অনলাইন ও অফলাইনে যোগাযোগ এবং অ্যাপয়েন্টমেন্ট"
  }
];

export function StatsOverview() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-[#020817] py-20 lg:py-28">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-blue-300/10 dark:bg-blue-800/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-amber-600 dark:text-amber-500 mb-3">
              আমাদের সংক্ষিপ্ত পরিচিতি
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
              আস্থা, অভিজ্ঞতা ও সেবার পরিসংখ্যান
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              আল্লাহর রহমতে গত এক বছরে হাজারো মানুষের পাশে থাকার সুযোগ হয়েছে।
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="flex flex-col h-full bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 rounded-[18px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.08)] dark:hover:shadow-[0_20px_40px_rgb(37,99,235,0.15)] transition-shadow duration-300 relative overflow-hidden group"
            >
              {/* Subtle hover glow inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-amber-50 dark:from-blue-900/20 dark:to-amber-900/20 border border-blue-100 dark:border-blue-800/30 text-blue-700 dark:text-amber-400 shadow-sm relative z-10">
                <stat.icon className="h-7 w-7" />
              </div>
              
              <div className="flex flex-col flex-grow relative z-10">
                {stat.counter ? (
                  <h4 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2 flex items-center">
                    <AnimatedCounter value={stat.counter} />
                    <span className="text-amber-500 dark:text-amber-400 ml-1">{stat.suffix}</span>
                  </h4>
                ) : (
                  <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {stat.title}
                  </h4>
                )}
                
                {stat.counter && (
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-4">
                    {stat.title}
                  </p>
                )}
                
                <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 mt-auto">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
