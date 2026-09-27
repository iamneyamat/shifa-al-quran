"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { diagnosisCategories } from "../data/diagnosisData";
import { Option } from "../types";

export function DiagnosisQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryIdParam =
    searchParams.get("category") ||
    searchParams.get("categoryId") ||
    searchParams.get("type") ||
    "general";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const category = useMemo(() => {
    const found = diagnosisCategories.find((c) => c.id === categoryIdParam);
    if (found && found.isInteractiveTest && found.questions && found.questions.length > 0) {
      return found;
    }
    const fallback = diagnosisCategories.find(
      (c) => c.isInteractiveTest && c.questions && c.questions.length > 0
    );
    return fallback || diagnosisCategories[0];
  }, [categoryIdParam]);

  if (!category || !category.questions || category.questions.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="p-8 rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 max-w-md shadow-xl">
          <HelpCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mb-2">পরীক্ষণ পাওয়া যায়নি</h2>
          <p className="text-slate-600 dark:text-zinc-400 mb-6">
            অনুগ্রহ করে ডায়াগনোসিস পোর্টালে ফিরে গিয়ে একটি পরীক্ষা নির্বাচন করুন।
          </p>
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors shadow-lg shadow-emerald-900/20"
          >
            <ArrowLeft className="w-4 h-4" /> পোর্টালে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const questions = category.questions;
  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const getOptionIdFromWeight = (q: (typeof questions)[0], weight: number) => {
    const opt = q.options.find((o) => o.weight === weight);
    return opt ? opt.id : null;
  };

  const saveAndNavigate = (finalAnswers: Record<string, number>) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "ruqyah_diagnosis_session",
        JSON.stringify({
          categoryId: category.id,
          answers: finalAnswers,
          timestamp: new Date().toISOString(),
        })
      );
    }
    router.push(`/diagnosis/result?category=${category.id}`);
  };

  const handleSelectOption = (option: Option) => {
    setSelectedOptionId(option.id);
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: option.weight,
    };
    setAnswers(updatedAnswers);

    // Auto advance after brief micro-delay for visual feedback
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        const nextQId = questions[currentIndex + 1]?.id;
        setSelectedOptionId(
          nextQId && updatedAnswers[nextQId] !== undefined
            ? getOptionIdFromWeight(questions[currentIndex + 1], updatedAnswers[nextQId])
            : null
        );
      } else {
        // Final question answered: save state & navigate to result
        saveAndNavigate(updatedAnswers);
      }
    }, 280);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      const prevQId = questions[prevIdx]?.id;
      const existingWeight = answers[prevQId];
      if (existingWeight !== undefined) {
        setSelectedOptionId(getOptionIdFromWeight(questions[prevIdx], existingWeight));
      } else {
        setSelectedOptionId(null);
      }
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setSelectedOptionId(null);
  };

  return (
    <div className="relative min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden font-sans">
      {/* Background Animated Glowing Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/3 right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Navigation Top Header Bar */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors bg-white/80 dark:bg-white/5 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-200 dark:border-white/10 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> ক্যাটাগরি তালিকা
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-400 shadow-sm">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 dark:text-emerald-400" /> {category.badge}
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 sm:p-2 rounded-full bg-white/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10 shadow-sm"
              title="পুনরায় শুরু করুন"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar Header */}
        <div className="mb-6 sm:mb-8 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-2xl p-3.5 sm:p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-2.5 sm:mb-3">
            <span className="text-slate-900 dark:text-emerald-300 font-bold flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">{category.title}</span>
            </span>
            <span className="text-slate-600 dark:text-zinc-400 font-mono font-semibold text-xs sm:text-sm shrink-0">
              প্রশ্ন {currentIndex + 1} / {questions.length} ({progressPercent}%)
            </span>
          </div>

          {/* Liquid Glass Animated Progress Bar */}
          <div className="w-full h-2 sm:h-2.5 bg-slate-200/80 dark:bg-zinc-800/60 rounded-full overflow-hidden p-0.5 border border-slate-300/60 dark:border-white/10 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 dark:from-emerald-500 dark:via-teal-400 dark:to-amber-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Main Central Liquid Glass Question Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-zinc-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-xl dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-4 sm:p-8 lg:p-10 relative overflow-hidden"
            >
              {/* Subtle Decorative Arch Glow in Background */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Question Number Badge */}
              <div className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-400 text-[11px] sm:text-xs font-mono font-bold mb-3 sm:mb-4">
                প্রশ্ন 0{currentIndex + 1}
              </div>

              {/* Question Text */}
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-zinc-100 leading-relaxed mb-6 sm:mb-8">
                {currentQuestion.text}
              </h2>

              {/* Options Stack */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {currentQuestion.options.map((option) => {
                  const isSelected =
                    selectedOptionId === option.id ||
                    answers[currentQuestion.id] === option.weight;

                  return (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectOption(option)}
                      className={`w-full text-left p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group shadow-sm ${
                        isSelected
                          ? "bg-emerald-50 dark:bg-gradient-to-r dark:from-emerald-500/20 dark:to-teal-500/10 border-emerald-500 dark:border-emerald-400/60 shadow-md text-emerald-950 dark:text-emerald-100 font-bold"
                          : "bg-slate-50/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border-slate-200/80 dark:border-white/10 hover:border-emerald-500/50 text-slate-800 dark:text-zinc-200 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full flex items-center justify-center border transition-colors ${
                            isSelected
                              ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-500 dark:text-zinc-950"
                              : "border-slate-400 dark:border-zinc-500/40 group-hover:border-emerald-600 text-transparent"
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                        </div>
                        <span className="text-sm sm:text-lg leading-snug">
                          {option.label}
                        </span>
                      </div>

                      <span
                        className={`shrink-0 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border ${
                          isSelected
                            ? "bg-emerald-100 dark:bg-emerald-400/20 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-400/40 font-bold"
                            : "bg-slate-200/60 dark:bg-white/5 text-slate-700 dark:text-zinc-400 border-slate-300/80 dark:border-white/10 group-hover:border-emerald-500/30"
                        }`}
                      >
                        {option.weight === 2
                          ? "লক্ষণ বিদ্যমান"
                          : option.weight === 1
                          ? "মাঝে মধ্যে"
                          : "না"}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Card Stepper Footer Navigation */}
              <div className="flex items-center justify-between gap-3 pt-5 sm:pt-6 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all min-h-[40px] ${
                    currentIndex === 0
                      ? "opacity-40 cursor-not-allowed border-slate-300 text-slate-400 dark:border-zinc-700 dark:text-zinc-500"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border-slate-200 dark:border-white/10 text-slate-800 dark:text-zinc-300"
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> পূর্ববর্তী
                </button>

                <span className="text-xs text-slate-600 dark:text-zinc-500 font-mono hidden md:inline font-medium">
                  উত্তর নির্বাচন করলে স্বয়ংক্রিয়ভাবে পরবর্তী প্রশ্নে চলে যাবে
                </span>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => {
                      if (answers[currentQuestion.id] !== undefined) {
                        setCurrentIndex((prev) => prev + 1);
                      }
                    }}
                    disabled={answers[currentQuestion.id] === undefined}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md min-h-[40px] ${
                      answers[currentQuestion.id] !== undefined
                        ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-900/20"
                        : "opacity-40 cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-zinc-800 dark:text-zinc-500"
                    }`}
                  >
                    পরবর্তী <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => saveAndNavigate(answers)}
                    disabled={answers[currentQuestion.id] === undefined}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-lg min-h-[40px] ${
                      answers[currentQuestion.id] !== undefined
                        ? "bg-gradient-to-r from-emerald-600 to-amber-500 dark:from-emerald-500 dark:to-amber-500 text-white dark:text-zinc-950 hover:brightness-110 shadow-emerald-500/25"
                        : "opacity-40 cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-zinc-800 dark:text-zinc-500"
                    }`}
                  >
                    ফলাফল দেখুন <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
