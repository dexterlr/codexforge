import type { Metadata } from "next";
import { buildProductionPack } from "@/lib/codexforge/production-pack";
import ProductionPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Production Pack Builder",
  description:
    "CodexForge Production Pack Builder for reviewable preview packs, manifests, export requests, validation, ledger, and replay prompts.",
};

export default function ProductionPage() {
  const initialData = buildProductionPack();
  return <ProductionPageClient initialData={initialData} />;
}
