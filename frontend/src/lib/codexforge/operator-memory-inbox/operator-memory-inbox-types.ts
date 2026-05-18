export type MemoryInboxSource =
  | "activity"
  | "verification"
  | "regression"
  | "patch-workflow"
  | "stabilization"
  | "creative"
  | "manual";

export type MemoryInboxSourceSurface =
  | "Global Activity Feed"
  | "Verification Ingestion"
  | "Regression Triage"
  | "Regression Fix Queue"
  | "Patch Workflow"
  | "Post-Apply Verification"
  | "Stabilization Command Center"
  | "Creative Production Studio"
  | "Manual Operator Note"
  | "Unknown";

export type OperatorMemoryKind =
  | "implementation-detail"
  | "verification-result"
  | "regression-lesson"
  | "fix-pattern"
  | "safety-boundary"
  | "workflow-preference"
  | "architecture-note"
  | "creative-production-note"
  | "rollback-note"
  | "follow-up"
  | "unknown";

export type MemoryInboxReviewState =
  | "pending-review"
  | "needs-dedupe-review"
  | "needs-operator-decision"
  | "clarification-needed"
  | "promotion-ready"
  | "blocked";

export type MemoryInboxPromotionReadiness =
  | "preview-only"
  | "ready-after-review"
  | "blocked";

export type MemoryInboxPriorityClass = "low" | "normal" | "high" | "urgent" | "blocked";
export type MemoryInboxRisk = "low" | "medium" | "high" | "critical";

export type MemoryInboxSourceInput = {
  id?: string;
  title?: string;
  detail?: string;
  memoryText?: string;
  sourceIds?: readonly string[];
  sourceSurface?: MemoryInboxSourceSurface;
  confidence?: number;
  importance?: number;
  risk?: MemoryInboxRisk;
  severity?: "blocker" | "warning" | "info" | "success" | "unknown";
  status?: string;
  relatedRoutes?: readonly string[];
  relatedFiles?: readonly string[];
  evidenceSnippets?: readonly string[];
  suggestedTags?: readonly string[];
  operatorNote?: string;
  duplicateRisk?: number;
  contradictionRisk?: number;
};

export type OperatorMemoryInboxCardInput = MemoryInboxSourceInput & {
  id?: string;
  source: MemoryInboxSource;
  memoryKind?: OperatorMemoryKind;
  reviewState?: MemoryInboxReviewState;
  promotionReadiness?: MemoryInboxPromotionReadiness;
};

export type OperatorMemoryInboxCard = {
  id: string;
  title: string;
  proposedMemoryText: string;
  source: MemoryInboxSource;
  sourceIds: string[];
  sourceSurface: MemoryInboxSourceSurface;
  memoryKind: OperatorMemoryKind;
  confidence: number;
  importance: number;
  risk: MemoryInboxRisk;
  reviewState: MemoryInboxReviewState;
  duplicateRisk: number;
  contradictionRisk: number;
  promotionReadiness: MemoryInboxPromotionReadiness;
  suggestedTags: string[];
  relatedRoutes: string[];
  relatedFiles: string[];
  evidenceSnippets: string[];
  operatorNote?: string;
  noAutoPromotionGuarantee: true;
  priorityScore: number;
  priorityClass: MemoryInboxPriorityClass;
  summary: string[];
};

export type MemoryInboxSourceSummary = {
  source: MemoryInboxSource;
  count: number;
  reviewRequiredCount: number;
  topSurface: string;
  summary: string[];
};

export type MemoryInboxClassificationSummary = {
  counts: Record<OperatorMemoryKind, number>;
  summary: string[];
};

export type MemoryInboxPriorityResult = {
  cardId: string;
  score: number;
  priorityClass: MemoryInboxPriorityClass;
  reasons: string[];
};

export type MemoryInboxReviewPolicy = {
  id: "operator-memory-inbox-review-policy";
  reviewRequiredBeforePromotion: true;
  promotionPreviewOnly: true;
  noBrainGraphMutation: true;
  noAutoMemoryPromotion: true;
  noAutoMerge: true;
  rules: Array<{
    id: string;
    label: string;
    state: "allow" | "review" | "block";
    detail: string;
  }>;
  blockedReasons: string[];
  summary: string[];
};

export type MemoryInboxPromotionPreview = {
  id: string;
  cardId: string;
  proposedMemoryItem: {
    text: string;
    kind: OperatorMemoryKind;
    tags: string[];
    confidence: number;
    importance: number;
    risk: MemoryInboxRisk;
  };
  proposedRuntimeEventType: "memory.promoted";
  evidenceRefs: string[];
  reviewRequirements: string[];
  blockedReasons: string[];
  futureMergeBoundary: string;
  allowed: boolean;
  summary: string[];
};

export type MemoryInboxRuntimeEventPreview = {
  id: string;
  type: "memory.promoted";
  actor: "operator-memory-inbox";
  payload: MemoryInboxPromotionPreview["proposedMemoryItem"] & {
    sourceIds: string[];
    evidenceRefs: string[];
    safetyNote: string;
  };
};

export type MemoryInboxDuplicateGroup = {
  id: string;
  normalizedText: string;
  cardIds: string[];
  duplicateRisk: number;
  summary: string[];
};

export type OperatorMemoryInboxSummary = {
  id: "operator-memory-inbox-summary";
  cardCount: number;
  pendingReviewCount: number;
  promotionReadyCount: number;
  blockedCount: number;
  duplicateGroupCount: number;
  contradictionRiskCount: number;
  topPriorityCard?: OperatorMemoryInboxCard;
  nextSafeAction: string;
  summary: string[];
};

export type OperatorMemoryInboxSession = {
  id: "operator-memory-inbox-session";
  cards: OperatorMemoryInboxCard[];
  sourceSummary: MemoryInboxSourceSummary[];
  classificationSummary: MemoryInboxClassificationSummary;
  duplicateGroups: MemoryInboxDuplicateGroup[];
  summary: OperatorMemoryInboxSummary;
};

export function buildMemoryInboxStableKey(
  ...parts: Array<string | number | boolean | null | undefined | readonly string[]>
): string {
  return parts
    .flatMap((part) => (Array.isArray(part) ? part : [part]))
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._/-]+/g, "-")
        .replace(/[/-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function clampMemoryInboxScore(value: number | undefined, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(0, Math.min(1, value));
}
