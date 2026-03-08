import { createClient } from "@supabase/supabase-js";
import type { Product, SessionProduct, ChatMessage, RoomAnalysis } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Sessions ────────────────────────────────────────────────

export interface DbSession {
  id: string;
  name: string;
  original_image_url: string | null;
  generated_image_url: string | null;
  canvas_state: unknown;
  room_analysis: RoomAnalysis | null;
  total_cost: number;
  created_at: string;
  updated_at: string;
}

export async function createSession(name: string): Promise<DbSession | null> {
  const { data, error } = await supabase
    .from("sessions")
    .insert({ name })
    .select()
    .single();

  if (error) {
    console.error("Feil ved opprettelse av session:", error.message);
    return null;
  }
  return data;
}

export async function updateSession(
  sessionId: string,
  updates: Partial<
    Pick<
      DbSession,
      | "name"
      | "original_image_url"
      | "generated_image_url"
      | "canvas_state"
      | "room_analysis"
      | "total_cost"
    >
  >
): Promise<boolean> {
  const { error } = await supabase
    .from("sessions")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", sessionId);

  if (error) {
    console.error("Feil ved oppdatering av session:", error.message);
    return false;
  }
  return true;
}

export async function getSession(sessionId: string): Promise<DbSession | null> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", sessionId)
    .single();

  if (error) {
    console.error("Feil ved henting av session:", error.message);
    return null;
  }
  return data;
}

// ── Products ────────────────────────────────────────────────

export async function fetchProducts(filters?: {
  category?: string;
  brand?: string;
  style?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): Promise<Product[]> {
  let query = supabase.from("products").select("*");

  if (filters?.category) {
    query = query.eq("category", filters.category.toLowerCase());
  }
  if (filters?.brand) {
    query = query.ilike("brand", filters.brand);
  }
  if (filters?.style) {
    query = query.contains("style_tags", [filters.style.toLowerCase()]);
  }
  if (filters?.color) {
    query = query.contains("color_tags", [filters.color.toLowerCase()]);
  }
  if (filters?.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice);
  }
  if (filters?.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }
  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,brand.ilike.%${filters.search}%`);
  }

  const { data, error } = await query.order("brand").order("name");

  if (error) {
    console.error("Feil ved henting av produkter fra Supabase:", error.message);
    return [];
  }
  return data as Product[];
}

// ── Session Products ────────────────────────────────────────

export async function addSessionProduct(
  sessionId: string,
  productId: string,
  position: { x: number; y: number; rotation: number; scale: number },
  roomName: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from("session_products")
    .insert({
      session_id: sessionId,
      product_id: productId,
      position,
      room_name: roomName,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Feil ved lagring av session-produkt:", error.message);
    return null;
  }
  return data.id;
}

export async function removeSessionProduct(sessionProductId: string): Promise<boolean> {
  const { error } = await supabase
    .from("session_products")
    .delete()
    .eq("id", sessionProductId);

  if (error) {
    console.error("Feil ved fjerning av session-produkt:", error.message);
    return false;
  }
  return true;
}

export async function updateSessionProduct(
  sessionProductId: string,
  updates: { position?: unknown; room_name?: string; quantity?: number }
): Promise<boolean> {
  const { error } = await supabase
    .from("session_products")
    .update(updates)
    .eq("id", sessionProductId);

  if (error) {
    console.error("Feil ved oppdatering av session-produkt:", error.message);
    return false;
  }
  return true;
}

export async function getSessionProducts(
  sessionId: string
): Promise<Array<{ id: string; product_id: string; position: unknown; room_name: string; quantity: number }>> {
  const { data, error } = await supabase
    .from("session_products")
    .select("*")
    .eq("session_id", sessionId)
    .order("added_at");

  if (error) {
    console.error("Feil ved henting av session-produkter:", error.message);
    return [];
  }
  return data;
}

// ── Chat Messages ───────────────────────────────────────────

export async function saveChatMessage(
  sessionId: string,
  role: "user" | "assistant",
  content: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from("chat_messages")
    .insert({ session_id: sessionId, role, content })
    .select("id")
    .single();

  if (error) {
    console.error("Feil ved lagring av chatmelding:", error.message);
    return null;
  }
  return data.id;
}

export async function getChatMessages(
  sessionId: string
): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("id, role, content, created_at")
    .eq("session_id", sessionId)
    .order("created_at");

  if (error) {
    console.error("Feil ved henting av chatmeldinger:", error.message);
    return [];
  }
  return data as ChatMessage[];
}
