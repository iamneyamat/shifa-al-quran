import { AppointmentForm } from "@/components/appointment-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "অ্যাপয়েন্টমেন্ট",
  description: "শিফা আল কুরআন এ রুকইয়াহ শারইয়াহ চিকিৎসার জন্য অ্যাপয়েন্টমেন্ট নিন।",
};

export default function AppointmentPage() {
  return (
    <div className="bg-light-bg-main dark:bg-slate-950 py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-light-heading dark:text-white mb-4">
              অ্যাপয়েন্টমেন্ট বুকিং
            </h1>
            <p className="text-light-text dark:text-slate-300">
              নিচের ফর্মটি সঠিকভাবে পূরণ করে আপনার সমস্যার বিবরণ দিন। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করে অ্যাপয়েন্টমেন্ট নিশ্চিত করবেন।
            </p>
          </div>
          
          <div className="bg-light-bg-alt2 dark:bg-slate-900 rounded-2xl shadow-sm border border-light-border dark:border-slate-800 p-6 sm:p-10">
            <AppointmentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
