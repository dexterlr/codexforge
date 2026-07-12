import type {
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  buildStableBackendContractGateSchemaKey,
  listBackendAdmissionErrorContracts,
  listBackendAdmissionRequestContracts,
  listBackendAdmissionResponseContracts,
  listBackendContractReadinessMatrixRecords,
  listBackendOwnedModelProviderRunAdmissionContracts,
  type BackendAdmissionErrorContractRecord,
  type BackendAdmissionRequestContractRecord,
  type BackendAdmissionResponseContractRecord,
  type BackendContractReadinessMatrixRecord,
  type BackendOwnedModelProviderRunAdmissionContractRecord,
} from "../backend-owned-model-provider-run-admission-contract";
import {
  BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
  BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_PHASE,
  NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
  type BackendDryRunErrorContractKey,
  type BackendDryRunErrorContractRecord,
  type BackendDryRunRequestContractKey,
  type BackendDryRunRequestContractRecord,
  type BackendDryRunResponseContractKey,
  type BackendDryRunResponseContractRecord,
  type BackendDryRunRunnerContractCapabilityFamilyGroup,
  type BackendDryRunRunnerContractId,
  type BackendDryRunRunnerContractKey,
  type BackendDryRunRunnerContractSummary,
  type BackendDryRunRunnerContractWorkspaceGroup,
  type BackendDryRunRunnerCurrentReadiness,
  type BackendDryRunRunnerGateId,
  type BackendDryRunRunnerGateLabel,
  type BackendDryRunRunnerGateOwner,
  type BackendDryRunRunnerGateSchemaKey,
  type BackendDryRunRunnerGateSchemaRecord,
  type BackendDryRunRunnerGateSchemaSeed,
  type BackendDryRunRunnerGateSummary,
  type BackendDryRunRunnerHandoffPreviewKey,
  type BackendDryRunRunnerHandoffPreviewRecord,
  type BackendDryRunRunnerReadinessMatrixKey,
  type BackendDryRunRunnerReadinessMatrixRecord,
  type BackendDryRunRunnerReadinessSummary,
  type BackendOwnedModelProviderDryRunRunnerContractRecord,
} from "./backend-owned-model-provider-dry-run-runner-contract-types";

const CONTRACT_SUMMARY_LINES = [
  "backend-owned model provider dry-run runner contract only",
  "backend-owned dry-run runner contract is preview-only",
  "runner contract state is draft / preview-only",
  "dry-run request is not created",
  "dry-run invocation is not invoked",
  "dry-run execution is not executed",
  "dry-run response is not received",
  "dry-run error is not received",
  "provider response is not received",
  "model output is not generated",
  "fixture result is not produced",
  "dry-run runner request/response/error contracts are preview-only",
  "dry-run runner gate schema is preview-only",
  "dry-run runner readiness matrix is preview-only",
  "current readiness is not executable / contract-only",
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
  "backend-owned dry-run runner review and recovery preview next",
] as const;

const GATE_SUMMARY_LINES = [
  "backend admission contract",
  "admission token",
  "admission lease",
  "operator approval",
  "manual confirmation",
  "approval expiry/revocation",
  "kill switch",
  "audit",
  "server-only boundary",
  "no frontend provider call",
  "no provider SDK import in frontend",
  "no prompt sending from frontend",
  "opaque credential reference",
  "privacy/redaction",
  "cost/rate/timeout",
  "idempotency/replay block",
  "single-run lock",
  "no queue dispatch until backend runner implementation",
  "no worker dispatch until backend runner implementation",
  "no job execution until backend runner implementation",
] as const;

const READINESS_SUMMARY_LINES = [
  "runner contract draft state",
  "dry-run request contract state",
  "dry-run response contract state",
  "dry-run error contract state",
  "runner gate schema state",
  "admission dependency state",
  "provider adapter boundary state",
  "queue/worker/job boundary state",
  "persistence boundary state",
  "current readiness: not executable / contract-only",
  "next safe action",
] as const;

const NEXT_DRY_RUN_RUNNER_REVIEW_RECOVERY_CHECKLIST = [
  "Review dry-run decision review posture before any backend runner invocation path exists.",
  "Review dry-run gate failure and denial posture while queue, worker, and job execution remain blocked.",
  "Review manual recovery-only next steps for dry-run request, response, error, and handoff previews.",
  "Review acceptance, privacy, audit, expiry, and revocation posture before backend runner implementation is discussed.",
  "Keep execution blocked by default until the backend-owned dry-run runner review and recovery preview is complete.",
] as const;

const SOURCE_GATE_SCHEMA_REFERENCE = buildStableBackendContractGateSchemaKey(
  "server-only-boundary"
);

const BACKEND_ADMISSION_CONTRACTS =
  listBackendOwnedModelProviderRunAdmissionContracts();
const BACKEND_ADMISSION_REQUESTS = listBackendAdmissionRequestContracts();
const BACKEND_ADMISSION_RESPONSES = listBackendAdmissionResponseContracts();
const BACKEND_ADMISSION_ERRORS = listBackendAdmissionErrorContracts();
const BACKEND_ADMISSION_READINESS =
  listBackendContractReadinessMatrixRecords();

const BACKEND_ADMISSION_REQUESTS_BY_ID = new Map(
  BACKEND_ADMISSION_REQUESTS.map((record) => [record.id, record] as const)
);
const BACKEND_ADMISSION_RESPONSES_BY_ID = new Map(
  BACKEND_ADMISSION_RESPONSES.map((record) => [record.id, record] as const)
);
const BACKEND_ADMISSION_ERRORS_BY_ID = new Map(
  BACKEND_ADMISSION_ERRORS.map((record) => [record.id, record] as const)
);
const BACKEND_ADMISSION_READINESS_BY_ID = new Map(
  BACKEND_ADMISSION_READINESS.map((record) => [record.id, record] as const)
);

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneCapabilityFamily(
  family: BackendOwnedModelProviderDryRunRunnerContractRecord["selectedCapabilityFamily"]
): BackendOwnedModelProviderDryRunRunnerContractRecord["selectedCapabilityFamily"] {
  return { ...family };
}

function buildDryRunRunnerContractLabel(
  admissionContract: BackendOwnedModelProviderRunAdmissionContractRecord
): string {
  const suffix = " backend-owned admission contract";

  if (admissionContract.label.endsWith(suffix)) {
    return `${admissionContract.label.slice(
      0,
      admissionContract.label.length - suffix.length
    )} backend-owned dry-run runner contract`;
  }

  return `${admissionContract.label} dry-run runner contract`;
}

function requireAdmissionRequest(
  id: BackendDryRunRunnerContractId
): BackendAdmissionRequestContractRecord {
  const record = BACKEND_ADMISSION_REQUESTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing backend admission request contract for ${id}`);
  }

  return record;
}

function requireAdmissionResponse(
  id: BackendDryRunRunnerContractId
): BackendAdmissionResponseContractRecord {
  const record = BACKEND_ADMISSION_RESPONSES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing backend admission response contract for ${id}`);
  }

  return record;
}

function requireAdmissionError(
  id: BackendDryRunRunnerContractId
): BackendAdmissionErrorContractRecord {
  const record = BACKEND_ADMISSION_ERRORS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing backend admission error contract for ${id}`);
  }

  return record;
}

function requireAdmissionReadiness(
  id: BackendDryRunRunnerContractId
): BackendContractReadinessMatrixRecord {
  const record = BACKEND_ADMISSION_READINESS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing backend admission readiness matrix for ${id}`);
  }

  return record;
}

export function uniqueBackendDryRunRunnerDisplayStrings<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Array.from(new Set(values));
}

export function buildStableBackendDryRunRunnerContractKey(
  id: BackendDryRunRunnerContractId
): BackendDryRunRunnerContractKey {
  return `backend-owned-model-provider-dry-run-runner-contract:${id}`;
}

export function buildStableBackendDryRunRequestContractKey(
  id: BackendDryRunRunnerContractId
): BackendDryRunRequestContractKey {
  return `backend-owned-model-provider-dry-run-request-contract:${id}`;
}

export function buildStableBackendDryRunResponseContractKey(
  id: BackendDryRunRunnerContractId
): BackendDryRunResponseContractKey {
  return `backend-owned-model-provider-dry-run-response-contract:${id}`;
}

export function buildStableBackendDryRunErrorContractKey(
  id: BackendDryRunRunnerContractId
): BackendDryRunErrorContractKey {
  return `backend-owned-model-provider-dry-run-error-contract:${id}`;
}

export function buildStableBackendDryRunRunnerGateSchemaKey(
  id: BackendDryRunRunnerGateId
): BackendDryRunRunnerGateSchemaKey {
  return `backend-owned-model-provider-dry-run-runner-gate-schema:${id}`;
}

export function buildStableBackendDryRunRunnerReadinessMatrixKey(
  id: BackendDryRunRunnerContractId
): BackendDryRunRunnerReadinessMatrixKey {
  return `backend-owned-model-provider-dry-run-runner-readiness-matrix:${id}`;
}

export function buildStableBackendDryRunRunnerHandoffPreviewKey(
  id: BackendDryRunRunnerContractId
): BackendDryRunRunnerHandoffPreviewKey {
  return `backend-owned-model-provider-dry-run-runner-handoff-preview:${id}`;
}

function buildContractNextSafeAction(
  admissionContract: BackendOwnedModelProviderRunAdmissionContractRecord
): string {
  return `Review dry-run runner review and recovery posture for ${admissionContract.workspaceTarget} before any backend runner implementation is considered.`;
}

function buildBackendDryRunRunnerContractRecord(
  admissionContract: BackendOwnedModelProviderRunAdmissionContractRecord
): BackendOwnedModelProviderDryRunRunnerContractRecord {
  const admissionRequest = requireAdmissionRequest(admissionContract.id);
  const admissionResponse = requireAdmissionResponse(admissionContract.id);
  const admissionError = requireAdmissionError(admissionContract.id);
  const admissionReadiness = requireAdmissionReadiness(admissionContract.id);

  return {
    id: admissionContract.id,
    key: buildStableBackendDryRunRunnerContractKey(admissionContract.id),
    contractVersion: "backend-owned-model-provider-dry-run-runner-contract-v1",
    previewOnlyStatement: "backend-owned dry-run runner contract is preview-only",
    label: buildDryRunRunnerContractLabel(admissionContract),
    operatorRequestPhrase: admissionContract.operatorRequestPhrase,
    workspaceTarget: admissionContract.workspaceTarget,
    source: "Athena / Jarvis Model Gateway",
    contractOwner: "backend-owned",
    frontendMode: "preview-only",
    contractMode: "contract-only",
    dryRunRunnerPosture: "contract-defined / not executable",
    runnerInvocationPosture: "not implemented",
    providerCallPosture: "not implemented",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    sourceBackendAdmissionContractReference: admissionContract.key,
    sourceBackendAdmissionRequestContractReference: admissionRequest.key,
    sourceBackendAdmissionResponseContractReference: admissionResponse.key,
    sourceBackendAdmissionErrorContractReference: admissionError.key,
    sourceBackendContractGateSchemaReference: SOURCE_GATE_SCHEMA_REFERENCE,
    sourceBackendContractReadinessMatrixReference: admissionReadiness.key,
    sourceRunIntentReference: admissionContract.sourceRunIntentReference,
    selectedCapabilityFamily: cloneCapabilityFamily(
      admissionContract.selectedCapabilityFamily
    ),
    providerSlotLabel: admissionContract.providerSlotLabel,
    backupProviderSlotLabel: admissionContract.backupProviderSlotLabel,
    localPrivateAlternativeLabel:
      admissionContract.localPrivateAlternativeLabel,
    dryRunRunnerContractState: "draft / preview-only",
    dryRunRequestState: "not created",
    dryRunInvocationState: "not invoked",
    dryRunExecutionState: "not executed",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    fixtureResultState: "not produced",
    admissionTokenState: "not issued",
    admissionLeaseState: "not created",
    queueDispatchState: "not dispatched",
    workerDispatchState: "not dispatched",
    jobExecutionState: "not executed",
    resultCaptureState: "not implemented",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
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
    dryRunResultReviewRequiredInFuture:
      "dry-run result review required in future",
    acceptanceMatrixReviewRequired: "acceptance matrix review required",
    approvalExpiryReviewRequired: "approval expiry review required",
    approvalRevocationReviewRequired: "approval revocation review required",
    noRetryExecution: "no retry execution",
    noFallbackExecution: "no fallback execution",
    blockedDefaultReason:
      `${admissionContract.blockedDefaultReason} Dry-run runner preview does not create requests, invocations, queue dispatches, worker dispatches, jobs, responses, outputs, fixture results, or persistence.`,
    nextSafeAction: buildContractNextSafeAction(admissionContract),
    nextDryRunRunnerReviewRecoveryRequirement:
      "backend-owned dry-run runner review and recovery preview next",
  };
}

const BACKEND_DRY_RUN_RUNNER_CONTRACTS = BACKEND_ADMISSION_CONTRACTS.map(
  (admissionContract) => buildBackendDryRunRunnerContractRecord(admissionContract)
);

function cloneContract(
  record: BackendOwnedModelProviderDryRunRunnerContractRecord
): BackendOwnedModelProviderDryRunRunnerContractRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function buildBackendDryRunRequestContractRecord(
  contract: BackendOwnedModelProviderDryRunRunnerContractRecord
): BackendDryRunRequestContractRecord {
  return {
    id: contract.id,
    key: buildStableBackendDryRunRequestContractKey(contract.id),
    requestContractVersion: "backend-owned-model-provider-dry-run-request-contract-v1",
    previewOnlyStatement: "dry-run request contract preview",
    backendDryRunRunnerContractId: contract.id,
    sourceBackendAdmissionContractReference:
      contract.sourceBackendAdmissionContractReference,
    sourceRunIntentReference: contract.sourceRunIntentReference,
    targetCapabilityFamily: cloneCapabilityFamily(contract.selectedCapabilityFamily),
    targetProviderSlotLabel: contract.providerSlotLabel,
    workspaceTarget: contract.workspaceTarget,
    requestCreationState: "not created",
    runnerInvocationState: "not invoked",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    credentialReferencePosture: "opaque label only",
    approvalReferencePosture: "preview-only",
    auditReferencePosture: "preview-only",
    admissionTokenPosture: "not issued",
    admissionLeasePosture: "not created",
    idempotencyKeyPosture: "deterministic preview key only",
    replayBlockPosture: "replay block required",
    singleRunLockPosture: "single-run lock required",
    timeoutCancelPosture: "timeout/cancel guard required",
    serverOnlyBoundaryRequirement: "server-only required",
    blockedDefaultReason:
      `Backend dry-run request creation stays blocked for ${contract.label} because the runner contract remains draft / preview-only and the frontend cannot cross the server-only boundary.`,
    explicitNoBackendDryRunRequestCreatedStatement:
      "No backend dry-run request is created.",
  };
}

const BACKEND_DRY_RUN_REQUEST_CONTRACTS = BACKEND_DRY_RUN_RUNNER_CONTRACTS.map(
  (contract) => buildBackendDryRunRequestContractRecord(contract)
);

function cloneRequestContract(
  record: BackendDryRunRequestContractRecord
): BackendDryRunRequestContractRecord {
  return {
    ...record,
    targetCapabilityFamily: cloneCapabilityFamily(record.targetCapabilityFamily),
  };
}

function buildBackendDryRunResponseContractRecord(
  contract: BackendOwnedModelProviderDryRunRunnerContractRecord
): BackendDryRunResponseContractRecord {
  return {
    id: contract.id,
    key: buildStableBackendDryRunResponseContractKey(contract.id),
    responseContractVersion: "backend-owned-model-provider-dry-run-response-contract-v1",
    previewOnlyStatement: "dry-run response contract preview",
    backendDryRunRunnerContractId: contract.id,
    requestContractReference: buildStableBackendDryRunRequestContractKey(contract.id),
    responseState: "not received",
    dryRunDecisionState: "not evaluated",
    runnerInvocationState: "not invoked",
    dryRunExecutionState: "not executed",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    fixtureResultState: "not produced",
    tokenCostAccountingState: "not available",
    queueDispatchState: "not dispatched",
    workerDispatchState: "not dispatched",
    jobExecutionState: "not executed",
    resultState: "not available",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    blockedDefaultReason:
      `Backend dry-run response remains absent for ${contract.label} because no dry-run request, runner invocation, queue dispatch, worker dispatch, job execution, provider response, or model output exists yet.`,
    explicitNoBackendDryRunResponseReceivedStatement:
      "No backend dry-run response is received.",
  };
}

const BACKEND_DRY_RUN_RESPONSE_CONTRACTS = BACKEND_DRY_RUN_RUNNER_CONTRACTS.map(
  (contract) => buildBackendDryRunResponseContractRecord(contract)
);

function cloneResponseContract(
  record: BackendDryRunResponseContractRecord
): BackendDryRunResponseContractRecord {
  return { ...record };
}

function buildValidationErrorExamples(
  contract: BackendOwnedModelProviderDryRunRunnerContractRecord
): readonly string[] {
  return [
    `Validation rejects ${contract.label} because runner contract state is draft / preview-only.`,
    `Validation rejects ${contract.label} because prompt payload posture remains redacted placeholder only.`,
    `Validation rejects ${contract.label} because server-only boundary evidence is required before any dry-run request exists.`,
  ] as const;
}

function buildAdmissionDeniedExamples(
  contract: BackendOwnedModelProviderDryRunRunnerContractRecord
): readonly string[] {
  return [
    `Admission denies ${contract.label} because manual approval is still required.`,
    `Admission denies ${contract.label} because manual confirmation is still required.`,
    `Admission denies ${contract.label} because admission token and lease are still absent.`,
  ] as const;
}

function buildBackendDryRunErrorContractRecord(
  contract: BackendOwnedModelProviderDryRunRunnerContractRecord
): BackendDryRunErrorContractRecord {
  return {
    id: contract.id,
    key: buildStableBackendDryRunErrorContractKey(contract.id),
    errorContractVersion: "backend-owned-model-provider-dry-run-error-contract-v1",
    previewOnlyStatement: "dry-run error contract preview",
    backendDryRunRunnerContractId: contract.id,
    requestContractReference: buildStableBackendDryRunRequestContractKey(
      contract.id
    ),
    errorState: "not received",
    validationErrorExamples: buildValidationErrorExamples(contract),
    admissionDeniedExamples: buildAdmissionDeniedExamples(contract),
    runnerInvocationDeniedExample:
      `Runner invocation is denied for ${contract.label} because runner invocation posture remains not implemented.`,
    killSwitchDenialExample:
      `Kill switch denial holds ${contract.label} because execution remains blocked by default.`,
    approvalStaleDenialExample:
      `Approval stale denial holds ${contract.label} because approval expiry and revocation review remain unresolved.`,
    credentialBoundaryDenialExample:
      `Credential boundary denial holds ${contract.label} because only opaque credential references are allowed.`,
    privacyRedactionDenialExample:
      `Privacy/redaction denial holds ${contract.label} because prompt posture remains redacted placeholder only.`,
    rateTimeoutDenialExample:
      `Rate/timeout denial holds ${contract.label} because cost, rate, and timeout guards remain contract-only.`,
    queueDispatchBlockedExample:
      `Queue dispatch stays blocked for ${contract.label} until backend runner implementation exists.`,
    workerDispatchBlockedExample:
      `Worker dispatch stays blocked for ${contract.label} until backend runner implementation exists.`,
    jobExecutionBlockedExample:
      `Job execution stays blocked for ${contract.label} until backend runner implementation exists.`,
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    recoveryPosture: "manual review only",
    explicitNoBackendDryRunErrorReceivedStatement:
      "No backend dry-run error is received.",
  };
}

const BACKEND_DRY_RUN_ERROR_CONTRACTS = BACKEND_DRY_RUN_RUNNER_CONTRACTS.map(
  (contract) => buildBackendDryRunErrorContractRecord(contract)
);

function cloneErrorContract(
  record: BackendDryRunErrorContractRecord
): BackendDryRunErrorContractRecord {
  return {
    ...record,
    validationErrorExamples: cloneList(record.validationErrorExamples),
    admissionDeniedExamples: cloneList(record.admissionDeniedExamples),
  };
}

const GATE_SCHEMA_SEEDS = [
  {
    id: "backend-admission-contract",
    label: "backend admission contract",
    owner: "backend-owned runner contract",
    requiredState:
      "required / backend admission contract reference must stay visible before any runner implementation exists",
    evidenceRequirement:
      "Reference to the backend-owned model provider run admission contract for the same capability family and workspace target.",
    blockedDefaultReason:
      "Dry-run runner preview depends on the prior backend admission contract and does not bypass it.",
  },
  {
    id: "admission-token",
    label: "admission token",
    owner: "backend-owned runner contract",
    requiredState:
      "required / admission token must exist before backend dry-run execution can ever be evaluated",
    evidenceRequirement:
      "Admission token posture showing the frontend never issues a token in this batch.",
    blockedDefaultReason:
      "No admission token is issued from the preview-only runner contract layer.",
  },
  {
    id: "admission-lease",
    label: "admission lease",
    owner: "backend-owned runner contract",
    requiredState:
      "required / admission lease must exist before backend dry-run execution can ever be evaluated",
    evidenceRequirement:
      "Admission lease posture showing no lease is created in this batch.",
    blockedDefaultReason:
      "No admission lease is created from the preview-only runner contract layer.",
  },
  {
    id: "operator-approval",
    label: "operator approval",
    owner: "operator",
    requiredState:
      "required / explicit operator approval must exist before dry-run execution can ever be discussed",
    evidenceRequirement:
      "Explicit operator approval scope for the selected capability family, workspace target, and provider slot lane.",
    blockedDefaultReason:
      "Dry-run runner preview never authorizes backend execution without explicit operator approval.",
  },
  {
    id: "manual-confirmation",
    label: "manual confirmation",
    owner: "operator",
    requiredState:
      "required / manual confirmation must hold before backend dry-run request creation exists",
    evidenceRequirement:
      "Manual confirmation record for the selected dry-run lane.",
    blockedDefaultReason:
      "Manual confirmation remains unsatisfied while the runner contract stays preview-only.",
  },
  {
    id: "approval-scope",
    label: "approval scope",
    owner: "operator",
    requiredState:
      "required / approval scope must stay explicit, bounded, and reviewable",
    evidenceRequirement:
      "Bounded approval scope covering workspace, capability family, provider slot, and dry-run-only posture.",
    blockedDefaultReason:
      "Approval scope is not promoted from preview into backend execution in this batch.",
  },
  {
    id: "approval-expiry",
    label: "approval expiry",
    owner: "operator",
    requiredState:
      "required / approval expiry must be reviewed before backend dry-run request creation exists",
    evidenceRequirement:
      "Approval expiry review tied to the draft runner contract and future recovery preview.",
    blockedDefaultReason:
      "Approval expiry remains review-only in the frontend runner contract layer.",
  },
  {
    id: "approval-revocation",
    label: "approval revocation",
    owner: "operator",
    requiredState:
      "required / approval revocation must remain visible before backend execution exists",
    evidenceRequirement:
      "Revocation posture proving the future backend path can be stopped before request, queue, worker, or job execution.",
    blockedDefaultReason:
      "Approval revocation remains contract-only and non-executable in the frontend preview.",
  },
  {
    id: "kill-switch",
    label: "kill switch",
    owner: "safety review",
    requiredState:
      "required / kill switch must stay reviewable and engaged-by-default until backend runner gates pass",
    evidenceRequirement:
      "Kill-switch evidence showing the dry-run lane remains blocked by default.",
    blockedDefaultReason:
      "The runner contract layer preserves a blocked-by-default kill switch posture.",
  },
  {
    id: "audit",
    label: "audit",
    owner: "safety review",
    requiredState:
      "required / audit posture must exist even while audit persistence remains unavailable",
    evidenceRequirement:
      "Audit requirement showing the dry-run lane is reviewable without persistence.",
    blockedDefaultReason:
      "Audit persistence is not implemented, so the runner contract stays preview-only.",
  },
  {
    id: "server-only-boundary",
    label: "server-only boundary",
    owner: "backend-owned runner contract",
    requiredState:
      "required / backend dry-run runner must remain server-only",
    evidenceRequirement:
      "Server-only boundary language proving the frontend never crosses into provider execution.",
    blockedDefaultReason:
      "Frontend preview cannot cross the server-only boundary.",
  },
  {
    id: "no-frontend-provider-call",
    label: "no frontend provider call",
    owner: "backend-owned runner contract",
    requiredState:
      "required / frontend provider calls must stay disallowed",
    evidenceRequirement:
      "Frontend-safe posture showing provider calls are blocked.",
    blockedDefaultReason:
      "No frontend provider call exists in this contract-only batch.",
  },
  {
    id: "no-provider-sdk-import-in-frontend",
    label: "no provider SDK import in frontend",
    owner: "backend-owned runner contract",
    requiredState:
      "required / provider SDK imports must stay absent from the frontend",
    evidenceRequirement:
      "Frontend source remains free of provider SDK imports.",
    blockedDefaultReason:
      "Provider SDK imports remain disallowed in the frontend contract layer.",
  },
  {
    id: "no-prompt-sending-from-frontend",
    label: "no prompt sending from frontend",
    owner: "backend-owned runner contract",
    requiredState:
      "required / prompt sending must stay blocked from the frontend",
    evidenceRequirement:
      "Prompt posture remains redacted placeholder only and never transmits.",
    blockedDefaultReason:
      "Frontend preview never sends prompts in this batch.",
  },
  {
    id: "opaque-credential-reference",
    label: "opaque credential reference",
    owner: "backend-owned runner contract",
    requiredState:
      "required / only opaque credential references may appear in preview records",
    evidenceRequirement:
      "Opaque credential reference posture with no secret material exposed.",
    blockedDefaultReason:
      "Only opaque credential references are allowed.",
  },
  {
    id: "no-plaintext-secrets",
    label: "no plaintext secrets",
    owner: "backend-owned runner contract",
    requiredState:
      "required / plaintext secrets must stay absent from preview records",
    evidenceRequirement:
      "Secret posture proving no plaintext secret appears in the frontend preview.",
    blockedDefaultReason:
      "Plaintext secrets remain disallowed in the contract layer.",
  },
  {
    id: "privacy-redaction",
    label: "privacy/redaction",
    owner: "safety review",
    requiredState:
      "required / privacy and redaction review must stay visible before backend runner implementation exists",
    evidenceRequirement:
      "Privacy and redaction evidence showing prompt payloads remain placeholders only.",
    blockedDefaultReason:
      "Privacy/redaction remains a required review gate before any backend implementation exists.",
  },
  {
    id: "cost-acknowledgement",
    label: "cost acknowledgement",
    owner: "safety review",
    requiredState:
      "required / cost acknowledgement must exist before backend dry-run execution can be discussed",
    evidenceRequirement:
      "Cost acknowledgement posture tied to the selected provider slot lane.",
    blockedDefaultReason:
      "Cost acknowledgement remains review-only while dry-run execution is blocked.",
  },
  {
    id: "rate-limit-guard",
    label: "rate limit guard",
    owner: "safety review",
    requiredState:
      "required / rate limit guard must exist before backend dry-run execution can be discussed",
    evidenceRequirement:
      "Rate limit guard posture aligned with the selected lane and blocked-by-default execution state.",
    blockedDefaultReason:
      "Rate limit guard remains contract-only in this batch.",
  },
  {
    id: "timeout-cancel-guard",
    label: "timeout/cancel guard",
    owner: "safety review",
    requiredState:
      "required / timeout and cancel guard must exist before backend dry-run execution can be discussed",
    evidenceRequirement:
      "Timeout/cancel posture aligned with the selected lane and blocked-by-default execution state.",
    blockedDefaultReason:
      "Timeout/cancel guard remains contract-only in this batch.",
  },
  {
    id: "idempotency",
    label: "idempotency",
    owner: "backend-owned runner contract",
    requiredState:
      "required / deterministic idempotency posture must exist before backend request creation exists",
    evidenceRequirement:
      "Deterministic preview key posture tied to the dry-run request contract.",
    blockedDefaultReason:
      "Idempotency stays preview-only because no request is created.",
  },
  {
    id: "replay-block",
    label: "replay block",
    owner: "safety review",
    requiredState:
      "required / replay block posture must exist before backend request creation exists",
    evidenceRequirement:
      "Replay block posture tied to deterministic preview keys and blocked execution.",
    blockedDefaultReason:
      "Replay block remains review-only while execution is blocked.",
  },
  {
    id: "single-run-lock",
    label: "single-run lock",
    owner: "safety review",
    requiredState:
      "required / single-run lock posture must exist before backend request creation exists",
    evidenceRequirement:
      "Single-run lock posture tied to the dry-run runner boundary.",
    blockedDefaultReason:
      "Single-run lock remains contract-only while dry-run execution is blocked.",
  },
  {
    id: "dry-run-request-contract",
    label: "dry-run request contract",
    owner: "backend-owned runner contract",
    requiredState:
      "required / request contract must stay typed, deterministic, and preview-only",
    evidenceRequirement:
      "Typed request contract showing redacted prompt posture, opaque credential posture, and not-created state.",
    blockedDefaultReason:
      "Dry-run request contract remains preview-only and does not create a request.",
  },
  {
    id: "dry-run-response-contract",
    label: "dry-run response contract",
    owner: "backend-owned runner contract",
    requiredState:
      "required / response contract must stay typed, deterministic, and preview-only",
    evidenceRequirement:
      "Typed response contract showing not-received, not-invoked, not-executed, and not-generated posture.",
    blockedDefaultReason:
      "Dry-run response contract remains preview-only and does not receive a response.",
  },
  {
    id: "dry-run-error-contract",
    label: "dry-run error contract",
    owner: "backend-owned runner contract",
    requiredState:
      "required / error contract must stay typed, deterministic, and preview-only",
    evidenceRequirement:
      "Typed error contract showing denial examples with retry and fallback disabled.",
    blockedDefaultReason:
      "Dry-run error contract remains preview-only and does not receive an error.",
  },
  {
    id: "no-queue-dispatch-until-backend-runner-implementation",
    label: "no queue dispatch until backend runner implementation",
    owner: "backend-owned runner contract",
    requiredState:
      "required / queue dispatch must stay blocked until backend runner implementation exists",
    evidenceRequirement:
      "Queue posture showing no dispatch is available in this contract-only batch.",
    blockedDefaultReason:
      "Queue dispatch stays blocked until backend runner implementation exists.",
  },
  {
    id: "no-worker-dispatch-until-backend-runner-implementation",
    label: "no worker dispatch until backend runner implementation",
    owner: "backend-owned runner contract",
    requiredState:
      "required / worker dispatch must stay blocked until backend runner implementation exists",
    evidenceRequirement:
      "Worker posture showing no dispatch is available in this contract-only batch.",
    blockedDefaultReason:
      "Worker dispatch stays blocked until backend runner implementation exists.",
  },
  {
    id: "no-job-execution-until-backend-runner-implementation",
    label: "no job execution until backend runner implementation",
    owner: "backend-owned runner contract",
    requiredState:
      "required / job execution must stay blocked until backend runner implementation exists",
    evidenceRequirement:
      "Job posture showing no execution is available in this contract-only batch.",
    blockedDefaultReason:
      "Job execution stays blocked until backend runner implementation exists.",
  },
  {
    id: "no-persistence-until-future-backend-batch",
    label: "no persistence until future backend batch",
    owner: "backend-owned runner contract",
    requiredState:
      "required / persistence must stay unavailable until a future backend batch exists",
    evidenceRequirement:
      "Persistence posture showing result, audit, and approval joins remain non-persistent.",
    blockedDefaultReason:
      "Persistence stays unavailable in the preview-only runner contract layer.",
  },
] as const satisfies readonly BackendDryRunRunnerGateSchemaSeed[];

const BACKEND_DRY_RUN_RUNNER_GATE_SCHEMA_RECORDS = GATE_SCHEMA_SEEDS.map(
  (seed): BackendDryRunRunnerGateSchemaRecord => ({
    key: buildStableBackendDryRunRunnerGateSchemaKey(seed.id),
    gateSchemaVersion: "backend-owned-model-provider-dry-run-runner-gate-schema-v1",
    previewOnlyStatement: "dry-run runner gate schema is preview-only",
    id: seed.id,
    label: seed.label,
    owner: seed.owner,
    requiredState: seed.requiredState,
    currentFrontendState: "preview-only",
    evidenceRequirement: seed.evidenceRequirement,
    blockedDefaultReason: seed.blockedDefaultReason,
    nextBackendRunnerRequirement:
      "5002-5033 - Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview",
  })
);

function cloneGateSchemaRecord(
  record: BackendDryRunRunnerGateSchemaRecord
): BackendDryRunRunnerGateSchemaRecord {
  return { ...record };
}

function buildBackendDryRunRunnerReadinessMatrixRecord(
  contract: BackendOwnedModelProviderDryRunRunnerContractRecord
): BackendDryRunRunnerReadinessMatrixRecord {
  return {
    id: contract.id,
    key: buildStableBackendDryRunRunnerReadinessMatrixKey(contract.id),
    readinessMatrixVersion:
      "backend-owned-model-provider-dry-run-runner-readiness-matrix-v1",
    previewOnlyStatement: "dry-run runner readiness matrix is preview-only",
    label: `${contract.label} readiness matrix`,
    workspaceTarget: contract.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(contract.selectedCapabilityFamily),
    runnerContractDraftState: contract.dryRunRunnerContractState,
    dryRunRequestContractState: contract.dryRunRequestState,
    dryRunResponseContractState: "not received",
    dryRunErrorContractState: "not received",
    runnerGateSchemaState: "preview-only",
    admissionContractDependencyState: "preview-only dependency satisfied",
    admissionTokenState: contract.admissionTokenState,
    admissionLeaseState: contract.admissionLeaseState,
    credentialBoundaryState: "opaque credential references only",
    safetyBoundaryState: "manual review only / blocked",
    auditBoundaryState: "preview-only / not persisted",
    approvalBoundaryState: "preview-only / not persisted",
    queueBoundaryState: contract.queueDispatchState,
    workerBoundaryState: contract.workerDispatchState,
    jobBoundaryState: contract.jobExecutionState,
    providerAdapterBoundaryState: "server-only adapters required",
    persistenceBoundaryState: "not implemented",
    dryRunReviewRecoveryDependency:
      "5002-5033 - Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview",
    currentReadiness: "not executable / contract-only",
    nextSafeAction: contract.nextSafeAction,
  };
}

const BACKEND_DRY_RUN_RUNNER_READINESS_MATRIX_RECORDS =
  BACKEND_DRY_RUN_RUNNER_CONTRACTS.map((contract) =>
    buildBackendDryRunRunnerReadinessMatrixRecord(contract)
  );

function cloneReadinessRecord(
  record: BackendDryRunRunnerReadinessMatrixRecord
): BackendDryRunRunnerReadinessMatrixRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function buildBackendDryRunRunnerHandoffPreviewRecord(
  contract: BackendOwnedModelProviderDryRunRunnerContractRecord
): BackendDryRunRunnerHandoffPreviewRecord {
  return {
    id: contract.id,
    key: buildStableBackendDryRunRunnerHandoffPreviewKey(contract.id),
    handoffPreviewVersion:
      "backend-owned-model-provider-dry-run-runner-handoff-preview-v1",
    previewOnlyStatement: "dry-run runner handoff preview is preview-only",
    backendDryRunRunnerContractId: contract.id,
    sourceAdmissionContractReference:
      contract.sourceBackendAdmissionContractReference,
    sourceRunIntentReference: contract.sourceRunIntentReference,
    handoffState: "preview-only / not handed off",
    backendRunnerTarget: "contract-only",
    dryRunRequestState: "not created",
    runnerInvocationState: "not invoked",
    providerCallState: "not called",
    modelOutputState: "not generated",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    queueWorkerJobStateSummary: "not dispatched / not dispatched / not executed",
    blockedDefaultReason:
      `Backend dry-run handoff stays blocked for ${contract.label} because no backend runner implementation, request creation, invocation, queue dispatch, worker dispatch, or job execution exists yet.`,
    explicitNoHandoffNoExecutionStatement:
      "No backend dry-run handoff or execution occurs.",
  };
}

const BACKEND_DRY_RUN_RUNNER_HANDOFF_PREVIEWS =
  BACKEND_DRY_RUN_RUNNER_CONTRACTS.map((contract) =>
    buildBackendDryRunRunnerHandoffPreviewRecord(contract)
  );

function cloneHandoffPreview(
  record: BackendDryRunRunnerHandoffPreviewRecord
): BackendDryRunRunnerHandoffPreviewRecord {
  return { ...record };
}

export function listBackendOwnedModelProviderDryRunRunnerContracts():
  readonly BackendOwnedModelProviderDryRunRunnerContractRecord[] {
  return BACKEND_DRY_RUN_RUNNER_CONTRACTS.map((record) => cloneContract(record));
}

export function listBackendDryRunRequestContracts():
  readonly BackendDryRunRequestContractRecord[] {
  return BACKEND_DRY_RUN_REQUEST_CONTRACTS.map((record) =>
    cloneRequestContract(record)
  );
}

export function listBackendDryRunResponseContracts():
  readonly BackendDryRunResponseContractRecord[] {
  return BACKEND_DRY_RUN_RESPONSE_CONTRACTS.map((record) =>
    cloneResponseContract(record)
  );
}

export function listBackendDryRunErrorContracts():
  readonly BackendDryRunErrorContractRecord[] {
  return BACKEND_DRY_RUN_ERROR_CONTRACTS.map((record) => cloneErrorContract(record));
}

export function listBackendDryRunRunnerGateSchemaRecords():
  readonly BackendDryRunRunnerGateSchemaRecord[] {
  return BACKEND_DRY_RUN_RUNNER_GATE_SCHEMA_RECORDS.map((record) =>
    cloneGateSchemaRecord(record)
  );
}

export function listBackendDryRunRunnerReadinessMatrixRecords():
  readonly BackendDryRunRunnerReadinessMatrixRecord[] {
  return BACKEND_DRY_RUN_RUNNER_READINESS_MATRIX_RECORDS.map((record) =>
    cloneReadinessRecord(record)
  );
}

export function listBackendDryRunRunnerHandoffPreviews():
  readonly BackendDryRunRunnerHandoffPreviewRecord[] {
  return BACKEND_DRY_RUN_RUNNER_HANDOFF_PREVIEWS.map((record) =>
    cloneHandoffPreview(record)
  );
}

function buildCapabilityFamilyGroup(
  capabilityFamilyLabel: BackendOwnedModelProviderDryRunRunnerContractRecord["selectedCapabilityFamily"]["label"],
  contracts: readonly BackendOwnedModelProviderDryRunRunnerContractRecord[]
): BackendDryRunRunnerContractCapabilityFamilyGroup {
  const firstContract = contracts[0];

  if (!firstContract) {
    throw new Error(
      `Cannot build capability family group without contracts: ${capabilityFamilyLabel}`
    );
  }

  return {
    capabilityFamilyId: firstContract.selectedCapabilityFamily.id,
    capabilityFamilyLabel,
    contractCount: contracts.length,
    contracts: contracts.map((contract) => cloneContract(contract)),
  };
}

export function groupBackendDryRunRunnerContractsByCapabilityFamily():
  readonly BackendDryRunRunnerContractCapabilityFamilyGroup[] {
  const groups = new Map<
    BackendOwnedModelProviderDryRunRunnerContractRecord["selectedCapabilityFamily"]["label"],
    BackendOwnedModelProviderDryRunRunnerContractRecord[]
  >();

  BACKEND_DRY_RUN_RUNNER_CONTRACTS.forEach((contract) => {
    const label = contract.selectedCapabilityFamily.label;
    const existing = groups.get(label);

    if (existing) {
      existing.push(contract);
      return;
    }

    groups.set(label, [contract]);
  });

  return Array.from(groups.entries()).map(([label, contracts]) =>
    buildCapabilityFamilyGroup(label, contracts)
  );
}

function buildWorkspaceGroup(
  workspaceTarget: AiModelProviderWorkspaceTarget,
  contracts: readonly BackendOwnedModelProviderDryRunRunnerContractRecord[]
): BackendDryRunRunnerContractWorkspaceGroup {
  return {
    workspaceTarget,
    contractCount: contracts.length,
    contracts: contracts.map((contract) => cloneContract(contract)),
  };
}

export function groupBackendDryRunRunnerContractsByWorkspaceTarget():
  readonly BackendDryRunRunnerContractWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedModelProviderDryRunRunnerContractRecord[]
  >();

  BACKEND_DRY_RUN_RUNNER_CONTRACTS.forEach((contract) => {
    const existing = groups.get(contract.workspaceTarget);

    if (existing) {
      existing.push(contract);
      return;
    }

    groups.set(contract.workspaceTarget, [contract]);
  });

  return Array.from(groups.entries()).map(([workspaceTarget, contracts]) =>
    buildWorkspaceGroup(workspaceTarget, contracts)
  );
}

export function buildBackendDryRunRunnerContractSummary():
  BackendDryRunRunnerContractSummary {
  const capabilityGroups =
    groupBackendDryRunRunnerContractsByCapabilityFamily();
  const workspaceGroups = groupBackendDryRunRunnerContractsByWorkspaceTarget();

  return {
    currentBatch: BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH,
    contractCount: BACKEND_DRY_RUN_RUNNER_CONTRACTS.length,
    requestContractCount: BACKEND_DRY_RUN_REQUEST_CONTRACTS.length,
    responseContractCount: BACKEND_DRY_RUN_RESPONSE_CONTRACTS.length,
    errorContractCount: BACKEND_DRY_RUN_ERROR_CONTRACTS.length,
    gateSchemaCount: BACKEND_DRY_RUN_RUNNER_GATE_SCHEMA_RECORDS.length,
    readinessMatrixCount:
      BACKEND_DRY_RUN_RUNNER_READINESS_MATRIX_RECORDS.length,
    handoffPreviewCount: BACKEND_DRY_RUN_RUNNER_HANDOFF_PREVIEWS.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    runnerContractState: "draft / preview-only",
    currentReadiness: "not executable / contract-only",
    summaryLines: cloneList(CONTRACT_SUMMARY_LINES),
  };
}

export function buildBackendDryRunRunnerGateSummary():
  BackendDryRunRunnerGateSummary {
  const gateCount = BACKEND_DRY_RUN_RUNNER_GATE_SCHEMA_RECORDS.length;
  const operatorOwnedGateCount = BACKEND_DRY_RUN_RUNNER_GATE_SCHEMA_RECORDS.filter(
    (record) => record.owner === "operator"
  ).length;
  const backendOwnedGateCount =
    BACKEND_DRY_RUN_RUNNER_GATE_SCHEMA_RECORDS.filter(
      (record) => record.owner === "backend-owned runner contract"
    ).length;
  const safetyReviewGateCount =
    BACKEND_DRY_RUN_RUNNER_GATE_SCHEMA_RECORDS.filter(
      (record) => record.owner === "safety review"
    ).length;

  return {
    currentBatch: BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH,
    gateCount,
    operatorOwnedGateCount,
    backendOwnedGateCount,
    safetyReviewGateCount,
    summaryLines: cloneList(GATE_SUMMARY_LINES),
  };
}

export function buildBackendDryRunRunnerReadinessSummary():
  BackendDryRunRunnerReadinessSummary {
  const nextSafeAction =
    "Review the backend-owned dry-run runner review and recovery preview before discussing backend runner implementation.";

  return {
    currentBatch: BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH,
    readinessMatrixCount:
      BACKEND_DRY_RUN_RUNNER_READINESS_MATRIX_RECORDS.length,
    currentReadiness: "not executable / contract-only",
    nextSafeAction,
    summaryLines: cloneList(READINESS_SUMMARY_LINES),
  };
}

export function buildNextDryRunRunnerReviewAndRecoveryChecklist():
  readonly string[] {
  return cloneList(NEXT_DRY_RUN_RUNNER_REVIEW_RECOVERY_CHECKLIST);
}
