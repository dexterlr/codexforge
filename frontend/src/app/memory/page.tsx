import type { Metadata } from "next";
import { buildArtifactIngestionSummary } from "@/lib/codexforge/artifact-ingestion";
import { buildArtifactWorkspaceContext } from "@/lib/codexforge/artifact-workspace";
import {
  buildMemoryReviewSummary,
  convertArtifactMemoryCandidateToReviewInput,
} from "@/lib/codexforge/memory-review";
import MemoryPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Memory Promotion Review Queue",
  description:
    "CodexForge Memory Review queue for deterministic candidate scoring, explicit approval, promotion event previews, and local review ledgers.",
};

export default function MemoryPage() {
  const workspaceContext = buildArtifactWorkspaceContext();
  const ingestion = buildArtifactIngestionSummary({
    exportRequests: [workspaceContext.sampleRequest],
  });
  const initialData = buildMemoryReviewSummary(
    ingestion.memoryCandidates.map(convertArtifactMemoryCandidateToReviewInput)
  );

  return <MemoryPageClient initialData={initialData} />;
}
