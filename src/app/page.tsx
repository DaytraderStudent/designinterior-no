import Hero from "@/components/landing/Hero";
import CategoryNav from "@/components/landing/CategoryNav";
import CampaignBanner from "@/components/landing/CampaignBanner";
import PopularProducts from "@/components/landing/PopularProducts";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import LatestReviews from "@/components/landing/LatestReviews";
import BrandLogos from "@/components/landing/BrandLogos";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategoryNav />
      <CampaignBanner />
      <PopularProducts />
      <FeaturesGrid />
      <LatestReviews />
      <HowItWorks />
      <BrandLogos />
      <Footer />
    </main>
  );
}
