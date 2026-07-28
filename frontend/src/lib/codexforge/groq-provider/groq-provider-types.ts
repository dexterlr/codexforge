export const CODEXFORGE_GROQ_PROVIDER_ID = "groq-cloud" as const;

export const CODEXFORGE_GROQ_MODEL_IDS = [
  "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
] as const;

export const CODEXFORGE_GROQ_MODEL_KEYS = [
  "groq-cloud::openai/gpt-oss-20b",
  "groq-cloud::openai/gpt-oss-120b",
] as const;

export const CODEXFORGE_GROQ_QUALIFICATION_VERSION =
  "codexforge-groq-qualification-v2" as const;

export const CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_VERSION =
  "codexforge-groq-live-execution-acceptance-v1" as const;

export const CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_ID =
  "codexforge-groq-private-alpha-live-execution-20260727-165043" as const;

export const CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTED_ON =
  "2026-07-27" as const;

export const CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_CHECKPOINT =
  "b17311bb5720a5037edd756d91c266eee7ce6947" as const;

export const CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS = 512 as const;

export const CODEXFORGE_GROQ_ERROR_CODES = [
  "groq_credential_missing",
  "groq_authentication_failed",
  "groq_rate_limited",
  "groq_quota_exhausted",
  "groq_unavailable",
  "groq_model_unavailable",
  "groq_timeout",
  "groq_http_error",
  "groq_malformed_response",
  "groq_empty_response",
  "groq_output_too_large",
] as const;

export type CodexForgeGroqProviderId = typeof CODEXFORGE_GROQ_PROVIDER_ID;

export type CodexForgeGroqModelId = (typeof CODEXFORGE_GROQ_MODEL_IDS)[number];

export type CodexForgeGroqModelKey = (typeof CODEXFORGE_GROQ_MODEL_KEYS)[number];

export type CodexForgeGroqErrorCode = (typeof CODEXFORGE_GROQ_ERROR_CODES)[number];

export type CodexForgeGroqCredentialSource = "environment" | "none";

export type CodexForgeGroqConfigurationStatus = Readonly<{
  configured: boolean;
  credentialSource: CodexForgeGroqCredentialSource;
  safeMessage: string;
}>;

export type CodexForgeGroqObservedRateLimitHeaders = Readonly<
  Record<string, string>
>;

export type CodexForgeGroqDiscoveredModel = Readonly<{
  modelId: CodexForgeGroqModelId;
  active: boolean | null;
  contextWindowTokens: number | null;
  maximumOutputTokens: number | null;
  ownedBy: string | null;
}>;

export type CodexForgeGroqModelDiscoveryResult = Readonly<{
  providerId: CodexForgeGroqProviderId;
  discoveredModels: readonly CodexForgeGroqDiscoveredModel[];
  missingAllowedModels: readonly CodexForgeGroqModelId[];
  observedRateLimitHeaders: CodexForgeGroqObservedRateLimitHeaders;
  safeWarning: string | null;
}>;

export type CodexForgeGroqGenerationInput = Readonly<{
  approvedRequestText: string;
  model: CodexForgeGroqModelId;
  maximumOutputTokens: number;
}>;

export type CodexForgeGroqGenerationResult = Readonly<{
  model: CodexForgeGroqModelId;
  outputText: string;
  finishReason: string | null;
  promptTokens: number | null;
  outputTokens: number | null;
  totalTokens: number | null;
  totalDurationNanoseconds: number | null;
}>;

export type CodexForgeGroqTransportQualificationState = "live-verified";

export type CodexForgeGroqManualPrivateAlphaExecutionAdmissionState = "admitted";

export type CodexForgeGroqRoutingState = "manual-only";

export type CodexForgeGroqAutomaticRoutingState = "disabled";

export type CodexForgeGroqAccountTierState = "operator-confirmed-free";

export type CodexForgeGroqDataBoundary = "cloud-provider";

export type CodexForgeGroqCapability = "text-generation";

export type CodexForgeGroqExecutionEnvelope = "text-only";

export type CodexForgeGroqExecutionAdmissionState = "admitted";

export type CodexForgeGroqServerMode = "next-start-production";

export type CodexForgeGroqVerificationMode =
  "read-only-persisted-record-verification";

export type CodexForgeGroqAcceptedExecutionState = "succeeded";

export type CodexForgeGroqRequiredOperatorAcknowledgement =
  | "explicit-manual-approval"
  | "cloud-transfer-acknowledgement"
  | "cloud-execution-acknowledgement";

export type CodexForgeGroqSuccessfulAuditSequenceState =
  "complete-and-ordered";

export type CodexForgeGroqPersistedErrorState = "none";

export type CodexForgeGroqLiveExecutionAcceptedModelMetrics = Readonly<{
  executionState: CodexForgeGroqAcceptedExecutionState;
  acceptedMaximumOutputTokens: typeof CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS;
  promptTokens: number;
  outputTokens: number;
  durationMilliseconds: number;
  outputSha256: string;
}>;

export type CodexForgeGroq20bLiveExecutionAcceptedModelRecord =
  CodexForgeGroqLiveExecutionAcceptedModelMetrics &
    Readonly<{
      modelId: "openai/gpt-oss-20b";
      modelKey: "groq-cloud::openai/gpt-oss-20b";
    }>;

export type CodexForgeGroq120bLiveExecutionAcceptedModelRecord =
  CodexForgeGroqLiveExecutionAcceptedModelMetrics &
    Readonly<{
      modelId: "openai/gpt-oss-120b";
      modelKey: "groq-cloud::openai/gpt-oss-120b";
    }>;

export type CodexForgeGroqLiveExecutionAcceptedModelRecord =
  | CodexForgeGroq20bLiveExecutionAcceptedModelRecord
  | CodexForgeGroq120bLiveExecutionAcceptedModelRecord;

export type CodexForgeGroqLiveExecutionAcceptedModels = readonly [
  CodexForgeGroq20bLiveExecutionAcceptedModelRecord,
  CodexForgeGroq120bLiveExecutionAcceptedModelRecord,
];

export type CodexForgeGroqLiveExecutionAcceptanceReference = Readonly<{
  acceptanceVersion: typeof CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_VERSION;
  acceptanceId: typeof CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_ID;
  acceptedOn: typeof CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTED_ON;
  acceptanceCheckpointCommit: typeof CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_CHECKPOINT;
}>;

export type CodexForgeGroqLiveExecutionAcceptanceRecord = Readonly<{
  acceptanceVersion: typeof CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_VERSION;
  acceptanceId: typeof CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_ID;
  acceptedOn: typeof CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTED_ON;
  acceptanceCheckpointCommit: typeof CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_CHECKPOINT;
  providerId: CodexForgeGroqProviderId;
  serverMode: CodexForgeGroqServerMode;
  verificationMode: CodexForgeGroqVerificationMode;
  executionAdmissionState: CodexForgeGroqExecutionAdmissionState;
  admittedExecutionEnvelope: CodexForgeGroqExecutionEnvelope;
  requiredOperatorAcknowledgements: readonly CodexForgeGroqRequiredOperatorAcknowledgement[];
  acceptedModels: CodexForgeGroqLiveExecutionAcceptedModels;
  manualProviderSelectionUsed: true;
  exactModelSelectionUsed: true;
  genericManualApprovalRecorded: true;
  cloudTransferAcknowledgementRecorded: true;
  cloudExecutionAcknowledgementRecorded: true;
  exactApprovedPromptsUsed: true;
  exactProviderModelBindingsPersisted: true;
  exactVisibleOutputsAndHashesPersisted: true;
  successfulAuditSequenceState: CodexForgeGroqSuccessfulAuditSequenceState;
  persistedErrorState: CodexForgeGroqPersistedErrorState;
  credentialStored: false;
  automaticRoutingUsed: false;
  retryUsed: false;
  fallbackUsed: false;
  modelSubstitutionUsed: false;
  providerRequestPerformedDuringVerification: false;
}>;

export type CodexForgeGroqQualificationModelRecord = Readonly<{
  modelId: CodexForgeGroqModelId;
  modelKey: CodexForgeGroqModelKey;
  transportQualificationState: CodexForgeGroqTransportQualificationState;
  manualPrivateAlphaExecutionAdmissionState: CodexForgeGroqManualPrivateAlphaExecutionAdmissionState;
  routingState: CodexForgeGroqRoutingState;
  automaticRoutingState: CodexForgeGroqAutomaticRoutingState;
  accountTierState: CodexForgeGroqAccountTierState;
  dataBoundary: CodexForgeGroqDataBoundary;
  capabilities: readonly CodexForgeGroqCapability[];
  transportLiveVerifiedOn: string;
  operatorTierConfirmedOn: string;
  manualPrivateAlphaExecutionAcceptedOn: string;
  providerReportedContextWindowTokens: number;
  providerReportedMaximumOutputTokens: number;
  admittedMaximumOutputTokens: typeof CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS;
  admittedExecutionEnvelope: CodexForgeGroqExecutionEnvelope;
  liveExecutionAcceptanceId: typeof CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_ID;
  evidence: readonly string[];
}>;

export type CodexForgeGroqQualificationRecord = Readonly<{
  qualificationVersion: typeof CODEXFORGE_GROQ_QUALIFICATION_VERSION;
  providerId: CodexForgeGroqProviderId;
  providerLabel: string;
  providerTransportQualificationState: CodexForgeGroqTransportQualificationState;
  manualPrivateAlphaExecutionAdmissionState: CodexForgeGroqManualPrivateAlphaExecutionAdmissionState;
  productionRoutingState: CodexForgeGroqRoutingState;
  automaticRoutingState: CodexForgeGroqAutomaticRoutingState;
  liveExecutionAcceptance: CodexForgeGroqLiveExecutionAcceptanceReference;
  requiredOperatorAcknowledgements: readonly CodexForgeGroqRequiredOperatorAcknowledgement[];
  paidExecutionEnabled: false;
  accountTierRevalidationRequired: true;
  models: readonly CodexForgeGroqQualificationModelRecord[];
  policyStatements: readonly string[];
}>;
