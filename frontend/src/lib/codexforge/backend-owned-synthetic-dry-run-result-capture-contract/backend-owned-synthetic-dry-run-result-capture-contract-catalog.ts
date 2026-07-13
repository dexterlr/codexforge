import type {
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  listBackendOwnedModelProviderSyntheticDryRunRunnerSkeletons,
  listSyntheticDryRunErrorFixtures,
  listSyntheticDryRunInputFixtures,
  listSyntheticDryRunOutputFixtures,
  listSyntheticRunnerSkeletonHandoffPreviews,
  listSyntheticRunnerSkeletonReadinessMatrixRecords,
  type BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord,
  type SyntheticDryRunErrorFixtureRecord,
  type SyntheticDryRunInputFixtureRecord,
  type SyntheticDryRunOutputFixtureRecord,
  type SyntheticRunnerHandoffPreviewRecord,
  type SyntheticRunnerReadinessMatrixRecord,
} from "../backend-owned-model-provider-synthetic-dry-run-runner-skeleton";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_PHASE,
  NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
  type BackendOwnedSyntheticDryRunResultCaptureContractRecord,
  type ResultCaptureAuditApprovalJoinKey,
  type ResultCaptureAuditApprovalJoinPreviewRecord,
  type ResultCaptureContractCapabilityFamilyGroup,
  type ResultCaptureContractId,
  type ResultCaptureContractKey,
  type ResultCaptureContractSummary,
  type ResultCaptureContractWorkspaceGroup,
  type ResultCaptureErrorContractRecord,
  type ResultCaptureErrorKey,
  type ResultCaptureGateId,
  type ResultCaptureGateKey,
  type ResultCaptureGateRecord,
  type ResultCaptureGateSeed,
  type ResultCaptureGateSummary,
  type ResultCaptureReadinessKey,
  type ResultCaptureReadinessMatrixRecord,
  type ResultCaptureReadinessSummary,
  type ResultCaptureRequestContractRecord,
  type ResultCaptureRequestKey,
  type ResultCaptureResponseContractRecord,
  type ResultCaptureResponseKey,
  type SyntheticResultEnvelopeContractRecord,
  type SyntheticResultEnvelopeKey,
} from "./backend-owned-synthetic-dry-run-result-capture-contract-types";

const RESULT_CAPTURE_SUMMARY_LINES = [
  "backend-owned synthetic dry-run result capture contract only",
  "synthetic result capture contract is preview-only",
  "result capture state is not captured",
  "result persistence is not implemented",
  "audit persistence is not implemented",
  "approval persistence is not implemented",
  "artifact persistence is not implemented",
  "database write is not implemented",
  "file write is not implemented",
  "provider response is not received",
  "model output is not generated",
  "synthetic fixture result is static placeholder only",
  "result envelope is preview-only",
  "result id is not issued",
  "result digest is deterministic preview only",
  "result capture request/response/error contracts are preview-only",
  "result capture gates are preview-only",
  "result capture readiness matrix is preview-only",
  "audit and approval joins are not persisted",
  "current readiness is capture-contract-only / not persistent",
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
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval required",
  "manual confirmation required",
  "kill switch required",
  "audit required",
  "opaque credential references only",
  "no plaintext secrets",
  "backend-owned synthetic dry-run result capture review and recovery preview next",
] as const;

const RESULT_CAPTURE_GATE_SUMMARY_LINES = [
  "synthetic runner skeleton",
  "synthetic output fixture",
  "synthetic error fixture",
  "synthetic result envelope",
  "result capture request",
  "result capture response",
  "result capture error",
  "operator approval",
  "manual confirmation",
  "kill switch",
  "audit",
  "server-only boundary",
  "no frontend provider call",
  "no provider SDK import in frontend",
  "no prompt sending",
  "opaque credential reference",
  "no plaintext secrets",
  "privacy/redaction",
  "cost/rate/timeout",
  "idempotency/replay block",
  "single-run lock",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes",
] as const;

const RESULT_CAPTURE_READINESS_SUMMARY_LINES = [
  "capture contract state",
  "result envelope state",
  "capture request contract state",
  "capture response contract state",
  "capture error contract state",
  "gate schema state",
  "synthetic runner skeleton dependency",
  "synthetic output fixture dependency",
  "synthetic error fixture dependency",
  "credential boundary state",
  "safety boundary state",
  "audit boundary state",
  "approval boundary state",
  "result persistence boundary state",
  "audit persistence boundary state",
  "approval persistence boundary state",
  "database boundary state",
  "file boundary state",
  "current readiness: capture-contract-only / not persistent",
  "next safe action",
] as const;

const NEXT_RESULT_CAPTURE_REVIEW_RECOVERY_CHECKLIST = [
  "Review preview-only synthetic result envelopes without creating or receiving real provider results.",
  "Keep capture request, response, and error contracts inert while capture request creation and persistence remain not implemented.",
  "Carry audit, approval, privacy, cost, idempotency, replay, and single-run guards into the next review and recovery preview.",
  "Preserve no prompt sending, no model calls, no provider execution, no queue dispatch, no worker dispatch, and no job execution posture.",
  "Keep backend-owned synthetic dry-run result capture records deterministic, preview-only, and not persistent while review and recovery preview comes next.",
] as const;

const SYNTHETIC_RUNNER_SKELETONS =
  listBackendOwnedModelProviderSyntheticDryRunRunnerSkeletons();
const SYNTHETIC_INPUT_FIXTURES = listSyntheticDryRunInputFixtures();
const SYNTHETIC_OUTPUT_FIXTURES = listSyntheticDryRunOutputFixtures();
const SYNTHETIC_ERROR_FIXTURES = listSyntheticDryRunErrorFixtures();
const SYNTHETIC_RUNNER_READINESS_RECORDS =
  listSyntheticRunnerSkeletonReadinessMatrixRecords();
const SYNTHETIC_RUNNER_HANDOFF_PREVIEWS =
  listSyntheticRunnerSkeletonHandoffPreviews();

const SYNTHETIC_INPUT_FIXTURES_BY_ID = new Map(
  SYNTHETIC_INPUT_FIXTURES.map((record) => [record.id, record] as const)
);
const SYNTHETIC_OUTPUT_FIXTURES_BY_ID = new Map(
  SYNTHETIC_OUTPUT_FIXTURES.map((record) => [record.id, record] as const)
);
const SYNTHETIC_ERROR_FIXTURES_BY_ID = new Map(
  SYNTHETIC_ERROR_FIXTURES.map((record) => [record.id, record] as const)
);
const SYNTHETIC_RUNNER_READINESS_BY_ID = new Map(
  SYNTHETIC_RUNNER_READINESS_RECORDS.map((record) => [record.id, record] as const)
);
const SYNTHETIC_RUNNER_HANDOFFS_BY_ID = new Map(
  SYNTHETIC_RUNNER_HANDOFF_PREVIEWS.map((record) => [record.id, record] as const)
);

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneCapabilityFamily(
  family: BackendOwnedSyntheticDryRunResultCaptureContractRecord["selectedCapabilityFamily"]
): BackendOwnedSyntheticDryRunResultCaptureContractRecord["selectedCapabilityFamily"] {
  return { ...family };
}

function requireInputFixture(
  id: ResultCaptureContractId
): SyntheticDryRunInputFixtureRecord {
  const record = SYNTHETIC_INPUT_FIXTURES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic input fixture for ${id}`);
  }

  return record;
}

function requireOutputFixture(
  id: ResultCaptureContractId
): SyntheticDryRunOutputFixtureRecord {
  const record = SYNTHETIC_OUTPUT_FIXTURES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic output fixture for ${id}`);
  }

  return record;
}

function requireErrorFixture(
  id: ResultCaptureContractId
): SyntheticDryRunErrorFixtureRecord {
  const record = SYNTHETIC_ERROR_FIXTURES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic error fixture for ${id}`);
  }

  return record;
}

function requireRunnerReadiness(
  id: ResultCaptureContractId
): SyntheticRunnerReadinessMatrixRecord {
  const record = SYNTHETIC_RUNNER_READINESS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic runner readiness for ${id}`);
  }

  return record;
}

function requireRunnerHandoff(
  id: ResultCaptureContractId
): SyntheticRunnerHandoffPreviewRecord {
  const record = SYNTHETIC_RUNNER_HANDOFFS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic runner handoff for ${id}`);
  }

  return record;
}

function buildCaptureContractLabel(requestLabel: string): string {
  return `${requestLabel} result capture contract`;
}

function buildCaptureContractBlockedReason(requestLabel: string): string {
  return `Synthetic dry-run result capture contract remains preview-only for ${requestLabel} because no capture request, invocation, provider response, model output, result id, database write, file write, or persistence exists.`;
}

function buildCaptureContractNextSafeAction(
  workspaceTarget: AiModelProviderWorkspaceTarget
): string {
  return `Prepare the backend-owned synthetic dry-run result capture review and recovery preview for ${workspaceTarget} without enabling capture, persistence, or execution.`;
}

export function uniqueResultCaptureDisplayStrings<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Array.from(new Set(values));
}

export function buildStableSyntheticResultCaptureContractKey(
  id: ResultCaptureContractId
): ResultCaptureContractKey {
  return `backend-owned-synthetic-dry-run-result-capture-contract:${id}`;
}

export function buildStableSyntheticResultEnvelopeKey(
  id: ResultCaptureContractId
): SyntheticResultEnvelopeKey {
  return `backend-owned-synthetic-result-envelope-contract:${id}`;
}

export function buildStableResultCaptureRequestKey(
  id: ResultCaptureContractId
): ResultCaptureRequestKey {
  return `backend-owned-synthetic-result-capture-request-contract:${id}`;
}

export function buildStableResultCaptureResponseKey(
  id: ResultCaptureContractId
): ResultCaptureResponseKey {
  return `backend-owned-synthetic-result-capture-response-contract:${id}`;
}

export function buildStableResultCaptureErrorKey(
  id: ResultCaptureContractId
): ResultCaptureErrorKey {
  return `backend-owned-synthetic-result-capture-error-contract:${id}`;
}

export function buildStableResultCaptureGateKey(
  id: ResultCaptureGateId
): ResultCaptureGateKey {
  return `backend-owned-synthetic-result-capture-gate:${id}`;
}

export function buildStableResultCaptureReadinessKey(
  id: ResultCaptureContractId
): ResultCaptureReadinessKey {
  return `backend-owned-synthetic-result-capture-readiness:${id}`;
}

export function buildStableResultCaptureAuditApprovalJoinKey(
  id: ResultCaptureContractId
): ResultCaptureAuditApprovalJoinKey {
  return `backend-owned-synthetic-result-capture-audit-approval-join:${id}`;
}

function buildResultCaptureContractRecord(
  skeleton: BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord
): BackendOwnedSyntheticDryRunResultCaptureContractRecord {
  const inputFixture = requireInputFixture(skeleton.id);
  const outputFixture = requireOutputFixture(skeleton.id);
  const errorFixture = requireErrorFixture(skeleton.id);
  const readiness = requireRunnerReadiness(skeleton.id);
  const handoff = requireRunnerHandoff(skeleton.id);

  return {
    id: skeleton.id,
    key: buildStableSyntheticResultCaptureContractKey(skeleton.id),
    captureContractVersion:
      "backend-owned-synthetic-dry-run-result-capture-contract-v1",
    previewOnlyStatement: "synthetic result capture contract is preview-only",
    requestLabel: skeleton.requestLabel,
    label: buildCaptureContractLabel(skeleton.requestLabel),
    workspaceTarget: skeleton.workspaceTarget,
    source: skeleton.source,
    owner: skeleton.owner,
    frontendMode: skeleton.frontendMode,
    contractMode: "contract-only",
    resultCapturePosture: "contract-defined / not persisted",
    captureRequestState: "not created",
    captureInvocationState: "not invoked",
    resultCaptureState: "not captured",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    artifactPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    syntheticFixtureResultState: "static placeholder only",
    resultEnvelopeState: "preview-only",
    resultIdState: "not issued",
    resultDigestPosture: "deterministic preview digest only",
    sourceSyntheticRunnerSkeletonReference: skeleton.key,
    sourceSyntheticInputFixtureReference: inputFixture.key,
    sourceSyntheticOutputFixtureReference: outputFixture.key,
    sourceSyntheticErrorFixtureReference: errorFixture.key,
    sourceSyntheticRunnerReadinessReference: readiness.key,
    sourceSyntheticRunnerHandoffReference: handoff.key,
    sourceDryRunRunnerReviewReference: skeleton.sourceDryRunRunnerReviewReference,
    sourceBackendAdmissionContractReference:
      skeleton.sourceBackendAdmissionContractReference,
    sourceRunIntentReference: skeleton.sourceRunIntentReference,
    selectedCapabilityFamily: cloneCapabilityFamily(
      skeleton.selectedCapabilityFamily
    ),
    providerSlotLabel: skeleton.providerSlotLabel,
    backupProviderSlotLabel: skeleton.backupProviderSlotLabel,
    localPrivateAlternativeLabel: skeleton.localPrivateAlternativeLabel,
    promptSendingPosture: "not implemented",
    modelCallPosture: "not implemented",
    providerCallPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    manualApprovalRequired: "manual approval required",
    manualConfirmationRequired: "manual confirmation required",
    killSwitchRequired: "kill switch required",
    auditRequired: "audit required",
    privacyRedactionRequired: "privacy/redaction required",
    costAcknowledgementRequired: "cost acknowledgement required",
    rateLimitGuardRequired: "rate limit guard required",
    timeoutCancelGuardRequired: "timeout/cancel guard required",
    idempotencyRequired: "idempotency required",
    replayBlockRequired: "replay block required",
    singleRunLockRequired: "single-run lock required",
    noRetryExecution: "no retry execution",
    noFallbackExecution: "no fallback execution",
    nextResultCaptureReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    blockedDefaultReason: buildCaptureContractBlockedReason(
      skeleton.requestLabel
    ),
    nextSafeAction: buildCaptureContractNextSafeAction(skeleton.workspaceTarget),
  };
}

const RESULT_CAPTURE_CONTRACTS = SYNTHETIC_RUNNER_SKELETONS.map((skeleton) =>
  buildResultCaptureContractRecord(skeleton)
);

function buildSyntheticResultEnvelopeRecord(
  contract: BackendOwnedSyntheticDryRunResultCaptureContractRecord
): SyntheticResultEnvelopeContractRecord {
  return {
    id: contract.id,
    key: buildStableSyntheticResultEnvelopeKey(contract.id),
    envelopeContractVersion:
      "backend-owned-synthetic-result-envelope-contract-v1",
    requestLabel: contract.requestLabel,
    workspaceTarget: contract.workspaceTarget,
    captureContractId: contract.id,
    sourceSyntheticOutputFixtureReference:
      contract.sourceSyntheticOutputFixtureReference,
    sourceSyntheticErrorFixtureReference:
      contract.sourceSyntheticErrorFixtureReference,
    resultEnvelopeMode: "preview-only",
    resultPayloadPosture: "static placeholder only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    syntheticFixtureResultState: "static placeholder only",
    tokenCostAccountingState: "placeholder only",
    safetyReviewState: "preview-only",
    resultIdState: "not issued",
    resultDigestPosture: "deterministic preview digest only",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    artifactReferenceState: "not persisted",
    blockedDefaultReason: `Synthetic result envelope remains preview-only for ${contract.requestLabel} because no provider response, model output, result id, audit join, approval join, or persistence exists.`,
    explicitNoRealResultNoPersistenceStatement:
      "No real result. No result persistence.",
  };
}

const SYNTHETIC_RESULT_ENVELOPES = RESULT_CAPTURE_CONTRACTS.map((contract) =>
  buildSyntheticResultEnvelopeRecord(contract)
);

function buildResultCaptureRequestRecord(
  contract: BackendOwnedSyntheticDryRunResultCaptureContractRecord
): ResultCaptureRequestContractRecord {
  return {
    id: contract.id,
    key: buildStableResultCaptureRequestKey(contract.id),
    requestContractVersion:
      "backend-owned-synthetic-result-capture-request-contract-v1",
    requestLabel: contract.requestLabel,
    workspaceTarget: contract.workspaceTarget,
    captureContractId: contract.id,
    sourceSyntheticResultEnvelopeReference:
      buildStableSyntheticResultEnvelopeKey(contract.id),
    sourceRunnerSkeletonReference: contract.sourceSyntheticRunnerSkeletonReference,
    captureRequestState: "not created",
    captureInvocationState: "not invoked",
    captureMode: "preview-only",
    resultPayloadPosture: "static placeholder only",
    resultIdPosture: "not issued",
    resultDigestPosture: "deterministic preview digest only",
    auditReferencePosture: "preview-only",
    approvalReferencePosture: "preview-only",
    persistenceTargetPosture: "not implemented",
    databaseWritePosture: "not implemented",
    fileWritePosture: "not implemented",
    blockedDefaultReason: `Result capture request remains preview-only for ${contract.requestLabel} because no capture request is created, no invocation exists, and no persistence target is implemented.`,
    explicitNoCaptureRequestCreatedStatement:
      "No capture request created.",
  };
}

const RESULT_CAPTURE_REQUESTS = RESULT_CAPTURE_CONTRACTS.map((contract) =>
  buildResultCaptureRequestRecord(contract)
);

function buildResultCaptureResponseRecord(
  contract: BackendOwnedSyntheticDryRunResultCaptureContractRecord
): ResultCaptureResponseContractRecord {
  return {
    id: contract.id,
    key: buildStableResultCaptureResponseKey(contract.id),
    responseContractVersion:
      "backend-owned-synthetic-result-capture-response-contract-v1",
    requestLabel: contract.requestLabel,
    workspaceTarget: contract.workspaceTarget,
    captureContractId: contract.id,
    sourceCaptureRequestReference: buildStableResultCaptureRequestKey(contract.id),
    responseState: "not received",
    captureDecisionState: "not evaluated",
    resultCaptureState: "not captured",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    artifactPersistenceState: "not implemented",
    resultIdState: "not issued",
    resultLocationState: "not available",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    blockedDefaultReason: `Result capture response remains preview-only for ${contract.requestLabel} because no request exists, no decision is evaluated, and no result or persistence location is available.`,
    explicitNoCaptureResponseNoPersistenceStatement:
      "No capture response. No persistence.",
  };
}

const RESULT_CAPTURE_RESPONSES = RESULT_CAPTURE_CONTRACTS.map((contract) =>
  buildResultCaptureResponseRecord(contract)
);

function buildResultCaptureErrorRecord(
  contract: BackendOwnedSyntheticDryRunResultCaptureContractRecord
): ResultCaptureErrorContractRecord {
  return {
    id: contract.id,
    key: buildStableResultCaptureErrorKey(contract.id),
    errorContractVersion:
      "backend-owned-synthetic-result-capture-error-contract-v1",
    requestLabel: contract.requestLabel,
    workspaceTarget: contract.workspaceTarget,
    captureContractId: contract.id,
    sourceCaptureRequestReference: buildStableResultCaptureRequestKey(contract.id),
    errorState: "not received",
    validationErrorExamples: [
      "capture contract id is required before any backend-owned result capture review can proceed",
      "synthetic result envelope reference must remain preview-only and deterministic",
      "result digest posture must remain deterministic preview digest only",
    ],
    missingSyntheticOutputExample:
      "Missing synthetic output fixture reference keeps result capture blocked in preview-only posture.",
    missingAuditJoinExample:
      "Missing audit join reference blocks any backend-owned result capture review from claiming persistence.",
    missingApprovalJoinExample:
      "Missing approval join reference blocks any result capture promotion beyond preview-only posture.",
    persistenceDeniedExample:
      "Persistence denied because result persistence remains not implemented in this batch.",
    databaseWriteBlockedExample:
      "Database write blocked because database writes remain not implemented in this batch.",
    fileWriteBlockedExample:
      "File write blocked because file writes remain not implemented in this batch.",
    artifactPersistenceBlockedExample:
      "Artifact persistence blocked because artifact persistence remains not implemented in this batch.",
    privacyRedactionDeniedExample:
      "Privacy/redaction denied because manual review only remains required before any backend-owned result handling.",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    recoveryPosture: "manual review only",
    explicitNoCaptureErrorNoRetryNoFallbackStatement:
      "No capture error. No retry. No fallback.",
  };
}

const RESULT_CAPTURE_ERRORS = RESULT_CAPTURE_CONTRACTS.map((contract) =>
  buildResultCaptureErrorRecord(contract)
);

const RESULT_CAPTURE_GATE_SEEDS = [
  {
    id: "synthetic-runner-skeleton",
    label: "synthetic runner skeleton",
    owner: "backend capture contract",
    requiredState:
      "reviewed / preview-only synthetic runner skeleton reference required",
    evidenceRequirement:
      "Synthetic runner skeleton reference and blocked execution posture remain visible.",
    blockedDefaultReason:
      "Synthetic runner skeleton remains preview-only and cannot hand off a real capture payload.",
  },
  {
    id: "synthetic-output-fixture",
    label: "synthetic output fixture",
    owner: "backend capture contract",
    requiredState:
      "reviewed / preview-only synthetic output fixture reference required",
    evidenceRequirement:
      "Synthetic output fixture reference and placeholder payload posture remain visible.",
    blockedDefaultReason:
      "Synthetic output fixture remains static placeholder only and cannot supply a real provider response.",
  },
  {
    id: "synthetic-error-fixture",
    label: "synthetic error fixture",
    owner: "backend capture contract",
    requiredState:
      "reviewed / preview-only synthetic error fixture reference required",
    evidenceRequirement:
      "Synthetic error fixture reference and manual review recovery posture remain visible.",
    blockedDefaultReason:
      "Synthetic error fixture remains preview-only and cannot represent a real provider error.",
  },
  {
    id: "synthetic-result-envelope",
    label: "synthetic result envelope",
    owner: "backend capture contract",
    requiredState: "preview-only result envelope contract required",
    evidenceRequirement:
      "Static placeholder payload, no real result, and deterministic preview digest posture remain visible.",
    blockedDefaultReason:
      "Synthetic result envelope remains preview-only and cannot persist or issue a result id.",
  },
  {
    id: "result-capture-request",
    label: "result capture request",
    owner: "backend capture contract",
    requiredState: "preview-only result capture request contract required",
    evidenceRequirement:
      "Capture request state not created and invocation state not invoked remain visible.",
    blockedDefaultReason:
      "Result capture request is not created and cannot trigger backend-owned capture behavior.",
  },
  {
    id: "result-capture-response",
    label: "result capture response",
    owner: "backend capture contract",
    requiredState: "preview-only result capture response contract required",
    evidenceRequirement:
      "Response state not received and result capture state not captured remain visible.",
    blockedDefaultReason:
      "Result capture response is not received and cannot claim any persistence outcome.",
  },
  {
    id: "result-capture-error",
    label: "result capture error",
    owner: "backend capture contract",
    requiredState: "preview-only result capture error contract required",
    evidenceRequirement:
      "Manual-review-only recovery posture and disabled retry/fallback posture remain visible.",
    blockedDefaultReason:
      "Result capture error remains preview-only and does not enable retry or fallback execution.",
  },
  {
    id: "operator-approval",
    label: "operator approval",
    owner: "operator",
    requiredState: "manual approval required",
    evidenceRequirement:
      "Explicit manual approval requirement remains visible before any future backend-owned result handling.",
    blockedDefaultReason:
      "Operator approval remains required before any backend-owned capture review or recovery progression.",
  },
  {
    id: "manual-confirmation",
    label: "manual confirmation",
    owner: "operator",
    requiredState: "manual confirmation required",
    evidenceRequirement:
      "Explicit manual confirmation requirement remains visible for any future capture workflow.",
    blockedDefaultReason:
      "Manual confirmation remains required before any backend-owned result capture action can be considered.",
  },
  {
    id: "kill-switch",
    label: "kill switch",
    owner: "operator",
    requiredState: "kill switch required",
    evidenceRequirement:
      "Kill switch requirement and blocked-by-default execution posture remain visible.",
    blockedDefaultReason:
      "Kill switch remains required because result capture execution stays blocked by default.",
  },
  {
    id: "audit",
    label: "audit",
    owner: "safety review",
    requiredState: "audit required",
    evidenceRequirement:
      "Audit requirement and no audit persistence posture remain visible.",
    blockedDefaultReason:
      "Audit remains required while audit persistence remains not implemented in this batch.",
  },
  {
    id: "server-only-boundary",
    label: "server-only boundary",
    owner: "backend capture contract",
    requiredState: "server-only boundary required",
    evidenceRequirement:
      "Frontend blocked posture and backend server-only requirement remain visible.",
    blockedDefaultReason:
      "Server-only boundary remains required because frontend capture execution is blocked.",
  },
  {
    id: "no-frontend-provider-call",
    label: "no frontend provider call",
    owner: "backend capture contract",
    requiredState: "no frontend provider call enforced",
    evidenceRequirement:
      "No frontend provider call posture remains visible on all result capture previews.",
    blockedDefaultReason:
      "Frontend provider calls remain blocked and cannot participate in result capture.",
  },
  {
    id: "no-provider-sdk-import-in-frontend",
    label: "no provider SDK import in frontend",
    owner: "backend capture contract",
    requiredState: "no provider SDK import in frontend enforced",
    evidenceRequirement:
      "No provider SDK imports posture remains visible on the contract layer.",
    blockedDefaultReason:
      "Provider SDK imports remain blocked in frontend result capture previews.",
  },
  {
    id: "no-prompt-sending",
    label: "no prompt sending",
    owner: "backend capture contract",
    requiredState: "no prompt sending enforced",
    evidenceRequirement:
      "Prompt sending posture remains not implemented and blocked.",
    blockedDefaultReason:
      "Prompt sending remains not implemented and cannot contribute to result capture.",
  },
  {
    id: "opaque-credential-reference",
    label: "opaque credential reference",
    owner: "backend capture contract",
    requiredState: "opaque credential references only",
    evidenceRequirement:
      "Opaque credential reference posture remains visible with no plaintext secrets.",
    blockedDefaultReason:
      "Only opaque credential references are allowed in the preview-only result capture contract.",
  },
  {
    id: "no-plaintext-secrets",
    label: "no plaintext secrets",
    owner: "safety review",
    requiredState: "no plaintext secrets enforced",
    evidenceRequirement:
      "No plaintext secrets posture remains visible on the contract layer.",
    blockedDefaultReason:
      "Plaintext secrets remain blocked from all result capture preview records.",
  },
  {
    id: "privacy-redaction",
    label: "privacy/redaction",
    owner: "safety review",
    requiredState: "privacy/redaction required",
    evidenceRequirement:
      "Privacy/redaction requirement and manual review posture remain visible.",
    blockedDefaultReason:
      "Privacy/redaction remains required before any future backend-owned result review can proceed.",
  },
  {
    id: "cost-rate-timeout",
    label: "cost/rate/timeout",
    owner: "safety review",
    requiredState: "cost acknowledgement, rate limit guard, and timeout/cancel guard required",
    evidenceRequirement:
      "Cost, rate, and timeout guard posture remains visible on preview-only records.",
    blockedDefaultReason:
      "Cost, rate, and timeout safeguards remain required before any future capture recovery path.",
  },
  {
    id: "idempotency-replay-block",
    label: "idempotency/replay block",
    owner: "backend capture contract",
    requiredState: "idempotency required and replay block required",
    evidenceRequirement:
      "Idempotency and replay block posture remains visible on the contract layer.",
    blockedDefaultReason:
      "Idempotency and replay block remain required because no real result capture can run twice or replay in preview-only posture.",
  },
  {
    id: "single-run-lock",
    label: "single-run lock",
    owner: "backend capture contract",
    requiredState: "single-run lock required",
    evidenceRequirement:
      "Single-run lock requirement remains visible on preview-only records.",
    blockedDefaultReason:
      "Single-run lock remains required before any backend-owned result capture execution path could exist.",
  },
  {
    id: "no-queue-dispatch",
    label: "no queue dispatch",
    owner: "backend capture contract",
    requiredState: "no queue dispatch enforced",
    evidenceRequirement:
      "Queue dispatch blocked posture remains visible.",
    blockedDefaultReason:
      "Queue dispatch remains blocked and cannot be used for result capture in this batch.",
  },
  {
    id: "no-worker-dispatch",
    label: "no worker dispatch",
    owner: "backend capture contract",
    requiredState: "no worker dispatch enforced",
    evidenceRequirement:
      "Worker dispatch blocked posture remains visible.",
    blockedDefaultReason:
      "Worker dispatch remains blocked and cannot be used for result capture in this batch.",
  },
  {
    id: "no-job-execution",
    label: "no job execution",
    owner: "backend capture contract",
    requiredState: "no job execution enforced",
    evidenceRequirement:
      "Job execution blocked posture remains visible.",
    blockedDefaultReason:
      "Job execution remains blocked and cannot be used for result capture in this batch.",
  },
  {
    id: "no-result-persistence",
    label: "no result persistence",
    owner: "backend capture contract",
    requiredState: "result persistence remains not implemented",
    evidenceRequirement:
      "No result persistence posture remains visible on contracts, envelopes, requests, responses, and join previews.",
    blockedDefaultReason:
      "Result persistence remains not implemented in this batch.",
  },
  {
    id: "no-audit-persistence",
    label: "no audit persistence",
    owner: "safety review",
    requiredState: "audit persistence remains not implemented",
    evidenceRequirement:
      "No audit persistence posture remains visible across result capture previews.",
    blockedDefaultReason:
      "Audit persistence remains not implemented in this batch.",
  },
  {
    id: "no-approval-persistence",
    label: "no approval persistence",
    owner: "operator",
    requiredState: "approval persistence remains not implemented",
    evidenceRequirement:
      "No approval persistence posture remains visible across result capture previews.",
    blockedDefaultReason:
      "Approval persistence remains not implemented in this batch.",
  },
  {
    id: "no-database-writes",
    label: "no database writes",
    owner: "backend capture contract",
    requiredState: "database writes remain not implemented",
    evidenceRequirement:
      "No database write posture remains visible across requests, responses, errors, and joins.",
    blockedDefaultReason:
      "Database writes remain not implemented in this batch.",
  },
  {
    id: "no-file-writes",
    label: "no file writes",
    owner: "backend capture contract",
    requiredState: "file writes remain not implemented",
    evidenceRequirement:
      "No file write posture remains visible across requests, responses, errors, and joins.",
    blockedDefaultReason:
      "File writes remain not implemented in this batch.",
  },
] as const satisfies readonly ResultCaptureGateSeed[];

function buildResultCaptureGateRecord(
  seed: ResultCaptureGateSeed
): ResultCaptureGateRecord {
  return {
    id: seed.id,
    key: buildStableResultCaptureGateKey(seed.id),
    gateVersion: "backend-owned-synthetic-result-capture-gate-v1",
    label: seed.label,
    owner: seed.owner,
    requiredState: seed.requiredState,
    currentState: "preview-only / blocked",
    evidenceRequirement: seed.evidenceRequirement,
    blockedDefaultReason: seed.blockedDefaultReason,
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

const RESULT_CAPTURE_GATES = RESULT_CAPTURE_GATE_SEEDS.map((seed) =>
  buildResultCaptureGateRecord(seed)
);

function buildResultCaptureReadinessRecord(
  contract: BackendOwnedSyntheticDryRunResultCaptureContractRecord
): ResultCaptureReadinessMatrixRecord {
  return {
    id: contract.id,
    key: buildStableResultCaptureReadinessKey(contract.id),
    readinessVersion: "backend-owned-synthetic-result-capture-readiness-v1",
    requestLabel: contract.requestLabel,
    label: `${contract.requestLabel} result capture readiness`,
    workspaceTarget: contract.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(
      contract.selectedCapabilityFamily
    ),
    captureContractState: "preview-only / contract-defined",
    resultEnvelopeState: "preview-only",
    captureRequestContractState: "preview-only",
    captureResponseContractState: "preview-only",
    captureErrorContractState: "preview-only",
    gateSchemaState: "preview-only / blocked",
    syntheticRunnerSkeletonDependency: "reviewed / preview-only",
    syntheticOutputFixtureDependency: "reviewed / preview-only",
    syntheticErrorFixtureDependency: "reviewed / preview-only",
    credentialBoundaryState: "opaque credential references only",
    safetyBoundaryState: "manual review only / blocked",
    auditBoundaryState: "preview-only / not persisted",
    approvalBoundaryState: "preview-only / not persisted",
    resultPersistenceBoundaryState: "not implemented",
    auditPersistenceBoundaryState: "not implemented",
    approvalPersistenceBoundaryState: "not implemented",
    databaseBoundaryState: "not implemented",
    fileBoundaryState: "not implemented",
    currentReadiness: "capture-contract-only / not persistent",
    nextSafeAction: buildCaptureContractNextSafeAction(contract.workspaceTarget),
  };
}

const RESULT_CAPTURE_READINESS_RECORDS = RESULT_CAPTURE_CONTRACTS.map((contract) =>
  buildResultCaptureReadinessRecord(contract)
);

function buildResultCaptureAuditApprovalJoinPreviewRecord(
  contract: BackendOwnedSyntheticDryRunResultCaptureContractRecord
): ResultCaptureAuditApprovalJoinPreviewRecord {
  return {
    id: contract.id,
    key: buildStableResultCaptureAuditApprovalJoinKey(contract.id),
    joinPreviewVersion:
      "backend-owned-synthetic-result-capture-audit-approval-join-preview-v1",
    requestLabel: contract.requestLabel,
    workspaceTarget: contract.workspaceTarget,
    captureContractId: contract.id,
    sourceResultEnvelopeReference: buildStableSyntheticResultEnvelopeKey(
      contract.id
    ),
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    resultReferenceState: "not persisted",
    evidenceSummary:
      "Synthetic result envelope reference, deterministic preview digest posture, and manual-review-only evidence requirements remain visible.",
    blockedActionSummary:
      "Result capture, audit persistence, approval persistence, database writes, and file writes remain blocked by default.",
    noResultPersistenceStatement:
      "No result persistence statement: result persistence is not implemented.",
    noAuditPersistenceStatement:
      "No audit persistence statement: audit persistence is not implemented.",
    noApprovalPersistenceStatement:
      "No approval persistence statement: approval persistence is not implemented.",
    noDatabaseWriteStatement:
      "No database write statement: database write is not implemented.",
    noFileWriteStatement:
      "No file write statement: file write is not implemented.",
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

const RESULT_CAPTURE_AUDIT_APPROVAL_JOIN_PREVIEWS = RESULT_CAPTURE_CONTRACTS.map(
  (contract) => buildResultCaptureAuditApprovalJoinPreviewRecord(contract)
);

function cloneResultCaptureContract(
  record: BackendOwnedSyntheticDryRunResultCaptureContractRecord
): BackendOwnedSyntheticDryRunResultCaptureContractRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function cloneResultEnvelope(
  record: SyntheticResultEnvelopeContractRecord
): SyntheticResultEnvelopeContractRecord {
  return { ...record };
}

function cloneResultCaptureRequest(
  record: ResultCaptureRequestContractRecord
): ResultCaptureRequestContractRecord {
  return { ...record };
}

function cloneResultCaptureResponse(
  record: ResultCaptureResponseContractRecord
): ResultCaptureResponseContractRecord {
  return { ...record };
}

function cloneResultCaptureError(
  record: ResultCaptureErrorContractRecord
): ResultCaptureErrorContractRecord {
  return {
    ...record,
    validationErrorExamples: cloneList(record.validationErrorExamples),
  };
}

function cloneGateRecord(record: ResultCaptureGateRecord): ResultCaptureGateRecord {
  return { ...record };
}

function cloneReadinessRecord(
  record: ResultCaptureReadinessMatrixRecord
): ResultCaptureReadinessMatrixRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function cloneJoinPreview(
  record: ResultCaptureAuditApprovalJoinPreviewRecord
): ResultCaptureAuditApprovalJoinPreviewRecord {
  return { ...record };
}

export function listBackendOwnedSyntheticDryRunResultCaptureContracts():
  readonly BackendOwnedSyntheticDryRunResultCaptureContractRecord[] {
  return RESULT_CAPTURE_CONTRACTS.map((record) =>
    cloneResultCaptureContract(record)
  );
}

export function listSyntheticResultEnvelopeContracts():
  readonly SyntheticResultEnvelopeContractRecord[] {
  return SYNTHETIC_RESULT_ENVELOPES.map((record) => cloneResultEnvelope(record));
}

export function listResultCaptureRequestContracts():
  readonly ResultCaptureRequestContractRecord[] {
  return RESULT_CAPTURE_REQUESTS.map((record) => cloneResultCaptureRequest(record));
}

export function listResultCaptureResponseContracts():
  readonly ResultCaptureResponseContractRecord[] {
  return RESULT_CAPTURE_RESPONSES.map((record) =>
    cloneResultCaptureResponse(record)
  );
}

export function listResultCaptureErrorContracts():
  readonly ResultCaptureErrorContractRecord[] {
  return RESULT_CAPTURE_ERRORS.map((record) => cloneResultCaptureError(record));
}

export function listResultCaptureGateRecords(): readonly ResultCaptureGateRecord[] {
  return RESULT_CAPTURE_GATES.map((record) => cloneGateRecord(record));
}

export function listResultCaptureReadinessMatrixRecords():
  readonly ResultCaptureReadinessMatrixRecord[] {
  return RESULT_CAPTURE_READINESS_RECORDS.map((record) =>
    cloneReadinessRecord(record)
  );
}

export function listResultCaptureAuditApprovalJoinPreviews():
  readonly ResultCaptureAuditApprovalJoinPreviewRecord[] {
  return RESULT_CAPTURE_AUDIT_APPROVAL_JOIN_PREVIEWS.map((record) =>
    cloneJoinPreview(record)
  );
}

function buildCapabilityFamilyGroup(
  capabilityFamilyLabel: BackendOwnedSyntheticDryRunResultCaptureContractRecord["selectedCapabilityFamily"]["label"],
  contracts: readonly BackendOwnedSyntheticDryRunResultCaptureContractRecord[]
): ResultCaptureContractCapabilityFamilyGroup {
  const firstContract = contracts[0];

  if (!firstContract) {
    throw new Error(
      `Cannot build result capture capability family group without contracts: ${capabilityFamilyLabel}`
    );
  }

  return {
    capabilityFamilyId: firstContract.selectedCapabilityFamily.id,
    capabilityFamilyLabel,
    contractCount: contracts.length,
    contracts: contracts.map((contract) => cloneResultCaptureContract(contract)),
  };
}

export function groupResultCaptureContractsByCapabilityFamily():
  readonly ResultCaptureContractCapabilityFamilyGroup[] {
  const groups = new Map<
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["selectedCapabilityFamily"]["label"],
    BackendOwnedSyntheticDryRunResultCaptureContractRecord[]
  >();

  for (const contract of RESULT_CAPTURE_CONTRACTS) {
    const label = contract.selectedCapabilityFamily.label;
    const existing = groups.get(label);

    if (existing) {
      existing.push(contract);
      continue;
    }

    groups.set(label, [contract]);
  }

  return Array.from(groups.entries()).map(([label, contracts]) =>
    buildCapabilityFamilyGroup(label, contracts)
  );
}

function buildWorkspaceGroup(
  workspaceTarget: AiModelProviderWorkspaceTarget,
  contracts: readonly BackendOwnedSyntheticDryRunResultCaptureContractRecord[]
): ResultCaptureContractWorkspaceGroup {
  return {
    workspaceTarget,
    contractCount: contracts.length,
    contracts: contracts.map((contract) => cloneResultCaptureContract(contract)),
  };
}

export function groupResultCaptureContractsByWorkspaceTarget():
  readonly ResultCaptureContractWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedSyntheticDryRunResultCaptureContractRecord[]
  >();

  for (const contract of RESULT_CAPTURE_CONTRACTS) {
    const existing = groups.get(contract.workspaceTarget);

    if (existing) {
      existing.push(contract);
      continue;
    }

    groups.set(contract.workspaceTarget, [contract]);
  }

  return Array.from(groups.entries()).map(([workspaceTarget, contracts]) =>
    buildWorkspaceGroup(workspaceTarget, contracts)
  );
}

export function buildResultCaptureContractSummary():
  ResultCaptureContractSummary {
  const capabilityGroups = groupResultCaptureContractsByCapabilityFamily();
  const workspaceGroups = groupResultCaptureContractsByWorkspaceTarget();

  return {
    currentBatch: BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    contractCount: RESULT_CAPTURE_CONTRACTS.length,
    resultEnvelopeCount: SYNTHETIC_RESULT_ENVELOPES.length,
    requestContractCount: RESULT_CAPTURE_REQUESTS.length,
    responseContractCount: RESULT_CAPTURE_RESPONSES.length,
    errorContractCount: RESULT_CAPTURE_ERRORS.length,
    gateCount: RESULT_CAPTURE_GATES.length,
    readinessRecordCount: RESULT_CAPTURE_READINESS_RECORDS.length,
    joinPreviewCount: RESULT_CAPTURE_AUDIT_APPROVAL_JOIN_PREVIEWS.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    resultCaptureState: "not captured",
    currentReadiness: "capture-contract-only / not persistent",
    summaryLines: cloneList(RESULT_CAPTURE_SUMMARY_LINES),
  };
}

export function buildResultCaptureGateSummary(): ResultCaptureGateSummary {
  return {
    currentBatch: BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    gateCount: RESULT_CAPTURE_GATES.length,
    backendCaptureContractGateCount: RESULT_CAPTURE_GATES.filter(
      (record) => record.owner === "backend capture contract"
    ).length,
    operatorGateCount: RESULT_CAPTURE_GATES.filter(
      (record) => record.owner === "operator"
    ).length,
    safetyReviewGateCount: RESULT_CAPTURE_GATES.filter(
      (record) => record.owner === "safety review"
    ).length,
    summaryLines: cloneList(RESULT_CAPTURE_GATE_SUMMARY_LINES),
  };
}

export function buildResultCaptureReadinessSummary():
  ResultCaptureReadinessSummary {
  const nextSafeAction =
    "Keep backend-owned synthetic dry-run result capture preview-only, non-persistent, and move to review and recovery preview next.";

  return {
    currentBatch: BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    readinessRecordCount: RESULT_CAPTURE_READINESS_RECORDS.length,
    currentReadiness: "capture-contract-only / not persistent",
    nextSafeAction,
    summaryLines: cloneList(RESULT_CAPTURE_READINESS_SUMMARY_LINES),
  };
}

export function buildNextResultCaptureReviewAndRecoveryChecklist():
  readonly string[] {
  return cloneList(NEXT_RESULT_CAPTURE_REVIEW_RECOVERY_CHECKLIST);
}
