export type ValidationCommandCategory =
  | "build"
  | "smoke"
  | "git-check"
  | "server-smoke"
  | "targeted-smoke"
  | "regression-check"
  | "unknown";

export type ValidationRiskLevel = "low" | "medium" | "high" | "blocked";
export type ValidationPreflightStatus = "pass" | "warning" | "risk" | "blocker" | "unknown";
export type ValidationExecutionStatus =
  | "not-requested"
  | "approval-required"
  | "policy-blocked"
  | "preflight-failed"
  | "request-ready"
  | "running"
  | "completed"
  | "blocked"
  | "failed"
  | "manual-only";
export type ValidationOutputStatus = "not-supplied" | "passed" | "failed" | "warning" | "unknown";
export type ValidationResultTarget =
  | "Verification Ingestion"
  | "Regression Triage"
  | "Patch Apply"
  | "Stabilization"
  | "Product Readiness"
  | "Continuity Handoff"
  | "manual review";

export type ValidationCommandCatalogItem = {
  id: string;
  label: string;
  command: string;
  purpose: string;
  category: ValidationCommandCategory;
  riskLevel: ValidationRiskLevel;
  allowlisted: boolean;
  requiresApproval: boolean;
  expectedDurationLabel: string;
  outputRoutingHint: string;
  relatedPhaseOrSurface: string;
  noWriteExpectation: string;
};

export type ValidationCommandCatalog = {
  id: "validation-command-catalog";
  items: ValidationCommandCatalogItem[];
  allowlistedCount: number;
  blockedCount: number;
  summary: string[];
};

export type ValidationRunRequest = {
  id: string;
  requestId: string;
  selectedCommandIds: string[];
  selectedCommands: ValidationCommandCatalogItem[];
  sourceSurface: string;
  sourcePatchApplyId: string | null;
  operatorIntent: string;
  expectedOutputRouting: string;
  noMutationExpectation: string;
  approvalRequired: true;
  latestMessageAuthorityReminder: string;
  validation: { valid: boolean; blockedReasons: string[]; warnings: string[] };
  summary: string[];
};

export type ValidationRunApproval = {
  id: string;
  approvalId: string;
  requestId: string;
  approved: boolean;
  approvalNote: string;
  acknowledgedCommands: boolean;
  acknowledgedCommandRisk: boolean;
  acknowledgedNoArbitraryShell: boolean;
  acknowledgedOutputCapture: boolean;
  acknowledgedNoBrainGraphMutation: boolean;
  acknowledgedLatestMessageAuthority: boolean;
  highRiskExtraAcknowledgementRequired: boolean;
  highRiskExtraAcknowledged: boolean;
  missingAcknowledgements: string[];
  readyForPolicy: boolean;
  summary: string[];
};

export type ValidationRunPolicy = {
  id: string;
  allowed: boolean;
  requestReady: boolean;
  requestRequired: true;
  explicitApprovalRequired: true;
  allowlistRequired: true;
  arbitraryShellBlocked: true;
  commandChainingBlocked: true;
  pathTraversalBlocked: true;
  networkCommandsBlocked: true;
  destructiveCommandsBlocked: true;
  writeCommandsBlocked: true;
  brokerExecutionBlocked: true;
  applyDiffWriteFileBlocked: true;
  brainGraphMutationBlocked: true;
  outputCaptureAllowed: true;
  manualCopyFallbackAllowed: true;
  latestMessageAuthorityPreserved: true;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
  summary: string[];
};

export type ValidationPreflightCheck = {
  id: string;
  label: string;
  status: ValidationPreflightStatus;
  detail: string;
  blocksRun: boolean;
};

export type ValidationRunPreflight = {
  id: string;
  requestId: string;
  checks: ValidationPreflightCheck[];
  overallStatus: ValidationPreflightStatus;
  blockerCount: number;
  warningCount: number;
  riskCount: number;
  summary: string[];
};

export type ValidationExecutionBridge = {
  id: string;
  requestId: string;
  status: ValidationExecutionStatus;
  boundary: "guarded-validation-runner";
  guardedRunApiAvailable: boolean;
  canRequestRun: boolean;
  copyableCommands: string[];
  blockedReasons: string[];
  safetyNotes: string[];
  requestBodyPreview: Record<string, unknown> | null;
  summary: string[];
};

export type ValidationExecutionResult = {
  id: string;
  requestId: string;
  status: ValidationExecutionStatus;
  completed: boolean;
  outputs: ValidationOutputCaptureItem[];
  errors: string[];
  warnings: string[];
  summary: string[];
};

export type ValidationOutputCaptureItem = {
  id: string;
  commandId: string;
  command: string;
  exitCode: number | null;
  stdoutExcerpt: string;
  stderrExcerpt: string;
  status: ValidationOutputStatus;
  detectedMarkers: string[];
  errorSummary: string;
  truncated: boolean;
  capturedAtLabel: string;
  manualPasteSupported: true;
};

export type ValidationOutputCapture = {
  id: string;
  requestId: string;
  items: ValidationOutputCaptureItem[];
  outputCaptured: boolean;
  failureCount: number;
  summary: string[];
};

export type ValidationResultRoute = {
  id: string;
  commandId: string;
  command: string;
  target: ValidationResultTarget;
  reason: string;
  handoffPayload: string;
  sideEffectFree: true;
};

export type ValidationResultRouter = {
  id: string;
  requestId: string;
  routes: ValidationResultRoute[];
  recommendation: string;
  summary: string[];
};

export type ValidationRunnerSummary = {
  id: string;
  commandCount: number;
  approvalReady: boolean;
  policyReady: boolean;
  preflightStatus: ValidationPreflightStatus;
  executionStatus: ValidationExecutionStatus;
  outputCaptured: boolean;
  failureCount: number;
  resultRouteRecommendation: string;
  nextSafeAction: string;
  summary: string[];
};

export function buildValidationRunnerStableKey(
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

export function buildValidationRunnerStableHash(value: string): string {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function buildValidationRunnerStableId(prefix: string, ...parts: string[]): string {
  const normalizedPrefix = buildValidationRunnerStableKey(prefix) || "validation-runner";
  const key = buildValidationRunnerStableKey(...parts);
  return `${normalizedPrefix}-${buildValidationRunnerStableHash(key || normalizedPrefix)}`;
}

export function uniqueValidationRunnerStrings(values: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}
