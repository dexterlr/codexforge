import type { ArtifactExportRequest } from "@/lib/codexforge/artifact-workspace";
import type { ExportResultLedger, ExportResultLedgerItem } from "@/lib/codexforge/artifact-export-flow";
import type { ProductionPack } from "@/lib/codexforge/production-pack";

export const CODEXFORGE_ARTIFACT_INGESTION_EVENT_TYPES = [
  "artifact.created",
  "artifact.exported",
  "artifact.validated",
  "artifact.reviewed",
  "production-pack.exported",
  "replay.created",
  "memory.candidate.created",
] as const;

export type ArtifactIngestionEventType =
  (typeof CODEXFORGE_ARTIFACT_INGESTION_EVENT_TYPES)[number];

export type ArtifactIngestionSource = {
  artifactId: string;
  title: string;
  artifactType: string;
  sourceSurface: string;
  sourceRunId: string;
  targetWorkspacePath: string;
  validationResult: "valid-export" | "needs-review" | "blocked" | "unknown";
  safetyPosture: string;
  replaySummary: string[];
  tags: string[];
  sourcePackId?: string;
  exported?: boolean;
};

export type ArtifactIngestionEvent = {
  id: string;
  type: ArtifactIngestionEventType;
  artifactId: string;
  title: string;
  sourceSurface: string;
  sourceRunId: string;
  targetWorkspacePath: string;
  sourcePackId?: string;
  payload: Record<string, string | boolean | string[]>;
  summary: string[];
};

export type ArtifactMemoryImportance = "low" | "medium" | "high" | "critical";

export type ArtifactMemoryCandidate = {
  id: string;
  artifactId: string;
  title: string;
  artifactType: string;
  sourceSurface: string;
  sourceRunId: string;
  targetWorkspacePath: string;
  validationResult: ArtifactIngestionSource["validationResult"];
  safetyPosture: string;
  replaySummary: string[];
  importance: ArtifactMemoryImportance;
  confidence: number;
  tags: string[];
  promotionState: "candidate";
  summary: string[];
};

export type ArtifactBrainSignalKind =
  | "artifact-node-candidate"
  | "production-pack-node-candidate"
  | "run-relationship-candidate"
  | "source-surface-relationship"
  | "validation-relationship"
  | "replay-relationship";

export type ArtifactBrainSignal = {
  id: string;
  kind: ArtifactBrainSignalKind;
  artifactId: string;
  sourceId: string;
  targetId: string;
  label: string;
  readiness: "ready" | "needs-review" | "blocked";
  confidence: number;
  reasons: string[];
  summary: string[];
};

export type ArtifactIngestionReadinessDimensionId =
  | "artifact-metadata-quality"
  | "validation-quality"
  | "replay-quality"
  | "source-traceability"
  | "memory-confidence"
  | "graph-signal-readiness"
  | "safety-posture";

export type ArtifactIngestionReadinessDimension = {
  id: ArtifactIngestionReadinessDimensionId;
  label: string;
  score: number;
  state: "ready" | "needs-review" | "blocked";
  detail: string;
};

export type ArtifactIngestionReadiness = {
  id: string;
  artifactId: string;
  score: number;
  state: "ready-for-review" | "needs-review" | "blocked";
  dimensions: ArtifactIngestionReadinessDimension[];
  summary: string[];
};

export type ArtifactIngestionLedgerState =
  | "candidate"
  | "ready-for-review"
  | "ready-for-runtime-event"
  | "blocked"
  | "future-persisted";

export type ArtifactIngestionLedgerItem = {
  id: string;
  artifactId: string;
  title: string;
  state: ArtifactIngestionLedgerState;
  targetWorkspacePath: string;
  eventCount: number;
  memoryCandidateCount: number;
  brainSignalCount: number;
  readinessScore: number;
  note: string;
};

export type ArtifactIngestionLedger = {
  id: string;
  items: ArtifactIngestionLedgerItem[];
  summary: string[];
};

export type ArtifactIngestionBundle = {
  id: string;
  sources: ArtifactIngestionSource[];
  events: ArtifactIngestionEvent[];
  memoryCandidates: ArtifactMemoryCandidate[];
  brainSignals: ArtifactBrainSignal[];
  readiness: ArtifactIngestionReadiness[];
  ledger: ArtifactIngestionLedger;
  summary: string[];
};

export type ArtifactIngestionInput = {
  pack?: ProductionPack;
  exportLedger?: ExportResultLedger;
  exportRequests?: ArtifactExportRequest[];
  resultItems?: ExportResultLedgerItem[];
};

export function buildArtifactIngestionStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}
