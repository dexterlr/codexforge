import type { Metadata } from "next";
import BrainPageClient from "./page-client";

export const metadata: Metadata = {
  title: "CodexForge Brain",
  description: "Inspect the local CodexForge brain graph.",
};

export default function BrainPage() {
  return <BrainPageClient />;
}