"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, ShieldCheck, Tag, BarChart3 } from "lucide-react";

const services = [
  { icon: BarChart3, label: "Sammenlign priser", sub: "30+ butikker" },
  { icon: ShieldCheck, label: "Uavhengige tester", sub: "Ærlige anmeldelser" },
  { icon: Tag, label: "Rabattkoder", sub: "Spar opptil 20%" },
  { icon: Truck, label: "Direkte til butikk", sub: "Kjøp hos forhandler" },
];

export default function Hero() {
  return (
    <section className="relative">
      {/* Full-width hero with lifestyle image */}
      <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center overflow-hidden">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
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
              className="text-white/65 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              Vi sammenligner priser fra Norges største møbelbutikker og skriver
              uavhengige anmeldelser &mdash; slik at du finner kvalitet til riktig pris.
            </p>

            <div
              className="flex flex-wrap gap-3 animate-fade-up"
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
                className="h-13 px-8 text-base rounded-xl border-white/20 text-white hover:bg-white/10 font-medium"
              >
                <Link href="/produkter?sort=rating-desc">
                  Beste anmeldelser
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service strip */}
      <div className="bg-card border-b border-border/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.label}
                  className={`flex items-center gap-3.5 py-5 px-4 ${
                    i < 3 ? "lg:border-r border-border/40" : ""
                  } ${i < 2 ? "border-r border-border/40 lg:border-r" : ""} ${
                    i >= 2 ? "border-t lg:border-t-0 border-border/40" : ""
                  }`}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon className="w-[18px] h-[18px] text-accent" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{svc.label}</p>
                    <p className="text-xs text-muted-foreground truncate hidden sm:block">{svc.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
