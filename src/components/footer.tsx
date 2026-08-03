import * as React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-500 mb-4">
              শিফা আল কুরআন
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              কুরআনের আয়াতে আছে আরোগ্য ও প্রশান্তি। আমরা সুন্নাহ সম্মত উপায়ে রুকইয়াহ শারইয়াহ এর মাধ্যমে শারীরিক ও মানসিক সমস্যার চিকিৎসা প্রদান করে থাকি।
            </p>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com/shifaquran"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/@ShifaAlQuran786"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 transition-colors"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">গুরুত্বপূর্ণ লিংক</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-emerald-600 transition-colors">
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-600 transition-colors">
                  সেবাসমূহ
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-emerald-600 transition-colors">
                  চিকিৎসা পদ্ধতি
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="hover:text-emerald-600 transition-colors">
                  অ্যাপয়েন্টমেন্ট
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-600 transition-colors">
                  ব্লগ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">আইনি তথ্য</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-emerald-600 transition-colors">
                  প্রাইভেসি পলিসি
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-600 transition-colors">
                  শর্তাবলী
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-600 transition-colors">
                  সাধারণ জিজ্ঞাসা (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-emerald-600 transition-colors">
                  রোগীদের নির্দেশনা
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">যোগাযোগ</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-600 shrink-0" />
                <div className="flex flex-col">
                  <span>09639-000999</span>
                  <span>+880 1840-601484</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>shifaalquran11@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Shifa Al Quran (শিফা আল কুরআন). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
