"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  ShieldCheck,
  Lock,
  Heart,
  CheckCircle2,
  Users,
  HelpCircle,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const coreValues = [
  {
    icon: BookOpen,
    title: "শতভাগ সুন্নাহ সম্মত",
    description:
      "আমাদের প্রতিটি পদক্ষেপ ও চিকিৎসা পদ্ধতি সম্পূর্ণ কুরআন ও সহিহ সুন্নাহ ভিত্তিক।",
  },
  {
    icon: ShieldCheck,
    title: "শিরক ও বিদআত মুক্ত",
    description:
      "আমরা যেকোনো প্রকার কুসংস্কার, শিরক এবং বিদআত থেকে আমাদের চিকিৎসাকে মুক্ত রাখি।",
  },
  {
    icon: Lock,
    title: "সম্পূর্ণ গোপনীয়তা",
    description:
      "রোগীর ব্যক্তিগত তথ্য এবং চিকিৎসার সকল বিষয় আমরা শতভাগ গোপন রাখি।",
  },
  {
    icon: Heart,
    title: "সহানুভূতিশীল আচরণ",
    description:
      "একজন মুসলিম ভাই বা বোন হিসেবে আমরা অত্যন্ত আন্তরিকতার সাথে রোগীদের সেবা প্রদান করি।",
  },
];

const timelineSteps = [
  {
    title: "সমস্যা নির্ণয় ও পরামর্শ",
    description:
      "প্রাথমিকভাবে রোগীর শারীরিক ও মানসিক অবস্থা পর্যবেক্ষণ করে সমস্যার মূল কারণ (জাদু, বদনজর বা জিন) নির্ণয় করা হয় এবং প্রয়োজনীয় পরামর্শ দেওয়া হয়।",
  },
  {
    title: "সুন্নাহ সম্মত রুকইয়াহ সেশন",
    description:
      "সমস্যা অনুযায়ী অভিজ্ঞ রাকি দ্বারা কুরআন তিলাওয়াত ও মাসনুন দোয়ার মাধ্যমে রুকইয়াহ সেশন পরিচালনা করা হয়।",
  },
  {
    title: "সেলফ-রুকইয়াহ ও আমল প্রদান",
    description:
      "সেশনের পর রোগীকে বাড়িতে নিজে নিজে করার জন্য সুনির্দিষ্ট আমল ও সেলফ-রুকইয়াহ এর রুটিন দেওয়া হয়।",
  },
  {
    title: "ফলো-আপ ও গাইডেন্স",
    description:
      "চিকিৎসা পরবর্তী সময়ে রোগীর উন্নতি পর্যবেক্ষণ করা হয় এবং সম্পূর্ণ সুস্থতা পর্যন্ত প্রয়োজনীয় গাইডেন্স দেওয়া হয়।",
  },
];

const faqs = [
  {
    q: "আপনাদের চিকিৎসা কি সম্পূর্ণ ইসলামি শরিয়ত সম্মত?",
    a: "হ্যাঁ, আলহামদুলিল্লাহ। আমাদের চিকিৎসা পদ্ধতি সম্পূর্ণ কুরআন এবং সহিহ হাদিস ভিত্তিক। আমরা তাবিজ, কুফরি কালাম বা যেকোনো ধরনের শিরক ও বিদআত থেকে সম্পূর্ণ মুক্ত।",
  },
  {
    q: "অনলাইনে চিকিৎসা নেওয়া কি সম্ভব?",
    a: "হ্যাঁ, দেশের যেকোনো প্রান্ত বা প্রবাস থেকে আমাদের অভিজ্ঞ রাকিদের মাধ্যমে অনলাইনে রুকইয়াহ সেশন ও কাউন্সেলিং নেওয়া সম্ভব।",
  },
  {
    q: "রুকইয়াহ সেশনের আগে কী প্রস্তুতি নিতে হয়?",
    a: "রোগীকে অবশ্যই পবিত্র অবস্থায় (ওজু সহকারে) থাকতে হবে এবং পাঁচ ওয়াক্ত নামাজের পাবন্দি করার মানসিকতা থাকতে হবে।",
  },
];

const commitments = [
  "রোগীর ব্যক্তিগত তথ্যের সর্বোচ্চ গোপনীয়তা রক্ষা করা",
  "শুধুমাত্র কুরআন ও সুন্নাহ ভিত্তিক পদ্ধতি ব্যবহার করা",
  "সকল প্রকার শিরক, বিদআত ও কুসংস্কার বর্জন করা",
  "রোগীর সাথে মানবিক, সহানুভূতিশীল ও সম্মানজনক আচরণ করা",
];

export default function AboutPage() {
  return (
    <main className="flex-grow">
      {/* 1. Hero / Our Story */}
      <section className="section-band bg-surface-base">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">আমাদের গল্প</p>
            <h1 className="type-display mt-4 text-ink-strong">
              শিফা আল কুরআন
            </h1>
            <p className="type-body-lg mt-6 text-ink-body">
              কোনো সাধারণ চিকিৎসা কেন্দ্র নয়। বর্তমান সমাজে জাদুটোনা, বদনজর
              এবং জিন ঘটিত সমস্যার কারণে অনেকেই দিশেহারা। সঠিক চিকিৎসার অভাবে
              অনেকে শিরক ও বিদআতে লিপ্ত হচ্ছেন। আমাদের পথচলা শুরু হয়
              মানুষকে এই অন্ধকার পথ থেকে ফিরিয়ে এনে সম্পূর্ণ কুরআন ও সুন্নাহর
              আলোকে একটি নির্ভরযোগ্য, নিরাপদ এবং বিশুদ্ধ চিকিৎসা ব্যবস্থা
              উপহার দেওয়ার লক্ষ্যে।
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="section-band border-y border-hairline bg-surface-sunken">
        <div className="shell">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <Reveal>
              <div className="card flex flex-col">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-soft-ink">
                  <BookOpen className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h2 className="type-subtitle mt-5 text-ink-strong">
                  আমাদের লক্ষ্য
                </h2>
                <p className="type-body mt-2 text-ink-body">
                  মানুষকে শিরক, বিদআত এবং কুসংস্কারমুক্ত সঠিক সুন্নাহ ভিত্তিক
                  রুকইয়াহ চিকিৎসা প্রদান করা। আমরা চাই প্রতিটি মুসলিম পরিবার
                  যেন কুরআন ও সুন্নাহর আলোকে নিজেদের আত্মিক ও শারীরিক সুস্থতা
                  নিশ্চিত করতে পারে।
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="card flex flex-col">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-soft-ink">
                  <ShieldCheck
                    className="h-6 w-6"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <h2 className="type-subtitle mt-5 text-ink-strong">
                  আমাদের উদ্দেশ্য
                </h2>
                <p className="type-body mt-2 text-ink-body">
                  এমন একটি সুস্থ সমাজ গড়ে তোলা যেখানে জাদু, বদনজর বা জিনের
                  আছর থেকে বাঁচার জন্য মানুষ কোনো ভণ্ড বা জাদুকরের দ্বারস্থ হবে
                  না, বরং সরাসরি আল্লাহর কালামের ওপর পূর্ণ আস্থা ও বিশ্বাস
                  স্থাপন করবে।
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Statistics */}
      <section className="section-band bg-surface-base">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-soft-ink">
                <Users className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h2 className="type-title mt-6 text-ink-strong">
                আলহামদুলিল্লাহ, ৩০,০০০+ মানুষ
              </h2>
              <p className="type-body-lg mt-3 text-ink-body max-w-2xl">
                গত বছরগুলোতে আমাদের অনলাইন ও অফলাইন সেবা গ্রহণ করেছেন।
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="section-band border-y border-hairline bg-surface-raised">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">আমাদের মূলনীতি</p>
            <h2 className="type-title mt-4 text-ink-strong">
              যে বিষয়গুলোতে আমরা কখনোই আপস করি না
            </h2>
          </Reveal>

          <Reveal>
            <ul className="mt-11 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
              {coreValues.map((value) => (
                <li key={value.title} className="card flex h-full flex-col">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-soft-ink">
                    <value.icon
                      className="h-5 w-5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="type-heading-sm mt-5 text-ink-strong">
                    {value.title}
                  </h3>
                  <p className="type-body mt-2 text-ink-body">
                    {value.description}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 5. Commitments */}
      <section className="section-band bg-surface-base">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-14">
            <Reveal>
              <div>
                <p className="eyebrow">বিশ্বস্ততা</p>
                <h2 className="type-title mt-4 text-ink-strong">
                  আমাদের সবচেয়ে বড় পুঁজি
                </h2>
                <p className="type-body-lg mt-5 text-ink-body">
                  রোগীর আস্থা ও গোপনীয়তা আমাদের কাছে সর্বপ্রথম।
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="space-y-6">
                {commitments.map((commitment) => (
                  <div
                    key={commitment}
                    className="flex items-start gap-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-soft-ink">
                      <CheckCircle2
                        className="h-4 w-4"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                    <p className="type-body text-ink-strong">{commitment}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Treatment Philosophy */}
      <section className="section-band border-y border-hairline bg-surface-sunken">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <figure className="card card-citation flex flex-col">
              <p className="type-citation text-gold-soft-ink">আমাদের বিশ্বাস</p>
              <blockquote className="type-body-lg mt-4 text-ink-body">
                &ldquo;আমরা কোনো জাদুকর বা অলৌকিক ক্ষমতার অধিকারী নই। আমরা
                কেবল কুরআন ও সুন্নাহর আলোকে একটি/usিলা বা মাধ্যম হিসেবে কাজ
                করি। রোগমুক্তি কেবল মহান আল্লাহর ইচ্ছাধীন।&rdquo;
              </blockquote>
              <figcaption className="type-citation mt-4 text-gold-ink">
                — শিফা আল কুরআনের চিকিৎসা দর্শন
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 7. Treatment Timeline */}
      <section className="section-band bg-surface-base">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">চিকিৎসা পদ্ধতি</p>
            <h2 className="type-title mt-4 text-ink-strong">
              ধাপে ধাপে একটি পরিপূর্ণ ও বিশুদ্ধ চিকিৎসা প্রক্রিয়া
            </h2>
          </Reveal>

          <Reveal>
            <ol className="mt-11 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
              {timelineSteps.map((step, idx) => (
                <li key={idx} className="card flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-[1.5rem] leading-none font-bold text-interactive">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="h-px flex-1 bg-hairline"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="type-subtitle mt-4 text-ink-strong">
                    {step.title}
                  </h3>
                  <p className="type-body mt-2 text-ink-body">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 8. FAQ Preview */}
      <section className="section-band border-y border-hairline bg-surface-raised">
        <div className="shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">জিজ্ঞাসা</p>
            <h2 className="type-title mt-4 text-ink-strong">
              সাধারন জিজ্ঞাসা
            </h2>
          </Reveal>

          <Reveal>
            <div className="mt-11 grid gap-4 lg:mt-14 lg:grid-cols-3 lg:gap-6">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="card group border-hairline"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 [&::-webkit-details-marker]:hidden">
                    <span className="type-heading-sm text-ink-strong">
                      {faq.q}
                    </span>
                    <HelpCircle
                      className="h-5 w-5 shrink-0 text-ink-muted transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-open:rotate-180"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="type-body pb-5 pe-10 text-ink-body">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="section-band bg-surface-base">
        <div className="shell">
          <Reveal>
            <div className="arch-crown mx-auto max-w-3xl rounded-b-lg border border-hairline bg-surface-raised px-5 pt-14 pb-10 text-center sm:px-10 sm:pt-20 sm:pb-12">
              <h2 className="type-title text-ink-strong">
                আপনার সুস্থতার যাত্রা আজই শুরু করুন
              </h2>
              <div
                className="ornament-rule mx-auto mt-7 w-24 sm:w-32"
                aria-hidden="true"
              />
              <p className="type-body-lg mx-auto mt-7 max-w-2xl text-ink-body">
                সঠিক সুন্নাহ ভিত্তিক চিকিৎসার মাধ্যমে নিজে সুস্থ থাকুন এবং
                পরিবারকে নিরাপদে রাখুন।
              </p>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Link href="/appointment" className="btn btn-primary btn-lg">
                  অ্যাপয়েন্টমেন্ট নিন
                </Link>
                <Link href="/contact" className="btn btn-secondary btn-lg">
                  যোগাযোগ করুন
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
