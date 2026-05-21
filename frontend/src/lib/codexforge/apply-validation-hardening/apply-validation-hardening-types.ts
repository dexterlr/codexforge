export type ApplyValidationHardeningStatus = "pass" | "warning" | "risk" | "blocker" | "unknown";

export type ApplyValidationResultStatus = "pass" | "fail" | "unknown";

export type ApplyValidationCompletionStatus =
  | "not-started"
  | "preview-ready"
  | "apply-request-ready"
  | "applied-needs-validation"
  | "validation-passed"
  | "validation-failed"
  | "blocked"
  | "complete";

export type HardenedApplyInputSource = {
  selectedFilePath?: string | null;
  previewDiffId?: string | null;
  previewDiffText?: string | null;
  previewDiffSummary?: string | readonly string[] | null;
  applyRequestId?: string | null;
  approvalPacketId?: string | null;
  validationRequestId?: string | null;
  rollbackSummary?: string | readonly string[] | null;
  currentCodingFlowId?: string | null;
  operatorIntent?: string | null;
};

export type HardenedApplyInputValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type HardenedApplyInput = {
  id: string;
  hardeningId: string;
  selectedFilePath: string;
  previewDiffId: string;
  previewDiffText: string;
  previewDiffSummary: string[];
  applyRequestId: string;
  approvalPacketId: string;
  validationRequestId: string;
  rollbackSummary: string[];
  currentCodingFlowId: string;
  operatorIntent: string;
  noAutoApplyGuarantee: true;
  noAutoRunGuarantee: true;
  latestMessageAuthorityReminder: string;
  validation: HardenedApplyInputValidation;
  summary: string[];
};

export type HardenedDiffSafetyCheck = {
  id: string;
  label: string;
  status: ApplyValidationHardeningStatus;
  detail: string;
  blocksApply: boolean;
};

export type HardenedDiffSafety = {
  id: string;
  selectedFilePath: string;
  touchedFiles: string[];
  checks: HardenedDiffSafetyCheck[];
  overallStatus: ApplyValidationHardeningStatus;
  blockerCount: number;
  warningCount: number;
  riskCount: number;
  summary: string[];
};

export type HardenedRollbackOption = {
  id: string;
  label: string;
  command: string | null;
  detail: string;
  when: "before-apply" | "after-apply-before-commit" | "after-commit" | "validation-failure" | "app-breakage";
  copyOnly: true;
};

export type HardenedRollbackPlan = {
  id: string;
  targetFiles: string[];
  options: HardenedRollbackOption[];
  ready: boolean;
  guidance: string[];
  summary: string[];
};

export type HardenedValidationCommand = {
  id: string;
  label: string;
  command: string;
  reason: string;
  required: boolean;
  copyOnly: true;
};

export type HardenedValidationPlan = {
  id: string;
  commands: HardenedValidationCommand[];
  selectedSurfaces: string[];
  canCopyCommands: true;
  uiCannotRunCommandsDirectly: true;
  noAutoRunGuarantee: true;
  summary: string[];
};

export type ValidationOutputReviewItem = {
  id: string;
  command: string;
  suppliedOutputExcerpt: string;
  exitCode: number | null;
  status: ApplyValidationResultStatus;
  detectedErrorSummary: string;
  detectedWarningSummary: string;
  truncated: boolean;
  recommendedRoute: string;
  nextAction: string;
};

export type ValidationOutputReview = {
  id: string;
  items: ValidationOutputReviewItem[];
  status: ApplyValidationResultStatus;
  outputIsSuppliedManual: true;
  doesNotFabricateOutput: true;
  summary: string[];
};

export type ValidationResultRoute = {
  id: string;
  condition: string;
  route: string;
  label: string;
  detail: string;
  noAutoFix: true;
};

export type ValidationResultRouting = {
  id: string;
  selectedRoute: ValidationResultRoute;
  routes: ValidationResultRoute[];
  status: ApplyValidationResultStatus;
  summary: string[];
};

export type CodingFlowCompletionChecklistItem = {
  id: string;
  label: string;
  complete: boolean;
};

export type CodingFlowCompletion = {
  id: string;
  status: ApplyValidationCompletionStatus;
  checklist: CodingFlowCompletionChecklistItem[];
  successGuidance: string[];
  copyOnly: true;
  summary: string[];
};

export type ApplyValidationNextAction = {
  id: string;
  label: string;
  href: string;
  detail: string;
  priority: number;
  stopAndReview: boolean;
};

export type ApplyValidationNextActionPlan = {
  id: string;
  selected: ApplyValidationNextAction;
  candidates: ApplyValidationNextAction[];
  summary: string[];
};

export type HardenedApplyPolicy = {
  id: string;
  allowed: boolean;
  requestReady: boolean;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
  selectedFilePathRequired: true;
  previewDiffRequired: true;
  explicitApprovalRequired: true;
  touchedFileListRequired: true;
  rollbackPlanRequired: true;
  validationPlanRequired: true;
  pathTraversalCheckRequired: true;
  binaryFileCheckRequired: true;
  patchSizeCheckRequired: true;
  sourceTreeBoundaryCheckRequired: true;
  cleanWorkingTreeRecommended: true;
  noDirectUiApplyDiff: true;
  noDirectUiWriteFile: true;
  latestMessageAuthorityPreserved: true;
  summary: string[];
};

export type HardenedApplyPolicySource = {
  input?: HardenedApplyInput | null;
  diffSafety?: HardenedDiffSafety | null;
  rollbackPlan?: HardenedRollbackPlan | null;
  validationPlan?: HardenedValidationPlan | null;
  explicitApproval?: boolean | null;
  touchedFiles?: readonly string[] | null;
  highRiskAcknowledged?: boolean | null;
  cleanWorkingTree?: boolean | null;
  directUiApplyDiffAttempted?: boolean | null;
  directUiWriteFileAttempted?: boolean | null;
};

export type ApplyValidationHardeningSummary = {
  id: string;
  applyPolicyStatus: "allowed" | "blocked";
  diffSafetyStatus: ApplyValidationHardeningStatus;
  rollbackReady: boolean;
  validationCommandCount: number;
  outputReviewStatus: ApplyValidationResultStatus;
  resultRoute: string;
  completionStatus: ApplyValidationCompletionStatus;
  blockerCount: number;
  nextSafeAction: string;
  summary: string[];
};

export function buildApplyValidationStableKey(...parts: Array<string | number | boolean | null | undefined>): string {
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

export function buildApplyValidationStableHash(value: string): string {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function buildApplyValidationStableId(prefix: string, ...parts: string[]): string {
  const normalizedPrefix = buildApplyValidationStableKey(prefix) || "apply-validation";
  const key = buildApplyValidationStableKey(...parts);
  return `${normalizedPrefix}-${buildApplyValidationStableHash(key || normalizedPrefix)}`;
}

export function normalizeApplyValidationPath(value: string): string {
  return value.trim().replace(/\\/g, "/").replace(/\/+/g, "/");
}

export function hasApplyValidationPathTraversal(value: string): boolean {
  const normalized = normalizeApplyValidationPath(value);
  if (!normalized || normalized.startsWith("/") || /^[a-z]:/i.test(normalized)) return true;
  return normalized.split("/").some((segment) => segment === "..");
}

export function uniqueApplyValidationStrings(values: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function normalizeApplyValidationSummary(value: string | readonly string[] | null | undefined): string[] {
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean);
  const text = String(value ?? "").trim();
  return text ? [text] : [];
}
