"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Quote, HeartHandshake, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const testimonials = [
  {
    name: "আব্দুর রহমান",
    location: "ঢাকা",
    review:
      "আলহামদুলিল্লাহ, দীর্ঘদিন ধরে শারীরিক ও মানসিক সমস্যায় ভুগছিলাম। শিফা আল কুরআনে রুকইয়াহ করানোর পর আল্লাহর রহমতে এখন সম্পূর্ণ সুস্থ। তাদের সুন্নাহ সম্মত চিকিৎসা পদ্ধতি সত্যিই অসাধারণ।",
  },
  {
    name: "নাম প্রকাশে অনিচ্ছুক",
    location: "সিলেট",
    review:
      "পরিবারে দীর্ঘদিনের অশান্তি ছিল। অনেক জায়গায় গিয়েছি কিন্তু কোনো সমাধান পাইনি। শেষে এখানে আসি এবং উনাদের নির্দেশনা অনুযায়ী আমল করি। এখন আল্লাহ অনেক শান্তিতে রেখেছেন।",
  },
  {
    name: "উম্মে ফাতিমা",
    location: "চট্টগ্রাম",
    review:
      "জিনের সমস্যার কারণে স্বাভাবিক জীবনযাপন কঠিন হয়ে পড়েছিল। উনাদের কাছে রুকইয়াহ সেশনের পর আল্লাহর রহমতে আমি সম্পূর্ণ সুস্থ। সবচেয়ে ভালো লেগেছে যে উনারা শিরক ও বিদআতমুক্ত চিকিৎসা করেন।",
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

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-surface-base">
      <div className="shell relative z-10">
        <Reveal className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-ornament/40 bg-gold-soft/40 dark:bg-gold-soft/20 px-3.5 py-1 mb-4">
            <HeartHandshake className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
            <span className="type-citation text-xs font-semibold text-amber-900 dark:text-gold-ink">রোগীদের অনুভূতির প্রকাশ</span>
          </div>
          <h2 className="type-title text-ink-strong lg:text-4xl">রোগীদের অনুভূতি ও আস্থা</h2>
          <p className="type-body-lg mt-4 text-ink-body">
            আল্লাহর রহমতে শিফা আল কুরআন থেকে পরামর্শ ও সেবা লাভকারী মানুষদের অনুভূতি।
          </p>
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid gap-6 lg:grid-cols-3"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative flex h-full flex-col justify-between rounded-2xl border border-hairline/80 bg-surface-raised/80 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-gold-ornament/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Quote className="h-8 w-8 text-gold-ornament/60 transition-transform group-hover:scale-110" strokeWidth={1.5} aria-hidden="true" />
                    <div className="flex items-center gap-1 rounded-full bg-surface-sunken px-3 py-1 text-xs text-ink-muted">
                      <MapPin className="h-3 w-3 text-interactive" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                  
                  <blockquote className="type-body mt-5 text-ink-body leading-relaxed">
                    &ldquo;{testimonial.review}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="mt-8 border-t border-hairline/60 pt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 font-bold text-interactive text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <cite className="type-heading-sm block text-ink-strong not-italic font-semibold">
                      {testimonial.name}
                    </cite>
                    <span className="type-citation text-xs text-amber-900 dark:text-gold-ink font-medium">
                      সেবাগ্রহীতা
                    </span>
                  </div>
                </figcaption>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-raised px-6 py-3 text-sm font-semibold text-interactive shadow-sm backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40 hover:bg-surface-sunken"
            >
              <span>সব মতামত পড়ুন</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

