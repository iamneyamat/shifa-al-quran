import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "যোগাযোগ",
  description: "শিফা আল কুরআন এর সাথে যোগাযোগ করুন।",
};

export default function ContactPage() {
  return (
    <div className="bg-light-bg-main dark:bg-slate-950 py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-light-heading dark:text-white mb-4">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <p className="text-light-text dark:text-slate-300">
            যেকোনো জিজ্ঞাসা, পরামর্শ অথবা সিরিয়াল বুকিংয়ের জন্য আমাদের সাথে যোগাযোগ করুন। আমরা দ্রুত আপনার প্রশ্নের উত্তর দেওয়ার চেষ্টা করবো।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-light-bg-alt2 dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-light-border dark:border-slate-800">
              <h2 className="text-2xl font-bold text-light-heading dark:text-white mb-6">যোগাযোগের ঠিকানা</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-light-heading dark:text-white text-lg">অফিসের ঠিকানা</h3>
                    <p className="text-light-text dark:text-slate-400 mt-1">ঢাকা, বাংলাদেশ</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-light-heading dark:text-white text-lg">ফোন নাম্বার</h3>
                    <p className="text-light-text dark:text-slate-400 mt-1">09639-000999</p>
                    <p className="text-light-text dark:text-slate-400">+880 1840-601484 (WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-light-heading dark:text-white text-lg">ইমেইল</h3>
                    <p className="text-light-text dark:text-slate-400 mt-1">shifaalquran11@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-light-heading dark:text-white text-lg">অফিস সময়সূচী</h3>
                    <p className="text-light-text dark:text-slate-400 mt-1">শনিবার - বৃহস্পতিবার: সকাল ১০টা - রাত ৮টা</p>
                    <p className="text-light-text dark:text-slate-400">শুক্রবার: বন্ধ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder or Real Form */}
          <div className="bg-light-bg-alt2 dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-light-border dark:border-slate-800">
            <h2 className="text-2xl font-bold text-light-heading dark:text-white mb-6">আমাদের মেসেজ দিন</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-light-heading dark:text-slate-200 block mb-2">আপনার নাম</label>
                <input type="text" id="name" className="flex h-12 w-full rounded-md border border-light-border dark:border-slate-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500" placeholder="নাম লিখুন" required />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-light-heading dark:text-slate-200 block mb-2">ফোন নাম্বার</label>
                <input type="tel" id="phone" className="flex h-12 w-full rounded-md border border-light-border dark:border-slate-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500" placeholder="ফোন নাম্বার" required />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-light-heading dark:text-slate-200 block mb-2">মেসেজ</label>
                <textarea id="message" rows={5} className="flex w-full rounded-md border border-light-border dark:border-slate-800 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500" placeholder="আপনার জিজ্ঞাসা লিখুন..." required></textarea>
              </div>
              <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-md bg-emerald-600 px-8 text-base font-medium text-white shadow transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-700">
                মেসেজ পাঠান
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
