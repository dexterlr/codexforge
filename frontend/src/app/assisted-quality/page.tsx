import type { Metadata } from "next";
import AssistedQualityPageClient from "./page-client";

export const metadata: Metadata = { title: "CodexForge assisted MVP quality", description: "Quality sweep for the novice assisted MVP path." };

export default function Page() {
  return <AssistedQualityPageClient />;
}
