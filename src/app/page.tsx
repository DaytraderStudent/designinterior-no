import Hero from "@/components/landing/Hero";
import CategoryNav from "@/components/landing/CategoryNav";
import HowItWorks from "@/components/landing/HowItWorks";
import CampaignBanner from "@/components/landing/CampaignBanner";
import PopularProducts from "@/components/landing/PopularProducts";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import LatestReviews from "@/components/landing/LatestReviews";
import BrandLogos from "@/components/landing/BrandLogos";
import Footer from "@/components/landing/Footer";
import ScrollReveal from "@/components/landing/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ScrollReveal>
        <CategoryNav />
      </ScrollReveal>
      <HowItWorks />
      <ScrollReveal>
        <FeaturesGrid />
      </ScrollReveal>
      <ScrollReveal>
        <CampaignBanner />
      </ScrollReveal>
      <ScrollReveal>
        <PopularProducts />
      </ScrollReveal>
      <ScrollReveal>
        <LatestReviews />
      </ScrollReveal>
      <BrandLogos />
      <Footer />
    </main>
  );
}
