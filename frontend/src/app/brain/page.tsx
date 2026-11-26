import type { Metadata } from "next";
import BrainPageClient from "./page-client";

export const metadata: Metadata = {
  title: "CodexForge Brain",
  description: "Recall project decisions, review their outcomes, and inspect the local Brain graph.",
};

export default function BrainPage() {
  return <BrainPageClient />;
}
