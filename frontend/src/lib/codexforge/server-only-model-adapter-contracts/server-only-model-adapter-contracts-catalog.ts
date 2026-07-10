import type {
  AiModelProviderSlotId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  ServerOnlyModelAdapterCapabilityFamilyGroup,
  ServerOnlyModelAdapterCapabilityFamilyId,
  ServerOnlyModelAdapterCommandDraftReference,
  ServerOnlyModelAdapterContractId,
  ServerOnlyModelAdapterContractKey,
  ServerOnlyModelAdapterContractRecord,
  ServerOnlyModelAdapterErrorEnvelopeKey,
  ServerOnlyModelAdapterErrorEnvelopePreviewRecord,
  ServerOnlyModelAdapterGateChecklistRecord,
  ServerOnlyModelAdapterReadinessSummary,
  ServerOnlyModelAdapterRequestEnvelopeKey,
  ServerOnlyModelAdapterRequestEnvelopePreviewRecord,
  ServerOnlyModelAdapterResponseEnvelopeKey,
  ServerOnlyModelAdapterResponseEnvelopePreviewRecord,
  ServerOnlyModelAdapterWorkspaceTargetGroup,
  ServerOnlyModelExecutionBlockedSummary,
} from "./server-only-model-adapter-contracts-types";
import {
  MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH,
  SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH,
  SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_PHASE,
} from "./server-only-model-adapter-contracts-types";

type ServerOnlyModelAdapterSeedRecord = Readonly<{
  id: ServerOnlyModelAdapterContractId;
  label: string;
  capabilityFamilyId: ServerOnlyModelAdapterCapabilityFamilyId;
  capabilityFamilyLabel: string;
  targetProviderSlotId: AiModelProviderSlotId;
  workspaceTargets: readonly AiModelProviderWorkspaceTarget[];
  summary: string;
  sourceCommandDraftReference: ServerOnlyModelAdapterCommandDraftReference;
  sourceApprovalDraftReference: `athena-approval-draft:${string}`;
  operatorObjective: string;
  representativeWorkspaceTarget: AiModelProviderWorkspaceTarget;
  blockedDefaultReason: string;
}>;

const PREVIOUS_COMPLETED_BATCH =
  "4682-4713 - AI Model Provider Registry and Capability Matrix" as const;

const CONTRACT_VERSION =
  "jarvis-model-gateway-server-only-model-adapter-contract-v1" as const;
const REQUEST_ENVELOPE_VERSION =
  "jarvis-model-gateway-request-envelope-preview-v1" as const;
const RESPONSE_ENVELOPE_VERSION =
  "jarvis-model-gateway-response-envelope-preview-v1" as const;
const ERROR_ENVELOPE_VERSION =
  "jarvis-model-gateway-error-envelope-preview-v1" as const;

// Canonical literal markers preserved for release-smoke coverage:
// contractVersion: "jarvis-model-gateway-server-only-model-adapter-contract-v1"
// requestEnvelopeVersion: "jarvis-model-gateway-request-envelope-preview-v1"
// responseEnvelopeVersion: "jarvis-model-gateway-response-envelope-preview-v1"
// errorEnvelopeVersion: "jarvis-model-gateway-error-envelope-preview-v1"

const SHARED_BLOCKED_LINES = [
  "model adapters must run server-only",
  "frontend provider calls are blocked",
  "No model calls yet",
  "No prompt sending",
  "No provider SDKs imported",
  "opaque credential references only",
  "operator approval required",
  "kill switch required",
  "audit required",
  "manual gated dry-run harness comes next",
] as const;

const SHARED_NEXT_DRY_RUN_REQUIREMENT =
  "manual gated dry-run harness comes next: 4746-4777 - Manual Gated Model Adapter Dry-Run Harness";

const SHARED_PRIVACY_REDACTION_SUMMARY =
  "privacy/redaction summary: prompt payload is redacted placeholder only and credential references stay opaque.";
const SHARED_COST_RATE_SUMMARY =
  "cost/rate summary: cost acknowledgement required, rate limit guard required, and execution remains blocked by default.";
const SHARED_TIMEOUT_CANCEL_SUMMARY =
  "timeout/cancel summary: timeout/cancel guard required and no retry/fallback execution is enabled.";
const SHARED_NO_EXECUTION_STATEMENT =
  "No execution. No prompt sending. No provider call. No model call. Preview-only server-only adapter envelope.";
const SHARED_NO_RESULT_STATEMENT =
  "No result is available. Provider response is not received. Result state stays placeholder only.";
const SHARED_NO_PROVIDER_ERROR_STATEMENT =
  "No provider error has been received because execution is blocked by default and no provider call occurs.";

const CONTRACT_SEEDS = [
  {
    id: "text-chat-adapter-contract",
    label: "Text chat adapter contract",
    capabilityFamilyId: "text-chat",
    capabilityFamilyLabel: "text chat adapter contract",
    targetProviderSlotId: "openai-provider-slot",
    workspaceTargets: ["Athena Command Center", "Providers", "Projects"],
    summary:
      "Preview-only server-only contract for future text chat adapters in Athena and provider-review workspaces.",
    sourceCommandDraftReference: "athena-command-draft:provider-readiness-intent",
    sourceApprovalDraftReference:
      "athena-approval-draft:provider-readiness-intent",
    operatorObjective:
      "Preview a future server-only text chat adapter contract for Athena routing without sending prompts.",
    representativeWorkspaceTarget: "Athena Command Center",
    blockedDefaultReason:
      "Blocked by default until the manual gated dry-run harness exists and backend-only execution remains approved.",
  },
  {
    id: "code-assistance-adapter-contract",
    label: "Code assistance adapter contract",
    capabilityFamilyId: "code-assistance",
    capabilityFamilyLabel: "code assistance adapter contract",
    targetProviderSlotId: "anthropic-provider-slot",
    workspaceTargets: ["Athena Command Center", "Jarvis Websites", "Projects"],
    summary:
      "Preview-only server-only contract for future code assistance adapters across Athena and website planning lanes.",
    sourceCommandDraftReference: "athena-command-draft:website-build-intent",
    sourceApprovalDraftReference: "athena-approval-draft:website-build-intent",
    operatorObjective:
      "Preview a future server-only code assistance adapter contract for code planning and review tasks.",
    representativeWorkspaceTarget: "Jarvis Websites",
    blockedDefaultReason:
      "Blocked by default until approval, kill switch, audit, and a manual gated dry-run harness are wired behind the backend boundary.",
  },
  {
    id: "planning-reasoning-adapter-contract",
    label: "Planning / reasoning adapter contract",
    capabilityFamilyId: "planning-reasoning",
    capabilityFamilyLabel: "planning / reasoning adapter contract",
    targetProviderSlotId: "anthropic-provider-slot",
    workspaceTargets: [
      "Athena Command Center",
      "Providers",
      "Developer / Checkpoints",
    ],
    summary:
      "Preview-only server-only contract for future planning and reasoning adapters that stay backend-only and audit-gated.",
    sourceCommandDraftReference: "athena-command-draft:approval-packet-intent",
    sourceApprovalDraftReference: "athena-approval-draft:approval-packet-intent",
    operatorObjective:
      "Preview a future planning and reasoning adapter contract for backend-only decision support.",
    representativeWorkspaceTarget: "Athena Command Center",
    blockedDefaultReason:
      "Blocked by default because planning adapters must remain server-only and approval-gated until the dry-run harness is available.",
  },
  {
    id: "image-generation-adapter-contract",
    label: "Image generation adapter contract",
    capabilityFamilyId: "image-generation",
    capabilityFamilyLabel: "image generation adapter contract",
    targetProviderSlotId: "image-provider-slot",
    workspaceTargets: ["Jarvis Video Studio", "Assets", "Providers"],
    summary:
      "Preview-only server-only contract for future image generation adapters used by storyboard and asset planning workflows.",
    sourceCommandDraftReference: "athena-command-draft:video-generation-intent",
    sourceApprovalDraftReference: "athena-approval-draft:video-generation-intent",
    operatorObjective:
      "Preview a future image generation adapter contract for storyboard and asset-generation handoff planning.",
    representativeWorkspaceTarget: "Jarvis Video Studio",
    blockedDefaultReason:
      "Blocked by default because image generation adapters must remain server-only and cannot send prompts from the frontend.",
  },
  {
    id: "image-editing-adapter-contract",
    label: "Image editing adapter contract",
    capabilityFamilyId: "image-editing",
    capabilityFamilyLabel: "image editing adapter contract",
    targetProviderSlotId: "google-gemini-provider-slot",
    workspaceTargets: ["Jarvis Video Studio", "Assets", "Projects"],
    summary:
      "Preview-only server-only contract for future image editing adapters with redaction, approval, and audit gates kept explicit.",
    sourceCommandDraftReference: "athena-command-draft:asset-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:asset-review-intent",
    operatorObjective:
      "Preview a future image editing adapter contract for safe asset revision planning.",
    representativeWorkspaceTarget: "Assets",
    blockedDefaultReason:
      "Blocked by default because image editing must stay backend-only, with result capture and persistence deferred to future backend phases.",
  },
  {
    id: "video-generation-adapter-contract",
    label: "Video generation adapter contract",
    capabilityFamilyId: "video-generation",
    capabilityFamilyLabel: "video generation adapter contract",
    targetProviderSlotId: "video-provider-slot",
    workspaceTargets: ["Jarvis Video Studio", "Providers", "Assets"],
    summary:
      "Preview-only server-only contract for future video generation adapters while the Jarvis Video Studio console remains locked above the fold.",
    sourceCommandDraftReference: "athena-command-draft:video-generation-intent",
    sourceApprovalDraftReference: "athena-approval-draft:video-generation-intent",
    operatorObjective:
      "Preview a future server-only video generation adapter contract without generating video or sending prompts.",
    representativeWorkspaceTarget: "Jarvis Video Studio",
    blockedDefaultReason:
      "Blocked by default because video generation remains backend-only, approval-gated, and outside the frontend runtime.",
  },
  {
    id: "audio-voice-adapter-contract",
    label: "Audio / voice adapter contract",
    capabilityFamilyId: "audio-voice",
    capabilityFamilyLabel: "audio / voice adapter contract",
    targetProviderSlotId: "audio-voice-provider-slot",
    workspaceTargets: ["Jarvis Video Studio", "Jarvis Avatar", "Providers"],
    summary:
      "Preview-only server-only contract for future audio and voice adapters across narration and avatar planning workspaces.",
    sourceCommandDraftReference: "athena-command-draft:avatar-presenter-intent",
    sourceApprovalDraftReference:
      "athena-approval-draft:avatar-presenter-intent",
    operatorObjective:
      "Preview a future audio and voice adapter contract for narration and voice planning.",
    representativeWorkspaceTarget: "Jarvis Avatar",
    blockedDefaultReason:
      "Blocked by default because audio and voice adapters must remain server-only with opaque credential references and no provider SDK imports in frontend.",
  },
  {
    id: "transcription-adapter-contract",
    label: "Transcription adapter contract",
    capabilityFamilyId: "transcription",
    capabilityFamilyLabel: "transcription adapter contract",
    targetProviderSlotId: "transcription-provider-slot",
    workspaceTargets: ["Jarvis Video Studio", "Audit / Runs", "Providers"],
    summary:
      "Preview-only server-only contract for future transcription adapters that keep prompts redacted and review-only in the frontend.",
    sourceCommandDraftReference: "athena-command-draft:audit-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:audit-review-intent",
    operatorObjective:
      "Preview a future transcription adapter contract for caption and transcript review workflows.",
    representativeWorkspaceTarget: "Audit / Runs",
    blockedDefaultReason:
      "Blocked by default because transcription adapters cannot transmit prompts or results from the frontend.",
  },
  {
    id: "embeddings-search-adapter-contract",
    label: "Embeddings / search adapter contract",
    capabilityFamilyId: "embeddings-search",
    capabilityFamilyLabel: "embeddings / search adapter contract",
    targetProviderSlotId: "openai-provider-slot",
    workspaceTargets: ["Athena Command Center", "Projects", "Providers"],
    summary:
      "Preview-only server-only contract for future embeddings and search adapters used by workspace context routing and retrieval planning.",
    sourceCommandDraftReference: "athena-command-draft:project-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:project-review-intent",
    operatorObjective:
      "Preview a future embeddings and search adapter contract for workspace retrieval planning without retrieval execution.",
    representativeWorkspaceTarget: "Projects",
    blockedDefaultReason:
      "Blocked by default because embeddings and search remain backend-only and cannot persist results or audit joins from the frontend.",
  },
  {
    id: "safety-moderation-adapter-contract",
    label: "Safety / moderation adapter contract",
    capabilityFamilyId: "safety-moderation",
    capabilityFamilyLabel: "safety / moderation adapter contract",
    targetProviderSlotId: "safety-moderation-provider-slot",
    workspaceTargets: ["Safety / Settings", "Athena Command Center", "Providers"],
    summary:
      "Preview-only server-only contract for future safety and moderation adapters that remain backend-only and manual-review gated.",
    sourceCommandDraftReference: "athena-command-draft:safety-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:safety-review-intent",
    operatorObjective:
      "Preview a future safety and moderation adapter contract for backend-only safety review planning.",
    representativeWorkspaceTarget: "Safety / Settings",
    blockedDefaultReason:
      "Blocked by default because moderation adapters require server-only redaction, audit, and operator review before any backend dry run.",
  },
  {
    id: "local-inference-adapter-contract",
    label: "Local inference adapter contract",
    capabilityFamilyId: "local-inference",
    capabilityFamilyLabel: "local inference adapter contract",
    targetProviderSlotId: "local-open-weight-provider-slot",
    workspaceTargets: ["Athena Command Center", "Projects", "Developer / Checkpoints"],
    summary:
      "Preview-only server-only contract for future local inference adapters that still remain blocked from frontend execution and persistence.",
    sourceCommandDraftReference: "athena-command-draft:project-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:project-review-intent",
    operatorObjective:
      "Preview a future local inference adapter contract while keeping frontend execution blocked.",
    representativeWorkspaceTarget: "Developer / Checkpoints",
    blockedDefaultReason:
      "Blocked by default because even local inference adapters must respect the same server-only, approval, kill-switch, and audit contract boundary.",
  },
] as const satisfies readonly ServerOnlyModelAdapterSeedRecord[];

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneContract(
  contract: ServerOnlyModelAdapterContractRecord
): ServerOnlyModelAdapterContractRecord {
  return {
    ...contract,
    workspaceTargets: cloneList(contract.workspaceTargets),
  };
}

function cloneRequestEnvelope(
  requestEnvelope: ServerOnlyModelAdapterRequestEnvelopePreviewRecord
): ServerOnlyModelAdapterRequestEnvelopePreviewRecord {
  return { ...requestEnvelope };
}

function cloneResponseEnvelope(
  responseEnvelope: ServerOnlyModelAdapterResponseEnvelopePreviewRecord
): ServerOnlyModelAdapterResponseEnvelopePreviewRecord {
  return { ...responseEnvelope };
}

function cloneErrorEnvelope(
  errorEnvelope: ServerOnlyModelAdapterErrorEnvelopePreviewRecord
): ServerOnlyModelAdapterErrorEnvelopePreviewRecord {
  return {
    ...errorEnvelope,
    localValidationErrorExamples: cloneList(errorEnvelope.localValidationErrorExamples),
  };
}

function cloneGate(
  gate: ServerOnlyModelAdapterGateChecklistRecord
): ServerOnlyModelAdapterGateChecklistRecord {
  return { ...gate };
}

export function buildStableModelAdapterContractKey(
  contractId: ServerOnlyModelAdapterContractId
): ServerOnlyModelAdapterContractKey {
  return `athena-model-adapter-contract:${contractId}`;
}

export function buildStableModelAdapterRequestEnvelopeKey(
  contractId: ServerOnlyModelAdapterContractId
): ServerOnlyModelAdapterRequestEnvelopeKey {
  return `athena-model-adapter-request-envelope:${contractId}`;
}

export function buildStableModelAdapterResponseEnvelopeKey(
  contractId: ServerOnlyModelAdapterContractId
): ServerOnlyModelAdapterResponseEnvelopeKey {
  return `athena-model-adapter-response-envelope:${contractId}`;
}

export function buildStableModelAdapterErrorEnvelopeKey(
  contractId: ServerOnlyModelAdapterContractId
): ServerOnlyModelAdapterErrorEnvelopeKey {
  return `athena-model-adapter-error-envelope:${contractId}`;
}

function buildContractRecord(
  seed: ServerOnlyModelAdapterSeedRecord
): ServerOnlyModelAdapterContractRecord {
  return {
    id: seed.id,
    key: buildStableModelAdapterContractKey(seed.id),
    label: seed.label,
    capabilityFamilyId: seed.capabilityFamilyId,
    capabilityFamilyLabel: seed.capabilityFamilyLabel,
    targetProviderSlotId: seed.targetProviderSlotId,
    workspaceTargets: cloneList(seed.workspaceTargets),
    summary: seed.summary,
    contractVersion: CONTRACT_VERSION,
    source: "Jarvis Model Gateway / Athena",
    contractMode: "preview-only",
    adapterPosture: "server-only required",
    frontendPosture: "blocked",
    providerCallPosture: "not implemented",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    environmentPosture: "no env var reads",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
    killSwitchRequired: "kill switch required",
    auditRequired: "audit required",
    credentialIsolationRequired: "credential isolation required",
    privacyRedactionRequired: "privacy/redaction required",
    costAcknowledgementRequired: "cost acknowledgement required",
    rateLimitGuardRequired: "rate limit guard required",
    timeoutCancelGuardRequired: "timeout/cancel guard required",
    idempotencyRequired: "idempotency required",
    replayBlockRequired: "replay block required",
    resultCaptureRequiredInFuture: "result capture required in future",
    resultPersistenceState: "result persistence not implemented",
    auditPersistenceState: "audit persistence not implemented",
    approvalPersistenceState: "approval persistence not implemented",
    nextDryRunHarnessRequirement: SHARED_NEXT_DRY_RUN_REQUIREMENT,
  };
}

function buildRequestEnvelopePreview(
  seed: ServerOnlyModelAdapterSeedRecord
): ServerOnlyModelAdapterRequestEnvelopePreviewRecord {
  return {
    requestEnvelopeKey: buildStableModelAdapterRequestEnvelopeKey(seed.id),
    requestEnvelopeVersion: REQUEST_ENVELOPE_VERSION,
    adapterContractId: seed.id,
    capabilityId: seed.capabilityFamilyId,
    capabilityLabel: seed.capabilityFamilyLabel,
    targetProviderSlotId: seed.targetProviderSlotId,
    sourceCommandDraftReference: seed.sourceCommandDraftReference,
    sourceApprovalDraftReference: seed.sourceApprovalDraftReference,
    workspaceTarget: seed.representativeWorkspaceTarget,
    operatorObjective: seed.operatorObjective,
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    credentialReferencePosture: "opaque label only",
    approvalReferencePosture: "preview-only",
    auditReferencePosture: "preview-only",
    idempotencyKeyPosture: "deterministic preview key only",
    privacyRedactionSummary: SHARED_PRIVACY_REDACTION_SUMMARY,
    costRateSummary: SHARED_COST_RATE_SUMMARY,
    timeoutCancelSummary: SHARED_TIMEOUT_CANCEL_SUMMARY,
    blockedDefaultReason: seed.blockedDefaultReason,
    noExecutionStatement: SHARED_NO_EXECUTION_STATEMENT,
  };
}

function buildResponseEnvelopePreview(
  requestEnvelope: ServerOnlyModelAdapterRequestEnvelopePreviewRecord
): ServerOnlyModelAdapterResponseEnvelopePreviewRecord {
  return {
    responseEnvelopeKey: buildStableModelAdapterResponseEnvelopeKey(
      requestEnvelope.adapterContractId
    ),
    responseEnvelopeVersion: RESPONSE_ENVELOPE_VERSION,
    adapterContractId: requestEnvelope.adapterContractId,
    requestEnvelopeReference: requestEnvelope.requestEnvelopeKey,
    resultState: "placeholder only",
    providerResponseState: "not received",
    tokenCostAccountingState: "not available",
    safetyReviewState: "pending future backend result",
    redactionState: "pending future backend result",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    resultCaptureState: "not implemented",
    failureRecoveryState: "not implemented",
    blockedDefaultReason: requestEnvelope.blockedDefaultReason,
    noResultStatement: SHARED_NO_RESULT_STATEMENT,
  };
}

function buildErrorEnvelopePreview(
  requestEnvelope: ServerOnlyModelAdapterRequestEnvelopePreviewRecord
): ServerOnlyModelAdapterErrorEnvelopePreviewRecord {
  return {
    errorEnvelopeKey: buildStableModelAdapterErrorEnvelopeKey(
      requestEnvelope.adapterContractId
    ),
    errorEnvelopeVersion: ERROR_ENVELOPE_VERSION,
    adapterContractId: requestEnvelope.adapterContractId,
    requestEnvelopeReference: requestEnvelope.requestEnvelopeKey,
    providerErrorState: "not received",
    localValidationErrorExamples: [
      "Prompt payload must remain a redacted placeholder only.",
      "Target provider slot id must resolve to a server-only adapter preview record.",
      "Approval and audit references must stay preview-only until the manual gated dry-run harness exists.",
    ],
    blockedDefaultReason: requestEnvelope.blockedDefaultReason,
    timeoutCancelPosture:
      "timeout/cancel posture: guard review only while execution remains blocked by default.",
    retryFallbackPosture: "disabled",
    recoveryPosture: "future manual review only",
    auditPosture: "not persisted",
    operatorActionRequired:
      "Review the blocked reason, confirm operator approval, preserve the kill switch, and keep the backend-only dry-run path manual.",
    noProviderErrorReceivedStatement: SHARED_NO_PROVIDER_ERROR_STATEMENT,
  };
}

const SERVER_ONLY_MODEL_ADAPTER_CONTRACTS = CONTRACT_SEEDS.map((seed) =>
  buildContractRecord(seed)
);

const MODEL_ADAPTER_REQUEST_ENVELOPE_PREVIEWS = CONTRACT_SEEDS.map((seed) =>
  buildRequestEnvelopePreview(seed)
);

const MODEL_ADAPTER_RESPONSE_ENVELOPE_PREVIEWS =
  MODEL_ADAPTER_REQUEST_ENVELOPE_PREVIEWS.map((requestEnvelope) =>
    buildResponseEnvelopePreview(requestEnvelope)
  );

const MODEL_ADAPTER_ERROR_ENVELOPE_PREVIEWS =
  MODEL_ADAPTER_REQUEST_ENVELOPE_PREVIEWS.map((requestEnvelope) =>
    buildErrorEnvelopePreview(requestEnvelope)
  );

const SERVER_ONLY_ADAPTER_GATE_CHECKLIST = [
  {
    id: "server-only-boundary",
    label: "server-only boundary",
    summary:
      "Every future model adapter must run behind a backend-only boundary and stay out of the frontend runtime.",
  },
  {
    id: "no-frontend-provider-call",
    label: "no frontend provider call",
    summary:
      "Frontend provider calls are blocked and no model/provider execution occurs from Athena or product workspaces.",
  },
  {
    id: "no-provider-sdk-import-in-frontend",
    label: "no provider SDK import in frontend",
    summary:
      "No provider SDKs imported is a hard adapter gate for this preview-only batch.",
  },
  {
    id: "no-prompt-sending-from-frontend",
    label: "no prompt sending from frontend",
    summary:
      "Prompt sending stays blocked and request envelopes keep redacted placeholder payloads only.",
  },
  {
    id: "opaque-credential-reference",
    label: "opaque credential reference",
    summary:
      "Credential references stay opaque, backend-owned, and never expose secret names or plaintext values.",
  },
  {
    id: "no-plaintext-secrets",
    label: "no plaintext secrets",
    summary:
      "No plaintext secrets, no frontend key reads, and no browser storage are allowed in this contract layer.",
  },
  {
    id: "no-env-var-reads-from-frontend",
    label: "no env var reads from frontend",
    summary:
      "Frontend code does not read env vars and does not bridge secret material into the browser.",
  },
  {
    id: "operator-approval",
    label: "operator approval",
    summary:
      "Operator approval required remains explicit on every adapter contract, envelope preview, and next dry-run step.",
  },
  {
    id: "kill-switch",
    label: "kill switch",
    summary:
      "Kill switch required remains part of the default blocked posture before any backend dry run can be considered.",
  },
  {
    id: "audit",
    label: "audit",
    summary:
      "Audit required remains mandatory even though audit persistence is not implemented in this frontend-only preview batch.",
  },
  {
    id: "privacy-redaction",
    label: "privacy/redaction",
    summary:
      "Privacy/redaction required remains visible on all contracts and envelope previews with prompt payloads kept redacted.",
  },
  {
    id: "cost-rate-timeout",
    label: "cost/rate/timeout",
    summary:
      "Cost acknowledgement, rate limit guard, and timeout/cancel guard stay required before any backend-only dry run.",
  },
  {
    id: "idempotency-replay-block",
    label: "idempotency/replay block",
    summary:
      "Idempotency required and replay block required remain explicit gates for future backend execution safety.",
  },
  {
    id: "result-capture",
    label: "result capture",
    summary:
      "Result capture required in future is defined, but result capture and persistence remain not implemented in this batch.",
  },
  {
    id: "manual-review",
    label: "manual review",
    summary:
      "Manual review required keeps dry-run follow-up work operator-controlled and backend-only.",
  },
  {
    id: "no-persistence-until-future-backend-batch",
    label: "no persistence until future backend batch",
    summary:
      "No result persistence, no audit persistence, and no approval persistence are allowed until future backend work exists.",
  },
] as const satisfies readonly ServerOnlyModelAdapterGateChecklistRecord[];

export function listServerOnlyModelAdapterContracts(): readonly ServerOnlyModelAdapterContractRecord[] {
  return SERVER_ONLY_MODEL_ADAPTER_CONTRACTS.map((contract) => cloneContract(contract));
}

export function listModelAdapterRequestEnvelopePreviews(): readonly ServerOnlyModelAdapterRequestEnvelopePreviewRecord[] {
  return MODEL_ADAPTER_REQUEST_ENVELOPE_PREVIEWS.map((requestEnvelope) =>
    cloneRequestEnvelope(requestEnvelope)
  );
}

export function listModelAdapterResponseEnvelopePreviews(): readonly ServerOnlyModelAdapterResponseEnvelopePreviewRecord[] {
  return MODEL_ADAPTER_RESPONSE_ENVELOPE_PREVIEWS.map((responseEnvelope) =>
    cloneResponseEnvelope(responseEnvelope)
  );
}

export function listModelAdapterErrorEnvelopePreviews(): readonly ServerOnlyModelAdapterErrorEnvelopePreviewRecord[] {
  return MODEL_ADAPTER_ERROR_ENVELOPE_PREVIEWS.map((errorEnvelope) =>
    cloneErrorEnvelope(errorEnvelope)
  );
}

export function listServerOnlyAdapterGateChecklist(): readonly ServerOnlyModelAdapterGateChecklistRecord[] {
  return SERVER_ONLY_ADAPTER_GATE_CHECKLIST.map((gate) => cloneGate(gate));
}

export function groupAdapterContractsByCapabilityFamily(): readonly ServerOnlyModelAdapterCapabilityFamilyGroup[] {
  const contracts = listServerOnlyModelAdapterContracts();
  const capabilityIds = Array.from(
    new Set(contracts.map((contract) => contract.capabilityFamilyId))
  );

  return capabilityIds.map((capabilityFamilyId) => {
    const groupContracts = contracts.filter(
      (contract) => contract.capabilityFamilyId === capabilityFamilyId
    );
    const firstContract = groupContracts[0];

    return {
      capabilityFamilyId,
      capabilityFamilyLabel: firstContract
        ? firstContract.capabilityFamilyLabel
        : capabilityFamilyId,
      contractCount: groupContracts.length,
      contracts: groupContracts,
    };
  });
}

export function groupAdapterContractsByWorkspaceTarget(): readonly ServerOnlyModelAdapterWorkspaceTargetGroup[] {
  const contracts = listServerOnlyModelAdapterContracts();
  const workspaceTargets = Array.from(
    new Set(
      contracts.flatMap((contract) => contract.workspaceTargets.map((target) => target))
    )
  );

  return workspaceTargets.map((workspaceTarget) => ({
    workspaceTarget,
    contractCount: contracts.filter((contract) =>
      contract.workspaceTargets.includes(workspaceTarget)
    ).length,
    contracts: contracts.filter((contract) =>
      contract.workspaceTargets.includes(workspaceTarget)
    ),
  }));
}

export function buildAdapterReadinessSummary(): ServerOnlyModelAdapterReadinessSummary {
  const contracts = listServerOnlyModelAdapterContracts();
  const requestEnvelopes = listModelAdapterRequestEnvelopePreviews();
  const responseEnvelopes = listModelAdapterResponseEnvelopePreviews();
  const errorEnvelopes = listModelAdapterErrorEnvelopePreviews();
  const workspaceGroups = groupAdapterContractsByWorkspaceTarget();

  return {
    currentBatch: SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH,
    highestDetectedPhase: SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_PHASE,
    latestCompletedBatch: SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH,
    previousCompletedBatch: PREVIOUS_COMPLETED_BATCH,
    nextLikelyBatch: MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH,
    contractCount: contracts.length,
    requestEnvelopeCount: requestEnvelopes.length,
    responseEnvelopeCount: responseEnvelopes.length,
    errorEnvelopeCount: errorEnvelopes.length,
    workspaceTargetCount: workspaceGroups.length,
    summaryLines: [
      "server-only model adapter contracts only",
      "adapter contracts are preview-only",
      "adapter envelopes are preview-only",
      "request envelope preview",
      "response envelope preview",
      "error envelope preview",
      "execution is blocked by default",
      "manual gated dry-run harness comes next",
    ],
  };
}

export function buildBlockedModelExecutionSummary(): ServerOnlyModelExecutionBlockedSummary {
  return {
    summary:
      "Server-only model adapters remain preview-only, frontend provider calls are blocked, and manual gated dry-run harness work comes next before any backend-only dry run exists.",
    blockedLines: cloneList(SHARED_BLOCKED_LINES),
  };
}

export function buildNextManualGatedDryRunChecklist(): readonly string[] {
  return [
    MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH,
    "manual gated dry-run harness comes next",
    "keep request envelope preview, response envelope preview, and error envelope preview backend-only and preview-only.",
    "preserve operator approval required, kill switch required, and audit required before any backend dry run.",
    "keep prompt payloads redacted, credential references opaque, and frontend provider calls blocked.",
    "continue with no model calls, no prompt sending, no provider SDK imports, and no persistence.",
  ];
}
