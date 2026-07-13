import type {
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  listBackendOwnedModelProviderDryRunRunnerContracts,
  type BackendDryRunRunnerContractId,
  type BackendOwnedModelProviderDryRunRunnerContractRecord,
} from "../backend-owned-model-provider-dry-run-runner-contract";
import {
  listBackendOwnedModelProviderDryRunRunnerReviews,
  type BackendOwnedModelProviderDryRunRunnerReviewRecord,
} from "../backend-owned-model-provider-dry-run-runner-review-recovery-preview";
import {
  BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
  BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_PHASE,
  NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH,
  type BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord,
  type SyntheticDryRunErrorFixtureKey,
  type SyntheticDryRunErrorFixtureRecord,
  type SyntheticDryRunInputFixtureKey,
  type SyntheticDryRunInputFixtureRecord,
  type SyntheticDryRunOutputFixtureKey,
  type SyntheticDryRunOutputFixtureRecord,
  type SyntheticRunnerGateId,
  type SyntheticRunnerGateKey,
  type SyntheticRunnerGateRecord,
  type SyntheticRunnerGateSeed,
  type SyntheticRunnerGateSummary,
  type SyntheticRunnerHandoffPreviewKey,
  type SyntheticRunnerHandoffPreviewRecord,
  type SyntheticRunnerReadinessKey,
  type SyntheticRunnerReadinessMatrixRecord,
  type SyntheticRunnerReadinessSummary,
  type SyntheticDryRunRunnerSkeletonId,
  type SyntheticRunnerSkeletonCapabilityFamilyGroup,
  type SyntheticRunnerSkeletonKey,
  type SyntheticRunnerSkeletonSummary,
  type SyntheticRunnerSkeletonWorkspaceGroup,
} from "./backend-owned-model-provider-synthetic-dry-run-runner-skeleton-types";

const REQUEST_LABELS = {
  "conversational-planning-request": "conversational planning request",
  "code-assistance-request": "code assistance request",
  "website-copy-code-request": "website copy/code request",
  "product-video-request": "product video request",
  "storyboard-image-request": "storyboard image request",
  "audio-narration-request": "audio narration request",
  "transcription-caption-request": "transcription/caption request",
  "embeddings-search-request": "embeddings/search request",
  "safety-moderation-review-request": "safety/moderation review request",
  "local-private-inference-request": "local/private inference request",
  "audit-recovery-explanation-request": "audit/recovery explanation request",
} as const satisfies Record<SyntheticDryRunRunnerSkeletonId, string>;

const SKELETON_SUMMARY_LINES = [
  "backend-owned model provider synthetic dry-run runner skeleton only",
  "synthetic runner skeleton is preview-only",
  "runner state is skeleton / not executable",
  "dry-run request is not created",
  "runner invocation is not invoked",
  "dry-run execution is not executed",
  "provider response is not received",
  "model output is not generated",
  "synthetic fixture result is static placeholder only",
  "synthetic input/output/error fixtures are preview-only",
  "synthetic runner gates are preview-only",
  "synthetic runner readiness matrix is preview-only",
  "current readiness is skeleton-only / not executable",
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
  "backend-owned synthetic dry-run result capture contract next",
] as const;

const GATE_SUMMARY_LINES = [
  "backend admission contract",
  "dry-run runner contract",
  "dry-run runner review",
  "synthetic input fixture",
  "synthetic output fixture",
  "synthetic error fixture",
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
  "no persistence until future backend batch",
] as const;

const READINESS_SUMMARY_LINES = [
  "skeleton state",
  "input fixture state",
  "output fixture state",
  "error fixture state",
  "gate schema state",
  "admission contract dependency state",
  "runner contract dependency state",
  "runner review dependency state",
  "credential boundary state",
  "safety boundary state",
  "audit boundary state",
  "approval boundary state",
  "queue/worker/job boundary state",
  "persistence boundary state",
  "result capture dependency",
  "current readiness: skeleton-only / not executable",
  "next safe action",
] as const;

const NEXT_RESULT_CAPTURE_CONTRACT_CHECKLIST = [
  "Carry synthetic input, output, and error fixture references into the result capture contract without enabling execution.",
  "Define placeholder-only result capture records for provider response state, model output state, synthetic result state, and token/cost accounting state.",
  "Keep audit join, approval join, result persistence, and request creation unavailable until the backend-owned result capture contract exists.",
  "Preserve no prompt sending, no model calls, no provider execution, no queue dispatch, no worker dispatch, and no job execution posture.",
  "Keep the synthetic runner backend-owned, preview-only, deterministic, and non-executable while the result capture contract is defined next.",
] as const;

const DRY_RUN_RUNNER_CONTRACTS =
  listBackendOwnedModelProviderDryRunRunnerContracts();
const DRY_RUN_RUNNER_REVIEWS = listBackendOwnedModelProviderDryRunRunnerReviews();
const DRY_RUN_RUNNER_REVIEWS_BY_ID = new Map(
  DRY_RUN_RUNNER_REVIEWS.map((record) => [record.id, record] as const)
);

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneCapabilityFamily(
  family: BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord["selectedCapabilityFamily"]
): BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord["selectedCapabilityFamily"] {
  return { ...family };
}

function requireDryRunRunnerReview(
  id: BackendDryRunRunnerContractId
): BackendOwnedModelProviderDryRunRunnerReviewRecord {
  const record = DRY_RUN_RUNNER_REVIEWS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing backend dry-run runner review for ${id}`);
  }

  return record;
}

function resolveRequestLabel(id: SyntheticDryRunRunnerSkeletonId): string {
  return REQUEST_LABELS[id];
}

function buildSkeletonLabel(requestLabel: string): string {
  return `${requestLabel} synthetic runner skeleton`;
}

function buildSkeletonBlockedReason(requestLabel: string): string {
  return `Synthetic dry-run runner skeleton remains preview-only for ${requestLabel} because no dry-run request, runner invocation, provider call, model output, queue dispatch, worker dispatch, job execution, or persistence exists.`;
}

function buildSkeletonNextSafeAction(
  workspaceTarget: AiModelProviderWorkspaceTarget
): string {
  return `Prepare the backend-owned synthetic dry-run result capture contract for ${workspaceTarget} without creating requests, invocations, execution, or persistence.`;
}

export function uniqueSyntheticRunnerSkeletonDisplayStrings<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Array.from(new Set(values));
}

export function buildStableSyntheticRunnerSkeletonKey(
  id: SyntheticDryRunRunnerSkeletonId
): SyntheticRunnerSkeletonKey {
  return `backend-owned-model-provider-synthetic-dry-run-runner-skeleton:${id}`;
}

export function buildStableSyntheticInputFixtureKey(
  id: SyntheticDryRunRunnerSkeletonId
): SyntheticDryRunInputFixtureKey {
  return `backend-owned-model-provider-synthetic-dry-run-input-fixture:${id}`;
}

export function buildStableSyntheticOutputFixtureKey(
  id: SyntheticDryRunRunnerSkeletonId
): SyntheticDryRunOutputFixtureKey {
  return `backend-owned-model-provider-synthetic-dry-run-output-fixture:${id}`;
}

export function buildStableSyntheticErrorFixtureKey(
  id: SyntheticDryRunRunnerSkeletonId
): SyntheticDryRunErrorFixtureKey {
  return `backend-owned-model-provider-synthetic-dry-run-error-fixture:${id}`;
}

export function buildStableSyntheticRunnerGateKey(
  id: SyntheticRunnerGateId
): SyntheticRunnerGateKey {
  return `backend-owned-model-provider-synthetic-dry-run-runner-gate:${id}`;
}

export function buildStableSyntheticRunnerReadinessKey(
  id: SyntheticDryRunRunnerSkeletonId
): SyntheticRunnerReadinessKey {
  return `backend-owned-model-provider-synthetic-dry-run-runner-readiness:${id}`;
}

export function buildStableSyntheticRunnerHandoffPreviewKey(
  id: SyntheticDryRunRunnerSkeletonId
): SyntheticRunnerHandoffPreviewKey {
  return `backend-owned-model-provider-synthetic-dry-run-runner-handoff-preview:${id}`;
}

function buildSyntheticRunnerSkeletonRecord(
  contract: BackendOwnedModelProviderDryRunRunnerContractRecord
): BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord {
  const review = requireDryRunRunnerReview(contract.id);
  const requestLabel = resolveRequestLabel(contract.id);

  return {
    id: contract.id,
    key: buildStableSyntheticRunnerSkeletonKey(contract.id),
    skeletonVersion:
      "backend-owned-model-provider-synthetic-dry-run-runner-skeleton-v1",
    previewOnlyStatement: "synthetic runner skeleton is preview-only",
    requestLabel,
    label: buildSkeletonLabel(requestLabel),
    workspaceTarget: contract.workspaceTarget,
    source: "Athena / Jarvis Model Gateway",
    owner: "backend-owned",
    frontendMode: "preview-only",
    skeletonMode: "synthetic fixture-only",
    runnerState: "skeleton / not executable",
    dryRunRequestState: "not created",
    runnerInvocationState: "not invoked",
    dryRunExecutionState: "not executed",
    providerCallPosture: "not implemented",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    syntheticFixtureResultState: "static placeholder only",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    sourceDryRunRunnerContractReference: contract.key,
    sourceDryRunRunnerReviewReference: review.key,
    sourceBackendAdmissionContractReference:
      contract.sourceBackendAdmissionContractReference,
    sourceRunIntentReference: contract.sourceRunIntentReference,
    selectedCapabilityFamily: cloneCapabilityFamily(
      contract.selectedCapabilityFamily
    ),
    providerSlotLabel: contract.providerSlotLabel,
    backupProviderSlotLabel: contract.backupProviderSlotLabel,
    localPrivateAlternativeLabel: contract.localPrivateAlternativeLabel,
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
    resultCaptureRequiredInFuture: "result capture required in future",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    nextSyntheticDryRunResultCaptureContractRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
    blockedDefaultReason: buildSkeletonBlockedReason(requestLabel),
    nextSafeAction: buildSkeletonNextSafeAction(contract.workspaceTarget),
  };
}

const SYNTHETIC_RUNNER_SKELETONS = DRY_RUN_RUNNER_CONTRACTS.map((contract) =>
  buildSyntheticRunnerSkeletonRecord(contract)
);

function cloneSkeleton(
  record: BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord
): BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function buildSyntheticInputFixtureRecord(
  skeleton: BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord
): SyntheticDryRunInputFixtureRecord {
  return {
    id: skeleton.id,
    key: buildStableSyntheticInputFixtureKey(skeleton.id),
    fixtureVersion: "backend-owned-model-provider-synthetic-dry-run-input-fixture-v1",
    requestLabel: skeleton.requestLabel,
    syntheticRunnerSkeletonId: skeleton.id,
    sourceRunIntentReference: skeleton.sourceRunIntentReference,
    sourceBackendAdmissionContractReference:
      skeleton.sourceBackendAdmissionContractReference,
    targetCapabilityFamily: cloneCapabilityFamily(
      skeleton.selectedCapabilityFamily
    ),
    workspaceTarget: skeleton.workspaceTarget,
    fixtureMode: "static / synthetic",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    credentialReferencePosture: "opaque label only",
    admissionTokenPosture: "not issued",
    admissionLeasePosture: "not created",
    idempotencyKeyPosture: "deterministic preview key only",
    replayBlockPosture: "replay block required",
    singleRunLockPosture: "single-run lock required",
    timeoutCancelPosture: "timeout/cancel guard required",
    blockedDefaultReason:
      `Synthetic input fixture remains static for ${skeleton.requestLabel} because prompt payloads stay redacted placeholders and no prompt transmission or real input exists.`,
    explicitNoRealInputNoPromptSentStatement: "No real input. No prompt sent.",
  };
}

const SYNTHETIC_INPUT_FIXTURES = SYNTHETIC_RUNNER_SKELETONS.map((skeleton) =>
  buildSyntheticInputFixtureRecord(skeleton)
);

function cloneInputFixture(
  record: SyntheticDryRunInputFixtureRecord
): SyntheticDryRunInputFixtureRecord {
  return {
    ...record,
    targetCapabilityFamily: cloneCapabilityFamily(record.targetCapabilityFamily),
  };
}

function buildSyntheticOutputFixtureRecord(
  skeleton: BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord
): SyntheticDryRunOutputFixtureRecord {
  return {
    id: skeleton.id,
    key: buildStableSyntheticOutputFixtureKey(skeleton.id),
    fixtureVersion:
      "backend-owned-model-provider-synthetic-dry-run-output-fixture-v1",
    requestLabel: skeleton.requestLabel,
    workspaceTarget: skeleton.workspaceTarget,
    syntheticRunnerSkeletonId: skeleton.id,
    sourceInputFixtureReference: buildStableSyntheticInputFixtureKey(skeleton.id),
    outputMode: "static placeholder only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    syntheticResultState: "placeholder only",
    tokenCostAccountingState: "placeholder only",
    safetyReviewState: "preview-only",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    resultCaptureState: "not implemented",
    blockedDefaultReason:
      `Synthetic output fixture remains placeholder-only for ${skeleton.requestLabel} because no provider response, model output, token accounting, or result capture exists.`,
    explicitNoRealOutputNoModelOutputStatement:
      "No real output. No model output.",
  };
}

const SYNTHETIC_OUTPUT_FIXTURES = SYNTHETIC_RUNNER_SKELETONS.map((skeleton) =>
  buildSyntheticOutputFixtureRecord(skeleton)
);

function cloneOutputFixture(
  record: SyntheticDryRunOutputFixtureRecord
): SyntheticDryRunOutputFixtureRecord {
  return { ...record };
}

function buildValidationErrorExamples(
  skeleton: BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord
): readonly string[] {
  return [
    `Validation rejects ${skeleton.requestLabel} because runner state remains skeleton / not executable.`,
    `Validation rejects ${skeleton.requestLabel} because prompt payload posture remains redacted placeholder only.`,
    `Validation rejects ${skeleton.requestLabel} because provider call and model call posture remain not implemented.`,
  ] as const;
}

function buildAdmissionDeniedExamples(
  skeleton: BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord
): readonly string[] {
  return [
    `Admission denies ${skeleton.requestLabel} because no admission token or lease exists.`,
    `Admission denies ${skeleton.requestLabel} because manual approval and manual confirmation remain required.`,
  ] as const;
}

function buildSyntheticErrorFixtureRecord(
  skeleton: BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord
): SyntheticDryRunErrorFixtureRecord {
  return {
    id: skeleton.id,
    key: buildStableSyntheticErrorFixtureKey(skeleton.id),
    fixtureVersion:
      "backend-owned-model-provider-synthetic-dry-run-error-fixture-v1",
    requestLabel: skeleton.requestLabel,
    workspaceTarget: skeleton.workspaceTarget,
    syntheticRunnerSkeletonId: skeleton.id,
    sourceInputFixtureReference: buildStableSyntheticInputFixtureKey(skeleton.id),
    errorMode: "static preview only",
    providerErrorState: "not received",
    validationErrorExamples: buildValidationErrorExamples(skeleton),
    admissionDeniedExamples: buildAdmissionDeniedExamples(skeleton),
    runnerInvocationDeniedExample:
      `Runner invocation remains denied for ${skeleton.requestLabel} because the skeleton is not executable.`,
    killSwitchDenialExample:
      `Kill switch denial remains visible for ${skeleton.requestLabel} while backend execution stays blocked.`,
    credentialBoundaryDenialExample:
      `Credential boundary denies ${skeleton.requestLabel} because only opaque credential labels are allowed.`,
    privacyRedactionDenialExample:
      `Privacy and redaction deny ${skeleton.requestLabel} until placeholder-only prompt posture is preserved.`,
    queueDispatchBlockedExample:
      `Queue dispatch remains blocked for ${skeleton.requestLabel} because the synthetic runner does not dispatch work.`,
    workerDispatchBlockedExample:
      `Worker dispatch remains blocked for ${skeleton.requestLabel} because no synthetic runner worker pickup exists.`,
    jobExecutionBlockedExample:
      `Job execution remains blocked for ${skeleton.requestLabel} because the synthetic runner is not executable.`,
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    recoveryPosture: "manual review only",
    explicitNoRealErrorNoProviderErrorStatement:
      "No real error. No provider error.",
  };
}

const SYNTHETIC_ERROR_FIXTURES = SYNTHETIC_RUNNER_SKELETONS.map((skeleton) =>
  buildSyntheticErrorFixtureRecord(skeleton)
);

function cloneErrorFixture(
  record: SyntheticDryRunErrorFixtureRecord
): SyntheticDryRunErrorFixtureRecord {
  return {
    ...record,
    validationErrorExamples: cloneList(record.validationErrorExamples),
    admissionDeniedExamples: cloneList(record.admissionDeniedExamples),
  };
}

const GATE_SEEDS = [
  {
    id: "backend-admission-contract",
    label: "backend admission contract",
    owner: "backend skeleton",
    requiredState:
      "required / source backend admission contract must remain visible before any future result capture contract can exist",
    evidenceRequirement:
      "A typed source backend admission contract reference for every synthetic runner skeleton.",
    blockedDefaultReason:
      "Backend admission remains a required backend-owned dependency while the synthetic runner skeleton stays non-executable.",
  },
  {
    id: "dry-run-runner-contract",
    label: "dry-run runner contract",
    owner: "backend skeleton",
    requiredState:
      "required / source dry-run runner contract must remain visible before any future result capture contract can exist",
    evidenceRequirement:
      "A typed source dry-run runner contract reference for every synthetic runner skeleton.",
    blockedDefaultReason:
      "The runner contract remains a typed source boundary only and does not create execution.",
  },
  {
    id: "dry-run-runner-review",
    label: "dry-run runner review",
    owner: "backend skeleton",
    requiredState:
      "required / source dry-run runner review must remain visible before any future result capture contract can exist",
    evidenceRequirement:
      "A typed source dry-run runner review reference for every synthetic runner skeleton.",
    blockedDefaultReason:
      "The runner review remains a preview-only evidence source and does not authorize execution.",
  },
  {
    id: "synthetic-input-fixture",
    label: "synthetic input fixture",
    owner: "backend skeleton",
    requiredState:
      "required / synthetic input fixtures must stay typed, deterministic, and prompt-redacted",
    evidenceRequirement:
      "Typed input fixtures showing redacted placeholders, not-sent transmission, and no real input.",
    blockedDefaultReason:
      "Synthetic input fixtures remain preview-only and do not send prompts.",
  },
  {
    id: "synthetic-output-fixture",
    label: "synthetic output fixture",
    owner: "backend skeleton",
    requiredState:
      "required / synthetic output fixtures must stay typed, deterministic, and placeholder-only",
    evidenceRequirement:
      "Typed output fixtures showing not-received provider response, not-generated model output, and placeholder-only synthetic results.",
    blockedDefaultReason:
      "Synthetic output fixtures remain preview-only and do not contain real outputs.",
  },
  {
    id: "synthetic-error-fixture",
    label: "synthetic error fixture",
    owner: "backend skeleton",
    requiredState:
      "required / synthetic error fixtures must stay typed, deterministic, and preview-only",
    evidenceRequirement:
      "Typed error fixtures showing denial examples with retry and fallback disabled.",
    blockedDefaultReason:
      "Synthetic error fixtures remain preview-only and do not contain real provider errors.",
  },
  {
    id: "operator-approval",
    label: "operator approval",
    owner: "operator",
    requiredState:
      "required / operator approval must exist before any backend-owned execution path can be discussed",
    evidenceRequirement:
      "Visible manual approval posture for every synthetic runner skeleton.",
    blockedDefaultReason:
      "Operator approval remains required and unresolved while the synthetic runner is preview-only.",
  },
  {
    id: "manual-confirmation",
    label: "manual confirmation",
    owner: "operator",
    requiredState:
      "required / manual confirmation must exist before any backend-owned execution path can be discussed",
    evidenceRequirement:
      "Visible manual confirmation posture for every synthetic runner skeleton.",
    blockedDefaultReason:
      "Manual confirmation remains required and unresolved while the synthetic runner is preview-only.",
  },
  {
    id: "kill-switch",
    label: "kill switch",
    owner: "safety review",
    requiredState:
      "required / kill switch review must exist before any backend-owned execution path can be discussed",
    evidenceRequirement:
      "A visible kill switch posture tied to the synthetic runner skeleton boundary.",
    blockedDefaultReason:
      "Kill switch remains required and execution stays blocked by default.",
  },
  {
    id: "audit",
    label: "audit",
    owner: "safety review",
    requiredState:
      "required / audit review must exist before any backend-owned execution path can be discussed",
    evidenceRequirement:
      "A visible audit posture tied to synthetic runner, fixture, and future result capture records.",
    blockedDefaultReason:
      "Audit remains required and audit persistence is not implemented in this batch.",
  },
  {
    id: "server-only-boundary",
    label: "server-only boundary",
    owner: "backend skeleton",
    requiredState:
      "required / the synthetic runner boundary must stay server-only",
    evidenceRequirement:
      "A visible server-only backend posture with the frontend blocked.",
    blockedDefaultReason:
      "The synthetic runner remains blocked at the frontend boundary.",
  },
  {
    id: "no-frontend-provider-call",
    label: "no frontend provider call",
    owner: "backend skeleton",
    requiredState:
      "required / frontend provider calls must remain blocked",
    evidenceRequirement:
      "A visible blocked frontend posture and no provider call implementation.",
    blockedDefaultReason:
      "Frontend provider calls remain blocked and not implemented.",
  },
  {
    id: "no-provider-sdk-import-in-frontend",
    label: "no provider SDK import in frontend",
    owner: "backend skeleton",
    requiredState:
      "required / provider SDK imports must remain absent from the frontend",
    evidenceRequirement:
      "A visible no SDK imports posture for the synthetic runner skeleton.",
    blockedDefaultReason:
      "Provider SDK imports remain absent from the frontend boundary.",
  },
  {
    id: "no-prompt-sending",
    label: "no prompt sending",
    owner: "backend skeleton",
    requiredState:
      "required / prompt sending must remain not implemented",
    evidenceRequirement:
      "A visible prompt sending posture plus typed input fixtures that stay not sent.",
    blockedDefaultReason:
      "Prompt sending remains not implemented and no prompt is sent.",
  },
  {
    id: "opaque-credential-reference",
    label: "opaque credential reference",
    owner: "safety review",
    requiredState:
      "required / only opaque credential references may appear in synthetic runner records",
    evidenceRequirement:
      "A visible opaque credential posture with no readable secrets.",
    blockedDefaultReason:
      "Credentials remain opaque labels only in this batch.",
  },
  {
    id: "no-plaintext-secrets",
    label: "no plaintext secrets",
    owner: "safety review",
    requiredState:
      "required / plaintext secrets must remain absent from synthetic runner records",
    evidenceRequirement:
      "A visible no plaintext secrets posture across skeleton and fixture records.",
    blockedDefaultReason:
      "Plaintext secrets remain blocked from the synthetic runner boundary.",
  },
  {
    id: "privacy-redaction",
    label: "privacy/redaction",
    owner: "safety review",
    requiredState:
      "required / privacy and redaction posture must remain visible before any future result capture exists",
    evidenceRequirement:
      "Prompt placeholder, redaction, and denial fixture evidence for every synthetic runner skeleton.",
    blockedDefaultReason:
      "Privacy and redaction remain required review posture while execution stays blocked.",
  },
  {
    id: "cost-rate-timeout",
    label: "cost/rate/timeout",
    owner: "safety review",
    requiredState:
      "required / cost acknowledgement, rate limit guard, and timeout/cancel guard must remain visible together",
    evidenceRequirement:
      "A visible cost acknowledgement, rate limit, and timeout/cancel posture tied to each skeleton lane.",
    blockedDefaultReason:
      "Cost, rate, and timeout posture remain required and preview-only.",
  },
  {
    id: "idempotency-replay-block",
    label: "idempotency/replay block",
    owner: "safety review",
    requiredState:
      "required / deterministic preview keys and replay blocking must remain visible together",
    evidenceRequirement:
      "A visible deterministic preview key posture plus replay block requirements in synthetic input fixtures.",
    blockedDefaultReason:
      "Idempotency and replay blocking remain required while request creation stays blocked.",
  },
  {
    id: "single-run-lock",
    label: "single-run lock",
    owner: "safety review",
    requiredState:
      "required / single-run lock posture must remain visible before any future backend execution is discussed",
    evidenceRequirement:
      "A visible single-run lock posture across skeleton and input fixture records.",
    blockedDefaultReason:
      "Single-run lock remains required while the synthetic runner stays non-executable.",
  },
  {
    id: "no-queue-dispatch",
    label: "no queue dispatch",
    owner: "backend skeleton",
    requiredState:
      "required / queue dispatch must remain blocked",
    evidenceRequirement:
      "A visible blocked queue posture across skeleton, error fixture, and readiness records.",
    blockedDefaultReason:
      "Queue dispatch remains blocked and not implemented.",
  },
  {
    id: "no-worker-dispatch",
    label: "no worker dispatch",
    owner: "backend skeleton",
    requiredState:
      "required / worker dispatch must remain blocked",
    evidenceRequirement:
      "A visible blocked worker posture across skeleton, error fixture, and readiness records.",
    blockedDefaultReason:
      "Worker dispatch remains blocked and not implemented.",
  },
  {
    id: "no-job-execution",
    label: "no job execution",
    owner: "backend skeleton",
    requiredState:
      "required / job execution must remain blocked",
    evidenceRequirement:
      "A visible blocked job posture across skeleton, error fixture, and readiness records.",
    blockedDefaultReason:
      "Job execution remains blocked and not implemented.",
  },
  {
    id: "no-persistence-until-future-backend-batch",
    label: "no persistence until future backend batch",
    owner: "backend skeleton",
    requiredState:
      "required / persistence must remain unavailable until the future backend result capture contract exists",
    evidenceRequirement:
      "A visible non-persistent posture for results, audit joins, and approval joins.",
    blockedDefaultReason:
      "Persistence remains unavailable in the preview-only synthetic runner skeleton batch.",
  },
] as const satisfies readonly SyntheticRunnerGateSeed[];

const SYNTHETIC_RUNNER_GATE_RECORDS = GATE_SEEDS.map(
  (seed): SyntheticRunnerGateRecord => ({
    id: seed.id,
    key: buildStableSyntheticRunnerGateKey(seed.id),
    gateVersion: "backend-owned-model-provider-synthetic-dry-run-runner-gate-v1",
    label: seed.label,
    owner: seed.owner,
    requiredState: seed.requiredState,
    currentState: "preview-only / blocked",
    evidenceRequirement: seed.evidenceRequirement,
    blockedDefaultReason: seed.blockedDefaultReason,
    nextResultCaptureContractRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
  })
);

function cloneGateRecord(record: SyntheticRunnerGateRecord): SyntheticRunnerGateRecord {
  return { ...record };
}

function buildSyntheticRunnerReadinessRecord(
  skeleton: BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord
): SyntheticRunnerReadinessMatrixRecord {
  return {
    id: skeleton.id,
    key: buildStableSyntheticRunnerReadinessKey(skeleton.id),
    readinessVersion:
      "backend-owned-model-provider-synthetic-dry-run-runner-readiness-v1",
    requestLabel: skeleton.requestLabel,
    label: `${skeleton.requestLabel} readiness matrix`,
    workspaceTarget: skeleton.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(
      skeleton.selectedCapabilityFamily
    ),
    skeletonState: "skeleton / not executable",
    inputFixtureState: "preview-only / static",
    outputFixtureState: "preview-only / static",
    errorFixtureState: "preview-only / static",
    gateSchemaState: "preview-only / blocked",
    admissionContractDependencyState: "reviewed / preview-only",
    runnerContractDependencyState: "reviewed / preview-only",
    runnerReviewDependencyState: "reviewed / preview-only",
    credentialBoundaryState: "opaque credential references only",
    safetyBoundaryState: "manual review only / blocked",
    auditBoundaryState: "preview-only / not persisted",
    approvalBoundaryState: "preview-only / not persisted",
    queueBoundaryState: "blocked",
    workerBoundaryState: "blocked",
    jobBoundaryState: "blocked",
    providerAdapterBoundaryState: "server-only adapters required",
    persistenceBoundaryState: "not implemented",
    resultCaptureDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
    currentReadiness: "skeleton-only / not executable",
    nextSafeAction: skeleton.nextSafeAction,
  };
}

const SYNTHETIC_RUNNER_READINESS_RECORDS = SYNTHETIC_RUNNER_SKELETONS.map(
  (skeleton) => buildSyntheticRunnerReadinessRecord(skeleton)
);

function cloneReadinessRecord(
  record: SyntheticRunnerReadinessMatrixRecord
): SyntheticRunnerReadinessMatrixRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function buildSyntheticRunnerHandoffPreviewRecord(
  skeleton: BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord
): SyntheticRunnerHandoffPreviewRecord {
  return {
    id: skeleton.id,
    key: buildStableSyntheticRunnerHandoffPreviewKey(skeleton.id),
    handoffPreviewVersion:
      "backend-owned-model-provider-synthetic-dry-run-runner-handoff-preview-v1",
    requestLabel: skeleton.requestLabel,
    workspaceTarget: skeleton.workspaceTarget,
    syntheticRunnerSkeletonId: skeleton.id,
    sourceBackendAdmissionContractReference:
      skeleton.sourceBackendAdmissionContractReference,
    sourceRunnerContractReference: skeleton.sourceDryRunRunnerContractReference,
    sourceRunnerReviewReference: skeleton.sourceDryRunRunnerReviewReference,
    handoffState: "preview-only / not handed off",
    backendRunnerTarget: "synthetic skeleton only",
    dryRunRequestState: "not created",
    runnerInvocationState: "not invoked",
    providerCallState: "not called",
    modelOutputState: "not generated",
    fixtureResultState: "placeholder only",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    queueWorkerJobStateSummary: "blocked / blocked / blocked",
    blockedDefaultReason:
      `Synthetic runner handoff remains blocked for ${skeleton.requestLabel} because no request, invocation, execution, queue dispatch, worker dispatch, or job execution exists.`,
    explicitNoHandoffNoExecutionStatement: "No handoff. No execution.",
  };
}

const SYNTHETIC_RUNNER_HANDOFF_PREVIEWS = SYNTHETIC_RUNNER_SKELETONS.map(
  (skeleton) => buildSyntheticRunnerHandoffPreviewRecord(skeleton)
);

function cloneHandoffPreview(
  record: SyntheticRunnerHandoffPreviewRecord
): SyntheticRunnerHandoffPreviewRecord {
  return { ...record };
}

export function listBackendOwnedModelProviderSyntheticDryRunRunnerSkeletons():
  readonly BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord[] {
  return SYNTHETIC_RUNNER_SKELETONS.map((record) => cloneSkeleton(record));
}

export function listSyntheticDryRunInputFixtures():
  readonly SyntheticDryRunInputFixtureRecord[] {
  return SYNTHETIC_INPUT_FIXTURES.map((record) => cloneInputFixture(record));
}

export function listSyntheticDryRunOutputFixtures():
  readonly SyntheticDryRunOutputFixtureRecord[] {
  return SYNTHETIC_OUTPUT_FIXTURES.map((record) => cloneOutputFixture(record));
}

export function listSyntheticDryRunErrorFixtures():
  readonly SyntheticDryRunErrorFixtureRecord[] {
  return SYNTHETIC_ERROR_FIXTURES.map((record) => cloneErrorFixture(record));
}

export function listSyntheticRunnerSkeletonGates():
  readonly SyntheticRunnerGateRecord[] {
  return SYNTHETIC_RUNNER_GATE_RECORDS.map((record) => cloneGateRecord(record));
}

export function listSyntheticRunnerSkeletonReadinessMatrixRecords():
  readonly SyntheticRunnerReadinessMatrixRecord[] {
  return SYNTHETIC_RUNNER_READINESS_RECORDS.map((record) =>
    cloneReadinessRecord(record)
  );
}

export function listSyntheticRunnerSkeletonHandoffPreviews():
  readonly SyntheticRunnerHandoffPreviewRecord[] {
  return SYNTHETIC_RUNNER_HANDOFF_PREVIEWS.map((record) =>
    cloneHandoffPreview(record)
  );
}

function buildCapabilityFamilyGroup(
  capabilityFamilyLabel: BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord["selectedCapabilityFamily"]["label"],
  skeletons: readonly BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord[]
): SyntheticRunnerSkeletonCapabilityFamilyGroup {
  const firstSkeleton = skeletons[0];

  if (!firstSkeleton) {
    throw new Error(
      `Cannot build synthetic runner capability family group without skeletons: ${capabilityFamilyLabel}`
    );
  }

  return {
    capabilityFamilyId: firstSkeleton.selectedCapabilityFamily.id,
    capabilityFamilyLabel,
    skeletonCount: skeletons.length,
    skeletons: skeletons.map((skeleton) => cloneSkeleton(skeleton)),
  };
}

export function groupSyntheticRunnerSkeletonsByCapabilityFamily():
  readonly SyntheticRunnerSkeletonCapabilityFamilyGroup[] {
  const groups = new Map<
    BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord["selectedCapabilityFamily"]["label"],
    BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord[]
  >();

  for (const skeleton of SYNTHETIC_RUNNER_SKELETONS) {
    const label = skeleton.selectedCapabilityFamily.label;
    const existing = groups.get(label);

    if (existing) {
      existing.push(skeleton);
      continue;
    }

    groups.set(label, [skeleton]);
  }

  return Array.from(groups.entries()).map(([label, skeletons]) =>
    buildCapabilityFamilyGroup(label, skeletons)
  );
}

function buildWorkspaceGroup(
  workspaceTarget: AiModelProviderWorkspaceTarget,
  skeletons: readonly BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord[]
): SyntheticRunnerSkeletonWorkspaceGroup {
  return {
    workspaceTarget,
    skeletonCount: skeletons.length,
    skeletons: skeletons.map((skeleton) => cloneSkeleton(skeleton)),
  };
}

export function groupSyntheticRunnerSkeletonsByWorkspaceTarget():
  readonly SyntheticRunnerSkeletonWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord[]
  >();

  for (const skeleton of SYNTHETIC_RUNNER_SKELETONS) {
    const existing = groups.get(skeleton.workspaceTarget);

    if (existing) {
      existing.push(skeleton);
      continue;
    }

    groups.set(skeleton.workspaceTarget, [skeleton]);
  }

  return Array.from(groups.entries()).map(([workspaceTarget, skeletons]) =>
    buildWorkspaceGroup(workspaceTarget, skeletons)
  );
}

export function buildSyntheticRunnerSkeletonSummary():
  SyntheticRunnerSkeletonSummary {
  const capabilityGroups = groupSyntheticRunnerSkeletonsByCapabilityFamily();
  const workspaceGroups = groupSyntheticRunnerSkeletonsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
    skeletonCount: SYNTHETIC_RUNNER_SKELETONS.length,
    inputFixtureCount: SYNTHETIC_INPUT_FIXTURES.length,
    outputFixtureCount: SYNTHETIC_OUTPUT_FIXTURES.length,
    errorFixtureCount: SYNTHETIC_ERROR_FIXTURES.length,
    gateCount: SYNTHETIC_RUNNER_GATE_RECORDS.length,
    readinessRecordCount: SYNTHETIC_RUNNER_READINESS_RECORDS.length,
    handoffPreviewCount: SYNTHETIC_RUNNER_HANDOFF_PREVIEWS.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    runnerState: "skeleton / not executable",
    currentReadiness: "skeleton-only / not executable",
    summaryLines: cloneList(SKELETON_SUMMARY_LINES),
  };
}

export function buildSyntheticRunnerGateSummary(): SyntheticRunnerGateSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
    gateCount: SYNTHETIC_RUNNER_GATE_RECORDS.length,
    backendSkeletonGateCount: SYNTHETIC_RUNNER_GATE_RECORDS.filter(
      (record) => record.owner === "backend skeleton"
    ).length,
    operatorGateCount: SYNTHETIC_RUNNER_GATE_RECORDS.filter(
      (record) => record.owner === "operator"
    ).length,
    safetyReviewGateCount: SYNTHETIC_RUNNER_GATE_RECORDS.filter(
      (record) => record.owner === "safety review"
    ).length,
    summaryLines: cloneList(GATE_SUMMARY_LINES),
  };
}

export function buildSyntheticRunnerReadinessSummary():
  SyntheticRunnerReadinessSummary {
  const nextSafeAction =
    "Keep the synthetic runner skeleton non-executable and define the backend-owned synthetic dry-run result capture contract next.";

  return {
    currentBatch:
      BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
    readinessRecordCount: SYNTHETIC_RUNNER_READINESS_RECORDS.length,
    currentReadiness: "skeleton-only / not executable",
    nextSafeAction,
    summaryLines: cloneList(READINESS_SUMMARY_LINES),
  };
}

export function buildNextSyntheticDryRunResultCaptureContractChecklist():
  readonly string[] {
  return cloneList(NEXT_RESULT_CAPTURE_CONTRACT_CHECKLIST);
}
