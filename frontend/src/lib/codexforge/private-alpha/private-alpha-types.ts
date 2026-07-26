export const PRIVATE_ALPHA_RECORD_VERSION = 1 as const;

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
] as const;

export const PRIVATE_ALPHA_RETENTION_MODES = ["local-private-alpha"] as const;

export const PRIVATE_ALPHA_EXECUTION_MODES = [
  "locked-until-provider-slice",
  "manual-approved-local-provider",
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

const PRIVATE_ALPHA_PERSISTED_EXECUTION_ERROR_CODES = [
  "kill_switch_blocked",
  "ollama_unavailable",
  "ollama_model_missing",
  "ollama_timeout",
  "ollama_http_error",
  "ollama_malformed_response",
  "ollama_empty_response",
  "ollama_output_too_large",
] as const;

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
  (typeof PRIVATE_ALPHA_PERSISTED_EXECUTION_ERROR_CODES)[number];
export type PrivateAlphaProviderErrorCode =
  (typeof PRIVATE_ALPHA_EXECUTION_ERROR_CODES)[number];
export type PrivateAlphaAuditActor = "local-operator" | "system";
export type PrivateAlphaStatusMode =
  | "private-alpha-foundation"
  | "private-alpha-local-ollama";

export type PrivateAlphaCreateRunInput = Readonly<{
  requestText: string;
  capability: PrivateAlphaCapability;
  modelPreferenceLabel: string | null;
  maximumOutputTokens: number;
}>;

export type PrivateAlphaApprovalInput = Readonly<{
  approvalScopeHash: string;
  approved: true;
  acknowledgement: string | true;
  expectedRevision: number;
}>;

export type PrivateAlphaExecuteInput = Readonly<{
  execute: true;
  acknowledgement: true;
  approvalScopeHash: string;
  expectedRevision: number;
}>;

export type PrivateAlphaCancellationInput = Readonly<{
  expectedRevision: number;
  reason: string;
}>;

export type PrivateAlphaRunRequest = Readonly<{
  normalizedRequestText: string;
  redactedPreview: string;
  capability: PrivateAlphaCapability;
  providerPreference: PrivateAlphaProviderPreference;
  modelPreferenceLabel: string | null;
  maximumOutputTokens: number;
  retentionMode: PrivateAlphaRetentionMode;
  executionMode: PrivateAlphaExecutionMode;
}>;

export type PrivateAlphaApprovalScope = Readonly<{
  runId: string;
  capability: PrivateAlphaCapability;
  normalizedRequestHash: string;
  providerPreference: PrivateAlphaProviderPreference;
  modelPreferenceLabel: string | null;
  maximumOutputTokens: number;
  retentionMode: PrivateAlphaRetentionMode;
  executionMode: PrivateAlphaExecutionMode;
}>;

export type PrivateAlphaApprovalRecord = Readonly<{
  approvalId: string;
  approvedAt: string;
  actor: "local-operator";
  approvalScopeHash: string;
  acknowledgement: string | true;
  previousRevision: number;
  resultingRevision: number;
  executionAvailabilityStatement: string;
}>;

export type PrivateAlphaCancellationRecord = Readonly<{
  cancellationId: string;
  canceledAt: string;
  actor: "local-operator";
  reason: string;
  previousRevision: number;
  resultingRevision: number;
}>;

export type PrivateAlphaExecutionRecord = Readonly<{
  executionId: string;
  status: PrivateAlphaExecutionStatus;
  idempotencyKeyHash: string;
  provider: "ollama-local";
  model: "gpt-oss:20b";
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
  errorCode: PrivateAlphaExecutionErrorCode | null;
  safeErrorMessage: string | null;
}>;

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

export type PrivateAlphaRunRecord = Readonly<{
  version: typeof PRIVATE_ALPHA_RECORD_VERSION;
  runId: string;
  createdAt: string;
  updatedAt: string;
  state: PrivateAlphaRunState;
  revision: number;
  idempotencyKeyHash: string;
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
  approvalRecording: "enabled";
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
  errorCode: PrivateAlphaExecutionErrorCode | null;
  safeErrorMessage: string | null;
}>;
