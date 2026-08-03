import * as React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, HeartPulse, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 pt-24 pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
        <div className="absolute top-0 right-0 h-96 w-96 -translate-y-12 translate-x-1/3 rounded-full bg-emerald-300 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 translate-y-1/3 -translate-x-1/3 rounded-full bg-emerald-500 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            <Sparkles className="h-4 w-4" />
            <span>কুরআন ও সুন্নাহ ভিত্তিক চিকিৎসা</span>
          </div>
          
          <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            কুরআনের আয়াতে আছে <span className="text-emerald-600 dark:text-emerald-400">আরোগ্য ও প্রশান্তি</span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            শিফা আল কুরআন - এ আমরা সুন্নাহ সম্মত উপায়ে রুকইয়াহ শারইয়াহ এর মাধ্যমে জাদুটোনা, বদনজর, জিনগত সমস্যা এবং বিভিন্ন শারীরিক ও মানসিক সমস্যার চিকিৎসা প্রদান করে থাকি।
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-emerald-600 px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-emerald-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              অ্যাপয়েন্টমেন্ট নিন
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/process"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-md border-2 border-emerald-200 bg-transparent px-8 text-base font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              চিকিৎসা পদ্ধতি সম্পর্কে জানুন
            </Link>
          </div>
        </div>

        {/* Highlight features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "১০০% সুন্নাহ সম্মত",
              description: "কোনো প্রকার শির্ক বা বিদআত ছাড়া সম্পূর্ণ কোরআন ও হাদিসের আলোকে চিকিৎসা।",
              icon: ShieldCheck,
            },
            {
              title: "মানসিক প্রশান্তি",
              description: "দুশ্চিন্তা, হতাশা এবং মানসিক অস্থিরতা দূর করতে রুকইয়াহ কার্যকরী।",
              icon: HeartPulse,
            },
            {
              title: "অভিজ্ঞ রাকি",
              description: "আমাদের রাকিগণ সুদীর্ঘ সময় ধরে অত্যন্ত বিশ্বস্ততার সাথে চিকিৎসা প্রদান করছেন।",
              icon: Sparkles,
            }
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/50 p-3 text-emerald-600 dark:text-emerald-400">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
