export type GuardedApplyCandidateTargetMode =
  | "design-only"
  | "dry-run-candidate"
  | "guarded-apply-candidate"
  | "blocked"
  | "unknown";

export type GuardedApplyCandidateStatus = "pass" | "warning" | "blocker" | "unknown";

export type GuardedApplyImplementationGapCategory =
  | "policy"
  | "approval"
  | "diff-boundary"
  | "path-boundary"
  | "rollback"
  | "validation"
  | "result-capture"
  | "UI"
  | "smoke"
  | "tool-boundary";

export type GuardedApplyImplementationGapPriority =
  | "blocker"
  | "high"
  | "medium"
  | "low"
  | "informational";

export type GuardedApplyCandidateInputSource = {
  sourceGuardReviewId?: string | null;
  sourceApplyRequestId?: string | null;
  sourcePreviewId?: string | null;
  selectedFilePath?: string | null;
  diffSummary?: string | readonly string[] | null;
  approvalSummary?: string | readonly string[] | null;
  rollbackSummary?: string | readonly string[] | null;
  validationSummary?: string | readonly string[] | null;
  targetMode?: GuardedApplyCandidateTargetMode | string | null;
  operatorIntent?: string | null;
};

export type GuardedApplyCandidateInputValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type GuardedApplyCandidateInput = {
  id: string;
  candidateId: string;
  sourceGuardReviewId: string;
  sourceApplyRequestId: string;
  sourcePreviewId: string;
  selectedFilePath: string;
  diffSummary: string[];
  approvalSummary: string[];
  rollbackSummary: string[];
  validationSummary: string[];
  targetMode: GuardedApplyCandidateTargetMode;
  operatorIntent: string;
  noAutoApplyGuarantee: true;
  noAutoRunGuarantee: true;
  latestMessageAuthorityReminder: string;
  validation: GuardedApplyCandidateInputValidation;
  summary: string[];
};

export type SingleFileApplyScopeSource = {
  selectedFilePath?: string | null;
  diffTargets?: readonly string[] | null;
  generatedFileExplicitlyReviewed?: boolean | null;
  operation?: "modify" | "create" | "delete" | "rename" | "unknown" | string | null;
  binaryPatch?: boolean | null;
  packageOrLockFile?: boolean | null;
  configFile?: boolean | null;
  toolPolicyFile?: boolean | null;
  brainRuntimeFile?: boolean | null;
};

export type SingleFileApplyScopeCheck = {
  id: string;
  label: string;
  status: GuardedApplyCandidateStatus;
  detail: string;
  blocksCandidate: boolean;
};

export type SingleFileApplyScope = {
  id: string;
  selectedFilePath: string;
  diffTargets: string[];
  checks: SingleFileApplyScopeCheck[];
  overallStatus: GuardedApplyCandidateStatus;
  blockerCount: number;
  warningCount: number;
  safeFileCategoryPreferred: boolean;
  pathRelativeToProjectRoot: boolean;
  summary: string[];
};

export type GuardedApplyCandidatePolicySource = {
  input?: GuardedApplyCandidateInput | null;
  scope?: SingleFileApplyScope | null;
  previewDiffPresent?: boolean | null;
  explicitApprovalPresent?: boolean | null;
  approvalTiedToExactDiff?: boolean | null;
  approvalTiedToLatestRequest?: boolean | null;
  rollbackContractReady?: boolean | null;
  validationContractReady?: boolean | null;
  resultContractReady?: boolean | null;
  directUiWriteFile?: boolean | null;
  directUiApplyDiff?: boolean | null;
  directUiRunCommand?: boolean | null;
  combinedApplyValidateButton?: boolean | null;
  automaticCommit?: boolean | null;
  autoRunValidation?: boolean | null;
  cleanWorkingTree?: boolean | null;
};

export type GuardedApplyCandidatePolicy = {
  id: string;
  designAllowed: boolean;
  dryRunCandidateAllowed: boolean;
  guardedApplyCandidateAllowed: boolean;
  executionAllowed: false;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
  previewDiffRequired: true;
  oneFileOnlyRequired: true;
  explicitApprovalRequired: true;
  approvalTiedToExactDiffRequired: true;
  approvalTiedToLatestMessageRequired: true;
  rollbackContractRequired: true;
  validationContractRequired: true;
  resultContractRequired: true;
  noDirectUiWriteFile: true;
  noDirectUiApplyDiff: true;
  noDirectUiRunCommand: true;
  noCombinedApplyValidateButton: true;
  noAutomaticCommit: true;
  noAutoRunValidation: true;
  cleanWorkingTreeRecommended: true;
  highRiskFileCategoriesBlocked: true;
  summary: string[];
};

export type GuardedApplyRequirement = {
  id: string;
  label: string;
  required: boolean;
  satisfied: boolean;
  detail: string;
};

export type GuardedApplyApprovalContract = {
  id: string;
  requirements: GuardedApplyRequirement[];
  ready: boolean;
  invalidatedByDiffFileOrRequestChange: true;
  summary: string[];
};

export type GuardedApplyExecutionStep = {
  id: string;
  label: string;
  detail: string;
  phase83DesignOnly: true;
};

export type GuardedApplyExecutionPlan = {
  id: string;
  steps: GuardedApplyExecutionStep[];
  executionAllowed: false;
  designOnlyPhase83: true;
  usesExistingGuardedApplyBoundaryOnlyIfPresent: true;
  noDirectWriteFileApplyDiffOrRunCommand: true;
  noCombinedApplyAndRunValidationStep: true;
  summary: string[];
};

export type GuardedApplyRollbackContract = {
  id: string;
  targetFile: string;
  requirements: GuardedApplyRequirement[];
  ready: boolean;
  guidance: string[];
  limitationsAcknowledged: boolean;
  summary: string[];
};

export type GuardedApplyValidationContract = {
  id: string;
  requirements: GuardedApplyRequirement[];
  commands: string[];
  validationSeparateFromApply: true;
  noAutoRunGuarantee: true;
  summary: string[];
};

export type GuardedApplyResultContract = {
  id: string;
  requirements: GuardedApplyRequirement[];
  workflowResultRecordReady: boolean;
  runHistoryHandoffReady: boolean;
  noAutomaticCommit: true;
  noMemoryAutoPromotion: true;
  summary: string[];
};

export type GuardedApplyImplementationGap = {
  id: string;
  category: GuardedApplyImplementationGapCategory;
  priority: GuardedApplyImplementationGapPriority;
  label: string;
  detail: string;
  nextAction: string;
};

export type GuardedApplyImplementationGaps = {
  id: string;
  gaps: GuardedApplyImplementationGap[];
  blockerCount: number;
  highCount: number;
  summary: string[];
};

export type GuardedApplyCandidateSummary = {
  id: string;
  selectedTargetMode: GuardedApplyCandidateTargetMode;
  oneFileScopeStatus: GuardedApplyCandidateStatus;
  policyStatus: "allowed" | "blocked";
  approvalContractStatus: "ready" | "blocked";
  executionPlanStatus: "design-only";
  rollbackContractStatus: "ready" | "blocked";
  validationContractStatus: "ready" | "blocked";
  resultContractStatus: "ready" | "blocked";
  implementationGapCount: number;
  executionAllowed: false;
  nextSafeAction: string;
  summary: string[];
};

export function buildGuardedApplyCandidateStableKey(
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

export function buildGuardedApplyCandidateStableHash(value: string): string {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function buildGuardedApplyCandidateStableId(prefix: string, ...parts: string[]): string {
  const normalizedPrefix = buildGuardedApplyCandidateStableKey(prefix) || "guarded-apply-candidate";
  const key = buildGuardedApplyCandidateStableKey(...parts);
  return `${normalizedPrefix}-${buildGuardedApplyCandidateStableHash(key || normalizedPrefix)}`;
}

export function normalizeGuardedApplyCandidatePath(value: string): string {
  return value.trim().replace(/\\/g, "/").replace(/\/+/g, "/");
}

export function hasGuardedApplyCandidatePathTraversal(value: string): boolean {
  const normalized = normalizeGuardedApplyCandidatePath(value);
  if (!normalized || normalized.startsWith("/") || /^[a-z]:/i.test(normalized)) return true;
  return normalized.split("/").some((segment) => segment === "..");
}

export function normalizeGuardedApplyCandidateSummary(
  value: string | readonly string[] | null | undefined
): string[] {
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean);
  const text = String(value ?? "").trim();
  return text ? [text] : [];
}

export function uniqueGuardedApplyCandidateStrings(values: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}
