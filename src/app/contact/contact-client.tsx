"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Phone, Mail, Clock, Send, 
  MessageCircle, PhoneCall, AlertCircle, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="bg-light-bg-main dark:bg-[#020817] min-h-screen font-sans relative overflow-hidden">
      
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

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
            <Phone className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-light-heading dark:text-white tracking-tight mb-6 md:mb-8">
            আমাদের সাথে <span className="text-emerald-600 dark:text-emerald-400">যোগাযোগ</span> করুন
          </h1>
          <p className="text-lg md:text-2xl text-light-text dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            যেকোনো জিজ্ঞাসা, পরামর্শ অথবা সিরিয়াল বুকিংয়ের জন্য আমাদের সাথে যোগাযোগ করুন। আমরা আপনার সেবায় সদা প্রস্তুত।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column: Contact Cards & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 md:space-y-8"
          >
            {/* Quick Actions (Call & WhatsApp) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <a href="tel:+8809639000999" className="group flex items-center p-6 bg-white dark:bg-slate-900/80 backdrop-blur-md border border-light-border dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-5 shadow-inner">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-light-text dark:text-slate-400 mb-1 uppercase tracking-wider">সরাসরি কল করুন</p>
                  <p className="text-xl font-extrabold text-light-heading dark:text-slate-100">09639-000999</p>
                </div>
              </a>
              
              <a href="https://wa.me/8801840601484" target="_blank" rel="noopener noreferrer" className="group flex items-center p-6 bg-white dark:bg-slate-900/80 backdrop-blur-md border border-light-border dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-14 w-14 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mr-5 shadow-inner">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-light-text dark:text-slate-400 mb-1 uppercase tracking-wider">হোয়াটসঅ্যাপ</p>
                  <p className="text-xl font-extrabold text-light-heading dark:text-slate-100">+880 1840-601484</p>
                </div>
              </a>
            </div>

            {/* Emergency & Details Card */}
            <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md border border-light-border dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <MapPin className="w-48 h-48" />
              </div>
              
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-light-border dark:border-slate-800/50">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-red-500">জরুরী প্রয়োজনে</h3>
                <span className="text-light-text dark:text-slate-400 text-sm ml-auto">২৪/৭ খোলা</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-light-heading dark:text-slate-200 mb-1">অফিসের ঠিকানা</h4>
                    <p className="text-light-text dark:text-slate-400 text-sm leading-relaxed">#535/C Khilgaon, Dhaka<br/>(বিস্তারিত জানতে কল করুন)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-light-heading dark:text-slate-200 mb-1">অফিস সময়সূচী</h4>
                    <p className="text-light-text dark:text-slate-400 text-sm leading-relaxed">শনি - বৃহস্পতি: সকাল ১০টা - রাত ৮টা<br/><span className="text-red-500 font-medium">শুক্রবার: বন্ধ</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-light-heading dark:text-slate-200 mb-1">ইমেইল</h4>
                    <p className="text-light-text dark:text-slate-400 text-sm leading-relaxed">shifaalquran11@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Google Map Container */}
            <div className="rounded-3xl overflow-hidden h-[300px] border border-light-border dark:border-slate-800 shadow-sm relative bg-slate-100 dark:bg-slate-800">
              {/* Note: This is an iframe pointing to Mirpur 10, Dhaka. You can replace the src with your actual Google Maps embed URL */}
              <iframe 
                src="https://maps.google.com/maps?q=Khilgaon,%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[20%] contrast-[1.1] dark:invert dark:grayscale-[50%] dark:hue-rotate-180"
              ></iframe>
            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="bg-white dark:bg-slate-900/80 backdrop-blur-3xl border border-light-border dark:border-slate-800 rounded-[40px] p-8 md:p-10 shadow-2xl h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <h2 className="text-2xl md:text-3xl font-bold text-light-heading dark:text-white mb-2 relative z-10">আমাদের মেসেজ দিন</h2>
              <p className="text-light-text dark:text-slate-400 mb-8 relative z-10">যেকোনো প্রশ্ন থাকলে সরাসরি এখানে লিখে পাঠাতে পারেন।</p>
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-64 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-6">
                    <Send className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-light-heading dark:text-white mb-2">মেসেজ পাঠানো হয়েছে!</h3>
                  <p className="text-light-text dark:text-slate-400">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো ইনশাআল্লাহ।</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="space-y-2 group">
                    <label htmlFor="name" className="text-[14px] font-bold text-light-heading dark:text-slate-300 ml-1">আপনার নাম</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="flex h-14 w-full rounded-2xl border border-light-border dark:border-slate-800 bg-slate-50 dark:bg-[#020817]/50 px-5 text-[15px] shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500" 
                      placeholder="নাম লিখুন" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2 group">
                    <label htmlFor="phone" className="text-[14px] font-bold text-light-heading dark:text-slate-300 ml-1">ফোন নাম্বার</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="flex h-14 w-full rounded-2xl border border-light-border dark:border-slate-800 bg-slate-50 dark:bg-[#020817]/50 px-5 text-[15px] shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500" 
                      placeholder="01XXXXXXXXX" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2 group">
                    <label htmlFor="message" className="text-[14px] font-bold text-light-heading dark:text-slate-300 ml-1">মেসেজ</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      className="flex w-full rounded-2xl border border-light-border dark:border-slate-800 bg-slate-50 dark:bg-[#020817]/50 px-5 py-4 text-[15px] shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 resize-none" 
                      placeholder="আপনার জিজ্ঞাসা বা বিস্তারিত লিখুন..." 
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="group relative flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-600 px-8 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-70 overflow-hidden mt-6"
                  >
                    {isSubmitting ? (
                      "পাঠানো হচ্ছে..."
                    ) : (
                      <>
                        <span>মেসেজ পাঠান</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
