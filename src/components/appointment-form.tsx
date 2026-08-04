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
  UserPlus, 
  AlignLeft,
  CheckCircle2,
  CalendarHeart,
  ArrowRight,
  Loader2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "নাম কমপক্ষে ২ অক্ষরের হতে হবে" }),
  phone: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, { message: "সঠিক বাংলাদেশী ফোন নাম্বার দিন" }),
  age: z.string().min(1, { message: "বয়স উল্লেখ করুন" }),
  gender: z.enum(["male", "female"], { message: "লিঙ্গ নির্বাচন করুন" }),
  problem: z.string().min(10, { message: "সমস্যার বিস্তারিত বিবরণ দিন (কমপক্ষে ১০ অক্ষর)" }),
  date: z.string().min(1, { message: "তারিখ নির্বাচন করুন" }),
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
  const formValues = watch();
  const fields = ["name", "phone", "age", "gender", "date", "problem"] as const;
  const completedFields = fields.filter(field => {
    const val = formValues[field];
    return val && val.length > 0 && !errors[field];
  }).length;
  const progress = (completedFields / fields.length) * 100;

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
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
            className="w-24 h-24 md:w-32 md:h-32 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-8 relative z-10 mx-auto"
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
          className="text-lg md:text-xl text-light-text dark:text-slate-300 max-w-md mx-auto mb-10 leading-relaxed"
        >
          আপনার অ্যাপয়েন্টমেন্ট রিকোয়েস্ট সফলভাবে জমা হয়েছে। আমাদের প্রতিনিধি দ্রুতই আপনার সাথে যোগাযোগ করবেন ইনশাআল্লাহ।
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setIsSuccess(false)}
          className="inline-flex items-center gap-2 h-14 rounded-full bg-emerald-600 px-8 font-bold text-white transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-95"
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
            <label htmlFor="name" className="text-[15px] font-bold text-light-heading dark:text-slate-200 ml-1">
              সম্পূর্ণ নাম <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <User className="h-5 w-5" />
              </div>
              <input
                id="name"
                type="text"
                placeholder="আপনার নাম লিখুন"
                {...register("name")}
                className={cn(
                  "flex h-14 w-full rounded-2xl border bg-white/50 dark:bg-[#020817]/50 pl-11 pr-4 text-[15px] font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2",
                  errors.name ? "border-red-400 focus-visible:ring-red-400/20 bg-red-50/50 dark:bg-red-950/20" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
                )}
              />
              {formValues.name && !errors.name && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-500">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
            </div>
            <AnimatePresence>
              {errors.name && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-red-500 font-medium flex items-center gap-1.5 ml-1">
                  <AlertCircle className="w-4 h-4" /> {errors.name.message}
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

          {/* Age Field */}
          <motion.div variants={fadeUp} className="space-y-3 relative group">
            <label htmlFor="age" className="text-[15px] font-bold text-light-heading dark:text-slate-200 ml-1">
              বয়স <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <UserPlus className="h-5 w-5" />
              </div>
              <input
                id="age"
                type="number"
                placeholder="আপনার বয়স"
                {...register("age")}
                className={cn(
                  "flex h-14 w-full rounded-2xl border bg-white/50 dark:bg-[#020817]/50 pl-11 pr-4 text-[15px] font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2",
                  errors.age ? "border-red-400 focus-visible:ring-red-400/20 bg-red-50/50 dark:bg-red-950/20" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
                )}
              />
            </div>
            <AnimatePresence>
              {errors.age && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-red-500 font-medium flex items-center gap-1.5 ml-1">
                  <AlertCircle className="w-4 h-4" /> {errors.age.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Gender Field */}
          <motion.div variants={fadeUp} className="space-y-3 relative group">
            <label htmlFor="gender" className="text-[15px] font-bold text-light-heading dark:text-slate-200 ml-1">
              লিঙ্গ <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="gender"
                {...register("gender")}
                className={cn(
                  "flex h-14 w-full rounded-2xl border bg-white/50 dark:bg-[#020817]/50 px-4 text-[15px] font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 appearance-none",
                  errors.gender ? "border-red-400 focus-visible:ring-red-400/20 bg-red-50/50 dark:bg-red-950/20" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
                )}
              >
                <option value="">নির্বাচন করুন</option>
                <option value="male">পুরুষ</option>
                <option value="female">মহিলা</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            <AnimatePresence>
              {errors.gender && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-sm text-red-500 font-medium flex items-center gap-1.5 ml-1">
                  <AlertCircle className="w-4 h-4" /> {errors.gender.message}
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

        {/* Submit Button */}
        <motion.div variants={fadeUp} className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl hover:from-emerald-700 hover:to-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 overflow-hidden"
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
