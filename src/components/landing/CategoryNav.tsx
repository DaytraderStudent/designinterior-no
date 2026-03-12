"use client";

import Link from "next/link";
import { products } from "@/data/products";

const categories = [
  { label: "Sofaer", value: "sofa", image: "/images/cat-sofa.jpg" },
  { label: "Stoler", value: "stol", image: "/images/cat-stol.jpg" },
  { label: "Senger", value: "seng", image: "/images/cat-seng.jpg" },
  { label: "Bord", value: "bord", image: "/images/cat-bord.jpg" },
  { label: "Lamper", value: "lampe", image: "/images/cat-lampe.jpg" },
  { label: "Tepper", value: "teppe", image: "/images/cat-teppe.jpg" },
  { label: "Hyller", value: "hylle", image: "/images/cat-hylle.jpg" },
  { label: "Kommoder", value: "kommode", image: "/images/cat-kommode.jpg" },
  { label: "Dekor", value: "dekor", image: "/images/cat-dekor.jpg" },
  { label: "Puter", value: "pute", image: "/images/cat-pute.jpg" },
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
            const count = categoryCounts[cat.value] || 0;
            return (
              <Link key={cat.value} href={`/produkter?category=${cat.value}`}>
                <div className="category-tile relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer">
                  {/* Category image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {/* Label */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10">
                    <h3 className="font-display text-lg font-semibold text-white drop-shadow-md">
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
