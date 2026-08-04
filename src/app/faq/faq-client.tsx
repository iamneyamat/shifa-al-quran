"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown, Search, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "প্রাথমিক ধারণা",
    question: "রুকইয়াহ কী?",
    answer: "রুকইয়াহ হলো কোরআনের আয়াত, আল্লাহর সুন্দর নামসমূহ এবং রাসূল (সা.) থেকে বর্ণিত দোয়াসমূহের মাধ্যমে চিকিৎসা করা। এটি সম্পূর্ণ শরীয়াহ সম্মত এবং নিরাপদ।",
  },
  {
    category: "প্রস্তুতি ও নিয়মকানুন",
    question: "রুকইয়াহ করার জন্য কি বিশেষ কোনো প্রস্তুতির প্রয়োজন আছে?",
    answer: "হ্যাঁ, রুকইয়াহ করার আগে কিছু প্রস্তুতি নেওয়া জরুরি। যেমন- সঠিক নিয়ত করা, হালাল খাবার খাওয়া, পাঁচ ওয়াক্ত নামাজ পড়া এবং গুনাহ থেকে বেঁচে থাকা।",
  },
  {
    category: "চিকিৎসা পদ্ধতি",
    question: "জাদুটোনা বা জ্বিন আছরের চিকিৎসা কতদিন লাগতে পারে?",
    answer: "এটি সম্পূর্ণ রোগীর সমস্যার ধরন এবং আল্লাহর ইচ্ছার উপর নির্ভর করে। তবে নিয়মিত রুকইয়াহ এবং আমল করলে ইনশাআল্লাহ দ্রুত সুস্থতা লাভ করা সম্ভব।",
  },
  {
    category: "অন্যান্য",
    question: "আপনাদের চিকিৎসা ফি কত?",
    answer: "আমাদের নির্দিষ্ট কোনো ফি নেই (বা ফি সম্পর্কে বিস্তারিত জানতে আমাদের সাথে সরাসরি যোগাযোগ করুন)। আমরা সাধ্যমত সেবা দেওয়ার চেষ্টা করি।",
  },
  {
    category: "চিকিৎসা পদ্ধতি",
    question: "মহিলাদের রুকইয়াহ করার ব্যবস্থা আছে কি?",
    answer: "হ্যাঁ, মহিলাদের রুকইয়াহ করার সময় অবশ্যই তাদের সাথে একজন মাহরাম (যেমন- স্বামী, বাবা, ভাই বা ছেলে) থাকা বাধ্যতামূলক। পর্দা রক্ষা করে চিকিৎসা দেওয়া হয়।",
  }
];

const categories = ["সব", "প্রাথমিক ধারণা", "চিকিৎসা পদ্ধতি", "প্রস্তুতি ও নিয়মকানুন", "অন্যান্য"];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export function FaqClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("সব");

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "সব" || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-light-bg-main dark:bg-[#020817] min-h-screen relative font-sans overflow-hidden">
      
      {/* Global Page Pattern Overlay */}
      <div 
        className="fixed inset-0 z-[5] opacity-[0.02] dark:opacity-[0.03] dark:invert pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Soft Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 dark:bg-emerald-800/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-900/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-32">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
            <HelpCircle className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-light-heading dark:text-white tracking-tight mb-6 md:mb-8">
            সাধারণ <span className="text-emerald-600 dark:text-emerald-400">জিজ্ঞাসা</span> (FAQ)
          </h1>
          <p className="text-lg md:text-xl text-light-text dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium mb-10">
            রুকইয়াহ ও আমাদের চিকিৎসা পদ্ধতি সম্পর্কে আপনার মনে থাকা সাধারণ প্রশ্নগুলোর উত্তর এখানে দেওয়া হলো।
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-6 w-6" />
            </div>
            <input
              type="text"
              placeholder="আপনার প্রশ্নটি খুঁজুন..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(null); // Close accordion on new search
              }}
              className="flex h-16 w-full rounded-full border border-light-border dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md pl-14 pr-6 text-lg shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 text-light-heading dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[15px] font-bold transition-all duration-300 shadow-sm",
                  activeCategory === category
                    ? "bg-emerald-600 text-white shadow-emerald-600/30 dark:shadow-emerald-900/50 scale-105"
                    : "bg-white dark:bg-slate-900 text-light-text dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-light-border dark:border-slate-800"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Accordion List */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4 md:space-y-6 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <motion.div 
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    key={faq.question} 
                    className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-light-border dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex items-center justify-between w-full p-6 md:p-8 text-left focus:outline-none group"
                    >
                      <span className={cn(
                        "font-bold text-lg md:text-xl pr-6 transition-colors duration-300",
                        isOpen ? "text-emerald-700 dark:text-emerald-400" : "text-light-heading dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-300"
                      )}>
                        {faq.question}
                      </span>
                      <div className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
                        isOpen ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400" : "bg-light-bg-alt2 dark:bg-slate-800 text-slate-400 group-hover:bg-emerald-50 dark:group-hover:bg-slate-700 group-hover:text-emerald-500"
                      )}>
                        <ChevronDown 
                          className={cn(
                            "h-5 w-5 transition-transform duration-500",
                            isOpen ? "rotate-180" : ""
                          )} 
                        />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 text-[15px] md:text-[17px] text-light-text dark:text-slate-400 leading-relaxed border-t border-light-border/50 dark:border-slate-800/50 mt-2 mx-6 md:mx-8">
                            <div className="pt-6">
                              {faq.answer}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="inline-flex w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center mb-4 text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-light-heading dark:text-slate-200 mb-2">কোনো ফলাফল পাওয়া যায়নি</h3>
                <p className="text-light-text dark:text-slate-400">আপনার সার্চের সাথে মিলে এমন কোনো প্রশ্ন আমাদের ডাটাবেজে নেই। অন্য কিছু লিখে খুঁজুন।</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Still have questions? CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 bg-gradient-to-br from-emerald-600 to-blue-700 rounded-[40px] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">এখনো আপনার প্রশ্নের উত্তর পাননি?</h3>
            <p className="text-emerald-50 text-lg md:text-xl mb-8 opacity-90 max-w-xl mx-auto">
              আমাদের সাথে সরাসরি যোগাযোগ করুন অথবা অ্যাপয়েন্টমেন্ট বুক করুন। আমরা আপনাকে সাহায্য করতে প্রস্তুত।
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg w-full sm:w-auto"
              >
                অ্যাপয়েন্টমেন্ট নিন
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-black/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-full font-bold text-lg hover:bg-black/30 transition-colors shadow-lg w-full sm:w-auto"
              >
                যোগাযোগ করুন
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
