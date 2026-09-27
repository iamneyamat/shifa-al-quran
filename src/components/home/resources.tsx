"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Headphones, BookOpen, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const audioCategories = ["বদনজর", "জাদু ও জিন", "তেলাওয়াত", "অন্যান্য"];

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

export function ResourcesSection() {
  return (
    <section className="section-band border-y border-hairline bg-surface-sunken">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">সহায়ক উপকরণ</p>
          <h2 className="type-title mt-4 text-ink-strong">অডিও ও আর্টিকেল</h2>
        </Reveal>

        <div className="mt-9 lg:mt-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid gap-4 lg:grid-cols-2 lg:gap-6"
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/audio"
                className="card card-interactive flex flex-col no-underline hover:border-emerald-500/40 transition-all h-full"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-soft text-primary-soft-ink">
                  <Headphones
                    className="h-5 w-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="type-subtitle mt-5 text-ink-strong">
                  অডিও লাইব্রেরি
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {audioCategories.map((category) => (
                    <li key={category} className="badge badge-neutral">
                      {category}
                    </li>
                  ))}
                </ul>
                <span className="type-heading-sm mt-6 inline-flex items-center gap-2 text-interactive">
                  অডিও শুনুন
                  <ArrowRight
                    className="h-4 w-4 shrink-0"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/blog"
                className="card card-interactive flex flex-col no-underline hover:border-emerald-500/40 transition-all h-full"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-soft text-primary-soft-ink">
                  <BookOpen
                    className="h-5 w-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="type-subtitle mt-5 text-ink-strong">
                  ব্লগ ও আর্টিকেল
                </h3>
                <p className="type-body mt-3 flex-1 text-ink-body">
                  রুকইয়াহ শারইয়াহ, সুন্নাহ এবং সুস্থতা নিয়ে আমাদের সর্বশেষ লেখাগুলো
                  পড়ুন।
                </p>
                <span className="type-heading-sm mt-6 inline-flex items-center gap-2 text-interactive">
                  ব্লগ পড়ুন
                  <ArrowRight
                    className="h-4 w-4 shrink-0"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
