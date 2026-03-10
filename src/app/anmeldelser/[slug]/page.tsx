import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/landing/Footer";
import { reviews } from "@/data/reviews";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = reviews.find((r) => r.slug === slug);
  if (!review) return { title: "Anmeldelse ikke funnet" };
  return {
    title: `${review.title} — designinteriør.no`,
    description: review.excerpt,
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
              : i - 0.5 <= rating
              ? "fill-amber-400/50 text-amber-400"
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

export default async function AnmeldelsePage({ params }: Props) {
  const { slug } = await params;
  const review = reviews.find((r) => r.slug === slug);
  if (!review) notFound();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/anmeldelser"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Tilbake til anmeldelser
        </Link>

        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            {/* Product image */}
            <div className="md:w-2/5">
              <div className="aspect-square bg-muted rounded-2xl overflow-hidden relative">
                <Image
                  src={review.product_image}
                  alt={review.product_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  unoptimized
                  priority
                />
              </div>
            </div>

            {/* Product info */}
            <div className="md:w-3/5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Badge>{review.product_brand}</Badge>
                <Badge variant="outline">{review.product_category}</Badge>
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {review.title}
              </h1>
              <p className="text-muted-foreground mb-4">{review.excerpt}</p>
              <StarRating rating={review.rating} size="lg" />
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span>Av {review.author}</span>
                <span>·</span>
                <span>{review.date}</span>
              </div>
            </div>
          </div>

          <Separator className="mb-10" />

          {/* Pros & Cons */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ThumbsUp className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold text-green-700 dark:text-green-400">Fordeler</h3>
                </div>
                <ul className="space-y-2">
                  {review.pros.map((pro, i) => (
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
                  <h3 className="font-semibold text-red-700 dark:text-red-400">Ulemper</h3>
                </div>
                <ul className="space-y-2">
                  {review.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-red-500 mt-0.5 shrink-0">✕</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Article sections */}
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-10">
            {review.sections.map((section, i) => (
              <div key={i} className="mb-8">
                <h2 className="font-display text-2xl font-bold mb-3">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Verdict */}
          <Card className="border-primary/20 bg-primary/5 mb-10">
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-bold mb-3 text-primary">Vår dom</h3>
              <p className="text-foreground leading-relaxed">{review.verdict}</p>
              <div className="mt-4">
                <StarRating rating={review.rating} size="md" />
              </div>
            </CardContent>
          </Card>

          {/* Other reviews */}
          {reviews.filter((r) => r.slug !== review.slug).length > 0 && (
            <div className="mb-10">
              <h3 className="font-display text-xl font-bold mb-6">Andre anmeldelser</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews
                  .filter((r) => r.slug !== review.slug)
                  .slice(0, 3)
                  .map((r) => (
                    <Link key={r.slug} href={`/anmeldelser/${r.slug}`}>
                      <Card className="overflow-hidden group hover:shadow-md transition-all">
                        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                          <Image
                            src={r.product_image}
                            alt={r.product_name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="33vw"
                            unoptimized
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-semibold line-clamp-1">{r.title}</p>
                          <div className="flex items-center gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i <= Math.round(r.rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
