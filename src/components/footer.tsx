"use client";

import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
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
    <footer className="relative bg-light-bg-alt1 dark:bg-slate-950 border-t border-light-border/50 dark:border-slate-800/50 overflow-hidden">
      
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-12"
        >
          {/* Brand Info */}
          <motion.div variants={fadeUpItem} className="col-span-2 md:col-span-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full" />
                <Image 
                  src="/logo.png" 
                  alt="Shifa Al Quran Logo" 
                  width={52} 
                  height={52} 
                  className="relative rounded-xl object-contain bg-light-bg-alt2 dark:bg-slate-900 p-1 shadow-sm border border-light-border dark:border-slate-800" 
                />
              </div>
              <h3 className="text-xl font-extrabold text-light-heading dark:text-slate-100">
                শিফা আল কুরআন
              </h3>
            </div>
            <p className="text-light-text dark:text-slate-400 text-[15px] leading-relaxed mb-8 flex-grow">
              কুরআনের আয়াতে আছে আরোগ্য ও প্রশান্তি। আমরা সুন্নাহ সম্মত উপায়ে রুকইয়াহ শারইয়াহ এর মাধ্যমে শারীরিক ও মানসিক সমস্যার চিকিৎসা প্রদান করে থাকি।
            </p>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com/shifaquran"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full bg-light-bg-alt2 dark:bg-slate-900 border border-light-border dark:border-slate-800 text-light-text transition-all hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.youtube.com/@ShifaAlQuran786"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full bg-light-bg-alt2 dark:bg-slate-900 border border-light-border dark:border-slate-800 text-light-text transition-all hover:bg-red-50 dark:hover:bg-slate-800 hover:border-red-200 dark:hover:border-red-900/50 hover:text-red-600 dark:hover:text-red-500 shadow-sm"
                aria-label="YouTube"
              >
                <FaYoutube className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUpItem} className="col-span-1">
            <h4 className="font-bold mb-4 md:mb-6 text-light-heading dark:text-slate-100 text-lg">গুরুত্বপূর্ণ লিংক</h4>
            <ul className="space-y-1 md:space-y-2 text-[15px] text-light-text dark:text-slate-400">
              {[
                { name: "আমাদের সম্পর্কে", href: "/about" },
                { name: "সেবাসমূহ", href: "/services" },
                { name: "চিকিৎসা পদ্ধতি", href: "/process" },
                { name: "অ্যাপয়েন্টমেন্ট", href: "/appointment" },
                { name: "ব্লগ", href: "/blog" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group relative inline-flex items-center hover:text-blue-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all duration-300 ease-out py-1 md:py-2">
                    <span className="w-0 h-0.5 bg-blue-600 dark:bg-amber-400 absolute left-0 bottom-1 transition-all group-hover:w-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={fadeUpItem} className="col-span-1">
            <h4 className="font-bold mb-4 md:mb-6 text-light-heading dark:text-slate-100 text-lg">আইনি তথ্য</h4>
            <ul className="space-y-1 md:space-y-2 text-[15px] text-light-text dark:text-slate-400">
              {[
                { name: "প্রাইভেসি পলিসি", href: "/privacy" },
                { name: "শর্তাবলী", href: "/terms" },
                { name: "সাধারণ জিজ্ঞাসা (FAQ)", href: "/faq" },
                { name: "রোগীদের নির্দেশনা", href: "/guidelines" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group relative inline-flex items-center hover:text-blue-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all duration-300 ease-out py-1 md:py-2">
                    <span className="w-0 h-0.5 bg-blue-600 dark:bg-amber-400 absolute left-0 bottom-1 transition-all group-hover:w-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUpItem} className="col-span-2 md:col-span-1">
            <h4 className="font-bold mb-4 md:mb-6 text-light-heading dark:text-slate-100 text-lg">যোগাযোগ</h4>
            <ul className="space-y-2 md:space-y-4 text-[15px] text-light-text dark:text-slate-400">
              <li className="flex items-center gap-3 group">
                <div className="h-9 w-9 md:h-8 md:w-8 rounded-full bg-blue-50/50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 border border-blue-100/50 dark:border-blue-800/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-amber-500" />
                </div>
                <span>#535/C Khilgaon, Dhaka</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="h-9 w-9 md:h-8 md:w-8 rounded-full bg-blue-50/50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 border border-blue-100/50 dark:border-blue-800/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                  <Phone className="h-4 w-4 text-blue-600 dark:text-amber-500" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <a href="tel:09639000999" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors inline-block">09639-000999</a>
                  <a href="tel:+8801840601484" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors inline-block">+88 01840601484</a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="h-9 w-9 md:h-8 md:w-8 rounded-full bg-blue-50/50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 border border-blue-100/50 dark:border-blue-800/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-amber-500" />
                </div>
                <a href="mailto:shifaalquran11@gmail.com" className="hover:text-blue-600 dark:hover:text-amber-400 transition-colors inline-block break-all">
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
          className="mt-16 pt-8 border-t border-light-border dark:border-slate-800 text-center text-sm text-light-text dark:text-slate-400"
        >
          <p>© {currentYear} Shifa Al Quran (শিফা আল কুরআন). All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
