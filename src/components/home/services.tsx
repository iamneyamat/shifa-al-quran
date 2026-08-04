import * as React from "react";
import { EyeOff, Ghost, Brain, Frown, Users, Activity } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      id: "jadu",
      title: "জাদুটোনা (সিহর)",
      description: "কালো জাদু বা সিহরের কারণে হওয়া শারীরিক ও মানসিক সমস্যার কোরআন সুন্নাহ ভিত্তিক সমাধান।",
      icon: Ghost,
    },
    {
      id: "nazar",
      title: "বদনজর (আইন)",
      description: "বদনজরের কারণে হওয়া হঠাৎ অসুস্থতা, ব্যবসায় ক্ষতি বা পড়াশোনায় অমনোযোগিতার চিকিৎসা।",
      icon: EyeOff,
    },
    {
      id: "jinn",
      title: "জ্বিন আছর",
      description: "জিনের উপদ্রব, ভয় পাওয়া, বা অস্বাভাবিক আচরণের জন্য বিশেষ রুকইয়াহ।",
      icon: Users,
    },
    {
      id: "mental",
      title: "মানসিক অস্থিরতা",
      description: "অতিরিক্ত দুশ্চিন্তা, হতাশা, ডিপ্রেশন এবং মানসিক অবসাদ দূর করতে রুকইয়াহ।",
      icon: Brain,
    },
    {
      id: "physical",
      title: "অজানা রোগ",
      description: "ডাক্তারি পরীক্ষায় ধরা পড়ে না এমন শারীরিক ব্যথাবেদনা ও অসুস্থতার চিকিৎসা।",
      icon: Activity,
    },
    {
      id: "family",
      title: "পারিবারিক কলহ",
      description: "স্বামী-স্ত্রীর অমিল বা পরিবারে অশান্তি দূর করতে সুন্নাহ সম্মত পরামর্শ ও রুকইয়াহ।",
      icon: Frown,
    }
  ];

  return (
    <section className="py-24 bg-light-bg-alt3 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-light-heading dark:text-white mb-4">
            যেসব সমস্যার চিকিৎসা করা হয়
          </h2>
          <p className="text-light-text dark:text-slate-300">
            আমরা সম্পূর্ণ শরীয়াহ সম্মত উপায়ে বিভিন্ন আধ্যাত্মিক ও শারীরিক সমস্যার চিকিৎসা প্রদান করে থাকি। 
            নিচে আমাদের প্রধান সেবাসমূহ দেওয়া হলো।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="relative overflow-hidden bg-light-bg-alt2 dark:bg-slate-950 p-8 rounded-2xl shadow-premium-soft border border-light-border dark:border-slate-800 transition-all hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 group"
            >
              {/* Minimal Background Design */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full blur-3xl group-hover:bg-emerald-200/50 dark:group-hover:bg-emerald-800/30 transition-colors duration-500 pointer-events-none"></div>
              <div className="absolute -bottom-8 -right-8 text-slate-50 dark:text-light-heading/50 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <service.icon className="w-40 h-40 opacity-70 dark:opacity-40" />
              </div>
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-light-heading dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-light-text dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
