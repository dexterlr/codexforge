export const PRIVATE_ALPHA_RECORD_VERSION = 1 as const;

export const PRIVATE_ALPHA_RUN_STATES = [
  "awaiting_approval",
  "approved",
  "canceled",
  "blocked",
] as const;

export const PRIVATE_ALPHA_CAPABILITIES = ["text", "code"] as const;

export const PRIVATE_ALPHA_AUDIT_EVENT_TYPES = [
  "run.created",
  "approval.requested",
  "approval.granted",
  "run.canceled",
  "run.blocked",
] as const;

export const PRIVATE_ALPHA_KILL_SWITCH_SOURCES = [
  "environment",
  "file",
] as const;

export type PrivateAlphaRunState = (typeof PRIVATE_ALPHA_RUN_STATES)[number];
export type PrivateAlphaCapability = (typeof PRIVATE_ALPHA_CAPABILITIES)[number];
export type PrivateAlphaAuditEventType =
  (typeof PRIVATE_ALPHA_AUDIT_EVENT_TYPES)[number];
export type PrivateAlphaKillSwitchSource =
  (typeof PRIVATE_ALPHA_KILL_SWITCH_SOURCES)[number];
export type PrivateAlphaProviderPreference = "auto";
export type PrivateAlphaRetentionMode = "local-private-alpha";
export type PrivateAlphaExecutionMode = "locked-until-provider-slice";
export type PrivateAlphaAuditActor = "local-operator" | "system";

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
  mode: "private-alpha-foundation";
  persistence: "local-file-backed";
  approvalRecording: "enabled";
  providerExecution: "unavailable";
  executionAllowed: false;
  killSwitchEngaged: boolean;
  killSwitchSources: readonly PrivateAlphaKillSwitchSource[];
  dataRootLabel: string;
}>;

export type PrivateAlphaCreateRunResult = Readonly<{
  created: boolean;
  run: PrivateAlphaRunRecord;
}>;
