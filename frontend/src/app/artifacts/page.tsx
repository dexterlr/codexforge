import type { Metadata } from "next";
import { buildArtifactExecutorModel } from "@/lib/codexforge/artifact-executor";
import ArtifactsPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Guarded Artifact Workspace",
  description:
    "CodexForge Guarded Artifact Workspace for preview artifacts, explicit export approval, safe local review files, metadata, and replay ledgers.",
};

export default function ArtifactsPage() {
  const initialData = buildArtifactExecutorModel();
  return <ArtifactsPageClient initialData={initialData} />;
}
