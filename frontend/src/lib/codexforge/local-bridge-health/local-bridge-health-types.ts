export type BridgeHealthTargetId =
  | "blender-local"
  | "comfyui-local"
  | "unreal-local"
  | "ffmpeg-local"
  | "artifact-output-root"
  | "local-renderer"
  | "custom-local-service"
  | "manual-export";

export type BridgeHealthTargetKind =
  | "executable"
  | "local-http"
  | "local-directory"
  | "local-service"
  | "manual"
  | "unknown";

export type BridgeHealthProbeMode =
  | "disabled"
  | "manual-only"
  | "dry-run-only"
  | "future-guarded"
  | "safe-metadata-only";

export type BridgeHealthExecutionRisk = "low" | "medium" | "high" | "blocked";
export type BridgeHealthStatus = "ready" | "configured" | "missing-config" | "unreachable" | "blocked" | "manual-only" | "unknown";
export type BridgeHealthSetupStatus = "complete" | "missing" | "manual-review" | "blocked" | "unknown";
export type BridgeHealthReadinessStatus = "ready" | "configured" | "missing-config" | "manual-only" | "blocked" | "unknown";
export type BridgeHealthSecretStrategy = "none" | "metadata-only" | "operator-managed" | "not-applicable";
export type BridgeHealthPrivacyPosture = "local-metadata-only" | "no-secrets" | "operator-private" | "unknown";
export type BridgeHealthCheckStatus = "pass" | "warning" | "risk" | "blocker" | "unknown";
export type BridgeHealthProbeType =
  | "metadata-only"
  | "check-path-exists-future"
  | "local-http-health-future"
  | "version-command-future"
  | "directory-boundary-future"
  | "manual-confirmation";

export type BridgeHealthReachableStatus = "reachable" | "unreachable" | "manual-only" | "unknown";
export type BridgeHealthEvidenceSource = "operator-supplied" | "metadata-default" | "manual-note" | "future-probe" | "none";
export type BridgeHealthConfidence = "high" | "medium" | "low" | "unknown";

export type BridgeHealthTarget = {
  id: BridgeHealthTargetId;
  label: string;
  targetKind: BridgeHealthTargetKind;
  sourceRoute: string;
  expectedCapability: string;
  expectedLocalRequirement: string;
  connectionMode: string;
  probeMode: BridgeHealthProbeMode;
  executionRisk: BridgeHealthExecutionRisk;
  healthStatus: BridgeHealthStatus;
  setupStatus: BridgeHealthSetupStatus;
  nextSetupAction: string;
};

export type BridgeHealthProfile = {
  id: string;
  targetId: BridgeHealthTargetId;
  label: string;
  configured: boolean;
  pathHint?: string;
  endpointHint?: string;
  environmentHint?: string;
  expectedVersionLabel?: string;
  secretStrategy: BridgeHealthSecretStrategy;
  privacyPosture: BridgeHealthPrivacyPosture;
  readinessStatus: BridgeHealthReadinessStatus;
  missingConfiguration: string[];
  safetyNote: string;
};

export type BridgeHealthCheck = {
  id: string;
  label: string;
  status: BridgeHealthCheckStatus;
  targetId?: BridgeHealthTargetId;
  detail: string;
  blockedReason?: string;
};

export type BridgeHealthCheckPlan = {
  id: "local-bridge-health-check-plan";
  checks: BridgeHealthCheck[];
  summary: string[];
};

export type BridgeHealthPolicy = {
  id: "local-bridge-health-policy";
  previewAllowed: boolean;
  probeAllowed: boolean;
  requestReady: boolean;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
  rules: string[];
};

export type BridgeHealthProbePreviewItem = {
  id: string;
  order: number;
  targetId: BridgeHealthTargetId;
  label: string;
  wouldCheck: string;
  probeType: BridgeHealthProbeType;
  sideEffectSummary: string;
  blocked: boolean;
  requiredApproval: string;
  expectedResultShape: string;
  noExecutionGuarantee: string;
};

export type BridgeHealthProbePreview = {
  id: "local-bridge-health-probe-preview";
  items: BridgeHealthProbePreviewItem[];
  summary: string[];
};

export type BridgeHealthResultItem = {
  targetId: BridgeHealthTargetId;
  status: BridgeHealthStatus;
  configured: boolean;
  reachableStatus: BridgeHealthReachableStatus;
  versionLabel?: string;
  missingConfig: string[];
  blockerReasons: string[];
  warningReasons: string[];
  manualNotes: string[];
  evidenceSource: BridgeHealthEvidenceSource;
  confidence: BridgeHealthConfidence;
};

export type BridgeHealthResult = {
  id: "local-bridge-health-result";
  items: BridgeHealthResultItem[];
  summary: string[];
};

export type BridgeHealthSetupStep = {
  id: string;
  targetId: BridgeHealthTargetId;
  label: string;
  detail: string;
  priority: number;
  blockedUntil: string;
};

export type BridgeHealthSetupGuide = {
  id: "local-bridge-health-setup-guide";
  steps: BridgeHealthSetupStep[];
  summary: string[];
};

export type BridgeHealthNextAction = {
  id: string;
  label: string;
  reason: string;
  route: string;
  priority: number;
  copyPrompt: string;
};

export type BridgeHealthNextActionPlan = {
  id: "local-bridge-health-next-action-plan";
  selected: BridgeHealthNextAction;
  candidates: BridgeHealthNextAction[];
  summary: string[];
};

export type LocalBridgeHealthSummary = {
  id: "local-bridge-health-summary";
  targetCount: number;
  configuredCount: number;
  readyCount: number;
  missingConfigCount: number;
  blockedProbeCount: number;
  manualOnlyCount: number;
  futureProbeReadiness: "request-ready" | "setup-required" | "blocked";
  nextSafeAction: string;
  summary: string[];
};

export type LocalBridgeHealthModel = {
  targets: BridgeHealthTarget[];
  profiles: BridgeHealthProfile[];
  checkPlan: BridgeHealthCheckPlan;
  policy: BridgeHealthPolicy;
  probePreview: BridgeHealthProbePreview;
  result: BridgeHealthResult;
  setupGuide: BridgeHealthSetupGuide;
  nextActionPlan: BridgeHealthNextActionPlan;
  summary: LocalBridgeHealthSummary;
};

export function buildLocalBridgeHealthReactKey(
  ...parts: Array<string | number | null | undefined>
): string {
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
