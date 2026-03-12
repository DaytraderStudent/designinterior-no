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

const categories = [
  { label: "Sofa", value: "sofa", icon: Sofa },
  { label: "Stol", value: "stol", icon: Armchair },
  { label: "Seng", value: "seng", icon: Bed },
  { label: "Bord", value: "bord", icon: Table },
  { label: "Lampe", value: "lampe", icon: Lamp },
  { label: "Teppe", value: "teppe", icon: Circle },
  { label: "Hylle", value: "hylle", icon: BookOpen },
  { label: "Kommode", value: "kommode", icon: Archive },
  { label: "Dekor", value: "dekor", icon: Flower2 },
  { label: "Pute", value: "pute", icon: Square },
];

export default function CategoryNav() {
  return (
    <section className="py-12 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">
          Utforsk etter kategori
        </h2>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.value}
                href={`/produkter?category=${cat.value}`}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-200">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary/70 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
