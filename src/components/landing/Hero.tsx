import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Store, Star } from "lucide-react";

const trustStats = [
  { icon: ShoppingBag, value: "336+", label: "Produkter" },
  { icon: Store, value: "30+", label: "Butikker" },
  { icon: Star, value: "4.5", label: "Snittrating" },
];

export default function Hero() {
  return (
    <section className="relative">
      {/* Full-width hero with lifestyle image */}
      <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.05'/%3E%3C/svg%3E")`
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-20 lg:py-24">
          <div className="max-w-2xl">
            <p
              className="text-white/50 text-xs font-medium tracking-[0.2em] uppercase mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Norges interiørguide
            </p>

            <h1
              className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] font-bold text-white leading-[1.05] mb-6 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Innred hjemmet.
              <br />
              <span className="text-[#c4a87a]">Spar penger.</span>
            </h1>

            <p
              className="text-white/65 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              Vi sammenligner priser fra Norges største møbelbutikker og skriver
              uavhengige anmeldelser &mdash; slik at du finner kvalitet til riktig pris.
            </p>

            <div
              className="flex flex-wrap gap-3 mb-10 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                asChild
                size="lg"
                className="h-13 px-8 text-base rounded-xl bg-[#c4a87a] text-[#2a2118] hover:bg-[#d4b88a] font-semibold shadow-lg shadow-black/20 border-0"
              >
                <Link href="/produkter">
                  Utforsk produkter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 px-8 text-base rounded-xl border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-medium"
              >
                <Link href="/design">
                  Design ditt hjem
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div
              className="flex items-center gap-6 sm:gap-8 animate-fade-up"
              style={{ animationDelay: "0.55s" }}
            >
              {trustStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                    <stat.icon className="w-4 h-4 text-[#c4a87a]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">{stat.value}</p>
                    <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
