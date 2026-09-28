import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Link2, ShieldCheck, PhoneCall } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const quickLinks = [
  { name: "আমাদের সম্পর্কে", href: "/about" },
  { name: "সেবাসমূহ", href: "/services" },
  { name: "চিকিৎসা পদ্ধতি", href: "/process" },
  { name: "অ্যাপয়েন্টমেন্ট", href: "/appointment" },
  { name: "ব্লগ", href: "/blog" },
];

const legalLinks = [
  { name: "প্রাইভেসি পলিসি", href: "/privacy" },
  { name: "শর্তাবলি", href: "/terms" },
  { name: "সাধারণ জিজ্ঞাসা (FAQ)", href: "/faq" },
  { name: "রোগীদের নির্দেশনা", href: "/guidelines" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-panel relative border-t border-white/20 dark:border-white/10 backdrop-blur-2xl">
      {/* Top ornamental border separator */}
      <div className="ornament-rule w-full" aria-hidden="true" />

      <div className="shell py-8 sm:py-14 lg:py-20 pb-28 sm:pb-14 lg:pb-20">
        {/* Dedicated Mobile Footer Layout (< sm) */}
        <div className="sm:hidden space-y-7">
          {/* 1. Mobile Brand / Logo section */}
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-surface-raised p-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="শিফা আল কুরআন লোগো"
                  width={44}
                  height={44}
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="type-subtitle text-ink-strong tracking-tight font-bold">
                  শিফা আল কুরআন
                </span>
                <span className="type-citation text-[11px] text-gold-ink font-medium">
                  ইসলামিক রুকইয়াহ সেন্টার
                </span>
              </div>
            </Link>

            <p className="type-body-sm mt-3 text-xs text-ink-body leading-relaxed max-w-xs text-center">
              কুরআনের আয়াতে আছে আরোগ্য ও প্রশান্তি। আমরা সুন্নাহ সম্মত উপায়ে
              রুকইয়াহ শারইয়াহ এর মাধ্যমে শারীরিক ও মানসিক সমস্যার চিকিৎসা প্রদান
              করে থাকি।
            </p>

            <div className="mt-4 flex items-center justify-center gap-3">
              <Link
                href="https://facebook.com/shifaquran"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface-raised/80 text-ink-body shadow-sm backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-600/10 hover:text-emerald-500"
                aria-label="Facebook"
              >
                <FaFacebook className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" />
              </Link>
              <Link
                href="https://www.youtube.com/@ShifaAlQuran786"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface-raised/80 text-ink-body shadow-sm backdrop-blur-md transition-all duration-200 hover:border-red-500/40 hover:bg-red-600/10 hover:text-red-500"
                aria-label="YouTube"
              >
                <FaYoutube className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="border-t border-hairline/60 my-2" aria-hidden="true" />

          {/* 2. Important Links (2-Column Grid) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="h-4 w-4 text-interactive" />
              <h2 className="type-heading-sm text-ink-strong">গুরুত্বপূর্ণ লিংক</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-xs text-ink-body transition-colors duration-200 hover:text-interactive py-0.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/40 transition-all duration-200 group-hover:w-2.5 group-hover:bg-emerald-500 shrink-0" />
                  <span className="truncate">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Legal / Important Information (2-Column Grid) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-gold-ink" />
              <h2 className="type-heading-sm text-ink-strong">আইনি তথ্য</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-xs text-ink-body transition-colors duration-200 hover:text-interactive py-0.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-ornament/40 transition-all duration-200 group-hover:w-2.5 group-hover:bg-gold-ornament shrink-0" />
                  <span className="truncate">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* 4. Contact Section (Organized Compact Layout) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <PhoneCall className="h-4 w-4 text-interactive" />
              <h2 className="type-heading-sm text-ink-strong">যোগাযোগ</h2>
            </div>
            <div className="rounded-xl border border-hairline/70 bg-surface-raised/40 p-3.5 space-y-2.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs py-0.5 border-b border-hairline/40 pb-2">
                <span className="text-ink-muted flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-interactive" /> হটলাইন
                </span>
                <a href="tel:09639000999" className="font-semibold text-ink-strong hover:text-interactive font-mono">
                  09639-000999
                </a>
              </div>
              <div className="flex items-center justify-between text-xs py-0.5 border-b border-hairline/40 pb-2">
                <span className="text-ink-muted flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-interactive" /> হোয়াটসঅ্যাপ
                </span>
                <a href="https://wa.me/8801353301772" target="_blank" rel="noopener noreferrer" className="font-semibold text-ink-strong hover:text-interactive font-mono">
                  01353301772
                </a>
              </div>
              <div className="flex items-center justify-between text-xs py-0.5 border-b border-hairline/40 pb-2">
                <span className="text-ink-muted flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-interactive" /> ইমেইল
                </span>
                <a href="mailto:shifaalquran11@gmail.com" className="text-ink-strong hover:text-interactive truncate max-w-[170px] xs:max-w-[200px]">
                  shifaalquran11@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-xs pt-0.5">
                <MapPin className="h-3.5 w-3.5 text-interactive shrink-0 mt-0.5" />
                <span className="text-ink-body">#535/C Khilgaon, Dhaka</span>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Desktop & Tablet Grid (sm:grid) */}
        <div className="hidden sm:grid sm:gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-hairline bg-surface-raised p-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="শিফা আল কুরআন লোগো"
                  width={48}
                  height={48}
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="type-subtitle text-ink-strong tracking-tight group-hover:text-interactive transition-colors">
                  শিফা আল কুরআন
                </span>
                <span className="type-citation text-[11px] text-gold-ink font-medium">
                  ইসলামিক রুকইয়াহ সেন্টার
                </span>
              </div>
            </Link>

            <p className="type-body-sm mt-5 max-w-sm text-ink-body leading-relaxed">
              কুরআনের আয়াতে আছে আরোগ্য ও প্রশান্তি। আমরা সুন্নাহ সম্মত উপায়ে
              রুকইয়াহ শারইয়াহ এর মাধ্যমে শারীরিক ও মানসিক সমস্যার চিকিৎসা প্রদান
              করে থাকি।
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://facebook.com/shifaquran"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-surface-raised/80 text-ink-body shadow-sm backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-600/10 hover:text-emerald-500"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
              </Link>
              <Link
                href="https://www.youtube.com/@ShifaAlQuran786"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-surface-raised/80 text-ink-body shadow-sm backdrop-blur-md transition-all duration-200 hover:border-red-500/40 hover:bg-red-600/10 hover:text-red-500"
                aria-label="YouTube"
              >
                <FaYoutube className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-interactive" />
              <h2 className="type-heading-sm text-ink-strong">গুরুত্বপূর্ণ লিংক</h2>
            </div>
            <ul className="type-body-sm mt-5 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="group inline-flex items-center gap-1.5 text-ink-body transition-colors duration-200 hover:text-interactive"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/40 transition-all duration-200 group-hover:w-3 group-hover:bg-emerald-500" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links Column */}
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold-ink" />
              <h2 className="type-heading-sm text-ink-strong">আইনি তথ্য</h2>
            </div>
            <ul className="type-body-sm mt-5 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="group inline-flex items-center gap-1.5 text-ink-body transition-colors duration-200 hover:text-interactive"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-ornament/40 transition-all duration-200 group-hover:w-3 group-hover:bg-gold-ornament" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <div className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-interactive" />
              <h2 className="type-heading-sm text-ink-strong">যোগাযোগ</h2>
            </div>
            <ul className="type-body-sm mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-hairline bg-surface-raised text-interactive shadow-sm">
                  <MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="pt-1.5 text-ink-body">
                  #535/C Khilgaon, Dhaka
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-hairline bg-surface-raised text-interactive shadow-sm">
                  <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div className="flex flex-col pt-0.5">
                  <a href="tel:09639000999" className="text-ink-body transition-colors hover:text-interactive">
                    09639-000999
                  </a>
                  <a href="tel:01353301772" className="text-ink-body transition-colors hover:text-interactive">
                    01353301772
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-hairline bg-surface-raised text-interactive shadow-sm">
                  <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <a
                  href="mailto:shifaalquran11@gmail.com"
                  className="pt-1.5 text-ink-body break-all transition-colors hover:text-interactive"
                >
                  shifaalquran11@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Footer Copyright Bar (Centered on Mobile & Desktop) */}
        <div className="mt-8 sm:mt-14 border-t border-hairline/80 pt-6 sm:pt-8 text-center sm:flex sm:items-center sm:justify-between">
          <p className="type-body-sm text-ink-muted text-xs sm:text-sm">
            © {currentYear} Shifa Al Quran (শিফা আল কুরআন). All rights reserved.
          </p>
          <div className="mt-3 sm:mt-0 flex justify-center items-center gap-2 text-xs text-gold-ink font-medium">
            <span>কুরআন ও সুন্নাহ ভিত্তিক চিকিৎসা</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

