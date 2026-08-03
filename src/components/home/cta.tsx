import * as React from "react";
import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden bg-emerald-700">
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            সুস্থতার জন্য আজই যোগাযোগ করুন
          </h2>
          <p className="text-emerald-50 text-lg mb-10 max-w-2xl mx-auto">
            শারীরিক কিংবা মানসিক যেকোনো সমস্যায় কোরআন ও সুন্নাহ ভিত্তিক চিকিৎসার জন্য আমাদের সাথে পরামর্শ করুন। আমরা আপনার গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-md bg-white px-8 text-base font-bold text-emerald-800 shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <CalendarCheck className="h-5 w-5" />
              অ্যাপয়েন্টমেন্ট নিন
            </Link>
            <a
              href="tel:09639000999"
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-md border-2 border-emerald-400 bg-transparent px-8 text-base font-bold text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone className="h-5 w-5" />
              09639-000999
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
