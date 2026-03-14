"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { formatNOK } from "@/lib/utils";
import ProductImage from "@/components/ProductImage";
import { useRef } from "react";

function getPopularProducts() {
  const withImages = products
    .filter((p) => p.image_url && p.image_url.startsWith("http"))
    .sort((a, b) => b.rating - a.rating);

  const seen = new Set<string>();
  const result: typeof products = [];

  for (const p of withImages) {
    if (result.length >= 12) break;
    if (seen.size < 8 && seen.has(p.category)) continue;
    seen.add(p.category);
    result.push(p);
  }

  return result;
}

const popular = getPopularProducts();

export default function PopularProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-14 sm:py-16 px-5 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-7">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Populære produkter
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              Høyest rangert av våre redaktører
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-border hover:border-foreground/20 hover:bg-secondary transition-all"
              aria-label="Forrige"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-border hover:border-foreground/20 hover:bg-secondary transition-all"
              aria-label="Neste"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <Button asChild variant="ghost" size="sm" className="hidden md:flex gap-1.5 ml-1 text-accent hover:text-accent/80">
              <Link href="/produkter?sort=rating-desc">
                Se alle <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0"
        >
          {popular.map((product) => (
            <Link
              key={product.id}
              href={`/produkter/${product.id}`}
              className="min-w-[200px] sm:min-w-[220px] lg:min-w-0 snap-start"
            >
              <div className="product-card bg-card rounded-2xl border border-border/50 overflow-hidden h-full group">
                <div className="relative overflow-hidden">
                  <ProductImage
                    category={product.category}
                    brand={product.brand}
                    imageUrl={product.image_url}
                    className="aspect-square group-hover:scale-[1.03] transition-transform duration-500"
                    iconSize="lg"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                  <h3 className="font-medium text-sm mb-2 line-clamp-2 leading-snug min-h-[2.5em] text-foreground">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-0.5 mb-2.5">
                    {[1,2,3,4,5].map(i => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-border text-border"}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{product.rating.toFixed(1)}</span>
                  </div>
                  <p className="font-mono text-lg font-bold text-foreground tracking-tight">
                    {formatNOK(product.price)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2">
                    Se pris <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 lg:hidden">
          <Button asChild variant="outline" className="gap-1.5 rounded-xl">
            <Link href="/produkter?sort=rating-desc">
              Se alle produkter <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
