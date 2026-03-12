import Hero from "@/components/landing/Hero";
import CategoryNav from "@/components/landing/CategoryNav";
import PopularProducts from "@/components/landing/PopularProducts";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import LatestReviews from "@/components/landing/LatestReviews";
import BrandLogos from "@/components/landing/BrandLogos";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategoryNav />
      <PopularProducts />
      <FeaturesGrid />
      <HowItWorks />
      <LatestReviews />
      <BrandLogos />
      <Footer />
    </main>
  );
}
