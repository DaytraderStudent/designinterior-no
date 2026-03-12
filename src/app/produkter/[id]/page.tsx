import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star, ThumbsUp, ThumbsDown, CheckCircle, ExternalLink,
  Ruler, Tag, Palette, Home, ShoppingBag, Ticket, ArrowRight, Sparkles, ImageIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/landing/Footer";
import ProductImageGallery from "@/components/ProductImageGallery";
import { products } from "@/data/products";
import { formatNOK } from "@/lib/utils";
import type { Metadata } from "next";

/** Capitalize first letter of each word */
function capitalize(str: string): string {
  return str.replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Produkt ikke funnet" };
  const discountedPrice = Math.round(product.price * (1 - product.discount_percent / 100));
  return {
    title: `${product.name} fra ${product.brand} — Spar ${product.discount_percent}% med kode | designinteriør.no`,
    description: `Les vår anmeldelse av ${product.name} fra ${product.brand}. Bruk kode ${product.discount_code} og spar ${formatNOK(product.price - discountedPrice)}. Pris fra ${formatNOK(discountedPrice)}.`,
    openGraph: {
      title: `${product.name} — ${product.rating}/5 | Spar ${product.discount_percent}%`,
      description: product.review_summary,
      images: [{ url: product.image_url, alt: product.name }],
    },
  };
}

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "h-6 w-6" : size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className={`ml-2 font-bold ${size === "lg" ? "text-2xl" : "text-base"}`}>
        {rating.toFixed(1)}
      </span>
      <span className="text-muted-foreground ml-1">/ 5</span>
    </div>
  );
}

function BuyButton({ brand, affiliate_url, discountPercent, size = "lg" }: {
  brand: string; affiliate_url: string; discountPercent?: number; size?: "lg" | "default";
}) {
  return (
    <Button asChild size={size} className="gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg shadow-green-600/20">
      <a href={affiliate_url} target="_blank" rel="noopener noreferrer">
        <ShoppingBag className="h-4 w-4" />
        {discountPercent ? `Kjøp med ${discountPercent}% rabatt hos ${brand}` : `Kjøp hos ${brand}`}
        <ArrowRight className="h-4 w-4" />
      </a>
    </Button>
  );
}

function DiscountSection({ price, discountPercent, discountCode, brand, affiliateUrl }: {
  price: number; discountPercent: number; discountCode: string; brand: string; affiliateUrl: string;
}) {
  const savings = Math.round(price * (discountPercent / 100));
  const discountedPrice = price - savings;

  return (
    <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5 overflow-hidden">
      <CardContent className="p-0">
        {/* Top banner */}
        <div className="bg-green-600 text-white px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            <span className="font-semibold text-sm">Eksklusiv rabatt fra designinteriør.no</span>
          </div>
          <Badge className="bg-white/20 text-white border-white/30 text-xs">
            Spar {discountPercent}%
          </Badge>
        </div>

        <div className="p-5">
          {/* Price comparison */}
          <div className="flex items-center gap-6 mb-5">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Ordinær pris</p>
              <p className="font-mono text-xl text-muted-foreground line-through">{formatNOK(price)}</p>
            </div>
            <div className="text-2xl text-muted-foreground/30">→</div>
            <div>
              <p className="text-xs text-green-600 font-medium mb-0.5">Din pris med kode</p>
              <p className="font-mono text-3xl font-bold text-green-600">{formatNOK(discountedPrice)}</p>
            </div>
            <div className="ml-auto">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl px-4 py-2.5 text-center">
                <p className="text-xs text-green-700 dark:text-green-400">Du sparer</p>
                <p className="font-mono text-xl font-bold text-green-700 dark:text-green-400">{formatNOK(savings)}</p>
              </div>
            </div>
          </div>

          {/* Coupon code */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-muted/60 border-2 border-dashed border-green-500/40 rounded-lg px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Rabattkode</p>
                <p className="font-mono text-lg font-bold tracking-widest text-foreground">{discountCode}</p>
              </div>
              <Ticket className="h-5 w-5 text-green-500" />
            </div>
          </div>

          <p className="text-xs text-muted-foreground mb-4">
            Bruk koden <strong>{discountCode}</strong> i kassen hos {brand} for å få {discountPercent}% rabatt.
            Tilbudet gjelder så lenge lageret rekker.
          </p>

          {/* CTA */}
          <Button asChild size="lg" className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg shadow-green-600/20">
            <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="h-5 w-5" />
              Kjøp med {discountPercent}% rabatt hos {brand}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountedPrice = Math.round(product.price * (1 - product.discount_percent / 100));

  // JSON-LD with Review + Offer structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    image: product.image_url,
    review: {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: product.rating, bestRating: 5 },
      author: { "@type": "Organization", name: "designinteriør.no" },
      reviewBody: product.review_summary,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      bestRating: 5,
      ratingCount: 1,
    },
    offers: {
      "@type": "Offer",
      price: discountedPrice,
      priceCurrency: "NOK",
      availability: product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Hjem</Link>
          <span>/</span>
          <Link href="/produkter" className="hover:text-foreground transition-colors">Produkter</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="max-w-5xl mx-auto">
          {/* ============ PRODUCT HERO ============ */}
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            {/* Image gallery with AI lifestyle image */}
            <div className="md:w-1/2">
              <ProductImageGallery
                productImage={product.image_url}
                lifestyleImage={product.lifestyle_image_url}
                alt={`${product.name} fra ${product.brand}`}
              />
            </div>

            {/* Info */}
            <div className="md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Badge>{product.brand}</Badge>
                <Badge variant="outline">{capitalize(product.category)}</Badge>
                {product.in_stock ? (
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                    På lager
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-red-500/20">
                    Utsolgt
                  </Badge>
                )}
              </div>

              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
                {product.name}
              </h1>

              <StarRating rating={product.rating} size="lg" />

              <p className="text-muted-foreground mt-4 mb-5 leading-relaxed">
                {product.description}
              </p>

              {/* Price with discount teaser */}
              <div className="flex items-end gap-3 mb-2">
                <span className="font-mono text-lg text-muted-foreground line-through">{formatNOK(product.price)}</span>
                <span className="font-mono text-3xl font-bold text-green-600">{formatNOK(discountedPrice)}</span>
                <Badge className="bg-green-600 text-white border-0 mb-1">-{product.discount_percent}%</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-5">
                Med kode <span className="font-mono font-bold text-green-600">{product.discount_code}</span> — spar {formatNOK(product.price - discountedPrice)}
              </p>

              {/* Top buy button + try in room */}
              <div className="flex gap-3 mb-6">
                <BuyButton brand={product.brand} affiliate_url={product.affiliate_url} discountPercent={product.discount_percent} />
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link href="/design">
                    Prøv i rommet ditt
                  </Link>
                </Button>
              </div>

              <Separator className="my-4" />

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Ruler className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Dimensjoner</p>
                    <p className="text-sm font-medium">
                      {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height} cm
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Stil</p>
                    <p className="text-sm font-medium">{product.style_tags.map(capitalize).join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Palette className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Farger</p>
                    <p className="text-sm font-medium">{product.color_tags.map(capitalize).join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Passer i</p>
                    <p className="text-sm font-medium">{product.room_tags.map(capitalize).join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ DISCOUNT / COUPON SECTION ============ */}
          <div className="mb-12">
            <DiscountSection
              price={product.price}
              discountPercent={product.discount_percent}
              discountCode={product.discount_code}
              brand={product.brand}
              affiliateUrl={product.affiliate_url}
            />
          </div>

          {/* ============ OUR REVIEW ============ */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-display text-2xl lg:text-3xl font-bold">
                Vår vurdering av {product.name}
              </h2>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-sm">
                {product.rating.toFixed(1)}/5
              </Badge>
            </div>

            {/* Pros & Cons */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ThumbsUp className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold text-green-700 dark:text-green-400">Det vi likte</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ThumbsDown className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold text-red-700 dark:text-red-400">Det vi ikke likte</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500 mt-0.5 shrink-0 font-bold">✕</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Review article sections */}
            <div className="space-y-8 mb-10">
              {product.review_sections.map((section, i) => (
                <section key={i}>
                  <h3 className="font-display text-xl font-bold mb-3">{section.heading}</h3>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </section>
              ))}
            </div>

            {/* Verdict box */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-xl font-bold text-primary">Vår dom</h3>
                  <StarRating rating={product.rating} size="md" />
                </div>
                <p className="text-foreground leading-relaxed">{product.review_summary}</p>
              </CardContent>
            </Card>
          </div>

          {/* ============ BOTTOM BUY CTA ============ */}
          <Card className="border-2 border-green-500/20 bg-green-500/5 mb-12">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold mb-1">
                    Klar til å kjøpe {product.name}?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Bruk kode <span className="font-mono font-bold text-green-600">{product.discount_code}</span> og spar{" "}
                    <span className="font-semibold text-green-600">{formatNOK(product.price - discountedPrice)}</span> hos {product.brand}
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <BuyButton brand={product.brand} affiliate_url={product.affiliate_url} discountPercent={product.discount_percent} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ============ RELATED PRODUCTS ============ */}
          {related.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-6">
                Lignende produkter
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => {
                  const relDiscount = Math.round(p.price * (1 - p.discount_percent / 100));
                  return (
                    <Link key={p.id} href={`/produkter/${p.id}`}>
                      <Card className="overflow-hidden group hover:shadow-md transition-all">
                        <div className="aspect-square bg-muted relative overflow-hidden">
                          <Image
                            src={p.image_url}
                            alt={`${p.name} fra ${p.brand}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="25vw"
                            unoptimized
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-green-600 text-white border-0 text-[10px]">
                              -{p.discount_percent}%
                            </Badge>
                          </div>
                        </div>
                        <div className="p-3">
                          <Badge variant="secondary" className="text-xs mb-1">{p.brand}</Badge>
                          <p className="text-sm font-medium line-clamp-1">{p.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="font-mono text-xs text-muted-foreground line-through">{formatNOK(p.price)}</p>
                            <p className="font-mono text-sm font-bold text-green-600">{formatNOK(relDiscount)}</p>
                          </div>
                          <div className="flex items-center gap-0.5 mt-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-medium">{p.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
