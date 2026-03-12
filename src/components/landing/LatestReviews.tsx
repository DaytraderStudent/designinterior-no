"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { products } from "@/data/products";
import { formatNOK } from "@/lib/utils";
import ProductImage from "@/components/ProductImage";

// Get products with good reviews across different brands
function getReviewedProducts() {
  const withReviews = products
    .filter((p) => p.review_sections && p.review_sections.length > 0 && p.image_url?.startsWith("http"))
    .sort((a, b) => b.rating - a.rating);

  const seen = new Set<string>();
  const result: typeof products = [];
  for (const p of withReviews) {
    if (result.length >= 4) break;
    if (seen.has(p.brand)) continue;
    seen.add(p.brand);
    result.push(p);
  }
  return result;
}

const reviewed = getReviewedProducts();

export default function LatestReviews() {
  if (reviewed.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Siste anmeldelser
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Grundige tester av møbler og interiør
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex gap-1">
            <Link href="/produkter">
              Alle anmeldelser
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviewed.map((product) => (
            <Link key={product.id} href={`/produkter/${product.id}`}>
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-200 h-full border-border/50">
                <div className="relative">
                  <ProductImage
                    category={product.category}
                    brand={product.brand}
                    imageUrl={product.image_url}
                    className="aspect-[4/3]"
                    iconSize="lg"
                  />
                  {/* Rating badge overlay */}
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-0.5">{product.brand}</p>
                  <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                  <p className="font-mono text-sm font-bold text-foreground mb-3">
                    {formatNOK(product.price)}
                  </p>

                  {/* Review summary */}
                  {product.review_summary && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                      {product.review_summary}
                    </p>
                  )}

                  {/* Pros/Cons preview */}
                  <div className="space-y-1.5 text-xs border-t border-border/50 pt-3">
                    {product.pros && product.pros[0] && (
                      <div className="flex items-start gap-1.5 text-green-600 dark:text-green-400">
                        <ThumbsUp className="w-3 h-3 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{product.pros[0]}</span>
                      </div>
                    )}
                    {product.cons && product.cons[0] && (
                      <div className="flex items-start gap-1.5 text-red-500 dark:text-red-400">
                        <ThumbsDown className="w-3 h-3 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{product.cons[0]}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-primary font-semibold mt-3 group-hover:underline">
                    Les full anmeldelse &rarr;
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
