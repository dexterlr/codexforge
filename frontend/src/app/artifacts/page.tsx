import type { Metadata } from "next";
import { buildArtifactExecutorModel } from "@/lib/codexforge/artifact-executor";
import ArtifactsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Guarded Local Artifact Executor",
  description:
    "CodexForge Guarded Local Artifact Executor for preview-only artifact plans, policy boundaries, validation notes, ledgers, and run handoff.",
};

export default function ArtifactsPage() {
  const initialData = buildArtifactExecutorModel();
  return <ArtifactsPageClient initialData={initialData} />;
}
