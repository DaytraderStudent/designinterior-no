"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { products } from "@/data/products";
import { formatNOK } from "@/lib/utils";
import ProductImage from "@/components/ProductImage";

function getReviewedProducts() {
  const withReviews = products
    .filter((p) => p.review_sections && p.review_sections.length > 0 && p.image_url?.startsWith("http"))
    .sort((a, b) => b.rating - a.rating);

  const seen = new Set<string>();
  const result: typeof products = [];
  for (const p of withReviews) {
    if (result.length >= 3) break;
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
    <section className="py-14 sm:py-16 px-5 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Anmeldelser
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              Grundige tester &mdash; ærlige vurderinger
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex gap-1.5 text-accent hover:text-accent/80">
            <Link href="/produkter">
              Alle anmeldelser <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {reviewed.map((product) => (
            <Link key={product.id} href={`/produkter/${product.id}`}>
              <article className="product-card bg-card rounded-2xl border border-border/50 overflow-hidden group h-full flex flex-col sm:flex-row lg:flex-col">
                {/* Image */}
                <div className="relative overflow-hidden sm:w-48 lg:w-full shrink-0">
                  <ProductImage
                    category={product.category}
                    brand={product.brand}
                    imageUrl={product.image_url}
                    className="aspect-[4/3] sm:aspect-square lg:aspect-[4/3] group-hover:scale-[1.03] transition-transform duration-500"
                    iconSize="lg"
                  />
                  <div className="absolute bottom-3 right-3 bg-foreground/80 backdrop-blur-md text-background px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold">{product.rating.toFixed(1)}</span>
                    <span className="text-xs text-background/60">/5</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-3">
                    <p className="text-xs font-medium text-accent tracking-wide uppercase mb-1">{product.brand}</p>
                    <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
                      {product.name}
                    </h3>
                    <p className="font-mono text-base font-bold text-foreground mt-1">
                      {formatNOK(product.price)}
                    </p>
                  </div>

                  {product.review_summary && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                      &ldquo;{product.review_summary}&rdquo;
                    </p>
                  )}

                  <div className="space-y-2 mt-auto pt-4 border-t border-border/50">
                    {product.pros?.[0] && (
                      <div className="flex items-start gap-2 text-sm">
                        <ThumbsUp className="w-3.5 h-3.5 mt-0.5 shrink-0 text-green-600" />
                        <span className="text-foreground/80 line-clamp-1">{product.pros[0]}</span>
                      </div>
                    )}
                    {product.cons?.[0] && (
                      <div className="flex items-start gap-2 text-sm">
                        <ThumbsDown className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-500" />
                        <span className="text-foreground/80 line-clamp-1">{product.cons[0]}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-accent mt-4 group-hover:underline underline-offset-2">
                    Les full anmeldelse &rarr;
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
