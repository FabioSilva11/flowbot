import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import PlatformsSection from "@/components/landing/PlatformsSection";
import WhyAutomateSection from "@/components/landing/WhyAutomateSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ToolsSection from "@/components/landing/ToolsSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PlatformsSection />
      <WhyAutomateSection />
      <HowItWorks />
      <ToolsSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Landing;
