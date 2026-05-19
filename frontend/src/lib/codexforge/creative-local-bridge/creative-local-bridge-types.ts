export type CreativeBridgeKind =
  | "blender"
  | "comfyui"
  | "unreal"
  | "video-render"
  | "image-generation"
  | "audio-generation"
  | "custom-local-service"
  | "manual-offline";

export type CreativeBridgeConnectionMode =
  | "local-process"
  | "local-http"
  | "manual"
  | "planned"
  | "disabled";

export type CreativeBridgeSecretStrategy = "none" | "env-only" | "manual" | "not-configured";
export type CreativeBridgeProfileStatus =
  | "ready"
  | "planned"
  | "disabled"
  | "missing-local-app"
  | "missing-endpoint"
  | "unknown";
export type CreativeAdapterExecutionMode =
  | "preview-only"
  | "approval-required"
  | "future-guarded"
  | "disabled";
export type CreativeRiskLevel = "low" | "medium" | "high" | "critical";
export type CreativeBridgeHealthStatus = "ready" | "needs-config" | "warning" | "blocked" | "unknown";
export type CreativeJobKind =
  | "blender-scene-preview"
  | "comfyui-workflow-preview"
  | "unreal-level-preview"
  | "video-render-preview"
  | "image-generation-preview"
  | "artifact-capture-preview"
  | "manual-export-preview";
export type CreativeArtifactCaptureType =
  | "image"
  | "video"
  | "blender-file"
  | "comfyui-workflow"
  | "unreal-sequence"
  | "render-log"
  | "prompt"
  | "scene-plan"
  | "unknown";

export type CreativeBridgeProfile = {
  id: string;
  label: string;
  bridgeKind: CreativeBridgeKind;
  connectionMode: CreativeBridgeConnectionMode;
  executableSourceHint: string;
  endpointHint: string;
  secretStrategy: CreativeBridgeSecretStrategy;
  privacyPosture: string;
  artifactOutputStrategy: string;
  supportsQueue: boolean;
  supportsPreview: boolean;
  supportsDryRun: boolean;
  supportsCancellation: boolean;
  supportsHealthCheck: boolean;
  status: CreativeBridgeProfileStatus;
  safetyNotes: string[];
};

export type CreativeAdapterCatalogItem = {
  id: string;
  label: string;
  bridgeKind: CreativeBridgeKind;
  capability: string;
  executionMode: CreativeAdapterExecutionMode;
  requiredInputs: string[];
  expectedArtifacts: CreativeArtifactCaptureType[];
  sideEffects: string[];
  riskLevel: CreativeRiskLevel;
  approvalRequired: boolean;
  validationRecommendation: string;
  outputRoute: string;
};

export type CreativeBridgeHealthCheck = {
  id: string;
  label: string;
  status: CreativeBridgeHealthStatus;
  detail: string;
};

export type CreativeBridgeHealthReport = {
  checks: CreativeBridgeHealthCheck[];
  status: CreativeBridgeHealthStatus;
  summary: string[];
};

export type CreativeJobRequest = {
  requestId: string;
  jobKind: CreativeJobKind;
  sourceCreativePlanId: string;
  goal: string;
  medium: string;
  bridgeProfileId: string;
  adapterId: string;
  inputSummary: string;
  expectedArtifacts: CreativeArtifactCaptureType[];
  outputPathPlaceholder: string;
  riskLevel: CreativeRiskLevel;
  operatorIntent: string;
  approvalRequired: boolean;
  noExecutionGuarantee: string;
};

export type CreativeJobValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type CreativeJobApprovalPacket = {
  approvalId: string;
  jobRequestId: string;
  approved: boolean;
  approvalNote: string;
  acknowledgedAdapter: boolean;
  acknowledgedSideEffects: boolean;
  acknowledgedArtifactPath: boolean;
  acknowledgedLocalAppRequirement: boolean;
  acknowledgedNoAutomaticExecution: boolean;
  acknowledgedCancellationRollbackLimitations: boolean;
  acknowledgedLatestMessageAuthority: boolean;
};

export type CreativeJobPolicy = {
  previewAllowed: boolean;
  requestReady: boolean;
  executionAllowed: boolean;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
};

export type CreativeArtifactCaptureItem = {
  expectedArtifactId: string;
  type: CreativeArtifactCaptureType;
  label: string;
  sourceAdapter: string;
  placeholderOutputPath: string;
  metadataToCapture: string[];
  reviewAction: string;
  safetyNote: string;
  retentionStrategy: string;
  noWriteGuarantee: string;
};

export type CreativeArtifactCapturePlan = {
  planId: string;
  sourceJobRequestId: string;
  items: CreativeArtifactCaptureItem[];
  ready: boolean;
  summary: string[];
};

export type CreativeBridgeHandoff = {
  handoffId: string;
  bridgeProfile: CreativeBridgeProfile;
  adapter: CreativeAdapterCatalogItem;
  jobRequest: CreativeJobRequest;
  artifactPlan: CreativeArtifactCapturePlan;
  policy: CreativeJobPolicy;
  executionPrompt: string;
  reviewPrompt: string;
  summary: string[];
};

export type CreativeLocalBridgeSummary = {
  bridgeProfileCount: number;
  readyProfileCount: number;
  adapterCount: number;
  executionBlockedCount: number;
  jobRequestReadiness: string;
  artifactCaptureReadiness: string;
  nextSafeAction: string;
};

export type CreativeLocalBridgeModel = {
  profiles: CreativeBridgeProfile[];
  adapters: CreativeAdapterCatalogItem[];
  health: CreativeBridgeHealthReport;
  jobRequest: CreativeJobRequest;
  approvalPacket: CreativeJobApprovalPacket;
  policy: CreativeJobPolicy;
  artifactPlan: CreativeArtifactCapturePlan;
  handoff: CreativeBridgeHandoff;
  summary: CreativeLocalBridgeSummary;
};
