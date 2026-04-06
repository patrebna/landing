import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import AdvantagesSection from "@/sections/AdvantagesSection";
import FAQSection from "@/sections/FAQSection";
import ReviewsSection from "@/sections/ReviewsSection";
import SubscriptionSection from "@/sections/SubscriptionSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 dark:bg-brand-dark dark:text-slate-100">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <AdvantagesSection />
        <FAQSection />
        <ReviewsSection />
        <SubscriptionSection />
      </main>
      <Footer />
    </div>
  );
}
