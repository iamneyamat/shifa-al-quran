"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function FoundationSection() {
  return (
    <section className="section-band border-y border-hairline bg-surface-raised">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <h2 className="type-title text-ink-strong">কোরআন ও সুন্নাহর প্রমাণ</h2>
          <p className="type-body-lg mt-5 text-ink-body">
            রুকইয়াহ শারইয়াহ কোনো নতুন বা মনগড়া চিকিৎসা নয়, বরং এটি স্বয়ং
            আল্লাহ এবং তাঁর রাসূল (সা.) থেকে প্রমাণিত।
          </p>
        </Reveal>

        <div className="mt-11 lg:mt-14">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid gap-5 lg:grid-cols-2 lg:gap-6"
          >
            <motion.figure variants={itemVariants} className="card card-citation flex flex-col hover:border-gold-ornament/40 transition-colors">
              <p className="type-citation text-amber-900 dark:text-gold-soft-ink font-semibold">কোরআন</p>
              <p
                dir="rtl"
                lang="ar"
                className="type-ayah-inline font-arabic text-2xl lg:text-3xl mt-4 text-right text-emerald-950 dark:text-ink-strong font-bold"
              >
                قُلْ هُوَ لِلَّذِينَ آمَنُوا هُدًى وَشِفَاءٌ
              </p>
              <hr className="divider mt-5" />
              <blockquote className="type-body-lg mt-5 text-ink-body">
                অর্থ: &ldquo;বলুন, এটি (কোরআন) মুমিনদের জন্য হেদায়েত ও
                আরোগ্য।&rdquo;
              </blockquote>
              <figcaption className="type-citation mt-4 text-amber-900 dark:text-gold-ink font-semibold">
                — (সূরা হা-মীম সিজদাহ: ৪৪)
              </figcaption>
            </motion.figure>

            <motion.figure variants={itemVariants} className="card card-citation flex flex-col hover:border-gold-ornament/40 transition-colors">
              <p className="type-citation text-amber-900 dark:text-gold-soft-ink font-semibold">হাদিস</p>
              <blockquote className="type-body-lg mt-4 text-ink-body">
                আয়েশা (রা.) থেকে বর্ণিত, রাসূলুল্লাহ (সা.) যখন অসুস্থ হতেন, তখন
                তিনি সূরা ফালাক ও সূরা নাস পড়ে নিজের ওপর ফুঁ দিতেন।
              </blockquote>
              <figcaption className="type-citation mt-4 text-amber-900 dark:text-gold-ink font-semibold">
                — (সহিহ বুখারি: ৫০১৬)
              </figcaption>
            </motion.figure>
          </motion.div>

          <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:mt-11">
            <p className="type-body-sm max-w-xl text-ink-muted">
              চিকিৎসার ফলাফল সম্পূর্ণ আল্লাহর ওপর নির্ভরশীল। আমরা কোনো গ্যারান্টি
              প্রদান করি না।
            </p>
            <Link
              href="/evidence"
              className="type-heading-sm inline-flex min-h-11 shrink-0 items-center gap-2 text-interactive underline decoration-1 underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-interactive-hover"
            >
              সকল দলিল দেখুন
              <ArrowRight
                className="h-4 w-4 shrink-0"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
