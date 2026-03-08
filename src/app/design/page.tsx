"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Upload,
  Save,
  Share2,
  ChevronLeft,
  ChevronRight,
  Home,
  Loader2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import FurniturePicker from "@/components/editor/FurniturePicker";
import ColorPicker from "@/components/editor/ColorPicker";
import AIAssistant from "@/components/editor/AIAssistant";
import CostOverview from "@/components/editor/CostOverview";
import CanvasEditor from "@/components/editor/CanvasEditor";
import RoomUploader from "@/components/editor/RoomUploader";
import RoomAnalysisPanel from "@/components/editor/RoomAnalysisPanel";
import { formatNOK } from "@/lib/utils";
import {
  createSession,
  updateSession,
  getSession,
  addSessionProduct,
  removeSessionProduct,
  updateSessionProduct,
  getSessionProducts,
  supabase,
} from "@/lib/supabase";
import type { RoomAnalysis, SessionProduct, Product } from "@/types";

export default function DesignPage() {
  // --- State ---
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [roomAnalysis, setRoomAnalysis] = useState<RoomAnalysis | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<SessionProduct[]>(
    []
  );
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [showUploader, setShowUploader] = useState(true);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [projectName, setProjectName] = useState("Mitt prosjekt");
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Map local session product IDs to Supabase session_product IDs
  const dbProductIds = useRef<Map<string, string>>(new Map());

  // --- Computed ---
  const totalCost = useMemo(
    () =>
      selectedProducts.reduce(
        (sum, sp) => sum + sp.product.price * sp.quantity,
        0
      ),
    [selectedProducts]
  );

  // --- Restore or create session on mount ---
  useEffect(() => {
    async function initSession() {
      const STORAGE_KEY = "designinterior_session_id";
      const existingId = localStorage.getItem(STORAGE_KEY);

      // Try to restore existing session
      if (existingId) {
        const existing = await getSession(existingId);
        if (existing) {
          setSessionId(existing.id);
          setProjectName(existing.name || "Mitt prosjekt");
          if (existing.room_analysis) {
            setRoomAnalysis(existing.room_analysis);
          }

          // Restore session products
          const dbProducts = await getSessionProducts(existing.id);
          if (dbProducts.length > 0) {
            // Fetch full product data for each session_product
            const productIds = dbProducts.map((sp) => sp.product_id);
            const { data: products } = await supabase
              .from("products")
              .select("*")
              .in("id", productIds);

            if (products) {
              const productMap = new Map(products.map((p) => [p.id, p]));
              const restored: SessionProduct[] = [];
              for (const sp of dbProducts) {
                const product = productMap.get(sp.product_id);
                if (product) {
                  const localId = `${sp.product_id}-${Date.now()}-${Math.random()}`;
                  dbProductIds.current.set(localId, sp.id);
                  restored.push({
                    id: localId,
                    product: product as Product,
                    position: sp.position as SessionProduct["position"],
                    room_name: sp.room_name,
                    quantity: sp.quantity,
                  });
                }
              }
              setSelectedProducts(restored);
            }
          }

          if (existing.room_analysis || dbProducts.length > 0) {
            setShowUploader(false);
          }
          return;
        }
      }

      // Create new session
      const session = await createSession("Mitt prosjekt");
      if (session) {
        setSessionId(session.id);
        localStorage.setItem(STORAGE_KEY, session.id);
      }
    }
    initSession();
  }, []);

  // --- Handlers ---
  const handleImageUpload = useCallback(async (base64: string) => {
    setBackgroundImage(base64);
    setShowUploader(false);
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const res = await fetch("/api/analyze-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      const data = await res.json();

      if (res.ok && !data.error) {
        setRoomAnalysis(data);
      } else {
        const errorMsg = data.error || "Romanalysen feilet. Prøv igjen.";
        setAnalysisError(errorMsg);
        console.error("Romanalyse feilet:", errorMsg);
      }
    } catch (err) {
      setAnalysisError("Kunne ikke koble til serveren. Prøv igjen senere.");
      console.error("Romanalyse feilet:", err);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleAddProduct = useCallback(
    async (product: Product) => {
      const localId = `${product.id}-${Date.now()}`;
      const sessionProduct: SessionProduct = {
        id: localId,
        product,
        position: { x: 300, y: 300, rotation: 0, scale: 1 },
        room_name: "Stue",
        quantity: 1,
      };
      setSelectedProducts((prev) => [...prev, sessionProduct]);

      // Persist to Supabase if session exists
      if (sessionId) {
        const dbId = await addSessionProduct(
          sessionId,
          product.id,
          sessionProduct.position,
          sessionProduct.room_name
        );
        if (dbId) {
          dbProductIds.current.set(localId, dbId);
        }
      }
    },
    [sessionId]
  );

  const handleUpdateProduct = useCallback(
    async (
      id: string,
      position: { x: number; y: number; rotation: number; scale: number }
    ) => {
      setSelectedProducts((prev) =>
        prev.map((sp) => (sp.id === id ? { ...sp, position } : sp))
      );

      // Persist position to Supabase
      const dbId = dbProductIds.current.get(id);
      if (dbId) {
        await updateSessionProduct(dbId, { position });
      }
    },
    []
  );

  const handleRemoveProduct = useCallback(async (id: string) => {
    setSelectedProducts((prev) => prev.filter((sp) => sp.id !== id));
    setSelectedProductId((prev) => (prev === id ? null : prev));

    // Remove from Supabase
    const dbId = dbProductIds.current.get(id);
    if (dbId) {
      await removeSessionProduct(dbId);
      dbProductIds.current.delete(id);
    }
  }, []);

  const handleSave = useCallback(async () => {
    if (!sessionId) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
      return;
    }

    setIsSaving(true);
    setSaveStatus("idle");

    const success = await updateSession(sessionId, {
      name: projectName,
      room_analysis: roomAnalysis,
      total_cost: totalCost,
    });

    setIsSaving(false);
    setSaveStatus(success ? "saved" : "error");
    setTimeout(() => setSaveStatus("idle"), 2000);
  }, [sessionId, projectName, roomAnalysis, totalCost]);

  // --- Left sidebar content (shared between desktop and mobile sheet) ---
  const leftSidebarContent = (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="mobler" className="flex flex-col flex-1 min-h-0">
        <TabsList className="w-full shrink-0">
          <TabsTrigger value="mobler" className="flex-1">
            Møbler
          </TabsTrigger>
          <TabsTrigger value="farger" className="flex-1">
            Farger
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="mobler"
          className="flex-1 overflow-y-auto mt-0 p-2"
        >
          <FurniturePicker onAddProduct={handleAddProduct} />
        </TabsContent>
        <TabsContent
          value="farger"
          className="flex-1 overflow-y-auto mt-0 p-2"
        >
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </TabsContent>
      </Tabs>

      {analysisError && (
        <div className="border-t p-3">
          <p className="text-xs text-destructive">{analysisError}</p>
        </div>
      )}

      {(roomAnalysis || isAnalyzing) && (
        <div className="border-t p-2 overflow-y-auto max-h-64">
          <RoomAnalysisPanel analysis={roomAnalysis} isLoading={isAnalyzing} />
        </div>
      )}
    </div>
  );

  // --- Right sidebar content ---
  const rightSidebarContent = (
    <div className="h-full">
      <AIAssistant
        sessionId={sessionId}
        roomAnalysis={roomAnalysis}
        selectedProducts={selectedProducts}
        totalCost={totalCost}
      />
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* ============ TOP BAR ============ */}
      <header className="h-14 shrink-0 border-b bg-card flex items-center justify-between px-3 gap-2 z-30">
        {/* Left: mobile sidebar toggle + logo */}
        <div className="flex items-center gap-2">
          {/* Mobile: left sidebar toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Åpne møbelvelger"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetTitle className="sr-only">Møbelvelger</SheetTitle>
              {leftSidebarContent}
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link
            href="/"
            className="font-display text-lg font-semibold text-primary hover:opacity-80 transition-opacity hidden sm:block"
          >
            designinterior.no
          </Link>
          <Link
            href="/"
            className="sm:hidden"
            aria-label="Til forsiden"
          >
            <Home className="h-5 w-5 text-primary" />
          </Link>
        </div>

        {/* Center: project name */}
        <div className="flex items-center gap-2 flex-1 justify-center min-w-0">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent border-none text-center text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary rounded px-2 py-1 max-w-[200px] truncate"
            aria-label="Prosjektnavn"
          />
        </div>

        {/* Right: actions + mobile right sidebar toggle */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowUploader(true);
            }}
            className="hidden sm:inline-flex"
          >
            <Upload className="h-4 w-4 mr-1" />
            Nytt bilde
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setShowUploader(true);
            }}
            className="sm:hidden"
            aria-label="Last opp nytt bilde"
          >
            <Upload className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="hidden sm:inline-flex"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : saveStatus === "saved" ? (
              <Check className="h-4 w-4 mr-1 text-green-500" />
            ) : (
              <Save className="h-4 w-4 mr-1" />
            )}
            {isSaving ? "Lagrer..." : saveStatus === "saved" ? "Lagret!" : "Lagre"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            disabled={isSaving}
            className="sm:hidden"
            aria-label="Lagre"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saveStatus === "saved" ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Save className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert("Delingsfunksjon kommer snart")}
            className="hidden sm:inline-flex"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Del
          </Button>

          {/* Mobile: right sidebar toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Åpne AI-assistent"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <SheetTitle className="sr-only">AI-assistent</SheetTitle>
              {rightSidebarContent}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ============ MAIN AREA ============ */}
      <div className="flex-1 flex min-h-0">
        {/* --- Left sidebar (desktop) --- */}
        <aside
          className={`hidden lg:flex flex-col border-r bg-card transition-all duration-300 ${
            leftSidebarOpen ? "w-80" : "w-0 overflow-hidden"
          }`}
        >
          {leftSidebarOpen && (
            <>
              <div className="flex items-center justify-between p-2 border-b">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Verktøy
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLeftSidebarOpen(false)}
                  aria-label="Skjul venstre panel"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                {leftSidebarContent}
              </div>
            </>
          )}
        </aside>

        {/* Collapsed left sidebar toggle */}
        {!leftSidebarOpen && (
          <button
            onClick={() => setLeftSidebarOpen(true)}
            className="hidden lg:flex items-center justify-center w-6 border-r bg-card hover:bg-accent transition-colors"
            aria-label="Vis venstre panel"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        )}

        {/* --- Center: Canvas / Uploader --- */}
        <main className="flex-1 relative min-w-0 bg-muted/30">
          {/* Room uploader overlay */}
          {showUploader && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="relative w-full max-w-xl mx-4">
                {backgroundImage && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowUploader(false)}
                    className="absolute -top-10 right-0 z-10"
                    aria-label="Lukk opplasting"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
                <RoomUploader
                  onImageUpload={handleImageUpload}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            </div>
          )}

          {/* Canvas editor (visible when image is loaded) */}
          {backgroundImage && !showUploader && (
            <CanvasEditor
              backgroundImage={backgroundImage}
              products={selectedProducts}
              onUpdateProduct={handleUpdateProduct}
              onSelectProduct={setSelectedProductId}
              selectedProductId={selectedProductId}
            />
          )}

          {/* Empty state when no image and uploader closed */}
          {!backgroundImage && !showUploader && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
              <Upload className="h-12 w-12" />
              <p className="text-lg">Last opp et bilde av rommet ditt for å komme i gang</p>
              <Button onClick={() => setShowUploader(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Last opp bilde
              </Button>
            </div>
          )}
        </main>

        {/* Collapsed right sidebar toggle */}
        {!rightSidebarOpen && (
          <button
            onClick={() => setRightSidebarOpen(true)}
            className="hidden lg:flex items-center justify-center w-6 border-l bg-card hover:bg-accent transition-colors"
            aria-label="Vis AI-assistent"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        )}

        {/* --- Right sidebar (desktop) --- */}
        <aside
          className={`hidden lg:flex flex-col border-l bg-card transition-all duration-300 ${
            rightSidebarOpen ? "w-80" : "w-0 overflow-hidden"
          }`}
        >
          {rightSidebarOpen && (
            <>
              <div className="flex items-center justify-between p-2 border-b">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  AI-assistent
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setRightSidebarOpen(false)}
                  aria-label="Skjul AI-assistent"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                {rightSidebarContent}
              </div>
            </>
          )}
        </aside>
      </div>

      {/* ============ BOTTOM BAR ============ */}
      <footer className="shrink-0 border-t bg-card">
        <CostOverview
          products={selectedProducts}
          onRemoveProduct={handleRemoveProduct}
        />
      </footer>
    </div>
  );
}
