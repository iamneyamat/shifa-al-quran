import * as React from "react";
import { ClipboardList, PhoneCall, HeartHandshake } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      title: "সমস্যা চিহ্নিতকরণ",
      description: "প্রথমে রোগীর সমস্যাগুলো মনোযোগ দিয়ে শোনা হয় এবং কোরআন সুন্নাহর আলোকে সমস্যার মূল কারণ চিহ্নিত করা হয়।",
      icon: ClipboardList,
    },
    {
      title: "পরামর্শ ও নির্দেশনা",
      description: "সমস্যা অনুযায়ী রোগীকে সঠিক আমল ও রুকইয়াহর গাইডলাইন দেওয়া হয় যা তাকে মেনে চলতে হয়।",
      icon: PhoneCall,
    },
    {
      title: "সরাসরি রুকইয়াহ",
      description: "প্রয়োজন হলে অভিজ্ঞ রাকির মাধ্যমে সরাসরি কোরআন তিলাওয়াত করে রুকইয়াহ করা হয়।",
      icon: HeartHandshake,
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            চিকিৎসা পদ্ধতি
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            আমাদের চিকিৎসা পদ্ধতি অত্যন্ত সহজ এবং সম্পূর্ণ শরীয়াহ সম্মত। আমরা ধাপে ধাপে রোগীর সুস্থতার জন্য কাজ করি।
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-emerald-100 dark:bg-emerald-900/50" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-950 border-4 border-emerald-50 dark:border-slate-800 shadow-xl flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-600 opacity-10 animate-ping" style={{ animationDuration: '3s', animationDelay: `${index * 1}s` }} />
                  <step.icon className="h-10 w-10 text-emerald-600 dark:text-emerald-500 relative z-10" />
                  
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center border-2 border-white dark:border-slate-950">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
