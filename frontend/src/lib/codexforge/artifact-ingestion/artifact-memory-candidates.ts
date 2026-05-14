import type { CodexForgeBrainNode } from "@/lib/codexforge/brain/graph/types";
import { calculateMemoryConfidence } from "@/lib/codexforge/brain/runtime/memory";
import {
  buildArtifactIngestionStableKey,
  type ArtifactIngestionInput,
  type ArtifactIngestionSource,
  type ArtifactMemoryCandidate,
  type ArtifactMemoryImportance,
} from "./artifact-ingestion-types";
import { buildArtifactIngestionSources } from "./artifact-ingestion-events";

export function buildArtifactMemoryCandidate(source: ArtifactIngestionSource): ArtifactMemoryCandidate {
  const importance = inferImportance(source);
  const score = calculateMemoryConfidence({
    node: buildMemoryScoreNode(source, importance),
    now: 1,
  });
  const confidence = clamp01(
    score.confidence +
      (source.validationResult === "valid-export" ? 0.12 : 0) +
      (source.exported ? 0.08 : 0) -
      (source.validationResult === "blocked" ? 0.25 : 0)
  );
  const candidate: ArtifactMemoryCandidate = {
    id: buildArtifactIngestionStableKey("artifact-memory-candidate", source.sourcePackId, source.artifactId),
    artifactId: source.artifactId,
    title: source.title,
    artifactType: source.artifactType,
    sourceSurface: source.sourceSurface,
    sourceRunId: source.sourceRunId,
    targetWorkspacePath: source.targetWorkspacePath,
    validationResult: source.validationResult,
    safetyPosture: source.safetyPosture,
    replaySummary: source.replaySummary,
    importance,
    confidence,
    tags: Array.from(new Set([...source.tags, "memory-candidates"])),
    promotionState: "candidate",
    summary: [],
  };

  return { ...candidate, summary: summarizeSingleCandidate(candidate) };
}

export function buildArtifactMemoryCandidates(input: ArtifactIngestionInput): ArtifactMemoryCandidate[] {
  return buildArtifactIngestionSources(input).map(buildArtifactMemoryCandidate);
}

export function summarizeArtifactMemoryCandidates(candidates: ArtifactMemoryCandidate[]): string[] {
  const ready = candidates.filter((candidate) => candidate.confidence >= 0.68).length;
  const blocked = candidates.filter((candidate) => candidate.validationResult === "blocked").length;

  return [
    `${candidates.length} memory candidates prepared for review before promotion.`,
    `${ready} candidate(s) have review-ready deterministic confidence.`,
    blocked === 0 ? "No blocked memory candidates." : `${blocked} candidate(s) are blocked by validation.`,
    "Memory candidates are not promoted and do not directly mutate the brain graph.",
  ];
}

function buildMemoryScoreNode(
  source: ArtifactIngestionSource,
  importance: ArtifactMemoryImportance
): CodexForgeBrainNode {
  return {
    id: buildArtifactIngestionStableKey("artifact-memory-node", source.sourcePackId, source.artifactId),
    kind: "memory",
    data: {
      label: source.title,
      memoryType: "note",
      content: `${source.title} exported from ${source.sourceSurface} to ${source.targetWorkspacePath}.`,
      tags: source.tags,
      source: source.sourceSurface,
      sourceId: source.sourceRunId,
    },
    meta: {
      createdAt: 1,
      updatedAt: 1,
      status: source.validationResult === "blocked" ? "blocked" : source.exported ? "done" : "active",
      importance,
      sourceRefs: [
        { type: "operator-run", id: source.sourceRunId },
        { type: "import", id: source.targetWorkspacePath || source.artifactId },
      ],
    },
  };
}

function inferImportance(source: ArtifactIngestionSource): ArtifactMemoryImportance {
  if (source.validationResult === "blocked") return "low";
  if (source.artifactType.includes("validation") || source.tags.includes("exported")) return "high";
  if (source.artifactType.includes("ledger") || source.artifactType.includes("replay")) return "medium";
  return "medium";
}

function summarizeSingleCandidate(candidate: ArtifactMemoryCandidate): string[] {
  return [
    `${candidate.title} is a ${candidate.importance} importance memory candidate.`,
    `confidence: ${candidate.confidence.toFixed(2)}; validation: ${candidate.validationResult}.`,
    "Review before promotion; no direct graph mutation.",
  ];
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}
