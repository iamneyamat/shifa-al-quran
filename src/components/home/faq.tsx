"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

const faqs = [
  {
    question: "রুকইয়াহ কী?",
    answer:
      "রুকইয়াহ হলো কোরআনের আয়াত, আল্লাহর সুন্দর নামসমূহ এবং রাসূল (সা.) থেকে বর্ণিত দোয়াসমূহের মাধ্যমে চিকিৎসা করা। এটি সম্পূর্ণ শরীয়াহ সম্মত এবং নিরাপদ।",
  },
  {
    question: "রুকইয়াহ করার জন্য কি বিশেষ কোনো প্রস্তুতির প্রয়োজন আছে?",
    answer:
      "হ্যাঁ, রুকইয়াহ করার আগে কিছু প্রস্তুতি নেওয়া জরুরি। যেমন- সঠিক নিয়ত করা, হালাল খাবার খাওয়া, পাঁচ ওয়াক্ত নামাজ পড়া এবং গুনাহ থেকে বেঁচে থাকা।",
  },
  {
    question: "জাদুটোনা বা জ্বিন আছরের চিকিৎসা কতদিন লাগতে পারে?",
    answer:
      "এটি সম্পূর্ণ রোগীর সমস্যার ধরন এবং আল্লাহর ইচ্ছার উপর নির্ভর করে। তবে নিয়মিত রুকইয়াহ এবং আমল করলে ইনশাআল্লাহ দ্রুত সুস্থতা লাভ করা সম্ভব।",
  },
  {
    question: "আপনাদের চিকিৎসা ফি কত?",
    answer:
      "আমাদের নির্দিষ্ট কোনো ফি নেই (বা ফি সম্পর্কে বিস্তারিত জানতে আমাদের সাথে সরাসরি যোগাযোগ করুন)। আমরা সাধ্যমত সেবা দেওয়ার চেষ্টা করি।",
  },
  {
    question: "মহিলাদের রুকইয়াহ করার ব্যবস্থা আছে কি?",
    answer:
      "হ্যাঁ, মহিলাদের রুকইয়াহ করার সময় অবশ্যই তাদের সাথে একজন মাহরাম (যেমন- স্বামী, বাবা, ভাই বা ছেলে) থাকা বাধ্যতামূলক। পর্দা রক্ষা করে চিকিৎসা দেওয়া হয়।",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function FaqSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-t border-hairline/80 bg-surface-sunken/40">
      <div className="shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div className="sticky top-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-ornament/40 bg-gold-soft/40 dark:bg-gold-soft/20 px-3.5 py-1 mb-4">
                <HelpCircle className="h-3.5 w-3.5 text-amber-900 dark:text-gold-ink" />
                <span className="type-citation text-xs font-semibold text-amber-900 dark:text-gold-ink">জিজ্ঞাসা</span>
              </div>
              <h2 className="type-title text-ink-strong lg:text-4xl">সাধারণ জিজ্ঞাসা</h2>
              <p className="type-body mt-4 text-ink-body leading-relaxed">
                রুকইয়াহ শারইয়াহ ও চিকিৎসা সেবা সংক্রান্ত আপনার প্রয়োজনীয় সাধারণ প্রশ্নগুলোর উত্তর পেয়ে যাবেন এখানে।
              </p>
              
              <div className="mt-8">
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-raised px-6 py-3 text-sm font-semibold text-interactive shadow-sm backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40 hover:bg-surface-sunken"
                >
                  <span>সব প্রশ্ন দেখুন</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="space-y-4"
            >
              {faqs.map((faq, idx) => (
                <motion.details
                  key={faq.question}
                  variants={itemVariants}
                  className="group rounded-2xl border border-hairline/80 bg-surface-raised/80 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-emerald-500/30 open:border-emerald-500/40 open:shadow-md"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 font-bold text-xs text-interactive">
                        {idx + 1}
                      </span>
                      <span className="type-heading-sm text-ink-strong font-semibold group-open:text-interactive transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300 group-open:rotate-180 group-open:text-interactive"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="mt-4 pt-4 border-t border-hairline/60 pl-10">
                    <p className="type-body text-ink-body leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.details>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

