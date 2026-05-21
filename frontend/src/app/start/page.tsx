import { buildProductSimplificationSummary } from "@/lib/codexforge/product-simplification";
import StartPageClient from "./page-client";

export default function StartPage() {
  return <StartPageClient initialData={buildProductSimplificationSummary()} />;
}
