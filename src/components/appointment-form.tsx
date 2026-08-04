"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "নাম কমপক্ষে ২ অক্ষরের হতে হবে" }),
  phone: z.string().min(11, { message: "সঠিক ফোন নাম্বার দিন (যেমন: 01XXXXXXXXX)" }).max(14),
  age: z.string().min(1, { message: "বয়স উল্লেখ করুন" }),
  gender: z.enum(["male", "female"], { message: "লিঙ্গ নির্বাচন করুন" }),
  problem: z.string().min(10, { message: "সমস্যার বিস্তারিত বিবরণ দিন (কমপক্ষে ১০ অক্ষর)" }),
  date: z.string().min(1, { message: "তারিখ নির্বাচন করুন" }),
});

type FormValues = z.infer<typeof formSchema>;

export function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  if (isSuccess) {
    return (
      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-8 text-center border border-emerald-200 dark:border-emerald-800">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-800">
          <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-light-heading dark:text-white">অ্যাপয়েন্টমেন্ট সফল হয়েছে!</h3>
        <p className="text-light-text dark:text-slate-300">
          আপনার অনুরোধটি গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করে সময় নিশ্চিত করবেন।
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-6 font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          নতুন অ্যাপয়েন্টমেন্ট নিন
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-light-heading dark:text-slate-200">
            সম্পূর্ণ নাম <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="আপনার নাম লিখুন"
            {...register("name")}
            className={cn(
              "flex h-12 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
              errors.name ? "border-red-500 focus-visible:ring-red-500" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500"
            )}
          />
          {errors.name && (
            <p className="text-sm text-red-500 font-medium">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-light-heading dark:text-slate-200">
            ফোন নাম্বার <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="01XXXXXXXXX"
            {...register("phone")}
            className={cn(
              "flex h-12 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
              errors.phone ? "border-red-500 focus-visible:ring-red-500" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500"
            )}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 font-medium">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="age" className="text-sm font-medium text-light-heading dark:text-slate-200">
            বয়স <span className="text-red-500">*</span>
          </label>
          <input
            id="age"
            type="number"
            placeholder="আপনার বয়স"
            {...register("age")}
            className={cn(
              "flex h-12 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
              errors.age ? "border-red-500 focus-visible:ring-red-500" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500"
            )}
          />
          {errors.age && (
            <p className="text-sm text-red-500 font-medium">{errors.age.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="gender" className="text-sm font-medium text-light-heading dark:text-slate-200">
            লিঙ্গ <span className="text-red-500">*</span>
          </label>
          <select
            id="gender"
            {...register("gender")}
            className={cn(
              "flex h-12 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1",
              errors.gender ? "border-red-500 focus-visible:ring-red-500" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500"
            )}
          >
            <option value="">নির্বাচন করুন</option>
            <option value="male">পুরুষ</option>
            <option value="female">মহিলা</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-500 font-medium">{errors.gender.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium text-light-heading dark:text-slate-200">
          সম্ভাব্য তারিখ <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="date"
            type="date"
            {...register("date")}
            className={cn(
              "flex h-12 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1",
              errors.date ? "border-red-500 focus-visible:ring-red-500" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500"
            )}
          />
        </div>
        {errors.date && (
          <p className="text-sm text-red-500 font-medium">{errors.date.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="problem" className="text-sm font-medium text-light-heading dark:text-slate-200">
          সমস্যার বিবরণ <span className="text-red-500">*</span>
        </label>
        <textarea
          id="problem"
          rows={4}
          placeholder="আপনার সমস্যার বিস্তারিত লিখুন..."
          {...register("problem")}
          className={cn(
            "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1",
            errors.problem ? "border-red-500 focus-visible:ring-red-500" : "border-light-border dark:border-slate-800 focus-visible:ring-emerald-500"
          )}
        />
        {errors.problem && (
          <p className="text-sm text-red-500 font-medium">{errors.problem.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center rounded-md bg-emerald-600 px-8 text-base font-medium text-white shadow transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-700 disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            অপেক্ষা করুন...
          </>
        ) : (
          "অ্যাপয়েন্টমেন্ট নিশ্চিত করুন"
        )}
      </button>
    </form>
  );
}
