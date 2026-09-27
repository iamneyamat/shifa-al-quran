"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  X,
  Headphones,
  Sparkles,
} from "lucide-react";
import { useAudio } from "../context/AudioContext";

export function GlobalAudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    sleepTimerMinutes,
    sleepTimerRemaining,
    togglePlay,
    seek,
    changeVolume,
    toggleMute,
    setSleepTimer,
    closePlayer,
  } = useAudio();

  const [showSleepDropdown, setShowSleepDropdown] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const formatTimerRemaining = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const sleepOptions = [
    { label: "বন্ধ", value: null },
    { label: "১৫ মিনিট", value: 15 },
    { label: "৩০ মিনিট", value: 30 },
    { label: "৪৫ মিনিট", value: 45 },
    { label: "৬০ মিনিট", value: 60 },
  ];

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          key="global-audio-player"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-3 sm:bottom-4 left-3 right-3 sm:left-6 sm:right-6 z-[var(--z-player)] pointer-events-auto max-w-4xl mx-auto"
        >
        <div className="relative rounded-2xl sm:rounded-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-2xl p-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-slate-900 dark:text-zinc-100 overflow-visible">
          {/* Subtle Top Specular Glass Line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

          {/* Top Row on Mobile / Left Section on Desktop */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-2.5 min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-zinc-950 flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30">
                <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />
                {isPlaying && (
                  <span className="absolute -inset-1 rounded-full bg-emerald-500/30 blur-sm animate-pulse pointer-events-none" />
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold truncate text-slate-900 dark:text-zinc-100">
                  {currentTrack.title}
                </span>
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-600 dark:text-zinc-400">
                  <span className="truncate">{currentTrack.category || "রুকইয়াহ অডিও"}</span>
                  {sleepTimerRemaining && (
                    <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px]">
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {formatTimerRemaining(sleepTimerRemaining)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile-only Quick Controls: Sleep + Close */}
            <div className="flex items-center gap-1.5 sm:hidden shrink-0">
              <button
                onClick={() => setShowSleepDropdown((prev) => !prev)}
                className={`p-1.5 rounded-full border transition-all ${
                  sleepTimerMinutes
                    ? "bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-500/20 dark:border-amber-500/40 dark:text-amber-300 font-bold"
                    : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300"
                }`}
                title="স্লিপ টাইমার"
              >
                <Clock className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={closePlayer}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                title="বন্ধ করুন"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center: Play/Pause & Seek Bar */}
          <div className="flex-1 w-full max-w-md flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={togglePlay}
              className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 flex items-center justify-center shadow-lg transition-transform active:scale-95"
              title={isPlaying ? "বিরতি" : "প্লে করুন"}
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />}
            </button>

            {/* Seek Bar Slider */}
            <div className="w-full flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono font-medium text-slate-600 dark:text-zinc-400">
              <span className="shrink-0">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400"
              />
              <span className="shrink-0">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Desktop Right Controls (Hidden on Mobile) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0 relative">
            {/* Sleep Timer Button */}
            <div className="relative">
              <button
                onClick={() => setShowSleepDropdown((prev) => !prev)}
                className={`p-2 rounded-full border transition-all ${
                  sleepTimerMinutes
                    ? "bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-500/20 dark:border-amber-500/40 dark:text-amber-300 font-bold"
                    : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 hover:text-emerald-700"
                }`}
                title="স্লিপ টাইমার"
              >
                <Clock className="w-4 h-4" />
              </button>

              {/* Sleep Dropdown Menu */}
              {showSleepDropdown && (
                <div className="absolute bottom-12 right-0 w-36 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-2xl p-2 z-50 text-xs">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 px-3 py-1 mb-1 border-b border-slate-100 dark:border-white/10 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> স্লিপ টাইমার
                  </div>
                  {sleepOptions.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => {
                        setSleepTimer(opt.value);
                        setShowSleepDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl transition-colors font-medium ${
                        sleepTimerMinutes === opt.value
                          ? "bg-emerald-100 text-emerald-900 font-bold dark:bg-emerald-500/20 dark:text-emerald-400"
                          : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-zinc-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Volume Button & Slider */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 hover:text-emerald-700 transition-colors"
                title={isMuted ? "আনমিউট" : "মিউট"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-500" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              {showVolumeSlider && (
                <div className="absolute bottom-12 right-0 w-28 p-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-xl z-50 flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => changeVolume(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400"
                  />
                </div>
              )}
            </div>

            {/* Close Player Button */}
            <button
              onClick={closePlayer}
              className="p-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              title="বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
