import { NextRequest, NextResponse } from "next/server";
import { products as hardcodedProducts } from "@/data/products";
import { fetchProducts } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") || undefined;
    const brand = searchParams.get("brand") || undefined;
    const style = searchParams.get("style") || undefined;
    const color = searchParams.get("color") || undefined;
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search") || undefined;

    // Try Supabase first
    const supabaseProducts = await fetchProducts({
      category,
      brand,
      style,
      color,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      search,
    });

    if (supabaseProducts.length > 0) {
      return NextResponse.json(supabaseProducts);
    }

    // Fallback to hardcoded data
    let filtered = [...hardcodedProducts];

    if (category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (brand) {
      filtered = filtered.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase()
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
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.brand.toLowerCase().includes(searchLower)
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
