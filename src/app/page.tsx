import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";

export const metadata: Metadata = {
  title: "শিফা আল কুরআন — কুরআন ও সুন্নাহভিত্তিক রুকইয়া সেন্টার",
  description: "কুরআন ও সুন্নাহর আলোকে বদনজর, জাদু ও জিন ঘটিত সমস্যার সুন্নাহসম্মত রুকইয়া, অডিও লাইব্রেরি, সেলফ ডায়াগনোসিস ও অ্যাপয়েন্টমেন্ট।",
  alternates: { canonical: "https://saq.pro.bd/" },
  openGraph: {
    title: "শিফা আল কুরআন — কুরআন ও সুন্নাহভিত্তিক রুকইয়া সেন্টার",
    description: "কুরআন ও সুন্নাহর আলোকে সুন্নাহসম্মত রুকইয়া, অডিও, ডায়াগনোসিস ও অ্যাপয়েন্টমেন্ট।",
    url: "https://saq.pro.bd/",
    type: "website",
  },
};
import { AboutSection } from "@/components/home/about";
import { ServicesSection } from "@/components/home/services";
import { HowItWorksSection } from "@/components/home/how-it-works";
import { FoundationSection } from "@/components/home/foundation";
import { TestimonialsSection } from "@/components/home/testimonials";
import { ResourcesSection } from "@/components/home/resources";
import { FaqSection } from "@/components/home/faq";
import { CTASection } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <FoundationSection />
      <TestimonialsSection />
      <ResourcesSection />
      <FaqSection />
      <CTASection />
    </>
  );
}
