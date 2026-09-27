import { Hero } from "@/components/home/hero";
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
