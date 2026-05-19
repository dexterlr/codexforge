export type RegressionSignalType =
  | "build-failure"
  | "smoke-failure"
  | "diff-check-failure"
  | "browser-warning"
  | "duplicate-react-key"
  | "mojibake-risk"
  | "type-error"
  | "route-failure"
  | "policy-regression"
  | "ui-layout-regression"
  | "data-contract-regression"
  | "unknown-regression";

export type RegressionSeverity = "info" | "warning" | "error" | "blocker";
export type RegressionReviewState = "new" | "needs-review" | "reviewed" | "stale" | "blocked";
export type RegressionSignalSourceKind =
  | "validation-runner"
  | "verification-ingestion"
  | "post-apply-verification"
  | "browser-warning"
  | "build-output"
  | "smoke-output"
  | "manual-operator-note"
  | "changed-files"
  | "target-files"
  | "grounded-fix-recommendation"
  | "unknown";

export type RegressionRawSignal = {
  id?: string | null;
  type?: RegressionSignalType | string | null;
  severity?: RegressionSeverity | string | null;
  title?: string | null;
  summary?: string | null;
  snippet?: string | null;
  sourceCommand?: string | null;
  sourceLine?: number | string | null;
  relatedFiles?: readonly string[] | null;
  filePath?: string | null;
  relatedSmokeScript?: string | null;
  relatedRoute?: string | null;
  confidence?: number | "high" | "medium" | "low" | null;
  regressionLikelihood?: number | "high" | "medium" | "low" | null;
  stale?: boolean | null;
  reviewState?: RegressionReviewState | string | null;
  sourceKind?: RegressionSignalSourceKind | string | null;
};

export type RegressionRelatedFixRecommendation = {
  id?: string | null;
  title?: string | null;
  summary?: string | null;
  targetFiles?: readonly string[] | null;
};

export type RegressionPostApplyVerificationResult = {
  status?: string | null;
  summary?: string | null;
  command?: string | null;
  failed?: boolean | null;
  warnings?: readonly string[] | null;
  signals?: readonly RegressionRawSignal[] | null;
};

export type RegressionSignalNormalizerInput = {
  verificationSignals?: readonly RegressionRawSignal[] | null;
  postApplyResult?: RegressionPostApplyVerificationResult | RegressionRawSignal | null;
  browserWarnings?: readonly (RegressionRawSignal | string)[] | null;
  buildOutputSignals?: readonly RegressionRawSignal[] | null;
  smokeOutputSignals?: readonly RegressionRawSignal[] | null;
  manualOperatorNote?: string | null;
  changedFiles?: readonly string[] | null;
  targetFiles?: readonly string[] | null;
  relatedFixRecommendation?: RegressionRelatedFixRecommendation | string | null;
};

export type RegressionSignal = {
  id: string;
  type: RegressionSignalType;
  severity: RegressionSeverity;
  title: string;
  snippet: string;
  sourceCommand: string | null;
  sourceLine: number | null;
  relatedFiles: string[];
  relatedSmokeScript: string | null;
  relatedRoute: string | null;
  confidence: number;
  regressionLikelihood: number;
  stale: boolean;
  reviewState: RegressionReviewState;
  sourceKind: RegressionSignalSourceKind;
};

export type RegressionSignalSummary = {
  id: "regression-signal-summary";
  signalCount: number;
  blockerCount: number;
  warningCount: number;
  staleCount: number;
  fileCount: number;
  summary: string[];
};

export type RegressionClass =
  | "build-break"
  | "smoke-break"
  | "browser-console"
  | "visual-layout"
  | "data-contract"
  | "route-contract"
  | "safety-policy"
  | "memory-ingestion"
  | "patch-workflow"
  | "unknown";

export type RegressionUrgency = "none" | "low" | "medium" | "high" | "stop-and-stabilize";

export type RegressionClassification = {
  id: string;
  regressionClass: RegressionClass;
  severity: RegressionSeverity;
  confidence: number;
  suspectedArea: string;
  likelyOwnerSurface: RegressionSurface;
  rollbackUrgency: RegressionUrgency;
  fixUrgency: RegressionUrgency;
  evidenceSnippets: string[];
  reviewRequired: boolean;
  signalIds: string[];
};

export type RegressionClassificationSummary = {
  id: "regression-classification-summary";
  classificationCount: number;
  classCounts: Record<RegressionClass, number>;
  highestSeverity: RegressionSeverity;
  reviewRequiredCount: number;
  summary: string[];
};

export type RegressionCauseCandidate = {
  causeId: string;
  title: string;
  reason: string;
  confidence: number;
  relatedFiles: string[];
  signals: string[];
  suggestedInspection: string;
  safeNextAction: string;
};

export type RegressionSuspectedCause = {
  id: "regression-suspected-cause";
  candidates: RegressionCauseCandidate[];
  topCandidate: RegressionCauseCandidate | null;
  summary: string[];
};

export type RegressionSurface =
  | "/ai"
  | "/brain"
  | "/files"
  | "/tasks"
  | "/memory"
  | "/artifacts"
  | "/capabilities"
  | "API route"
  | "runtime/domain module"
  | "smoke suite"
  | "unknown";

export type RegressionRiskLevel = "low" | "medium" | "high" | "critical";

export type RegressionImpactItem = {
  filePath: string;
  routeOrSurface: RegressionSurface;
  subsystem: string;
  riskLevel: RegressionRiskLevel;
  whyImpacted: string;
  verificationNeeded: string[];
  rollbackRelevance: string;
  suggestedSmokeScripts: string[];
};

export type RegressionImpactMap = {
  id: "regression-impact-map";
  items: RegressionImpactItem[];
  summary: string[];
};

export type RegressionRollbackOptionKind =
  | "inspect-first"
  | "git-restore-target-file-before-commit"
  | "revert-last-commit-after-commit"
  | "isolate-patch-branch"
  | "rollback-ui-integration-only"
  | "rollback-smoke-expectation-only"
  | "rollback-domain-module-only"
  | "stop-and-stabilize";

export type RegressionRollbackOption = {
  optionId: string;
  kind: RegressionRollbackOptionKind;
  title: string;
  commandPreview: string | null;
  reason: string;
  risk: RegressionRiskLevel;
  whenToUse: string;
  warnings: string[];
  reviewRequired: true;
};

export type RegressionRollbackAdvice = {
  id: "regression-rollback-advice";
  urgency: RegressionUrgency;
  options: RegressionRollbackOption[];
  warnings: string[];
  summary: string[];
};

export type RegressionFixCandidateKind =
  | "key-stability-fix"
  | "export-contract-fix"
  | "type-contract-fix"
  | "smoke-marker-fix"
  | "layout-polish-fix"
  | "policy-boundary-fix"
  | "route-contract-fix"
  | "encoding-cleanup-fix"
  | "investigation-needed";

export type RegressionFixCandidate = {
  candidateId: string;
  kind: RegressionFixCandidateKind;
  title: string;
  recommendedAction: string;
  targetFiles: string[];
  evidenceIds: string[];
  causeIds: string[];
  confidence: number;
  risk: RegressionRiskLevel;
  safePatchPreviewRequired: true;
  suggestedTests: string[];
  rollbackReminder: string;
  reviewState: RegressionReviewState;
};

export type RegressionFixRecommendation = {
  id: "regression-fix-recommendation";
  candidates: RegressionFixCandidate[];
  summary: string[];
};

export type RegressionPreviewHandoff = {
  id: "regression-preview-handoff";
  prompt: string;
  signals: string[];
  causes: string[];
  impactedFiles: string[];
  rollbackAdvice: string[];
  suggestedTests: string[];
  safetyInstructions: string[];
  summary: string[];
};

export type RegressionTriageSummary = {
  id: "regression-triage-summary";
  signalCount: number;
  blockerCount: number;
  warningCount: number;
  classificationCount: number;
  topSuspectedCause: string;
  impactedFileCount: number;
  rollbackUrgency: RegressionUrgency;
  fixRecommendationCount: number;
  nextSafeAction: string;
  summary: string[];
};

export const REGRESSION_SIGNAL_TYPES: readonly RegressionSignalType[] = [
  "build-failure",
  "smoke-failure",
  "diff-check-failure",
  "browser-warning",
  "duplicate-react-key",
  "mojibake-risk",
  "type-error",
  "route-failure",
  "policy-regression",
  "ui-layout-regression",
  "data-contract-regression",
  "unknown-regression",
];

export const REGRESSION_SEVERITIES: readonly RegressionSeverity[] = [
  "info",
  "warning",
  "error",
  "blocker",
];

export const REGRESSION_REVIEW_STATES: readonly RegressionReviewState[] = [
  "new",
  "needs-review",
  "reviewed",
  "stale",
  "blocked",
];

export const REGRESSION_SOURCE_KINDS: readonly RegressionSignalSourceKind[] = [
  "validation-runner",
  "verification-ingestion",
  "post-apply-verification",
  "browser-warning",
  "build-output",
  "smoke-output",
  "manual-operator-note",
  "changed-files",
  "target-files",
  "grounded-fix-recommendation",
  "unknown",
];

export function buildRegressionTriageStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._/-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function uniqueRegressionStrings(values: Array<string | null | undefined>): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function clampRegressionScore(value: unknown, fallback = 0): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(1, Math.max(0, numeric));
}

export function scoreRegressionHint(value: unknown, fallback = 0.5): number {
  if (value === "high") return 0.86;
  if (value === "medium") return 0.58;
  if (value === "low") return 0.28;
  return clampRegressionScore(value, fallback);
}
