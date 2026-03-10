export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  affiliate_url: string;
  style_tags: string[];
  color_tags: string[];
  room_tags: string[];
  dimensions: { width: number; depth: number; height: number };
  in_stock: boolean;
  rating: number;
  pros: string[];
  cons: string[];
  review_summary: string;
  review_sections: { heading: string; content: string }[];
}

export interface RoomAnalysis {
  romtype: string;
  estimertStorrelse: string;
  stil: string;
  veggerFarge: string[];
  gulvType: string;
  eksisterendeMobler: string[];
  lysforhold: string;
  lysretning: string;
  forbedringsforslag: string[];
  anbefalteStiler: string[];
  anbefalteHovedfarger: string[];
}

export interface SessionProduct {
  id: string;
  product: Product;
  position: { x: number; y: number; rotation: number; scale: number };
  room_name: string;
  quantity: number;
}

export interface DesignSession {
  id: string;
  name: string;
  original_image_url: string | null;
  generated_image_url: string | null;
  canvas_state: unknown;
  room_analysis: RoomAnalysis | null;
  total_cost: number;
  products: SessionProduct[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface Review {
  slug: string;
  title: string;
  excerpt: string;
  product_name: string;
  product_brand: string;
  product_category: string;
  product_image: string;
  rating: number;
  author: string;
  date: string;
  hero_image: string;
  pros: string[];
  cons: string[];
  verdict: string;
  sections: { heading: string; content: string }[];
  related_product_ids?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  hero_image: string;
  category: string;
  read_time: string;
  sections: { heading: string; content: string; image?: string }[];
  tags: string[];
}
