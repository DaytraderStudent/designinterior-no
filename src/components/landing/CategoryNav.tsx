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
  { label: "Sofa", value: "sofa", icon: Sofa, color: "from-blue-100 to-blue-50", iconColor: "text-blue-500" },
  { label: "Stol", value: "stol", icon: Armchair, color: "from-green-100 to-green-50", iconColor: "text-green-500" },
  { label: "Seng", value: "seng", icon: Bed, color: "from-indigo-100 to-indigo-50", iconColor: "text-indigo-500" },
  { label: "Bord", value: "bord", icon: Table, color: "from-amber-100 to-amber-50", iconColor: "text-amber-600" },
  { label: "Lampe", value: "lampe", icon: Lamp, color: "from-yellow-100 to-yellow-50", iconColor: "text-yellow-600" },
  { label: "Teppe", value: "teppe", icon: Circle, color: "from-purple-100 to-purple-50", iconColor: "text-purple-500" },
  { label: "Hylle", value: "hylle", icon: BookOpen, color: "from-orange-100 to-orange-50", iconColor: "text-orange-500" },
  { label: "Kommode", value: "kommode", icon: Archive, color: "from-teal-100 to-teal-50", iconColor: "text-teal-500" },
  { label: "Dekor", value: "dekor", icon: Flower2, color: "from-rose-100 to-rose-50", iconColor: "text-rose-500" },
  { label: "Pute", value: "pute", icon: Square, color: "from-pink-100 to-pink-50", iconColor: "text-pink-500" },
];

export default function CategoryNav() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Kategorier
          </h2>
          <Link href="/produkter" className="text-sm font-medium text-primary hover:underline">
            Se alle &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.value}
                href={`/produkter?category=${cat.value}`}
                className="group"
              >
                <div className={`aspect-square rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-105 group-hover:shadow-md transition-all duration-200`}>
                  <Icon className={`w-7 h-7 sm:w-9 sm:h-9 ${cat.iconColor} opacity-80 group-hover:opacity-100 transition-opacity`} strokeWidth={1.5} />
                </div>
                <p className="text-xs sm:text-sm font-medium text-center mt-2 text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat.label}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
