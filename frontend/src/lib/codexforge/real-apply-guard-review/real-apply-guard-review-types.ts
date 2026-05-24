export type ApplyGuardReviewStatus = "pass" | "warning" | "blocker" | "unknown";

export type ApplyGuardTargetReadinessLevel =
  | "review-only"
  | "dry-run-ready"
  | "guarded-apply-candidate"
  | "blocked"
  | "unknown";

export type ApplyGuardGoNoGoDecision =
  | "go-for-dry-run"
  | "go-for-guarded-apply-candidate"
  | "go-with-fixes"
  | "no-go"
  | "blocked"
  | "unknown";

export type ApplyGuardRollbackConfidenceLevel = "high" | "medium" | "low" | "blocked" | "unknown";

export type ApplyGuardReviewValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type ApplyGuardReviewInputSource = {
  sourcePreviewId?: string | null;
  sourceApplyRequestId?: string | null;
  selectedFilePath?: string | null;
  touchedFiles?: readonly string[] | null;
  diffSummary?: string | readonly string[] | null;
  approvalSummary?: string | readonly string[] | null;
  rollbackSummary?: string | readonly string[] | null;
  validationSummary?: string | readonly string[] | null;
  operatorIntent?: string | null;
  targetReadinessLevel?: ApplyGuardTargetReadinessLevel | null;
  projectRootKnown?: boolean | null;
  approvalPacketExists?: boolean | null;
  operatorReviewedDiff?: boolean | null;
  explicitApproval?: boolean | null;
  cleanWorkingTree?: boolean | null;
  validationRouteAvailable?: boolean | null;
  rollbackAvailable?: boolean | null;
  diffText?: string | null;
  projectRoot?: string | null;
  directUiApplyAttempted?: boolean | null;
  directUiWriteAttempted?: boolean | null;
  directUiRunAttempted?: boolean | null;
  brokerExecutionAttempted?: boolean | null;
};

export type ApplyGuardReviewInput = {
  id: string;
  reviewId: string;
  sourcePreviewId: string | null;
  sourceApplyRequestId: string | null;
  selectedFilePath: string | null;
  touchedFiles: string[];
  diffSummary: string[];
  approvalSummary: string[];
  rollbackSummary: string[];
  validationSummary: string[];
  operatorIntent: string;
  targetReadinessLevel: ApplyGuardTargetReadinessLevel;
  noAutoApplyGuarantee: true;
  noAutoRunGuarantee: true;
  latestMessageAuthorityReminder: string;
  executionAllowed: false;
  source: ApplyGuardReviewInputSource;
  validation: ApplyGuardReviewValidation;
  summary: string[];
};

export type ApplyGuardReviewCheck = {
  id: string;
  label: string;
  status: ApplyGuardReviewStatus;
  detail: string;
  blocksApply: boolean;
};

export type ApplyGuardPolicyReview = {
  id: string;
  checks: ApplyGuardReviewCheck[];
  overallStatus: ApplyGuardReviewStatus;
  blockerCount: number;
  warningCount: number;
  summary: string[];
};

export type ApplyApprovalPacketReview = ApplyGuardPolicyReview;
export type ApplyDiffBoundaryReview = ApplyGuardPolicyReview;
export type ApplyPathBoundaryReview = ApplyGuardPolicyReview;
export type ApplyCommandWriteSeparation = ApplyGuardPolicyReview;
export type ApplyValidationRequirement = ApplyGuardPolicyReview;

export type ApplyRollbackConfidenceItem = ApplyGuardReviewCheck & {
  confidenceContribution: ApplyGuardRollbackConfidenceLevel;
};

export type ApplyRollbackConfidence = {
  id: string;
  items: ApplyRollbackConfidenceItem[];
  confidence: ApplyGuardRollbackConfidenceLevel;
  blockerCount: number;
  warningCount: number;
  summary: string[];
};

export type ApplyGuardGoNoGoReason = ApplyGuardReviewCheck;

export type ApplyGuardGoNoGo = {
  id: string;
  decision: ApplyGuardGoNoGoDecision;
  executionAllowed: false;
  reasons: ApplyGuardGoNoGoReason[];
  blockerCount: number;
  warningCount: number;
  nextSafeAction: string;
  summary: string[];
};

export type ApplyGuardReviewHandoffSection = {
  id: string;
  title: string;
  lines: string[];
};

export type ApplyGuardReviewHandoff = {
  id: string;
  sections: ApplyGuardReviewHandoffSection[];
  markdownGuardReport: string;
  uxFixPrompt: string;
  safetyFixPrompt: string;
  guardedApplyCandidateBrief: string;
  copyOnly: true;
  summary: string[];
};

export type RealApplyGuardReviewSummary = {
  id: string;
  policyStatus: ApplyGuardReviewStatus;
  approvalStatus: ApplyGuardReviewStatus;
  diffBoundaryStatus: ApplyGuardReviewStatus;
  pathBoundaryStatus: ApplyGuardReviewStatus;
  rollbackConfidence: ApplyGuardRollbackConfidenceLevel;
  commandWriteSeparationStatus: ApplyGuardReviewStatus;
  validationRequirementStatus: ApplyGuardReviewStatus;
  blockerCount: number;
  goNoGoDecision: ApplyGuardGoNoGoDecision;
  nextSafeAction: string;
  executionAllowed: false;
  summary: string[];
};

export function buildRealApplyGuardReviewStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/\\/g, "/")
        .replace(/[^a-z0-9._/-]+/g, "-")
        .replace(/\/+/g, "/")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function buildRealApplyGuardReviewStableHash(value: string): string {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function buildRealApplyGuardReviewStableId(prefix: string, ...parts: string[]): string {
  const normalizedPrefix = buildRealApplyGuardReviewStableKey(prefix) || "real-apply-guard-review";
  const key = buildRealApplyGuardReviewStableKey(...parts);
  return `${normalizedPrefix}-${buildRealApplyGuardReviewStableHash(key || normalizedPrefix)}`;
}

export function normalizeApplyGuardPath(value: string): string {
  return value.trim().replace(/\\/g, "/").replace(/\/+/g, "/");
}

export function uniqueApplyGuardStrings(values: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function normalizeApplyGuardSummary(value: string | readonly string[] | null | undefined): string[] {
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean);
  const text = String(value ?? "").trim();
  return text ? [text] : [];
}

export function deriveApplyGuardOverallStatus(checks: readonly ApplyGuardReviewCheck[]): ApplyGuardReviewStatus {
  if (checks.some((check) => check.status === "blocker")) return "blocker";
  if (checks.some((check) => check.status === "warning")) return "warning";
  if (checks.some((check) => check.status === "unknown")) return "unknown";
  return "pass";
}

export function countApplyGuardStatus(checks: readonly ApplyGuardReviewCheck[], status: ApplyGuardReviewStatus): number {
  return checks.filter((check) => check.status === status).length;
}

export function hasApplyGuardParentTraversal(value: string): boolean {
  const normalized = normalizeApplyGuardPath(value);
  return normalized.split("/").some((segment) => segment === "..");
}

export function isApplyGuardAbsolutePath(value: string): boolean {
  const normalized = normalizeApplyGuardPath(value);
  return normalized.startsWith("/") || /^[a-z]:\//i.test(normalized) || normalized.startsWith("//");
}
