export const PRIVATE_ALPHA_RECORD_VERSION = 1 as const;
export const PRIVATE_ALPHA_APPROVAL_BINDING_VERSION = 1 as const;
export const PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION = 1 as const;
export const PRIVATE_ALPHA_IDEMPOTENCY_PROTOCOL_VERSION = 1 as const;
export const PRIVATE_ALPHA_IDEMPOTENCY_PUBLICATION_PHASES = [
  "reserved",
  "published",
] as const;

export const PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY =
  "ollama-local::gpt-oss:20b" as const;
export const PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY =
  "groq-cloud::openai/gpt-oss-20b" as const;
export const PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY =
  "groq-cloud::openai/gpt-oss-120b" as const;
export const PRIVATE_ALPHA_RUNTIME_MODEL_KEYS = [
  PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
] as const;

export const PRIVATE_ALPHA_RUN_STATES = [
  "awaiting_approval",
  "approved",
  "executing",
  "succeeded",
  "failed",
  "canceled",
  "blocked",
] as const;

export const PRIVATE_ALPHA_EXECUTION_STATUSES = [
  "executing",
  "succeeded",
  "failed",
  "blocked",
] as const;

export const PRIVATE_ALPHA_CAPABILITIES = ["text", "code"] as const;

export const PRIVATE_ALPHA_AUDIT_EVENT_TYPES = [
  "run.created",
  "approval.requested",
  "approval.granted",
  "execution.started",
  "execution.succeeded",
  "execution.failed",
  "execution.blocked",
  "run.canceled",
  "run.blocked",
] as const;

export const PRIVATE_ALPHA_KILL_SWITCH_SOURCES = [
  "environment",
  "file",
] as const;

export const PRIVATE_ALPHA_PROVIDER_PREFERENCES = [
  "auto",
  "ollama-local",
  "groq-cloud",
] as const;

export const PRIVATE_ALPHA_RETENTION_MODES = ["local-private-alpha"] as const;

export const PRIVATE_ALPHA_EXECUTION_MODES = [
  "locked-until-provider-slice",
  "manual-approved-local-provider",
  "manual-approved-cloud-provider-locked",
] as const;

export const PRIVATE_ALPHA_EXECUTION_ERROR_CODES = [
  "kill_switch_blocked",
  "ollama_unavailable",
  "ollama_model_missing",
  "ollama_timeout",
  "ollama_http_error",
  "ollama_malformed_response",
  "ollama_empty_response",
  "ollama_output_too_large",
] as const;

const PRIVATE_ALPHA_PERSISTED_EXECUTION_ERROR_CODES = [
  "execution_interrupted",
  "chat_stop_prevented_execution",
  "kill_switch_blocked",
  "ollama_unavailable",
  "ollama_model_missing",
  "ollama_timeout",
  "ollama_http_error",
  "ollama_malformed_response",
  "ollama_empty_response",
  "ollama_output_too_large",
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

export type PrivateAlphaApprovalBindingVersion =
  typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
export type PrivateAlphaIdempotencyPublicationPhase =
  (typeof PRIVATE_ALPHA_IDEMPOTENCY_PUBLICATION_PHASES)[number];
export type PrivateAlphaRuntimeModelKey =
  (typeof PRIVATE_ALPHA_RUNTIME_MODEL_KEYS)[number];
export type PrivateAlphaRunState = (typeof PRIVATE_ALPHA_RUN_STATES)[number];
export type PrivateAlphaExecutionStatus =
  (typeof PRIVATE_ALPHA_EXECUTION_STATUSES)[number];
export type PrivateAlphaCapability = (typeof PRIVATE_ALPHA_CAPABILITIES)[number];
export type PrivateAlphaAuditEventType =
  (typeof PRIVATE_ALPHA_AUDIT_EVENT_TYPES)[number];
export type PrivateAlphaKillSwitchSource =
  (typeof PRIVATE_ALPHA_KILL_SWITCH_SOURCES)[number];
export type PrivateAlphaProviderPreference =
  (typeof PRIVATE_ALPHA_PROVIDER_PREFERENCES)[number];
export type PrivateAlphaRetentionMode =
  (typeof PRIVATE_ALPHA_RETENTION_MODES)[number];
export type PrivateAlphaExecutionMode =
  (typeof PRIVATE_ALPHA_EXECUTION_MODES)[number];
export type PrivateAlphaExecutionErrorCode =
  (typeof PRIVATE_ALPHA_EXECUTION_ERROR_CODES)[number];
export type PrivateAlphaPersistedExecutionErrorCode =
  (typeof PRIVATE_ALPHA_PERSISTED_EXECUTION_ERROR_CODES)[number];
export type PrivateAlphaProviderErrorCode = Exclude<
  PrivateAlphaPersistedExecutionErrorCode,
  "execution_interrupted" | "chat_stop_prevented_execution" | "kill_switch_blocked"
>;
export type PrivateAlphaAuditActor = "local-operator" | "system";
export type PrivateAlphaStatusMode =
  | "private-alpha-foundation"
  | "private-alpha-local-ollama";
export type PrivateAlphaBoundDataBoundary =
  | "local-machine"
  | "cloud-provider";
export type PrivateAlphaCloudDataTransferRequirement =
  | "not-required"
  | "explicit-operator-acknowledgement-required";
export type PrivateAlphaCloudDataTransferAcknowledgement =
  | "not-required"
  | "granted-for-approved-scope";
export type PrivateAlphaCloudExecutionAcknowledgement =
  "granted-for-approved-scope-execution";
export type PrivateAlphaGroqFreeTierExecutionConfirmation =
  "operator-confirmed-current-free-tier";

export type PrivateAlphaCreateRunInput = Readonly<{
  requestText: string;
  capability: PrivateAlphaCapability;
  modelPreferenceLabel: string | null;
  maximumOutputTokens: number;
  modelKey?: PrivateAlphaRuntimeModelKey;
}>;

export type PrivateAlphaApprovalInput = Readonly<{
  approvalScopeHash: string;
  approved: true;
  acknowledgement: string | true;
  expectedRevision: number;
  cloudDataTransferAcknowledgement?: true;
}>;

export type PrivateAlphaExecuteInput = Readonly<{
  execute: true;
  acknowledgement: true;
  approvalScopeHash: string;
  expectedRevision: number;
  cloudExecutionAcknowledgement?: true;
  groqFreeTierExecutionConfirmation?: true;
}>;

export type PrivateAlphaCancellationInput = Readonly<{
  expectedRevision: number;
  reason: string;
}>;

type PrivateAlphaRunRequestCommon = Readonly<{
  normalizedRequestText: string;
  redactedPreview: string;
  capability: PrivateAlphaCapability;
  maximumOutputTokens: number;
  retentionMode: PrivateAlphaRetentionMode;
}>;

type PrivateAlphaApprovalScopeCommon = Readonly<{
  runId: string;
  capability: PrivateAlphaCapability;
  normalizedRequestHash: string;
  maximumOutputTokens: number;
  retentionMode: PrivateAlphaRetentionMode;
}>;

export type PrivateAlphaLegacyRunRequest = PrivateAlphaRunRequestCommon &
  Readonly<{
    providerPreference: "auto";
    modelPreferenceLabel: string | null;
    executionMode: "locked-until-provider-slice";
  }>;

export type PrivateAlphaUnboundLocalRunRequest = PrivateAlphaRunRequestCommon &
  Readonly<{
    providerPreference: "ollama-local";
    modelPreferenceLabel: "gpt-oss:20b";
    executionMode: "manual-approved-local-provider";
  }>;

export type PrivateAlphaBoundLocalRunRequest = PrivateAlphaRunRequestCommon &
  Readonly<{
    providerPreference: "ollama-local";
    modelPreferenceLabel: "gpt-oss:20b";
    executionMode: "manual-approved-local-provider";
    bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
    modelKey: typeof PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY;
    dataBoundary: "local-machine";
    cloudDataTransferRequirement: "not-required";
  }>;

export type PrivateAlphaBoundGroq20bRunRequest = PrivateAlphaRunRequestCommon &
  Readonly<{
    capability: "text";
    providerPreference: "groq-cloud";
    modelPreferenceLabel: "openai/gpt-oss-20b";
    executionMode: "manual-approved-cloud-provider-locked";
    bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
    modelKey: typeof PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY;
    dataBoundary: "cloud-provider";
    cloudDataTransferRequirement: "explicit-operator-acknowledgement-required";
  }>;

export type PrivateAlphaBoundGroq120bRunRequest = PrivateAlphaRunRequestCommon &
  Readonly<{
    capability: "text";
    providerPreference: "groq-cloud";
    modelPreferenceLabel: "openai/gpt-oss-120b";
    executionMode: "manual-approved-cloud-provider-locked";
    bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
    modelKey: typeof PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY;
    dataBoundary: "cloud-provider";
    cloudDataTransferRequirement: "explicit-operator-acknowledgement-required";
  }>;

export type PrivateAlphaRunRequest =
  | PrivateAlphaLegacyRunRequest
  | PrivateAlphaUnboundLocalRunRequest
  | PrivateAlphaBoundLocalRunRequest
  | PrivateAlphaBoundGroq20bRunRequest
  | PrivateAlphaBoundGroq120bRunRequest;

export type PrivateAlphaLegacyApprovalScope = PrivateAlphaApprovalScopeCommon &
  Readonly<{
    providerPreference: "auto";
    modelPreferenceLabel: string | null;
    executionMode: "locked-until-provider-slice";
  }>;

export type PrivateAlphaUnboundLocalApprovalScope = PrivateAlphaApprovalScopeCommon &
  Readonly<{
    providerPreference: "ollama-local";
    modelPreferenceLabel: "gpt-oss:20b";
    executionMode: "manual-approved-local-provider";
  }>;

export type PrivateAlphaBoundLocalApprovalScope = PrivateAlphaApprovalScopeCommon &
  Readonly<{
    providerPreference: "ollama-local";
    modelPreferenceLabel: "gpt-oss:20b";
    executionMode: "manual-approved-local-provider";
    bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
    modelKey: typeof PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY;
    dataBoundary: "local-machine";
    cloudDataTransferRequirement: "not-required";
  }>;

export type PrivateAlphaBoundGroq20bApprovalScope =
  PrivateAlphaApprovalScopeCommon &
    Readonly<{
      capability: "text";
      providerPreference: "groq-cloud";
      modelPreferenceLabel: "openai/gpt-oss-20b";
      executionMode: "manual-approved-cloud-provider-locked";
      bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
      modelKey: typeof PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY;
      dataBoundary: "cloud-provider";
      cloudDataTransferRequirement: "explicit-operator-acknowledgement-required";
    }>;

export type PrivateAlphaBoundGroq120bApprovalScope =
  PrivateAlphaApprovalScopeCommon &
    Readonly<{
      capability: "text";
      providerPreference: "groq-cloud";
      modelPreferenceLabel: "openai/gpt-oss-120b";
      executionMode: "manual-approved-cloud-provider-locked";
      bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
      modelKey: typeof PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY;
      dataBoundary: "cloud-provider";
      cloudDataTransferRequirement: "explicit-operator-acknowledgement-required";
    }>;

export type PrivateAlphaApprovalScope =
  | PrivateAlphaLegacyApprovalScope
  | PrivateAlphaUnboundLocalApprovalScope
  | PrivateAlphaBoundLocalApprovalScope
  | PrivateAlphaBoundGroq20bApprovalScope
  | PrivateAlphaBoundGroq120bApprovalScope;

type PrivateAlphaApprovalRecordCommon = Readonly<{
  approvalId: string;
  approvedAt: string;
  actor: "local-operator";
  approvalScopeHash: string;
  acknowledgement: string | true;
  previousRevision: number;
  resultingRevision: number;
  executionAvailabilityStatement: string;
}>;

export type PrivateAlphaHistoricalApprovalRecord =
  PrivateAlphaApprovalRecordCommon;

export type PrivateAlphaBoundApprovalRecord = PrivateAlphaApprovalRecordCommon &
  Readonly<{
    bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
    cloudDataTransferAcknowledgement: PrivateAlphaCloudDataTransferAcknowledgement;
  }>;

export type PrivateAlphaApprovalRecord =
  | PrivateAlphaHistoricalApprovalRecord
  | PrivateAlphaBoundApprovalRecord;

export type PrivateAlphaCancellationRecord = Readonly<{
  cancellationId: string;
  canceledAt: string;
  actor: "local-operator";
  reason: string;
  previousRevision: number;
  resultingRevision: number;
}>;

type PrivateAlphaLocalExecutionErrorCode =
  | "execution_interrupted"
  | "chat_stop_prevented_execution"
  | "kill_switch_blocked"
  | "ollama_unavailable"
  | "ollama_model_missing"
  | "ollama_timeout"
  | "ollama_http_error"
  | "ollama_malformed_response"
  | "ollama_empty_response"
  | "ollama_output_too_large";

type PrivateAlphaGroqExecutionErrorCode =
  | "execution_interrupted"
  | "kill_switch_blocked"
  | "groq_credential_missing"
  | "groq_authentication_failed"
  | "groq_rate_limited"
  | "groq_quota_exhausted"
  | "groq_unavailable"
  | "groq_model_unavailable"
  | "groq_timeout"
  | "groq_http_error"
  | "groq_malformed_response"
  | "groq_empty_response"
  | "groq_output_too_large";

type PrivateAlphaExecutionRecordCommon = Readonly<{
  executionId: string;
  status: PrivateAlphaExecutionStatus;
  idempotencyKeyHash: string;
  approvalScopeHash: string;
  startedAt: string;
  completedAt: string | null;
  previousRevision: number;
  runningRevision: number | null;
  resultingRevision: number;
  outputText: string | null;
  outputSha256: string | null;
  doneReason: string | null;
  totalDurationNanoseconds: number | null;
  loadDurationNanoseconds: number | null;
  promptEvalCount: number | null;
  evalCount: number | null;
  responseStatus: 200 | 409 | 500 | 503 | 504 | null;
}>;

export type PrivateAlphaLocalExecutionRecord = PrivateAlphaExecutionRecordCommon &
  Readonly<{
    provider: "ollama-local";
    model: "gpt-oss:20b";
    errorCode: PrivateAlphaLocalExecutionErrorCode | null;
    safeErrorMessage: string | null;
  }>;

export type PrivateAlphaGroq20bExecutionRecord =
  PrivateAlphaExecutionRecordCommon &
    Readonly<{
      provider: "groq-cloud";
      model: "openai/gpt-oss-20b";
      bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
      modelKey: typeof PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY;
      dataBoundary: "cloud-provider";
      cloudExecutionAcknowledgement: PrivateAlphaCloudExecutionAcknowledgement;
      groqFreeTierExecutionConfirmation?: PrivateAlphaGroqFreeTierExecutionConfirmation;
      errorCode: PrivateAlphaGroqExecutionErrorCode | null;
      safeErrorMessage: string | null;
    }>;

export type PrivateAlphaGroq120bExecutionRecord =
  PrivateAlphaExecutionRecordCommon &
    Readonly<{
      provider: "groq-cloud";
      model: "openai/gpt-oss-120b";
      bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
      modelKey: typeof PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY;
      dataBoundary: "cloud-provider";
      cloudExecutionAcknowledgement: PrivateAlphaCloudExecutionAcknowledgement;
      groqFreeTierExecutionConfirmation?: PrivateAlphaGroqFreeTierExecutionConfirmation;
      errorCode: PrivateAlphaGroqExecutionErrorCode | null;
      safeErrorMessage: string | null;
    }>;

export type PrivateAlphaExecutionRecord =
  | PrivateAlphaLocalExecutionRecord
  | PrivateAlphaGroq20bExecutionRecord
  | PrivateAlphaGroq120bExecutionRecord;

export type PrivateAlphaAuditEvent = Readonly<{
  eventId: string;
  eventType: PrivateAlphaAuditEventType;
  occurredAt: string;
  actor: PrivateAlphaAuditActor;
  runId: string;
  previousState: PrivateAlphaRunState | null;
  resultingState: PrivateAlphaRunState;
  revision: number;
  summary: string;
}>;

export type PrivateAlphaGeneralRunOwnership = Readonly<{
  kind: "general";
  protocolVersion: typeof PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION;
}>;

export type PrivateAlphaCreatorRunOwnership = Readonly<{
  kind: "creator";
  protocolVersion: typeof PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION;
  projectId: string;
  purpose: "generation" | "repair";
  bindingId: string;
}>;

export type PrivateAlphaChatRunOwnership = Readonly<{
  kind: "chat";
  protocolVersion: typeof PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION;
  conversationId: string;
  turnId: string;
  bindingId: string;
}>;

export type PrivateAlphaRunOwnership =
  | PrivateAlphaGeneralRunOwnership
  | PrivateAlphaCreatorRunOwnership
  | PrivateAlphaChatRunOwnership
  | null;

export type PrivateAlphaRunRecord = Readonly<{
  version: typeof PRIVATE_ALPHA_RECORD_VERSION;
  runId: string;
  createdAt: string;
  updatedAt: string;
  state: PrivateAlphaRunState;
  revision: number;
  idempotencyKeyHash: string;
  ownership: PrivateAlphaRunOwnership;
  request: PrivateAlphaRunRequest;
  approvalScope: PrivateAlphaApprovalScope;
  approvalScopeHash: string;
  approval: PrivateAlphaApprovalRecord | null;
  cancellation: PrivateAlphaCancellationRecord | null;
  execution: PrivateAlphaExecutionRecord | null;
  auditEvents: readonly PrivateAlphaAuditEvent[];
}>;

export type PrivateAlphaRunSummary = Readonly<{
  runId: string;
  createdAt: string;
  updatedAt: string;
  state: PrivateAlphaRunState;
  revision: number;
  capability: PrivateAlphaCapability;
  providerPreference: PrivateAlphaProviderPreference;
  modelPreferenceLabel: string | null;
  maximumOutputTokens: number;
  redactedPreview: string;
  approvalScopeHash: string;
}>;

export type PrivateAlphaStatus = Readonly<{
  mode: PrivateAlphaStatusMode;
  persistence: "local-file-backed";
  approvalRecording: "enabled" | "unavailable";
  providerExecution: "unavailable" | "local-ollama";
  providerLabel: "Local Ollama";
  configuredModel: "gpt-oss:20b";
  providerAvailable: boolean;
  modelAvailable: boolean;
  executionAllowed: boolean;
  killSwitchEngaged: boolean;
  killSwitchSources: readonly PrivateAlphaKillSwitchSource[];
  dataRootLabel: string;
}>;

export type PrivateAlphaCreateRunResult = Readonly<{
  created: boolean;
  run: PrivateAlphaRunRecord;
}>;

export type PrivateAlphaExecuteRunResult = Readonly<{
  replayed: boolean;
  run: PrivateAlphaRunRecord;
  responseStatus: 200 | 409 | 500 | 503 | 504;
  errorCode: PrivateAlphaPersistedExecutionErrorCode | null;
  safeErrorMessage: string | null;
}>;
