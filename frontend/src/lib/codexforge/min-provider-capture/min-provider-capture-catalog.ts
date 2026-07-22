import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
  type MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord,
  type MinimalProviderDryRunResultCaptureServerRunRecord,
  type ProviderDryRunCapturedFixtureResultOutputRecord,
  type ProviderDryRunExecutionDependencyId,
  type ProviderDryRunAdmissionDependencyId,
  type ProviderDryRunResultCaptureApprovalPreviewRecord,
  type ProviderDryRunResultCaptureAuditPreviewRecord,
  type ProviderDryRunResultCaptureBlockedPersistenceSummaryRecord,
  type ProviderDryRunResultCaptureCapabilityFamilyId,
  type ProviderDryRunResultCaptureCheckRecord,
  type ProviderDryRunResultCaptureCurrentReadiness,
  type ProviderDryRunResultCaptureEnvelopeRecord,
  type ProviderDryRunResultCaptureEvidencePreviewRecord,
  type ProviderDryRunResultCaptureFallbackPosture,
  type ProviderDryRunResultCaptureGateId,
  type ProviderDryRunResultCaptureGateRecord,
  type ProviderDryRunResultCaptureGateSummary,
  type ProviderDryRunResultCaptureInputRecord,
  type ProviderDryRunResultCaptureMode,
  type ProviderDryRunResultCaptureMvpId,
  type ProviderDryRunResultCapturePreviewId,
  type ProviderDryRunResultCapturePreviewPromptReference,
  type ProviderDryRunResultCaptureProviderSlotLabel,
  type ProviderDryRunResultCaptureReadinessId,
  type ProviderDryRunResultCaptureReadinessMatrixRecord,
  type ProviderDryRunResultCaptureReadinessSummary,
  type ProviderDryRunResultCaptureReviewRecoveryChecklist,
  type ProviderDryRunResultCaptureReviewRecoveryNextStatement,
  type ProviderDryRunResultCaptureSlotOrder,
  type ProviderDryRunResultCaptureSummary,
  type ProviderDryRunResultCaptureSafetyGateSummaryRecord,
  type ProviderDryRunCapturedFixtureResponseLabel,
  type ProviderDryRunResultCaptureWorkspaceTarget,
} from "./min-provider-capture-types";

type ProviderDryRunResultCaptureSeed = Readonly<{
  stableId: ProviderDryRunResultCaptureMvpId;
  executionStableId: ProviderDryRunExecutionDependencyId;
  admissionStableId: ProviderDryRunAdmissionDependencyId;
  capabilityFamilyId: ProviderDryRunResultCaptureCapabilityFamilyId;
  capabilityFamily: "text/chat" | "planning/reasoning";
  providerSlotLabel: ProviderDryRunResultCaptureProviderSlotLabel;
  backupProviderSlotLabel: ProviderDryRunResultCaptureProviderSlotLabel;
  localPrivateAlternativeLabel: "local/private text provider dry-run capture slot";
  opaqueCredentialReferenceLabel:
    | "opaque credential reference label / athena dry-run result capture text chat primary"
    | "opaque credential reference label / athena dry-run result capture planning reasoning primary";
  capturedDryRunFixtureResponse: ProviderDryRunCapturedFixtureResponseLabel;
  redactedPromptEnvelopeLabel: string;
  evidenceSummary: readonly string[];
  auditSummary: readonly string[];
  approvalSummary: readonly string[];
}>;

const WORKSPACE_TARGET: ProviderDryRunResultCaptureWorkspaceTarget =
  "Athena Command Center";

const CURRENT_READINESS: ProviderDryRunResultCaptureCurrentReadiness =
  "minimal-provider-dry-run-result-capture-mvp-only / backend-only / dry-run-fixture-capture-only / credential-reference-only / not-live-provider-executing / not persistent";

const CAPTURE_MODE: ProviderDryRunResultCaptureMode =
  "deterministic-fixture-only";

const REVIEW_RECOVERY_NEXT_STATEMENT: ProviderDryRunResultCaptureReviewRecoveryNextStatement =
  "provider adapter dry-run result capture review and recovery preview comes next";

const RETRY_POSTURE: ProviderDryRunResultCaptureFallbackPosture = "disabled";
const FALLBACK_POSTURE: ProviderDryRunResultCaptureFallbackPosture =
  "disabled";

const SUMMARY_LINES = [
  "backend-owned minimal manual-gated provider adapter dry-run result capture MVP only",
  "provider adapter dry-run result capture is backend-only",
  "server-only provider dry-run result capture helper exists",
  "provider dry-run fixture response is captured in memory only",
  "provider dry-run result capture is deterministic fixture-only",
  "provider adapter dry-run result capture is not persistent",
  "live provider execution is blocked",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "backup provider slot is preview-only",
  "local/private alternative is preview-only",
  "provider adapter dry-run result capture is not live provider execution",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "provider response is not received from provider",
  "model output is not generated by provider/model",
  "no prompt sending",
  "no LLM/model calls",
  "no frontend provider call",
  "no frontend fetch/network call",
  "no provider SDK imports",
  "no live provider execution",
  "no plugin execution",
  "no autonomous execution",
  "no live video generation",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no retry execution",
  "no fallback execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no persistent memory",
  "no browser storage",
  "no database writes",
  "no file writes",
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval fixture required",
  "manual confirmation fixture required",
  "kill switch required",
  "audit preview required",
  "opaque credential references only",
  "no plaintext secrets",
  `current readiness is ${CURRENT_READINESS}`,
  "backend-owned minimal manual-gated provider adapter dry-run result capture review and recovery preview next",
] as const;

const GATE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only dry-run result capture module boundary",
  "provider dry-run result capture fixture mode",
  "provider dry-run execution review dependency",
  "provider dry-run execution output dependency",
  "provider dry-run fixture response dependency",
  "credential reference opaque-only mode",
  "deterministic dry-run result capture id",
  "deterministic dry-run execution id",
  "deterministic dry-run admission id",
  "deterministic provider slot id",
  "deterministic credential reference id",
  "deterministic capture digest",
  "supported capability family",
  "selected provider slot preview-only",
  "backup provider slot preview-only",
  "local/private alternative preview-only",
  "dry-run fixture response only",
  "live provider execution blocked",
  "credential value absent",
  "credential value not read",
  "env vars not read",
  "provider key not read",
  "redacted prompt envelope present",
  "prompt not sent",
  "provider SDK not imported",
  "provider response not received from provider",
  "model output not generated by provider/model",
  "manual approval fixture",
  "manual confirmation fixture",
  "in-memory only capture reference",
  "no real approval request",
  "no real approval recording",
  "no approval token issuance",
  "no approval lease issuance",
  "no frontend request",
  "no API route",
  "no fetch/network",
  "no provider SDK import",
  "no live provider execution",
  "no model call",
  "no prompt sending",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database write",
  "no file write",
  "single-run lock preview",
  "idempotency/replay preview",
  "timeout/cancel preview",
  "privacy/redaction preview",
  "kill switch fixture",
] as const;

const READINESS_SUMMARY_LINES = [
  "server-only dry-run result capture helper state",
  "provider dry-run execution review dependency",
  "dry-run result capture input state",
  "dry-run result capture check state",
  "captured fixture result output state",
  "result capture envelope state",
  "evidence preview state",
  "audit preview state",
  "approval preview state",
  "blocked persistence summary state",
  "credential value boundary state",
  "env var boundary state",
  "provider key boundary state",
  "provider SDK boundary state",
  "live provider execution boundary state",
  "prompt boundary state",
  "model boundary state",
  "frontend request boundary state",
  "API route boundary state",
  "queue boundary state",
  "worker boundary state",
  "job boundary state",
  "result persistence boundary state",
  "audit persistence boundary state",
  "approval persistence boundary state",
  "database boundary state",
  "file boundary state",
  `current readiness: ${CURRENT_READINESS}`,
  "next safe action",
] as const;

const NEXT_REVIEW_RECOVERY_CHECKLIST = [
  "Review the deterministic provider dry-run result capture fixture output before adding review and recovery overlays.",
  "Keep provider adapter dry-run result capture backend-only, server-only, deterministic, manual-gated, fixture-only, and in-memory only.",
  "Do not add credential value reads, env var reads, provider key reads, provider SDK imports, provider calls, model calls, or prompt transmission.",
  "Do not add frontend requests, API routes, queue dispatch, worker dispatch, job execution, result persistence, audit persistence, approval persistence, database writes, or file writes.",
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
] as const satisfies ProviderDryRunResultCaptureReviewRecoveryChecklist;

const BLOCKED_PERSISTENCE_TARGETS = [
  "result persistence",
  "audit persistence",
  "approval persistence",
  "database write",
  "file write",
  "queue dispatch",
  "worker dispatch",
  "job execution",
] as const;

const PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS = [
  {
    stableId: "text-chat-provider-dry-run-result-capture",
    executionStableId: "text-chat-provider-dry-run-execution",
    admissionStableId: "text-chat-provider-dry-run-admission",
    capabilityFamilyId: "text-chat",
    capabilityFamily: "text/chat",
    providerSlotLabel: "OpenAI-compatible text provider dry-run capture slot",
    backupProviderSlotLabel:
      "Anthropic-compatible text provider dry-run capture slot",
    localPrivateAlternativeLabel:
      "local/private text provider dry-run capture slot",
    opaqueCredentialReferenceLabel:
      "opaque credential reference label / athena dry-run result capture text chat primary",
    capturedDryRunFixtureResponse:
      "deterministic dry-run fixture response / athena text chat result capture preview",
    redactedPromptEnvelopeLabel:
      "redacted prompt envelope fixture / athena text chat result capture",
    evidenceSummary: [
      "Execution review dependency is preview-only.",
      "Execution output dependency is deterministic fixture-only.",
      "Fixture response is captured in memory only.",
      "Provider/model output remains blocked and not generated.",
    ],
    auditSummary: [
      "Audit reference is preview-only / not persisted.",
      "Credential reference stays opaque label only.",
      "No env var read, provider key read, or provider SDK import exists.",
      "No queue, worker, job, database, or file persistence exists.",
    ],
    approvalSummary: [
      "Approval fixture is preview-only.",
      "Manual confirmation fixture is preview-only.",
      "No real approval request or recording exists.",
      "Approval token and approval lease remain absent.",
    ],
  },
  {
    stableId: "planning-reasoning-provider-dry-run-result-capture",
    executionStableId: "planning-reasoning-provider-dry-run-execution",
    admissionStableId: "planning-reasoning-provider-dry-run-admission",
    capabilityFamilyId: "planning-reasoning",
    capabilityFamily: "planning/reasoning",
    providerSlotLabel: "Gemini-compatible text provider dry-run capture slot",
    backupProviderSlotLabel: "fallback disabled dry-run capture slot",
    localPrivateAlternativeLabel:
      "local/private text provider dry-run capture slot",
    opaqueCredentialReferenceLabel:
      "opaque credential reference label / athena dry-run result capture planning reasoning primary",
    capturedDryRunFixtureResponse:
      "deterministic dry-run fixture response / athena planning reasoning result capture preview",
    redactedPromptEnvelopeLabel:
      "redacted prompt envelope fixture / athena planning reasoning result capture",
    evidenceSummary: [
      "Execution review dependency is preview-only.",
      "Execution output dependency is deterministic fixture-only.",
      "Planning/reasoning fixture response is captured in memory only.",
      "Provider/model output remains blocked and not generated.",
    ],
    auditSummary: [
      "Audit reference is preview-only / not persisted.",
      "Credential reference stays opaque label only.",
      "No env var read, provider key read, or provider SDK import exists.",
      "No queue, worker, job, database, or file persistence exists.",
    ],
    approvalSummary: [
      "Approval fixture is preview-only.",
      "Manual confirmation fixture is preview-only.",
      "No real approval request or recording exists.",
      "Approval token and approval lease remain absent.",
    ],
  },
] as const satisfies readonly ProviderDryRunResultCaptureSeed[];

const GATE_DEFINITIONS = [
  ["backend-only-boundary", "backend-only boundary"],
  [
    "server-only-dry-run-result-capture-module-boundary",
    "server-only dry-run result capture module boundary",
  ],
  [
    "provider-dry-run-result-capture-fixture-mode",
    "provider dry-run result capture fixture mode",
  ],
  [
    "provider-dry-run-execution-review-dependency",
    "provider dry-run execution review dependency",
  ],
  [
    "provider-dry-run-execution-output-dependency",
    "provider dry-run execution output dependency",
  ],
  [
    "provider-dry-run-fixture-response-dependency",
    "provider dry-run fixture response dependency",
  ],
  [
    "credential-reference-opaque-only-mode",
    "credential reference opaque-only mode",
  ],
  [
    "deterministic-dry-run-result-capture-id",
    "deterministic dry-run result capture id",
  ],
  [
    "deterministic-dry-run-execution-id",
    "deterministic dry-run execution id",
  ],
  [
    "deterministic-dry-run-admission-id",
    "deterministic dry-run admission id",
  ],
  ["deterministic-provider-slot-id", "deterministic provider slot id"],
  [
    "deterministic-credential-reference-id",
    "deterministic credential reference id",
  ],
  ["deterministic-capture-digest", "deterministic capture digest"],
  ["supported-capability-family", "supported capability family"],
  [
    "selected-provider-slot-preview-only",
    "selected provider slot preview-only",
  ],
  ["backup-provider-slot-preview-only", "backup provider slot preview-only"],
  [
    "local-private-alternative-preview-only",
    "local/private alternative preview-only",
  ],
  ["dry-run-fixture-response-only", "dry-run fixture response only"],
  ["live-provider-execution-blocked", "live provider execution blocked"],
  ["credential-value-absent", "credential value absent"],
  ["credential-value-not-read", "credential value not read"],
  ["env-vars-not-read", "env vars not read"],
  ["provider-key-not-read", "provider key not read"],
  ["redacted-prompt-envelope-present", "redacted prompt envelope present"],
  ["prompt-not-sent", "prompt not sent"],
  ["provider-sdk-not-imported", "provider SDK not imported"],
  [
    "provider-response-not-received-from-provider",
    "provider response not received from provider",
  ],
  [
    "model-output-not-generated-by-provider-model",
    "model output not generated by provider/model",
  ],
  ["manual-approval-fixture", "manual approval fixture"],
  ["manual-confirmation-fixture", "manual confirmation fixture"],
  ["in-memory-only-capture-reference", "in-memory only capture reference"],
  ["no-real-approval-request", "no real approval request"],
  ["no-real-approval-recording", "no real approval recording"],
  ["no-approval-token-issuance", "no approval token issuance"],
  ["no-approval-lease-issuance", "no approval lease issuance"],
  ["no-frontend-request", "no frontend request"],
  ["no-api-route", "no API route"],
  ["no-fetch-network", "no fetch/network"],
  ["no-provider-sdk-import", "no provider SDK import"],
  ["no-live-provider-execution", "no live provider execution"],
  ["no-model-call", "no model call"],
  ["no-prompt-sending", "no prompt sending"],
  ["no-queue-dispatch", "no queue dispatch"],
  ["no-worker-dispatch", "no worker dispatch"],
  ["no-job-execution", "no job execution"],
  ["no-result-persistence", "no result persistence"],
  ["no-audit-persistence", "no audit persistence"],
  ["no-approval-persistence", "no approval persistence"],
  ["no-database-write", "no database write"],
  ["no-file-write", "no file write"],
  ["single-run-lock-preview", "single-run lock preview"],
  ["idempotency-replay-preview", "idempotency/replay preview"],
  ["timeout-cancel-preview", "timeout/cancel preview"],
  ["privacy-redaction-preview", "privacy/redaction preview"],
  ["kill-switch-fixture", "kill switch fixture"],
] as const satisfies readonly [
  readonly [ProviderDryRunResultCaptureGateId, string],
  ...readonly (readonly [ProviderDryRunResultCaptureGateId, string])[],
];

const READINESS_DEFINITIONS = [
  [
    "server-only-dry-run-result-capture-helper-state",
    "server-only dry-run result capture helper state",
  ],
  [
    "provider-dry-run-execution-review-dependency-state",
    "provider dry-run execution review dependency",
  ],
  ["dry-run-result-capture-input-state", "dry-run result capture input state"],
  ["dry-run-result-capture-check-state", "dry-run result capture check state"],
  [
    "captured-fixture-result-output-state",
    "captured fixture result output state",
  ],
  ["result-capture-envelope-state", "result capture envelope state"],
  ["evidence-preview-state", "evidence preview state"],
  ["audit-preview-state", "audit preview state"],
  ["approval-preview-state", "approval preview state"],
  [
    "blocked-persistence-summary-state",
    "blocked persistence summary state",
  ],
  ["credential-value-boundary-state", "credential value boundary state"],
  ["env-var-boundary-state", "env var boundary state"],
  ["provider-key-boundary-state", "provider key boundary state"],
  ["provider-sdk-boundary-state", "provider SDK boundary state"],
  [
    "live-provider-execution-boundary-state",
    "live provider execution boundary state",
  ],
  ["prompt-boundary-state", "prompt boundary state"],
  ["model-boundary-state", "model boundary state"],
  [
    "frontend-request-boundary-state",
    "frontend request boundary state",
  ],
  ["api-route-boundary-state", "API route boundary state"],
  ["queue-boundary-state", "queue boundary state"],
  ["worker-boundary-state", "worker boundary state"],
  ["job-boundary-state", "job boundary state"],
  [
    "result-persistence-boundary-state",
    "result persistence boundary state",
  ],
  ["audit-persistence-boundary-state", "audit persistence boundary state"],
  [
    "approval-persistence-boundary-state",
    "approval persistence boundary state",
  ],
  ["database-boundary-state", "database boundary state"],
  ["file-boundary-state", "file boundary state"],
] as const satisfies readonly [
  readonly [ProviderDryRunResultCaptureReadinessId, string],
  ...readonly (readonly [ProviderDryRunResultCaptureReadinessId, string])[],
];

function cloneList<T>(items: readonly T[]): readonly T[] {
  return items.map((item) => item);
}

export function buildStableProviderDryRunResultCaptureMvpKey(
  stableId: ProviderDryRunResultCaptureMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-mvp:${ProviderDryRunResultCaptureMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-mvp:${stableId}`;
}

function buildProviderDryRunResultCaptureInputKey(
  stableId: ProviderDryRunResultCaptureMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-input:${ProviderDryRunResultCaptureMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-input:${stableId}`;
}

function buildProviderDryRunResultCaptureCheckKey(
  stableId: ProviderDryRunResultCaptureMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-check:${ProviderDryRunResultCaptureMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-check:${stableId}`;
}

function buildProviderDryRunCapturedFixtureResultOutputKey(
  stableId: ProviderDryRunResultCaptureMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-captured-fixture-result-output:${ProviderDryRunResultCaptureMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-captured-fixture-result-output:${stableId}`;
}

function buildProviderDryRunResultCaptureEnvelopeKey(
  stableId: ProviderDryRunResultCaptureMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-envelope:${ProviderDryRunResultCaptureMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-envelope:${stableId}`;
}

function buildProviderDryRunResultCaptureEvidencePreviewKey(
  stableId: ProviderDryRunResultCaptureMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-evidence-preview:${ProviderDryRunResultCaptureMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-evidence-preview:${stableId}`;
}

function buildProviderDryRunResultCaptureAuditPreviewKey(
  stableId: ProviderDryRunResultCaptureMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-audit-preview:${ProviderDryRunResultCaptureMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-audit-preview:${stableId}`;
}

function buildProviderDryRunResultCaptureApprovalPreviewKey(
  stableId: ProviderDryRunResultCaptureMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-approval-preview:${ProviderDryRunResultCaptureMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-approval-preview:${stableId}`;
}

function buildProviderDryRunResultCaptureSafetyGateSummaryKey(
  stableId: ProviderDryRunResultCaptureMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-safety-gate-summary:${ProviderDryRunResultCaptureMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-safety-gate-summary:${stableId}`;
}

function buildProviderDryRunResultCaptureBlockedPersistenceSummaryKey(
  stableId: ProviderDryRunResultCaptureMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-blocked-persistence-summary:${ProviderDryRunResultCaptureMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-blocked-persistence-summary:${stableId}`;
}

function buildProviderDryRunResultCapturePreviewId(
  stableId: ProviderDryRunResultCaptureMvpId
): ProviderDryRunResultCapturePreviewId {
  return `provider-dry-run-result-capture-preview:${stableId}`;
}

function buildProviderDryRunExecutionPreviewId(
  stableId: ProviderDryRunExecutionDependencyId
): `provider-dry-run-execution-preview:${ProviderDryRunExecutionDependencyId}` {
  return `provider-dry-run-execution-preview:${stableId}`;
}

function buildProviderDryRunAdmissionPreviewId(
  stableId: ProviderDryRunAdmissionDependencyId
): `provider-dry-run-admission-preview:${ProviderDryRunAdmissionDependencyId}` {
  return `provider-dry-run-admission-preview:${stableId}`;
}

function buildProviderDryRunResultCapturePreviewSlotId(
  stableId: ProviderDryRunResultCaptureMvpId,
  slotOrder: ProviderDryRunResultCaptureSlotOrder
): `provider-dry-run-result-capture-slot-preview:${ProviderDryRunResultCaptureMvpId}:${ProviderDryRunResultCaptureSlotOrder}` {
  return `provider-dry-run-result-capture-slot-preview:${stableId}:${slotOrder}`;
}

function buildProviderDryRunResultCapturePreviewCredentialReferenceId(
  stableId: ProviderDryRunResultCaptureMvpId
): `provider-dry-run-result-capture-credential-reference-preview:${ProviderDryRunResultCaptureMvpId}` {
  return `provider-dry-run-result-capture-credential-reference-preview:${stableId}`;
}

function buildProviderDryRunResultCapturePreviewDigest(
  stableId: ProviderDryRunResultCaptureMvpId
): `provider-dry-run-result-capture-digest-preview:${ProviderDryRunResultCaptureMvpId}:fixture-only` {
  return `provider-dry-run-result-capture-digest-preview:${stableId}:fixture-only`;
}

function buildProviderDryRunResultCapturePreviewResultReference(
  stableId: ProviderDryRunResultCaptureMvpId
): `provider-dry-run-result-capture-result-reference-preview:${ProviderDryRunResultCaptureMvpId}` {
  return `provider-dry-run-result-capture-result-reference-preview:${stableId}`;
}

function buildProviderDryRunResultCapturePreviewAuditReference(
  stableId: ProviderDryRunResultCaptureMvpId
): `provider-dry-run-result-capture-audit-reference-preview:${ProviderDryRunResultCaptureMvpId}` {
  return `provider-dry-run-result-capture-audit-reference-preview:${stableId}`;
}

function buildProviderDryRunResultCapturePreviewApprovalReference(
  stableId: ProviderDryRunResultCaptureMvpId
): `provider-dry-run-result-capture-approval-reference-preview:${ProviderDryRunResultCaptureMvpId}` {
  return `provider-dry-run-result-capture-approval-reference-preview:${stableId}`;
}

function buildProviderDryRunResultCapturePreviewEvidenceReference(
  stableId: ProviderDryRunResultCaptureMvpId
): `provider-dry-run-result-capture-evidence-reference-preview:${ProviderDryRunResultCaptureMvpId}` {
  return `provider-dry-run-result-capture-evidence-reference-preview:${stableId}`;
}

function buildProviderDryRunResultCapturePreviewPromptReference(
  stableId: ProviderDryRunResultCaptureMvpId
): ProviderDryRunResultCapturePreviewPromptReference {
  return `provider-dry-run-result-capture-prompt-reference-preview:${stableId}`;
}

function buildCommonRecordFields(seed: ProviderDryRunResultCaptureSeed) {
  return {
    stableId: seed.stableId,
    capabilityFamily: seed.capabilityFamily,
    workspaceTarget: WORKSPACE_TARGET,
    providerSlotLabel: seed.providerSlotLabel,
    backupProviderSlotLabel: seed.backupProviderSlotLabel,
    localPrivateAlternativeLabel: seed.localPrivateAlternativeLabel,
    opaqueCredentialReferenceLabel: seed.opaqueCredentialReferenceLabel,
    credentialReferencePosture: "opaque-reference-only" as const,
    credentialValueState: "not present / not read" as const,
    envVarState: "not read" as const,
    providerKeyState: "not read" as const,
    sourceProviderDryRunExecutionReviewReference:
      "Backend-owned minimal provider adapter dry-run execution review" as const,
    sourceProviderDryRunExecutionAcceptancePostureReference:
      "Provider adapter dry-run execution acceptance posture" as const,
    sourceProviderDryRunExecutionAuditSummaryReference:
      "Provider adapter dry-run execution review audit summary" as const,
    sourceProviderDryRunExecutionMvpReference:
      "Backend-owned minimal manual-gated provider adapter dry-run execution MVP" as const,
    sourceProviderDryRunFixtureResponseReference:
      "Provider adapter dry-run fixture response" as const,
    sourceProviderDryRunExecutionOutputReference:
      "Provider adapter dry-run execution output" as const,
    sourceProviderDryRunBlockedLiveExecutionSummaryReference:
      "Provider adapter dry-run blocked live execution summary" as const,
    sourceProviderDryRunAdmissionReviewReference:
      "Backend-owned minimal provider adapter dry-run admission review" as const,
    sourceProviderSelectionCredentialReferenceReviewReference:
      "Backend-owned minimal provider adapter selection and credential reference review" as const,
    sourceManualApprovalDecisionReviewReference:
      "Backend-owned synthetic dry-run manual approval decision review" as const,
    backendOwnedPosture: "backend-owned" as const,
    serverOnlyPosture: "server-only" as const,
    dryRunResultCapturePosture: "provider-dry-run-result-capture" as const,
    manualGatedPosture: "manual-gated" as const,
    fixtureOnlyPosture: "fixture-only" as const,
    inMemoryOnlyPosture: "in-memory-only" as const,
    noProviderSdkImport: "no provider SDK import" as const,
    noLiveProviderExecution: "no live provider execution" as const,
    noModelCalls: "no model calls" as const,
    noPromptSending: "no prompt sending" as const,
    noFrontendRequest: "no frontend request" as const,
    noApiRoute: "no API route" as const,
    noQueueWorkerJobDispatch: "no queue/worker/job dispatch" as const,
    noPersistence: "no persistence" as const,
    noDatabaseWrites: "no database writes" as const,
    noFileWrites: "no file writes" as const,
    noResultPersistence: "no result persistence" as const,
    noAuditPersistence: "no audit persistence" as const,
    noApprovalPersistence: "no approval persistence" as const,
    noApprovalRecording: "no approval recording" as const,
    noApprovalTokenIssuance: "no approval token issuance" as const,
    noApprovalLeaseIssuance: "no approval lease issuance" as const,
    currentReadiness: CURRENT_READINESS,
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  } as const;
}

function resolveGateOwner(gateId: ProviderDryRunResultCaptureGateId): string {
  if (
    gateId.includes("approval") ||
    gateId.includes("privacy") ||
    gateId.includes("kill-switch")
  ) {
    return "safety review";
  }

  if (
    gateId.includes("queue") ||
    gateId.includes("worker") ||
    gateId.includes("job") ||
    gateId.includes("persistence") ||
    gateId.includes("database") ||
    gateId.includes("file")
  ) {
    return "backend future";
  }

  return "operator";
}

function resolveGateRequiredState(gateId: ProviderDryRunResultCaptureGateId): string {
  switch (gateId) {
    case "backend-only-boundary":
      return "backend-owned";
    case "server-only-dry-run-result-capture-module-boundary":
      return "server-only";
    case "provider-dry-run-result-capture-fixture-mode":
      return "manual-gated / fixture-only";
    case "provider-dry-run-execution-review-dependency":
      return "execution review exists";
    case "provider-dry-run-execution-output-dependency":
      return "execution output exists";
    case "provider-dry-run-fixture-response-dependency":
      return "fixture response exists";
    case "credential-reference-opaque-only-mode":
      return "opaque-reference-only";
    case "supported-capability-family":
      return "supported by text adapter boundary";
    case "selected-provider-slot-preview-only":
    case "backup-provider-slot-preview-only":
    case "local-private-alternative-preview-only":
      return "preview-only";
    case "live-provider-execution-blocked":
    case "no-live-provider-execution":
      return "blocked";
    case "credential-value-absent":
    case "credential-value-not-read":
      return "not present / not read";
    case "env-vars-not-read":
    case "provider-key-not-read":
      return "not read";
    case "redacted-prompt-envelope-present":
      return "redacted placeholder only";
    case "prompt-not-sent":
    case "no-prompt-sending":
      return "not sent";
    case "provider-sdk-not-imported":
    case "no-provider-sdk-import":
      return "not imported";
    case "provider-response-not-received-from-provider":
      return "not received from provider";
    case "model-output-not-generated-by-provider-model":
    case "no-model-call":
      return "not generated by provider/model";
    case "manual-approval-fixture":
    case "manual-confirmation-fixture":
      return "preview-only";
    case "no-real-approval-request":
      return "no real approval request exists";
    case "no-real-approval-recording":
      return "no real approval recording exists";
    case "no-approval-token-issuance":
      return "not issued";
    case "no-approval-lease-issuance":
      return "not created";
    case "no-frontend-request":
    case "no-api-route":
      return "not created";
    case "no-fetch-network":
      return "no fetch/network";
    case "no-queue-dispatch":
    case "no-worker-dispatch":
    case "no-job-execution":
      return "blocked";
    case "no-result-persistence":
    case "no-audit-persistence":
    case "no-approval-persistence":
    case "no-database-write":
    case "no-file-write":
      return "not implemented";
    default:
      return "deterministic preview only";
  }
}

function resolveGateCurrentState(
  seed: ProviderDryRunResultCaptureSeed,
  gateId: ProviderDryRunResultCaptureGateId
): string {
  switch (gateId) {
    case "deterministic-dry-run-result-capture-id":
      return buildProviderDryRunResultCapturePreviewId(seed.stableId);
    case "deterministic-dry-run-execution-id":
      return buildProviderDryRunExecutionPreviewId(seed.executionStableId);
    case "deterministic-dry-run-admission-id":
      return buildProviderDryRunAdmissionPreviewId(seed.admissionStableId);
    case "deterministic-provider-slot-id":
      return buildProviderDryRunResultCapturePreviewSlotId(
        seed.stableId,
        "selected"
      );
    case "deterministic-credential-reference-id":
      return buildProviderDryRunResultCapturePreviewCredentialReferenceId(
        seed.stableId
      );
    case "deterministic-capture-digest":
      return buildProviderDryRunResultCapturePreviewDigest(seed.stableId);
    case "selected-provider-slot-preview-only":
      return seed.providerSlotLabel;
    case "backup-provider-slot-preview-only":
      return seed.backupProviderSlotLabel;
    case "local-private-alternative-preview-only":
      return seed.localPrivateAlternativeLabel;
    case "supported-capability-family":
      return seed.capabilityFamily;
    case "dry-run-fixture-response-only":
      return seed.capturedDryRunFixtureResponse;
    default:
      return resolveGateRequiredState(gateId);
  }
}

function resolveGateEvidence(
  seed: ProviderDryRunResultCaptureSeed,
  gateId: ProviderDryRunResultCaptureGateId
): string {
  switch (gateId) {
    case "provider-dry-run-execution-review-dependency":
      return "Execution review records are present and preview-only.";
    case "provider-dry-run-execution-output-dependency":
      return "Execution output record is present and deterministic fixture-only.";
    case "provider-dry-run-fixture-response-dependency":
      return "Execution fixture response record is present and deterministic.";
    case "redacted-prompt-envelope-present":
      return seed.redactedPromptEnvelopeLabel;
    case "in-memory-only-capture-reference":
      return buildProviderDryRunResultCapturePreviewResultReference(seed.stableId);
    case "single-run-lock-preview":
      return "Single-run lock remains preview-only and not enforced.";
    case "idempotency-replay-preview":
      return "Idempotency and replay markers remain preview-only.";
    case "timeout-cancel-preview":
      return "Timeout and cancel posture remains preview-only.";
    case "privacy-redaction-preview":
      return "Prompt and credential posture remains redacted and opaque-only.";
    case "kill-switch-fixture":
      return "Kill switch fixture remains required and preview-only.";
    default:
      return `${seed.capabilityFamily} capture gate remains deterministic preview-only.`;
  }
}

function resolveGateBlockedLiveAction(
  gateId: ProviderDryRunResultCaptureGateId
): string {
  switch (gateId) {
    case "no-queue-dispatch":
      return "queue dispatch";
    case "no-worker-dispatch":
      return "worker dispatch";
    case "no-job-execution":
      return "job execution";
    case "no-result-persistence":
      return "result persistence";
    case "no-audit-persistence":
      return "audit persistence";
    case "no-approval-persistence":
      return "approval persistence";
    case "no-database-write":
      return "database write";
    case "no-file-write":
      return "file write";
    case "no-real-approval-request":
      return "real approval request";
    case "no-real-approval-recording":
      return "real approval recording";
    case "no-approval-token-issuance":
      return "approval token issuance";
    case "no-approval-lease-issuance":
      return "approval lease issuance";
    default:
      return "live provider execution";
  }
}

function resolveReadinessState(
  seed: ProviderDryRunResultCaptureSeed,
  readinessId: ProviderDryRunResultCaptureReadinessId
): string {
  switch (readinessId) {
    case "server-only-dry-run-result-capture-helper-state":
      return "server-only helper exists";
    case "provider-dry-run-execution-review-dependency-state":
      return "dependency present / preview-only";
    case "dry-run-result-capture-input-state":
      return "deterministic request fixture only";
    case "dry-run-result-capture-check-state":
      return "preview-only gate set validated";
    case "captured-fixture-result-output-state":
      return "captured in memory only";
    case "result-capture-envelope-state":
      return seed.redactedPromptEnvelopeLabel;
    case "evidence-preview-state":
    case "audit-preview-state":
    case "approval-preview-state":
      return "preview-only / not persisted";
    case "blocked-persistence-summary-state":
      return "preview-only blocked persistence summary";
    case "credential-value-boundary-state":
      return "not present / not read";
    case "env-var-boundary-state":
    case "provider-key-boundary-state":
      return "not read";
    case "provider-sdk-boundary-state":
      return "not imported";
    case "live-provider-execution-boundary-state":
      return "blocked";
    case "prompt-boundary-state":
      return "not sent";
    case "model-boundary-state":
      return "not generated by provider/model";
    case "frontend-request-boundary-state":
    case "api-route-boundary-state":
      return "not created";
    case "queue-boundary-state":
    case "worker-boundary-state":
    case "job-boundary-state":
      return "blocked";
    case "result-persistence-boundary-state":
    case "audit-persistence-boundary-state":
    case "approval-persistence-boundary-state":
    case "database-boundary-state":
    case "file-boundary-state":
      return "not implemented";
    default:
      return CURRENT_READINESS;
  }
}

function resolveReadinessEvidence(
  seed: ProviderDryRunResultCaptureSeed,
  readinessId: ProviderDryRunResultCaptureReadinessId
): string {
  switch (readinessId) {
    case "result-capture-envelope-state":
      return buildProviderDryRunResultCapturePreviewPromptReference(
        seed.stableId
      );
    case "captured-fixture-result-output-state":
      return seed.capturedDryRunFixtureResponse;
    case "blocked-persistence-summary-state":
      return BLOCKED_PERSISTENCE_TARGETS.join(", ");
    default:
      return `${seed.capabilityFamily} result capture posture remains deterministic and preview-only.`;
  }
}

function buildMvpRecord(
  seed: ProviderDryRunResultCaptureSeed
): MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord {
  return {
    key: buildStableProviderDryRunResultCaptureMvpKey(seed.stableId),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-mvp-v1",
    ...buildCommonRecordFields(seed),
    captureState: "captured-provider-dry-run-fixture-result-in-memory-only",
    captureMode: CAPTURE_MODE,
    providerDryRunResultCaptureId: buildProviderDryRunResultCapturePreviewId(
      seed.stableId
    ),
    providerDryRunExecutionId: buildProviderDryRunExecutionPreviewId(
      seed.executionStableId
    ),
    providerDryRunAdmissionId: buildProviderDryRunAdmissionPreviewId(
      seed.admissionStableId
    ),
    providerSlotId: buildProviderDryRunResultCapturePreviewSlotId(
      seed.stableId,
      "selected"
    ),
    credentialReferenceId:
      buildProviderDryRunResultCapturePreviewCredentialReferenceId(
        seed.stableId
      ),
    captureDigest: buildProviderDryRunResultCapturePreviewDigest(seed.stableId),
    selectedProviderSlotLabel: seed.providerSlotLabel,
    selectedBackupProviderSlotLabel: seed.backupProviderSlotLabel,
    redactedPromptReference: buildProviderDryRunResultCapturePreviewPromptReference(
      seed.stableId
    ),
    capturedDryRunFixtureResponse: seed.capturedDryRunFixtureResponse,
    providerResponseState: "not received from provider",
    modelOutputState: "not generated by provider/model",
    providerSdkImportState: "not imported",
    liveProviderExecutionState: "blocked",
    resultReference: buildProviderDryRunResultCapturePreviewResultReference(
      seed.stableId
    ),
    auditReference: buildProviderDryRunResultCapturePreviewAuditReference(
      seed.stableId
    ),
    approvalReference: buildProviderDryRunResultCapturePreviewApprovalReference(
      seed.stableId
    ),
    evidencePacketReference:
      buildProviderDryRunResultCapturePreviewEvidenceReference(seed.stableId),
    timestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    reviewRecoveryPreviewNextStatement: REVIEW_RECOVERY_NEXT_STATEMENT,
    noFrontendRequestStatement: "no frontend request is created",
    noApiRouteStatement: "no API route is created",
    noProviderCallStatement: "no provider call exists",
    noModelCallStatement: "no model call exists",
    noRealApprovalRequestStatement: "no real approval request exists",
    noRealApprovalRecordingStatement: "no real approval recording exists",
    noApprovalTokenStatement: "no approval token exists",
    noApprovalLeaseStatement: "no approval lease exists",
  };
}

function buildInputRecord(
  seed: ProviderDryRunResultCaptureSeed
): ProviderDryRunResultCaptureInputRecord {
  return {
    key: buildProviderDryRunResultCaptureInputKey(seed.stableId),
    requestVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-input-v1",
    ...buildCommonRecordFields(seed),
    requestState:
      "deterministic provider dry-run result capture fixture request only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    selectedProviderPosture: "preview slot only",
    backupProviderPosture: "preview slot only",
    localPrivateAlternativePosture: "preview slot only",
    credentialValuePosture: "none / not read",
    dryRunFixtureResponsePosture: "deterministic fixture response only",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadNoPersistenceStatement:
      "No frontend request. No API route. No provider call. No secret read. No persistence.",
  };
}

function buildCheckRecord(
  seed: ProviderDryRunResultCaptureSeed
): ProviderDryRunResultCaptureCheckRecord {
  return {
    key: buildProviderDryRunResultCaptureCheckKey(seed.stableId),
    checkVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-check-v1",
    ...buildCommonRecordFields(seed),
    checkState: "validated preview-only result capture gate set",
    supportedCapabilityState: "supported by text adapter boundary",
    providerDryRunExecutionReviewDependencyState: "available / preview-only",
    providerDryRunExecutionOutputDependencyState:
      "available / deterministic fixture-only",
    providerDryRunFixtureResponseDependencyState:
      "available / deterministic fixture-only",
    selectedProviderSlotState: "preview-only",
    backupProviderSlotState: "preview-only",
    localPrivateAlternativeState: "preview-only",
    providerSdkImportState: "not imported",
    liveProviderExecutionState: "blocked",
    providerResponseState: "not received from provider",
    modelOutputState: "not generated by provider/model",
    promptTransmissionState: "not sent",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    queueDispatchState: "blocked",
    workerDispatchState: "blocked",
    jobExecutionState: "blocked",
    blockedLiveAction:
      "Live provider execution, prompt sending, approval recording, and persistence remain blocked.",
  };
}

function buildOutputRecord(
  seed: ProviderDryRunResultCaptureSeed
): ProviderDryRunCapturedFixtureResultOutputRecord {
  return {
    key: buildProviderDryRunCapturedFixtureResultOutputKey(seed.stableId),
    outputVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-captured-fixture-result-output-v1",
    responseVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-response-v1",
    ...buildCommonRecordFields(seed),
    responseState: "returned by server-only smoke/helper only",
    captureState: "captured-provider-dry-run-fixture-result-in-memory-only",
    capturedFixtureResponseState:
      "deterministic dry-run fixture captured in memory only",
    capturedDryRunFixtureResponse: seed.capturedDryRunFixtureResponse,
    selectedProviderState: "preview-only / not live-executed",
    credentialReferenceState: "opaque reference only / value not read",
    providerSdkImportState: "not imported",
    providerResponseState: "not received from provider",
    modelOutputState: "not generated by provider/model",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitDryRunResultCaptureFixtureOnlyNoProviderOutputNoSecretReadNoPersistenceStatement:
      "Dry-run result capture fixture only. No provider output. No secret read. No persistence.",
  };
}

function buildEnvelopeRecord(
  seed: ProviderDryRunResultCaptureSeed
): ProviderDryRunResultCaptureEnvelopeRecord {
  return {
    key: buildProviderDryRunResultCaptureEnvelopeKey(seed.stableId),
    envelopeVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-envelope-v1",
    ...buildCommonRecordFields(seed),
    envelopeState: "provider dry-run result capture envelope preview only",
    redactedPromptEnvelopeLabel: seed.redactedPromptEnvelopeLabel,
    redactedPromptReference: buildProviderDryRunResultCapturePreviewPromptReference(
      seed.stableId
    ),
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    providerPayloadPosture: "none",
    providerResponseState: "not received from provider",
    modelOutputState: "not generated by provider/model",
    resultReference: buildProviderDryRunResultCapturePreviewResultReference(
      seed.stableId
    ),
    auditReference: buildProviderDryRunResultCapturePreviewAuditReference(
      seed.stableId
    ),
    approvalReference: buildProviderDryRunResultCapturePreviewApprovalReference(
      seed.stableId
    ),
    evidencePacketReference:
      buildProviderDryRunResultCapturePreviewEvidenceReference(seed.stableId),
    timestampPosture: "static fixture label only / no real timestamp",
  };
}

function buildEvidencePreviewRecord(
  seed: ProviderDryRunResultCaptureSeed
): ProviderDryRunResultCaptureEvidencePreviewRecord {
  return {
    key: buildProviderDryRunResultCaptureEvidencePreviewKey(seed.stableId),
    evidenceVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-evidence-preview-v1",
    ...buildCommonRecordFields(seed),
    evidencePreviewState: "preview-only / not persisted",
    evidenceReference:
      buildProviderDryRunResultCapturePreviewEvidenceReference(seed.stableId),
    evidenceSummaryLines: seed.evidenceSummary,
  };
}

function buildAuditPreviewRecord(
  seed: ProviderDryRunResultCaptureSeed
): ProviderDryRunResultCaptureAuditPreviewRecord {
  return {
    key: buildProviderDryRunResultCaptureAuditPreviewKey(seed.stableId),
    auditVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-audit-preview-v1",
    ...buildCommonRecordFields(seed),
    auditPreviewState: "preview-only / not persisted",
    auditReference: buildProviderDryRunResultCapturePreviewAuditReference(
      seed.stableId
    ),
    auditSummaryLines: seed.auditSummary,
  };
}

function buildApprovalPreviewRecord(
  seed: ProviderDryRunResultCaptureSeed
): ProviderDryRunResultCaptureApprovalPreviewRecord {
  return {
    key: buildProviderDryRunResultCaptureApprovalPreviewKey(seed.stableId),
    approvalVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-approval-preview-v1",
    ...buildCommonRecordFields(seed),
    approvalPreviewState: "preview-only / not persisted",
    approvalReference: buildProviderDryRunResultCapturePreviewApprovalReference(
      seed.stableId
    ),
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    approvalSummaryLines: seed.approvalSummary,
  };
}

function buildSafetyGateSummaryRecord(
  seed: ProviderDryRunResultCaptureSeed
): ProviderDryRunResultCaptureSafetyGateSummaryRecord {
  return {
    key: buildProviderDryRunResultCaptureSafetyGateSummaryKey(seed.stableId),
    gateSummaryVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-safety-gate-summary-v1",
    ...buildCommonRecordFields(seed),
    gateSummaryState: "preview-only blocked dry-run result capture summary",
    gateCount: GATE_DEFINITIONS.length,
    summaryLines: cloneList(GATE_SUMMARY_LINES),
    nextSafeAction:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

function buildBlockedPersistenceSummaryRecord(
  seed: ProviderDryRunResultCaptureSeed
): ProviderDryRunResultCaptureBlockedPersistenceSummaryRecord {
  return {
    key: buildProviderDryRunResultCaptureBlockedPersistenceSummaryKey(
      seed.stableId
    ),
    blockedPersistenceSummaryVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-blocked-persistence-summary-v1",
    ...buildCommonRecordFields(seed),
    blockedPersistenceSummaryState: "preview-only blocked persistence summary",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    queueDispatchState: "blocked",
    workerDispatchState: "blocked",
    jobExecutionState: "blocked",
    blockedTargets: cloneList(BLOCKED_PERSISTENCE_TARGETS),
    nextSafeAction:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

function buildGateRecords(
  seed: ProviderDryRunResultCaptureSeed
): readonly ProviderDryRunResultCaptureGateRecord[] {
  return GATE_DEFINITIONS.map(([gateId, label]) => ({
    key: `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate:${seed.stableId}:${gateId}`,
    gateVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate-v1",
    stableId: seed.stableId,
    gateId,
    label,
    owner: resolveGateOwner(gateId),
    requiredState: resolveGateRequiredState(gateId),
    currentState: resolveGateCurrentState(seed, gateId),
    evidence: resolveGateEvidence(seed, gateId),
    blockedLiveAction: resolveGateBlockedLiveAction(gateId),
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  }));
}

function buildReadinessRecords(
  seed: ProviderDryRunResultCaptureSeed
): readonly ProviderDryRunResultCaptureReadinessMatrixRecord[] {
  return READINESS_DEFINITIONS.map(([readinessId, label]) => ({
    key: `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-readiness-matrix:${seed.stableId}:${readinessId}`,
    readinessVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-readiness-matrix-v1",
    ...buildCommonRecordFields(seed),
    readinessId,
    label,
    state: resolveReadinessState(seed, readinessId),
    evidence: resolveReadinessEvidence(seed, readinessId),
    nextSafeAction:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  }));
}

export function listMinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecords(): readonly MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord[] {
  return cloneList(PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.map(buildMvpRecord));
}

export function listProviderDryRunResultCaptureInputs(): readonly ProviderDryRunResultCaptureInputRecord[] {
  return cloneList(PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.map(buildInputRecord));
}

export function listProviderDryRunResultCaptureChecks(): readonly ProviderDryRunResultCaptureCheckRecord[] {
  return cloneList(PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.map(buildCheckRecord));
}

export function listProviderDryRunCapturedFixtureResultOutputs(): readonly ProviderDryRunCapturedFixtureResultOutputRecord[] {
  return cloneList(PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.map(buildOutputRecord));
}

export function listProviderDryRunResultCaptureEnvelopes(): readonly ProviderDryRunResultCaptureEnvelopeRecord[] {
  return cloneList(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.map(buildEnvelopeRecord)
  );
}

export function listProviderDryRunResultCaptureEvidencePreviews(): readonly ProviderDryRunResultCaptureEvidencePreviewRecord[] {
  return cloneList(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.map(buildEvidencePreviewRecord)
  );
}

export function listProviderDryRunResultCaptureAuditPreviews(): readonly ProviderDryRunResultCaptureAuditPreviewRecord[] {
  return cloneList(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.map(buildAuditPreviewRecord)
  );
}

export function listProviderDryRunResultCaptureApprovalPreviews(): readonly ProviderDryRunResultCaptureApprovalPreviewRecord[] {
  return cloneList(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.map(buildApprovalPreviewRecord)
  );
}

export function listProviderDryRunResultCaptureSafetyGateSummaries(): readonly ProviderDryRunResultCaptureSafetyGateSummaryRecord[] {
  return cloneList(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.map(buildSafetyGateSummaryRecord)
  );
}

export function listProviderDryRunResultCaptureBlockedPersistenceSummaries(): readonly ProviderDryRunResultCaptureBlockedPersistenceSummaryRecord[] {
  return cloneList(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.map(
      buildBlockedPersistenceSummaryRecord
    )
  );
}

export function listProviderDryRunResultCaptureGates(): readonly ProviderDryRunResultCaptureGateRecord[] {
  return cloneList(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.flatMap(buildGateRecords)
  );
}

export function listProviderDryRunResultCaptureReadinessMatrixRecords(): readonly ProviderDryRunResultCaptureReadinessMatrixRecord[] {
  return cloneList(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.flatMap(buildReadinessRecords)
  );
}

export function buildStaticProviderDryRunResultCaptureServerRunRecord(
  stableId: ProviderDryRunResultCaptureMvpId
): MinimalProviderDryRunResultCaptureServerRunRecord {
  const seed = PROVIDER_DRY_RUN_RESULT_CAPTURE_SEEDS.find(
    (candidate) => candidate.stableId === stableId
  );

  if (!seed) {
    throw new Error(`Missing provider dry-run result capture seed ${stableId}.`);
  }

  return buildMvpRecord(seed);
}

export function buildProviderDryRunResultCaptureSummary(): ProviderDryRunResultCaptureSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-summary-v1",
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    currentReadiness: CURRENT_READINESS,
    captureMode: CAPTURE_MODE,
    summaryLines: cloneList(SUMMARY_LINES),
  };
}

export function buildProviderDryRunResultCaptureGateSummary(): ProviderDryRunResultCaptureGateSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate-summary-v1",
    gateCount: listProviderDryRunResultCaptureGates().length,
    summaryLines: cloneList(GATE_SUMMARY_LINES),
    nextSafeAction:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

export function buildProviderDryRunResultCaptureReadinessSummary(): ProviderDryRunResultCaptureReadinessSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-readiness-summary-v1",
    recordCount: listProviderDryRunResultCaptureReadinessMatrixRecords().length,
    summaryLines: cloneList(READINESS_SUMMARY_LINES),
    nextSafeAction:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

export function buildNextProviderDryRunResultCaptureReviewRecoveryChecklist(): ProviderDryRunResultCaptureReviewRecoveryChecklist {
  return cloneList(NEXT_REVIEW_RECOVERY_CHECKLIST) as ProviderDryRunResultCaptureReviewRecoveryChecklist;
}
