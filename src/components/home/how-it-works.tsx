"use client";

import { motion, Variants } from "framer-motion";
import {
  ClipboardList,
  PhoneCall,
  HeartHandshake,
  UserCheck,
  Compass,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    step: "০১",
    title: "অনুভূতি ও সমস্যা শেয়ার",
    description:
      "আপনার শারীরিক ও মানসিক কষ্টের কথা আমরা গভীর মনোযোগের সাথে শুনে সমস্যার মূল কারণ বোঝার চেষ্টা করি।",
    icon: ClipboardList,
  },
  {
    step: "০২",
    title: "আমল ও দিকনির্দেশনা",
    description:
      "কুরআন ও সুন্নাহর আলোকে দৈনন্দিন বিশেষ দুআ, যিকির ও আমলের সহজ নিয়ম বুঝিয়ে দেওয়া হয়।",
    icon: PhoneCall,
  },
  {
    step: "০৩",
    title: "রুকইয়াহ সেশন",
    description:
      "প্রয়োজনভেদে অভিজ্ঞ রাকির উপস্থিতিতে সরাসরি কোরআনের আয়াত তেলাওয়াতের মাধ্যমে চিকিৎসা দেওয়া হয়।",
    icon: HeartHandshake,
  },
  {
    step: "০৪",
    title: "নিয়মিত খোঁজখবর",
    description:
      "সেশন শেষের পরও আপনার শারীরিক ও আত্মিক উন্নতির নিয়মিত খোঁজখবর রাখা হয়।",
    icon: UserCheck,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-24 bg-surface-base">
      <div className="shell relative z-10">
        <Reveal className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold-ornament/40 bg-gold-soft/40 dark:bg-gold-soft/20 px-3 sm:px-3.5 py-0.5 sm:py-1 mb-3 sm:mb-4">
            <Compass className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-700 dark:text-emerald-400" />
            <span className="type-citation text-[11px] sm:text-xs font-semibold text-amber-900 dark:text-gold-ink">চিকিৎসা পদ্ধতি</span>
          </div>
          <h2 className="type-title text-ink-strong text-xl sm:text-2xl lg:text-4xl">
            আমাদের চিকিৎসা ও গাইডলাইন পদ্ধতি
          </h2>
          <p className="type-body-lg mt-2 sm:mt-4 text-ink-body text-xs sm:text-base">
            সুস্থতার সফরকে আমরা চারটি সহজ ও বিশ্বাসযোগ্য ধাপে ভাগ করেছি, যাতে আপনি যেকোনো সময় নির্দ্বিধায় আমাদের সহায়তা পেতে পারেন।
          </p>
        </Reveal>

        <div className="relative mt-8 sm:mt-12 lg:mt-16">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-emerald-500/20 via-emerald-500/40 to-emerald-500/20 z-0" />

          <motion.ol 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid gap-3.5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 relative z-10"
          >
            {steps.map((step) => (
              <motion.li 
                key={step.step}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col rounded-xl sm:rounded-2xl border border-hairline/80 bg-surface-raised/80 p-4 sm:p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md">
                    {step.step}
                  </span>
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border border-hairline bg-surface-sunken text-interactive transition-transform group-hover:scale-110">
                    <step.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                </div>

                <h3 className="type-subtitle text-ink-strong group-hover:text-interactive transition-colors text-base sm:text-lg">
                  {step.title}
                </h3>
                <p className="type-body mt-1.5 sm:mt-2.5 text-ink-body leading-relaxed text-xs sm:text-sm">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}


