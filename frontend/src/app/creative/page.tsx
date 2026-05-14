import type { Metadata } from "next";
import { buildCreativeContext } from "@/lib/codexforge/creative";
import CreativePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Creative Production Studio",
  description:
    "CodexForge Creative Production Studio for preview-only creative briefs, storyboard planning, render queue previews, artifact galleries, and Safe Patch Preview handoff.",
};

export default function CreativePage() {
  const initialData = buildCreativeContext();
  return <CreativePageClient initialData={initialData} />;
}
