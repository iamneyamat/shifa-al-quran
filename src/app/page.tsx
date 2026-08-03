import { Hero } from "@/components/home/hero";
import { AboutSection } from "@/components/home/about";
import { ServicesSection } from "@/components/home/services";
import { HowItWorksSection } from "@/components/home/how-it-works";
import { CTASection } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <CTASection />
    </>
  );
}
