"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  Video,
  MessageCircle,
  Check,
  Leaf,
  CalendarHeart,
  ArrowRight,
  Stethoscope,
  Sparkles,
} from "lucide-react";

const infoData = [
  { icon: Phone, title: "হটলাইন নাম্বার", details: "09639-000999", href: "tel:09639000999" },
  { icon: MessageCircle, title: "হোয়াটসঅ্যাপ", details: "01353301772", href: "https://wa.me/8801353301772" },
  { icon: Clock, title: "পরামর্শের সময়", details: "সকাল ১০টা - রাত ৮টা", href: "/appointment" },
  { icon: MapPin, title: "আমাদের ঠিকানা", details: "#535/C Khilgaon, Dhaka", href: "/contact" },
  { icon: Video, title: "পরামর্শ সেবা", details: "অনলাইন ও অফলাইন", href: "/services" },
];

const trustPoints = [
  "কুরআন ও সুন্নাহ ভিত্তিক",
  "সম্পূর্ণ গোপনীয়তা রক্ষা",
  "অনলাইন ও অফলাইন সেবা",
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

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24">
      {/* Dynamic Liquid Mesh Backdrop Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-amber-500/10 blur-[140px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="shell relative z-10">
        
        {/* Main Liquid Glass Master Architecture */}
        <div className="glass-panel relative rounded-[2.5rem] p-6 sm:p-10 lg:p-14 border border-white/50 dark:border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden">
          
          {/* Subtle Glass Surface Top Highlights */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10 relative z-10">
            
            {/* Left Column: Proposition & Action */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
              className="lg:col-span-7 flex flex-col"
            >
              {/* Luminous Glass Chip Badge */}
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/15 px-4 py-1.5 backdrop-blur-xl mb-6 shadow-sm">
                <Leaf className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                <span className="type-citation text-xs font-semibold text-emerald-900 dark:text-emerald-300 tracking-wide">
                  কুরআন ও সুন্নাহর আলোয় আত্মিক আরোগ্য
                </span>
              </div>

              {/* Display Heading */}
              <h1 className="type-display text-ink-strong tracking-tight leading-[1.18] lg:text-5xl font-extrabold">
                কুরআন ও সুন্নাহর আলোয় <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-200">রুকইয়াহ শারইয়াহ</span> চিকিৎসা
              </h1>

              {/* Caring Paragraph */}
              <p className="type-body-lg mt-6 text-ink-body leading-relaxed max-w-2xl font-normal">
                মানসিক অস্থিরতা, বদনজর, জাদুটোনা কিংবা অজানা শারীরিক কষ্টে আমরা আপনাকে দিচ্ছি সুন্নাহসম্মত রুকইয়াহ ও আন্তরিক পরামর্শ। আল্লাহ তাআলার কালামের বরকতে প্রশান্তি ও সুস্থতার পথে আপনার পাশে আছি।
              </p>

              {/* Action Buttons */}
              <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/appointment"
                  className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 dark:from-emerald-600 dark:to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-900/25 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <CalendarHeart className="h-5 w-5 text-emerald-200 transition-transform group-hover:rotate-12" />
                  <span>অ্যাপয়েন্টমেন্ট নিন</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="glass-card inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold text-ink-strong backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-interactive active:scale-[0.98]"
                >
                  <span>আমাদের সেবাসমূহ</span>
                </Link>
              </div>

              {/* Trust Markers */}
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 pt-5 border-t border-hairline/60">
                {trustPoints.map((point) => (
                  <li key={point} className="type-meta flex items-center gap-2 text-ink-body font-medium">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-interactive shadow-sm">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right Column: Luminous Frosted Glass Mihrab Arch */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0, 0, 1] }}
              className="lg:col-span-5"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative mx-auto max-w-lg"
              >
                {/* Luminous Ambient Halo */}
                <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-b from-amber-400/20 via-emerald-500/20 to-transparent blur-2xl opacity-80" />

                <figure className="glass-card arch-crown relative overflow-hidden rounded-b-3xl border border-gold-ornament/40 p-7 sm:p-10 shadow-2xl backdrop-blur-2xl text-center">
                  
                  {/* Subtle Geometric Pattern Overlay */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath fill='%23d4af37' d='M40 0L80 40L40 80L0 40z'/%3E%3C/svg%3E")`,
                      backgroundSize: '40px 40px'
                    }}
                  />

                  <div className="relative z-10">
                    <span className="inline-block rounded-full border border-gold-ornament/40 bg-gold-soft/40 dark:bg-gold-soft/20 px-4 py-1.5 text-xs font-semibold text-amber-900 dark:text-gold-ink tracking-wider uppercase mb-4 shadow-sm backdrop-blur-md">
                      ঐশী আরোগ্য ও রহমত
                    </span>

                    {/* High-Contrast Crisp Arabic Calligraphy */}
                    <p dir="rtl" lang="ar" className="type-ayah font-arabic text-3xl sm:text-4xl lg:text-5xl leading-relaxed my-5 text-emerald-950 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-yellow-400 dark:via-amber-300 dark:to-yellow-500 antialiased drop-shadow-sm dark:drop-shadow-md">
                      وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ
                    </p>

                    <div className="ornament-rule mx-auto my-6 w-36 sm:w-48" aria-hidden="true" />

                    <figcaption className="space-y-3">
                      <p className="type-body-lg text-ink-body font-medium leading-relaxed">
                        &ldquo;আমি কুরআনে এমন বিষয় নাযিল করি যা মুমিনদের জন্য আরোগ্য (শিফা) ও রহমত&rdquo;
                      </p>
                      <p className="type-citation text-amber-900 dark:text-gold-ink font-semibold">
                        — সূরা আল-ইসরা : ৮২
                      </p>
                    </figcaption>
                  </div>
                </figure>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Self Ruqyah Diagnosis Liquid Glass CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 lg:mt-10"
        >
          <div className="relative group rounded-3xl p-6 sm:p-8 lg:p-10 border border-emerald-300/60 dark:border-emerald-500/20 bg-white/70 dark:bg-zinc-950/80 shadow-xl dark:shadow-2xl backdrop-blur-2xl overflow-hidden">
            {/* Ambient Background Glow Highlights */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Top Glowing Glass Specular Hairline */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 dark:via-amber-400/40 to-transparent" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 relative z-10">
              {/* Left Side: Icon & Copy */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-105">
                  <Stethoscope className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
                </div>

                <div className="space-y-1.5 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 border border-amber-300/60 dark:border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-semibold tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> নতুন ফিচার
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-950 dark:text-gold-ink tracking-tight">
                    সেলফ রুকইয়াহ ডায়াগনোসিস
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
                    যাদু, জিন, বদনজর নাকি ওয়াসওয়াসা? আপনার শারীরিক ও মানসিক সমস্যার প্রকৃত কারণ জানতে নিজে নিজেই পূর্ণাঙ্গ টেস্ট করুন।
                  </p>
                </div>
              </div>

              {/* Right Side: Pulsing Glowing CTA Button */}
              <div className="shrink-0 w-full sm:w-auto">
                <Link
                  href="/diagnosis"
                  className="relative inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 px-8 py-4 text-base font-bold text-white dark:text-zinc-950 shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
                >
                  {/* Subtle Pulse Glow Ring */}
                  <span className="absolute -inset-1 rounded-full bg-emerald-500/30 dark:bg-emerald-400/40 blur-md opacity-70 animate-pulse pointer-events-none -z-10" />
                  
                  <span>ফ্রি টেস্ট শুরু করুন</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Liquid Glass Contact & Info Strip */}
        <div className="mt-8 lg:mt-12">
          <div className="glass-panel rounded-2xl p-6 lg:p-8 border border-white/40 dark:border-white/10 shadow-xl backdrop-blur-2xl">
            <motion.dl 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0 lg:divide-x lg:divide-hairline"
            >
              {infoData.map((info) => (
                <motion.div key={info.title} variants={itemVariants} className="group lg:px-6 lg:first:pl-0 lg:last:pr-0">
                  <dt className="type-meta flex items-center gap-2 text-ink-muted">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-interactive transition-transform group-hover:scale-110 shadow-sm">
                      <info.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <span>{info.title}</span>
                  </dt>
                  <dd className="type-heading-sm mt-2 text-ink-strong group-hover:text-interactive transition-colors">
                    {info.details}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>

      </div>
    </section>
  );
}
