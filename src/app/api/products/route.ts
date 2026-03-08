import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const style = searchParams.get("style");
    const color = searchParams.get("color");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (style) {
      filtered = filtered.filter((p) =>
        p.style_tags.some((s) => s.toLowerCase() === style.toLowerCase())
      );
    }

    if (color) {
      filtered = filtered.filter((p) =>
        p.color_tags.some((c) => c.toLowerCase() === color.toLowerCase())
      );
    }

    if (minPrice) {
      const min = parseFloat(minPrice);
      filtered = filtered.filter((p) => p.price >= min);
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      filtered = filtered.filter((p) => p.price <= max);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("Feil ved henting av produkter:", error);
    return NextResponse.json(
      { error: "Noe gikk galt ved henting av produkter." },
      { status: 500 }
    );
  }
}
