"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star, Play, Music, X, ExternalLink } from "lucide-react";

/** Extract a YouTube video id from watch / youtu.be / shorts / embed / live URLs. */
function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;
      const match = parsed.pathname.match(/\/(?:shorts|embed|live)\/([A-Za-z0-9_-]{11})/);
      if (match) return match[1];
    }
  } catch {
    return null;
  }
  return null;
}

/** Extract a Google Drive file id from share / open / preview links. */
function getDriveFileId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("drive.google.com")) return null;
    const match = parsed.pathname.match(/\/file\/d\/([^/]+)/);
    if (match) return match[1];
    const id = parsed.searchParams.get("id");
    return id || null;
  } catch {
    return null;
  }
}

/** Facebook Reels and fb.watch links cannot be embedded reliably — they open on Facebook instead. */
function isFacebookEmbeddable(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("facebook.com") && !parsed.hostname.includes("fb.watch")) return false;
    if (parsed.hostname.includes("fb.watch")) return false;
    if (/\/reel(s)?\//.test(parsed.pathname)) return false;
    return true;
  } catch {
    return false;
  }
}

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
  const [activeVideo, setActiveVideo] = React.useState<{ url: string; name: string } | null>(null);

  // Close the popup with Escape, and lock background scroll while it is open.
  React.useEffect(() => {
    if (!activeVideo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeVideo]);

  const youtubeId = activeVideo ? getYouTubeId(activeVideo.url) : null;
  const driveFileId = activeVideo ? getDriveFileId(activeVideo.url) : null;
  const isDirectVideo = activeVideo ? /\.mp4(\?|#|$)/i.test(activeVideo.url) : false;

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
                    <button
                      type="button"
                      onClick={() => setActiveVideo({ url: t.video_url as string, name: t.customer_name })}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <Play className="w-4 h-4" /> ভিডিও দেখুন
                    </button>
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

      {/* Video popup: plays on this page instead of opening a new tab. */}
      {activeVideo ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.name} এর ভিডিও`}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="truncate text-sm font-semibold text-white">{activeVideo.name} এর অভিজ্ঞতা</p>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="বন্ধ করুন"
                className="shrink-0 rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {youtubeId ? (
              <iframe
                key={activeVideo.url}
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={`${activeVideo.name} এর ভিডিও`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full"
              />
            ) : driveFileId ? (
              <iframe
                key={activeVideo.url}
                src={`https://drive.google.com/file/d/${driveFileId}/preview`}
                title={`${activeVideo.name} এর ভিডিও`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="aspect-video w-full border-0"
              />
            ) : isDirectVideo ? (
              <video key={activeVideo.url} src={activeVideo.url} controls autoPlay className="aspect-video w-full" />
            ) : isFacebookEmbeddable(activeVideo.url) ? (
              <iframe
                key={activeVideo.url}
                src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(activeVideo.url)}&show_text=false&width=560`}
                title={`${activeVideo.name} এর ভিডিও`}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                scrolling="no"
                className="aspect-video w-full border-0"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
                <p className="text-base text-white/90">
                  এই ভিডিওটি এই পেজের ভেতরে চালানো যাচ্ছে না, এটি সরাসরি খুলে দেখতে হবে।
                </p>
                <a
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <ExternalLink className="h-4 w-4" /> ভিডিওটি খুলুন
                </a>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
