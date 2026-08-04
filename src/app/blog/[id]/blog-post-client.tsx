"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, User, ArrowLeft, Share2, MessageCircle, Link2, ChevronRight } from "lucide-react";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { BlogPost, blogPosts } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

export function BlogPostClient({ post }: { post: BlogPost }) {
  const [copied, setCopied] = React.useState(false);

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);
    
  if (relatedPosts.length === 0) {
    const fallbacks = blogPosts.filter(p => p.id !== post.id).slice(0, 3);
    relatedPosts.push(...fallbacks);
  }

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg-main dark:bg-[#020817] font-sans relative overflow-hidden">
      
      {/* Global Page Pattern Overlay */}
      <div 
        className="fixed inset-0 z-[5] opacity-[0.02] dark:opacity-[0.03] dark:invert pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M30 0L60 30L30 60L0 30z'/%3E%3Cpath stroke='%230f172a' stroke-width='1' fill='none' d='M0 0h60v60H0z' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Soft Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 dark:bg-emerald-800/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 z-10 px-4">
        <div className="container mx-auto max-w-4xl">
          
          <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold hover:-translate-x-1 transition-transform mb-8 md:mb-12">
            <ArrowLeft className="w-5 h-5" /> ব্লগে ফিরে যান
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6 md:mb-8">
              <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-4 py-1.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest shadow-sm">
                {post.category}
              </span>
              <span className="text-light-text dark:text-slate-400 text-sm font-bold uppercase tracking-wider">{post.date}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-light-heading dark:text-white leading-tight md:leading-tight mb-8">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-light-text dark:text-slate-400 font-medium pb-8 border-b border-light-border dark:border-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">লেখক</div>
                  <div className="text-light-heading dark:text-slate-200">{post.author}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">পড়ার সময়</div>
                  <div className="text-light-heading dark:text-slate-200">{post.readTime}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content & Sidebar */}
      <div className="container relative z-10 mx-auto px-4 max-w-4xl pb-24">
        
        {/* Cover Image Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full h-64 md:h-96 rounded-[32px] md:rounded-[40px] bg-slate-200 dark:bg-slate-800 mb-12 md:mb-16 overflow-hidden relative shadow-xl"
        >
          <div className="absolute inset-0 bg-emerald-900 flex items-center justify-center text-emerald-500">
            <span className="text-3xl font-bold opacity-20">শিফা আল কুরআন</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent mix-blend-overlay" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Article Body */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-1 prose prose-lg md:prose-xl dark:prose-invert prose-emerald max-w-none prose-headings:font-bold prose-a:text-emerald-600 dark:prose-a:text-emerald-400 hover:prose-a:text-emerald-500"
          >
            <div className="text-xl md:text-2xl text-light-text dark:text-slate-300 leading-relaxed font-medium mb-10 italic border-l-4 border-emerald-500 pl-6">
              {post.excerpt}
            </div>
            
            {/* Simple Markdown Renderer for the `content` string */}
            <div className="space-y-6 text-light-text dark:text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\n\n/g, '</p><p>')
                .replace(/### (.*)/g, '<h3 class="text-2xl font-bold text-light-heading dark:text-white mt-10 mb-4">$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-light-heading dark:text-white">$1</strong>')
                .replace(/^(.+)/, '<p>$1') + '</p>'
            }} />
          </motion.article>
          
          {/* Share Sidebar */}
          <div className="lg:w-24 flex-shrink-0">
            <div className="sticky top-32 flex lg:flex-col items-center gap-4 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[32px] border border-light-border dark:border-slate-800 shadow-lg justify-center">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 hidden lg:block text-center mt-2">শেয়ার<br/>করুন</div>
              
              <button className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/50 dark:hover:text-blue-400 flex items-center justify-center transition-colors">
                <FaFacebook className="w-5 h-5" />
              </button>
              
              <button className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 hover:text-sky-600 dark:hover:bg-sky-900/50 dark:hover:text-sky-400 flex items-center justify-center transition-colors">
                <FaTwitter className="w-5 h-5" />
              </button>
              
              <button className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900/50 dark:hover:text-green-400 flex items-center justify-center transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </button>
              
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden lg:block" />
              <div className="w-6 h-px bg-slate-200 dark:bg-slate-700 block lg:hidden" />
              
              <button onClick={handleCopyLink} className="relative w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/50 dark:hover:text-emerald-400 flex items-center justify-center transition-colors">
                <Link2 className="w-5 h-5" />
                {copied && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">Copied!</span>}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Related Posts */}
      <div className="border-t border-light-border dark:border-slate-800 bg-light-bg-alt1 dark:bg-slate-900/50 py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-extrabold text-light-heading dark:text-white mb-10 text-center">সম্পর্কিত লেখাগুলো</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id} className="group block">
                <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm border border-light-border dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col">
                  
                  <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-900/10 flex items-center justify-center">
                      <span className="text-xl font-bold opacity-20 text-emerald-900 dark:text-emerald-500">শিফা আল কুরআন</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{relatedPost.category}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{relatedPost.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-light-heading dark:text-slate-100 mb-3 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    
                    <div className="mt-auto pt-4 border-t border-light-border dark:border-slate-800/50 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-bold">{relatedPost.date}</span>
                      <ChevronRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
