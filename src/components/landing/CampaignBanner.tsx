import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CampaignBanner() {
  return (
    <section className="px-5 sm:px-8 pb-14 sm:pb-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-4">
          {/* Large campaign — sofa */}
          <Link href="/produkter?category=sofa" className="md:col-span-3 group">
            <div className="relative rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[320px] flex items-end">
              <Image
                src="/images/campaign-sofa.jpg"
                alt="Sofaer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="relative z-10 p-7 sm:p-9 max-w-sm">
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
            {/* Lamper */}
            <Link href="/produkter?category=lampe" className="group flex-1">
              <div className="relative rounded-2xl overflow-hidden h-full min-h-[150px] flex items-end">
                <Image
                  src="/images/campaign-lampe.jpg"
                  alt="Lamper"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="relative z-10 p-6">
                  <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#c4a87a] mb-1.5 block">
                    Belysning
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Lamper for enhver stil
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#c4a87a] group-hover:gap-2 transition-all duration-300">
                    Se lamper <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Tepper */}
            <Link href="/produkter?category=teppe" className="group flex-1">
              <div className="relative rounded-2xl overflow-hidden h-full min-h-[150px] flex items-end">
                <Image
                  src="/images/campaign-teppe.jpg"
                  alt="Tepper"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="relative z-10 p-6">
                  <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#c4a87a] mb-1.5 block">
                    Gulv &amp; komfort
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Tepper fra 499 kr
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#c4a87a] group-hover:gap-2 transition-all duration-300">
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
