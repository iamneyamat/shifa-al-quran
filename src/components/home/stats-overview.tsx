"use client";

import * as React from "react";
import { motion, useInView, useSpring, useTransform, Variants } from "framer-motion";
import { Users, Headphones, BookOpen, MessageCircle, Award } from "lucide-react";

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
    description: "অনলাইন ও সরাসরি পরামর্শ মিলিয়ে হাজারো মানুষ আল্লাহর কালামের উসিলায় আরোগ্য লাভের পথ খুঁজে পেয়েছেন।"
  },
  {
    id: 2,
    icon: Headphones,
    title: "রুকইয়াহ অডিও",
    description: "বিশেষ প্রয়োজনে নিয়মিত শোনার জন্য সহীহ নিয়মে ধারণকৃত রুকইয়াহ অডিও সংগ্রহ।"
  },
  {
    id: 3,
    icon: BookOpen,
    title: "ইসলামিক আর্টিকেল",
    description: "বদনজর, সিহর ও আত্মিক সচেতনতা তৈরি করতে নিয়মিত দিকনির্দেশনামূলক প্রবন্ধ।"
  },
  {
    id: 4,
    icon: MessageCircle,
    title: "অনলাইন পরামর্শ",
    description: "দূর-দূরান্তে থাকা ভাইবোনদের জন্য সহমর্মিতার সাথে সরাসরি অনলাইন সিরিয়াল ব্যবস্থা।"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function StatsOverview() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Deep Immersive Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900 dark:from-slate-950 dark:via-emerald-950 dark:to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />

      {/* Decorative Geometry */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath fill='%23ffffff' d='M30 0L60 30L30 60L0 30z'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="shell relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 mb-4 backdrop-blur-md">
              <Award className="h-4 w-4 text-amber-300" />
              <span className="type-citation text-xs font-semibold text-amber-300 tracking-wider uppercase">
                আমাদের পথচলা ও অভিজ্ঞতা
              </span>
            </div>

            <h2 className="type-display text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-md">
              আস্থা ও সেবার নিবেদিত প্রতিফলন
            </h2>

            <p className="type-body-lg text-emerald-100/90 mt-5 max-w-2xl mx-auto leading-relaxed">
              আল্লাহ রাব্বুল আলামিনের অশেষ রহমতে আমরা অগণিত মানুষের পাশে দাঁড়ানোর ও তাদের মনে আশা জাগানোর তাওফিক পেয়েছি।
            </p>
          </motion.div>
        </div>

        {/* Stats Grid with Staggered Scroll Reveal */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40 hover:bg-white/10"
            >
              {/* Inner ambient shine */}
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:border-amber-400/40 group-hover:text-amber-300">
                  <stat.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>

                {stat.counter ? (
                  <h3 className="type-display text-4xl sm:text-5xl font-extrabold text-white mb-2 flex items-center tracking-tight">
                    <span className="group-hover:text-amber-300 transition-colors"><AnimatedCounter value={stat.counter} /></span>
                    <span className="text-amber-300 ml-1">{stat.suffix}</span>
                  </h3>
                ) : (
                  <h3 className="type-title text-xl font-bold text-white mb-3">
                    {stat.title}
                  </h3>
                )}

                {stat.counter && (
                  <p className="type-citation text-xs font-semibold text-amber-300 uppercase tracking-wider mb-4">
                    {stat.title}
                  </p>
                )}

                <p className="type-body-sm text-emerald-100/80 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

