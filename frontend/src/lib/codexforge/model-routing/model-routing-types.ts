export const CODEXFORGE_ROUTING_MODES = [
  "local-only",
  "free-only",
  "free-first",
  "best-within-budget",
  "manual",
] as const;

export const CODEXFORGE_PROVIDER_LOCALITIES = ["local", "cloud"] as const;

export const CODEXFORGE_PROVIDER_CATALOG_STATES = [
  "enabled",
  "planned",
  "disabled",
] as const;

export const CODEXFORGE_MODEL_COST_CLASSES = [
  "local-no-provider-token-charge",
  "free-tier",
  "paid",
  "unknown",
] as const;

export const CODEXFORGE_MODEL_DATA_BOUNDARIES = [
  "local-machine",
  "cloud-provider",
] as const;

export const CODEXFORGE_MODEL_QUALIFICATION_STATES = [
  "discovered",
  "metadata-ready",
  "deterministic-tested",
  "live-verified",
  "disabled",
  "deprecated",
] as const;

export const CODEXFORGE_MODEL_ROUTING_STATES = [
  "disabled",
  "manual-only",
  "automatic",
] as const;

export const CODEXFORGE_MODEL_AVAILABILITY_STATES = [
  "available",
  "unavailable",
  "unknown",
] as const;

export const CODEXFORGE_QUOTA_STATES = [
  "not-applicable",
  "available",
  "exhausted",
  "unknown",
] as const;

export const CODEXFORGE_PAID_APPROVAL_STATES = [
  "not-granted",
  "granted-for-request",
] as const;

export const CODEXFORGE_PRIVACY_REQUIREMENTS = [
  "local-required",
  "cloud-allowed",
] as const;

export const CODEXFORGE_ROUTING_DECISION_STATUSES = [
  "selected",
  "no-eligible-model",
  "paid-approval-required",
  "manual-selection-required",
  "manual-selection-invalid",
] as const;

export const CODEXFORGE_MODEL_CAPABILITIES = [
  "text-generation",
  "code-generation",
  "code-review",
  "planning-reasoning",
  "summarization",
  "structured-output",
  "tool-use",
  "vision-input",
  "image-generation",
  "image-editing",
  "video-generation",
  "audio-generation",
  "speech-to-text",
  "text-to-speech",
  "embeddings",
] as const;

export const CODEXFORGE_TASK_PROFILES = [
  "general-text",
  "code-generation",
  "code-review",
  "planning-reasoning",
  "summarization",
  "structured-extraction",
  "multimodal-review",
  "image-generation",
  "video-generation",
  "transcription",
  "embeddings-search",
] as const;

export type CodexForgeRoutingMode = typeof CODEXFORGE_ROUTING_MODES[number];
export type CodexForgeProviderLocality = typeof CODEXFORGE_PROVIDER_LOCALITIES[number];
export type CodexForgeProviderCatalogState =
  typeof CODEXFORGE_PROVIDER_CATALOG_STATES[number];
export type CodexForgeModelCostClass = typeof CODEXFORGE_MODEL_COST_CLASSES[number];
export type CodexForgeModelDataBoundary =
  typeof CODEXFORGE_MODEL_DATA_BOUNDARIES[number];
export type CodexForgeModelQualificationState =
  typeof CODEXFORGE_MODEL_QUALIFICATION_STATES[number];
export type CodexForgeModelRoutingState =
  typeof CODEXFORGE_MODEL_ROUTING_STATES[number];
export type CodexForgeModelAvailabilityState =
  typeof CODEXFORGE_MODEL_AVAILABILITY_STATES[number];
export type CodexForgeQuotaState = typeof CODEXFORGE_QUOTA_STATES[number];
export type CodexForgePaidApprovalState =
  typeof CODEXFORGE_PAID_APPROVAL_STATES[number];
export type CodexForgePrivacyRequirement =
  typeof CODEXFORGE_PRIVACY_REQUIREMENTS[number];
export type CodexForgeRoutingDecisionStatus =
  typeof CODEXFORGE_ROUTING_DECISION_STATUSES[number];
export type CodexForgeCapability = typeof CODEXFORGE_MODEL_CAPABILITIES[number];
export type CodexForgeTaskProfile = typeof CODEXFORGE_TASK_PROFILES[number];

export type CodexForgeProviderId = string;
export type CodexForgeModelId = string;
export type CodexForgeModelKey = `${string}::${string}`;

export type CodexForgeRoutingReasonCode =
  | "manual-selection"
  | "local-only-policy"
  | "free-only-policy"
  | "free-first-local"
  | "free-first-free"
  | "free-first-paid"
  | "best-within-budget"
  | "highest-task-fit"
  | "stable-key-tiebreak"
  | "paid-approval-required";

export type CodexForgeRoutingRejectionCode =
  | "provider-disabled"
  | "model-disabled"
  | "model-not-qualified"
  | "unavailable"
  | "quota-unavailable"
  | "capability-mismatch"
  | "output-limit-exceeded"
  | "privacy-local-required"
  | "locality-not-allowed"
  | "cost-class-not-allowed"
  | "pricing-unknown"
  | "budget-required"
  | "over-budget"
  | "manual-model-mismatch";

export type CodexForgeProviderDescriptor = Readonly<{
  providerId: CodexForgeProviderId;
  label: string;
  locality: CodexForgeProviderLocality;
  dataBoundary: CodexForgeModelDataBoundary;
  catalogState: CodexForgeProviderCatalogState;
  adapterId: string;
  notes: readonly string[];
}>;

export type CodexForgeModelPricing = Readonly<{
  costClass: CodexForgeModelCostClass;
  currency: "USD";
  inputUsdPerMillionTokens: number | null;
  outputUsdPerMillionTokens: number | null;
  pricingAsOf: string | null;
  sourceLabel: string;
}>;

export type CodexForgeTaskProfileScores = Readonly<
  Partial<Record<CodexForgeTaskProfile, number>>
>;

export type CodexForgeModelDescriptor = Readonly<{
  modelKey: CodexForgeModelKey;
  providerId: CodexForgeProviderId;
  modelId: CodexForgeModelId;
  label: string;
  routingState: CodexForgeModelRoutingState;
  qualificationState: CodexForgeModelQualificationState;
  capabilities: readonly CodexForgeCapability[];
  approvedMaximumOutputTokens: number;
  contextWindowTokens: number | null;
  pricing: CodexForgeModelPricing;
  taskProfileScores: CodexForgeTaskProfileScores;
  evidence: readonly string[];
}>;

export type CodexForgeModelCatalogSnapshot = Readonly<{
  catalogVersion: string;
  providers: readonly CodexForgeProviderDescriptor[];
  models: readonly CodexForgeModelDescriptor[];
}>;

export type CodexForgeModelRuntimeSnapshot = Readonly<{
  modelKey: CodexForgeModelKey;
  availability: CodexForgeModelAvailabilityState;
  quotaState: CodexForgeQuotaState;
  observedLatencyMs: number | null;
  observedAt: string | null;
}>;

export type CodexForgeRoutingPolicy = Readonly<{
  mode: CodexForgeRoutingMode;
  privacyRequirement: CodexForgePrivacyRequirement;
  maximumEstimatedCostUsd: number | null;
  paidApprovalState: CodexForgePaidApprovalState;
  manualModelKey: CodexForgeModelKey | null;
}>;

export type CodexForgeRoutingRequest = Readonly<{
  taskProfile: CodexForgeTaskProfile;
  requiredCapabilities: readonly CodexForgeCapability[];
  estimatedInputTokens: number;
  maximumOutputTokens: number;
  policy: CodexForgeRoutingPolicy;
  runtimeSnapshots: readonly CodexForgeModelRuntimeSnapshot[];
}>;

export type CodexForgeCandidateEvaluation = Readonly<{
  modelKey: CodexForgeModelKey;
  eligible: boolean;
  score: number;
  estimatedCostUsd: number | null;
  reasonCodes: readonly CodexForgeRoutingReasonCode[];
  rejectionCodes: readonly CodexForgeRoutingRejectionCode[];
}>;

export type CodexForgeRoutingDecision = Readonly<{
  catalogVersion: string;
  status: CodexForgeRoutingDecisionStatus;
  mode: CodexForgeRoutingMode;
  selectedModelKey: CodexForgeModelKey | null;
  recommendedPaidModelKey: CodexForgeModelKey | null;
  estimatedCostUsd: number | null;
  requiresPaidApproval: boolean;
  explanation: string;
  reasonCodes: readonly CodexForgeRoutingReasonCode[];
  candidates: readonly CodexForgeCandidateEvaluation[];
}>;
