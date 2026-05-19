import type { Metadata } from "next";
import { buildBrainContinuitySummary } from "@/lib/codexforge/brain-continuity";
import BrainContinuityPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Brain Continuity Dashboard",
  description: "CodexForge read-only Brain continuity dashboard for memory growth, journal health, snapshots, replay, restore risk, and governance posture.",
};

export default function BrainContinuityPage() {
  const initialData = buildBrainContinuitySummary();
  return <BrainContinuityPageClient initialData={initialData} />;
}
