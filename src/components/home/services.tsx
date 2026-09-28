"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { EyeOff, Ghost, Brain, Frown, Users, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const services = [
  {
    id: "jadu",
    title: "জাদুটোনা (সিহর)",
    description:
      "কালো জাদু বা সিহরে আক্রান্ত ব্যক্তিদের শরিয়াহসম্মত দোয়া ও আয়াতের মাধ্যমে সুস্থতার দিকনির্দেশনা।",
    icon: Ghost,
  },
  {
    id: "nazar",
    title: "বদনজর (আইন)",
    description:
      "হঠাৎ অসুস্থতা, ব্যবসায় ক্ষতি বা হঠাৎ মানসিক পরিবর্তনের পেছনে বদনজরের প্রভাবে সুন্নাহসম্মত প্রতিষেধক।",
    icon: EyeOff,
  },
  {
    id: "jinn",
    title: "জ্বিন আছর",
    description:
      "অহেতুক ভয়ভীতি, রাতে অস্থিরতা ও জিনের উপদ্রব থেকে কুরআনের কালাম দিয়ে আত্মরক্ষার উপায়।",
    icon: Users,
  },
  {
    id: "mental",
    title: "মানসিক অস্থিরতা",
    description:
      "দুশ্চিন্তা, মানসিক অবসাদ ও বিষণ্ণতায় ভুগে যারা শান্তি পাচ্ছেন না—তাদের অন্তরের প্রশান্তির জন্য রুকইয়াহ।",
    icon: Brain,
  },
  {
    id: "physical",
    title: "অজানা রোগ",
    description:
      "চিকিৎসাবিজ্ঞানে স্পষ্ট কারণ মিলছে না এমন দীর্ঘস্থায়ী শারীরিক ব্যথায় সুন্নাহসম্মত আরোগ্য।",
    icon: Activity,
  },
  {
    id: "family",
    title: "পারিবারিক কলহ",
    description:
      "পারিবারিক সম্পর্কের অবক্ষয় বা স্বামী-স্ত্রীর দূরত্ব কমাতে সুন্নাহর আলোকে আত্মিক পরামর্শ।",
    icon: Frown,
  },
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

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-24 border-y border-hairline/80 bg-surface-sunken/40">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="shell relative z-10">
        <Reveal className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold-ornament/40 bg-gold-soft/40 dark:bg-gold-soft/20 px-3 sm:px-3.5 py-0.5 sm:py-1 mb-3 sm:mb-4">
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-700 dark:text-emerald-400" />
            <span className="type-citation text-[11px] sm:text-xs font-semibold text-amber-900 dark:text-gold-ink">সেবাসমূহ</span>
          </div>
          <h2 className="type-title text-ink-strong text-xl sm:text-2xl lg:text-4xl">
            যেসব বিষয়ে আমরা পরামর্শ ও চিকিৎসা দিই
          </h2>
          <p className="type-body-lg mt-2 sm:mt-4 text-ink-body text-xs sm:text-base">
            দৈনন্দিন জীবনের বিভিন্ন আত্মিক ও শারীরিক কষ্টে কুরআন ও হাদিসের আলোতে আপনার সুস্থতার জন্য আমরা নিবেদিত।
          </p>
        </Reveal>

        <div className="mt-8 sm:mt-12 lg:mt-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid gap-3.5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-hairline/80 bg-surface-raised/80 p-4 sm:p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:shadow-md hover:shadow-emerald-900/5"
              >
                {/* Subtle card top glow */}
                <div className="absolute top-0 right-8 h-px w-24 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-interactive transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="type-heading-sm mt-4 sm:mt-6 text-ink-strong group-hover:text-interactive transition-colors text-base sm:text-lg">
                    {service.title}
                  </h3>
                  <p className="type-body mt-1.5 sm:mt-2.5 text-ink-body leading-relaxed text-xs sm:text-sm">
                    {service.description}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-hairline/60 flex items-center gap-1.5 text-xs font-semibold text-interactive opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <span>বিস্তারিত জানুন</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-raised px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-interactive shadow-sm backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40 hover:bg-surface-sunken min-h-[44px]"
            >
              <span>সকল সেবার বিস্তারিত দেখুন</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


