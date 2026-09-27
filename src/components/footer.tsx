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
  { name: "শর্তাবলী", href: "/terms" },
  { name: "সাধারণ জিজ্ঞাসা (FAQ)", href: "/faq" },
  { name: "রোগীদের নির্দেশনা", href: "/guidelines" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-panel relative border-t border-white/20 dark:border-white/10 backdrop-blur-2xl">
      {/* Top ornamental border separator */}
      <div className="ornament-rule w-full" aria-hidden="true" />

      <div className="shell py-14 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
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

        {/* Footer Copyright Bar */}
        <div className="mt-14 border-t border-hairline/80 pt-8 text-center sm:flex sm:items-center sm:justify-between">
          <p className="type-body-sm text-ink-muted">
            © {currentYear} Shifa Al Quran (শিফা আল কুরআন). All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex justify-center items-center gap-2 text-xs text-gold-ink font-medium">
            <span>কুরআন ও সুন্নাহ ভিত্তিক চিকিৎসা</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

