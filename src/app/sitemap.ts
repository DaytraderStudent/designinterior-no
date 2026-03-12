import { MetadataRoute } from "next";
import { products } from "@/data/products";

const BASE_URL = "https://xn--designinterir-mnb.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE_URL}/produkter`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/blogg`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/inspirasjon`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
  ];

  const productPages = products.map((p) => ({
    url: `${BASE_URL}/produkter/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
