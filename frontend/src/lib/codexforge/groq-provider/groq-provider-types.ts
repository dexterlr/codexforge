export const CODEXFORGE_GROQ_PROVIDER_ID = "groq-cloud" as const;

export const CODEXFORGE_GROQ_MODEL_IDS = [
  "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
] as const;

export const CODEXFORGE_GROQ_QUALIFICATION_VERSION =
  "codexforge-groq-qualification-v1" as const;

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

export type CodexForgeGroqQualificationState = "live-verified";

export type CodexForgeGroqRoutingState = "manual-only";

export type CodexForgeGroqAccountTierState = "operator-confirmed-free";

export type CodexForgeGroqDataBoundary = "cloud-provider";

export type CodexForgeGroqCapability = "text-generation";

export type CodexForgeGroqQualificationModelRecord = Readonly<{
  modelId: CodexForgeGroqModelId;
  qualificationState: CodexForgeGroqQualificationState;
  routingState: CodexForgeGroqRoutingState;
  accountTierState: CodexForgeGroqAccountTierState;
  dataBoundary: CodexForgeGroqDataBoundary;
  capabilities: readonly CodexForgeGroqCapability[];
  liveVerifiedOn: string;
  operatorTierConfirmedOn: string;
  providerReportedContextWindowTokens: number;
  providerReportedMaximumOutputTokens: number;
  approvedMaximumOutputTokens: number;
  evidence: readonly string[];
}>;

export type CodexForgeGroqQualificationRecord = Readonly<{
  qualificationVersion: typeof CODEXFORGE_GROQ_QUALIFICATION_VERSION;
  providerId: CodexForgeGroqProviderId;
  providerLabel: string;
  adapterState: CodexForgeGroqQualificationState;
  productionRoutingState: CodexForgeGroqRoutingState;
  models: readonly CodexForgeGroqQualificationModelRecord[];
  policyStatements: readonly string[];
}>;
