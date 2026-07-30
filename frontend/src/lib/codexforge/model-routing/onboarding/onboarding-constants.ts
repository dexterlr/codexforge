export const CODEXFORGE_ONBOARDING_SCHEMA_VERSION =
  "codexforge-free-local-onboarding-v1" as const;

export const CODEXFORGE_ONBOARDING_VALIDATION_POLICY_VERSION =
  "codexforge-free-local-onboarding-validation-v1" as const;

export const CODEXFORGE_ONBOARDING_CANONICALIZATION_VERSION =
  "codexforge-onboarding-canonical-json-v1" as const;

export const CODEXFORGE_ONBOARDING_REJECTION_VERSION =
  "codexforge-onboarding-rejection-v1" as const;

export const CODEXFORGE_ONBOARDING_DIGEST_ALGORITHM = "sha256" as const;

export const CODEXFORGE_ONBOARDING_PROVIDER_PROTOCOLS = [
  "ollama-native-http-v1",
  "openai-compatible-chat-completions-v1",
] as const;

export const CODEXFORGE_ONBOARDING_LOCALITIES = ["local", "cloud"] as const;

export const CODEXFORGE_ONBOARDING_DATA_BOUNDARIES = [
  "local-machine",
  "cloud-provider",
] as const;

export const CODEXFORGE_ONBOARDING_CREDENTIAL_MODES = [
  "none",
  "server-environment-only",
] as const;

export const CODEXFORGE_ONBOARDING_COST_CLASSIFICATIONS = [
  "local-no-provider-token-charge",
  "free-tier",
  "trial-credit",
  "billing-enabled",
  "paid",
  "unknown",
  "unverifiable",
] as const;

export const CODEXFORGE_ONBOARDING_MODALITIES = [
  "text",
  "image",
  "audio",
  "video",
] as const;

export const CODEXFORGE_ONBOARDING_V1_SUPPORTED_CAPABILITIES = [
  "text-generation",
] as const;

export const CODEXFORGE_ONBOARDING_V1_SUPPORTED_INPUT_MODALITIES = [
  "text",
] as const;

export const CODEXFORGE_ONBOARDING_V1_SUPPORTED_OUTPUT_MODALITIES = [
  "text",
] as const;

export const CODEXFORGE_ONBOARDING_MAXIMUM_LOCAL_OUTPUT_TOKENS = 4096 as const;
export const CODEXFORGE_ONBOARDING_MAXIMUM_CLOUD_OUTPUT_TOKENS = 512 as const;

export const CODEXFORGE_ONBOARDING_KILL_SWITCH_CHECKPOINTS = [
  "before-provider-adapter-resolution-or-credential-work",
  "immediately-before-provider-generation",
] as const;

export const CODEXFORGE_ONBOARDING_CLOUD_TRANSFER_NOT_REQUIRED =
  "not-required" as const;
export const CODEXFORGE_ONBOARDING_CLOUD_TRANSFER_ACKNOWLEDGEMENT_REQUIRED =
  "explicit-operator-acknowledgement-required" as const;
export const CODEXFORGE_ONBOARDING_CLOUD_TRANSFER_ACKNOWLEDGEMENT =
  "granted-for-approved-scope" as const;
export const CODEXFORGE_ONBOARDING_CLOUD_EXECUTION_ACKNOWLEDGEMENT =
  "granted-for-approved-scope-execution" as const;
export const CODEXFORGE_ONBOARDING_FREE_TIER_EXECUTION_CONFIRMATION =
  "operator-confirmed-current-free-tier" as const;

export const CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS = Object.freeze({
  maximumNestingDepth: 12,
  maximumVisitedValues: 4096,
  maximumObjectKeys: 128,
  maximumArrayItems: 256,
  maximumStringLength: 8192,
  maximumCanonicalUtf8Bytes: 262_144,
  maximumReturnedIssues: 64,
} as const);

export const CODEXFORGE_ONBOARDING_REJECTION_CODES = [
  "input-not-plain-data",
  "unsupported-schema-version",
  "unknown-field",
  "maximum-nesting-depth-exceeded",
  "maximum-visited-values-exceeded",
  "maximum-object-keys-exceeded",
  "maximum-array-items-exceeded",
  "maximum-string-length-exceeded",
  "maximum-canonical-payload-exceeded",
  "accessor-property-rejected",
  "function-value-rejected",
  "symbol-value-rejected",
  "symbol-key-rejected",
  "cycle-detected",
  "shared-reference-detected",
  "exotic-prototype-rejected",
  "sparse-array-rejected",
  "content-digest-mismatch",
  "secret-material-detected",
  "invalid-provider-key",
  "invalid-model-id",
  "duplicate-provider-key",
  "duplicate-model-key",
  "reserved-provider-key",
  "reserved-model-key",
  "provider-key-mismatch",
  "model-key-mismatch",
  "model-provider-mismatch",
  "unknown-adapter-identity",
  "adapter-identity-mismatch",
  "unsupported-provider-protocol",
  "locality-boundary-mismatch",
  "authority-boundary-mismatch",
  "credential-mode-mismatch",
  "unsupported-cost-class",
  "billing-enabled",
  "trial-credit-only",
  "free-tier-not-verified",
  "missing-evidence-reference",
  "stale-evidence-reference",
  "evidence-reference-mismatch",
  "evidence-scope-mismatch",
  "evidence-version-mismatch",
  "unsupported-capability",
  "unsupported-input-modality",
  "unsupported-output-modality",
  "invalid-context-window",
  "output-envelope-escalation",
  "provider-qualification-prerequisite-missing",
  "model-qualification-prerequisite-missing",
  "live-acceptance-prerequisite-missing",
  "manual-admission-prerequisite-missing",
  "automatic-admission-rejected",
  "admission-inheritance-forbidden",
  "manual-approval-requirement-missing",
  "exact-model-approval-binding-missing",
  "cloud-transfer-acknowledgement-missing",
  "cloud-execution-acknowledgement-missing",
  "free-tier-execution-confirmation-missing",
  "kill-switch-posture-invalid",
  "attempt-posture-invalid",
  "retry-enabled",
  "fallback-enabled",
  "rerouting-enabled",
  "provider-substitution-enabled",
  "model-substitution-enabled",
  "automatic-model-size-switching-enabled",
  "automatic-model-download-enabled",
  "paid-execution-enabled",
  "activation-state-invalid",
  "rejection-limit-reached",
] as const;
