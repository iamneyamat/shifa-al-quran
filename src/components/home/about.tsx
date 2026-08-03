"use client";

import * as React from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  Globe2,
  Users
} from "lucide-react";

// Custom Animated Counter
function AnimatedCounter({ value, duration = 2 }: { value: number, duration?: number }) {
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
    Math.round(current).toLocaleString("bn-BD")
  );

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

const features = [
  {
    icon: BookOpen,
    title: "কুরআন ও সুন্নাহ ভিত্তিক রুকইয়াহ",
    description: "সম্পূর্ণ কোরআন ও সহিহ সুন্নাহর আলোকে বিশুদ্ধ চিকিৎসা পদ্ধতি।"
  },
  {
    icon: Award,
    title: "অভিজ্ঞ রাকি",
    description: "দীর্ঘদিনের অভিজ্ঞ ও নির্ভরযোগ্য রুকইয়াহ বিশেষজ্ঞ দ্বারা পরিচালিত।"
  },
  {
    icon: ShieldCheck,
    title: "সর্বোচ্চ গোপনীয়তা",
    description: "আমাদের কাছে রোগীদের তথ্য ও চিকিৎসার শতভাগ গোপনীয়তা বজায় রাখা হয়।"
  },
  {
    icon: Sparkles,
    title: "বিদআত মুক্ত পদ্ধতি",
    description: "যেকোনো প্রকার বিদআত, শিরক ও কুসংস্কার থেকে সম্পূর্ণ মুক্ত চিকিৎসা।"
  },
  {
    icon: HeartHandshake,
    title: "পারিবারিক কাউন্সেলিং",
    description: "পারিবারিক অশান্তি ও মানসিক শান্তির জন্য কোরআনিক কাউন্সেলিং।"
  },
  {
    icon: Globe2,
    title: "অনলাইন ও অফলাইন সেবা",
    description: "ঘরে বসে দেশ-বিদেশ থেকে অনলাইনে চিকিৎসা নেওয়ার সুব্যবস্থা।"
  }
];

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-[#020817] py-24">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-300/20 dark:bg-blue-800/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-300/20 dark:bg-amber-800/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-amber-600 dark:text-amber-500 mb-3">
              আমাদের বিশেষত্ব
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              কেন শিফা আল কুরআনকে বেছে নিবেন?
            </h3>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full mb-6" />
            <p className="text-lg text-slate-600 dark:text-slate-400">
              আমরা কোনো সাধারণ চিকিৎসা কেন্দ্র নই, বরং আমরা কোরআন ও সুন্নাহর আলোকে মানুষের শারীরিক ও আধ্যাত্মিক সুস্থতা নিশ্চিত করতে বদ্ধপরিকর।
            </p>
          </motion.div>
        </div>

        {/* 6 Feature Cards Grid */}
        <motion.div 
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.08)] dark:hover:shadow-[0_20px_40px_rgb(37,99,235,0.15)] transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/30 border border-slate-100 dark:border-slate-700/50 text-blue-700 dark:text-amber-400 relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out">
                <feature.icon className="h-8 w-8" strokeWidth={1.5} />
              </div>
              
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 relative z-10 group-hover:text-blue-700 dark:group-hover:text-amber-400 transition-colors">
                {feature.title}
              </h4>
              <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 to-slate-900 p-[1px] shadow-2xl group">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-amber-400 to-blue-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-700" />
            
            <div className="relative bg-white dark:bg-slate-950 rounded-[23px] px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left overflow-hidden">
              
              {/* Soft background pulse */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} 
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-20 -top-20 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"
              />

              <div className="h-16 w-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/50">
                <Users className="h-8 w-8 text-amber-500" />
              </div>
              
              <div>
                <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-slate-100 leading-snug">
                  আলহামদুলিল্লাহ, আল্লাহর রহমতে গত এক বছরে অনলাইন ও অফলাইন মিলিয়ে প্রায় <span className="text-blue-700 dark:text-amber-500 inline-flex items-center"><AnimatedCounter value={30000} />+</span> মানুষ আমাদের সেবা গ্রহণ করেছেন।
                </h4>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
