"use client";

import * as React from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Users, Headphones, BookOpen, MessageCircle } from "lucide-react";


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
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Immersive Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-800" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-400/20 blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-amber-300 mb-3">
              আমাদের সংক্ষিপ্ত পরিচিতি
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-tight drop-shadow-md">
              আস্থা, অভিজ্ঞতা ও সেবার পরিসংখ্যান
            </h3>
            <p className="text-base md:text-lg text-emerald-50 max-w-2xl mx-auto leading-relaxed opacity-90">
              আল্লাহর রহমতে গত এক বছরে হাজারো মানুষের পাশে থাকার সুযোগ হয়েছে।
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-[32px] p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)] hover:-translate-y-2 hover:bg-white/15 transition-all duration-500 ease-out relative overflow-hidden group"
            >
              {/* Subtle hover glow inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mb-6 md:mb-8 inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] relative z-10 group-hover:scale-110 group-hover:brightness-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-500 ease-out">
                <stat.icon className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.5} />
              </div>
              
              <div className="flex flex-col flex-grow relative z-10">
                {stat.counter ? (
                  <h4 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3 flex items-center drop-shadow-lg tracking-tight">
                    <span className="group-hover:text-amber-200 transition-colors duration-300"><AnimatedCounter value={stat.counter} /></span>
                    <span className="text-amber-300 ml-1 group-hover:scale-110 transition-transform duration-300 inline-block">{stat.suffix}</span>
                  </h4>
                ) : (
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 drop-shadow-md">
                    {stat.title}
                  </h4>
                )}
                
                {stat.counter && (
                  <p className="text-[15px] font-semibold text-amber-300 mb-4 uppercase tracking-wide">
                    {stat.title}
                  </p>
                )}
                
                <p className="text-[15px] md:text-base leading-relaxed text-emerald-50 mt-auto font-medium opacity-90 group-hover:opacity-100 transition-opacity">
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
