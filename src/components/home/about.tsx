"use client";

import { motion, Variants } from "framer-motion";
import {
  BookOpen,
  Award,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  Globe2,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const features = [
  {
    icon: BookOpen,
    title: "কুরআন ও সুন্নাহ ভিত্তিক রুকইয়াহ",
    description: "সম্পূর্ণ কোরআন ও সহিহ সুন্নাহর আলোকে বিশুদ্ধ চিকিৎসা পদ্ধতি।",
  },
  {
    icon: Award,
    title: "অভিজ্ঞ রাকি",
    description:
      "দীর্ঘদিনের অভিজ্ঞ ও নির্ভরযোগ্য রুকইয়াহ বিশেষজ্ঞ দ্বারা পরিচালিত।",
  },
  {
    icon: ShieldCheck,
    title: "সর্বোচ্চ গোপনীয়তা",
    description:
      "আমাদের কাছে রোগীদের তথ্য ও চিকিৎসার শতভাগ গোপনীয়তা বজায় রাখা হয়।",
  },
  {
    icon: CheckCircle2,
    title: "বিদআত মুক্ত পদ্ধতি",
    description:
      "যেকোনো প্রকার বিদআত, শিরক ও কুসংস্কার থেকে সম্পূর্ণ মুক্ত চিকিৎসা।",
  },
  {
    icon: HeartHandshake,
    title: "পারিবারিক কাউন্সেলিং",
    description: "পারিবারিক অশান্তি ও মানসিক শান্তির জন্য কোরআনিক কাউন্সেলিং।",
  },
  {
    icon: Globe2,
    title: "অনলাইন ও অফলাইন সেবা",
    description: "ঘরে বসে দেশ-বিদেশ থেকে অনলাইনে চিকিৎসা নেওয়ার সুব্যবস্থা।",
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

export function AboutSection() {
  return (
    <section className="section-band bg-surface-base">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">আমাদের বিশেষত্ব</p>
          <h2 className="type-title mt-4 text-ink-strong">
            কেন শিফা আল কুরআনকে বেছে নিবেন?
          </h2>
          <p className="type-body-lg mt-5 text-ink-body">
            আমরা কোনো সাধারণ চিকিৎসা কেন্দ্র নই, বরং আমরা কোরআন ও সুন্নাহর আলোকে
            মানুষের শারীরিক ও আধ্যাত্মিক সুস্থতা নিশ্চিত করতে বদ্ধপরিকর।
          </p>
        </Reveal>

        <div className="mt-11 lg:mt-14">
          <motion.ul 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {features.map((feature) => (
              <motion.li 
                key={feature.title} 
                variants={itemVariants}
                className="card flex h-full flex-col hover:border-emerald-500/40 transition-colors"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-soft text-primary-soft-ink">
                  <feature.icon
                    className="h-5 w-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="type-heading-sm mt-5 text-ink-strong">
                  {feature.title}
                </h3>
                <p className="type-body mt-2 text-ink-body">
                  {feature.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <Reveal>
          <div className="mt-11 flex flex-col gap-5 rounded-lg border border-hairline bg-surface-sunken p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8 lg:mt-14">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-soft-ink">
              <Users className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="type-body-lg text-ink-body">
              আলহামদুলিল্লাহ, আল্লাহর রহমতে গত এক বছরে অনলাইন ও অফলাইন মিলিয়ে
              প্রায়{" "}
              <strong className="font-semibold text-ink-strong">
                ৩০,০০০+ মানুষ
              </strong>{" "}
              আমাদের সেবা গ্রহণ করেছেন।
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
