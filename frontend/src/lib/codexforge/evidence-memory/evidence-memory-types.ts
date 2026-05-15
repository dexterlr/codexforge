import type {
  ReadOnlyEvidence,
  ReadOnlyEvidenceItem,
  ReadOnlyExecutionRequest,
  ReadOnlyExecutionResult,
  ReadOnlyExecutionStatus,
} from "../read-only-step-execution";

export type EvidenceMemoryEvidenceType =
  | "file"
  | "path"
  | "line"
  | "match"
  | "summary"
  | "warning"
  | "error"
  | "snippet"
  | "result-status"
  | "unknown";

export type EvidenceMemoryCandidateKind =
  | "fact"
  | "observation"
  | "file-summary"
  | "implementation-detail"
  | "risk"
  | "test-evidence"
  | "decision-context"
  | "failure-note"
  | "follow-up";

export type EvidenceMemoryReviewState =
  | "needs-review"
  | "deferred"
  | "blocked"
  | "approved-for-promotion";

export type EvidenceMemoryImportance =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type EvidenceMemorySourceRefType =
  | "task"
  | "step"
  | "execution-request"
  | "execution-result"
  | "read-only-evidence"
  | "tool"
  | "file"
  | "line"
  | "memory-candidate"
  | "brain-merge-event"
  | "derived";

export type EvidenceMemorySourceRef = {
  type: EvidenceMemorySourceRefType;
  id: string;
  label: string;
};

export type EvidenceMemoryInput = {
  request?: Partial<ReadOnlyExecutionRequest> | null;
  result?: Partial<ReadOnlyExecutionResult> | null;
  evidence?: Partial<ReadOnlyEvidence> | null;
  taskId?: string | null;
  stepId?: string | null;
  relatedTaskId?: string | null;
  relatedStepId?: string | null;
};

export type EvidenceMemoryRawItemInput = {
  id?: string | null;
  type?: string | null;
  label?: string | null;
  value?: string | null;
  snippet?: string | null;
  source?: string | null;
  filePath?: string | null;
  lineNumber?: number | null;
  confidence?: number | "high" | "medium" | "low" | null;
  warnings?: string[] | null;
  sourceRefs?: EvidenceMemorySourceRef[] | null;
  sourceExecutionId?: string | null;
  sourceRequestId?: string | null;
  toolName?: string | null;
  relatedTaskId?: string | null;
  relatedStepId?: string | null;
  resultStatus?: ReadOnlyExecutionStatus | "unknown" | null;
  sourceType?:
    | "read-only-result"
    | "read-only-evidence-item"
    | "read-only-result-line"
    | "read-only-result-path"
    | "read-only-result-snippet"
    | "derived";
};

export type NormalizedEvidenceItem = {
  id: string;
  sourceExecutionId: string;
  sourceRequestId: string;
  toolName: string;
  type: EvidenceMemoryEvidenceType;
  label: string;
  value: string;
  snippet: string;
  filePath: string | null;
  lineNumber: number | null;
  confidence: number;
  warnings: string[];
  sourceRefs: EvidenceMemorySourceRef[];
  relatedTaskId: string | null;
  relatedStepId: string | null;
  resultStatus: ReadOnlyExecutionStatus | "unknown";
  sourceType: NonNullable<EvidenceMemoryRawItemInput["sourceType"]>;
};

export type NormalizedEvidenceBundle = {
  id: "normalized-read-only-execution-evidence";
  sourceExecutionId: string;
  sourceRequestId: string;
  toolName: string;
  relatedTaskId: string | null;
  relatedStepId: string | null;
  resultStatus: ReadOnlyExecutionStatus | "unknown";
  items: NormalizedEvidenceItem[];
  warnings: string[];
  summary: string[];
};

export type EvidenceMemoryCandidate = {
  id: string;
  kind: EvidenceMemoryCandidateKind;
  title: string;
  content: string;
  sourceEvidenceIds: string[];
  sourceExecutionIds: string[];
  relatedFilePaths: string[];
  relatedTaskId: string | null;
  relatedStepId: string | null;
  suggestedTags: string[];
  confidence: number;
  importance: EvidenceMemoryImportance;
  importanceScore: number;
  reviewState: EvidenceMemoryReviewState;
  promotionBlockedUntilReview: true;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type EvidenceMemoryCandidateSummary = {
  id: "evidence-memory-candidate-summary";
  candidates: EvidenceMemoryCandidate[];
  summary: string[];
};

export type EvidenceSourceTraceItem = {
  id: string;
  taskId: string | null;
  stepId: string | null;
  executionRequestId: string;
  executionResultId: string;
  toolName: string;
  evidenceIds: string[];
  filePaths: string[];
  memoryCandidateIds: string[];
  futureBrainMergeEventIds: string[];
  summary: string[];
};

export type EvidenceSourceTrace = {
  id: "evidence-source-trace";
  items: EvidenceSourceTraceItem[];
  summary: string[];
};

export type EvidenceMemoryReviewPolicyRule = {
  id: string;
  label: string;
  state: "allow" | "review" | "block";
  detail: string;
};

export type EvidenceMemoryReviewPolicy = {
  id: "evidence-memory-review-policy";
  autoPromotionAllowed: false;
  userReviewRequired: true;
  brainMergeReviewRequired: true;
  lowConfidenceManualVerificationRequired: boolean;
  staleEvidenceBlocksPromotion: boolean;
  contradictoryEvidenceBlocksPromotion: boolean;
  fileEditsRequireCurrentInspection: true;
  memoryIsContextNotAuthority: true;
  uiGraphMutationAllowed: false;
  previewOnlyBrainMergeCandidate: true;
  blockedReasons: string[];
  warnings: string[];
  rules: EvidenceMemoryReviewPolicyRule[];
  summary: string[];
};

export type EvidenceBrainMergeEventPreview = {
  id: string;
  eventId: string;
  type: "memory.promoted";
  candidateId: string;
  approved: false;
  reviewState: EvidenceMemoryReviewState;
  content: string;
  confidence: number;
  importance: EvidenceMemoryImportance;
  sourceRefs: EvidenceMemorySourceRef[];
  payload: {
    memoryId: string;
    candidateId: string;
    content: string;
    memoryType: "note";
    importance: EvidenceMemoryImportance;
    confidence: number;
    reviewState: EvidenceMemoryReviewState;
    tags: string[];
    sourceRefs: EvidenceMemorySourceRef[];
    safetyNote: string;
  };
  previewOnly: true;
  applied: false;
  blockedReasons: string[];
  summary: string[];
};

export type EvidenceBrainMergeCandidate = {
  id: "evidence-brain-merge-candidate";
  candidateIds: string[];
  events: EvidenceBrainMergeEventPreview[];
  allowed: false;
  previewOnly: true;
  approvalBoundary: "Brain merge review required";
  safetyNote: string;
  blockedReasons: string[];
  summary: string[];
};

export type EvidenceConfidenceDistribution = {
  high: number;
  medium: number;
  low: number;
};

export type EvidenceMemorySummary = {
  id: "evidence-memory-summary";
  evidenceCount: number;
  candidateCount: number;
  confidenceDistribution: EvidenceConfidenceDistribution;
  topCandidate: EvidenceMemoryCandidate | null;
  warnings: string[];
  blockedReasons: string[];
  nextSafeAction: string;
  summary: string[];
};

export function buildEvidenceMemoryStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
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

export function uniqueEvidenceMemoryStrings(values: Array<string | null | undefined>): string[] {
  return Array.from(
    new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))
  ).sort();
}

export function clampEvidenceMemoryScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function importanceFromScore(score: number): EvidenceMemoryImportance {
  if (score >= 0.88) return "critical";
  if (score >= 0.68) return "high";
  if (score >= 0.38) return "medium";
  return "low";
}

export function sourceRefKey(ref: EvidenceMemorySourceRef): string {
  return buildEvidenceMemoryStableKey(ref.type, ref.id, ref.label);
}

export type EvidenceMemoryReadOnlyEvidenceItemLike = Partial<ReadOnlyEvidenceItem>;
