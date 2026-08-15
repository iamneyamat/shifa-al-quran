"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
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
  MessageCircle
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
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [appointmentId, setAppointmentId] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

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
          type: "General",
          client: "website"
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।");
      }

      setAppointmentId(result.appointmentId);
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
        className="text-center py-10 md:py-20 flex flex-col items-center justify-center min-h-[500px]"
      >
        <div className="relative">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="icon-container-premium w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-8 relative z-10 mx-auto"
          >
            <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-extrabold text-light-heading dark:text-white mb-4 tracking-tight"
        >
          আলহামদুলিল্লাহ!
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-light-text dark:text-slate-300 max-w-md mx-auto mb-6 leading-relaxed"
        >
          আপনার অ্যাপয়েন্টমেন্ট সফলভাবে গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি দ্রুতই আপনার সাথে যোগাযোগ করবেন ইনশাআল্লাহ।
        </motion.p>
        
        {appointmentId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-10 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/50"
          >
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1 font-medium">অ্যাপয়েন্টমেন্ট আইডি</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 tracking-wider">{appointmentId}</p>
            <p className="text-xs text-emerald-500 mt-2">ভবিষ্যতের যোগাযোগের জন্য আইডিটি সংরক্ষণ করুন</p>
          </motion.div>
        )}
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setIsSuccess(false)}
          className="btn-premium inline-flex items-center gap-2 h-14 rounded-full bg-emerald-600 px-8 font-bold text-white hover:bg-emerald-700"
        >
          <CalendarHeart className="w-5 h-5" />
          নতুন বুকিং করুন
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      
      {/* Progress Bar */}
      <div className="mb-10 md:mb-12">
        <div className="flex justify-between items-end mb-3">
          <span className="text-sm font-bold text-light-heading dark:text-slate-300 uppercase tracking-widest">পূরণের অগ্রগতি</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 md:h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
          />
        </div>
      </div>

      <motion.form 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6 md:space-y-8"
      >
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Name Field */}
          <motion.div variants={fadeUp} className="space-y-3 relative group">
            <label htmlFor="fullName" className="text-[15px] font-bold text-light-heading dark:text-slate-200 ml-1">
              সম্পূর্ণ নাম <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <User className="h-5 w-5" />
              </div>
              <input
                id="fullName"
                type="text"
                placeholder="আপনার নাম লিখুন"
                {...register("fullName")}
                className={cn(
                  "flex h-14 w-full rounded-2xl border bg-white/50 dark:bg-[#020817]/50 pl-11 pr-4 text-[15px] font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2",
                  errors.fullName ? "border-red-400 focus-visible:ring-red-400/20 bg-red-50/50 dark:bg-red-950/20" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
                )}
              />
              {formValues.fullName && !errors.fullName && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-500">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
            </div>
            <AnimatePresence>
              {errors.fullName && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-red-500 font-medium flex items-center gap-1.5 ml-1">
                  <AlertCircle className="w-4 h-4" /> {errors.fullName.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Phone Field */}
          <motion.div variants={fadeUp} className="space-y-3 relative group">
            <label htmlFor="phone" className="text-[15px] font-bold text-light-heading dark:text-slate-200 ml-1">
              ফোন নাম্বার <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <input
                id="phone"
                type="tel"
                placeholder="01XXXXXXXXX"
                {...register("phone")}
                className={cn(
                  "flex h-14 w-full rounded-2xl border bg-white/50 dark:bg-[#020817]/50 pl-11 pr-4 text-[15px] font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2",
                  errors.phone ? "border-red-400 focus-visible:ring-red-400/20 bg-red-50/50 dark:bg-red-950/20" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
                )}
              />
              {formValues.phone && !errors.phone && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-500">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
            </div>
            <AnimatePresence>
              {errors.phone && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-red-500 font-medium flex items-center gap-1.5 ml-1">
                  <AlertCircle className="w-4 h-4" /> {errors.phone.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* WhatsApp Field */}
          <motion.div variants={fadeUp} className="space-y-3 relative group">
            <label htmlFor="whatsapp" className="text-[15px] font-bold text-light-heading dark:text-slate-200 ml-1">
              হোয়াটসঅ্যাপ নাম্বার <span className="text-slate-400 font-normal text-sm">(ঐচ্ছিক)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </div>
              <input
                id="whatsapp"
                type="tel"
                placeholder="01XXXXXXXXX"
                {...register("whatsapp")}
                className={cn(
                  "flex h-14 w-full rounded-2xl border bg-white/50 dark:bg-[#020817]/50 pl-11 pr-4 text-[15px] font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2",
                  errors.whatsapp ? "border-red-400 focus-visible:ring-red-400/20 bg-red-50/50 dark:bg-red-950/20" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
                )}
              />
            </div>
            <AnimatePresence>
              {errors.whatsapp && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-red-500 font-medium flex items-center gap-1.5 ml-1">
                  <AlertCircle className="w-4 h-4" /> {errors.whatsapp.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Time Field */}
          <motion.div variants={fadeUp} className="space-y-3 relative group">
            <label htmlFor="time" className="text-[15px] font-bold text-light-heading dark:text-slate-200 ml-1">
              সম্ভাব্য সময় <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="time"
                {...register("time")}
                className={cn(
                  "flex h-14 w-full rounded-2xl border bg-white/50 dark:bg-[#020817]/50 px-4 text-[15px] font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 appearance-none",
                  errors.time ? "border-red-400 focus-visible:ring-red-400/20 bg-red-50/50 dark:bg-red-950/20" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
                )}
              >
                <option value="">নির্বাচন করুন</option>
                <option value="Morning">সকাল (১০টা - দুপুর ১টা)</option>
                <option value="Afternoon">বিকাল (৩টা - সন্ধ্যা ৬টা)</option>
                <option value="Evening">সন্ধ্যা (৭টা - রাত ১০টা)</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <AnimatePresence>
              {errors.time && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-red-500 font-medium flex items-center gap-1.5 ml-1">
                  <AlertCircle className="w-4 h-4" /> {errors.time.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          
        </div>

        {/* Date Field */}
        <motion.div variants={fadeUp} className="space-y-3 relative group">
          <label htmlFor="date" className="text-[15px] font-bold text-light-heading dark:text-slate-200 ml-1">
            সম্ভাব্য তারিখ <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <CalendarDays className="h-5 w-5" />
            </div>
            <input
              id="date"
              type="date"
              {...register("date")}
              className={cn(
                "flex h-14 w-full rounded-2xl border bg-white/50 dark:bg-[#020817]/50 pl-11 pr-4 text-[15px] font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2",
                errors.date ? "border-red-400 focus-visible:ring-red-400/20 bg-red-50/50 dark:bg-red-950/20" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
              )}
            />
          </div>
          <AnimatePresence>
            {errors.date && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-red-500 font-medium flex items-center gap-1.5 ml-1">
                <AlertCircle className="w-4 h-4" /> {errors.date.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Problem Field */}
        <motion.div variants={fadeUp} className="space-y-3 relative group">
          <label htmlFor="problem" className="text-[15px] font-bold text-light-heading dark:text-slate-200 ml-1">
            সমস্যার বিবরণ <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
              <AlignLeft className="h-5 w-5" />
            </div>
            <textarea
              id="problem"
              rows={5}
              placeholder="আপনার সমস্যার বিস্তারিত লিখুন..."
              {...register("problem")}
              className={cn(
                "flex w-full rounded-2xl border bg-white/50 dark:bg-[#020817]/50 pl-11 pr-4 py-4 text-[15px] font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 resize-none",
                errors.problem ? "border-red-400 focus-visible:ring-red-400/20 bg-red-50/50 dark:bg-red-950/20" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
              )}
            />
          </div>
          <AnimatePresence>
            {errors.problem && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-red-500 font-medium flex items-center gap-1.5 ml-1">
                <AlertCircle className="w-4 h-4" /> {errors.problem.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Error Alert */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-red-700 dark:text-red-400 font-bold mb-1">দুঃখিত, সমস্যা হয়েছে</h4>
                <p className="text-sm text-red-600 dark:text-red-300">{submitError}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div variants={fadeUp} className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-premium group relative flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 text-lg font-bold text-white hover:from-emerald-700 hover:to-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>প্রসেস হচ্ছে...</span>
              </>
            ) : (
              <>
                <span>অ্যাপয়েন্টমেন্ট নিশ্চিত করুন</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
            
            {/* Shimmer effect on button */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
          </button>
        </motion.div>
        
      </motion.form>
    </div>
  );
}
