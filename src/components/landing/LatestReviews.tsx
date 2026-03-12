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
    <section className="py-16 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Siste anmeldelser
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Grundige tester av møbler og interiør
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex gap-1">
            <Link href="/produkter">
              Alle anmeldelser
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviewed.map((product) => (
            <Link key={product.id} href={`/produkter/${product.id}`}>
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-200 h-full border-border/50">
                <ProductImage
                  category={product.category}
                  brand={product.brand}
                  imageUrl={product.image_url}
                  className="aspect-[4/3]"
                  iconSize="lg"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{product.brand}</Badge>
                    <div className="flex items-center gap-0.5 ml-auto">
                      {[1,2,3,4,5].map(i => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                  <p className="font-mono text-sm font-bold text-accent mb-3">
                    {formatNOK(product.price)}
                  </p>

                  {/* Pros/Cons preview */}
                  {product.pros && product.pros.length > 0 && (
                    <div className="space-y-1 text-xs">
                      <div className="flex items-start gap-1.5 text-green-600 dark:text-green-400">
                        <ThumbsUp className="w-3 h-3 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{product.pros[0]}</span>
                      </div>
                      {product.cons && product.cons.length > 0 && (
                        <div className="flex items-start gap-1.5 text-red-500 dark:text-red-400">
                          <ThumbsDown className="w-3 h-3 mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{product.cons[0]}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-primary font-medium mt-3 group-hover:underline">
                    Les full anmeldelse &rarr;
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Button asChild variant="outline" className="gap-1">
            <Link href="/produkter">
              Se alle anmeldelser
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
