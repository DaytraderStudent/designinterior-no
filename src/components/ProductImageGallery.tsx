"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  productImage: string;
  lifestyleImage?: string;
  alt: string;
}

export default function ProductImageGallery({
  productImage,
  lifestyleImage,
  alt,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasLifestyle = !!lifestyleImage;

  const goNext = () => setActiveIndex((i) => (i === 0 && hasLifestyle ? 1 : 0));
  const goPrev = () => setActiveIndex((i) => (i === 1 ? 0 : i));

  return (
    <div>
      {/* Image carousel */}
      <div className="aspect-square bg-muted rounded-2xl overflow-hidden relative group">
        {/* Slide container */}
        <div
          className="flex h-full transition-transform duration-400 ease-in-out"
          style={{
            width: hasLifestyle ? "200%" : "100%",
            transform: hasLifestyle ? `translateX(-${activeIndex * 50}%)` : undefined,
          }}
        >
          {/* Slide 1: Product image */}
          <div className={cn("relative h-full shrink-0", hasLifestyle ? "w-1/2" : "w-full")}>
            <Image
              src={productImage}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
              priority
            />
          </div>

          {/* Slide 2: Lifestyle image */}
          {hasLifestyle && (
            <div className="relative w-1/2 h-full shrink-0">
              <Image
                src={lifestyleImage}
                alt={`${alt} i interiør`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              {/* AI badge */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                AI-generert interiørbilde
              </div>
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        {hasLifestyle && (
          <>
            <button
              onClick={goPrev}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center transition-opacity",
                activeIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover:opacity-100"
              )}
              aria-label="Forrige bilde"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center transition-opacity",
                activeIndex === 1 ? "opacity-0 pointer-events-none" : "opacity-0 group-hover:opacity-100"
              )}
              aria-label="Neste bilde"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    activeIndex === i ? "w-6 bg-white" : "w-2 bg-white/50"
                  )}
                  aria-label={i === 0 ? "Produktbilde" : "Interiørbilde"}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {hasLifestyle && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setActiveIndex(0)}
            className={cn(
              "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
              activeIndex === 0 ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image src={productImage} alt="Produkt" fill className="object-cover" sizes="64px" unoptimized />
          </button>
          <button
            onClick={() => setActiveIndex(1)}
            className={cn(
              "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
              activeIndex === 1 ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image src={lifestyleImage} alt="Interiør" fill className="object-cover" sizes="64px" unoptimized />
            <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[8px] text-center py-0.5">
              AI interiør
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
