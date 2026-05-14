import type { ArtifactMemoryCandidate } from "@/lib/codexforge/artifact-ingestion";

export type MemoryReviewSourceType =
  | "artifact"
  | "run"
  | "file"
  | "message"
  | "production-pack"
  | "manual";

export type MemoryReviewState =
  | "candidate"
  | "needs-review"
  | "approved-for-promotion"
  | "rejected"
  | "deferred"
  | "blocked";

export type MemoryReviewNextAction =
  | "review-confidence-risk"
  | "approve"
  | "reject"
  | "defer"
  | "request-more-context"
  | "preview-promotion-event"
  | "blocked-missing-source"
  | "blocked-policy";

export type MemoryPromotionReadiness =
  | "ready-after-approval"
  | "review-required"
  | "needs-more-context"
  | "blocked";

export type MemoryReviewActionType =
  | "approve"
  | "reject"
  | "defer"
  | "request-more-context"
  | "preview-promotion-event";

export type MemoryReviewSourceRef = {
  type: MemoryReviewSourceType;
  id: string;
  surface: string;
};

export type MemoryReviewCandidateInput = {
  id: string;
  sourceType: MemoryReviewSourceType;
  sourceSurface: string;
  sourceArtifactId?: string;
  sourceRunId?: string;
  sourceFileId?: string;
  sourceMessageId?: string;
  sourcePackId?: string;
  title: string;
  content: string;
  tags: string[];
  importance: "low" | "medium" | "high" | "critical";
  confidence: number;
  contradictionRisk?: number;
  repeatedSignals?: number;
  recencyScore?: number;
  pinnedHint?: boolean;
  criticalHint?: boolean;
  validationQuality?: "valid" | "needs-review" | "blocked" | "unknown";
  safetyPosture?: string;
};

export type MemoryReviewScore = {
  id: string;
  score: number;
  readiness: MemoryPromotionReadiness;
  confidence: number;
  importanceScore: number;
  sourceTraceabilityScore: number;
  repeatedSignalsScore: number;
  contradictionRisk: number;
  recencyScore: number;
  pinnedCriticalScore: number;
  validationQualityScore: number;
  safetyPostureScore: number;
  reasons: string[];
  summary: string[];
};

export type MemoryPromotionPolicy = {
  id: "memory-promotion-policy";
  autoPromotionAllowed: false;
  explicitApprovalRequired: true;
  uiDirectGraphMutationAllowed: false;
  producesRuntimeEventPreviewFirst: true;
  rules: Array<{
    id: string;
    label: string;
    state: "allow" | "review" | "block";
    detail: string;
  }>;
  summary: string[];
};

export type MemoryReviewItem = {
  id: string;
  candidateId: string;
  sourceType: MemoryReviewSourceType;
  sourceSurface: string;
  sourceArtifactId?: string;
  sourceRunId?: string;
  sourceFileId?: string;
  sourceMessageId?: string;
  sourcePackId?: string;
  sourceRefs: MemoryReviewSourceRef[];
  title: string;
  content: string;
  tags: string[];
  importance: MemoryReviewCandidateInput["importance"];
  confidence: number;
  contradictionRisk: number;
  promotionReadiness: MemoryPromotionReadiness;
  reviewState: MemoryReviewState;
  nextAction: MemoryReviewNextAction;
  score: MemoryReviewScore;
  summary: string[];
};

export type MemoryReviewQueue = {
  id: "memory-review-queue";
  items: MemoryReviewItem[];
  policy: MemoryPromotionPolicy;
  summary: string[];
};

export type MemoryReviewAction = {
  id: string;
  type: MemoryReviewActionType;
  itemId: string;
  candidateId: string;
  reviewState: MemoryReviewState;
  note: string;
  summary: string[];
};

export type MemoryPromotionEvent = {
  id: string;
  type: "memory.promoted";
  actor: "memory-review";
  payload: {
    memoryId: string;
    candidateId: string;
    content: string;
    memoryType: "note";
    importance: MemoryReviewItem["importance"];
    confidence: number;
    reviewState: MemoryReviewState;
    tags: string[];
    sourceRefs: MemoryReviewSourceRef[];
    safetyNote: string;
  };
  summary: string[];
};

export type MemoryPromotionEventPreview = {
  id: string;
  itemId: string;
  event: MemoryPromotionEvent | null;
  allowed: boolean;
  safetyNote: string;
  summary: string[];
};

export type MemoryReviewLedgerState =
  | "queued"
  | "reviewed"
  | "approved"
  | "rejected"
  | "deferred"
  | "promotion-event-previewed"
  | "future-persisted";

export type MemoryReviewLedgerItem = {
  id: string;
  itemId: string;
  candidateId: string;
  title: string;
  state: MemoryReviewLedgerState;
  reviewState: MemoryReviewState;
  note: string;
};

export type MemoryReviewLedger = {
  id: "memory-review-ledger";
  items: MemoryReviewLedgerItem[];
  summary: string[];
};

export type MemoryReviewBundle = {
  queue: MemoryReviewQueue;
  ledger: MemoryReviewLedger;
  eventPreview: MemoryPromotionEventPreview;
  summary: string[];
};

export function buildMemoryReviewStableKey(
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

export function convertArtifactMemoryCandidateToReviewInput(
  candidate: ArtifactMemoryCandidate
): MemoryReviewCandidateInput {
  return {
    id: candidate.id,
    sourceType: "artifact",
    sourceSurface: candidate.sourceSurface,
    sourceArtifactId: candidate.artifactId,
    sourceRunId: candidate.sourceRunId,
    title: candidate.title,
    content: `${candidate.title} exported from ${candidate.sourceSurface} to ${candidate.targetWorkspacePath || "pending workspace path"}.`,
    tags: candidate.tags,
    importance: candidate.importance,
    confidence: candidate.confidence,
    contradictionRisk: candidate.validationResult === "blocked" ? 0.84 : candidate.confidence < 0.52 ? 0.38 : 0.12,
    repeatedSignals: candidate.replaySummary.length,
    recencyScore: candidate.promotionState === "candidate" ? 0.72 : 0.5,
    criticalHint: candidate.importance === "critical",
    validationQuality:
      candidate.validationResult === "valid-export"
        ? "valid"
        : candidate.validationResult === "blocked"
          ? "blocked"
          : candidate.validationResult,
    safetyPosture: candidate.safetyPosture,
  };
}
