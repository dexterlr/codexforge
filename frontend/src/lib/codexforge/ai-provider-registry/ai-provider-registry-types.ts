export type AiModelProviderRegistryVersion =
  "athena-jarvis-model-gateway-registry-v1";
export type AiModelProviderRegistrySource = "Athena / Jarvis Model Gateway";
export type AiModelProviderRegistryMode = "preview-only";
export type AiModelProviderStatus = "registry-only / not connected";
export type AiModelProviderSlotStatus = "registry-only";
export type AiModelProviderConnectionState = "not connected";
export type AiModelProviderExecutionPosture = "blocked / registry-only";
export type AiModelProviderApprovalRequirement =
  "Operator approval required";
export type AiModelProviderSafetyRequirement =
  "Safety review required";
export type AiModelProviderAuditRequirement = "Audit required";
export type AiModelProviderCredentialIsolationRequirement =
  "Credential isolation required";
export type AiModelProviderBackendOnlyAdapterRequirement =
  "Server-only adapter required";
export type AiModelProviderBackendOnlyExecutionRequirement =
  "Backend-only execution required";

export type AiModelProviderSlotId =
  | "openai-provider-slot"
  | "anthropic-provider-slot"
  | "google-gemini-provider-slot"
  | "xai-provider-slot"
  | "mistral-provider-slot"
  | "local-open-weight-provider-slot"
  | "image-provider-slot"
  | "video-provider-slot"
  | "audio-voice-provider-slot"
  | "transcription-provider-slot"
  | "safety-moderation-provider-slot";

export type AiModelProviderCapabilityId =
  | "text-chat"
  | "code-assistance"
  | "planning-reasoning"
  | "image-generation"
  | "image-editing"
  | "video-generation"
  | "audio-generation"
  | "voice-narration"
  | "transcription"
  | "embeddings-search"
  | "safety-moderation"
  | "local-inference"
  | "metadata-summarization";

export type AiModelProviderWorkspaceTarget =
  | "Athena Command Center"
  | "Jarvis Video Studio"
  | "Jarvis Websites"
  | "Jarvis Avatar"
  | "Providers"
  | "Assets"
  | "Projects"
  | "Audit / Runs"
  | "Safety / Settings"
  | "Workflows"
  | "Developer / Checkpoints";

export type AiModelProviderSelectionPreviewId =
  | "natural-command-planning"
  | "website-copy-code-planning"
  | "video-prompt-planning"
  | "storyboard-images"
  | "product-video-generation"
  | "narration"
  | "transcript-captioning"
  | "safety-review"
  | "local-private-work";

export type AiModelProviderKey =
  `athena-model-provider:${AiModelProviderSlotId}`;
export type AiModelCapabilityKey =
  `athena-model-capability:${AiModelProviderCapabilityId}`;

export type AiModelProviderSlotRecord = Readonly<{
  id: AiModelProviderSlotId;
  key: AiModelProviderKey;
  label: string;
  description: string;
  providerStatus: AiModelProviderSlotStatus;
  currentState: AiModelProviderConnectionState;
  capabilityFamilies: readonly AiModelProviderCapabilityId[];
  workspaceTargets: readonly AiModelProviderWorkspaceTarget[];
  blockedBy: readonly string[];
  nextAdapterRequirement: string;
}>;

export type AiModelCapabilityMatrixRow = Readonly<{
  capabilityId: AiModelProviderCapabilityId;
  key: AiModelCapabilityKey;
  label: string;
  description: string;
  providerSlotIds: readonly AiModelProviderSlotId[];
  workspaceTargets: readonly AiModelProviderWorkspaceTarget[];
  approvalRequirement: AiModelProviderApprovalRequirement;
  safetyRequirement: AiModelProviderSafetyRequirement;
  auditRequirement: AiModelProviderAuditRequirement;
  credentialIsolationRequirement: AiModelProviderCredentialIsolationRequirement;
  backendOnlyAdapterRequirement: AiModelProviderBackendOnlyAdapterRequirement;
  executionPosture: AiModelProviderExecutionPosture;
  currentState: AiModelProviderConnectionState;
  nextAdapterRequirement: string;
}>;

export type AiModelProviderRoutingReadinessPreviewRecord = Readonly<{
  id: AiModelProviderSelectionPreviewId;
  requestLabel: string;
  providerFamilyLabel: string;
  capabilityId: AiModelProviderCapabilityId;
  capabilityLabel: string;
  workspaceTargets: readonly AiModelProviderWorkspaceTarget[];
  executionPosture: AiModelProviderExecutionPosture;
  currentState: AiModelProviderConnectionState;
  blockedBy: readonly string[];
  nextAdapterRequirement: string;
}>;

export type AiModelProviderRegistryRecord = Readonly<{
  registryVersion: AiModelProviderRegistryVersion;
  source: AiModelProviderRegistrySource;
  registryMode: AiModelProviderRegistryMode;
  providerStatus: AiModelProviderStatus;
  noModelCallsStatement: "No model calls yet";
  noPromptSendingStatement: "No prompt sending";
  noSdkImportStatement: "No provider SDKs imported";
  noFrontendProviderCallStatement: "No frontend provider call";
  serverOnlyAdapterRequiredStatement: "Server-only adapters required";
  credentialIsolationRequiredStatement: "Credential isolation required";
  opaqueCredentialReferenceOnlyStatement: "Opaque credential reference only";
  operatorApprovalRequiredStatement: AiModelProviderApprovalRequirement;
  killSwitchRequiredStatement: "Kill switch required";
  auditRequiredStatement: AiModelProviderAuditRequirement;
  backendOnlyExecutionRequiredStatement: AiModelProviderBackendOnlyExecutionRequirement;
  resultCaptureRequiredInFutureStatement: "Result capture required in future";
  resultPersistenceState: "Result persistence not implemented";
  auditPersistenceState: "Audit persistence not implemented";
  approvalPersistenceState: "Approval persistence not implemented";
  providerSlots: readonly AiModelProviderSlotRecord[];
  capabilityMatrix: readonly AiModelCapabilityMatrixRow[];
  providerSelectionPreview: readonly AiModelProviderRoutingReadinessPreviewRecord[];
}>;

export type AiModelProviderCapabilityGroup = Readonly<{
  capabilityId: AiModelProviderCapabilityId;
  capabilityLabel: string;
  providerSlots: readonly AiModelProviderSlotRecord[];
}>;

export type AiModelProviderWorkspaceCapabilityGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  capabilityRows: readonly AiModelCapabilityMatrixRow[];
}>;

export type AiModelProviderReadinessSummary = Readonly<{
  providerSlotCount: number;
  capabilityCount: number;
  workspaceTargetCount: number;
  providerStatus: AiModelProviderStatus;
  summaryLines: readonly string[];
}>;

export type AiModelCapabilityMatrixPreview = Readonly<{
  capabilityCount: number;
  blockedCapabilityCount: number;
  workspaceTargetCount: number;
  matrixRows: readonly AiModelCapabilityMatrixRow[];
}>;

export type AiModelProviderBlockedExecutionSummary = Readonly<{
  summary: string;
  blockedLines: readonly string[];
}>;
