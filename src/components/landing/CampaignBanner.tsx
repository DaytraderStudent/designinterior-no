"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CampaignBanner() {
  return (
    <section className="px-5 sm:px-8 pb-14 sm:pb-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-4">
          {/* Large campaign */}
          <Link href="/produkter?category=sofa" className="md:col-span-3 group">
            <div className="relative rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[320px] flex items-end p-7 sm:p-9 bg-gradient-to-br from-[#4a3f33] via-[#5d4f3f] to-[#3d3428]">
              {/* Decorative sofa silhouette */}
              <div className="absolute top-1/2 right-[8%] -translate-y-1/2 hidden sm:block">
                <div className="w-[200px] h-[100px] rounded-[28px_28px_8px_8px] bg-white/[0.05] border border-white/[0.08]" />
                <div className="absolute -top-8 left-4 w-12 h-8 rounded-t-lg bg-white/[0.04]" />
                <div className="absolute -top-8 right-4 w-12 h-8 rounded-t-lg bg-white/[0.04]" />
              </div>
              {/* Noise texture */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2Ij48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjgiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==')]" />

              <div className="relative z-10 max-w-sm">
                <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-[#c4a87a] mb-3">
                  Populær kategori
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                  Finn din perfekte sofa
                </h3>
                <p className="text-sm text-white/60 mb-5 leading-relaxed">
                  Sammenlign sofaer fra IKEA, Bohus, Bolia og flere.
                  Les våre grundige anmeldelser og finn den beste prisen.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#c4a87a] group-hover:gap-2.5 transition-all duration-300">
                  Utforsk sofaer <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* Stacked smaller campaigns */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/produkter?category=lampe" className="group flex-1">
              <div className="relative rounded-2xl overflow-hidden h-full min-h-[150px] flex items-end p-6 bg-gradient-to-br from-[#e8dfd2] to-[#d8ccbc]">
                <div className="absolute top-4 right-6 flex flex-col items-center opacity-20 group-hover:opacity-30 transition-opacity">
                  <div className="w-0.5 h-10 bg-foreground/40" />
                  <div className="w-10 h-6 rounded-b-full bg-foreground/30" />
                </div>
                <div className="relative z-10">
                  <span className="text-xs font-semibold tracking-[0.12em] uppercase text-accent mb-1.5 block">
                    Belysning
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    Lamper for enhver stil
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all duration-300">
                    Se lamper <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/produkter?category=teppe" className="group flex-1">
              <div className="relative rounded-2xl overflow-hidden h-full min-h-[150px] flex items-end p-6 bg-gradient-to-br from-[#d5d0c8] to-[#c8c0b4]">
                <div className="absolute top-1/2 right-6 -translate-y-1/2 w-16 h-16 rounded-full border-[3px] border-foreground/10 group-hover:border-foreground/15 transition-colors hidden sm:block" />
                <div className="relative z-10">
                  <span className="text-xs font-semibold tracking-[0.12em] uppercase text-accent mb-1.5 block">
                    Gulv &amp; komfort
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    Tepper fra 499 kr
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all duration-300">
                    Se tepper <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
