export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image_url: string;
  affiliate_url: string;
  style_tags: string[];
  color_tags: string[];
  room_tags: string[];
  dimensions: { width: number; depth: number; height: number };
  in_stock: boolean;
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
