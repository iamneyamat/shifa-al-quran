"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star, Play, Music } from "lucide-react";

export type Testimonial = {
  id: string;
  customer_name: string;
  location?: string | null;
  content: string;
  category?: string | null;
  rating?: number | null;
  is_featured?: boolean | null;
  media_type?: string | null;
  video_url?: string | null;
  image_url?: string | null;
  audio_url?: string | null;
};

export function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
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
      <div className="absolute top-0 left-0 w-[min(500px,120vw)] h-[500px] bg-emerald-400/10 dark:bg-emerald-900/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="icon-container-premium mb-6 inline-flex h-20 w-20 items-center justify-center rounded-[2rem] text-emerald-600 dark:text-emerald-400">
            <MessageSquareQuote className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-light-heading dark:text-white tracking-tight leading-tight mb-6">
            রোগীদের <span className="text-emerald-600 dark:text-emerald-400">মতামত</span>
          </h1>
          <p className="text-lg md:text-2xl text-light-text dark:text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
            শিফা আল কুরআন থেকে সেবা নেওয়া মানুষদের কিছু বাস্তব অভিজ্ঞতা।
          </p>
        </motion.div>

        {testimonials.length === 0 ? (
          <p className="text-center text-light-text dark:text-slate-300 text-lg">
            এখনও কোনো অভিজ্ঞতা প্রকাশ করা হয়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card flex flex-col h-full p-6 md:p-8 rounded-2xl md:rounded-[32px] relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {t.rating ? (
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= (t.rating as number) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                      />
                    ))}
                  </div>
                ) : null}
                <p className="text-light-text dark:text-slate-300 text-base md:text-lg leading-relaxed flex-grow italic mb-8 relative z-10">
                  &quot;{t.content}&quot;
                </p>
                {t.media_type === 'image' && t.image_url ? (
                  <div className="relative z-10 mb-6 overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.image_url} alt={t.customer_name} className="w-full h-auto object-cover" />
                  </div>
                ) : null}
                {t.media_type === 'video' && t.video_url ? (
                  <div className="relative z-10 mb-6">
                    <a
                      href={t.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <Play className="w-4 h-4" /> ভিডিও দেখুন
                    </a>
                  </div>
                ) : null}
                {t.media_type === 'audio' && t.audio_url ? (
                  <div className="relative z-10 mb-6">
                    <a
                      href={t.audio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <Music className="w-4 h-4" /> অডিও শুনুন
                    </a>
                  </div>
                ) : null}
                <div className="relative z-10 border-t border-light-border dark:border-slate-800/50 pt-6 mt-auto">
                  <p className="font-extrabold text-light-heading dark:text-white text-[17px] md:text-xl">{t.customer_name}</p>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
