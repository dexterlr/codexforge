import type { Metadata } from "next";
import { buildRealCreativeExecutorMvpDesignModel } from "@/lib/codexforge/real-creative-executor-mvp";
import CreativeMvpPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Real Creative Executor MVP Design",
  description:
    "CodexForge Phase 72 Real Creative Executor MVP Design for selecting the smallest safe first MVP candidate, output boundary, approval packet, kill-switch posture, artifact review loop, and design-only readiness decision.",
};

export default function CreativeMvpPage() {
  return <CreativeMvpPageClient initialData={buildRealCreativeExecutorMvpDesignModel()} />;
}
