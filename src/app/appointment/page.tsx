import React, { Suspense } from "react";
import { AppointmentForm } from "@/components/appointment-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "অ্যাপয়েন্টমেন্ট | Shifa Al Quran",
  description: "শিফা আল কুরআন এ রুকইয়াহ শারইয়াহ চিকিৎসারের জন্য অ্যাপয়েন্টমেন্ট বুকিং করুন।",
};

export default function AppointmentPage() {
  return (
    <main className="flex-grow">
      <section className="section-band bg-surface-base">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow">অ্যাপয়েন্টমেন্ট</p>
            <h1 className="type-display mt-4 text-ink-strong">
              আপনার অ্যাপয়েন্টমেন্ট বুকিং করুন
            </h1>
            <p className="type-body-lg mt-6 text-ink-body">
              নিচের ফর্মটি পূরণ করুন। আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন
              এবং একটি সুস্থতার যাত্রা শুরু করুন।
            </p>
          </div>
        </div>
      </section>

      <section className="section-band border-y border-hairline bg-surface-sunken">
        <div className="shell">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card flex flex-col">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-soft-ink">
                <span className="font-heading text-[1.5rem] leading-none font-bold text-interactive">
                  ০১
                </span>
              </span>
              <h2 className="type-subtitle mt-5 text-ink-strong">
                তথ্য পূরণ করুন
              </h2>
              <p className="type-body mt-2 text-ink-body">
                আপনার নাম, ফোন নাম্বার এবং সমস্যার বিবরণ দিন।
              </p>
            </div>

            <div className="card flex flex-col">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-soft-ink">
                <span className="font-heading text-[1.5rem] leading-none font-bold text-interactive">
                  ০২
                </span>
              </span>
              <h2 className="type-subtitle mt-5 text-ink-strong">
                অনুরোধ গ্রহণ
              </h2>
              <p className="type-body mt-2 text-ink-body">
                আমাদের প্রতিনিধি আপনার তথ্য যাচাই করে যোগাযোগ করবেন।
              </p>
            </div>

            <div className="card flex flex-col">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-soft-ink">
                <span className="font-heading text-[1.5rem] leading-none font-bold text-interactive">
                  ০৩
                </span>
              </span>
              <h2 className="type-subtitle mt-5 text-ink-strong">
                সময় নিশ্চিত করুন
              </h2>
              <p className="type-body mt-2 text-ink-body">
                সেশনের তারিখ এবং সময় নিশ্চিত করে আপনার সুস্থতার যাত্রা শুরু করুন।
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band bg-surface-base">
        <div className="shell">
          <div className="max-w-3xl">
            <Suspense
              fallback={
                <div className="p-8 text-center text-emerald-600 dark:text-emerald-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mx-auto mb-2" />
                  <span>ফর্ম লোড হচ্ছে...</span>
                </div>
              }
            >
              <AppointmentForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
