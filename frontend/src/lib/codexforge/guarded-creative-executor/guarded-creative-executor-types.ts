export type CreativeExecutorKind =
  | "blender"
  | "comfyui"
  | "unreal"
  | "ffmpeg"
  | "local-renderer"
  | "artifact-capture"
  | "manual-export"
  | "unknown";

export type CreativeExecutorRequestedMode =
  | "dry-run"
  | "request-ready"
  | "guarded-execution-future"
  | "manual-only"
  | "blocked";

export type CreativeExecutorPolicyPosture =
  | "dry-run-first"
  | "request-ready"
  | "execution-disabled"
  | "manual-only"
  | "blocked";

export type CreativeExecutorAllowedMode =
  | "preview-only"
  | "dry-run-only"
  | "future-guarded"
  | "disabled";

export type CreativeExecutorPhaseStatus =
  | "phase-67-dry-run"
  | "phase-67-future"
  | "phase-67-disabled";

export type CreativeExecutorPreflightStatus =
  | "pass"
  | "warning"
  | "risk"
  | "blocker"
  | "unknown";

export type CreativeExecutorRiskLevel = "low" | "medium" | "high" | "critical";

export type CreativeExecutorCaptureStatus =
  | "planned"
  | "waiting-for-future-executor"
  | "manual-only"
  | "captured-supplied"
  | "blocked"
  | "unknown";

export type CreativeExecutorResultStatus =
  | "not-requested"
  | "dry-run-ready"
  | "dry-run-complete"
  | "approval-required"
  | "policy-blocked"
  | "preflight-failed"
  | "request-ready"
  | "execution-disabled"
  | "manual-only"
  | "failed"
  | "unknown";

export type CreativeExecutorRequest = {
  requestId: string;
  sourcePacketId: string;
  sourceRoute: string;
  sourceAdapterKind: string;
  requestedExecutorKind: CreativeExecutorKind;
  requestedMode: CreativeExecutorRequestedMode;
  operatorIntent: string;
  expectedInputArtifacts: string[];
  expectedOutputArtifacts: string[];
  localBridgeProfileId: string;
  adapterId: string;
  policyPosture: CreativeExecutorPolicyPosture;
  noAutoExecutionGuarantee: string;
  latestMessageAuthorityReminder: string;
};

export type CreativeExecutorValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type CreativeExecutorAdapterAllowlistItem = {
  adapterId: string;
  executorKind: CreativeExecutorKind;
  label: string;
  allowedMode: CreativeExecutorAllowedMode;
  enabled: boolean;
  phaseStatus: CreativeExecutorPhaseStatus;
  requiredApprovals: string[];
  requiredLocalBridgeHealth: string;
  requiredArtifactCapturePlan: string;
  sideEffects: string[];
  blockedReasons: string[];
};

export type CreativeExecutorAdapterAllowlist = {
  allowlistId: string;
  items: CreativeExecutorAdapterAllowlistItem[];
  summary: string[];
};

export type CreativeExecutorApprovalPacket = {
  approvalId: string;
  executorRequestId: string;
  approved: boolean;
  approvalNote: string;
  acknowledgedAdapter: boolean;
  acknowledgedExecutorKind: boolean;
  acknowledgedLocalAppRequirement: boolean;
  acknowledgedSideEffects: boolean;
  acknowledgedArtifactOutputBoundary: boolean;
  acknowledgedResourceTimeRisk: boolean;
  acknowledgedCancellationLimits: boolean;
  acknowledgedRollbackLimitations: boolean;
  acknowledgedDryRunFirst: boolean;
  acknowledgedLatestMessageAuthority: boolean;
};

export type CreativeExecutorPolicy = {
  requestRequired: boolean;
  adapterAllowlistedRequired: boolean;
  bridgeProfileRequired: boolean;
  approvalRequiredForExecution: boolean;
  dryRunAllowed: boolean;
  executionAllowed: boolean;
  requestReady: boolean;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
};

export type CreativeExecutorPreflightCheck = {
  checkId: string;
  label: string;
  status: CreativeExecutorPreflightStatus;
  detail: string;
};

export type CreativeExecutorPreflight = {
  preflightId: string;
  requestId: string;
  checks: CreativeExecutorPreflightCheck[];
  status: CreativeExecutorPreflightStatus;
  passed: boolean;
  summary: string[];
};

export type CreativeExecutorDryRunItem = {
  itemId: string;
  order: number;
  label: string;
  wouldDoSummary: string;
  sideEffectSummary: string;
  blocked: boolean;
  riskLevel: CreativeExecutorRiskLevel;
  requiredApproval: string;
  expectedArtifact: string;
};

export type CreativeExecutorDryRun = {
  dryRunId: string;
  requestId: string;
  items: CreativeExecutorDryRunItem[];
  status: CreativeExecutorResultStatus;
  noRealExecutionGuarantee: string;
  summary: string[];
};

export type CreativeExecutorKillSwitchItem = {
  itemId: string;
  label: string;
  policy: string;
  futureOnly: boolean;
  currentPhaseAction: string;
};

export type CreativeExecutorKillSwitchPlan = {
  planId: string;
  requestId: string;
  items: CreativeExecutorKillSwitchItem[];
  ready: boolean;
  summary: string[];
};

export type CreativeExecutorArtifactCaptureItem = {
  artifactId: string;
  type: string;
  sourceExecutorKind: CreativeExecutorKind;
  placeholderPath: string;
  metadataToCapture: string[];
  provenanceSource: string;
  reviewRoute: string;
  retentionStrategy: string;
  safetyNote: string;
  captureStatus: CreativeExecutorCaptureStatus;
};

export type CreativeExecutorArtifactCapture = {
  captureId: string;
  requestId: string;
  items: CreativeExecutorArtifactCaptureItem[];
  ready: boolean;
  summary: string[];
};

export type CreativeExecutorResultItem = {
  itemId: string;
  label: string;
  status: CreativeExecutorResultStatus;
  detail: string;
};

export type CreativeExecutorResult = {
  resultId: string;
  requestId: string;
  status: CreativeExecutorResultStatus;
  items: CreativeExecutorResultItem[];
  executionSuccessClaimed: false;
  summary: string[];
};

export type CreativeExecutorSummary = {
  requestReady: boolean;
  allowlistReady: boolean;
  approvalReady: boolean;
  policyPosture: CreativeExecutorPolicyPosture;
  preflightStatus: CreativeExecutorPreflightStatus;
  dryRunStatus: CreativeExecutorResultStatus;
  killSwitchReadiness: string;
  artifactCaptureReadiness: string;
  executionStatus: CreativeExecutorResultStatus;
  blockedCount: number;
  nextSafeAction: string;
};

export type GuardedCreativeExecutorModel = {
  request: CreativeExecutorRequest;
  requestValidation: CreativeExecutorValidation;
  allowlist: CreativeExecutorAdapterAllowlist;
  approvalPacket: CreativeExecutorApprovalPacket;
  approvalValidation: CreativeExecutorValidation;
  policy: CreativeExecutorPolicy;
  preflight: CreativeExecutorPreflight;
  dryRun: CreativeExecutorDryRun;
  killSwitchPlan: CreativeExecutorKillSwitchPlan;
  artifactCapture: CreativeExecutorArtifactCapture;
  result: CreativeExecutorResult;
  summary: CreativeExecutorSummary;
};

export function buildCreativeExecutorStableId(
  prefix: string,
  parts: ReadonlyArray<string | number | boolean | null | undefined>
): string {
  const slug = parts
    .map((part) => String(part ?? "unknown").trim().toLowerCase())
    .join("-")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

  return `${prefix}-${slug || "unknown"}`;
}

export function buildCreativeExecutorReactKey(
  ...parts: ReadonlyArray<string | number | boolean | null | undefined>
): string {
  return buildCreativeExecutorStableId("creative-executor-key", parts);
}
