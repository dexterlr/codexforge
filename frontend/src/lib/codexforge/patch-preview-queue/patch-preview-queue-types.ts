import type { GroundedFixCandidate, GroundedFixRiskLevel } from "../grounded-fix";
import type { CodexForgePatchPreviewPlanInput } from "../patch-preview";

export type PatchPreviewQueueState =
  | "draft"
  | "reviewed"
  | "queued"
  | "selected"
  | "preview-ready"
  | "blocked"
  | "rejected"
  | "completed-preview";

export type PatchPreviewQueuePriorityClass = "low" | "normal" | "high" | "urgent" | "blocked";

export type PatchPreviewQueueReadinessStatus =
  | "ready"
  | "needs-review"
  | "needs-evidence"
  | "needs-file"
  | "needs-tests"
  | "blocked";

export type PatchPreviewQueueLedgerState =
  | "recommendation-created"
  | "recommendation-reviewed"
  | "queue-item-created"
  | "policy-checked"
  | "readiness-checked"
  | "preview-handoff-built"
  | "selected-for-preview"
  | "blocked"
  | "rejected";

export type PatchPreviewQueueReviewState =
  | GroundedFixCandidate["reviewState"]
  | "accepted"
  | "reviewed"
  | "accepted-for-preview";

export type PatchPreviewQueueItemInput = {
  recommendation: GroundedFixCandidate;
  reviewState?: PatchPreviewQueueReviewState;
  userSelected?: boolean;
  sourceImportance?: "low" | "medium" | "high" | "critical";
  suggestedTests?: readonly string[];
  rollbackNotes?: readonly string[];
  evidenceWarnings?: readonly string[];
  queueState?: PatchPreviewQueueState;
};

export type PatchPreviewQueueItem = {
  id: string;
  sourceGroundedFixId: string;
  sourceRecommendationTitle: string;
  goal: string;
  targetFiles: string[];
  primaryFile: string;
  suspectedRootCause: string;
  recommendedApproach: string;
  evidenceIds: string[];
  confidence: number;
  riskLevel: GroundedFixRiskLevel;
  priority: PatchPreviewQueuePriorityClass;
  priorityScore: number;
  queueState: PatchPreviewQueueState;
  reviewState: PatchPreviewQueueReviewState;
  patchPreviewPlanInput: CodexForgePatchPreviewPlanInput;
  safeNextAction: string;
  noMutationGuarantee: string;
  suggestedTests: string[];
  rollbackNotes: string[];
  warnings: string[];
  userSelected: boolean;
  sourceImportance: "low" | "medium" | "high" | "critical";
};

export type PatchPreviewQueuePolicy = {
  id: "patch-preview-queue-policy";
  allowed: boolean;
  patchPreviewAllowed: true;
  applyBlocked: true;
  mutationBlocked: true;
  commandExecutionBlocked: true;
  safePatchPreviewRequired: true;
  reviewedFixRecommendationRequired: true;
  targetFileRequired: true;
  evidenceIsContextNotProof: true;
  currentFilesMustBeVerified: true;
  lowConfidenceDisposition: "reviewed" | "investigation-needed" | "blocked";
  criticalRiskRequiresExplicitReview: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type PatchPreviewQueueReadinessCheck = {
  id: string;
  label: string;
  status: PatchPreviewQueueReadinessStatus;
  detail: string;
};

export type PatchPreviewQueueReadinessItem = {
  itemId: string;
  status: PatchPreviewQueueReadinessStatus;
  checks: PatchPreviewQueueReadinessCheck[];
  summary: string[];
};

export type PatchPreviewQueueReadiness = {
  id: "patch-preview-queue-readiness";
  items: PatchPreviewQueueReadinessItem[];
  readyCount: number;
  blockedCount: number;
  summary: string[];
};

export type PatchPreviewQueueLedgerItem = {
  id: string;
  itemId: string;
  state: PatchPreviewQueueLedgerState;
  label: string;
  detail: string;
};

export type PatchPreviewQueueLedger = {
  id: "patch-preview-queue-ledger";
  items: PatchPreviewQueueLedgerItem[];
  summary: string[];
};

export type PatchPreviewQueueHandoff = {
  id: "patch-preview-queue-handoff";
  itemId: string;
  prompt: string;
  patchPreviewPlanInput: CodexForgePatchPreviewPlanInput;
  safetyInstructions: string[];
  summary: string[];
};

export type PatchPreviewQueueSummary = {
  id: "patch-preview-queue-summary";
  totalQueueItems: number;
  readyCount: number;
  blockedCount: number;
  highestPriorityItem: PatchPreviewQueueItem | null;
  criticalRiskCount: number;
  averageConfidence: number;
  nextSafeAction: string;
  summary: string[];
};

export function buildPatchPreviewQueueStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
): string {
  return parts
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

export function uniquePatchPreviewQueueStrings(values: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function clampPatchPreviewQueueScore(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.min(1, Math.max(0, numeric));
}
