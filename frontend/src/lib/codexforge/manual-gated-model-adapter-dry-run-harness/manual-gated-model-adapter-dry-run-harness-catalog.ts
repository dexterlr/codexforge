import {
  buildStableModelAdapterRequestEnvelopeKey,
  buildStableModelAdapterResponseEnvelopeKey,
} from "../server-only-model-adapter-contracts";
import type {
  AiModelProviderSlotId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH,
  MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_PHASE,
  MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH,
  PREVIOUS_COMPLETED_SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH,
} from "./manual-gated-model-adapter-dry-run-harness-types";
import type {
  ManualGatedModelAdapterDryRunBlockedExecutionSummary,
  ManualGatedModelAdapterDryRunDenialFailurePreviewRecord,
  ManualGatedModelAdapterDryRunFixtureResultPreviewRecord,
  ManualGatedModelAdapterDryRunGateChecklistRecord,
  ManualGatedModelAdapterDryRunHarnessRecord,
  ManualGatedModelAdapterDryRunReadinessSummary,
  ManualGatedModelAdapterDryRunRequestPacketPreviewRecord,
  ManualGatedModelAdapterDryRunScenarioCapabilityGroup,
  ManualGatedModelAdapterDryRunScenarioKey,
  ManualGatedModelAdapterDryRunScenarioRecord,
  ManualGatedModelAdapterDryRunScenarioState,
  ManualGatedModelAdapterDryRunScenarioWorkspaceGroup,
  ManualGatedModelAdapterDryRunFixturePacketPosture,
  ManualGatedModelAdapterDryRunScenarioId,
  ManualGatedModelAdapterDryRunHarnessKey,
  ManualGatedModelAdapterDryRunRequestPacketKey,
  ManualGatedModelAdapterDryRunFixtureResultKey,
  ManualGatedModelAdapterDryRunDenialFailureKey,
} from "./manual-gated-model-adapter-dry-run-harness-types";
import type {
  ServerOnlyModelAdapterApprovalDraftReference,
  ServerOnlyModelAdapterCapabilityFamilyId,
  ServerOnlyModelAdapterCommandDraftReference,
  ServerOnlyModelAdapterContractId,
} from "../server-only-model-adapter-contracts";

type ManualGatedModelAdapterDryRunScenarioSeed = Readonly<{
  id: ManualGatedModelAdapterDryRunScenarioId;
  label: string;
  capabilityFamilyLabel:
    ManualGatedModelAdapterDryRunScenarioRecord["capabilityFamilyLabel"];
  adapterCapabilityId: ServerOnlyModelAdapterCapabilityFamilyId;
  adapterContractId: ServerOnlyModelAdapterContractId;
  providerSlotId: AiModelProviderSlotId;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  sourceCommandDraftReference: ServerOnlyModelAdapterCommandDraftReference;
  sourceApprovalDraftReference: ServerOnlyModelAdapterApprovalDraftReference;
  operatorObjective: string;
  summary: string;
  blockedDefaultReason: string;
}>;

const HARNESS_VERSION =
  "jarvis-model-gateway-manual-gated-dry-run-harness-v1" as const;
const REQUEST_PACKET_VERSION =
  "jarvis-model-gateway-dry-run-request-packet-preview-v1" as const;
const FIXTURE_RESULT_VERSION =
  "jarvis-model-gateway-dry-run-fixture-result-preview-v1" as const;
const DENIAL_FAILURE_VERSION =
  "jarvis-model-gateway-dry-run-denial-preview-v1" as const;

const SHARED_BLOCKED_LINES = [
  "dry-run harness is fixture-only",
  "manual operator approval is required",
  "manual confirmation is required",
  "kill switch required",
  "audit required",
  "server-only adapter contract required",
  "No model calls yet",
  "No prompt sending",
  "No provider SDKs imported",
  "provider execution is blocked",
  "dry-run result review and recovery comes next",
] as const;

const SHARED_NO_EXECUTION_STATEMENT =
  "No execution. No prompt sending. No provider call. No model call. No plugin execution. No persistence.";
const SHARED_NO_LIVE_RESULT_STATEMENT =
  "No live result is available. Provider response is not received. Model output is not generated. Fixture result remains static preview only.";
const SHARED_NO_PROVIDER_ERROR_STATEMENT =
  "No provider error has been received because prompts are not sent, providers are not called, and execution is blocked by default.";
const SHARED_PRIVACY_REDACTION_SUMMARY =
  "privacy/redaction summary: prompt payload stays redacted placeholder only and credential references remain opaque labels only.";
const SHARED_COST_RATE_SUMMARY =
  "cost/rate summary: cost acknowledgement required, rate limit guard required, and no billable execution path exists yet.";
const SHARED_TIMEOUT_CANCEL_SUMMARY =
  "timeout/cancel summary: timeout/cancel guard required and execution remains blocked before any backend handoff.";
const SHARED_FIXTURE_RESULT_STATE = "static placeholder only" as const;
const SHARED_DEFAULT_STATE: ManualGatedModelAdapterDryRunScenarioState =
  "blocked by default";
const SHARED_FIXTURE_PACKET_POSTURE:
  ManualGatedModelAdapterDryRunFixturePacketPosture = "fixture-only packets";

const DRY_RUN_SCENARIO_SEEDS = [
  {
    id: "text-planning-dry-run-scenario",
    label: "text planning dry-run scenario",
    capabilityFamilyLabel: "text planning",
    adapterCapabilityId: "planning-reasoning",
    adapterContractId: "planning-reasoning-adapter-contract",
    providerSlotId: "anthropic-provider-slot",
    workspaceTarget: "Athena Command Center",
    sourceCommandDraftReference: "athena-command-draft:approval-packet-intent",
    sourceApprovalDraftReference: "athena-approval-draft:approval-packet-intent",
    operatorObjective:
      "Preview text-planning adapter behavior for Athena without sending prompts or calling a model.",
    summary:
      "Fixture-only dry run for planning-oriented command normalization and routing review.",
    blockedDefaultReason:
      "Blocked by default because planning dry runs remain manual, fixture-only, approval-gated, and backend-only.",
  },
  {
    id: "code-assistance-dry-run-scenario",
    label: "code assistance dry-run scenario",
    capabilityFamilyLabel: "code assistance",
    adapterCapabilityId: "code-assistance",
    adapterContractId: "code-assistance-adapter-contract",
    providerSlotId: "anthropic-provider-slot",
    workspaceTarget: "Jarvis Websites",
    sourceCommandDraftReference: "athena-command-draft:website-build-intent",
    sourceApprovalDraftReference: "athena-approval-draft:website-build-intent",
    operatorObjective:
      "Preview code-assistance adapter behavior for website planning with fixture-only packets and blocked execution.",
    summary:
      "Fixture-only dry run for code-assistance packet review with no prompt transmission and no provider SDK imports.",
    blockedDefaultReason:
      "Blocked by default because code-assistance dry runs require manual approval, manual confirmation, and a server-only backend boundary.",
  },
  {
    id: "image-storyboard-dry-run-scenario",
    label: "image storyboard dry-run scenario",
    capabilityFamilyLabel: "image storyboard",
    adapterCapabilityId: "image-generation",
    adapterContractId: "image-generation-adapter-contract",
    providerSlotId: "image-provider-slot",
    workspaceTarget: "Jarvis Video Studio",
    sourceCommandDraftReference: "athena-command-draft:video-generation-intent",
    sourceApprovalDraftReference: "athena-approval-draft:video-generation-intent",
    operatorObjective:
      "Preview storyboard image adapter behavior with static fixtures for visual planning only.",
    summary:
      "Fixture-only dry run for storyboard packet previews and denied execution posture inside Jarvis Video Studio.",
    blockedDefaultReason:
      "Blocked by default because storyboard dry runs cannot send prompts, generate images, or persist outputs from the frontend.",
  },
  {
    id: "video-prompt-planning-dry-run-scenario",
    label: "video prompt planning dry-run scenario",
    capabilityFamilyLabel: "video prompt planning",
    adapterCapabilityId: "video-generation",
    adapterContractId: "video-generation-adapter-contract",
    providerSlotId: "video-provider-slot",
    workspaceTarget: "Jarvis Video Studio",
    sourceCommandDraftReference: "athena-command-draft:video-generation-intent",
    sourceApprovalDraftReference: "athena-approval-draft:video-generation-intent",
    operatorObjective:
      "Preview video-prompt adapter behavior for backend handoff planning while the video console remains locked.",
    summary:
      "Fixture-only dry run for video prompt planning with blocked provider execution and no live video generation.",
    blockedDefaultReason:
      "Blocked by default because video generation remains backend-only, approval-gated, and outside the frontend runtime.",
  },
  {
    id: "audio-narration-dry-run-scenario",
    label: "audio narration dry-run scenario",
    capabilityFamilyLabel: "audio narration",
    adapterCapabilityId: "audio-voice",
    adapterContractId: "audio-voice-adapter-contract",
    providerSlotId: "audio-voice-provider-slot",
    workspaceTarget: "Jarvis Avatar",
    sourceCommandDraftReference: "athena-command-draft:avatar-presenter-intent",
    sourceApprovalDraftReference: "athena-approval-draft:avatar-presenter-intent",
    operatorObjective:
      "Preview narration adapter behavior for voice planning with fixtures only and no audio generation.",
    summary:
      "Fixture-only dry run for narration packet previews with manual gates and no provider execution.",
    blockedDefaultReason:
      "Blocked by default because narration dry runs remain manual, fixture-only, and backend-owned with audit review required.",
  },
  {
    id: "transcription-caption-dry-run-scenario",
    label: "transcription/caption dry-run scenario",
    capabilityFamilyLabel: "transcription/caption",
    adapterCapabilityId: "transcription",
    adapterContractId: "transcription-adapter-contract",
    providerSlotId: "transcription-provider-slot",
    workspaceTarget: "Audit / Runs",
    sourceCommandDraftReference: "athena-command-draft:audit-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:audit-review-intent",
    operatorObjective:
      "Preview transcription and caption adapter behavior for review workflows without uploading media or receiving output.",
    summary:
      "Fixture-only dry run for caption/transcript packet previews and denied frontend execution posture.",
    blockedDefaultReason:
      "Blocked by default because transcription dry runs cannot transmit prompts, accept media, or persist results from the frontend.",
  },
  {
    id: "embeddings-search-dry-run-scenario",
    label: "embeddings/search dry-run scenario",
    capabilityFamilyLabel: "embeddings/search",
    adapterCapabilityId: "embeddings-search",
    adapterContractId: "embeddings-search-adapter-contract",
    providerSlotId: "openai-provider-slot",
    workspaceTarget: "Projects",
    sourceCommandDraftReference: "athena-command-draft:project-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:project-review-intent",
    operatorObjective:
      "Preview embeddings/search adapter behavior for retrieval planning with deterministic fixture packets only.",
    summary:
      "Fixture-only dry run for embeddings/search packet previews with blocked execution and no result persistence.",
    blockedDefaultReason:
      "Blocked by default because embeddings and search dry runs remain server-only, non-persistent, and approval-gated.",
  },
  {
    id: "safety-moderation-dry-run-scenario",
    label: "safety/moderation dry-run scenario",
    capabilityFamilyLabel: "safety/moderation",
    adapterCapabilityId: "safety-moderation",
    adapterContractId: "safety-moderation-adapter-contract",
    providerSlotId: "safety-moderation-provider-slot",
    workspaceTarget: "Safety / Settings",
    sourceCommandDraftReference: "athena-command-draft:safety-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:safety-review-intent",
    operatorObjective:
      "Preview moderation adapter behavior for safety review using static fixtures and no provider call.",
    summary:
      "Fixture-only dry run for safety packet previews with blocked execution and manual review preserved.",
    blockedDefaultReason:
      "Blocked by default because moderation dry runs require manual approval, audit review, and kill-switch enforcement before any backend handoff.",
  },
  {
    id: "local-private-inference-dry-run-scenario",
    label: "local/private inference dry-run scenario",
    capabilityFamilyLabel: "local/private inference",
    adapterCapabilityId: "local-inference",
    adapterContractId: "local-inference-adapter-contract",
    providerSlotId: "local-open-weight-provider-slot",
    workspaceTarget: "Developer / Checkpoints",
    sourceCommandDraftReference: "athena-command-draft:project-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:project-review-intent",
    operatorObjective:
      "Preview local/private inference adapter behavior while keeping frontend process execution blocked.",
    summary:
      "Fixture-only dry run for local/private inference packet previews with no shell, runtime, or provider execution from the app.",
    blockedDefaultReason:
      "Blocked by default because even local/private inference dry runs remain server-only, manual, and non-persistent.",
  },
] as const satisfies readonly ManualGatedModelAdapterDryRunScenarioSeed[];

const MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS: ManualGatedModelAdapterDryRunHarnessRecord =
  {
    key: "athena-model-adapter-dry-run-harness:manual-gated",
    harnessVersion: HARNESS_VERSION,
    currentBatch: MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH,
    highestDetectedPhase: MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_PHASE,
    latestCompletedBatch: MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH,
    nextLikelyBatch: MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH,
    source: "Jarvis Model Gateway / Athena",
    harnessMode: "manual gated dry-run only",
    fixtureMode: "fixture-only",
    providerCallPosture: "not implemented",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    environmentPosture: "no env var reads",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    manualOperatorApprovalRequired: "manual operator approval required",
    manualConfirmationRequired: "manual confirmation required",
    killSwitchRequired: "kill switch required",
    auditRequired: "audit required",
    credentialIsolationRequired: "credential isolation required",
    privacyRedactionRequired: "privacy/redaction required",
    costAcknowledgementRequired: "cost acknowledgement required",
    rateLimitGuardRequired: "rate limit guard required",
    timeoutCancelGuardRequired: "timeout/cancel guard required",
    idempotencyRequired: "idempotency required",
    replayBlockRequired: "replay block required",
    singleDryRunLockRequired: "single dry-run lock required",
    resultCaptureRequiredInFuture: "result capture required in future",
    resultPersistenceState: "result persistence not implemented",
    auditPersistenceState: "audit persistence not implemented",
    approvalPersistenceState: "approval persistence not implemented",
    nextResultReviewRecoveryRequirement:
      "dry-run result review and recovery comes next",
    blockedDefaultReason:
      "Manual dry-run execution remains blocked until a backend-owned review and recovery phase exists.",
    noExecutionStatement: SHARED_NO_EXECUTION_STATEMENT,
  };

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneScenario(
  scenario: ManualGatedModelAdapterDryRunScenarioRecord
): ManualGatedModelAdapterDryRunScenarioRecord {
  return { ...scenario };
}

function cloneRequestPacket(
  requestPacket: ManualGatedModelAdapterDryRunRequestPacketPreviewRecord
): ManualGatedModelAdapterDryRunRequestPacketPreviewRecord {
  return { ...requestPacket };
}

function cloneFixtureResult(
  fixtureResult: ManualGatedModelAdapterDryRunFixtureResultPreviewRecord
): ManualGatedModelAdapterDryRunFixtureResultPreviewRecord {
  return { ...fixtureResult };
}

function cloneDenialFailure(
  denialFailure: ManualGatedModelAdapterDryRunDenialFailurePreviewRecord
): ManualGatedModelAdapterDryRunDenialFailurePreviewRecord {
  return {
    ...denialFailure,
    deniedReasonExamples: cloneList(denialFailure.deniedReasonExamples),
    localValidationErrorExamples: cloneList(
      denialFailure.localValidationErrorExamples
    ),
  };
}

function cloneGate(
  gate: ManualGatedModelAdapterDryRunGateChecklistRecord
): ManualGatedModelAdapterDryRunGateChecklistRecord {
  return { ...gate };
}

export function buildStableModelAdapterDryRunHarnessKey(): ManualGatedModelAdapterDryRunHarnessKey {
  return "athena-model-adapter-dry-run-harness:manual-gated";
}

export function buildStableDryRunScenarioKey(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ManualGatedModelAdapterDryRunScenarioKey {
  return `athena-model-adapter-dry-run-scenario:${scenarioId}`;
}

export function buildStableDryRunRequestPacketKey(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ManualGatedModelAdapterDryRunRequestPacketKey {
  return `athena-model-adapter-dry-run-request-packet:${scenarioId}`;
}

export function buildStableDryRunFixtureResultKey(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ManualGatedModelAdapterDryRunFixtureResultKey {
  return `athena-model-adapter-dry-run-fixture-result:${scenarioId}`;
}

export function buildStableDryRunDenialFailureKey(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ManualGatedModelAdapterDryRunDenialFailureKey {
  return `athena-model-adapter-dry-run-denial:${scenarioId}`;
}

function buildScenarioRecord(
  seed: ManualGatedModelAdapterDryRunScenarioSeed
): ManualGatedModelAdapterDryRunScenarioRecord {
  return {
    id: seed.id,
    key: buildStableDryRunScenarioKey(seed.id),
    label: seed.label,
    capabilityFamilyLabel: seed.capabilityFamilyLabel,
    adapterCapabilityId: seed.adapterCapabilityId,
    adapterContractId: seed.adapterContractId,
    providerSlotId: seed.providerSlotId,
    workspaceTarget: seed.workspaceTarget,
    summary: seed.summary,
    fixturePacketPosture: SHARED_FIXTURE_PACKET_POSTURE,
    defaultState: SHARED_DEFAULT_STATE,
    blockedDefaultReason: seed.blockedDefaultReason,
    noExecutionStatement: SHARED_NO_EXECUTION_STATEMENT,
  };
}

function buildRequestPacketPreview(
  seed: ManualGatedModelAdapterDryRunScenarioSeed
): ManualGatedModelAdapterDryRunRequestPacketPreviewRecord {
  return {
    key: buildStableDryRunRequestPacketKey(seed.id),
    requestPacketVersion: REQUEST_PACKET_VERSION,
    dryRunScenarioId: seed.id,
    adapterContractId: seed.adapterContractId,
    capabilityId: seed.adapterCapabilityId,
    providerSlotId: seed.providerSlotId,
    sourceCommandDraftReference: seed.sourceCommandDraftReference,
    sourceApprovalDraftReference: seed.sourceApprovalDraftReference,
    sourceAdapterRequestEnvelopeReference:
      buildStableModelAdapterRequestEnvelopeKey(seed.adapterContractId),
    workspaceTarget: seed.workspaceTarget,
    operatorObjective: seed.operatorObjective,
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    fixtureInputState: "static fixture only",
    credentialReferencePosture: "opaque label only",
    approvalReferencePosture: "preview-only",
    auditReferencePosture: "preview-only",
    idempotencyKeyPosture: "deterministic preview key only",
    privacyRedactionSummary: SHARED_PRIVACY_REDACTION_SUMMARY,
    costRateSummary: SHARED_COST_RATE_SUMMARY,
    timeoutCancelSummary: SHARED_TIMEOUT_CANCEL_SUMMARY,
    manualApprovalGateState: "manual operator approval required",
    killSwitchGateState: "kill switch required",
    blockedDefaultReason: seed.blockedDefaultReason,
    noExecutionStatement: SHARED_NO_EXECUTION_STATEMENT,
  };
}

function buildFixtureResultPreview(
  seed: ManualGatedModelAdapterDryRunScenarioSeed
): ManualGatedModelAdapterDryRunFixtureResultPreviewRecord {
  return {
    key: buildStableDryRunFixtureResultKey(seed.id),
    fixtureResultVersion: FIXTURE_RESULT_VERSION,
    dryRunRequestPacketReference: buildStableDryRunRequestPacketKey(seed.id),
    adapterResponseEnvelopeReference:
      buildStableModelAdapterResponseEnvelopeKey(seed.adapterContractId),
    fixtureResultState: SHARED_FIXTURE_RESULT_STATE,
    providerResponseState: "not received",
    modelOutputState: "not generated",
    tokenCostAccountingState: "estimated placeholder only",
    safetyReviewState: "static preview only",
    redactionState: "static preview only",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    resultCaptureState: "not implemented",
    failureRecoveryState: "not implemented",
    blockedDefaultReason: seed.blockedDefaultReason,
    noLiveResultStatement: SHARED_NO_LIVE_RESULT_STATEMENT,
  };
}

function buildDenialFailurePreview(
  seed: ManualGatedModelAdapterDryRunScenarioSeed
): ManualGatedModelAdapterDryRunDenialFailurePreviewRecord {
  return {
    key: buildStableDryRunDenialFailureKey(seed.id),
    denialFailureVersion: DENIAL_FAILURE_VERSION,
    dryRunScenarioId: seed.id,
    deniedReasonExamples: [
      `${seed.label} remains blocked until manual operator approval is present.`,
      `${seed.label} remains blocked because fixture-only input is required and live prompts are not allowed.`,
      `${seed.label} remains blocked because provider execution is not implemented in the frontend.`,
    ],
    localValidationErrorExamples: [
      "Dry-run request packet must keep prompt payload posture as redacted placeholder only.",
      "Dry-run request packet must keep opaque credential references only and no plaintext secrets.",
      "Dry-run request packet must keep deterministic preview idempotency keys and fixture-only inputs.",
    ],
    killSwitchBlockedExample:
      "Kill switch blocked example: operator leaves the kill switch engaged, so the dry run remains locked and no backend handoff can be prepared.",
    missingApprovalExample:
      "Missing approval example: approval preview is absent, so the dry-run request packet cannot proceed past review-only posture.",
    missingOpaqueCredentialReferenceExample:
      "Missing opaque credential reference example: no opaque credential label is attached, so the dry-run request packet stays blocked.",
    promptNotSentReason:
      "Prompt not sent reason: prompt sending is not implemented and fixture-only dry-run packets never transmit prompt data.",
    providerNotCalledReason:
      "Provider not called reason: provider execution is blocked, no provider SDKs are imported, and no frontend provider call is allowed.",
    timeoutCancelPosture:
      "timeout/cancel posture: preview-only guard review with no live timeout handling because no run is started.",
    retryFallbackPosture: "disabled",
    recoveryPosture: "future manual review only",
    auditPosture: "not persisted",
    operatorActionRequired:
      "Review the denial, confirm manual approval and manual confirmation, preserve the kill switch posture, and wait for the next backend review/recovery batch.",
    noProviderErrorReceivedStatement: SHARED_NO_PROVIDER_ERROR_STATEMENT,
  };
}

const MANUAL_DRY_RUN_SCENARIOS = DRY_RUN_SCENARIO_SEEDS.map((seed) =>
  buildScenarioRecord(seed)
);

const DRY_RUN_REQUEST_PACKET_PREVIEWS = DRY_RUN_SCENARIO_SEEDS.map((seed) =>
  buildRequestPacketPreview(seed)
);

const DRY_RUN_FIXTURE_RESULT_PREVIEWS = DRY_RUN_SCENARIO_SEEDS.map((seed) =>
  buildFixtureResultPreview(seed)
);

const DRY_RUN_DENIAL_FAILURE_PREVIEWS = DRY_RUN_SCENARIO_SEEDS.map((seed) =>
  buildDenialFailurePreview(seed)
);

const MANUAL_DRY_RUN_GATE_CHECKLIST = [
  {
    id: "manual-operator-approval",
    label: "operator approval",
    summary:
      "Manual operator approval is required before any backend-only dry-run handoff can be reviewed.",
  },
  {
    id: "manual-confirmation",
    label: "manual confirmation",
    summary:
      "Manual confirmation is required so the dry run cannot proceed by implication or automation.",
  },
  {
    id: "kill-switch",
    label: "kill switch",
    summary:
      "Kill switch required remains visible and must stay reviewable before any future backend execution path is considered.",
  },
  {
    id: "audit-preview",
    label: "audit preview",
    summary:
      "Audit preview is required even though audit persistence remains unimplemented in this fixture-only batch.",
  },
  {
    id: "server-only-boundary",
    label: "server-only boundary",
    summary:
      "Server-only adapter contract required keeps the actual execution path outside the frontend runtime.",
  },
  {
    id: "no-frontend-provider-call",
    label: "no frontend provider call",
    summary:
      "Frontend provider calls remain blocked across Athena, Providers, and Jarvis workspaces.",
  },
  {
    id: "no-provider-sdk-import-in-frontend",
    label: "no provider SDK import in frontend",
    summary:
      "No provider SDKs imported remains a hard frontend boundary for this harness.",
  },
  {
    id: "no-prompt-sending",
    label: "no prompt sending",
    summary:
      "Prompt sending is not implemented, and all dry-run packets keep payloads redacted placeholder only.",
  },
  {
    id: "opaque-credential-reference",
    label: "opaque credential reference",
    summary:
      "Credential references stay opaque labels only and do not expose secret names, env vars, or token values.",
  },
  {
    id: "no-plaintext-secrets",
    label: "no plaintext secrets",
    summary:
      "No plaintext secrets are present in fixtures, previews, or operator-visible packet content.",
  },
  {
    id: "no-env-var-reads-from-frontend",
    label: "no env var reads from frontend",
    summary:
      "Frontend code does not read env vars while the backend-only execution path remains the only future target.",
  },
  {
    id: "privacy-redaction",
    label: "privacy/redaction",
    summary:
      "Privacy/redaction required stays explicit on every scenario, request packet, fixture result, and denial preview.",
  },
  {
    id: "cost-rate-timeout",
    label: "cost/rate/timeout",
    summary:
      "Cost acknowledgement, rate limit guard, and timeout/cancel guard remain required before any future execution review.",
  },
  {
    id: "idempotency-replay-block",
    label: "idempotency/replay block",
    summary:
      "Idempotency required and replay block required remain visible in every dry-run packet preview.",
  },
  {
    id: "single-dry-run-lock",
    label: "single dry-run lock",
    summary:
      "Single dry-run lock required keeps dry-run concurrency and repeat execution blocked until backend handling exists.",
  },
  {
    id: "fixture-only-result",
    label: "fixture-only result",
    summary:
      "Fixture result preview is static placeholder only, with no provider response and no generated model output.",
  },
  {
    id: "manual-review",
    label: "manual review",
    summary:
      "Manual review remains required for result interpretation, denial handling, and the next recovery-oriented batch.",
  },
  {
    id: "no-persistence-until-future-backend-batch",
    label: "no persistence until future backend batch",
    summary:
      "No result persistence, no audit persistence, no approval persistence, and no persistent memory exist in this harness batch.",
  },
] as const satisfies readonly ManualGatedModelAdapterDryRunGateChecklistRecord[];

export function getManualGatedModelAdapterDryRunHarness(): ManualGatedModelAdapterDryRunHarnessRecord {
  return { ...MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS };
}

export function listManualGatedModelAdapterDryRunScenarios(): readonly ManualGatedModelAdapterDryRunScenarioRecord[] {
  return MANUAL_DRY_RUN_SCENARIOS.map((scenario) => cloneScenario(scenario));
}

export function listDryRunRequestPacketPreviews(): readonly ManualGatedModelAdapterDryRunRequestPacketPreviewRecord[] {
  return DRY_RUN_REQUEST_PACKET_PREVIEWS.map((preview) =>
    cloneRequestPacket(preview)
  );
}

export function listDryRunFixtureResultPreviews(): readonly ManualGatedModelAdapterDryRunFixtureResultPreviewRecord[] {
  return DRY_RUN_FIXTURE_RESULT_PREVIEWS.map((preview) =>
    cloneFixtureResult(preview)
  );
}

export function listDryRunDenialFailurePreviews(): readonly ManualGatedModelAdapterDryRunDenialFailurePreviewRecord[] {
  return DRY_RUN_DENIAL_FAILURE_PREVIEWS.map((preview) =>
    cloneDenialFailure(preview)
  );
}

export function listManualDryRunGateChecklist(): readonly ManualGatedModelAdapterDryRunGateChecklistRecord[] {
  return MANUAL_DRY_RUN_GATE_CHECKLIST.map((gate) => cloneGate(gate));
}

export function groupDryRunScenariosByCapabilityFamily(): readonly ManualGatedModelAdapterDryRunScenarioCapabilityGroup[] {
  const scenarios = listManualGatedModelAdapterDryRunScenarios();
  const labels = Array.from(
    new Set(scenarios.map((scenario) => scenario.capabilityFamilyLabel))
  );

  return labels.map((capabilityFamilyLabel) => ({
    capabilityFamilyLabel,
    scenarioCount: scenarios.filter(
      (scenario) => scenario.capabilityFamilyLabel === capabilityFamilyLabel
    ).length,
    scenarios: scenarios.filter(
      (scenario) => scenario.capabilityFamilyLabel === capabilityFamilyLabel
    ),
  }));
}

export function groupDryRunScenariosByWorkspaceTarget(): readonly ManualGatedModelAdapterDryRunScenarioWorkspaceGroup[] {
  const scenarios = listManualGatedModelAdapterDryRunScenarios();
  const workspaceTargets = Array.from(
    new Set(scenarios.map((scenario) => scenario.workspaceTarget))
  );

  return workspaceTargets.map((workspaceTarget) => ({
    workspaceTarget,
    scenarioCount: scenarios.filter(
      (scenario) => scenario.workspaceTarget === workspaceTarget
    ).length,
    scenarios: scenarios.filter(
      (scenario) => scenario.workspaceTarget === workspaceTarget
    ),
  }));
}

export function buildDryRunReadinessSummary(): ManualGatedModelAdapterDryRunReadinessSummary {
  const scenarios = listManualGatedModelAdapterDryRunScenarios();
  const requestPackets = listDryRunRequestPacketPreviews();
  const fixtureResults = listDryRunFixtureResultPreviews();
  const denialFailures = listDryRunDenialFailurePreviews();
  const gateChecklist = listManualDryRunGateChecklist();
  const workspaceGroups = groupDryRunScenariosByWorkspaceTarget();

  return {
    currentBatch: MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH,
    highestDetectedPhase: MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_PHASE,
    latestCompletedBatch: MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH,
    nextLikelyBatch: MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH,
    scenarioCount: scenarios.length,
    requestPacketCount: requestPackets.length,
    fixtureResultCount: fixtureResults.length,
    denialFailureCount: denialFailures.length,
    gateCount: gateChecklist.length,
    workspaceTargetCount: workspaceGroups.length,
    summaryLines: [
      "manual gated model adapter dry-run harness only",
      "dry-run harness is fixture-only",
      "dry-run packets are preview-only",
      "fixture results are static preview only",
      "No model calls yet",
      "No prompt sending",
      "No provider SDKs imported",
      "provider execution is blocked",
      "dry-run result review and recovery comes next",
    ],
  };
}

export function buildBlockedDryRunExecutionSummary(): ManualGatedModelAdapterDryRunBlockedExecutionSummary {
  return {
    summary:
      "Manual gated dry-run harness is active as a fixture-only preview, but prompts are not sent, models are not called, providers are not executed, and persistence is not implemented.",
    blockedLines: cloneList(SHARED_BLOCKED_LINES),
  };
}

export function buildNextResultReviewAndRecoveryChecklist(): readonly string[] {
  return [
    MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH,
    "review fixture result previews against blocked/default reasons and denial paths.",
    "prepare manual result review and recovery decisions without enabling provider execution.",
    "keep audit, approval, and result joins preview-only until backend-owned persistence exists.",
    "preserve manual approval, manual confirmation, kill switch, and server-only boundaries.",
    "continue with no prompt sending, no model calls, no provider SDK imports, and no persistence.",
  ];
}
