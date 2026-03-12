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

function capitalize(str: string): string {
  return str.replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}

// Pick top-rated products with images, spread across categories
function getPopularProducts() {
  const withImages = products
    .filter((p) => p.image_url && p.image_url.startsWith("http"))
    .sort((a, b) => b.rating - a.rating);

  const seen = new Set<string>();
  const result: typeof products = [];

  for (const p of withImages) {
    if (result.length >= 12) break;
    const key = p.category;
    if (seen.size < 8 && seen.has(key)) continue;
    seen.add(key);
    result.push(p);
  }

  return result;
}

const popular = getPopularProducts();

export default function PopularProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Populære produkter
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Høyest rangert av våre redaktører
            </p>
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
            <Button asChild variant="ghost" size="sm" className="hidden md:flex gap-1 ml-2">
              <Link href="/produkter?sort=rating-desc">
                Se alle
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:overflow-visible sm:pb-0"
        >
          {popular.map((product) => (
            <Link
              key={product.id}
              href={`/produkter/${product.id}`}
              className="min-w-[180px] sm:min-w-0 snap-start"
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
                  {product.discount_percent && product.discount_percent > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      -{product.discount_percent}%
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">{product.brand}</p>
                  <h3 className="font-medium text-sm mb-1.5 line-clamp-2 leading-tight min-h-[2.5em]">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-1.5">
                    {[1,2,3,4,5].map(i => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-0.5">{product.rating.toFixed(1)}</span>
                  </div>
                  <p className="font-mono text-base font-bold text-foreground">
                    {formatNOK(product.price)}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Button asChild variant="outline" size="sm" className="gap-1">
            <Link href="/produkter?sort=rating-desc">
              Se alle produkter
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
