import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH,
  type MinimalManualGatedProviderAdapterDryRunAdmissionMvpRecord,
  type MinimalProviderDryRunAdmissionServerRunRecord,
  type ProviderDryRunAdmissionCheckRecord,
  type ProviderDryRunAdmissionCurrentReadiness,
  type ProviderDryRunAdmissionEnvelopeRecord,
  type ProviderDryRunAdmissionErrorRecord,
  type ProviderDryRunFallbackPosture,
  type ProviderDryRunAdmissionGateId,
  type ProviderDryRunAdmissionGateRecord,
  type ProviderDryRunAdmissionGateSummary,
  type ProviderDryRunAdmissionInputRecord,
  type ProviderDryRunAdmissionMode,
  type ProviderDryRunAdmissionMvpId,
  type ProviderDryRunAdmissionOutputRecord,
  type ProviderDryRunAdmissionProviderSlotLabel,
  type ProviderDryRunAdmissionReadinessSummary,
  type ProviderDryRunAdmissionResponseRecord,
  type ProviderDryRunAdmissionReviewRecoveryChecklist,
  type ProviderDryRunReviewRecoveryNextStatement,
  type ProviderDryRunSafetyGateSummaryRecord,
  type ProviderDryRunAdmissionSummary,
  type ProviderDryRunAdmissionRequestRecord,
  type ProviderDryRunApprovalPreviewRecord,
  type ProviderDryRunAuditPreviewRecord,
  type ProviderDryRunBlockedExecutionSummaryRecord,
  type ProviderDryRunCredentialReferenceState,
  type ProviderDryRunEvidencePreviewRecord,
  type ProviderDryRunIntentPreviewRecord,
  type ProviderDryRunReadinessId,
  type ProviderDryRunReadinessMatrixRecord,
  type ProviderDryRunSelectedProviderState,
  type ProviderDryRunSlotOrder,
} from "./min-provider-admit-types";

type ProviderDryRunAdmissionSeed = Readonly<{
  stableId: ProviderDryRunAdmissionMvpId;
  capabilityFamilyId: "text-chat" | "planning-reasoning";
  capabilityFamily: "text/chat" | "planning/reasoning";
  providerSlotLabel: ProviderDryRunAdmissionProviderSlotLabel;
  backupProviderSlotLabel: ProviderDryRunAdmissionProviderSlotLabel;
  localPrivateAlternativeLabel: "local/private text provider dry-run slot";
  opaqueCredentialReferenceLabel:
    | "opaque credential reference label / athena dry-run text chat primary"
    | "opaque credential reference label / athena dry-run planning reasoning primary";
  admissionState:
    | "admitted-for-backend-dry-run-preview-only"
    | "blocked-for-backend-dry-run-preview-only";
  gateBlockReason: string;
  killSwitchState: "available / not engaged" | "engaged / preview admission blocked";
}>;

type GateSeed = Readonly<{
  gateId: ProviderDryRunAdmissionGateId;
  label: string;
  owner: string;
  requiredState: string;
  currentState: (seed: ProviderDryRunAdmissionSeed) => string;
  evidence: (seed: ProviderDryRunAdmissionSeed) => string;
  blockedLiveAction: string;
}>;

type ReadinessSeed = Readonly<{
  readinessId: ProviderDryRunReadinessId;
  label: string;
  state: string;
  evidence: string;
}>;

const CURRENT_READINESS: ProviderDryRunAdmissionCurrentReadiness =
  "minimal-provider-dry-run-admission-mvp-only / backend-only / admission-only / credential-reference-only / fixture-only / not-provider-executing / not persistent";

const ADMISSION_MODE: ProviderDryRunAdmissionMode =
  "deterministic-fixture-only";

const REVIEW_RECOVERY_NEXT_STATEMENT: ProviderDryRunReviewRecoveryNextStatement =
  "provider adapter dry-run admission review and recovery preview comes next";

const RETRY_POSTURE: ProviderDryRunFallbackPosture = "disabled";
const FALLBACK_POSTURE: ProviderDryRunFallbackPosture = "disabled";

const SUMMARY_LINES = [
  "backend-owned minimal manual-gated provider adapter dry-run admission MVP only",
  "provider adapter dry-run admission is backend-only",
  "server-only provider dry-run admission helper exists",
  "provider dry-run admission is deterministic fixture-only",
  "dry-run intent is preview-only",
  "dry-run execution is blocked",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "backup provider slot is preview-only",
  "local/private alternative is preview-only",
  "provider adapter dry-run admission is not provider-executing yet",
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
  "backend-owned minimal manual-gated provider adapter dry-run admission review and recovery preview next",
] as const;

const GATE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only dry-run admission module boundary",
  "provider dry-run admission fixture mode",
  "provider selection credential reference review dependency",
  "credential reference opaque-only mode",
  "deterministic provider dry-run admission id",
  "deterministic provider slot id",
  "deterministic credential reference id",
  "deterministic admission digest",
  "supported capability family",
  "selected provider slot preview-only",
  "backup provider slot preview-only",
  "local/private alternative preview-only",
  "dry-run intent preview-only",
  "dry-run execution blocked",
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
  "in-memory only admission reference",
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
  "server-only dry-run admission helper state",
  "provider selection credential reference review dependency",
  "provider dry-run admission input state",
  "provider dry-run admission check state",
  "provider dry-run admission output state",
  "provider dry-run admission envelope state",
  "provider dry-run intent preview state",
  "provider dry-run blocked execution summary state",
  "provider dry-run evidence preview state",
  "provider dry-run audit preview state",
  "provider dry-run approval preview state",
  "credential value boundary state",
  "env var boundary state",
  "provider key boundary state",
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
  "Review the deterministic provider dry-run admission fixtures before adding review and recovery overlays.",
  "Keep provider dry-run admission backend-only, server-only, deterministic, fixture-only, and in-memory only.",
  "Do not add credential value reads, env var reads, provider key reads, provider SDK imports, provider execution, prompt sending, or model calls.",
  "Do not add frontend requests, API routes, queue dispatch, worker dispatch, job execution, result persistence, audit persistence, approval persistence, database writes, or file writes.",
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
] as const satisfies ProviderDryRunAdmissionReviewRecoveryChecklist;

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

const PROVIDER_DRY_RUN_ADMISSION_SEEDS = [
  {
    stableId: "text-chat-provider-dry-run-admission",
    capabilityFamilyId: "text-chat",
    capabilityFamily: "text/chat",
    providerSlotLabel: "OpenAI-compatible text provider dry-run slot",
    backupProviderSlotLabel: "Anthropic-compatible text provider dry-run slot",
    localPrivateAlternativeLabel: "local/private text provider dry-run slot",
    opaqueCredentialReferenceLabel:
      "opaque credential reference label / athena dry-run text chat primary",
    admissionState: "admitted-for-backend-dry-run-preview-only",
    gateBlockReason:
      "All deterministic dry-run admission gates pass for preview-only backend admission.",
    killSwitchState: "available / not engaged",
  },
  {
    stableId: "planning-reasoning-provider-dry-run-admission",
    capabilityFamilyId: "planning-reasoning",
    capabilityFamily: "planning/reasoning",
    providerSlotLabel: "Gemini-compatible text provider dry-run slot",
    backupProviderSlotLabel: "fallback disabled dry-run slot",
    localPrivateAlternativeLabel: "local/private text provider dry-run slot",
    opaqueCredentialReferenceLabel:
      "opaque credential reference label / athena dry-run planning reasoning primary",
    admissionState: "blocked-for-backend-dry-run-preview-only",
    gateBlockReason:
      "The kill switch fixture is engaged for the planning/reasoning preview sample.",
    killSwitchState: "engaged / preview admission blocked",
  },
] as const satisfies readonly ProviderDryRunAdmissionSeed[];

function cloneList<T>(items: readonly T[]): readonly T[] {
  return items.map((item) => item);
}

function buildProviderDryRunAdmissionPreviewId(
  stableId: ProviderDryRunAdmissionMvpId
): `provider-dry-run-admission-preview:${ProviderDryRunAdmissionMvpId}` {
  return `provider-dry-run-admission-preview:${stableId}`;
}

function buildProviderDryRunPreviewSlotId(
  stableId: ProviderDryRunAdmissionMvpId,
  slotOrder: ProviderDryRunSlotOrder
): `provider-dry-run-slot-preview:${ProviderDryRunAdmissionMvpId}:${ProviderDryRunSlotOrder}` {
  return `provider-dry-run-slot-preview:${stableId}:${slotOrder}`;
}

function buildProviderDryRunPreviewCredentialReferenceId(
  stableId: ProviderDryRunAdmissionMvpId
): `provider-dry-run-credential-reference-preview:${ProviderDryRunAdmissionMvpId}` {
  return `provider-dry-run-credential-reference-preview:${stableId}`;
}

function buildProviderDryRunPreviewDigest(
  stableId: ProviderDryRunAdmissionMvpId
): `provider-dry-run-admission-digest-preview:${ProviderDryRunAdmissionMvpId}:fixture-only` {
  return `provider-dry-run-admission-digest-preview:${stableId}:fixture-only`;
}

function buildProviderDryRunPreviewResultReference(
  stableId: ProviderDryRunAdmissionMvpId
): `provider-dry-run-result-reference-preview:${ProviderDryRunAdmissionMvpId}` {
  return `provider-dry-run-result-reference-preview:${stableId}`;
}

function buildProviderDryRunPreviewAuditReference(
  stableId: ProviderDryRunAdmissionMvpId
): `provider-dry-run-audit-reference-preview:${ProviderDryRunAdmissionMvpId}` {
  return `provider-dry-run-audit-reference-preview:${stableId}`;
}

function buildProviderDryRunPreviewApprovalReference(
  stableId: ProviderDryRunAdmissionMvpId
): `provider-dry-run-approval-reference-preview:${ProviderDryRunAdmissionMvpId}` {
  return `provider-dry-run-approval-reference-preview:${stableId}`;
}

function buildProviderDryRunPreviewEvidenceReference(
  stableId: ProviderDryRunAdmissionMvpId
): `provider-dry-run-evidence-reference-preview:${ProviderDryRunAdmissionMvpId}` {
  return `provider-dry-run-evidence-reference-preview:${stableId}`;
}

export function buildStableProviderDryRunAdmissionMvpKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-mvp:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-mvp:${stableId}`;
}

function buildStableProviderDryRunAdmissionInputKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-input:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-input:${stableId}`;
}

function buildStableProviderDryRunAdmissionCheckKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-check:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-check:${stableId}`;
}

function buildStableProviderDryRunAdmissionOutputKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output:${stableId}`;
}

function buildStableProviderDryRunAdmissionEnvelopeKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-envelope:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-envelope:${stableId}`;
}

function buildStableProviderDryRunIntentPreviewKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-intent-preview:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-intent-preview:${stableId}`;
}

function buildStableProviderDryRunBlockedExecutionSummaryKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-blocked-execution-summary:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-blocked-execution-summary:${stableId}`;
}

function buildStableProviderDryRunEvidencePreviewKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-evidence-preview:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-evidence-preview:${stableId}`;
}

function buildStableProviderDryRunAuditPreviewKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview:${stableId}`;
}

function buildStableProviderDryRunApprovalPreviewKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview:${stableId}`;
}

function buildStableProviderDryRunSafetyGateSummaryKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-safety-gate-summary:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-safety-gate-summary:${stableId}`;
}

function buildStableProviderDryRunAdmissionRequestKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-request:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-request:${stableId}`;
}

function buildStableProviderDryRunAdmissionResponseKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-response:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-response:${stableId}`;
}

function buildStableProviderDryRunAdmissionErrorKey(
  stableId: ProviderDryRunAdmissionMvpId
): `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-error:${ProviderDryRunAdmissionMvpId}` {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-error:${stableId}`;
}

function buildCommonFields(seed: ProviderDryRunAdmissionSeed) {
  return {
    stableId: seed.stableId,
    capabilityFamily: seed.capabilityFamily,
    workspaceTarget: "Athena Command Center",
    providerSlotLabel: seed.providerSlotLabel,
    backupProviderSlotLabel: seed.backupProviderSlotLabel,
    localPrivateAlternativeLabel: seed.localPrivateAlternativeLabel,
    opaqueCredentialReferenceLabel: seed.opaqueCredentialReferenceLabel,
    credentialReferencePosture: "opaque-reference-only",
    credentialValueState: "not present / not read",
    envVarState: "not read",
    providerKeyState: "not read",
    sourceProviderSelectionCredentialReferenceReviewReference:
      "Backend-owned minimal provider adapter selection and credential reference review",
    sourceProviderSelectionCredentialReferenceAcceptancePostureReference:
      "Provider adapter selection acceptance posture",
    sourceProviderSelectionCredentialReferenceAuditSummaryReference:
      "Provider adapter selection review audit summary",
    sourceProviderSelectionCredentialReferenceMvpReference:
      "Backend-owned minimal manual-gated provider adapter selection and credential reference MVP",
    sourceTextAdapterAuditApprovalJoinReviewReference:
      "Backend-owned minimal text adapter audit and approval join review",
    sourceTextAdapterResultCaptureReviewReference:
      "Backend-owned minimal text adapter result capture review",
    sourceManualApprovalDecisionReviewReference:
      "Backend-owned synthetic dry-run manual approval decision review",
    backendOwnedPosture: "backend-owned",
    serverOnlyPosture: "server-only",
    dryRunAdmissionPosture: "provider-dry-run-admission",
    manualGatedPosture: "manual-gated",
    fixtureOnlyPosture: "fixture-only",
    inMemoryOnlyPosture: "in-memory-only",
    noProviderSdkImport: "no provider SDK import",
    noProviderExecution: "no provider execution",
    noModelCalls: "no model calls",
    noPromptSending: "no prompt sending",
    noFrontendRequest: "no frontend request",
    noApiRoute: "no API route",
    noQueueWorkerJobDispatch: "no queue/worker/job dispatch",
    noPersistence: "no persistence",
    noDatabaseWrites: "no database writes",
    noFileWrites: "no file writes",
    noResultPersistence: "no result persistence",
    noAuditPersistence: "no audit persistence",
    noApprovalPersistence: "no approval persistence",
    noApprovalRecording: "no approval recording",
    noApprovalTokenIssuance: "no approval token issuance",
    noApprovalLeaseIssuance: "no approval lease issuance",
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
  } as const;
}

function buildSelectedProviderState(): ProviderDryRunSelectedProviderState {
  return "preview-only / not executed";
}

function buildCredentialReferenceState(): ProviderDryRunCredentialReferenceState {
  return "opaque reference only / value not read";
}

function buildEvidenceSummaryLines(
  seed: ProviderDryRunAdmissionSeed
): readonly string[] {
  return [
    `admission state: ${seed.admissionState}`,
    "redacted prompt envelope fixture / provider dry-run preview",
    "opaque credential reference only / no credential value present",
    seed.gateBlockReason,
  ] as const;
}

function buildAuditSummaryLines(
  seed: ProviderDryRunAdmissionSeed
): readonly string[] {
  return [
    "audit preview only / not persisted",
    `admission digest: ${buildProviderDryRunPreviewDigest(seed.stableId)}`,
    "provider response not received / model output not generated",
    "no result persistence / no audit persistence / no approval persistence",
  ] as const;
}

function buildApprovalSummaryLines(
  seed: ProviderDryRunAdmissionSeed
): readonly string[] {
  return [
    "approval fixture is preview-only",
    "manual confirmation fixture is preview-only",
    "no real approval request",
    "no real approval recording",
    "approval token is not issued",
    seed.admissionState === "blocked-for-backend-dry-run-preview-only"
      ? "approval lease remains not created because the kill switch fixture is engaged"
      : "approval lease is not created",
  ] as const;
}

const GATE_SEEDS = [
  {
    gateId: "backend-only-boundary",
    label: "Backend-only boundary",
    owner: "Athena backend boundary",
    requiredState: "backend-owned",
    currentState: () => "backend-owned",
    evidence: () => "Dry-run admission fixtures stay backend-owned only.",
    blockedLiveAction: "frontend-callable dry-run admission",
  },
  {
    gateId: "server-only-dry-run-admission-module-boundary",
    label: "Server-only dry-run admission module boundary",
    owner: "Server-only provider adapter helper",
    requiredState: "server-only",
    currentState: () => "server-only",
    evidence: () => "The provider dry-run admission helper is server-only.",
    blockedLiveAction: "frontend module execution",
  },
  {
    gateId: "provider-dry-run-admission-fixture-mode",
    label: "Provider dry-run admission fixture mode",
    owner: "Fixture gate",
    requiredState: "fixture-only",
    currentState: () => "fixture-only",
    evidence: () => "Only deterministic fixtures are available.",
    blockedLiveAction: "live provider dry-run request",
  },
  {
    gateId: "provider-selection-credential-reference-review-dependency",
    label: "Provider selection credential reference review dependency",
    owner: "Provider selection review dependency",
    requiredState: "present",
    currentState: () => "present",
    evidence: () =>
      "Provider selection review, acceptance posture, audit summary, and MVP source references are present.",
    blockedLiveAction: "admission without provider selection review",
  },
  {
    gateId: "credential-reference-opaque-only-mode",
    label: "Credential reference opaque-only mode",
    owner: "Credential boundary",
    requiredState: "opaque-reference-only",
    currentState: () => "opaque-reference-only",
    evidence: () => "Only opaque credential reference labels are present.",
    blockedLiveAction: "credential value read",
  },
  {
    gateId: "deterministic-provider-dry-run-admission-id",
    label: "Deterministic provider dry-run admission id",
    owner: "Deterministic identity",
    requiredState: "deterministic preview id",
    currentState: () => "deterministic preview id",
    evidence: (seed) =>
      `preview id ${buildProviderDryRunAdmissionPreviewId(seed.stableId)} is deterministic`,
    blockedLiveAction: "random preview id generation",
  },
  {
    gateId: "deterministic-provider-slot-id",
    label: "Deterministic provider slot id",
    owner: "Deterministic identity",
    requiredState: "deterministic preview id",
    currentState: () => "deterministic preview id",
    evidence: (seed) =>
      `slot id ${buildProviderDryRunPreviewSlotId(seed.stableId, "selected")} is deterministic`,
    blockedLiveAction: "random provider slot id generation",
  },
  {
    gateId: "deterministic-credential-reference-id",
    label: "Deterministic credential reference id",
    owner: "Deterministic identity",
    requiredState: "deterministic preview id",
    currentState: () => "deterministic preview id",
    evidence: (seed) =>
      `credential reference id ${buildProviderDryRunPreviewCredentialReferenceId(seed.stableId)} is deterministic`,
    blockedLiveAction: "random credential reference id generation",
  },
  {
    gateId: "deterministic-admission-digest",
    label: "Deterministic admission digest",
    owner: "Deterministic identity",
    requiredState: "deterministic preview digest",
    currentState: () => "deterministic preview digest",
    evidence: (seed) =>
      `digest ${buildProviderDryRunPreviewDigest(seed.stableId)} is deterministic`,
    blockedLiveAction: "random admission digest generation",
  },
  {
    gateId: "supported-capability-family",
    label: "Supported capability family",
    owner: "Text adapter boundary",
    requiredState: "supported by text adapter boundary",
    currentState: () => "supported by text adapter boundary",
    evidence: () => "Only text/chat and planning/reasoning fixtures are present.",
    blockedLiveAction: "unsupported capability family admission",
  },
  {
    gateId: "selected-provider-slot-preview-only",
    label: "Selected provider slot preview-only",
    owner: "Provider slot boundary",
    requiredState: "preview-only",
    currentState: () => "preview-only",
    evidence: (seed) => `${seed.providerSlotLabel} remains preview-only.`,
    blockedLiveAction: "provider slot execution",
  },
  {
    gateId: "backup-provider-slot-preview-only",
    label: "Backup provider slot preview-only",
    owner: "Provider slot boundary",
    requiredState: "preview-only",
    currentState: () => "preview-only",
    evidence: (seed) =>
      `${seed.backupProviderSlotLabel} remains preview-only.`,
    blockedLiveAction: "backup provider execution",
  },
  {
    gateId: "local-private-alternative-preview-only",
    label: "Local/private alternative preview-only",
    owner: "Provider slot boundary",
    requiredState: "preview-only",
    currentState: () => "preview-only",
    evidence: (seed) =>
      `${seed.localPrivateAlternativeLabel} remains preview-only.`,
    blockedLiveAction: "local/private alternative execution",
  },
  {
    gateId: "dry-run-intent-preview-only",
    label: "Dry-run intent preview-only",
    owner: "Intent boundary",
    requiredState: "preview-only",
    currentState: () => "preview-only",
    evidence: () => "Dry-run intent fixtures exist as preview-only records.",
    blockedLiveAction: "live dry-run intent handoff",
  },
  {
    gateId: "dry-run-execution-blocked",
    label: "Dry-run execution blocked",
    owner: "Execution boundary",
    requiredState: "blocked",
    currentState: () => "blocked",
    evidence: () => "Provider execution remains blocked for all dry-run fixtures.",
    blockedLiveAction: "provider dry-run execution",
  },
  {
    gateId: "credential-value-absent",
    label: "Credential value absent",
    owner: "Credential boundary",
    requiredState: "not present",
    currentState: () => "not present",
    evidence: () => "No credential value is present in any record.",
    blockedLiveAction: "credential value storage",
  },
  {
    gateId: "credential-value-not-read",
    label: "Credential value not read",
    owner: "Credential boundary",
    requiredState: "not read",
    currentState: () => "not read",
    evidence: () => "Credential values are not read.",
    blockedLiveAction: "credential value read",
  },
  {
    gateId: "env-vars-not-read",
    label: "Env vars not read",
    owner: "Config boundary",
    requiredState: "not read",
    currentState: () => "not read",
    evidence: () => "No env vars are read.",
    blockedLiveAction: "env var read",
  },
  {
    gateId: "provider-key-not-read",
    label: "Provider key not read",
    owner: "Config boundary",
    requiredState: "not read",
    currentState: () => "not read",
    evidence: () => "No provider keys are read.",
    blockedLiveAction: "provider key read",
  },
  {
    gateId: "redacted-prompt-envelope-present",
    label: "Redacted prompt envelope present",
    owner: "Prompt boundary",
    requiredState: "redacted placeholder only",
    currentState: () => "redacted placeholder only",
    evidence: () => "Only a redacted prompt envelope fixture is present.",
    blockedLiveAction: "live prompt payload exposure",
  },
  {
    gateId: "prompt-not-sent",
    label: "Prompt not sent",
    owner: "Prompt boundary",
    requiredState: "not sent",
    currentState: () => "not sent",
    evidence: () => "Prompt transmission state remains not sent.",
    blockedLiveAction: "prompt transmission",
  },
  {
    gateId: "provider-sdk-not-imported",
    label: "Provider SDK not imported",
    owner: "SDK boundary",
    requiredState: "not imported",
    currentState: () => "not imported",
    evidence: () => "No provider SDKs are imported.",
    blockedLiveAction: "provider SDK import",
  },
  {
    gateId: "provider-response-not-received",
    label: "Provider response not received",
    owner: "Response boundary",
    requiredState: "not received",
    currentState: () => "not received",
    evidence: () => "No provider response is received.",
    blockedLiveAction: "provider response receipt",
  },
  {
    gateId: "model-output-not-generated",
    label: "Model output not generated",
    owner: "Model boundary",
    requiredState: "not generated",
    currentState: () => "not generated",
    evidence: () => "No model output is generated.",
    blockedLiveAction: "model output generation",
  },
  {
    gateId: "manual-approval-fixture",
    label: "Manual approval fixture",
    owner: "Approval posture",
    requiredState: "preview-only",
    currentState: () => "preview-only",
    evidence: () => "Manual approval exists only as a preview-only fixture.",
    blockedLiveAction: "live approval request",
  },
  {
    gateId: "manual-confirmation-fixture",
    label: "Manual confirmation fixture",
    owner: "Approval posture",
    requiredState: "preview-only",
    currentState: () => "preview-only",
    evidence: () =>
      "Manual confirmation exists only as a preview-only fixture.",
    blockedLiveAction: "live manual confirmation",
  },
  {
    gateId: "in-memory-only-admission-reference",
    label: "In-memory only admission reference",
    owner: "Persistence boundary",
    requiredState: "preview-only / not persisted",
    currentState: () => "preview-only / not persisted",
    evidence: () => "Result, audit, approval, and evidence references are preview-only.",
    blockedLiveAction: "persistent admission reference",
  },
  {
    gateId: "no-real-approval-request",
    label: "No real approval request",
    owner: "Approval boundary",
    requiredState: "absent",
    currentState: () => "absent",
    evidence: () => "No real approval request exists.",
    blockedLiveAction: "approval request creation",
  },
  {
    gateId: "no-real-approval-recording",
    label: "No real approval recording",
    owner: "Approval boundary",
    requiredState: "absent",
    currentState: () => "absent",
    evidence: () => "No real approval recording exists.",
    blockedLiveAction: "approval recording persistence",
  },
  {
    gateId: "no-approval-token-issuance",
    label: "No approval token issuance",
    owner: "Approval boundary",
    requiredState: "absent",
    currentState: () => "absent",
    evidence: () => "Approval tokens are not issued.",
    blockedLiveAction: "approval token issuance",
  },
  {
    gateId: "no-approval-lease-issuance",
    label: "No approval lease issuance",
    owner: "Approval boundary",
    requiredState: "absent",
    currentState: () => "absent",
    evidence: () => "Approval leases are not created.",
    blockedLiveAction: "approval lease issuance",
  },
  {
    gateId: "no-frontend-request",
    label: "No frontend request",
    owner: "Frontend boundary",
    requiredState: "not created",
    currentState: () => "not created",
    evidence: () => "No frontend request is created.",
    blockedLiveAction: "frontend request creation",
  },
  {
    gateId: "no-api-route",
    label: "No API route",
    owner: "API boundary",
    requiredState: "not created",
    currentState: () => "not created",
    evidence: () => "No API route is created.",
    blockedLiveAction: "API route creation",
  },
  {
    gateId: "no-fetch-network",
    label: "No fetch/network",
    owner: "Network boundary",
    requiredState: "blocked",
    currentState: () => "blocked",
    evidence: () => "No fetch or network call is used.",
    blockedLiveAction: "frontend fetch/network call",
  },
  {
    gateId: "no-provider-sdk-import",
    label: "No provider SDK import",
    owner: "SDK boundary",
    requiredState: "blocked",
    currentState: () => "blocked",
    evidence: () => "Provider SDK imports remain blocked.",
    blockedLiveAction: "provider SDK import",
  },
  {
    gateId: "no-provider-execution",
    label: "No provider execution",
    owner: "Execution boundary",
    requiredState: "blocked",
    currentState: () => "blocked",
    evidence: () => "Provider execution remains blocked.",
    blockedLiveAction: "provider execution",
  },
  {
    gateId: "no-model-call",
    label: "No model call",
    owner: "Model boundary",
    requiredState: "blocked",
    currentState: () => "blocked",
    evidence: () => "Model calls remain blocked.",
    blockedLiveAction: "model call",
  },
  {
    gateId: "no-prompt-sending",
    label: "No prompt sending",
    owner: "Prompt boundary",
    requiredState: "blocked",
    currentState: () => "blocked",
    evidence: () => "Prompt sending remains blocked.",
    blockedLiveAction: "prompt sending",
  },
  {
    gateId: "no-queue-dispatch",
    label: "No queue dispatch",
    owner: "Queue boundary",
    requiredState: "blocked",
    currentState: () => "blocked",
    evidence: () => "Queue dispatch remains blocked.",
    blockedLiveAction: "queue dispatch",
  },
  {
    gateId: "no-worker-dispatch",
    label: "No worker dispatch",
    owner: "Worker boundary",
    requiredState: "blocked",
    currentState: () => "blocked",
    evidence: () => "Worker dispatch remains blocked.",
    blockedLiveAction: "worker dispatch",
  },
  {
    gateId: "no-job-execution",
    label: "No job execution",
    owner: "Job boundary",
    requiredState: "blocked",
    currentState: () => "blocked",
    evidence: () => "Job execution remains blocked.",
    blockedLiveAction: "job execution",
  },
  {
    gateId: "no-result-persistence",
    label: "No result persistence",
    owner: "Persistence boundary",
    requiredState: "not implemented",
    currentState: () => "not implemented",
    evidence: () => "Result persistence is not implemented.",
    blockedLiveAction: "result persistence",
  },
  {
    gateId: "no-audit-persistence",
    label: "No audit persistence",
    owner: "Persistence boundary",
    requiredState: "not implemented",
    currentState: () => "not implemented",
    evidence: () => "Audit persistence is not implemented.",
    blockedLiveAction: "audit persistence",
  },
  {
    gateId: "no-approval-persistence",
    label: "No approval persistence",
    owner: "Persistence boundary",
    requiredState: "not implemented",
    currentState: () => "not implemented",
    evidence: () => "Approval persistence is not implemented.",
    blockedLiveAction: "approval persistence",
  },
  {
    gateId: "no-database-write",
    label: "No database write",
    owner: "Persistence boundary",
    requiredState: "not implemented",
    currentState: () => "not implemented",
    evidence: () => "Database writes are not implemented.",
    blockedLiveAction: "database write",
  },
  {
    gateId: "no-file-write",
    label: "No file write",
    owner: "Persistence boundary",
    requiredState: "not implemented",
    currentState: () => "not implemented",
    evidence: () => "File writes are not implemented.",
    blockedLiveAction: "file write",
  },
  {
    gateId: "single-run-lock-preview",
    label: "Single-run lock preview",
    owner: "Concurrency preview",
    requiredState: "preview-only",
    currentState: () => "preview-only",
    evidence: () => "Single-run lock remains a preview-only note.",
    blockedLiveAction: "parallel live run admission",
  },
  {
    gateId: "idempotency-replay-preview",
    label: "Idempotency/replay preview",
    owner: "Replay preview",
    requiredState: "preview-only",
    currentState: () => "preview-only",
    evidence: () => "Idempotency and replay protection remain preview-only notes.",
    blockedLiveAction: "live replay handling",
  },
  {
    gateId: "timeout-cancel-preview",
    label: "Timeout/cancel preview",
    owner: "Cancellation preview",
    requiredState: "preview-only",
    currentState: () => "preview-only",
    evidence: () => "Timeout and cancel handling remain preview-only notes.",
    blockedLiveAction: "live timeout or cancel execution",
  },
  {
    gateId: "privacy-redaction-preview",
    label: "Privacy/redaction preview",
    owner: "Privacy boundary",
    requiredState: "preview-only",
    currentState: () => "preview-only",
    evidence: () => "Privacy and redaction remain preview-only notes.",
    blockedLiveAction: "live prompt disclosure",
  },
  {
    gateId: "kill-switch-fixture",
    label: "Kill switch fixture",
    owner: "Safety boundary",
    requiredState: "available / not engaged",
    currentState: (seed) => seed.killSwitchState,
    evidence: (seed) =>
      seed.killSwitchState === "engaged / preview admission blocked"
        ? "The kill switch fixture is engaged for this deterministic planning/reasoning preview sample."
        : "The kill switch fixture is available and not engaged for this deterministic text/chat preview sample.",
    blockedLiveAction: "provider dry-run continuation after a kill switch event",
  },
] as const satisfies readonly GateSeed[];

const READINESS_SEEDS = [
  {
    readinessId: "server-only-dry-run-admission-helper-state",
    label: "Server-only dry-run admission helper state",
    state: "ready / deterministic / server-only",
    evidence: "The helper returns deterministic in-memory output only.",
  },
  {
    readinessId:
      "provider-selection-credential-reference-review-dependency-state",
    label: "Provider selection credential reference review dependency",
    state: "ready / source references present",
    evidence:
      "Provider selection review, acceptance posture, audit summary, and MVP references are present.",
  },
  {
    readinessId: "provider-dry-run-admission-input-state",
    label: "Provider dry-run admission input state",
    state: "preview-only / deterministic fixture input",
    evidence: "The input stays backend-only, redacted, and preview-only.",
  },
  {
    readinessId: "provider-dry-run-admission-check-state",
    label: "Provider dry-run admission check state",
    state: "preview-only / deterministic gate evaluation",
    evidence: "Admission checks stay deterministic and in-memory only.",
  },
  {
    readinessId: "provider-dry-run-admission-output-state",
    label: "Provider dry-run admission output state",
    state: "preview-only / deterministic output",
    evidence: "Outputs return admission state only and no provider result.",
  },
  {
    readinessId: "provider-dry-run-admission-envelope-state",
    label: "Provider dry-run admission envelope state",
    state: "preview-only / redacted envelope",
    evidence: "Only a redacted prompt envelope fixture is present.",
  },
  {
    readinessId: "provider-dry-run-intent-preview-state",
    label: "Provider dry-run intent preview state",
    state: "preview-only / not sent",
    evidence: "Dry-run intent remains preview-only and never sends a prompt.",
  },
  {
    readinessId: "provider-dry-run-blocked-execution-summary-state",
    label: "Provider dry-run blocked execution summary state",
    state: "ready / blocked execution documented",
    evidence: "Blocked provider execution is captured as deterministic preview data.",
  },
  {
    readinessId: "provider-dry-run-evidence-preview-state",
    label: "Evidence preview state",
    state: "preview-only / not persisted",
    evidence: "Evidence preview exists without persistence.",
  },
  {
    readinessId: "provider-dry-run-audit-preview-state",
    label: "Audit preview state",
    state: "preview-only / not persisted",
    evidence: "Audit preview exists without persistence.",
  },
  {
    readinessId: "provider-dry-run-approval-preview-state",
    label: "Approval preview state",
    state: "preview-only / not persisted",
    evidence: "Approval preview exists without persistence or token issuance.",
  },
  {
    readinessId: "credential-value-boundary-state",
    label: "Credential value boundary state",
    state: "ready / not present / not read",
    evidence: "Credential values are absent and unread.",
  },
  {
    readinessId: "env-var-boundary-state",
    label: "Env var boundary state",
    state: "ready / not read",
    evidence: "Env vars are not read.",
  },
  {
    readinessId: "provider-key-boundary-state",
    label: "Provider key boundary state",
    state: "ready / not read",
    evidence: "Provider keys are not read.",
  },
  {
    readinessId: "provider-sdk-boundary-state",
    label: "Provider SDK boundary state",
    state: "ready / not imported",
    evidence: "Provider SDKs are not imported.",
  },
  {
    readinessId: "provider-execution-boundary-state",
    label: "Provider execution boundary state",
    state: "ready / blocked",
    evidence: "Provider execution remains blocked.",
  },
  {
    readinessId: "prompt-boundary-state",
    label: "Prompt boundary state",
    state: "ready / not sent",
    evidence: "Prompt sending remains blocked.",
  },
  {
    readinessId: "model-boundary-state",
    label: "Model boundary state",
    state: "ready / not generated",
    evidence: "No model output is generated.",
  },
  {
    readinessId: "frontend-request-boundary-state",
    label: "Frontend request boundary state",
    state: "ready / not created",
    evidence: "No frontend request is created.",
  },
  {
    readinessId: "api-route-boundary-state",
    label: "API route boundary state",
    state: "ready / not created",
    evidence: "No API route is created.",
  },
  {
    readinessId: "queue-boundary-state",
    label: "Queue boundary state",
    state: "ready / blocked",
    evidence: "Queue dispatch remains blocked.",
  },
  {
    readinessId: "worker-boundary-state",
    label: "Worker boundary state",
    state: "ready / blocked",
    evidence: "Worker dispatch remains blocked.",
  },
  {
    readinessId: "job-boundary-state",
    label: "Job boundary state",
    state: "ready / blocked",
    evidence: "Job execution remains blocked.",
  },
  {
    readinessId: "result-persistence-boundary-state",
    label: "Result persistence boundary state",
    state: "ready / not implemented",
    evidence: "Result persistence is not implemented.",
  },
  {
    readinessId: "audit-persistence-boundary-state",
    label: "Audit persistence boundary state",
    state: "ready / not implemented",
    evidence: "Audit persistence is not implemented.",
  },
  {
    readinessId: "approval-persistence-boundary-state",
    label: "Approval persistence boundary state",
    state: "ready / not implemented",
    evidence: "Approval persistence is not implemented.",
  },
  {
    readinessId: "database-boundary-state",
    label: "Database boundary state",
    state: "ready / not implemented",
    evidence: "Database writes are not implemented.",
  },
  {
    readinessId: "file-boundary-state",
    label: "File boundary state",
    state: "ready / not implemented",
    evidence: "File writes are not implemented.",
  },
] as const satisfies readonly ReadinessSeed[];

function buildMvpRecord(
  seed: ProviderDryRunAdmissionSeed
): MinimalManualGatedProviderAdapterDryRunAdmissionMvpRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-mvp-v1",
    key: buildStableProviderDryRunAdmissionMvpKey(seed.stableId),
    ...buildCommonFields(seed),
    admissionMode: ADMISSION_MODE,
    admissionState: seed.admissionState,
    providerDryRunAdmissionId: buildProviderDryRunAdmissionPreviewId(seed.stableId),
    providerSlotId: buildProviderDryRunPreviewSlotId(seed.stableId, "selected"),
    credentialReferenceId:
      buildProviderDryRunPreviewCredentialReferenceId(seed.stableId),
    admissionDigest: buildProviderDryRunPreviewDigest(seed.stableId),
    selectedProviderState: buildSelectedProviderState(),
    credentialReferenceState: buildCredentialReferenceState(),
    timestampPosture: "static fixture label only / no real timestamp",
    currentReadiness: CURRENT_READINESS,
    reviewRecoveryPreviewNextStatement: REVIEW_RECOVERY_NEXT_STATEMENT,
  };
}

function buildInputRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunAdmissionInputRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-input-v1",
    key: buildStableProviderDryRunAdmissionInputKey(seed.stableId),
    requestVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-request-v1",
    ...buildCommonFields(seed),
    requestState:
      "deterministic provider dry-run admission fixture request only",
    inputState: "deterministic provider dry-run admission fixture input only",
    admissionMode: ADMISSION_MODE,
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
  };
}

function buildCheckRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunAdmissionCheckRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-check-v1",
    key: buildStableProviderDryRunAdmissionCheckKey(seed.stableId),
    checkVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-check-v1",
    ...buildCommonFields(seed),
    admissionMode: ADMISSION_MODE,
    admissionState: seed.admissionState,
    supportedCapabilityState: "supported by text adapter boundary",
    dryRunIntentState: "preview-only",
    requiredChecks: [
      "backend-only boundary",
      "server-only dry-run admission module boundary",
      "provider selection credential reference review dependency",
      "credential reference opaque-only mode",
      "redacted prompt envelope present",
      "provider SDK not imported",
      "provider execution blocked",
      "manual approval fixture",
      "manual confirmation fixture",
      "kill switch fixture",
    ],
    blockedLiveAction:
      seed.admissionState === "blocked-for-backend-dry-run-preview-only"
        ? "provider dry-run admission remains preview-blocked by the kill switch fixture"
        : "live provider dry-run execution remains blocked after preview admission",
  };
}

function buildOutputRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunAdmissionOutputRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output-v1",
    key: buildStableProviderDryRunAdmissionOutputKey(seed.stableId),
    responseVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-response-v1",
    responseState: "returned by server-only smoke/helper only",
    outputVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output-v1",
    ...buildCommonFields(seed),
    admissionMode: ADMISSION_MODE,
    admissionState: seed.admissionState,
    providerDryRunAdmissionId: buildProviderDryRunAdmissionPreviewId(seed.stableId),
    providerSlotId: buildProviderDryRunPreviewSlotId(seed.stableId, "selected"),
    credentialReferenceId:
      buildProviderDryRunPreviewCredentialReferenceId(seed.stableId),
    admissionDigest: buildProviderDryRunPreviewDigest(seed.stableId),
    selectedProviderState: buildSelectedProviderState(),
    credentialReferenceState: buildCredentialReferenceState(),
    providerSdkImportState: "not imported",
    providerExecutionState: "blocked",
    promptTransmissionState: "not sent",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultReference: buildProviderDryRunPreviewResultReference(seed.stableId),
    auditReference: buildProviderDryRunPreviewAuditReference(seed.stableId),
    approvalReference: buildProviderDryRunPreviewApprovalReference(seed.stableId),
    evidencePacketReference:
      buildProviderDryRunPreviewEvidenceReference(seed.stableId),
    timestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    explicitDryRunAdmissionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement:
      "Dry-run admission only. No provider output. No secret read. No persistence.",
    currentReadiness: CURRENT_READINESS,
  };
}

function buildEnvelopeRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunAdmissionEnvelopeRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-envelope-v1",
    key: buildStableProviderDryRunAdmissionEnvelopeKey(seed.stableId),
    envelopeVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-envelope-v1",
    ...buildCommonFields(seed),
    envelopeState: "provider dry-run admission envelope preview only",
    providerDryRunAdmissionId: buildProviderDryRunAdmissionPreviewId(seed.stableId),
    admissionDigest: buildProviderDryRunPreviewDigest(seed.stableId),
    redactedPromptEnvelopeLabel:
      "redacted prompt envelope fixture / provider dry-run preview",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    providerPayloadPosture: "none",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultReference: buildProviderDryRunPreviewResultReference(seed.stableId),
    auditReference: buildProviderDryRunPreviewAuditReference(seed.stableId),
    approvalReference: buildProviderDryRunPreviewApprovalReference(seed.stableId),
    evidencePacketReference:
      buildProviderDryRunPreviewEvidenceReference(seed.stableId),
  };
}

function buildIntentPreviewRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunIntentPreviewRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-intent-preview-v1",
    key: buildStableProviderDryRunIntentPreviewKey(seed.stableId),
    intentVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-intent-preview-v1",
    ...buildCommonFields(seed),
    intentPreviewState: "preview-only",
    admissionMode: ADMISSION_MODE,
    providerDryRunAdmissionId: buildProviderDryRunAdmissionPreviewId(seed.stableId),
    providerSlotId: buildProviderDryRunPreviewSlotId(seed.stableId, "selected"),
    credentialReferenceId:
      buildProviderDryRunPreviewCredentialReferenceId(seed.stableId),
    admissionDigest: buildProviderDryRunPreviewDigest(seed.stableId),
    redactedPromptEnvelopeLabel:
      "redacted prompt envelope fixture / provider dry-run preview",
    promptPayloadPosture: "redacted placeholder only",
    manualApprovalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
  };
}

function buildBlockedExecutionSummaryRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunBlockedExecutionSummaryRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-blocked-execution-summary-v1",
    key: buildStableProviderDryRunBlockedExecutionSummaryKey(seed.stableId),
    blockedExecutionVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-blocked-execution-summary-v1",
    ...buildCommonFields(seed),
    blockedExecutionState: "preview-only provider execution blocked summary",
    admissionState: seed.admissionState,
    blockedLiveActions: cloneList(BLOCKED_LIVE_ACTIONS),
  };
}

function buildEvidencePreviewRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunEvidencePreviewRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-evidence-preview-v1",
    key: buildStableProviderDryRunEvidencePreviewKey(seed.stableId),
    evidenceVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-evidence-preview-v1",
    ...buildCommonFields(seed),
    evidencePreviewState: "preview-only / not persisted",
    evidenceSummaryLines: buildEvidenceSummaryLines(seed),
    evidenceReference: buildProviderDryRunPreviewEvidenceReference(seed.stableId),
  };
}

function buildAuditPreviewRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunAuditPreviewRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview-v1",
    key: buildStableProviderDryRunAuditPreviewKey(seed.stableId),
    auditVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview-v1",
    ...buildCommonFields(seed),
    auditPreviewState: "preview-only / not persisted",
    auditSummaryLines: buildAuditSummaryLines(seed),
    auditReference: buildProviderDryRunPreviewAuditReference(seed.stableId),
  };
}

function buildApprovalPreviewRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunApprovalPreviewRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview-v1",
    key: buildStableProviderDryRunApprovalPreviewKey(seed.stableId),
    approvalVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview-v1",
    ...buildCommonFields(seed),
    approvalPreviewState: "preview-only / not persisted",
    approvalSummaryLines: buildApprovalSummaryLines(seed),
    approvalReference: buildProviderDryRunPreviewApprovalReference(seed.stableId),
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    approvalRecordingState: "not recorded",
  };
}

function buildSafetyGateSummaryRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunSafetyGateSummaryRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-safety-gate-summary-v1",
    key: buildStableProviderDryRunSafetyGateSummaryKey(seed.stableId),
    gateSummaryVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-safety-gate-summary-v1",
    ...buildCommonFields(seed),
    gateSummaryState: "preview-only blocked dry-run admission summary",
    topGateLabels: [
      "backend-only boundary",
      "server-only dry-run admission module boundary",
      "credential reference opaque-only mode",
      "dry-run execution blocked",
      "kill switch fixture",
    ],
    blockedLiveActions: cloneList(BLOCKED_LIVE_ACTIONS),
  };
}

function buildRequestRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunAdmissionRequestRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-request-v1",
    key: buildStableProviderDryRunAdmissionRequestKey(seed.stableId),
    requestVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-request-v1",
    ...buildCommonFields(seed),
    providerDryRunAdmissionMvpId: seed.stableId,
    requestState:
      "deterministic provider dry-run admission fixture request only",
    admissionMode: ADMISSION_MODE,
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
  };
}

function buildResponseRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunAdmissionResponseRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-response-v1",
    key: buildStableProviderDryRunAdmissionResponseKey(seed.stableId),
    responseVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-response-v1",
    ...buildCommonFields(seed),
    providerDryRunAdmissionMvpId: seed.stableId,
    responseState: "returned by server-only smoke/helper only",
    admissionMode: ADMISSION_MODE,
    admissionState: seed.admissionState,
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
    explicitDryRunAdmissionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement:
      "Dry-run admission only. No provider output. No secret read. No persistence.",
  };
}

function buildErrorRecord(
  seed: ProviderDryRunAdmissionSeed
): ProviderDryRunAdmissionErrorRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-error-v1",
    key: buildStableProviderDryRunAdmissionErrorKey(seed.stableId),
    errorVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-error-v1",
    ...buildCommonFields(seed),
    providerDryRunAdmissionMvpId: seed.stableId,
    errorState: "deterministic preview only",
    failedGateExamples: [
      "kill-switch-fixture",
      "no-provider-execution",
      "no-result-persistence",
    ],
    missingProviderSelectionReviewExample:
      "provider selection credential reference review source reference missing",
    missingProviderSlotExample:
      "selected provider dry-run slot label missing from deterministic fixture",
    missingOpaqueCredentialReferenceExample:
      "opaque credential reference label missing from deterministic fixture",
    credentialValueDetectedExample:
      "credential value detected in dry-run admission input",
    envVarReadAttemptedExample:
      "env var read attempted during dry-run admission preview",
    providerSdkImportAttemptedExample:
      "provider SDK import attempted during dry-run admission preview",
    providerCallAttemptedExample:
      "provider call attempted during dry-run admission preview",
    modelCallAttemptedExample:
      "model call attempted during dry-run admission preview",
    promptTransmissionAttemptedExample:
      "prompt transmission attempted during dry-run admission preview",
    persistenceAttemptedExample:
      "result or audit persistence attempted during dry-run admission preview",
    databaseWriteAttemptedExample:
      "database write attempted during dry-run admission preview",
    fileWriteAttemptedExample:
      "file write attempted during dry-run admission preview",
    queueWorkerJobAttemptedExample:
      "queue, worker, or job dispatch attempted during dry-run admission preview",
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    explicitNoLiveErrorNoRetryNoFallbackStatement:
      "No live error. No retry. No fallback.",
  };
}

function buildGateRecord(
  seed: ProviderDryRunAdmissionSeed,
  gateSeed: GateSeed
): ProviderDryRunAdmissionGateRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-gate-v1",
    key: `${seed.stableId}:${gateSeed.gateId}`,
    stableId: seed.stableId,
    capabilityFamily: seed.capabilityFamily,
    gateId: gateSeed.gateId,
    label: gateSeed.label,
    owner: gateSeed.owner,
    requiredState: gateSeed.requiredState,
    currentState: gateSeed.currentState(seed),
    evidence: gateSeed.evidence(seed),
    blockedLiveAction: gateSeed.blockedLiveAction,
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

function buildReadinessRecord(
  seed: ProviderDryRunAdmissionSeed,
  readinessSeed: ReadinessSeed
): ProviderDryRunReadinessMatrixRecord {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-readiness-matrix-v1",
    key: `${seed.stableId}:${readinessSeed.readinessId}`,
    stableId: seed.stableId,
    capabilityFamily: seed.capabilityFamily,
    readinessId: readinessSeed.readinessId,
    label: readinessSeed.label,
    state:
      seed.admissionState === "blocked-for-backend-dry-run-preview-only" &&
      readinessSeed.readinessId === "provider-dry-run-admission-check-state"
        ? "preview-only / blocked by kill switch fixture"
        : readinessSeed.state,
    evidence:
      seed.admissionState === "blocked-for-backend-dry-run-preview-only" &&
      readinessSeed.readinessId === "provider-dry-run-admission-check-state"
        ? "The planning/reasoning fixture remains blocked because the kill switch fixture is engaged."
        : readinessSeed.evidence,
    currentReadiness: CURRENT_READINESS,
    nextSafeAction:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

function buildServerRunRecordFromSeed(
  seed: ProviderDryRunAdmissionSeed
): MinimalProviderDryRunAdmissionServerRunRecord {
  const common = buildCommonFields(seed);

  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output-v1",
    ...common,
    admissionMode: ADMISSION_MODE,
    admissionState: seed.admissionState,
    providerDryRunAdmissionId: buildProviderDryRunAdmissionPreviewId(seed.stableId),
    providerSlotId: buildProviderDryRunPreviewSlotId(seed.stableId, "selected"),
    credentialReferenceId:
      buildProviderDryRunPreviewCredentialReferenceId(seed.stableId),
    admissionDigest: buildProviderDryRunPreviewDigest(seed.stableId),
    selectedProviderState: "preview-only / not executed",
    credentialReferenceState: "opaque reference only / value not read",
    providerSdkImportState: "not imported",
    providerExecutionState: "blocked",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    providerPayloadPosture: "none",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    queueDispatchState: "blocked",
    workerDispatchState: "blocked",
    jobExecutionState: "blocked",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    resultReference: buildProviderDryRunPreviewResultReference(seed.stableId),
    auditReference: buildProviderDryRunPreviewAuditReference(seed.stableId),
    approvalReference: buildProviderDryRunPreviewApprovalReference(seed.stableId),
    evidencePacketReference:
      buildProviderDryRunPreviewEvidenceReference(seed.stableId),
    timestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    noFrontendRequestStatement: "no frontend request is created",
    noApiRouteStatement: "no API route is created",
    noProviderCallStatement: "no provider call exists",
    noModelCallStatement: "no model call exists",
    noRealApprovalRequestStatement: "no real approval request exists",
    noRealApprovalRecordingStatement: "no real approval recording exists",
    noApprovalTokenStatement: "no approval token exists",
    noApprovalLeaseStatement: "no approval lease exists",
    reviewRecoveryPreviewNextStatement: REVIEW_RECOVERY_NEXT_STATEMENT,
    currentReadiness: CURRENT_READINESS,
  };
}

const MVP_RECORDS = PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildMvpRecord);
const INPUT_RECORDS = PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildInputRecord);
const CHECK_RECORDS = PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildCheckRecord);
const OUTPUT_RECORDS = PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildOutputRecord);
const ENVELOPE_RECORDS =
  PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildEnvelopeRecord);
const INTENT_PREVIEW_RECORDS =
  PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildIntentPreviewRecord);
const BLOCKED_EXECUTION_SUMMARY_RECORDS =
  PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildBlockedExecutionSummaryRecord);
const EVIDENCE_PREVIEW_RECORDS =
  PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildEvidencePreviewRecord);
const AUDIT_PREVIEW_RECORDS =
  PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildAuditPreviewRecord);
const APPROVAL_PREVIEW_RECORDS =
  PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildApprovalPreviewRecord);
const SAFETY_GATE_SUMMARY_RECORDS =
  PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildSafetyGateSummaryRecord);
const REQUEST_RECORDS =
  PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildRequestRecord);
const RESPONSE_RECORDS =
  PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildResponseRecord);
const ERROR_RECORDS = PROVIDER_DRY_RUN_ADMISSION_SEEDS.map(buildErrorRecord);
const GATE_RECORDS = PROVIDER_DRY_RUN_ADMISSION_SEEDS.flatMap((seed) =>
  GATE_SEEDS.map((gateSeed) => buildGateRecord(seed, gateSeed))
);
const READINESS_RECORDS = PROVIDER_DRY_RUN_ADMISSION_SEEDS.flatMap((seed) =>
  READINESS_SEEDS.map((readinessSeed) =>
    buildReadinessRecord(seed, readinessSeed)
  )
);

export function listMinimalManualGatedProviderAdapterDryRunAdmissionMvpRecords(): readonly MinimalManualGatedProviderAdapterDryRunAdmissionMvpRecord[] {
  return cloneList(MVP_RECORDS);
}

export function listProviderDryRunAdmissionInputs(): readonly ProviderDryRunAdmissionInputRecord[] {
  return cloneList(INPUT_RECORDS);
}

export function listProviderDryRunAdmissionChecks(): readonly ProviderDryRunAdmissionCheckRecord[] {
  return cloneList(CHECK_RECORDS);
}

export function listProviderDryRunAdmissionOutputs(): readonly ProviderDryRunAdmissionOutputRecord[] {
  return cloneList(OUTPUT_RECORDS);
}

export function listProviderDryRunAdmissionEnvelopes(): readonly ProviderDryRunAdmissionEnvelopeRecord[] {
  return cloneList(ENVELOPE_RECORDS);
}

export function listProviderDryRunIntentPreviews(): readonly ProviderDryRunIntentPreviewRecord[] {
  return cloneList(INTENT_PREVIEW_RECORDS);
}

export function listProviderDryRunBlockedExecutionSummaries(): readonly ProviderDryRunBlockedExecutionSummaryRecord[] {
  return cloneList(BLOCKED_EXECUTION_SUMMARY_RECORDS);
}

export function listProviderDryRunEvidencePreviews(): readonly ProviderDryRunEvidencePreviewRecord[] {
  return cloneList(EVIDENCE_PREVIEW_RECORDS);
}

export function listProviderDryRunAuditPreviews(): readonly ProviderDryRunAuditPreviewRecord[] {
  return cloneList(AUDIT_PREVIEW_RECORDS);
}

export function listProviderDryRunApprovalPreviews(): readonly ProviderDryRunApprovalPreviewRecord[] {
  return cloneList(APPROVAL_PREVIEW_RECORDS);
}

export function listProviderDryRunSafetyGateSummaries(): readonly ProviderDryRunSafetyGateSummaryRecord[] {
  return cloneList(SAFETY_GATE_SUMMARY_RECORDS);
}

export function listProviderDryRunAdmissionRequestRecords(): readonly ProviderDryRunAdmissionRequestRecord[] {
  return cloneList(REQUEST_RECORDS);
}

export function listProviderDryRunAdmissionResponseRecords(): readonly ProviderDryRunAdmissionResponseRecord[] {
  return cloneList(RESPONSE_RECORDS);
}

export function listProviderDryRunAdmissionErrorRecords(): readonly ProviderDryRunAdmissionErrorRecord[] {
  return cloneList(ERROR_RECORDS);
}

export function listProviderDryRunAdmissionGates(): readonly ProviderDryRunAdmissionGateRecord[] {
  return cloneList(GATE_RECORDS);
}

export function listProviderDryRunAdmissionReadinessMatrixRecords(): readonly ProviderDryRunReadinessMatrixRecord[] {
  return cloneList(READINESS_RECORDS);
}

export function buildProviderDryRunAdmissionSummary(): ProviderDryRunAdmissionSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-summary-v1",
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    currentReadiness: CURRENT_READINESS,
    mvpCount: MVP_RECORDS.length,
    inputCount: INPUT_RECORDS.length,
    outputCount: OUTPUT_RECORDS.length,
    summaryLines: cloneList(SUMMARY_LINES),
  };
}

export function buildProviderDryRunAdmissionGateSummary(): ProviderDryRunAdmissionGateSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-gate-summary-v1",
    gateCount: GATE_RECORDS.length,
    blockedLiveActionCount: BLOCKED_LIVE_ACTIONS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(GATE_SUMMARY_LINES),
  };
}

export function buildProviderDryRunAdmissionReadinessSummary(): ProviderDryRunAdmissionReadinessSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-readiness-summary-v1",
    readinessCount: READINESS_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    nextSafeAction:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    summaryLines: cloneList(READINESS_SUMMARY_LINES),
  };
}

export function buildNextProviderDryRunAdmissionReviewRecoveryChecklist(): ProviderDryRunAdmissionReviewRecoveryChecklist {
  return cloneList(REVIEW_RECOVERY_CHECKLIST);
}

export function buildStaticProviderDryRunAdmissionServerRunRecord(
  stableId: ProviderDryRunAdmissionMvpId
): MinimalProviderDryRunAdmissionServerRunRecord {
  const seed = PROVIDER_DRY_RUN_ADMISSION_SEEDS.find(
    (candidate) => candidate.stableId === stableId
  );

  if (!seed) {
    throw new Error(`Missing provider dry-run admission seed for ${stableId}.`);
  }

  return buildServerRunRecordFromSeed(seed);
}
