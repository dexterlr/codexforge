export type HealthProbeTargetId =
  | "blender-version"
  | "blender-path-presence"
  | "comfyui-health-endpoint"
  | "comfyui-endpoint-config"
  | "unreal-editor-path-presence"
  | "unreal-version-label"
  | "ffmpeg-version"
  | "ffmpeg-path-presence"
  | "artifact-output-boundary"
  | "custom-local-service-health"
  | "manual-confirmation";

export type HealthProbeTargetKind =
  | "executable-version"
  | "executable-path"
  | "local-http-health"
  | "config-presence"
  | "directory-boundary"
  | "manual"
  | "unknown";

export type HealthProbeExecutorKind = "blender" | "comfyui" | "unreal" | "ffmpeg" | "artifact" | "custom-local-service" | "manual";

export type HealthProbeType =
  | "metadata-only"
  | "command-version-future"
  | "path-presence-future"
  | "local-http-health-future"
  | "directory-boundary-future"
  | "manual-confirmation";

export type HealthProbeRequestedMode = "preview-only" | "manual-confirmation" | "request-ready" | "guarded-probe-future" | "blocked";
export type HealthProbeRiskLevel = "low" | "medium" | "high" | "blocked";
export type HealthProbeDefaultStatus = "request-ready" | "manual-only" | "blocked" | "unknown";
export type HealthProbeAllowedMode = "disabled" | "manual-only" | "metadata-only" | "future-guarded";
export type HealthProbePreflightStatus = "pass" | "warning" | "risk" | "blocker" | "unknown";
export type HealthProbeExecutionStatus =
  | "not-requested"
  | "approval-required"
  | "policy-blocked"
  | "preflight-failed"
  | "manual-only"
  | "request-ready"
  | "probe-disabled"
  | "completed-supplied"
  | "failed"
  | "unknown";
export type HealthProbeResultStatus = "supplied-ready" | "supplied-configured" | "supplied-unreachable" | "supplied-missing" | "manual-only" | "blocked" | "unknown";
export type HealthProbeResultSource = "operator-supplied" | "manual-note" | "metadata-default" | "future-guarded-probe" | "none";
export type HealthProbeConfidence = "high" | "medium" | "low" | "unknown";
export type HealthProbeReachableStatus = "reachable" | "unreachable" | "manual-only" | "unknown";
export type HealthProbePathStatus = "present" | "missing" | "manual-only" | "unknown";
export type HealthProbeBoundaryStatus = "inside-boundary" | "outside-boundary" | "manual-only" | "unknown";

export type HealthProbeTarget = {
  id: HealthProbeTargetId;
  bridgeTargetId: string;
  label: string;
  targetKind: HealthProbeTargetKind;
  executorKind: HealthProbeExecutorKind;
  probeType: HealthProbeType;
  expectedInput: string;
  expectedOutput: string;
  sideEffectProfile: string;
  defaultStatus: HealthProbeDefaultStatus;
  riskLevel: HealthProbeRiskLevel;
  requiresApproval: boolean;
  requiresAllowlist: boolean;
};

export type HealthProbeRequest = {
  id: string;
  targetId: HealthProbeTargetId;
  bridgeProfileId: string;
  probeType: HealthProbeType;
  requestedMode: HealthProbeRequestedMode;
  operatorIntent: string;
  expectedResultShape: string;
  suppliedConfigHints: string[];
  approvalRequired: boolean;
  noJobExecutionGuarantee: string;
  latestMessageAuthorityReminder: string;
  valid: boolean;
  blockerReasons: string[];
};

export type HealthProbeAllowlistItem = {
  targetId: HealthProbeTargetId;
  allowedMode: HealthProbeAllowedMode;
  enabled: boolean;
  commandPatternPlaceholder?: string;
  endpointPatternPlaceholder?: string;
  requiredApproval: boolean;
  sideEffects: string;
  blockedReasons: string[];
  safetyNote: string;
};

export type HealthProbeAllowlist = {
  id: "future-guarded-health-probe-allowlist";
  items: HealthProbeAllowlistItem[];
  wildcardAllowed: false;
  arbitraryCommandsAllowed: false;
  arbitraryEndpointsAllowed: false;
  summary: string[];
};

export type HealthProbeApprovalPacket = {
  id: string;
  probeRequestId: string;
  approved: boolean;
  approvalNote: string;
  acknowledgedTarget: boolean;
  acknowledgedProbeType: boolean;
  acknowledgedLocalAppRequirement: boolean;
  acknowledgedNoCreativeJobExecution: boolean;
  acknowledgedMetadataOnlyScope: boolean;
  acknowledgedNoSecrets: boolean;
  acknowledgedNoRender: boolean;
  acknowledgedNoFileWrites: boolean;
  acknowledgedLatestMessageAuthority: boolean;
  valid: boolean;
  blockerReasons: string[];
};

export type HealthProbePolicy = {
  id: "future-guarded-health-probe-policy";
  previewAllowed: boolean;
  manualAllowed: boolean;
  probeAllowed: boolean;
  requestReady: boolean;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
  rules: string[];
};

export type HealthProbePreflightCheck = {
  id: string;
  label: string;
  status: HealthProbePreflightStatus;
  detail: string;
  blockerReason?: string;
};

export type HealthProbePreflight = {
  id: "future-guarded-health-probe-preflight";
  checks: HealthProbePreflightCheck[];
  status: HealthProbePreflightStatus;
  summary: string[];
};

export type HealthProbeExecutionBridge = {
  id: "future-guarded-health-probe-execution-bridge";
  status: HealthProbeExecutionStatus;
  requestId: string;
  targetId: HealthProbeTargetId;
  allowedToCallGuardedProbeApi: boolean;
  noExecutionOnRender: boolean;
  noExecutionOnModuleLoad: boolean;
  noCreativeJobs: boolean;
  noFileWrites: boolean;
  blockedReasons: string[];
  summary: string[];
};

export type HealthProbeResultItem = {
  targetId: HealthProbeTargetId;
  status: HealthProbeResultStatus;
  resultSource: HealthProbeResultSource;
  suppliedValueLabel?: string;
  versionLabel?: string;
  reachableStatus?: HealthProbeReachableStatus;
  pathStatus?: HealthProbePathStatus;
  boundaryStatus?: HealthProbeBoundaryStatus;
  stdoutExcerpt?: string;
  stderrExcerpt?: string;
  warningReasons: string[];
  blockerReasons: string[];
  confidence: HealthProbeConfidence;
  noJobExecutedConfirmation: boolean;
};

export type HealthProbeResult = {
  id: "future-guarded-health-probe-result";
  items: HealthProbeResultItem[];
  summary: string[];
};

export type HealthProbeReadinessUpdateItem = {
  targetId: HealthProbeTargetId;
  localBridgeHealth: string;
  creativeReadinessAudit: string;
  guardedExecutorPreflight: string;
  videoRenderProviderReadiness: string;
  artifactBoundaryReadiness: string;
  nextSetupAction: string;
  persistedAutomatically: false;
};

export type HealthProbeReadinessUpdate = {
  id: "future-guarded-health-probe-readiness-update";
  items: HealthProbeReadinessUpdateItem[];
  summary: string[];
};

export type FutureHealthProbeSummary = {
  id: "future-guarded-health-probe-summary";
  targetCount: number;
  requestReady: boolean;
  allowlistReady: boolean;
  approvalReady: boolean;
  policyPosture: string;
  preflightStatus: HealthProbePreflightStatus;
  executionBridgeStatus: HealthProbeExecutionStatus;
  suppliedResultCount: number;
  readinessUpdateCount: number;
  nextSafeAction: string;
  summary: string[];
};

export type FutureHealthProbeModel = {
  targets: HealthProbeTarget[];
  request: HealthProbeRequest;
  allowlist: HealthProbeAllowlist;
  approval: HealthProbeApprovalPacket;
  policy: HealthProbePolicy;
  preflight: HealthProbePreflight;
  executionBridge: HealthProbeExecutionBridge;
  result: HealthProbeResult;
  readinessUpdate: HealthProbeReadinessUpdate;
  summary: FutureHealthProbeSummary;
};

export function buildFutureHealthProbeReactKey(...parts: Array<string | number | null | undefined>): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
