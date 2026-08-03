"use client";

import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion, Variants } from "framer-motion";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
      
      {/* Background Decor (Matching Hero/Header aesthetic) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-300/10 dark:bg-blue-800/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-300/10 dark:bg-amber-700/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
        >
          {/* Brand Info */}
          <motion.div variants={fadeUpItem} className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full" />
                <Image 
                  src="/logo.png" 
                  alt="Shifa Al Quran Logo" 
                  width={52} 
                  height={52} 
                  className="relative rounded-xl object-contain bg-white dark:bg-slate-900 p-1 shadow-sm border border-slate-200 dark:border-slate-800" 
                />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                শিফা আল কুরআন
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed mb-8 flex-grow">
              কুরআনের আয়াতে আছে আরোগ্য ও প্রশান্তি। আমরা সুন্নাহ সম্মত উপায়ে রুকইয়াহ শারইয়াহ এর মাধ্যমে শারীরিক ও মানসিক সমস্যার চিকিৎসা প্রদান করে থাকি।
            </p>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com/shifaquran"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 transition-all hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/@ShifaAlQuran786"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 transition-all hover:bg-red-50 dark:hover:bg-slate-800 hover:border-red-200 dark:hover:border-red-900/50 hover:text-red-600 dark:hover:text-red-500 shadow-sm"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUpItem}>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-slate-100 text-lg">গুরুত্বপূর্ণ লিংক</h4>
            <ul className="space-y-3 text-[15px] text-slate-600 dark:text-slate-400">
              {[
                { name: "আমাদের সম্পর্কে", href: "/about" },
                { name: "সেবাসমূহ", href: "/services" },
                { name: "চিকিৎসা পদ্ধতি", href: "/process" },
                { name: "অ্যাপয়েন্টমেন্ট", href: "/appointment" },
                { name: "ব্লগ", href: "/blog" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group relative inline-flex items-center hover:text-blue-600 dark:hover:text-amber-400 transition-colors">
                    <span className="w-0 h-0.5 bg-blue-600 dark:bg-amber-400 absolute left-0 -bottom-1 transition-all group-hover:w-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={fadeUpItem}>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-slate-100 text-lg">আইনি তথ্য</h4>
            <ul className="space-y-3 text-[15px] text-slate-600 dark:text-slate-400">
              {[
                { name: "প্রাইভেসি পলিসি", href: "/privacy" },
                { name: "শর্তাবলী", href: "/terms" },
                { name: "সাধারণ জিজ্ঞাসা (FAQ)", href: "/faq" },
                { name: "রোগীদের নির্দেশনা", href: "/guidelines" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group relative inline-flex items-center hover:text-blue-600 dark:hover:text-amber-400 transition-colors">
                    <span className="w-0 h-0.5 bg-blue-600 dark:bg-amber-400 absolute left-0 -bottom-1 transition-all group-hover:w-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUpItem}>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-slate-100 text-lg">যোগাযোগ</h4>
            <ul className="space-y-5 text-[15px] text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3 group">
                <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-amber-500" />
                </div>
                <span className="mt-1">#535/C Khilgaon, Dhaka</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                  <Phone className="h-4 w-4 text-blue-600 dark:text-amber-500" />
                </div>
                <div className="flex flex-col mt-0.5 space-y-1">
                  <span className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors cursor-pointer">09639-000999</span>
                  <span className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors cursor-pointer">+88 01840601484</span>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-amber-500" />
                </div>
                <a href="mailto:shifaalquran11@gmail.com" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors">
                  shifaalquran11@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400"
        >
          <p>© {currentYear} Shifa Al Quran (শিফা আল কুরআন). All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
