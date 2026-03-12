"use client";

import Link from "next/link";
import {
  Sofa,
  Armchair,
  Bed,
  Lamp,
  Table,
  Circle,
  Square,
  BookOpen,
  Archive,
  Flower2,
} from "lucide-react";
import { products } from "@/data/products";

const categories = [
  { label: "Sofaer", value: "sofa", icon: Sofa, bg: "from-[#d4c5b0] to-[#c9b99e]" },
  { label: "Stoler", value: "stol", icon: Armchair, bg: "from-[#b8c4b0] to-[#a8b6a0]" },
  { label: "Senger", value: "seng", icon: Bed, bg: "from-[#bec4d0] to-[#aeb6c4]" },
  { label: "Bord", value: "bord", icon: Table, bg: "from-[#d0c4b0] to-[#c4b8a4]" },
  { label: "Lamper", value: "lampe", icon: Lamp, bg: "from-[#d4cbb4] to-[#c8bf a8]" },
  { label: "Tepper", value: "teppe", icon: Circle, bg: "from-[#c4b8c8] to-[#b8acbc]" },
  { label: "Hyller", value: "hylle", icon: BookOpen, bg: "from-[#c8bca8] to-[#bcb09c]" },
  { label: "Kommoder", value: "kommode", icon: Archive, bg: "from-[#b4c4c0] to-[#a8b8b4]" },
  { label: "Dekor", value: "dekor", icon: Flower2, bg: "from-[#d0b8b0] to-[#c4aca4]" },
  { label: "Puter", value: "pute", icon: Square, bg: "from-[#c8c0c8] to-[#bcb4bc]" },
];

// Count products per category
const categoryCounts: Record<string, number> = {};
products.forEach((p) => {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
});

export default function CategoryNav() {
  return (
    <section className="py-14 sm:py-16 px-5 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Utforsk kategorier
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              Finn møbler og interiør i din stil
            </p>
          </div>
          <Link
            href="/produkter"
            className="text-sm font-medium text-accent hover:text-accent/80 transition-colors hidden sm:block"
          >
            Vis alle produkter &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = categoryCounts[cat.value] || 0;
            return (
              <Link key={cat.value} href={`/produkter?category=${cat.value}`}>
                <div className={`category-tile relative rounded-2xl bg-gradient-to-br ${cat.bg} overflow-hidden aspect-[4/3] flex flex-col justify-end p-4 sm:p-5 group cursor-pointer`}>
                  {/* Large icon as background element */}
                  <Icon
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 text-white/20 group-hover:text-white/30 transition-colors duration-500 group-hover:scale-110"
                    strokeWidth={1}
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/25 to-transparent" />
                  <div className="relative z-10">
                    <h3 className="font-display text-lg font-semibold text-white drop-shadow-sm">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-white/70 mt-0.5">
                      {count} produkter
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
