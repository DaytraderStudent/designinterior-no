import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/landing/Footer";
import { reviews } from "@/data/reviews";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-1.5 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export const metadata = {
  title: "Produktanmeldelser — designinteriør.no",
  description: "Ærlige anmeldelser av møbler og interiørprodukter fra Norges mest populære butikker.",
};

export default function AnmeldelserPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wider">
            Anmeldelser
          </Badge>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Produktanmeldelser
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ærlige anmeldelser av møbler og interiørprodukter fra Norges mest populære butikker.
            Vi tester så du slipper å gjette.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <Link key={review.slug} href={`/anmeldelser/${review.slug}`}>
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <Image
                    src={review.product_image}
                    alt={review.product_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-card/90 backdrop-blur-sm text-foreground border-0 font-mono">
                      {review.rating.toFixed(1)} / 5
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {review.product_brand}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {review.product_category}
                    </Badge>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2 line-clamp-2">
                    {review.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {review.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
