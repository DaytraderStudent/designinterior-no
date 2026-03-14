"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { products } from "@/data/products";
import { formatNOK } from "@/lib/utils";
import ProductImage from "@/components/ProductImage";
import { useRef } from "react";

function getTopRated() {
  return products
    .filter((p) => p.image_url?.startsWith("http") && p.rating >= 4)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);
}

const topRated = getTopRated();

export default function FeaturesGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  if (topRated.length === 0) return null;

  return (
    <section className="py-14 sm:py-16 px-5 sm:px-8 bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              Høyt rangert
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Bestselgere &amp; anbefalinger
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-border hover:border-foreground/20 hover:bg-card transition-all"
              aria-label="Forrige"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-border hover:border-foreground/20 hover:bg-card transition-all"
              aria-label="Neste"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible md:pb-0"
        >
          {topRated.map((product) => (
            <Link
              key={product.id}
              href={`/produkter/${product.id}`}
              className="min-w-[220px] md:min-w-0 snap-start"
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
                  <h3 className="font-medium text-sm line-clamp-1 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-0.5 mb-2.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i <= Math.round(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-border text-border"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="font-mono text-lg font-bold text-foreground tracking-tight">
                    {formatNOK(product.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
