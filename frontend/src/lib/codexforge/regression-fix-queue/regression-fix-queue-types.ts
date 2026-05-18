import type { CodexForgePatchPreviewPlanInput } from "../patch-preview";
import type { DiffCompositionInputSource } from "../preview-diff-composer";
import type {
  RegressionClassification,
  RegressionFixCandidate,
  RegressionFixCandidateKind,
  RegressionFixRecommendation,
  RegressionImpactMap,
  RegressionRiskLevel,
  RegressionRollbackAdvice,
  RegressionSeverity,
  RegressionSignal,
  RegressionSurface,
  RegressionSuspectedCause,
  RegressionTriageSummary,
  RegressionUrgency,
} from "../regression-triage";

export type RegressionFixQueueState =
  | "draft"
  | "needs-review"
  | "reviewed"
  | "queued"
  | "selected"
  | "handoff-ready"
  | "blocked"
  | "rejected"
  | "completed-preview";

export type RegressionFixQueuePriorityClass = "low" | "normal" | "high" | "urgent" | "blocked";

export type RegressionFixQueueReadinessStatus =
  | "ready"
  | "needs-review"
  | "needs-signal"
  | "needs-cause"
  | "needs-file"
  | "needs-rollback"
  | "needs-tests"
  | "blocked";

export type RegressionFixQueueRouteTarget =
  | "Safe Patch Preview"
  | "Preview Diff Composer"
  | "Grounded Fix Recommendation"
  | "Patch Preview Queue"
  | "Verification Ingestion"
  | "Regression Triage"
  | "Manual Investigation"
  | "Patch Application Gate";

export type RegressionFixQueueLedgerState =
  | "regression-detected"
  | "triage-reviewed"
  | "fix-candidate-created"
  | "policy-checked"
  | "priority-scored"
  | "readiness-checked"
  | "route-selected"
  | "handoff-built"
  | "blocked"
  | "queued"
  | "rejected"
  | "completed-preview";

export type RegressionFixQueueItemBuilderInput = {
  regressionId?: string | null;
  triageSummary?: RegressionTriageSummary | null;
  signals?: readonly RegressionSignal[] | null;
  classifications?: readonly RegressionClassification[] | null;
  suspectedCause?: RegressionSuspectedCause | null;
  suspectedCauses?: readonly RegressionSuspectedCause["candidates"][number][] | null;
  impactMap?: RegressionImpactMap | null;
  rollbackAdvice?: RegressionRollbackAdvice | null;
  fixRecommendation?: RegressionFixRecommendation | null;
  fixCandidate?: RegressionFixCandidate | null;
  manualOperatorNote?: string | null;
  queueState?: RegressionFixQueueState | null;
  reviewedTriage?: boolean | null;
  operatorReviewed?: boolean | null;
  userSelected?: boolean | null;
  staleEvidenceWarnings?: readonly string[] | null;
  blockedWarnings?: readonly string[] | null;
  safePatchPreviewAvailable?: boolean | null;
  previewDiffComposerAvailable?: boolean | null;
  verificationIngestionAvailable?: boolean | null;
  patchPreviewQueueAvailable?: boolean | null;
  groundedFixRecommendationAvailable?: boolean | null;
  regressionTriageAvailable?: boolean | null;
};

export type RegressionFixQueueItem = {
  id: string;
  sourceRegressionId: string;
  sourceSignalIds: string[];
  sourceCauseIds: string[];
  title: string;
  goal: string;
  candidateKind: RegressionFixCandidateKind;
  targetFiles: string[];
  primaryFile: string;
  suspectedCause: string;
  recommendedAction: string;
  riskLevel: RegressionRiskLevel;
  confidence: number;
  severity: RegressionSeverity;
  affectedSurfaces: RegressionSurface[];
  smokeFailureCount: number;
  buildFailurePresent: boolean;
  browserWarningPresent: boolean;
  rollbackUrgency: RegressionUrgency;
  priority: RegressionFixQueuePriorityClass;
  priorityScore: number;
  queueState: RegressionFixQueueState;
  suggestedSmokeScripts: string[];
  rollbackReminder: string;
  rollbackAdviceAttached: boolean;
  suggestedVerificationAttached: boolean;
  safePatchPreviewRequired: true;
  previewDiffComposerReadiness: "ready" | "needs-file" | "needs-review" | "blocked";
  noAutoFixGuarantee: string;
  noAutoRollbackGuarantee: string;
  noMutationGuarantee: string;
  reviewedTriage: boolean;
  operatorReviewed: boolean;
  userSelected: boolean;
  manualOperatorNote: string | null;
  investigationNeeded: boolean;
  safePatchPreviewAvailable: boolean;
  previewDiffComposerAvailable: boolean;
  verificationIngestionAvailable: boolean;
  patchPreviewQueueAvailable: boolean;
  groundedFixRecommendationAvailable: boolean;
  regressionTriageAvailable: boolean;
  staleEvidenceWarnings: string[];
  blockedWarnings: string[];
  warnings: string[];
  evidenceIsContextNotProof: true;
  currentFilesMustBeVerified: true;
};

export type RegressionFixQueuePolicy = {
  id: "regression-fix-queue-policy";
  allowed: boolean;
  signalOrManualNoteRequired: true;
  signalOrManualNoteAttached: boolean;
  reviewedTriageRequiredForHandoffReady: true;
  reviewedTriageSatisfied: boolean;
  targetFileRequiredUnlessInvestigationNeeded: true;
  targetFileSatisfied: boolean;
  lowConfidenceMarksInvestigationNeeded: true;
  lowConfidenceDisposition: "reviewed" | "investigation-needed" | "blocked";
  highRiskRequiresExtraReview: boolean;
  criticalRiskRequiresExtraReview: boolean;
  rollbackAdviceRequired: true;
  rollbackAdviceAttached: boolean;
  suggestedVerificationRequired: true;
  suggestedVerificationAttached: boolean;
  safePatchPreviewRequiredBeforeEdits: true;
  previewDiffComposerRequiredBeforePatchPackage: true;
  applyDiffBlocked: true;
  writeFileBlocked: true;
  runCommandBlocked: true;
  brokerExecutionBlocked: true;
  evidenceIsContextNotProof: true;
  currentFilesMustBeVerified: true;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type RegressionFixQueueReadinessCheck = {
  id: string;
  label: string;
  status: RegressionFixQueueReadinessStatus;
  detail: string;
};

export type RegressionFixQueueReadinessItem = {
  itemId: string;
  status: RegressionFixQueueReadinessStatus;
  checks: RegressionFixQueueReadinessCheck[];
  summary: string[];
};

export type RegressionFixQueueReadiness = {
  id: "regression-fix-queue-readiness";
  items: RegressionFixQueueReadinessItem[];
  readyCount: number;
  blockedCount: number;
  summary: string[];
};

export type RegressionFixQueueRoute = {
  id: string;
  itemId: string;
  primaryTarget: RegressionFixQueueRouteTarget;
  targets: RegressionFixQueueRouteTarget[];
  reason: string;
  safetyNotes: string[];
  blockedActions: string[];
  summary: string[];
};

export type RegressionFixQueueHandoff = {
  id: "regression-fix-queue-handoff";
  itemId: string;
  route: RegressionFixQueueRoute;
  prompt: string;
  patchPreviewInput: CodexForgePatchPreviewPlanInput;
  diffComposerInput: DiffCompositionInputSource;
  safetyInstructions: string[];
  summary: string[];
};

export type RegressionFixQueueLedgerItem = {
  id: string;
  itemId: string;
  state: RegressionFixQueueLedgerState;
  label: string;
  detail: string;
};

export type RegressionFixQueueLedger = {
  id: "regression-fix-queue-ledger";
  items: RegressionFixQueueLedgerItem[];
  summary: string[];
};

export type RegressionFixQueueSummary = {
  id: "regression-fix-queue-summary";
  totalQueueItems: number;
  readyCount: number;
  blockedCount: number;
  urgentCount: number;
  investigationNeededCount: number;
  highestPriorityItem: RegressionFixQueueItem | null;
  affectedFileCount: number;
  nextSafeAction: string;
  summary: string[];
};

export function buildRegressionFixQueueStableKey(
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

export function uniqueRegressionFixQueueStrings(values: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function clampRegressionFixQueueScore(value: unknown, fallback = 0): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(1, Math.max(0, numeric));
}
