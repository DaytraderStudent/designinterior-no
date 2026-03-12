"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CampaignBanner() {
  return (
    <section className="px-4 sm:px-6 pb-10 sm:pb-14 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Campaign 1 */}
          <Link href="/produkter?category=sofa" className="group">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#f5ebe0] to-[#ede0d4] min-h-[220px] sm:min-h-[280px] flex items-end p-6 sm:p-8">
              <div className="absolute top-4 right-4 text-6xl sm:text-7xl opacity-20 select-none">🛋️</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7f5539] mb-1">
                  Populært nå
                </p>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#3e2723] mb-2">
                  Finn din drømmesofa
                </h3>
                <p className="text-sm text-[#6d4c41] mb-3 max-w-xs">
                  Sammenlign sofaer fra IKEA, Bohus, Bolia og flere. Les anmeldelser og finn den beste prisen.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#7f5539] group-hover:gap-2 transition-all">
                  Se sofaer <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* Campaign 2 */}
          <Link href="/produkter?category=lampe" className="group">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#e8e0d8] to-[#d5c4a1] min-h-[220px] sm:min-h-[280px] flex items-end p-6 sm:p-8">
              <div className="absolute top-4 right-4 text-6xl sm:text-7xl opacity-20 select-none">💡</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5d4037] mb-1">
                  Lysne opp hjemmet
                </p>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#3e2723] mb-2">
                  Lamper for enhver stil
                </h3>
                <p className="text-sm text-[#6d4c41] mb-3 max-w-xs">
                  Fra skandinavisk minimalistisk til industrielt design. Over 40 lamper å velge mellom.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#5d4037] group-hover:gap-2 transition-all">
                  Se lamper <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
