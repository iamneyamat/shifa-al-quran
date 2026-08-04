"use client";

import * as React from "react";
import { motion, useInView, useSpring, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import { 
  Heart, 
  ShieldCheck, 
  BookOpen, 
  Lock, 
  CheckCircle2, 
  Users, 
  Star, 
  Activity,
  ArrowRight,
  HelpCircle,
  Shield
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

// --- Animation Variants ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
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

// --- Content Data ---
const coreValues = [
  {
    icon: BookOpen,
    title: "শতভাগ সুন্নাহ সম্মত",
    description: "আমাদের প্রতিটি পদক্ষেপ ও চিকিৎসা পদ্ধতি সম্পূর্ণ কুরআন ও সহিহ সুন্নাহ ভিত্তিক।"
  },
  {
    icon: ShieldCheck,
    title: "শিরক ও বিদআত মুক্ত",
    description: "আমরা যেকোনো প্রকার কুসংস্কার, শিরক এবং বিদআত থেকে আমাদের চিকিৎসাকে মুক্ত রাখি।"
  },
  {
    icon: Lock,
    title: "সম্পূর্ণ গোপনীয়তা",
    description: "রোগীর ব্যক্তিগত তথ্য এবং চিকিৎসার সকল বিষয় আমরা শতভাগ গোপন রাখি।"
  },
  {
    icon: Heart,
    title: "সহানুভূতিশীল আচরণ",
    description: "একজন মুসলিম ভাই বা বোন হিসেবে আমরা অত্যন্ত আন্তরিকতার সাথে রোগীদের সেবা প্রদান করি।"
  }
];

const timelineSteps = [
  {
    title: "সমস্যা নির্ণয় ও পরামর্শ",
    description: "প্রাথমিকভাবে রোগীর শারীরিক ও মানসিক অবস্থা পর্যবেক্ষণ করে সমস্যার মূল কারণ (জাদু, বদনজর বা জিন) নির্ণয় করা হয় এবং প্রয়োজনীয় পরামর্শ দেওয়া হয়।"
  },
  {
    title: "সুন্নাহ সম্মত রুকইয়াহ সেশন",
    description: "সমস্যা অনুযায়ী অভিজ্ঞ রাকি দ্বারা কুরআন তিলাওয়াত ও মাসনুন দোয়ার মাধ্যমে রুকইয়াহ সেশন পরিচালনা করা হয়।"
  },
  {
    title: "সেলফ-রুকইয়াহ ও আমল প্রদান",
    description: "সেশনের পর রোগীকে বাড়িতে নিজে নিজে করার জন্য সুনির্দিষ্ট আমল ও সেলফ-রুকইয়াহ এর রুটিন দেওয়া হয়।"
  },
  {
    title: "ফলো-আপ ও গাইডেন্স",
    description: "চিকিৎসা পরবর্তী সময়ে রোগীর উন্নতি পর্যবেক্ষণ করা হয় এবং সম্পূর্ণ সুস্থতা পর্যন্ত প্রয়োজনীয় গাইডেন্স দেওয়া হয়।"
  }
];

const faqs = [
  {
    q: "আপনাদের চিকিৎসা কি সম্পূর্ণ ইসলামি শরিয়ত সম্মত?",
    a: "হ্যাঁ, আলহামদুলিল্লাহ। আমাদের চিকিৎসা পদ্ধতি সম্পূর্ণ কুরআন এবং সহিহ হাদিস ভিত্তিক। আমরা তাবিজ, কুফরি কালাম বা যেকোনো ধরনের শিরক ও বিদআত থেকে সম্পূর্ণ মুক্ত।"
  },
  {
    q: "অনলাইনে চিকিৎসা নেওয়া কি সম্ভব?",
    a: "হ্যাঁ, দেশের যেকোনো প্রান্ত বা প্রবাস থেকে আমাদের অভিজ্ঞ রাকিদের মাধ্যমে অনলাইনে রুকইয়াহ সেশন ও কাউন্সেলিং নেওয়া সম্ভব।"
  },
  {
    q: "রুকইয়াহ সেশনের আগে কী প্রস্তুতি নিতে হয়?",
    a: "রোগীকে অবশ্যই পবিত্র অবস্থায় (ওজু সহকারে) থাকতে হবে এবং পাঁচ ওয়াক্ত নামাজের পাবন্দি করার মানসিকতা থাকতে হবে।"
  }
];

const commitments = [
  "রোগীর ব্যক্তিগত তথ্যের সর্বোচ্চ গোপনীয়তা রক্ষা করা",
  "শুধুমাত্র কোরআন ও সুন্নাহ ভিত্তিক পদ্ধতি ব্যবহার করা",
  "সকল প্রকার শিরক, বিদআত ও কুসংস্কার বর্জন করা",
  "রোগীর সাথে মানবিক, সহানুভূতিশীল ও সম্মানজনক আচরণ করা"
];

export function AboutClient() {
  return (
    <div className="min-h-screen bg-light-bg-main dark:bg-[#020817] flex flex-col font-sans relative">
      
      {/* Global Page Pattern Overlay */}
      <div 
        className="fixed inset-0 z-[5] opacity-[0.02] dark:opacity-[0.03] dark:invert pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* 1. Hero & Our Story Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-36 lg:pb-32">
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
              আমাদের <span className="text-emerald-600 dark:text-emerald-400">গল্প</span>
            </h1>
            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-8 md:mb-10" />
            
            <p className="text-lg md:text-2xl text-light-text dark:text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
              শিফা আল কুরআন কোনো সাধারণ চিকিৎসা কেন্দ্র নয়। বর্তমান সমাজে জাদুটোনা, বদনজর এবং জিন ঘটিত সমস্যার কারণে অনেকেই দিশেহারা। সঠিক চিকিৎসার অভাবে অনেকে শিরক ও বিদআতে লিপ্ত হচ্ছেন। আমাদের পথচলা শুরু হয় মানুষকে এই অন্ধকার পথ থেকে ফিরিয়ে এনে <strong>সম্পূর্ণ কুরআন ও সুন্নাহর আলোকে</strong> একটি নির্ভরযোগ্য, নিরাপদ এবং বিশুদ্ধ চিকিৎসা ব্যবস্থা উপহার দেওয়ার লক্ষ্যে।
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="py-16 md:py-24 bg-light-bg-alt1 dark:bg-[#020817] relative border-t border-light-border/40 dark:border-slate-800/50 overflow-hidden">
        {/* Immersive Decor for Mission/Vision */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl p-8 md:p-12 rounded-[40px] border border-white dark:border-slate-800 shadow-premium-soft dark:shadow-none relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
              
              <div className="h-16 w-16 md:h-20 md:w-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center mb-6 md:mb-8 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Activity className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-slate-100 mb-4 tracking-tight">আমাদের লক্ষ্য (Mission)</h3>
              <p className="text-base md:text-lg text-light-text dark:text-slate-400 leading-relaxed">
                মানুষকে শিরক, বিদআত এবং কুসংস্কারমুক্ত সঠিক সুন্নাহ ভিত্তিক রুকইয়াহ চিকিৎসা প্রদান করা। আমরা চাই প্রতিটি মুসলিম পরিবার যেন কুরআন ও সুন্নাহর আলোকে নিজেদের আত্মিক ও শারীরিক সুস্থতা নিশ্চিত করতে পারে।
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl p-8 md:p-12 rounded-[40px] border border-white dark:border-slate-800 shadow-premium-soft dark:shadow-none relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
              
              <div className="h-16 w-16 md:h-20 md:w-20 bg-blue-50 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center mb-6 md:mb-8 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Star className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-light-heading dark:text-slate-100 mb-4 tracking-tight">আমাদের উদ্দেশ্য (Vision)</h3>
              <p className="text-base md:text-lg text-light-text dark:text-slate-400 leading-relaxed">
                এমন একটি সুস্থ সমাজ গড়ে তোলা যেখানে জাদু, বদনজর বা জিনের আছর থেকে বাঁচার জন্য মানুষ কোনো ভণ্ড বা জাদুকরের দ্বারস্থ হবে না, বরং সরাসরি আল্লাহর কালামের ওপর পূর্ণ আস্থা ও বিশ্বাস স্থাপন করবে।
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Statistics Bar - Premium Immersive Gradient */}
      <section className="py-16 md:py-28 relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        
        {/* Soft glowing orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative mx-auto px-4 sm:px-6 text-center text-white z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex h-20 w-20 md:h-24 md:w-24 bg-white/20 backdrop-blur-xl rounded-[2rem] items-center justify-center mb-6 md:mb-8 shadow-2xl border border-white/30">
              <Users className="h-10 w-10 md:h-12 md:w-12 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight drop-shadow-md">
              আলহামদুলিল্লাহ, <span className="text-amber-300"><AnimatedCounter value={30000} suffix="+" /></span> মানুষ
            </h2>
            <p className="text-lg md:text-3xl font-medium text-emerald-50 max-w-3xl mx-auto opacity-90 leading-relaxed drop-shadow-sm">
              বিগত বছরগুলোতে আমাদের অনলাইন ও অফলাইন সেবা গ্রহণ করেছেন।
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-16 md:py-28 bg-light-bg-main dark:bg-[#020817] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-light-heading dark:text-white mb-4 md:mb-6 tracking-tight">আমাদের মূলনীতি</h2>
            <p className="text-light-text dark:text-slate-400 text-lg md:text-xl">যে বিষয়গুলোতে আমরা কখনোই আপস করি না</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {coreValues.map((val, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                className="bg-white dark:bg-slate-900/60 p-8 rounded-[32px] border border-light-border/60 dark:border-slate-800 text-center hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] transition-all duration-300 group"
              >
                <div className="h-16 w-16 md:h-20 md:w-20 bg-light-bg-alt1 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-light-border dark:border-slate-700 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-transform duration-500">
                  <val.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold text-light-heading dark:text-slate-200 mb-3 tracking-tight">{val.title}</h4>
                <p className="text-[15px] text-light-text dark:text-slate-400 leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Our Commitment Section */}
      <section className="py-16 md:py-28 bg-light-bg-alt2 dark:bg-slate-950 border-y border-light-border/50 dark:border-slate-800 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Visual Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-5/12 w-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-[40px] blur-2xl opacity-20" />
              <div className="relative bg-white dark:bg-[#020817] p-12 rounded-[40px] border border-light-border dark:border-slate-800 shadow-2xl flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                  <Shield className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-extrabold text-light-heading dark:text-white mb-2">বিশ্বস্ততা</h3>
                <p className="text-light-text dark:text-slate-400 text-lg">আমাদের সবচেয়ে বড় পুঁজি</p>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:w-7/12 w-full"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-light-heading dark:text-white mb-6 md:mb-8 tracking-tight">
                আমাদের প্রতিশ্রুতি
              </motion.h2>
              
              <div className="space-y-6">
                {commitments.map((commitment, idx) => (
                  <motion.div variants={fadeUp} key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-lg md:text-xl text-light-heading dark:text-slate-300 font-medium">
                      {commitment}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Treatment Philosophy */}
      <section className="py-16 md:py-28 bg-light-bg-main dark:bg-[#020817] relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-light-bg-alt1 dark:bg-slate-900/40 p-10 md:p-20 rounded-[40px] shadow-premium-soft dark:shadow-none border border-light-border/60 dark:border-slate-800 relative"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amber-500 text-white p-4 rounded-full shadow-lg">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold text-light-heading dark:text-white mb-6 md:mb-8 mt-4 tracking-tight">আমাদের বিশ্বাস ও চিকিৎসা দর্শন</h3>
            <p className="text-lg md:text-2xl text-light-text dark:text-slate-300 leading-relaxed italic">
              "আমরা কোনো জাদুকর বা অলৌকিক ক্ষমতার অধিকারী নই। আমরা কেবল কুরআন ও সুন্নাহর আলোকে একটি <strong>উসিলা বা মাধ্যম</strong> হিসেবে কাজ করি। 
              <span className="block mt-6 font-extrabold text-emerald-700 dark:text-emerald-400 text-2xl md:text-4xl not-italic tracking-tight">রোগমুক্তি কেবল মহান আল্লাহর ইচ্ছাধীন।</span>"
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. Treatment Timeline */}
      <section className="py-16 md:py-28 bg-light-bg-alt1 dark:bg-[#020817] relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-light-heading dark:text-white mb-4 md:mb-6 tracking-tight">আমাদের চিকিৎসা পদ্ধতি</h2>
            <p className="text-light-text dark:text-slate-400 text-lg md:text-xl">ধাপে ধাপে একটি পরিপূর্ণ ও বিশুদ্ধ চিকিৎসা প্রক্রিয়া</p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-emerald-200/50 dark:bg-emerald-900/50 md:-translate-x-1/2 rounded-full" />

            <div className="space-y-12 md:space-y-16">
              {timelineSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={cn(
                    "relative flex items-center md:justify-between group",
                    idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-emerald-500 border-4 border-white dark:border-[#020817] shadow-xl transform -translate-x-1/2 flex items-center justify-center z-10 group-hover:bg-emerald-400 transition-colors">
                    <span className="text-white text-sm font-bold">{idx + 1}</span>
                  </div>

                  {/* Content Card */}
                  <div className="ml-16 md:ml-0 md:w-[45%] bg-white dark:bg-slate-900/80 p-6 md:p-10 rounded-[32px] border border-light-border dark:border-slate-800 shadow-sm group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] dark:group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] transition-all duration-300">
                    <h4 className="text-xl md:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-3 md:mb-4 tracking-tight">{step.title}</h4>
                    <p className="text-light-text dark:text-slate-300 text-base md:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Preview */}
      <section className="py-16 md:py-28 bg-light-bg-main dark:bg-[#020817] relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-light-heading dark:text-white mb-4 md:mb-6 tracking-tight">সাধারণ জিজ্ঞাসা (FAQ)</h2>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                className="bg-light-bg-alt1 dark:bg-slate-900/40 p-8 md:p-10 rounded-[32px] border border-light-border dark:border-slate-800 shadow-sm hover:-translate-y-1 transition-transform"
              >
                <div className="bg-blue-100 dark:bg-blue-900/40 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold text-light-heading dark:text-slate-200 mb-4 tracking-tight">{faq.q}</h4>
                <p className="text-base text-light-text dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-16 md:py-28 relative overflow-hidden bg-light-bg-alt2 dark:bg-[#020817]">
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
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 md:mb-8 leading-tight tracking-tight">
                আপনার সুস্থতার যাত্রা আজই শুরু করুন
              </h2>
              <p className="text-emerald-50 text-lg md:text-2xl max-w-3xl mx-auto mb-10 md:mb-12 opacity-90 leading-relaxed">
                সঠিক সুন্নাহ ভিত্তিক চিকিৎসার মাধ্যমে নিজে সুস্থ থাকুন এবং পরিবারকে নিরাপদে রাখুন।
              </p>
              
              <Link 
                href="/appointment"
                className="inline-flex items-center gap-3 bg-white text-emerald-700 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg md:text-xl hover:bg-emerald-50 transition-colors duration-300 shadow-lg hover:shadow-xl active:scale-95"
              >
                অ্যাপয়েন্টমেন্ট নিন
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
