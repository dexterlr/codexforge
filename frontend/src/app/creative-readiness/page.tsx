import type { Metadata } from "next";
import { buildRealCreativeExecutorReadinessModel } from "@/lib/codexforge/real-creative-executor-readiness";
import CreativeReadinessPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Real Creative Executor Readiness Audit",
  description:
    "CodexForge Phase 70 Real Creative Executor Readiness Audit for local bridge profiles, adapter allowlists, path boundaries, artifact output, dry-run evidence, approval, kill-switch, scorecard, and next safe action.",
};

export default function CreativeReadinessPage() {
  return <CreativeReadinessPageClient initialData={buildRealCreativeExecutorReadinessModel()} />;
}
