import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import Footer from "@/components/landing/Footer";

const stores = ["IKEA", "Bohus", "Bolia", "Jysk", "Kid"];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <FeaturesGrid />

      {/* Store logos section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-8">
            Mobler fra Norges beste butikker
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {stores.map((store) => (
              <span
                key={store}
                className="font-display text-2xl sm:text-3xl font-bold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors cursor-default select-none"
              >
                {store}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
