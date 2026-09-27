"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { 
  User, 
  Phone, 
  CalendarDays, 
  AlignLeft,
  CheckCircle2,
  CalendarHeart,
  ArrowRight,
  Loader2,
  AlertCircle,
  Clock,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "নাম কমপক্ষে ২ অক্ষরের হতে হবে" }),
  phone: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, { message: "সঠিক বাংলাদেশী ফোন নাম্বার দিন" }),
  whatsapp: z.string().optional(),
  date: z.string().min(1, { message: "তারিখ নির্বাচন করুন" }),
  time: z.string().min(1, { message: "সময় নির্বাচন করুন" }),
  problem: z.string().min(10, { message: "সমস্যার বিস্তারিত বিবরণ দিন (কমপক্ষে ১০ অক্ষর)" }),
});

type FormValues = z.infer<typeof formSchema>;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function AppointmentForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [appointmentId, setAppointmentId] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  // Auto-synced diagnosis data from search params or session
  const [diagnosisContext, setDiagnosisContext] = React.useState<{
    category: string;
    level: string;
    title: string;
    score: string;
    maxScore: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  // Load auto-synced diagnosis data
  React.useEffect(() => {
    const categoryParam = searchParams.get("category");
    const levelParam = searchParams.get("level");
    const titleParam = searchParams.get("title");
    const scoreParam = searchParams.get("score");
    const maxScoreParam = searchParams.get("maxScore");

    if (titleParam && levelParam) {
      const diagData = {
        category: categoryParam || "general",
        level: levelParam,
        title: titleParam,
        score: scoreParam || "0",
        maxScore: maxScoreParam || "0",
      };
      setDiagnosisContext(diagData);

      // Pre-fill problem field if empty
      const defaultProblemText = `[সেলফ রুকইয়াহ ডায়াগনোসিস ফলাফল সিঙ্কড]\nপরীক্ষা: ${titleParam}\nঝুঁকির মাত্রা: ${levelParam === 'high' ? 'উচ্চ ঝুঁকি' : levelParam === 'medium' ? 'মাঝারি ঝুঁকি' : 'স্বাভাবিক/মৃদু'}\nস্কোর: ${scoreParam}/${maxScoreParam}\nস্বাস্থ্যগত উপসর্গ ও অতিরিক্ত বিবরণ: `;
      
      setValue("problem", defaultProblemText);
    }
  }, [searchParams, setValue]);

  // Calculate progress
  // eslint-disable-next-line react-hooks/incompatible-library
  const formValues = watch();
  const fields = ["fullName", "phone", "date", "time", "problem"] as const;
  const completedFields = fields.filter(field => {
    const val = formValues[field];
    return val && val.length > 0 && !errors[field];
  }).length;
  const progress = (completedFields / fields.length) * 100;

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !anonKey) {
        throw new Error("সিস্টেম কনফিগারেশন ত্রুটি।");
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/submit-appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${anonKey}`,
          "apikey": anonKey,
        },
        body: JSON.stringify({
          ...data,
          diagnosisContext: diagnosisContext || undefined,
          type: "General",
          client: "website"
        }),
      });

      let result: { error?: string; appointmentId?: string } | null = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(result?.error || "নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।");
      }

      setAppointmentId(result?.appointmentId ?? null);
      setIsSuccess(true);
      reset();
    } catch (error: unknown) {
      console.error("Submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "অজানা ত্রুটি। আবার চেষ্টা করুন।";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-[2rem] border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-surface-raised to-emerald-500/5 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-12"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-inner">
          <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
        </div>
        <span className="mt-6 inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          অনুরোধ সফল হয়েছে
        </span>
        <h3 className="type-heading mt-4 text-2xl font-bold text-ink-strong sm:text-3xl">
          আপনার অ্যাপয়েন্টমেন্ট সফলভাবে গৃহীত হয়েছে!
        </h3>
        <p className="type-body-lg mt-4 text-ink-body max-w-lg mx-auto">
          আপনার রেফারেন্স আইডি: <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{appointmentId || "SAQ-PENDING"}</span>
        </p>
        <p className="type-body mt-2 text-ink-muted max-w-md mx-auto">
          আমাদের প্রতিনিধি দ্রুত আপনার সাথে ফোনে যোগাযোগ করে সময় ও মাধ্যম নিশ্চিত করবেন ইনশাআল্লাহ।
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setIsSuccess(false)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-hairline bg-surface-base px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-ink-strong transition-all hover:bg-surface-sunken min-h-[44px]"
          >
            অন্য একটি অ্যাপয়েন্টমেন্ট করুন
          </button>
          
          <a
            href={`https://wa.me/8801353301772?text=${encodeURIComponent(
              `আসসালামু আলাইকুম, আমি অ্যাপয়েন্টমেন্ট কনফার্মেশন পেয়েছি। আইডি: ${appointmentId || "SAQ"}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold shadow-md transition-all min-h-[44px]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span>হোয়াটসঅ্যাপে যোগাযোগ</span>
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Auto-Synced Diagnosis Banner */}
      {diagnosisContext && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-r from-emerald-500/15 via-amber-500/10 to-teal-500/15 border border-emerald-500/30 dark:border-emerald-500/20 backdrop-blur-xl shadow-lg relative overflow-hidden"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-zinc-950 flex items-center justify-center shrink-0 shadow-md">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="space-y-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-[11px] sm:text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" /> <span className="truncate">সেলফ ডায়াগনোসিস সিঙ্কড</span>
              </div>
              <h4 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-zinc-100 truncate">
                {diagnosisContext.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                ঝুঁকির মাত্রা: <span className="font-bold text-emerald-700 dark:text-emerald-400">{diagnosisContext.level === "high" ? "উচ্চ ঝুঁকি" : diagnosisContext.level === "medium" ? "মাঝারি ঝুঁকি" : "স্বাভাবিক/মৃদু"}</span> (স্কোর: {diagnosisContext.score}/{diagnosisContext.maxScore})
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Appointment Form */}
      <motion.form 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit(onSubmit)}
        className="glass-card rounded-2xl sm:rounded-[2.5rem] border border-white/50 dark:border-white/10 bg-surface-raised/80 p-4 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-2xl relative overflow-hidden space-y-5 sm:space-y-8"
      >
        {/* Subtle Top Glass Hairline */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

        {/* Progress Bar Header */}
        <motion.div variants={fadeUp} className="space-y-3 pb-6 border-b border-hairline/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarHeart className="h-5 w-5 text-interactive" />
              <span className="type-subtitle text-ink-strong">অ্যাপয়েন্টমেন্ট তথ্য</span>
            </div>
            <span className="type-citation text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {Math.round(progress)}% সম্পন্ন
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-surface-sunken overflow-hidden p-0.5 border border-hairline">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {submitError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 p-4 text-sm font-medium text-rose-600 dark:text-rose-400"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{submitError}</span>
          </motion.div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Full Name */}
          <motion.div variants={fadeUp} className="space-y-2">
            <label htmlFor="fullName" className="type-meta block text-ink-strong font-medium">
              আপনার নাম <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-muted">
                <User className="h-4 w-4" />
              </div>
              <input
                id="fullName"
                type="text"
                placeholder="যেমন: মুহাম্মদ আব্দুল্লাহ"
                {...register("fullName")}
                className={cn(
                  "w-full rounded-xl border border-hairline bg-surface-base/80 py-3.5 pl-11 pr-4 text-sm text-ink-strong placeholder:text-ink-muted transition-all focus:border-interactive focus:bg-surface-raised focus:outline-none focus:ring-2 focus:ring-interactive/20",
                  errors.fullName && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                )}
              />
            </div>
            {errors.fullName && (
              <p className="type-citation text-xs text-rose-500 font-medium">{errors.fullName.message}</p>
            )}
          </motion.div>

          {/* Phone Number */}
          <motion.div variants={fadeUp} className="space-y-2">
            <label htmlFor="phone" className="type-meta block text-ink-strong font-medium">
              মোবাইল নাম্বার <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-muted">
                <Phone className="h-4 w-4" />
              </div>
              <input
                id="phone"
                type="tel"
                placeholder="01XXXXXXXXX"
                {...register("phone")}
                className={cn(
                  "w-full rounded-xl border border-hairline bg-surface-base/80 py-3.5 pl-11 pr-4 text-sm text-ink-strong placeholder:text-ink-muted transition-all focus:border-interactive focus:bg-surface-raised focus:outline-none focus:ring-2 focus:ring-interactive/20",
                  errors.phone && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                )}
              />
            </div>
            {errors.phone && (
              <p className="type-citation text-xs text-rose-500 font-medium">{errors.phone.message}</p>
            )}
          </motion.div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Preferred Date */}
          <motion.div variants={fadeUp} className="space-y-2">
            <label htmlFor="date" className="type-meta block text-ink-strong font-medium">
              পছন্দের তারিখ <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-muted">
                <CalendarDays className="h-4 w-4" />
              </div>
              <input
                id="date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                {...register("date")}
                className={cn(
                  "w-full rounded-xl border border-hairline bg-surface-base/80 py-3.5 pl-11 pr-4 text-sm text-ink-strong transition-all focus:border-interactive focus:bg-surface-raised focus:outline-none focus:ring-2 focus:ring-interactive/20",
                  errors.date && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                )}
              />
            </div>
            {errors.date && (
              <p className="type-citation text-xs text-rose-500 font-medium">{errors.date.message}</p>
            )}
          </motion.div>

          {/* Preferred Time Slot */}
          <motion.div variants={fadeUp} className="space-y-2">
            <label htmlFor="time" className="type-meta block text-ink-strong font-medium">
              পছন্দের সময় <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-muted">
                <Clock className="h-4 w-4" />
              </div>
              <select
                id="time"
                {...register("time")}
                className={cn(
                  "w-full rounded-xl border border-hairline bg-surface-base/80 py-3.5 pl-11 pr-4 text-sm text-ink-strong transition-all focus:border-interactive focus:bg-surface-raised focus:outline-none focus:ring-2 focus:ring-interactive/20",
                  errors.time && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                )}
              >
                <option value="">সময় নির্বাচন করুন</option>
                <option value="10:00 AM - 12:00 PM">সকাল ১০:০০ - দুপুর ১২:০০</option>
                <option value="03:00 PM - 05:00 PM">বিকাল ৩:০০ - বিকাল ৫:০০</option>
                <option value="06:00 PM - 08:00 PM">সন্ধ্যা ৬:০০ - রাত ৮:০০</option>
              </select>
            </div>
            {errors.time && (
              <p className="type-citation text-xs text-rose-500 font-medium">{errors.time.message}</p>
            )}
          </motion.div>
        </div>

        {/* Problem Description */}
        <motion.div variants={fadeUp} className="space-y-2">
          <label htmlFor="problem" className="type-meta block text-ink-strong font-medium">
            সমস্যার সংক্ষিপ্ত বিবরণ <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute top-4 left-0 flex items-start pl-4 text-ink-muted">
              <AlignLeft className="h-4 w-4" />
            </div>
            <textarea
              id="problem"
              rows={4}
              placeholder="আপনার শারীরিক ও আত্মিক সমস্যা বিস্তারিত লিখুন..."
              {...register("problem")}
              className={cn(
                "w-full rounded-xl border border-hairline bg-surface-base/80 py-3.5 pl-11 pr-4 text-sm text-ink-strong placeholder:text-ink-muted transition-all focus:border-interactive focus:bg-surface-raised focus:outline-none focus:ring-2 focus:ring-interactive/20",
                errors.problem && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
              )}
            />
          </div>
          {errors.problem && (
            <p className="type-citation text-xs text-rose-500 font-medium">{errors.problem.message}</p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={fadeUp} className="pt-2 sm:pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full items-center justify-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 dark:from-emerald-600 dark:to-emerald-500 py-3.5 sm:py-4 px-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-emerald-900/30 transition-all hover:scale-[1.01] hover:shadow-2xl active:scale-[0.99] disabled:opacity-50 min-h-[48px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin shrink-0" />
                <span>প্রসেসিং হচ্ছে...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-5 w-5 shrink-0" />
                <span>অ্যাপয়েন্টমেন্ট বুকিং সম্পন্ন করুন</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" />
              </>
            )}
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}
