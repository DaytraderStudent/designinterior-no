"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { formatNOK } from "@/lib/utils";
import ProductImage from "@/components/ProductImage";
import { useRef } from "react";

// Get products with biggest discounts
function getDeals() {
  return products
    .filter((p) => p.discount_percent && p.discount_percent > 0 && p.image_url?.startsWith("http"))
    .sort((a, b) => (b.discount_percent || 0) - (a.discount_percent || 0))
    .slice(0, 8);
}

const deals = getDeals();

export default function FeaturesGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  if (deals.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-full mb-2">
              🏷️ Tilbud
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Spar med rabattkoder
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Scroll venstre"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Scroll høyre"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-3 md:grid-cols-4 sm:overflow-visible sm:pb-0"
        >
          {deals.map((product) => (
            <Link
              key={product.id}
              href={`/produkter/${product.id}`}
              className="min-w-[200px] sm:min-w-0 snap-start"
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-200 h-full border-border/50">
                <div className="relative">
                  <ProductImage
                    category={product.category}
                    brand={product.brand}
                    imageUrl={product.image_url}
                    className="aspect-square"
                    iconSize="lg"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                    -{product.discount_percent}%
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">{product.brand}</p>
                  <h3 className="font-medium text-sm line-clamp-1 mb-1.5">{product.name}</h3>

                  {product.discount_code && (
                    <div className="inline-flex items-center gap-1 bg-accent/10 border border-accent/20 rounded px-2 py-0.5 mb-2">
                      <span className="text-[10px] text-muted-foreground">KODE:</span>
                      <span className="text-xs font-mono font-bold text-accent">{product.discount_code}</span>
                    </div>
                  )}

                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-base font-bold text-red-600 dark:text-red-400">
                      {formatNOK(Math.round(product.price * (1 - (product.discount_percent || 0) / 100)))}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground line-through">
                      {formatNOK(product.price)}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
