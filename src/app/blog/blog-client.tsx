"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Clock, User, ChevronRight, Search, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlogClient({ initialPosts, initialCategories }: { initialPosts: any[], initialCategories: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("সব");

  const categories = ["সব", ...initialCategories.map(c => c.name)];

  const formattedPosts = initialPosts.map(post => {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category?.name || 'Uncategorized',
      date: new Date(post.created_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: 'শিফা আল কুরআন',
      readTime: '৫ মিনিট', // Calculate if needed based on length
      isFeatured: post.featured,
      cover_image_url: post.cover_image_url
    }
  });

  const featuredPost = formattedPosts.find(post => post.isFeatured);
  
  // Filter out featured post if it's currently being shown at top
  const isDefaultView = searchQuery === "" && activeCategory === "সব";
  
  const displayPosts = formattedPosts.filter((post) => {
    if (isDefaultView && post.isFeatured) return false; // Don't show featured post twice in default view
    
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "সব" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-light-bg-main dark:bg-[#020817] py-12 sm:py-20 md:py-32 font-sans relative overflow-hidden">
      
      {/* Global Page Pattern Overlay */}
      <div 
        className="fixed inset-0 z-[5] opacity-[0.02] dark:opacity-[0.03] dark:invert pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20"
        >
          <div className="mb-4 sm:mb-6 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl sm:rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
            <BookOpen className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-light-heading dark:text-white mb-3 sm:mb-6">
            ব্লগ ও <span className="text-emerald-600 dark:text-emerald-400">আর্টিকেল</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-light-text dark:text-slate-300 leading-relaxed font-medium mb-6 sm:mb-10">
            রুকইয়াহ শারইয়াহ, সুন্নাহ এবং সুস্থতা নিয়ে আমাদের সর্বশেষ লেখাগুলো পড়ুন।
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-6 sm:mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="আর্টিকেল খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-12 sm:h-14 w-full rounded-full border border-light-border dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md pl-11 sm:pl-14 pr-4 sm:pr-6 text-sm sm:text-[15px] shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-light-heading dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm",
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

        {/* Featured Article */}
        {isDefaultView && featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-10 sm:mb-16 md:mb-24"
          >
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-[40px] border border-light-border dark:border-slate-800 shadow-xl overflow-hidden flex flex-col md:flex-row hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                <div className="md:w-1/2 relative h-52 sm:h-64 md:h-auto overflow-hidden bg-emerald-900/20">
                  {featuredPost.cover_image_url ? (
                    <img src={featuredPost.cover_image_url} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-emerald-900 flex items-center justify-center text-emerald-500">
                        <span className="text-2xl font-bold opacity-20">শিফা আল কুরআন</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-900/40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                    </>
                  )}
                </div>
                <div className="md:w-1/2 p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest shadow-sm">
                      {featuredPost.category}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/50 px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-widest shadow-sm">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-light-heading dark:text-white mb-3 sm:mb-6 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-light-text dark:text-slate-400 mb-6 sm:mb-8 text-sm sm:text-lg leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 sm:pt-6 border-t border-light-border dark:border-slate-800/50">
                    <div className="flex items-center gap-3 sm:gap-4 text-light-text dark:text-slate-400 text-xs sm:text-sm font-medium">
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {featuredPost.readTime}</div>
                      <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {featuredPost.author}</div>
                    </div>
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-emerald-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all text-emerald-600 shrink-0">
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Regular Blog Grid */}
        <div>
          {isDefaultView && <h3 className="text-xl sm:text-2xl font-bold text-light-heading dark:text-white mb-6 sm:mb-8 border-b border-light-border dark:border-slate-800 pb-3 sm:pb-4">সর্বশেষ লেখা</h3>}
          
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {displayPosts.map((post, idx) => (
                <motion.article 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  key={post.id} 
                  className="flex flex-col bg-white dark:bg-slate-900/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm border border-light-border dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-2 group"
                >
                  {/* Image Section */}
                  <Link href={`/blog/${post.slug}`} className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 block">
                    {post.cover_image_url ? (
                      <img src={post.cover_image_url} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="absolute inset-0 bg-emerald-900/10 flex items-center justify-center">
                        <span className="text-xl font-bold opacity-20 text-emerald-900 dark:text-emerald-500">শিফা আল কুরআন</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  </Link>

                  {/* Content Section */}
                  <div className="flex flex-col flex-grow p-5 sm:p-7">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        {post.category}
                      </span>
                      <div className="flex items-center text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs font-bold gap-1.5 uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-light-heading dark:text-slate-100 mb-2 sm:mb-3 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-light-text dark:text-slate-400 mb-4 sm:mb-6 line-clamp-3 text-xs sm:text-[15px] leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 sm:pt-5 border-t border-light-border dark:border-slate-800/50 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-light-text dark:text-slate-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                        {post.date}
                      </div>
                      
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold group-hover:translate-x-1 transition-transform">
                        পড়ুন <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {displayPosts.length === 0 && (
            <div className="text-center py-20 text-light-text dark:text-slate-400">
              দুঃখিত, কোনো আর্টিকেল পাওয়া যায়নি।
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
