import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
  type MinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecord,
  type MinimalProviderAdapterSelectionServerRunRecord,
  type OpaqueCredentialReferenceInputRecord,
  type OpaqueCredentialReferenceOutputRecord,
  type ProviderAdapterSelectionAdmissionCheckRecord,
  type ProviderAdapterSelectionApprovalPreviewRecord,
  type ProviderAdapterSelectionAuditPreviewRecord,
  type ProviderAdapterSelectionBlockedLiveProviderSummaryRecord,
  type ProviderAdapterSelectionCurrentReadiness,
  type ProviderAdapterSelectionEnvelopeRecord,
  type ProviderAdapterSelectionErrorRecord,
  type ProviderAdapterSelectionEvidencePreviewRecord,
  type ProviderAdapterSelectionFallbackPosture,
  type ProviderAdapterSelectionGateId,
  type ProviderAdapterSelectionGateRecord,
  type ProviderAdapterSelectionGateSummary,
  type ProviderAdapterSelectionInputRecord,
  type ProviderAdapterSelectionMvpId,
  type ProviderAdapterSelectionOutputRecord,
  type ProviderAdapterSelectionProviderSlotLabel,
  type ProviderAdapterSelectionReadinessId,
  type ProviderAdapterSelectionReadinessMatrixRecord,
  type ProviderAdapterSelectionReadinessSummary,
  type ProviderAdapterSelectionRequestRecord,
  type ProviderAdapterSelectionResponseRecord,
  type ProviderAdapterSelectionReviewRecoveryChecklist,
  type ProviderAdapterSelectionReviewRecoveryNextStatement,
  type ProviderAdapterSelectionSafetyGateSummaryRecord,
  type ProviderAdapterSelectionSummary,
  type ProviderSlotMatrixRecord,
  type ProviderSlotOrder,
  type ProviderSlotRecord,
} from "./min-provider-select-types";

type ProviderSelectionSeed = Readonly<{
  stableId: ProviderAdapterSelectionMvpId;
  capabilityFamilyId: "text-chat" | "planning-reasoning";
  capabilityFamily: "text/chat" | "planning/reasoning";
  providerSlotLabel: ProviderAdapterSelectionProviderSlotLabel;
  backupProviderSlotLabel: ProviderAdapterSelectionProviderSlotLabel;
  localPrivateAlternativeLabel: "local/private text provider slot";
  fallbackDisabledSlotLabel: "fallback disabled slot";
  opaqueCredentialReferenceLabel:
    | "opaque credential reference label / athena text chat primary"
    | "opaque credential reference label / athena planning reasoning primary";
  selectedProviderSummary: string;
  backupProviderSummary: string;
}>;

const CURRENT_READINESS: ProviderAdapterSelectionCurrentReadiness =
  "minimal-provider-selection-credential-reference-mvp-only / backend-only / credential-reference-only / fixture-only / not provider-capable / not persistent";

const REVIEW_RECOVERY_NEXT_STATEMENT: ProviderAdapterSelectionReviewRecoveryNextStatement =
  "provider adapter selection and credential reference review and recovery preview comes next";

const RETRY_POSTURE: ProviderAdapterSelectionFallbackPosture = "disabled";
const FALLBACK_POSTURE: ProviderAdapterSelectionFallbackPosture = "disabled";

const SUMMARY_LINES = [
  "backend-owned minimal manual-gated provider adapter selection and credential reference MVP only",
  "provider adapter selection is backend-only",
  "server-only provider selection helper exists",
  "provider slot selection is deterministic fixture-only",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "backup provider slot is preview-only",
  "local/private alternative is preview-only",
  "provider adapter selection is not provider-capable yet",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "provider response is not received",
  "model output is not generated",
  "no prompt sending",
  "no LLM/model calls",
  "no frontend provider call",
  "no frontend fetch/network call",
  "no provider SDK imports",
  "no provider execution",
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
  "backend-owned minimal manual-gated provider adapter selection and credential reference review and recovery preview next",
] as const;

const GATE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only provider selection module boundary",
  "provider selection fixture mode",
  "credential reference opaque-only mode",
  "text adapter audit/approval join review dependency",
  "deterministic provider selection id",
  "deterministic provider slot id",
  "deterministic credential reference id",
  "deterministic selection digest",
  "supported capability family",
  "selected provider slot preview-only",
  "backup provider slot preview-only",
  "local/private alternative preview-only",
  "credential value absent",
  "credential value not read",
  "env vars not read",
  "provider key not read",
  "redacted prompt envelope present",
  "prompt not sent",
  "provider SDK not imported",
  "provider response not received",
  "model output not generated",
  "manual approval fixture",
  "manual confirmation fixture",
  "in-memory only selection reference",
  "no real approval request",
  "no real approval recording",
  "no approval token issuance",
  "no approval lease issuance",
  "no frontend request",
  "no API route",
  "no fetch/network",
  "no provider SDK import",
  "no provider execution",
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
  "server-only provider selection helper state",
  "text adapter audit/approval join review dependency",
  "provider selection input state",
  "provider selection admission check state",
  "provider slot matrix state",
  "provider slot selection output state",
  "opaque credential reference input state",
  "opaque credential reference output state",
  "selection envelope state",
  "evidence preview state",
  "audit preview state",
  "approval preview state",
  "credential value boundary state",
  "env var boundary state",
  "provider SDK boundary state",
  "provider execution boundary state",
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

const REVIEW_RECOVERY_CHECKLIST = [
  "Review the deterministic provider slot and opaque credential reference previews before adding review and recovery overlays.",
  "Keep provider adapter selection backend-only, server-only, deterministic, fixture-only, and in-memory only.",
  "Do not add credential value reads, env var reads, provider key reads, provider SDK imports, provider execution, prompt sending, or model calls.",
  "Do not add frontend requests, API routes, queue dispatch, worker dispatch, job execution, result persistence, audit persistence, approval persistence, database writes, or file writes.",
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH,
] as const satisfies ProviderAdapterSelectionReviewRecoveryChecklist;

const BLOCKED_LIVE_ACTIONS = [
  "real approval request",
  "real approval recording",
  "approval token issuance",
  "approval lease issuance",
  "credential value read",
  "env var read",
  "provider key read",
  "prompt sending",
  "provider SDK import",
  "provider execution",
  "model call",
  "frontend request creation",
  "API route creation",
  "frontend fetch/network call",
  "queue dispatch",
  "worker dispatch",
  "job execution",
  "result persistence",
  "audit persistence",
  "approval persistence",
  "database write",
  "file write",
] as const;

const PROVIDER_SELECTION_SEEDS = [
  {
    stableId: "text-chat-provider-selection",
    capabilityFamilyId: "text-chat",
    capabilityFamily: "text/chat",
    providerSlotLabel: "OpenAI-compatible text provider slot",
    backupProviderSlotLabel: "Anthropic-compatible text provider slot",
    localPrivateAlternativeLabel: "local/private text provider slot",
    fallbackDisabledSlotLabel: "fallback disabled slot",
    opaqueCredentialReferenceLabel:
      "opaque credential reference label / athena text chat primary",
    selectedProviderSummary:
      "Primary preview slot for Athena text/chat stays registry-like, deterministic, and blocked from execution.",
    backupProviderSummary:
      "Backup preview slot exists for manual review only and does not execute.",
  },
  {
    stableId: "planning-reasoning-provider-selection",
    capabilityFamilyId: "planning-reasoning",
    capabilityFamily: "planning/reasoning",
    providerSlotLabel: "Anthropic-compatible text provider slot",
    backupProviderSlotLabel: "Gemini-compatible text provider slot",
    localPrivateAlternativeLabel: "local/private text provider slot",
    fallbackDisabledSlotLabel: "fallback disabled slot",
    opaqueCredentialReferenceLabel:
      "opaque credential reference label / athena planning reasoning primary",
    selectedProviderSummary:
      "Primary preview slot for planning/reasoning stays deterministic and backend-owned only.",
    backupProviderSummary:
      "Backup preview slot remains blocked from provider execution and exists only for recovery planning.",
  },
] as const satisfies readonly ProviderSelectionSeed[];

function cloneList<T>(items: readonly T[]): readonly T[] {
  return items.map((item) => item);
}

function buildProviderSelectionPreviewId(
  stableId: ProviderAdapterSelectionMvpId
): `provider-selection-preview:${ProviderAdapterSelectionMvpId}` {
  return `provider-selection-preview:${stableId}`;
}

function buildProviderSelectionPreviewSlotId(
  stableId: ProviderAdapterSelectionMvpId,
  slotOrder: ProviderSlotOrder
): `provider-slot-preview:${ProviderAdapterSelectionMvpId}:${ProviderSlotOrder}` {
  return `provider-slot-preview:${stableId}:${slotOrder}`;
}

function buildProviderSelectionPreviewCredentialReferenceId(
  stableId: ProviderAdapterSelectionMvpId
): `credential-reference-preview:${ProviderAdapterSelectionMvpId}` {
  return `credential-reference-preview:${stableId}`;
}

function buildProviderSelectionPreviewDigest(
  stableId: ProviderAdapterSelectionMvpId
): `provider-selection-digest-preview:${ProviderAdapterSelectionMvpId}:fixture-only` {
  return `provider-selection-digest-preview:${stableId}:fixture-only`;
}

function buildProviderSelectionPreviewResultReference(
  stableId: ProviderAdapterSelectionMvpId
): `provider-selection-result-reference-preview:${ProviderAdapterSelectionMvpId}` {
  return `provider-selection-result-reference-preview:${stableId}`;
}

function buildProviderSelectionPreviewAuditReference(
  stableId: ProviderAdapterSelectionMvpId
): `provider-selection-audit-reference-preview:${ProviderAdapterSelectionMvpId}` {
  return `provider-selection-audit-reference-preview:${stableId}`;
}

function buildProviderSelectionPreviewApprovalReference(
  stableId: ProviderAdapterSelectionMvpId
): `provider-selection-approval-reference-preview:${ProviderAdapterSelectionMvpId}` {
  return `provider-selection-approval-reference-preview:${stableId}`;
}

function buildProviderSelectionPreviewEvidenceReference(
  stableId: ProviderAdapterSelectionMvpId
): `provider-selection-evidence-reference-preview:${ProviderAdapterSelectionMvpId}` {
  return `provider-selection-evidence-reference-preview:${stableId}`;
}

export function buildStableProviderSelectionCredentialReferenceMvpKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-mvp:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-mvp:${stableId}`;
}

function buildStableProviderAdapterSelectionInputKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-input:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-input:${stableId}`;
}

function buildStableProviderAdapterSelectionAdmissionCheckKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-admission-check:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-admission-check:${stableId}`;
}

function buildStableProviderSlotMatrixKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-slot-matrix:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-slot-matrix:${stableId}`;
}

function buildStableProviderSlotRecordKey(
  stableId: ProviderAdapterSelectionMvpId,
  slotOrder: ProviderSlotOrder
): `backend-owned-minimal-manual-gated-provider-slot:${ProviderAdapterSelectionMvpId}:${ProviderSlotOrder}` {
  return `backend-owned-minimal-manual-gated-provider-slot:${stableId}:${slotOrder}`;
}

function buildStableProviderAdapterSelectionOutputKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-output:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-output:${stableId}`;
}

function buildStableOpaqueCredentialReferenceInputKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-opaque-credential-reference-input:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-opaque-credential-reference-input:${stableId}`;
}

function buildStableOpaqueCredentialReferenceOutputKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-opaque-credential-reference-output:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-opaque-credential-reference-output:${stableId}`;
}

function buildStableProviderAdapterSelectionEnvelopeKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-envelope:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-envelope:${stableId}`;
}

function buildStableProviderAdapterSelectionEvidencePreviewKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-evidence-preview:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-evidence-preview:${stableId}`;
}

function buildStableProviderAdapterSelectionAuditPreviewKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-audit-preview:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-audit-preview:${stableId}`;
}

function buildStableProviderAdapterSelectionApprovalPreviewKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-approval-preview:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-approval-preview:${stableId}`;
}

function buildStableProviderAdapterSelectionSafetyGateSummaryKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-safety-gate-summary:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-safety-gate-summary:${stableId}`;
}

function buildStableProviderAdapterSelectionBlockedLiveProviderSummaryKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-blocked-live-provider-summary:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-blocked-live-provider-summary:${stableId}`;
}

function buildStableProviderAdapterSelectionRequestKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-request:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-request:${stableId}`;
}

function buildStableProviderAdapterSelectionResponseKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-response:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-response:${stableId}`;
}

function buildStableProviderAdapterSelectionErrorKey(
  stableId: ProviderAdapterSelectionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-selection-error:${ProviderAdapterSelectionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-error:${stableId}`;
}

function buildCommonFields(seed: ProviderSelectionSeed) {
  return {
    stableId: seed.stableId,
    capabilityFamily: seed.capabilityFamily,
    workspaceTarget: "Athena Command Center" as const,
    providerSlotLabel: seed.providerSlotLabel,
    backupProviderSlotLabel: seed.backupProviderSlotLabel,
    localPrivateAlternativeLabel: seed.localPrivateAlternativeLabel,
    opaqueCredentialReferenceLabel: seed.opaqueCredentialReferenceLabel,
    credentialReferencePosture: "opaque-reference-only" as const,
    credentialValueState: "not present / not read" as const,
    envVarState: "not read" as const,
    providerKeyState: "not read" as const,
    sourceTextAdapterAuditApprovalJoinReviewReference:
      "Backend-owned minimal text adapter audit and approval join review" as const,
    sourceTextAdapterAuditApprovalJoinAcceptancePostureReference:
      "Text adapter audit and approval join acceptance posture" as const,
    sourceTextAdapterAuditApprovalJoinAuditSummaryReference:
      "Text adapter audit and approval join review audit summary" as const,
    sourceTextAdapterResultCaptureReviewReference:
      "Backend-owned minimal text adapter result capture review" as const,
    sourceMinimalTextAdapterReviewReference:
      "Backend-owned minimal text adapter review" as const,
    sourceManualApprovalDecisionReviewReference:
      "Backend-owned synthetic dry-run manual approval decision review" as const,
    backendOwnedPosture: "backend-owned" as const,
    serverOnlyPosture: "server-only" as const,
    providerSelectionPosture: "provider-selection" as const,
    manualGatedPosture: "manual-gated" as const,
    fixtureOnlyPosture: "fixture-only" as const,
    inMemoryOnlyPosture: "in-memory-only" as const,
    noProviderSdkImport: "no provider SDK import" as const,
    noProviderExecution: "no provider execution" as const,
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
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH,
  } as const;
}

function buildProviderSlots(seed: ProviderSelectionSeed): readonly ProviderSlotRecord[] {
  const slotOrders: readonly ProviderSlotOrder[] = [
    "primary",
    "backup",
    "local-private",
    "fallback-disabled",
  ];

  return slotOrders.map((slotOrder) => {
    const slotLabel =
      slotOrder === "primary"
        ? seed.providerSlotLabel
        : slotOrder === "backup"
          ? seed.backupProviderSlotLabel
          : slotOrder === "local-private"
            ? seed.localPrivateAlternativeLabel
            : seed.fallbackDisabledSlotLabel;

    return {
      slotKey: buildStableProviderSlotRecordKey(seed.stableId, slotOrder),
      slotId: buildProviderSelectionPreviewSlotId(seed.stableId, slotOrder),
      slotOrder,
      slotLabel,
      previewState: "preview-only",
      blockedLiveAction:
        slotOrder === "fallback-disabled"
          ? "Fallback execution stays disabled."
          : "Provider execution stays blocked.",
    };
  });
}

const MVP_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): MinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-mvp-v1",
    key: buildStableProviderSelectionCredentialReferenceMvpKey(seed.stableId),
    ...buildCommonFields(seed),
    selectionState:
      "selected-provider-slot-and-opaque-credential-reference-fixture-only",
    providerSelectionId: buildProviderSelectionPreviewId(seed.stableId),
    providerSlotId: buildProviderSelectionPreviewSlotId(seed.stableId, "primary"),
    credentialReferenceId:
      buildProviderSelectionPreviewCredentialReferenceId(seed.stableId),
    selectionDigest: buildProviderSelectionPreviewDigest(seed.stableId),
    selectedProviderState: "preview-only / not executed",
    credentialReferenceState: "opaque reference only / value not read",
    timestampPosture: "static fixture label only / no real timestamp",
    currentReadiness: CURRENT_READINESS,
    reviewRecoveryPreviewNextStatement: REVIEW_RECOVERY_NEXT_STATEMENT,
  })
);

const INPUT_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionInputRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-input-v1",
    key: buildStableProviderAdapterSelectionInputKey(seed.stableId),
    requestVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-request-v1",
    ...buildCommonFields(seed),
    requestState: "deterministic provider selection fixture request only",
    inputState: "deterministic provider selection fixture input only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    selectedProviderPosture: "preview slot only",
    credentialValuePosture: "none / not read",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement:
      "No frontend request. No API route. No provider call. No secret read.",
  })
);

const ADMISSION_CHECK_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionAdmissionCheckRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-admission-check-v1",
    key: buildStableProviderAdapterSelectionAdmissionCheckKey(seed.stableId),
    ...buildCommonFields(seed),
    admissionState:
      "accepted / backend-only / preview-slot-only / opaque-reference-only",
    requiredChecks: [
      "backend-only boundary",
      "server-only provider selection helper exists",
      "manual-gated fixture mode",
      "text adapter audit/approval join review dependency exists",
      "credential reference is opaque label only",
    ],
    blockedLiveAction:
      "Provider adapter selection remains blocked from live provider execution.",
  })
);

const PROVIDER_SLOT_MATRIX_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderSlotMatrixRecord => ({
    version: "backend-owned-minimal-manual-gated-provider-slot-matrix-v1",
    key: buildStableProviderSlotMatrixKey(seed.stableId),
    ...buildCommonFields(seed),
    providerSlotMatrixState: "deterministic provider slot matrix preview only",
    fallbackDisabledSlotLabel: "fallback disabled slot",
    supportedCapabilityState: "supported by text adapter boundary",
    slots: buildProviderSlots(seed),
  })
);

const OUTPUT_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionOutputRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-output-v1",
    key: buildStableProviderAdapterSelectionOutputKey(seed.stableId),
    responseVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-response-v1",
    ...buildCommonFields(seed),
    responseState: "returned by server-only smoke/helper only",
    selectionState:
      "selected-provider-slot-and-opaque-credential-reference-fixture-only",
    providerSelectionId: buildProviderSelectionPreviewId(seed.stableId),
    providerSlotId: buildProviderSelectionPreviewSlotId(seed.stableId, "primary"),
    credentialReferenceId:
      buildProviderSelectionPreviewCredentialReferenceId(seed.stableId),
    selectionDigest: buildProviderSelectionPreviewDigest(seed.stableId),
    selectedProviderState: "preview-only / not executed",
    credentialReferenceState: "opaque reference only / value not read",
    providerSdkImportState: "not imported",
    providerExecutionState: "blocked",
    promptTransmissionState: "not sent",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultReference: buildProviderSelectionPreviewResultReference(seed.stableId),
    auditReference: buildProviderSelectionPreviewAuditReference(seed.stableId),
    approvalReference:
      buildProviderSelectionPreviewApprovalReference(seed.stableId),
    evidencePacketReference:
      buildProviderSelectionPreviewEvidenceReference(seed.stableId),
    timestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    explicitProviderSelectionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement:
      "Provider selection only. No provider output. No secret read. No persistence.",
    currentReadiness: CURRENT_READINESS,
  })
);

const OPAQUE_CREDENTIAL_REFERENCE_INPUT_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): OpaqueCredentialReferenceInputRecord => ({
    version:
      "backend-owned-minimal-manual-gated-opaque-credential-reference-input-v1",
    key: buildStableOpaqueCredentialReferenceInputKey(seed.stableId),
    ...buildCommonFields(seed),
    credentialReferenceInputState: "opaque credential reference input only",
    credentialReferenceId:
      buildProviderSelectionPreviewCredentialReferenceId(seed.stableId),
    credentialValuePosture: "none / not read",
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement:
      "No frontend request. No API route. No provider call. No secret read.",
  })
);

const OPAQUE_CREDENTIAL_REFERENCE_OUTPUT_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): OpaqueCredentialReferenceOutputRecord => ({
    version:
      "backend-owned-minimal-manual-gated-opaque-credential-reference-output-v1",
    key: buildStableOpaqueCredentialReferenceOutputKey(seed.stableId),
    ...buildCommonFields(seed),
    credentialReferenceOutputState: "opaque credential reference output only",
    credentialReferenceId:
      buildProviderSelectionPreviewCredentialReferenceId(seed.stableId),
    credentialReferenceState: "opaque reference only / value not read",
  })
);

const ENVELOPE_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionEnvelopeRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-envelope-v1",
    key: buildStableProviderAdapterSelectionEnvelopeKey(seed.stableId),
    ...buildCommonFields(seed),
    envelopeState: "provider selection envelope preview only",
    providerSelectionId: buildProviderSelectionPreviewId(seed.stableId),
    selectionDigest: buildProviderSelectionPreviewDigest(seed.stableId),
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    providerPayloadPosture: "none",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultReference: buildProviderSelectionPreviewResultReference(seed.stableId),
    auditReference: buildProviderSelectionPreviewAuditReference(seed.stableId),
    approvalReference:
      buildProviderSelectionPreviewApprovalReference(seed.stableId),
    evidencePacketReference:
      buildProviderSelectionPreviewEvidenceReference(seed.stableId),
  })
);

const EVIDENCE_PREVIEW_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionEvidencePreviewRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-evidence-preview-v1",
    key: buildStableProviderAdapterSelectionEvidencePreviewKey(seed.stableId),
    ...buildCommonFields(seed),
    evidencePreviewState: "preview-only / not persisted",
    evidenceSummaryLines: [
      seed.selectedProviderSummary,
      seed.backupProviderSummary,
      "Opaque credential reference label is preview-only and value is never read.",
      "Prompt payload posture remains redacted placeholder only.",
      "No provider response is received and no model output is generated.",
    ],
    evidenceReference:
      buildProviderSelectionPreviewEvidenceReference(seed.stableId),
  })
);

const AUDIT_PREVIEW_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionAuditPreviewRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-audit-preview-v1",
    key: buildStableProviderAdapterSelectionAuditPreviewKey(seed.stableId),
    ...buildCommonFields(seed),
    auditPreviewState: "preview-only / not persisted",
    auditSummaryLines: [
      "Provider selection audit preview is static and backend-owned only.",
      "Credential value is not present and not read.",
      "Env vars are not read and provider key is not read.",
      "No provider SDK import, no provider execution, and no persistence.",
    ],
    auditReference: buildProviderSelectionPreviewAuditReference(seed.stableId),
  })
);

const APPROVAL_PREVIEW_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionApprovalPreviewRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-approval-preview-v1",
    key: buildStableProviderAdapterSelectionApprovalPreviewKey(seed.stableId),
    ...buildCommonFields(seed),
    approvalPreviewState: "preview-only / not persisted",
    approvalSummaryLines: [
      "Approval fixture is preview-only.",
      "Manual confirmation fixture is preview-only.",
      "No real approval request and no real approval recording.",
      "Approval token is not issued and approval lease is not created.",
    ],
    approvalReference:
      buildProviderSelectionPreviewApprovalReference(seed.stableId),
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    approvalRecordingState: "not recorded",
  })
);

const SAFETY_GATE_SUMMARY_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionSafetyGateSummaryRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-safety-gate-summary-v1",
    key: buildStableProviderAdapterSelectionSafetyGateSummaryKey(seed.stableId),
    ...buildCommonFields(seed),
    gateSummaryState: "preview-only blocked live provider summary",
    topGateLabels: cloneList(GATE_SUMMARY_LINES.slice(0, 8)),
    blockedLiveActions: cloneList(BLOCKED_LIVE_ACTIONS),
  })
);

const BLOCKED_LIVE_PROVIDER_SUMMARY_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionBlockedLiveProviderSummaryRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-blocked-live-provider-summary-v1",
    key: buildStableProviderAdapterSelectionBlockedLiveProviderSummaryKey(
      seed.stableId
    ),
    ...buildCommonFields(seed),
    blockedLiveProviderSummaryState:
      "preview-only provider execution blocked summary",
    blockedLiveActions: cloneList(BLOCKED_LIVE_ACTIONS),
  })
);

const REQUEST_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionRequestRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-request-v1",
    key: buildStableProviderAdapterSelectionRequestKey(seed.stableId),
    ...buildCommonFields(seed),
    requestVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-request-v1",
    requestState: "deterministic provider selection fixture request only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    selectedProviderPosture: "preview slot only",
    credentialReferencePosture: "opaque-reference-only",
    credentialValuePosture: "none / not read",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement:
      "No frontend request. No API route. No provider call. No secret read.",
  })
);

const RESPONSE_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionResponseRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-response-v1",
    key: buildStableProviderAdapterSelectionResponseKey(seed.stableId),
    ...buildCommonFields(seed),
    responseVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-response-v1",
    responseState: "returned by server-only smoke/helper only",
    selectionState:
      "selected-provider-slot-and-opaque-credential-reference-fixture-only",
    selectedProviderState: "preview-only / not executed",
    credentialReferenceState: "opaque reference only / value not read",
    providerSdkImportState: "not imported",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitProviderSelectionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement:
      "Provider selection only. No provider output. No secret read. No persistence.",
  })
);

const ERROR_RECORDS = PROVIDER_SELECTION_SEEDS.map(
  (seed): ProviderAdapterSelectionErrorRecord => ({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-error-v1",
    key: buildStableProviderAdapterSelectionErrorKey(seed.stableId),
    ...buildCommonFields(seed),
    errorVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-error-v1",
    errorState: "deterministic preview only",
    failedGateExamples: [
      "credential value detected",
      "provider SDK import attempted",
      "provider call attempted",
      "persistence attempted",
    ],
    missingTextAdapterAuditApprovalJoinReviewExample:
      "Missing text adapter audit/approval join review dependency example.",
    missingProviderSlotExample: "Missing provider slot example.",
    missingOpaqueCredentialReferenceExample:
      "Missing opaque credential reference example.",
    credentialValueDetectedExample: "Credential value detected example.",
    envVarReadAttemptedExample: "Env var read attempted example.",
    providerSdkImportAttemptedExample:
      "Provider SDK import attempted example.",
    providerCallAttemptedExample: "Provider call attempted example.",
    modelCallAttemptedExample: "Model call attempted example.",
    promptTransmissionAttemptedExample:
      "Prompt transmission attempted example.",
    persistenceAttemptedExample: "Persistence attempted example.",
    databaseWriteAttemptedExample: "Database write attempted example.",
    fileWriteAttemptedExample: "File write attempted example.",
    queueWorkerJobAttemptedExample:
      "Queue/worker/job attempted example.",
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    explicitNoLiveErrorNoRetryNoFallbackStatement:
      "No live error. No retry. No fallback.",
  })
);

function buildGateLabel(gateId: ProviderAdapterSelectionGateId): string {
  return gateId.replace(/-/g, " ");
}

const GATE_SEEDS: readonly {
  gateId: ProviderAdapterSelectionGateId;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
}[] = [
  {
    gateId: "backend-only-boundary",
    owner: "Backend runtime",
    requiredState: "backend-owned",
    currentState: "backend-owned",
    evidence: "Selection records declare backend-owned posture only.",
    blockedLiveAction: "frontend request creation",
  },
  {
    gateId: "server-only-provider-selection-module-boundary",
    owner: "Server helper",
    requiredState: "server-only",
    currentState: "server-only",
    evidence: "Provider selection helper is server-only and deterministic.",
    blockedLiveAction: "frontend-callable execution",
  },
  {
    gateId: "provider-selection-fixture-mode",
    owner: "Fixture harness",
    requiredState: "fixture-only",
    currentState: "fixture-only",
    evidence: "Provider slot selection is deterministic fixture-only.",
    blockedLiveAction: "live provider selection",
  },
  {
    gateId: "credential-reference-opaque-only-mode",
    owner: "Credential boundary",
    requiredState: "opaque-reference-only",
    currentState: "opaque-reference-only",
    evidence: "Credential reference remains opaque label only.",
    blockedLiveAction: "credential value exposure",
  },
  {
    gateId: "text-adapter-audit-approval-join-review-dependency",
    owner: "Dependency check",
    requiredState: "present",
    currentState: "present",
    evidence: "Text adapter audit/approval join review dependency is referenced.",
    blockedLiveAction: "provider selection without upstream review",
  },
  {
    gateId: "deterministic-provider-selection-id",
    owner: "Determinism",
    requiredState: "static preview id only",
    currentState: "static preview id only",
    evidence: "Provider selection id is template-built and static.",
    blockedLiveAction: "randomized selection ids",
  },
  {
    gateId: "deterministic-provider-slot-id",
    owner: "Determinism",
    requiredState: "static preview id only",
    currentState: "static preview id only",
    evidence: "Provider slot id is template-built and static.",
    blockedLiveAction: "dynamic slot resolution",
  },
  {
    gateId: "deterministic-credential-reference-id",
    owner: "Determinism",
    requiredState: "static preview id only",
    currentState: "static preview id only",
    evidence: "Credential reference id is template-built and static.",
    blockedLiveAction: "secret-dependent ids",
  },
  {
    gateId: "deterministic-selection-digest",
    owner: "Determinism",
    requiredState: "static preview digest only",
    currentState: "static preview digest only",
    evidence: "Selection digest does not use time-based or random values.",
    blockedLiveAction: "non-deterministic replay",
  },
  {
    gateId: "supported-capability-family",
    owner: "Capability boundary",
    requiredState: "supported by text adapter boundary",
    currentState: "supported by text adapter boundary",
    evidence: "Only text/chat and planning/reasoning are admitted.",
    blockedLiveAction: "unsupported capability execution",
  },
  {
    gateId: "selected-provider-slot-preview-only",
    owner: "Provider slot preview",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "Selected provider slot remains preview-only.",
    blockedLiveAction: "primary provider execution",
  },
  {
    gateId: "backup-provider-slot-preview-only",
    owner: "Provider slot preview",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "Backup provider slot remains preview-only.",
    blockedLiveAction: "backup provider execution",
  },
  {
    gateId: "local-private-alternative-preview-only",
    owner: "Provider slot preview",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "Local/private alternative remains preview-only.",
    blockedLiveAction: "local/private execution",
  },
  {
    gateId: "credential-value-absent",
    owner: "Credential boundary",
    requiredState: "not present",
    currentState: "not present",
    evidence: "Credential value field is absent in all records.",
    blockedLiveAction: "credential value persistence",
  },
  {
    gateId: "credential-value-not-read",
    owner: "Credential boundary",
    requiredState: "not read",
    currentState: "not read",
    evidence: "Credential value state remains not present / not read.",
    blockedLiveAction: "credential value read",
  },
  {
    gateId: "env-vars-not-read",
    owner: "Environment boundary",
    requiredState: "not read",
    currentState: "not read",
    evidence: "Env vars are not read in the helper or catalog.",
    blockedLiveAction: "env var read",
  },
  {
    gateId: "provider-key-not-read",
    owner: "Credential boundary",
    requiredState: "not read",
    currentState: "not read",
    evidence: "Provider key state remains not read.",
    blockedLiveAction: "provider key read",
  },
  {
    gateId: "redacted-prompt-envelope-present",
    owner: "Prompt boundary",
    requiredState: "redacted placeholder only",
    currentState: "redacted placeholder only",
    evidence: "Prompt payload posture remains redacted placeholder only.",
    blockedLiveAction: "prompt payload leakage",
  },
  {
    gateId: "prompt-not-sent",
    owner: "Prompt boundary",
    requiredState: "not sent",
    currentState: "not sent",
    evidence: "Prompt transmission state remains not sent.",
    blockedLiveAction: "prompt sending",
  },
  {
    gateId: "provider-sdk-not-imported",
    owner: "Import boundary",
    requiredState: "not imported",
    currentState: "not imported",
    evidence: "Provider SDK import state remains not imported.",
    blockedLiveAction: "provider SDK import",
  },
  {
    gateId: "provider-response-not-received",
    owner: "Execution boundary",
    requiredState: "not received",
    currentState: "not received",
    evidence: "No provider response is received.",
    blockedLiveAction: "provider response handling",
  },
  {
    gateId: "model-output-not-generated",
    owner: "Execution boundary",
    requiredState: "not generated",
    currentState: "not generated",
    evidence: "No model output is generated.",
    blockedLiveAction: "model output generation",
  },
  {
    gateId: "manual-approval-fixture",
    owner: "Approval preview",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "Approval fixture remains preview-only.",
    blockedLiveAction: "real approval request",
  },
  {
    gateId: "manual-confirmation-fixture",
    owner: "Approval preview",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "Manual confirmation fixture remains preview-only.",
    blockedLiveAction: "manual confirmation capture",
  },
  {
    gateId: "in-memory-only-selection-reference",
    owner: "Persistence boundary",
    requiredState: "preview-only / not persisted",
    currentState: "preview-only / not persisted",
    evidence: "Selection references remain in memory only.",
    blockedLiveAction: "persistent selection storage",
  },
  {
    gateId: "no-real-approval-request",
    owner: "Approval preview",
    requiredState: "not created",
    currentState: "not created",
    evidence: "No real approval request is created.",
    blockedLiveAction: "approval request issuance",
  },
  {
    gateId: "no-real-approval-recording",
    owner: "Approval preview",
    requiredState: "not recorded",
    currentState: "not recorded",
    evidence: "No real approval recording is created.",
    blockedLiveAction: "approval recording",
  },
  {
    gateId: "no-approval-token-issuance",
    owner: "Approval preview",
    requiredState: "not issued",
    currentState: "not issued",
    evidence: "Approval token is not issued.",
    blockedLiveAction: "approval token issuance",
  },
  {
    gateId: "no-approval-lease-issuance",
    owner: "Approval preview",
    requiredState: "not created",
    currentState: "not created",
    evidence: "Approval lease is not created.",
    blockedLiveAction: "approval lease issuance",
  },
  {
    gateId: "no-frontend-request",
    owner: "Frontend boundary",
    requiredState: "not created",
    currentState: "not created",
    evidence: "Frontend request state remains not created.",
    blockedLiveAction: "frontend request creation",
  },
  {
    gateId: "no-api-route",
    owner: "Frontend boundary",
    requiredState: "not created",
    currentState: "not created",
    evidence: "API route state remains not created.",
    blockedLiveAction: "API route creation",
  },
  {
    gateId: "no-fetch-network",
    owner: "Network boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "No fetch/network path exists in the helper or UI.",
    blockedLiveAction: "fetch/network call",
  },
  {
    gateId: "no-provider-sdk-import",
    owner: "Import boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "No provider SDK imports are introduced.",
    blockedLiveAction: "provider SDK import",
  },
  {
    gateId: "no-provider-execution",
    owner: "Execution boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "Provider execution remains blocked.",
    blockedLiveAction: "provider execution",
  },
  {
    gateId: "no-model-call",
    owner: "Execution boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "Model call state remains blocked.",
    blockedLiveAction: "model call",
  },
  {
    gateId: "no-prompt-sending",
    owner: "Prompt boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "No prompt sending path exists.",
    blockedLiveAction: "prompt sending",
  },
  {
    gateId: "no-queue-dispatch",
    owner: "Dispatch boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "No queue dispatch target exists.",
    blockedLiveAction: "queue dispatch",
  },
  {
    gateId: "no-worker-dispatch",
    owner: "Dispatch boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "No worker dispatch target exists.",
    blockedLiveAction: "worker dispatch",
  },
  {
    gateId: "no-job-execution",
    owner: "Dispatch boundary",
    requiredState: "blocked",
    currentState: "blocked",
    evidence: "No job execution target exists.",
    blockedLiveAction: "job execution",
  },
  {
    gateId: "no-result-persistence",
    owner: "Persistence boundary",
    requiredState: "not implemented",
    currentState: "not implemented",
    evidence: "Result persistence state remains not implemented.",
    blockedLiveAction: "result persistence",
  },
  {
    gateId: "no-audit-persistence",
    owner: "Persistence boundary",
    requiredState: "not implemented",
    currentState: "not implemented",
    evidence: "Audit persistence state remains not implemented.",
    blockedLiveAction: "audit persistence",
  },
  {
    gateId: "no-approval-persistence",
    owner: "Persistence boundary",
    requiredState: "not implemented",
    currentState: "not implemented",
    evidence: "Approval persistence state remains not implemented.",
    blockedLiveAction: "approval persistence",
  },
  {
    gateId: "no-database-write",
    owner: "Persistence boundary",
    requiredState: "not implemented",
    currentState: "not implemented",
    evidence: "Database write state remains not implemented.",
    blockedLiveAction: "database write",
  },
  {
    gateId: "no-file-write",
    owner: "Persistence boundary",
    requiredState: "not implemented",
    currentState: "not implemented",
    evidence: "File write state remains not implemented.",
    blockedLiveAction: "file write",
  },
  {
    gateId: "single-run-lock-preview",
    owner: "Replay safety",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "Single-run lock preview exists as a static gate record.",
    blockedLiveAction: "parallel replay",
  },
  {
    gateId: "idempotency-replay-preview",
    owner: "Replay safety",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "Idempotency and replay preview exist as static gate records.",
    blockedLiveAction: "retry/fallback execution",
  },
  {
    gateId: "timeout-cancel-preview",
    owner: "Timeout safety",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "Timeout/cancel preview exists as a static gate record.",
    blockedLiveAction: "long-running live call",
  },
  {
    gateId: "privacy-redaction-preview",
    owner: "Privacy boundary",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "Privacy/redaction preview is static and explicit.",
    blockedLiveAction: "prompt or secret leakage",
  },
  {
    gateId: "kill-switch-fixture",
    owner: "Safety boundary",
    requiredState: "preview-only",
    currentState: "preview-only",
    evidence: "Kill switch fixture remains static and operator-owned.",
    blockedLiveAction: "unsafe execution continuation",
  },
] as const;

const GATE_RECORDS = PROVIDER_SELECTION_SEEDS.flatMap((seed) =>
  GATE_SEEDS.map(
    (gateSeed): ProviderAdapterSelectionGateRecord => ({
      version:
        "backend-owned-minimal-manual-gated-provider-adapter-selection-gate-v1",
      key: `${seed.stableId}:${gateSeed.gateId}`,
      stableId: seed.stableId,
      capabilityFamily: seed.capabilityFamily,
      gateId: gateSeed.gateId,
      label: buildGateLabel(gateSeed.gateId),
      owner: gateSeed.owner,
      requiredState: gateSeed.requiredState,
      currentState: gateSeed.currentState,
      evidence: gateSeed.evidence,
      blockedLiveAction: gateSeed.blockedLiveAction,
      nextReviewRecoveryRequirement:
        NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH,
    })
  )
);

const READINESS_SEEDS: readonly {
  readinessId: ProviderAdapterSelectionReadinessId;
  label: string;
  state: string;
  evidence: string;
  nextSafeAction: string;
}[] = [
  {
    readinessId: "server-only-provider-selection-helper-state",
    label: "Server-only provider selection helper state",
    state: "implemented",
    evidence: "Deterministic helper exists in a server-only module.",
    nextSafeAction: "Keep helper backend-only.",
  },
  {
    readinessId: "text-adapter-audit-approval-join-review-dependency-state",
    label: "Text adapter audit/approval join review dependency",
    state: "present",
    evidence: "Previous review layer is referenced as the upstream boundary.",
    nextSafeAction: "Reuse the upstream review dependency without widening it.",
  },
  {
    readinessId: "provider-selection-input-state",
    label: "Provider selection input state",
    state: "typed fixture only",
    evidence: "Input record is deterministic and redacted.",
    nextSafeAction: "Do not accept live input yet.",
  },
  {
    readinessId: "provider-selection-admission-check-state",
    label: "Provider selection admission check state",
    state: "typed preview only",
    evidence: "Admission records are backend-only and explicit.",
    nextSafeAction: "Keep admission preview-only.",
  },
  {
    readinessId: "provider-slot-matrix-state",
    label: "Provider slot matrix state",
    state: "typed preview only",
    evidence: "Primary, backup, local/private, and fallback-disabled slots are declared.",
    nextSafeAction: "Do not execute slot choices.",
  },
  {
    readinessId: "provider-slot-selection-output-state",
    label: "Provider slot selection output state",
    state: "typed preview only",
    evidence: "Selection output resolves a provider slot and opaque reference label only.",
    nextSafeAction: "Keep output in memory only.",
  },
  {
    readinessId: "opaque-credential-reference-input-state",
    label: "Opaque credential reference input state",
    state: "typed preview only",
    evidence: "Credential reference input is label-only and opaque.",
    nextSafeAction: "Do not introduce value reads.",
  },
  {
    readinessId: "opaque-credential-reference-output-state",
    label: "Opaque credential reference output state",
    state: "typed preview only",
    evidence: "Credential reference output remains opaque label only.",
    nextSafeAction: "Keep output opaque-reference-only.",
  },
  {
    readinessId: "selection-envelope-state",
    label: "Selection envelope state",
    state: "typed preview only",
    evidence: "Selection envelope is redacted and static.",
    nextSafeAction: "Do not create live request envelopes.",
  },
  {
    readinessId: "evidence-preview-state",
    label: "Evidence preview state",
    state: "preview-only / not persisted",
    evidence: "Evidence preview exists as a static in-memory packet.",
    nextSafeAction: "Keep evidence non-persistent.",
  },
  {
    readinessId: "audit-preview-state",
    label: "Audit preview state",
    state: "preview-only / not persisted",
    evidence: "Audit preview exists without persistence.",
    nextSafeAction: "Keep audit preview non-persistent.",
  },
  {
    readinessId: "approval-preview-state",
    label: "Approval preview state",
    state: "preview-only / not persisted",
    evidence: "Approval preview exists without request, recording, token, or lease.",
    nextSafeAction: "Keep approval preview static.",
  },
  {
    readinessId: "credential-value-boundary-state",
    label: "Credential value boundary state",
    state: "blocked",
    evidence: "Credential value is not present and not read.",
    nextSafeAction: "Do not add secret reads.",
  },
  {
    readinessId: "env-var-boundary-state",
    label: "Env var boundary state",
    state: "blocked",
    evidence: "Env vars are not read.",
    nextSafeAction: "Do not add env var reads.",
  },
  {
    readinessId: "provider-sdk-boundary-state",
    label: "Provider SDK boundary state",
    state: "blocked",
    evidence: "No provider SDK imports exist in this MVP.",
    nextSafeAction: "Keep provider SDK imports out.",
  },
  {
    readinessId: "provider-execution-boundary-state",
    label: "Provider execution boundary state",
    state: "blocked",
    evidence: "Provider execution remains blocked.",
    nextSafeAction: "Do not execute provider adapters.",
  },
  {
    readinessId: "prompt-boundary-state",
    label: "Prompt boundary state",
    state: "blocked",
    evidence: "Prompt payload posture is redacted and prompt transmission is not sent.",
    nextSafeAction: "Do not send prompts.",
  },
  {
    readinessId: "model-boundary-state",
    label: "Model boundary state",
    state: "blocked",
    evidence: "No model calls and no model output.",
    nextSafeAction: "Do not call models.",
  },
  {
    readinessId: "frontend-request-boundary-state",
    label: "Frontend request boundary state",
    state: "blocked",
    evidence: "No frontend request is created.",
    nextSafeAction: "Keep provider selection server-only.",
  },
  {
    readinessId: "api-route-boundary-state",
    label: "API route boundary state",
    state: "blocked",
    evidence: "No API route is created.",
    nextSafeAction: "Do not expose API routes for this MVP.",
  },
  {
    readinessId: "queue-boundary-state",
    label: "Queue boundary state",
    state: "blocked",
    evidence: "No queue dispatch target exists.",
    nextSafeAction: "Do not enqueue work.",
  },
  {
    readinessId: "worker-boundary-state",
    label: "Worker boundary state",
    state: "blocked",
    evidence: "No worker dispatch target exists.",
    nextSafeAction: "Do not dispatch workers.",
  },
  {
    readinessId: "job-boundary-state",
    label: "Job boundary state",
    state: "blocked",
    evidence: "No job execution target exists.",
    nextSafeAction: "Do not create jobs.",
  },
  {
    readinessId: "result-persistence-boundary-state",
    label: "Result persistence boundary state",
    state: "not implemented",
    evidence: "Result persistence stays unimplemented.",
    nextSafeAction: "Keep result persistence blocked.",
  },
  {
    readinessId: "audit-persistence-boundary-state",
    label: "Audit persistence boundary state",
    state: "not implemented",
    evidence: "Audit persistence stays unimplemented.",
    nextSafeAction: "Keep audit persistence blocked.",
  },
  {
    readinessId: "approval-persistence-boundary-state",
    label: "Approval persistence boundary state",
    state: "not implemented",
    evidence: "Approval persistence stays unimplemented.",
    nextSafeAction: "Keep approval persistence blocked.",
  },
  {
    readinessId: "database-boundary-state",
    label: "Database boundary state",
    state: "not implemented",
    evidence: "Database writes stay unimplemented.",
    nextSafeAction: "Do not add database writes.",
  },
  {
    readinessId: "file-boundary-state",
    label: "File boundary state",
    state: "not implemented",
    evidence: "File writes stay unimplemented.",
    nextSafeAction: "Do not add file writes.",
  },
] as const;

const READINESS_RECORDS = PROVIDER_SELECTION_SEEDS.flatMap((seed) =>
  READINESS_SEEDS.map(
    (readinessSeed): ProviderAdapterSelectionReadinessMatrixRecord => ({
      version:
        "backend-owned-minimal-manual-gated-provider-adapter-selection-readiness-matrix-v1",
      key: `${seed.stableId}:${readinessSeed.readinessId}`,
      stableId: seed.stableId,
      capabilityFamily: seed.capabilityFamily,
      readinessId: readinessSeed.readinessId,
      label: readinessSeed.label,
      state: readinessSeed.state,
      evidence: readinessSeed.evidence,
      currentReadiness: CURRENT_READINESS,
      nextSafeAction: readinessSeed.nextSafeAction,
    })
  )
);

function cloneSlots(
  slots: readonly ProviderSlotRecord[]
): readonly ProviderSlotRecord[] {
  return slots.map((slot) => ({ ...slot }));
}

export function listMinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecords():
  readonly MinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecord[] {
  return MVP_RECORDS.map((record) => ({ ...record }));
}

export function listProviderAdapterSelectionInputs():
  readonly ProviderAdapterSelectionInputRecord[] {
  return INPUT_RECORDS.map((record) => ({ ...record }));
}

export function listProviderAdapterSelectionAdmissionChecks():
  readonly ProviderAdapterSelectionAdmissionCheckRecord[] {
  return ADMISSION_CHECK_RECORDS.map((record) => ({
    ...record,
    requiredChecks: cloneList(record.requiredChecks),
  }));
}

export function listProviderSlotMatrixRecords():
  readonly ProviderSlotMatrixRecord[] {
  return PROVIDER_SLOT_MATRIX_RECORDS.map((record) => ({
    ...record,
    slots: cloneSlots(record.slots),
  }));
}

export function listProviderAdapterSelectionOutputs():
  readonly ProviderAdapterSelectionOutputRecord[] {
  return OUTPUT_RECORDS.map((record) => ({ ...record }));
}

export function listOpaqueCredentialReferenceInputs():
  readonly OpaqueCredentialReferenceInputRecord[] {
  return OPAQUE_CREDENTIAL_REFERENCE_INPUT_RECORDS.map((record) => ({
    ...record,
  }));
}

export function listOpaqueCredentialReferenceOutputs():
  readonly OpaqueCredentialReferenceOutputRecord[] {
  return OPAQUE_CREDENTIAL_REFERENCE_OUTPUT_RECORDS.map((record) => ({
    ...record,
  }));
}

export function listProviderAdapterSelectionEnvelopes():
  readonly ProviderAdapterSelectionEnvelopeRecord[] {
  return ENVELOPE_RECORDS.map((record) => ({ ...record }));
}

export function listProviderAdapterSelectionEvidencePreviews():
  readonly ProviderAdapterSelectionEvidencePreviewRecord[] {
  return EVIDENCE_PREVIEW_RECORDS.map((record) => ({
    ...record,
    evidenceSummaryLines: cloneList(record.evidenceSummaryLines),
  }));
}

export function listProviderAdapterSelectionAuditPreviews():
  readonly ProviderAdapterSelectionAuditPreviewRecord[] {
  return AUDIT_PREVIEW_RECORDS.map((record) => ({
    ...record,
    auditSummaryLines: cloneList(record.auditSummaryLines),
  }));
}

export function listProviderAdapterSelectionApprovalPreviews():
  readonly ProviderAdapterSelectionApprovalPreviewRecord[] {
  return APPROVAL_PREVIEW_RECORDS.map((record) => ({
    ...record,
    approvalSummaryLines: cloneList(record.approvalSummaryLines),
  }));
}

export function listProviderAdapterSelectionSafetyGateSummaries():
  readonly ProviderAdapterSelectionSafetyGateSummaryRecord[] {
  return SAFETY_GATE_SUMMARY_RECORDS.map((record) => ({
    ...record,
    topGateLabels: cloneList(record.topGateLabels),
    blockedLiveActions: cloneList(record.blockedLiveActions),
  }));
}

export function listProviderAdapterSelectionBlockedLiveProviderSummaries():
  readonly ProviderAdapterSelectionBlockedLiveProviderSummaryRecord[] {
  return BLOCKED_LIVE_PROVIDER_SUMMARY_RECORDS.map((record) => ({
    ...record,
    blockedLiveActions: cloneList(record.blockedLiveActions),
  }));
}

export function listProviderAdapterSelectionRequestRecords():
  readonly ProviderAdapterSelectionRequestRecord[] {
  return REQUEST_RECORDS.map((record) => ({ ...record }));
}

export function listProviderAdapterSelectionResponseRecords():
  readonly ProviderAdapterSelectionResponseRecord[] {
  return RESPONSE_RECORDS.map((record) => ({ ...record }));
}

export function listProviderAdapterSelectionErrorRecords():
  readonly ProviderAdapterSelectionErrorRecord[] {
  return ERROR_RECORDS.map((record) => ({
    ...record,
    failedGateExamples: cloneList(record.failedGateExamples),
  }));
}

export function listProviderAdapterSelectionGates():
  readonly ProviderAdapterSelectionGateRecord[] {
  return GATE_RECORDS.map((record) => ({ ...record }));
}

export function listProviderAdapterSelectionReadinessMatrixRecords():
  readonly ProviderAdapterSelectionReadinessMatrixRecord[] {
  return READINESS_RECORDS.map((record) => ({ ...record }));
}

export function buildProviderAdapterSelectionSummary():
  ProviderAdapterSelectionSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-summary-v1",
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH,
    currentReadiness: CURRENT_READINESS,
    mvpCount: MVP_RECORDS.length,
    slotMatrixCount: PROVIDER_SLOT_MATRIX_RECORDS.length,
    opaqueCredentialReferenceCount:
      OPAQUE_CREDENTIAL_REFERENCE_OUTPUT_RECORDS.length,
    summaryLines: cloneList(SUMMARY_LINES),
  };
}

export function buildProviderAdapterSelectionGateSummary():
  ProviderAdapterSelectionGateSummary {
  const gates = listProviderAdapterSelectionGates();

  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-gate-summary-v1",
    gateCount: gates.length,
    blockedLiveActionCount: BLOCKED_LIVE_ACTIONS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(GATE_SUMMARY_LINES),
  };
}

export function buildProviderAdapterSelectionReadinessSummary():
  ProviderAdapterSelectionReadinessSummary {
  const readiness = listProviderAdapterSelectionReadinessMatrixRecords();

  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-readiness-summary-v1",
    readinessCount: readiness.length,
    currentReadiness: CURRENT_READINESS,
    nextSafeAction:
      "Review provider adapter selection evidence preview before adding review/recovery overlays.",
    summaryLines: cloneList(READINESS_SUMMARY_LINES),
  };
}

export function buildNextProviderSelectionCredentialReferenceReviewRecoveryChecklist():
  ProviderAdapterSelectionReviewRecoveryChecklist {
  return cloneList(REVIEW_RECOVERY_CHECKLIST);
}

function findRequired<T>(
  records: readonly T[],
  predicate: (record: T) => boolean,
  label: string
): T {
  const record = records.find(predicate);

  if (!record) {
    throw new Error(`Missing ${label}.`);
  }

  return record;
}

export function buildStaticProviderSelectionServerRunRecord(
  stableId: ProviderAdapterSelectionMvpId
): MinimalProviderAdapterSelectionServerRunRecord {
  const outputRecord = findRequired(
    OUTPUT_RECORDS,
    (record) => record.stableId === stableId,
    `provider adapter selection output for ${stableId}`
  );

  return {
    ...outputRecord,
    promptPayloadPosture: "redacted placeholder only",
    providerPayloadPosture: "none",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    queueDispatchState: "blocked",
    workerDispatchState: "blocked",
    jobExecutionState: "blocked",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    noFrontendRequestStatement: "no frontend request is created",
    noApiRouteStatement: "no API route is created",
    noProviderCallStatement: "no provider call exists",
    noModelCallStatement: "no model call exists",
    reviewRecoveryPreviewNextStatement: REVIEW_RECOVERY_NEXT_STATEMENT,
  };
}
