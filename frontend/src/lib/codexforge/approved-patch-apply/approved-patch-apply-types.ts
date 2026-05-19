export type ApprovedPatchApplyRiskLevel = "low" | "medium" | "high" | "critical" | "blocked";

export type ApprovedPatchApplyMode = "preview-only" | "request-ready" | "guarded-apply";

export type ApprovedPatchApplyValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type ApprovedPatchApplyRequestSource = {
  sourcePreviewId?: string | null;
  selectedFilePath?: string | null;
  previewDiff?: string | null;
  patchPlanSummary?: string | readonly string[] | null;
  riskLevel?: ApprovedPatchApplyRiskLevel | null;
  expectedTouchedFiles?: readonly string[] | null;
  operatorIntent?: string | null;
  requestedApplyMode?: ApprovedPatchApplyMode | null;
};

export type ApprovedPatchApplyRequest = {
  id: string;
  requestId: string;
  sourcePreviewId: string;
  selectedFilePath: string;
  previewDiff: string;
  previewDiffDigest: string;
  patchPlanSummary: string[];
  riskLevel: ApprovedPatchApplyRiskLevel;
  expectedTouchedFiles: string[];
  operatorIntent: string;
  requestedApplyMode: ApprovedPatchApplyMode;
  noCommandGuarantee: string;
  approvalRequired: true;
  validation: ApprovedPatchApplyValidation;
  summary: string[];
};

export type ApprovedPatchApplyApprovalPacketSource = {
  request: ApprovedPatchApplyRequest;
  approved?: boolean | null;
  approvalNote?: string | null;
  acknowledgedPreviewDiff?: boolean | null;
  acknowledgedTouchedFiles?: boolean | null;
  acknowledgedRiskLevel?: boolean | null;
  acknowledgedRollbackPlan?: boolean | null;
  acknowledgedValidationPlan?: boolean | null;
  acknowledgedNoCommandExecutionFromUi?: boolean | null;
  acknowledgedFileWriteBoundary?: boolean | null;
  acknowledgedLatestMessageAuthority?: boolean | null;
  highRiskExtraAcknowledged?: boolean | null;
};

export type ApprovedPatchApplyApprovalPacket = {
  id: string;
  approvalPacketId: string;
  applyRequestId: string;
  approved: boolean;
  approvalNote: string;
  acknowledgedPreviewDiff: boolean;
  acknowledgedTouchedFiles: boolean;
  acknowledgedRiskLevel: boolean;
  acknowledgedRollbackPlan: boolean;
  acknowledgedValidationPlan: boolean;
  acknowledgedNoCommandExecutionFromUi: boolean;
  acknowledgedFileWriteBoundary: boolean;
  acknowledgedLatestMessageAuthority: boolean;
  highRiskExtraAcknowledgementRequired: boolean;
  highRiskExtraAcknowledged: boolean;
  missingAcknowledgements: string[];
  readyForPolicy: boolean;
  summary: string[];
};

export type ApprovedPatchApplyPolicySource = {
  request?: ApprovedPatchApplyRequest | null;
  approvalPacket?: ApprovedPatchApplyApprovalPacket | null;
  preflight?: ApprovedPatchApplyPreflight | null;
  dryRunPreview?: ApprovedPatchApplyDryRunPreview | null;
  rollbackPlan?: ApprovedPatchApplyRollbackPlan | null;
  validationCapture?: ApprovedPatchApplyValidationCapture | null;
  directUiApplyDiffAttempted?: boolean | null;
  directUiWriteFileAttempted?: boolean | null;
  commandExecutionFromUiAttempted?: boolean | null;
  brokerExecutionAttempted?: boolean | null;
  cleanWorkingTree?: boolean | null;
};

export type ApprovedPatchApplyPolicy = {
  id: string;
  allowed: boolean;
  requestReady: boolean;
  previewDiffRequired: true;
  selectedFilePathRequired: true;
  cleanWorkingTreeRecommended: true;
  explicitApprovalRequired: true;
  rollbackPlanRequired: true;
  validationPlanRequired: true;
  preflightMustPass: true;
  dryRunPreflightRequiredBeforeApply: true;
  highOrCriticalRiskRequiresExtraAcknowledgement: boolean;
  applyDiffGuardedBridgeOnly: true;
  directUiApplyDiffCallBlocked: boolean;
  directUiWriteFileCallBlocked: boolean;
  commandExecutionFromUiBlocked: boolean;
  brokerExecutionBlocked: boolean;
  latestMessageAuthorityPreserved: true;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
  summary: string[];
};

export type ApprovedPatchApplyPreflightStatus =
  | "pass"
  | "warning"
  | "risk"
  | "blocker"
  | "unknown";

export type ApprovedPatchApplyPreflightCheck = {
  id: string;
  label: string;
  status: ApprovedPatchApplyPreflightStatus;
  detail: string;
  blocksApply: boolean;
};

export type ApprovedPatchApplyPreflight = {
  id: string;
  requestId: string;
  checks: ApprovedPatchApplyPreflightCheck[];
  overallStatus: ApprovedPatchApplyPreflightStatus;
  blockerCount: number;
  warningCount: number;
  riskCount: number;
  summary: string[];
};

export type ApprovedPatchApplyDryRunItemStatus = "pass" | "warning" | "blocker" | "unknown";

export type ApprovedPatchApplyDryRunItem = {
  id: string;
  label: string;
  filePath: string | null;
  status: ApprovedPatchApplyDryRunItemStatus;
  detail: string;
  blocksApply: boolean;
};

export type ApprovedPatchApplyDryRunPreview = {
  id: string;
  requestId: string;
  doesNotWriteFiles: true;
  shapeAppearsApplicable: boolean;
  missingBeforeTextDetected: boolean;
  ambiguousHunksDetected: boolean;
  multiFileMismatchDetected: boolean;
  riskyPathDetected: boolean;
  expectedFileChangesSummary: string[];
  items: ApprovedPatchApplyDryRunItem[];
  status: ApprovedPatchApplyDryRunItemStatus;
  summary: string[];
};

export type ApprovedPatchApplyRollbackOption = {
  id: string;
  label: string;
  command: string | null;
  detail: string;
  when: "before-apply" | "after-apply-before-commit" | "after-commit" | "failure";
  copyOnly: true;
};

export type ApprovedPatchApplyRollbackPlan = {
  id: string;
  requestId: string;
  targetFiles: string[];
  options: ApprovedPatchApplyRollbackOption[];
  guidance: string[];
  ready: boolean;
  summary: string[];
};

export type ApprovedPatchApplyExecutionStatus =
  | "not-requested"
  | "approval-required"
  | "policy-blocked"
  | "preflight-failed"
  | "dry-run-warning"
  | "request-ready"
  | "applied"
  | "blocked"
  | "failed";

export type ApprovedPatchApplyExecutionBridge = {
  id: string;
  requestId: string;
  status: ApprovedPatchApplyExecutionStatus;
  boundary: "guarded-bridge";
  guardedApiAvailable: boolean;
  canRequestApply: boolean;
  blockedReasons: string[];
  safetyNotes: string[];
  requestBodyPreview: Record<string, unknown> | null;
  summary: string[];
};

export type ApprovedPatchApplyExecutionResult = {
  id: string;
  requestId: string;
  status: ApprovedPatchApplyExecutionStatus;
  applied: boolean;
  changedFiles: string[];
  errors: string[];
  warnings: string[];
  summary: string[];
};

export type ApprovedPatchApplyValidationCommand = {
  id: string;
  label: string;
  command: string;
  copyOnly: true;
  required: boolean;
};

export type ApprovedPatchApplyValidationCapture = {
  id: string;
  requestId: string;
  commands: ApprovedPatchApplyValidationCommand[];
  manualResultText: string;
  commandExecutionFromUi: false;
  ready: boolean;
  summary: string[];
};

export type ApprovedPatchApplySummary = {
  id: string;
  requestReady: boolean;
  approvalReady: boolean;
  policyReady: boolean;
  preflightStatus: ApprovedPatchApplyPreflightStatus;
  dryRunStatus: ApprovedPatchApplyDryRunItemStatus;
  rollbackReady: boolean;
  validationCommandCount: number;
  executionStatus: ApprovedPatchApplyExecutionStatus;
  nextSafeAction: string;
  summary: string[];
};

export function buildApprovedPatchApplyStableKey(
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

export function buildApprovedPatchApplyStableHash(value: string): string {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function buildApprovedPatchApplyStableId(prefix: string, ...parts: string[]): string {
  const normalizedPrefix = buildApprovedPatchApplyStableKey(prefix) || "approved-patch-apply";
  const key = buildApprovedPatchApplyStableKey(...parts);
  return `${normalizedPrefix}-${buildApprovedPatchApplyStableHash(key || normalizedPrefix)}`;
}

export function uniqueApprovedPatchApplyStrings(
  values: readonly (string | null | undefined)[]
): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function normalizeApprovedPatchApplyPath(value: string): string {
  return value.trim().replace(/\\/g, "/").replace(/\/+/g, "/");
}

export function hasApprovedPatchApplyPathTraversal(value: string): boolean {
  const normalized = normalizeApprovedPatchApplyPath(value);
  if (!normalized || normalized.startsWith("/") || /^[a-z]:/i.test(normalized)) return true;
  return normalized.split("/").some((segment) => segment === "..");
}

export function isApprovedPatchApplyHighRisk(level: ApprovedPatchApplyRiskLevel): boolean {
  return level === "high" || level === "critical" || level === "blocked";
}
