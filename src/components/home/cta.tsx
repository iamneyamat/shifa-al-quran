import Link from "next/link";
import { CalendarHeart, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function CTASection() {
  return (
    <section className="section-band border-y border-hairline bg-surface-base">
      <div className="shell">
        {/* The closing niche. Second and last pointed arch on the page: it
            answers the opening frontispiece and closes the codex. */}
        <Reveal>
          <div className="arch-crown mx-auto max-w-3xl rounded-b-lg border border-hairline bg-surface-raised px-4 pt-10 pb-8 text-center sm:px-10 sm:pt-20 sm:pb-12">
            <h2 className="type-title text-ink-strong text-xl sm:text-2xl lg:text-3xl">
              সুস্থতার জন্য আজই যোগাযোগ করুন
            </h2>

            <div className="ornament-rule mx-auto mt-4 sm:mt-7 w-20 sm:w-32" aria-hidden="true" />

            <p className="type-body-lg mx-auto mt-4 sm:mt-7 max-w-2xl text-ink-body text-xs sm:text-base">
              শারীরিক কিংবা মানসিক যেকোনো সমস্যায় কোরআন ও সুন্নাহ ভিত্তিক
              চিকিৎসার জন্য আমাদের সাথে পরামর্শ করুন। আমরা আপনার গোপনীয়তা রক্ষায়
              প্রতিশ্রুতিবদ্ধ।
            </p>

            <div className="mt-6 sm:mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/appointment"
                className="btn btn-primary btn-lg w-full sm:w-auto min-h-[44px]"
              >
                <CalendarHeart
                  className="h-5 w-5 shrink-0"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                অ্যাপয়েন্টমেন্ট নিন
              </Link>
              <a
                href="tel:09639000999"
                className="btn btn-secondary btn-lg w-full sm:w-auto min-h-[44px]"
              >
                <PhoneCall
                  className="h-5 w-5 shrink-0"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                09639-000999
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
