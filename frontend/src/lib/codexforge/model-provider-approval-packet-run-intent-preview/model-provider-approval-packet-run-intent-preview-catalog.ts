import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
  buildStableAthenaModelRoutingKey,
  buildStableModelRoutingChainKey,
  buildStableProviderSelectionRationaleKey,
  listAthenaModelRoutingPreviews,
  listModelRoutingChainPreviews,
  listProviderSelectionRationales,
  type AthenaModelRoutingCapabilityFamilyRecord,
  type AthenaModelRoutingChainId,
  type AthenaModelRoutingPreviewId,
  type AthenaModelRoutingProviderSlotLabel,
} from "../athena-model-routing-provider-selection-preview";
import {
  buildStableDryRunAcceptanceMatrixKey,
  buildStableModelAdapterDryRunReviewKey,
  type ModelAdapterDryRunAcceptanceMatrixKey,
  type ModelAdapterDryRunResultReviewKey,
} from "../model-adapter-dry-run-result-review-recovery";
import type { ManualGatedModelAdapterDryRunScenarioId } from "../manual-gated-model-adapter-dry-run-harness";
import {
  buildStableModelAdapterContractKey,
  type ServerOnlyModelAdapterContractId,
} from "../server-only-model-adapter-contracts";
import {
  MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH,
  MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_PHASE,
  NEXT_MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
  type ModelProviderApprovalDraftReference,
  type ModelProviderApprovalExpiryRevocationKey,
  type ModelProviderApprovalExpiryRevocationPreviewRecord,
  type ModelProviderApprovalExpiryRevocationPreviewVersion,
  type ModelProviderApprovalGateChecklistId,
  type ModelProviderApprovalGateChecklistKey,
  type ModelProviderApprovalGateChecklistRecord,
  type ModelProviderApprovalGateChecklistVersion,
  type ModelProviderApprovalPacketCapabilityFamilyGroup,
  type ModelProviderApprovalPacketCommandDraftReference,
  type ModelProviderApprovalPacketKey,
  type ModelProviderApprovalPacketRecord,
  type ModelProviderApprovalPacketSummary,
  type ModelProviderApprovalPacketWorkspaceGroup,
  type ModelProviderNoExecutionStatement,
  type ModelProviderRunIntentBlockerId,
  type ModelProviderRunIntentBlockerKey,
  type ModelProviderRunIntentBlockerRecord,
  type ModelProviderRunIntentBlockerSummary,
  type ModelProviderRunIntentBlockerMatrixVersion,
  type ModelProviderRunIntentKey,
  type ModelProviderRunIntentPreviewRecord,
  type ModelProviderRunIntentPreviewVersion,
  type ModelProviderRunIntentSummary,
} from "./model-provider-approval-packet-run-intent-preview-types";

type ApprovalPacketSeed = Readonly<{
  id: AthenaModelRoutingPreviewId;
  label: string;
  chainId: AthenaModelRoutingChainId;
  contractId: ServerOnlyModelAdapterContractId;
  dryRunScenarioId: ManualGatedModelAdapterDryRunScenarioId;
  primaryCapabilityId: AiModelProviderCapabilityId;
  sourceCommandDraftReference: ModelProviderApprovalPacketCommandDraftReference;
  sourceApprovalDraftReference: ModelProviderApprovalDraftReference;
  approvalScopeSummary: string;
  approvedActionSummary: string;
  disallowedActionSummary: string;
  runIntentBlockedDefaultReason: string;
}>;

const NO_EXECUTION_STATEMENT =
  "No execution. No prompt sending. No model calls. No provider execution. No plugin execution." as const satisfies ModelProviderNoExecutionStatement;

const SUMMARY_LINES = [
  "model provider approval packet and run intent preview only",
  "approval packet is preview-only",
  "run intent is preview-only",
  "approval gates are preview-only",
  "run intent blockers are preview-only",
  "approval expiry and revocation are preview-only",
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
  "manual gated run admission preview next",
  "manual gated model provider run admission preview next",
] as const;

const ROUTING_PREVIEWS = listAthenaModelRoutingPreviews();
const ROUTING_RATIONALES = listProviderSelectionRationales();
const ROUTING_CHAINS = listModelRoutingChainPreviews();

const ROUTING_PREVIEW_BY_ID = new Map(
  ROUTING_PREVIEWS.map((preview) => [preview.id, preview] as const)
);
const ROUTING_RATIONALE_BY_ID = new Map(
  ROUTING_RATIONALES.map((rationale) => [rationale.routingPreviewId, rationale] as const)
);
const ROUTING_CHAIN_BY_ID = new Map(
  ROUTING_CHAINS.map((chain) => [chain.id, chain] as const)
);

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneCapabilityFamilies(
  families: readonly AthenaModelRoutingCapabilityFamilyRecord[]
): readonly AthenaModelRoutingCapabilityFamilyRecord[] {
  return families.map((family) => ({ ...family }));
}

function cloneApprovalPacket(
  packet: ModelProviderApprovalPacketRecord
): ModelProviderApprovalPacketRecord {
  return {
    ...packet,
    selectedCapabilityFamilies: cloneCapabilityFamilies(
      packet.selectedCapabilityFamilies
    ),
  };
}

function cloneRunIntent(
  runIntent: ModelProviderRunIntentPreviewRecord
): ModelProviderRunIntentPreviewRecord {
  return {
    ...runIntent,
    capabilityFamily: { ...runIntent.capabilityFamily },
  };
}

function cloneChecklistRecord(
  record: ModelProviderApprovalGateChecklistRecord
): ModelProviderApprovalGateChecklistRecord {
  return { ...record };
}

function cloneRunIntentBlocker(
  blocker: ModelProviderRunIntentBlockerRecord
): ModelProviderRunIntentBlockerRecord {
  return {
    ...blocker,
    affectedCapabilityFamilies: cloneCapabilityFamilies(
      blocker.affectedCapabilityFamilies
    ),
    affectedWorkspaceTargets: cloneList(blocker.affectedWorkspaceTargets),
  };
}

function cloneApprovalExpiryRevocationPreview(
  preview: ModelProviderApprovalExpiryRevocationPreviewRecord
): ModelProviderApprovalExpiryRevocationPreviewRecord {
  return {
    ...preview,
    staleApprovalReasonExamples: cloneList(preview.staleApprovalReasonExamples),
  };
}

function requireRoutingPreview(id: AthenaModelRoutingPreviewId) {
  const preview = ROUTING_PREVIEW_BY_ID.get(id);

  if (!preview) {
    throw new Error(`Missing routing preview for approval packet: ${id}`);
  }

  return preview;
}

function requireRoutingRationale(id: AthenaModelRoutingPreviewId) {
  const rationale = ROUTING_RATIONALE_BY_ID.get(id);

  if (!rationale) {
    throw new Error(`Missing routing rationale for approval packet: ${id}`);
  }

  return rationale;
}

function requireRoutingChain(id: AthenaModelRoutingChainId) {
  const chain = ROUTING_CHAIN_BY_ID.get(id);

  if (!chain) {
    throw new Error(`Missing routing chain for approval packet: ${id}`);
  }

  return chain;
}

function requireCapabilityFamily(
  families: readonly AthenaModelRoutingCapabilityFamilyRecord[],
  capabilityId: AiModelProviderCapabilityId
): AthenaModelRoutingCapabilityFamilyRecord {
  const family =
    families.find((candidate) => candidate.id === capabilityId) ?? families[0];

  if (!family) {
    throw new Error(`Missing capability family for ${capabilityId}`);
  }

  return { ...family };
}

export function buildStableModelProviderApprovalPacketKey(
  packetId: AthenaModelRoutingPreviewId
): ModelProviderApprovalPacketKey {
  return `model-provider-approval-packet:${packetId}`;
}

function buildRunIntentId(
  packetId: AthenaModelRoutingPreviewId
): `model-provider-run-intent:${AthenaModelRoutingPreviewId}` {
  return `model-provider-run-intent:${packetId}`;
}

export function buildStableModelProviderRunIntentKey(
  packetId: AthenaModelRoutingPreviewId
): ModelProviderRunIntentKey {
  return `model-provider-run-intent-preview:${packetId}`;
}

export function buildStableApprovalGateChecklistKey(
  checklistId: ModelProviderApprovalGateChecklistId
): ModelProviderApprovalGateChecklistKey {
  return `model-provider-approval-gate:${checklistId}`;
}

export function buildStableRunIntentBlockerKey(
  blockerId: ModelProviderRunIntentBlockerId
): ModelProviderRunIntentBlockerKey {
  return `model-provider-run-intent-blocker:${blockerId}`;
}

export function buildStableApprovalExpiryRevocationKey(
  packetId: AthenaModelRoutingPreviewId
): ModelProviderApprovalExpiryRevocationKey {
  return `model-provider-approval-expiry-revocation:${packetId}`;
}

const APPROVAL_PACKET_SEEDS = [
  {
    id: "conversational-planning-request",
    label: "conversational planning request",
    chainId: "audit-review-routing-chain",
    contractId: "planning-reasoning-adapter-contract",
    dryRunScenarioId: "text-planning-dry-run-scenario",
    primaryCapabilityId: "planning-reasoning",
    sourceCommandDraftReference: "athena-command-draft:provider-readiness-intent",
    sourceApprovalDraftReference:
      "athena-approval-draft:provider-readiness-intent",
    approvalScopeSummary:
      "Scope stays inside Athena planning review and only allows a preview-only planning packet with redacted prompt posture and static provider lane references.",
    approvedActionSummary:
      "Approve Athena to assemble a planning-focused approval packet preview and an inert run intent envelope for operator review only.",
    disallowedActionSummary:
      "No prompt transmission, no model calls, no provider execution, no plugin execution, and no persistence are allowed.",
    runIntentBlockedDefaultReason:
      "Conversational planning remains not admitted because manual gated model provider run admission has not been previewed yet.",
  },
  {
    id: "code-assistance-request",
    label: "code assistance request",
    chainId: "website-build-routing-chain",
    contractId: "code-assistance-adapter-contract",
    dryRunScenarioId: "code-assistance-dry-run-scenario",
    primaryCapabilityId: "code-assistance",
    sourceCommandDraftReference: "athena-command-draft:provider-readiness-intent",
    sourceApprovalDraftReference:
      "athena-approval-draft:provider-readiness-intent",
    approvalScopeSummary:
      "Scope covers preview-only code assistance review, route explanation, and server-only adapter references for a future backend-owned coding lane.",
    approvedActionSummary:
      "Approve Athena to draft a code-assistance approval packet preview and a blocked run intent envelope for operator review.",
    disallowedActionSummary:
      "No prompt sending, no code generation calls, no provider execution, no plugin execution, and no retry/fallback or persistence are allowed.",
    runIntentBlockedDefaultReason:
      "Code assistance remains not admitted until manual approval scope, confirmation, and backend-only run admission preview all exist together.",
  },
  {
    id: "website-copy-code-request",
    label: "website copy/code request",
    chainId: "website-build-routing-chain",
    contractId: "code-assistance-adapter-contract",
    dryRunScenarioId: "code-assistance-dry-run-scenario",
    primaryCapabilityId: "code-assistance",
    sourceCommandDraftReference: "athena-command-draft:website-build-intent",
    sourceApprovalDraftReference:
      "athena-approval-draft:website-build-intent",
    approvalScopeSummary:
      "Scope covers preview-only website copy and code planning for Jarvis Websites with static provider slot labels, redacted prompt posture, and backend-only adapter requirements.",
    approvedActionSummary:
      "Approve Athena to draft the website build approval packet preview and a not-admitted run intent preview for later manual gating.",
    disallowedActionSummary:
      "No prompt sending, no model calls, no provider execution, no page publish, and no persistence are allowed.",
    runIntentBlockedDefaultReason:
      "Website copy/code remains not admitted because the frontend cannot cross the server-only boundary or admit a provider run.",
  },
  {
    id: "product-video-request",
    label: "product video request",
    chainId: "product-video-routing-chain",
    contractId: "video-generation-adapter-contract",
    dryRunScenarioId: "video-prompt-planning-dry-run-scenario",
    primaryCapabilityId: "video-generation",
    sourceCommandDraftReference: "athena-command-draft:video-generation-intent",
    sourceApprovalDraftReference:
      "athena-approval-draft:video-generation-intent",
    approvalScopeSummary:
      "Scope covers preview-only product video planning with static video provider lane ranking, redacted prompt posture, and backend-only handoff requirements for Jarvis Video Studio.",
    approvedActionSummary:
      "Approve Athena to draft a video approval packet preview and inert run intent envelope without generating or rendering any video.",
    disallowedActionSummary:
      "No prompt sending, no model calls, no provider execution, no live video generation, no render/export/publish execution, and no persistence are allowed.",
    runIntentBlockedDefaultReason:
      "Product video remains not admitted because video provider execution stays blocked by default and backend-only run admission does not exist yet.",
  },
  {
    id: "storyboard-image-request",
    label: "storyboard image request",
    chainId: "product-video-routing-chain",
    contractId: "image-generation-adapter-contract",
    dryRunScenarioId: "image-storyboard-dry-run-scenario",
    primaryCapabilityId: "image-generation",
    sourceCommandDraftReference: "athena-command-draft:asset-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:asset-review-intent",
    approvalScopeSummary:
      "Scope covers preview-only storyboard image planning with static image lane selection, redacted prompt posture, and backend-only image adapter requirements.",
    approvedActionSummary:
      "Approve Athena to assemble an image-storyboard approval packet preview and a blocked run intent preview for manual review only.",
    disallowedActionSummary:
      "No prompt sending, no image generation calls, no provider execution, no asset export, and no persistence are allowed.",
    runIntentBlockedDefaultReason:
      "Storyboard image remains not admitted because the image lane only has a preview packet and not a manual gated run admission path.",
  },
  {
    id: "audio-narration-request",
    label: "audio narration request",
    chainId: "product-video-routing-chain",
    contractId: "audio-voice-adapter-contract",
    dryRunScenarioId: "audio-narration-dry-run-scenario",
    primaryCapabilityId: "voice-narration",
    sourceCommandDraftReference: "athena-command-draft:video-generation-intent",
    sourceApprovalDraftReference:
      "athena-approval-draft:video-generation-intent",
    approvalScopeSummary:
      "Scope covers preview-only narration planning with a static audio lane, redacted prompt posture, and server-only adapter references for later backend use.",
    approvedActionSummary:
      "Approve Athena to draft an audio narration approval packet preview and a run intent envelope that stays not admitted.",
    disallowedActionSummary:
      "No prompt sending, no audio generation, no provider execution, no recording/playback execution, and no persistence are allowed.",
    runIntentBlockedDefaultReason:
      "Audio narration remains not admitted because the narration lane still requires manual gated provider run admission preview and backend-only enforcement.",
  },
  {
    id: "transcription-caption-request",
    label: "transcription/caption request",
    chainId: "product-video-routing-chain",
    contractId: "transcription-adapter-contract",
    dryRunScenarioId: "transcription-caption-dry-run-scenario",
    primaryCapabilityId: "transcription",
    sourceCommandDraftReference: "athena-command-draft:audit-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:audit-review-intent",
    approvalScopeSummary:
      "Scope covers preview-only transcription and caption review with redacted prompt posture, static transcription lane references, and server-only adapter requirements.",
    approvedActionSummary:
      "Approve Athena to prepare the transcription approval packet preview and a deterministic run intent preview for later manual admission review.",
    disallowedActionSummary:
      "No prompt sending, no transcription execution, no provider execution, no upload/download execution, and no persistence are allowed.",
    runIntentBlockedDefaultReason:
      "Transcription/caption remains not admitted because prompt review, timeout posture, and manual confirmation are still preview-only requirements.",
  },
  {
    id: "embeddings-search-request",
    label: "embeddings/search request",
    chainId: "audit-review-routing-chain",
    contractId: "embeddings-search-adapter-contract",
    dryRunScenarioId: "embeddings-search-dry-run-scenario",
    primaryCapabilityId: "embeddings-search",
    sourceCommandDraftReference: "athena-command-draft:provider-readiness-intent",
    sourceApprovalDraftReference:
      "athena-approval-draft:provider-readiness-intent",
    approvalScopeSummary:
      "Scope covers preview-only embeddings/search posture review with static provider slot labels, redacted prompt posture, and backend-only retrieval adapter references.",
    approvedActionSummary:
      "Approve Athena to assemble an embeddings/search approval packet preview and an inert run intent envelope for operator review.",
    disallowedActionSummary:
      "No prompt sending, no embeddings calls, no retrieval execution, no provider execution, and no persistence are allowed.",
    runIntentBlockedDefaultReason:
      "Embeddings/search remains not admitted because audit persistence, result persistence, and manual run admission preview are all still blocked.",
  },
  {
    id: "safety-moderation-review-request",
    label: "safety/moderation review request",
    chainId: "audit-review-routing-chain",
    contractId: "safety-moderation-adapter-contract",
    dryRunScenarioId: "safety-moderation-dry-run-scenario",
    primaryCapabilityId: "safety-moderation",
    sourceCommandDraftReference: "athena-command-draft:safety-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:safety-review-intent",
    approvalScopeSummary:
      "Scope covers preview-only safety and moderation review with redacted prompt posture, static moderation lane selection, and server-only safety adapter references.",
    approvedActionSummary:
      "Approve Athena to draft a safety/moderation approval packet preview and a blocked run intent preview for review only.",
    disallowedActionSummary:
      "No prompt sending, no moderation API calls, no provider execution, no plugin execution, and no persistence are allowed.",
    runIntentBlockedDefaultReason:
      "Safety/moderation remains not admitted because moderation posture is preview-only and still blocked by manual confirmation and audit requirements.",
  },
  {
    id: "local-private-inference-request",
    label: "local/private inference request",
    chainId: "local-private-routing-chain",
    contractId: "local-inference-adapter-contract",
    dryRunScenarioId: "local-private-inference-dry-run-scenario",
    primaryCapabilityId: "local-inference",
    sourceCommandDraftReference: "athena-command-draft:provider-readiness-intent",
    sourceApprovalDraftReference:
      "athena-approval-draft:provider-readiness-intent",
    approvalScopeSummary:
      "Scope covers preview-only local/private inference planning with a local lane alternative, redacted prompt posture, and backend-only local adapter references.",
    approvedActionSummary:
      "Approve Athena to assemble a local/private approval packet preview and a not-admitted local lane run intent preview.",
    disallowedActionSummary:
      "No prompt sending, no local runtime execution, no provider execution, no file writes, and no persistence are allowed.",
    runIntentBlockedDefaultReason:
      "Local/private inference remains not admitted because local runtime execution is still blocked by server-only and manual admission requirements.",
  },
  {
    id: "audit-recovery-explanation-request",
    label: "audit/recovery explanation request",
    chainId: "audit-review-routing-chain",
    contractId: "planning-reasoning-adapter-contract",
    dryRunScenarioId: "text-planning-dry-run-scenario",
    primaryCapabilityId: "metadata-summarization",
    sourceCommandDraftReference: "athena-command-draft:audit-review-intent",
    sourceApprovalDraftReference: "athena-approval-draft:audit-review-intent",
    approvalScopeSummary:
      "Scope covers preview-only audit and recovery explanation review with static reasoning/summarization lane references, redacted prompt posture, and backend-only adapter requirements.",
    approvedActionSummary:
      "Approve Athena to draft the audit/recovery approval packet preview and a blocked explanatory run intent preview for review only.",
    disallowedActionSummary:
      "No prompt sending, no model calls, no provider execution, no audit persistence, and no recovery automation are allowed.",
    runIntentBlockedDefaultReason:
      "Audit/recovery explanation remains not admitted because audit joins, result persistence, and manual run admission preview are all future backend work.",
  },
] as const satisfies readonly ApprovalPacketSeed[];

function buildApprovalPacket(
  seed: ApprovalPacketSeed
): ModelProviderApprovalPacketRecord {
  const routingPreview = requireRoutingPreview(seed.id);
  const rationale = requireRoutingRationale(seed.id);
  const routingChain = requireRoutingChain(seed.chainId);

  return {
    id: seed.id,
    key: buildStableModelProviderApprovalPacketKey(seed.id),
    approvalPacketVersion: "model-provider-approval-packet-preview-v1",
    previewOnlyStatement: "approval packet is preview-only",
    source: "Athena / Jarvis Model Gateway",
    packetMode: "preview-only",
    approvalPosture: "operator review only",
    runPosture: "intent preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    label: seed.label,
    operatorRequestPhrase: routingPreview.operatorRequestPhrase,
    workspaceTarget: routingPreview.workspaceTarget,
    sourceCommandDraftReference: seed.sourceCommandDraftReference,
    sourceApprovalDraftReference: seed.sourceApprovalDraftReference,
    sourceRoutingPreviewReference: buildStableAthenaModelRoutingKey(seed.id),
    sourceProviderSelectionRationaleReference:
      buildStableProviderSelectionRationaleKey(seed.id),
    sourceRoutingChainReference: buildStableModelRoutingChainKey(seed.chainId),
    selectedCapabilityFamilies: cloneCapabilityFamilies(
      routingPreview.selectedCapabilityFamilies
    ),
    selectedProviderSlotLabel: rationale.preferredProviderSlotLabel,
    backupProviderSlotLabel: rationale.backupProviderSlotLabel,
    localPrivateAlternativeLabel: rationale.localPrivateAlternativeLabel,
    approvalScopeSummary: seed.approvalScopeSummary,
    approvedActionSummary: seed.approvedActionSummary,
    disallowedActionSummary: seed.disallowedActionSummary,
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    credentialReferencePosture: "opaque label only",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix review required",
    approvalExpiryPosture: "preview-only",
    approvalRevocationPosture: "preview-only",
    resultCaptureRequiredInFuture: "result capture required in future",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    nextManualGatedRunAdmissionRequirement:
      "manual gated model provider run admission preview next",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  };
}

function buildRunIntent(
  packet: ModelProviderApprovalPacketRecord,
  seed: ApprovalPacketSeed
): ModelProviderRunIntentPreviewRecord {
  return {
    id: seed.id,
    key: buildStableModelProviderRunIntentKey(seed.id),
    runIntentVersion: "model-provider-run-intent-preview-v1",
    runIntentId: buildRunIntentId(seed.id),
    previewOnlyStatement: "run intent is preview-only",
    label: packet.label,
    operatorRequestPhrase: packet.operatorRequestPhrase,
    sourceApprovalPacketReference: packet.key,
    sourceRoutingPreviewReference: packet.sourceRoutingPreviewReference,
    sourceProviderSelectionRationaleReference:
      packet.sourceProviderSelectionRationaleReference,
    sourceModelRoutingChainReference: packet.sourceRoutingChainReference,
    adapterContractReference: buildStableModelAdapterContractKey(seed.contractId),
    dryRunReviewReference: buildStableModelAdapterDryRunReviewKey(
      seed.dryRunScenarioId
    ),
    acceptanceMatrixReference: buildStableDryRunAcceptanceMatrixKey(
      seed.dryRunScenarioId
    ),
    workspaceTarget: packet.workspaceTarget,
    capabilityFamily: requireCapabilityFamily(
      packet.selectedCapabilityFamilies,
      seed.primaryCapabilityId
    ),
    providerSlotLabel: packet.selectedProviderSlotLabel,
    backupProviderSlotLabel: packet.backupProviderSlotLabel,
    localPrivateAlternativeLabel: packet.localPrivateAlternativeLabel,
    runMode: "preview-only",
    runAdmissionState: "not admitted",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    credentialReferencePosture: "opaque label only",
    approvalReferencePosture: "preview-only",
    auditReferencePosture: "preview-only",
    idempotencyKeyPosture: "deterministic preview key only",
    replayBlockPosture: "replay block required",
    singleRunLockPosture: "single-run lock required",
    manualConfirmationState: "not confirmed",
    killSwitchState: "engaged / review-only",
    timeoutCancelPosture: "timeout/cancel guard required",
    costRatePosture: "cost acknowledgement and rate limit guard required",
    privacyRedactionPosture: "privacy/redaction required",
    blockedDefaultReason: seed.runIntentBlockedDefaultReason,
    explicitNoExecutionStatement: NO_EXECUTION_STATEMENT,
  };
}

const APPROVAL_PACKETS = APPROVAL_PACKET_SEEDS.map((seed) =>
  buildApprovalPacket(seed)
);

const APPROVAL_PACKETS_BY_ID = new Map(
  APPROVAL_PACKETS.map((packet) => [packet.id, packet] as const)
);

const RUN_INTENT_PREVIEWS = APPROVAL_PACKET_SEEDS.map((seed) =>
  buildRunIntent(
    APPROVAL_PACKETS_BY_ID.get(seed.id) ?? buildApprovalPacket(seed),
    seed
  )
);

const APPROVAL_GATE_CHECKLIST = [
  {
    id: "operator-approval",
    label: "operator approval",
    summary:
      "Operator approval remains explicit and manual. The approval packet only previews that scope and does not approve a run.",
    nextOperatorAction:
      "Review the packet scope and keep the packet preview-only until a manual gated admission layer exists.",
  },
  {
    id: "manual-confirmation",
    label: "manual confirmation",
    summary:
      "Manual confirmation is still required before any future backend-owned provider run could be admitted.",
    nextOperatorAction:
      "Keep manual confirmation visible and do not mark a run admitted.",
  },
  {
    id: "approval-scope",
    label: "approval scope",
    summary:
      "Approval scope stays explicit, typed, and review-only so the operator can see what Athena may describe versus what remains disallowed.",
    nextOperatorAction:
      "Confirm scope wording and preserve disallowed actions in the packet preview.",
  },
  {
    id: "approval-expiry",
    label: "approval expiry",
    summary:
      "Approval expiry is a preview-only posture with no persisted timer, no admission state, and no approved run claim.",
    nextOperatorAction:
      "Treat expiry as a preview-only review field and require re-approval later.",
  },
  {
    id: "approval-revocation",
    label: "approval revocation",
    summary:
      "Approval revocation is preview-only and keeps revocation logic visible without implementing persistence or execution side effects.",
    nextOperatorAction:
      "Keep revocation review-only and do not claim revocation automation exists.",
  },
  {
    id: "kill-switch",
    label: "kill switch",
    summary:
      "A kill switch remains required and the run intent keeps the switch in an engaged review-only state.",
    nextOperatorAction:
      "Keep the kill switch engaged and visible in the preview records.",
  },
  {
    id: "audit",
    label: "audit",
    summary:
      "Audit remains required even though audit references are preview-only and audit persistence is not implemented.",
    nextOperatorAction:
      "Keep audit references visible and do not claim persistent audit storage exists.",
  },
  {
    id: "server-only-boundary",
    label: "server-only boundary",
    summary:
      "Every selected lane still requires a server-only adapter contract and a backend-only execution path.",
    nextOperatorAction:
      "Review the linked adapter contract reference and keep the frontend boundary blocked.",
  },
  {
    id: "no-frontend-provider-call",
    label: "no frontend provider call",
    summary:
      "The frontend cannot call providers. Approval and run intent previews keep provider execution blocked by default.",
    nextOperatorAction:
      "Do not add provider calls or bridge logic to the frontend.",
  },
  {
    id: "no-provider-sdk-import-in-frontend",
    label: "no provider SDK import in frontend",
    summary:
      "Provider SDK imports remain disallowed in Athena/Jarvis frontend code and the packet preview reflects that boundary.",
    nextOperatorAction:
      "Keep provider SDK imports out of the frontend and review server-only runtime requirements only.",
  },
  {
    id: "no-prompt-sending",
    label: "no prompt sending",
    summary:
      "Prompt payload posture stays redacted placeholder only and prompt transmission state stays not sent.",
    nextOperatorAction:
      "Keep prompts redacted and unsent in the preview records.",
  },
  {
    id: "opaque-credential-reference",
    label: "opaque credential reference",
    summary:
      "Credential references stay opaque labels only. No key material, secret value, or environment variable name appears in the frontend.",
    nextOperatorAction:
      "Preserve opaque references only and keep secret handling out of the frontend.",
  },
  {
    id: "no-plaintext-secrets",
    label: "no plaintext secrets",
    summary:
      "No plaintext secrets are shown anywhere in the approval packet or run intent preview layer.",
    nextOperatorAction:
      "Review every field as a label-only preview with no exposed secret data.",
  },
  {
    id: "privacy-redaction",
    label: "privacy/redaction",
    summary:
      "Privacy and redaction remain required. Prompt payloads stay redacted placeholder only and not sent.",
    nextOperatorAction:
      "Complete privacy review and keep redaction posture visible before any future admission step.",
  },
  {
    id: "cost-rate-timeout",
    label: "cost/rate/timeout",
    summary:
      "Cost acknowledgement, rate limit guard, and timeout/cancel guard all stay required and preview-only.",
    nextOperatorAction:
      "Review cost, rate, and timeout posture together and keep the lane not admitted.",
  },
  {
    id: "idempotency-replay-block",
    label: "idempotency/replay block",
    summary:
      "Idempotency and replay prevention remain required. Keys stay deterministic preview keys only.",
    nextOperatorAction:
      "Keep replay prevention explicit and avoid claiming a live idempotency store exists.",
  },
  {
    id: "single-run-lock",
    label: "single-run lock",
    summary:
      "A single-run lock remains required and the run intent preview keeps that lock as a review-only posture.",
    nextOperatorAction:
      "Preserve the single-run lock requirement and leave run admission as not admitted.",
  },
  {
    id: "dry-run-result-review",
    label: "dry-run result review",
    summary:
      "Dry-run result review remains a required dependency before any future backend-owned admission could be considered.",
    nextOperatorAction:
      "Review the linked dry-run result record before discussing run admission.",
  },
  {
    id: "acceptance-matrix-review",
    label: "acceptance matrix review",
    summary:
      "The dry-run acceptance matrix remains required and unresolved blockers must stay visible before admission work begins.",
    nextOperatorAction:
      "Review the acceptance matrix reference and keep unresolved blockers explicit.",
  },
  {
    id: "manual-recovery-state",
    label: "manual recovery state",
    summary:
      "Recovery posture stays manual review only. No retry execution, no fallback execution, and no automated recovery path exist.",
    nextOperatorAction:
      "Keep recovery manual-only and do not imply automated retry or fallback exists.",
  },
  {
    id: "no-persistence-until-future-backend-batch",
    label: "no persistence until future backend batch",
    summary:
      "Result persistence, audit persistence, and approval persistence all remain unimplemented until a future backend-owned batch exists.",
    nextOperatorAction:
      "Keep persistence blocked and treat every record as an in-memory preview only.",
  },
] as const satisfies readonly Readonly<{
  id: ModelProviderApprovalGateChecklistId;
  label: string;
  summary: string;
  nextOperatorAction: string;
}>[];

function buildApprovalGateChecklistRecord(
  item: (typeof APPROVAL_GATE_CHECKLIST)[number]
): ModelProviderApprovalGateChecklistRecord {
  return {
    id: item.id,
    key: buildStableApprovalGateChecklistKey(item.id),
    checklistVersion: "model-provider-approval-gate-checklist-preview-v1",
    previewOnlyStatement: "approval gates are preview-only",
    label: item.label,
    requirementState: "required",
    summary: item.summary,
    nextOperatorAction: item.nextOperatorAction,
  };
}

const APPROVAL_GATE_CHECKLIST_RECORDS = APPROVAL_GATE_CHECKLIST.map((item) =>
  buildApprovalGateChecklistRecord(item)
);

function collectCapabilityFamilies(
  packetIds: readonly AthenaModelRoutingPreviewId[]
): readonly AthenaModelRoutingCapabilityFamilyRecord[] {
  const families = new Map<
    AiModelProviderCapabilityId,
    AthenaModelRoutingCapabilityFamilyRecord
  >();

  for (const packetId of packetIds) {
    const packet = APPROVAL_PACKETS_BY_ID.get(packetId);

    if (!packet) {
      continue;
    }

    for (const family of packet.selectedCapabilityFamilies) {
      families.set(family.id, { ...family });
    }
  }

  return Array.from(families.values());
}

function collectWorkspaceTargets(
  packetIds: readonly AthenaModelRoutingPreviewId[]
): readonly AiModelProviderWorkspaceTarget[] {
  const targets = new Set<AiModelProviderWorkspaceTarget>();

  for (const packetId of packetIds) {
    const packet = APPROVAL_PACKETS_BY_ID.get(packetId);

    if (packet) {
      targets.add(packet.workspaceTarget);
    }
  }

  return Array.from(targets.values());
}

function buildRunIntentBlockerRecord(input: Readonly<{
  blockerId: ModelProviderRunIntentBlockerId;
  severity: "critical" | "high" | "medium";
  packetIds: readonly AthenaModelRoutingPreviewId[];
  operatorFacingExplanation: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>): ModelProviderRunIntentBlockerRecord {
  return {
    blockerId: input.blockerId,
    key: buildStableRunIntentBlockerKey(input.blockerId),
    blockerMatrixVersion: "model-provider-run-intent-blocker-matrix-preview-v1",
    previewOnlyStatement: "run intent blockers are preview-only",
    severity: input.severity,
    affectedCapabilityFamilies: collectCapabilityFamilies(input.packetIds),
    affectedWorkspaceTargets: collectWorkspaceTargets(input.packetIds),
    operatorFacingExplanation: input.operatorFacingExplanation,
    requiredRecoveryAction: input.requiredRecoveryAction,
    nextSafeAction: input.nextSafeAction,
  };
}

const ALL_PACKET_IDS = APPROVAL_PACKET_SEEDS.map((seed) => seed.id);
const VIDEO_LANE_PACKET_IDS = [
  "product-video-request",
  "storyboard-image-request",
  "audio-narration-request",
  "transcription-caption-request",
] as const satisfies readonly AthenaModelRoutingPreviewId[];
const SEARCH_AND_SAFETY_PACKET_IDS = [
  "embeddings-search-request",
  "safety-moderation-review-request",
  "audit-recovery-explanation-request",
] as const satisfies readonly AthenaModelRoutingPreviewId[];
const LOCAL_PACKET_IDS = [
  "local-private-inference-request",
] as const satisfies readonly AthenaModelRoutingPreviewId[];
const WEBSITE_PACKET_IDS = [
  "website-copy-code-request",
  "code-assistance-request",
] as const satisfies readonly AthenaModelRoutingPreviewId[];

const RUN_INTENT_BLOCKERS = [
  buildRunIntentBlockerRecord({
    blockerId: "approval-packet-preview-only",
    severity: "high",
    packetIds: ALL_PACKET_IDS,
    operatorFacingExplanation:
      "The approval packet is preview-only, so it may scope a future run but it cannot approve or admit one.",
    requiredRecoveryAction:
      "Keep the packet review-only and wait for the manual gated model provider run admission preview layer.",
    nextSafeAction:
      "Review the packet summary and preserve the not-admitted state.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "no-manual-approval",
    severity: "critical",
    packetIds: ALL_PACKET_IDS,
    operatorFacingExplanation:
      "No provider lane may move beyond preview without explicit manual approval recorded by an operator.",
    requiredRecoveryAction:
      "Keep manual approval required in the packet preview and do not admit a run intent.",
    nextSafeAction:
      "Stay in preview-only review mode and keep execution blocked.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "no-manual-confirmation",
    severity: "critical",
    packetIds: ALL_PACKET_IDS,
    operatorFacingExplanation:
      "Manual confirmation remains outstanding, so every run intent stays not admitted.",
    requiredRecoveryAction:
      "Keep manual confirmation visible and preserve the review-only run posture.",
    nextSafeAction:
      "Do not convert the run intent into an executable request.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "approval-scope-unresolved",
    severity: "high",
    packetIds: WEBSITE_PACKET_IDS,
    operatorFacingExplanation:
      "Approval scope is unresolved for the selected lane, so the run intent cannot claim even a manual admission preview outcome.",
    requiredRecoveryAction:
      "Tighten the approval scope summary and keep disallowed actions explicit.",
    nextSafeAction:
      "Review scope and preserve the preview-only packet.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "approval-expired",
    severity: "medium",
    packetIds: ALL_PACKET_IDS,
    operatorFacingExplanation:
      "Approval expiry is preview-only, and any stale approval example means the run intent must remain blocked/default.",
    requiredRecoveryAction:
      "Treat the packet as stale and require operator re-approval in the next manual gated batch.",
    nextSafeAction:
      "Keep the run not admitted and re-review the packet.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "approval-revoked",
    severity: "medium",
    packetIds: ALL_PACKET_IDS,
    operatorFacingExplanation:
      "A revoked approval posture keeps the run intent blocked/default and prevents any admission claim.",
    requiredRecoveryAction:
      "Keep revocation preview-only, require manual re-approval, and preserve audit posture.",
    nextSafeAction:
      "Leave the run not admitted and keep execution blocked.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "kill-switch-active",
    severity: "critical",
    packetIds: [...VIDEO_LANE_PACKET_IDS, ...LOCAL_PACKET_IDS],
    operatorFacingExplanation:
      "The kill switch remains engaged, so Athena may only show the inert run intent envelope and cannot admit any provider lane.",
    requiredRecoveryAction:
      "Keep the kill switch state visible and preserve review-only posture until a later backend-owned admission layer exists.",
    nextSafeAction:
      "Continue with preview-only review and do not advance the run.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "no-server-only-adapter",
    severity: "critical",
    packetIds: ALL_PACKET_IDS,
    operatorFacingExplanation:
      "There is no frontend execution path and every future provider run requires a server-only adapter boundary.",
    requiredRecoveryAction:
      "Review the linked server-only adapter contract and keep the run intent blocked/default.",
    nextSafeAction:
      "Preserve the server-only boundary and do not admit the run.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "missing-opaque-credential-reference",
    severity: "high",
    packetIds: [...VIDEO_LANE_PACKET_IDS, ...WEBSITE_PACKET_IDS],
    operatorFacingExplanation:
      "The selected provider lane cannot move beyond preview until an opaque credential reference posture is present.",
    requiredRecoveryAction:
      "Keep credential references opaque-only and never expose plaintext or environment names in the frontend.",
    nextSafeAction:
      "Review credential posture only and keep the run not admitted.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "prompt-payload-not-reviewed",
    severity: "high",
    packetIds: [
      "conversational-planning-request",
      "code-assistance-request",
      "website-copy-code-request",
      "product-video-request",
      "storyboard-image-request",
      "audio-narration-request",
    ],
    operatorFacingExplanation:
      "Prompt payload review is incomplete, so the run intent must remain a redacted placeholder and not admitted.",
    requiredRecoveryAction:
      "Keep prompt payload posture redacted placeholder only and do not send it anywhere.",
    nextSafeAction:
      "Continue with preview-only review and preserve prompt transmission state as not sent.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "privacy-redaction-incomplete",
    severity: "critical",
    packetIds: [...VIDEO_LANE_PACKET_IDS, ...SEARCH_AND_SAFETY_PACKET_IDS, ...LOCAL_PACKET_IDS],
    operatorFacingExplanation:
      "Privacy/redaction posture is incomplete, so the run intent cannot progress beyond a blocked preview envelope.",
    requiredRecoveryAction:
      "Complete privacy review and keep redaction posture explicit before manual admission work begins.",
    nextSafeAction:
      "Do not admit the run and keep the packet review-only.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "cost-acknowledgement-missing",
    severity: "medium",
    packetIds: [...VIDEO_LANE_PACKET_IDS, "embeddings-search-request"],
    operatorFacingExplanation:
      "Cost acknowledgement is missing, so Athena may only present a blocked preview envelope and not an admitted run.",
    requiredRecoveryAction:
      "Keep cost acknowledgement required and preserve the review-only cost posture.",
    nextSafeAction:
      "Review costs and keep the run not admitted.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "rate-limit-posture-unknown",
    severity: "medium",
    packetIds: [...VIDEO_LANE_PACKET_IDS, "embeddings-search-request"],
    operatorFacingExplanation:
      "Rate limit posture is still unknown, so the run intent cannot be admitted and remains a static preview only.",
    requiredRecoveryAction:
      "Keep rate limit guard visible and preserve a deterministic preview key only.",
    nextSafeAction:
      "Do not admit the run and keep execution blocked by default.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "timeout-cancel-posture-missing",
    severity: "medium",
    packetIds: [...VIDEO_LANE_PACKET_IDS, ...LOCAL_PACKET_IDS],
    operatorFacingExplanation:
      "Timeout/cancel posture is missing, so the inert run envelope cannot progress toward manual admission.",
    requiredRecoveryAction:
      "Add timeout/cancel posture to the review packet and keep the run not admitted.",
    nextSafeAction:
      "Stay preview-only and preserve the blocked/default reason.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "dry-run-result-not-reviewed",
    severity: "critical",
    packetIds: ALL_PACKET_IDS,
    operatorFacingExplanation:
      "Dry-run result review is a required dependency, so no run intent may be admitted while review remains incomplete.",
    requiredRecoveryAction:
      "Review the linked dry-run result record and keep the run preview-only until that dependency is satisfied.",
    nextSafeAction:
      "Remain in preview-only review mode and do not admit the run.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "acceptance-matrix-unresolved",
    severity: "critical",
    packetIds: ALL_PACKET_IDS,
    operatorFacingExplanation:
      "Acceptance matrix blockers are unresolved, so the run intent must remain not admitted and blocked/default.",
    requiredRecoveryAction:
      "Review the linked acceptance matrix and keep unresolved blockers visible to the operator.",
    nextSafeAction:
      "Keep the run blocked/default and continue with review-only gating.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "audit-persistence-not-implemented",
    severity: "medium",
    packetIds: ALL_PACKET_IDS,
    operatorFacingExplanation:
      "Audit persistence is not implemented, so the run intent is only an inert review envelope and not an auditable admitted run.",
    requiredRecoveryAction:
      "Keep audit references preview-only and do not claim persistent audit storage exists.",
    nextSafeAction:
      "Stay in preview-only review mode with no admission state change.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "result-persistence-not-implemented",
    severity: "medium",
    packetIds: [...VIDEO_LANE_PACKET_IDS, ...SEARCH_AND_SAFETY_PACKET_IDS, ...LOCAL_PACKET_IDS],
    operatorFacingExplanation:
      "Result persistence is not implemented, so the run intent cannot claim a future capture path from the frontend.",
    requiredRecoveryAction:
      "Keep result capture marked as a future backend requirement and preserve the blocked/default posture.",
    nextSafeAction:
      "Do not admit the run and keep persistence out of scope.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "provider-sdk-unavailable-blocked-in-frontend",
    severity: "high",
    packetIds: ALL_PACKET_IDS,
    operatorFacingExplanation:
      "Provider SDKs are intentionally unavailable and blocked in the frontend, so no run intent can move beyond an inert preview layer here.",
    requiredRecoveryAction:
      "Keep provider SDK imports out of the frontend and route all future execution through server-only adapters only.",
    nextSafeAction:
      "Preserve the run as a preview-only envelope with no admission.",
  }),
  buildRunIntentBlockerRecord({
    blockerId: "provider-execution-blocked-by-default",
    severity: "critical",
    packetIds: ALL_PACKET_IDS,
    operatorFacingExplanation:
      "Provider execution is blocked by default. The preview layer drafts approval scope and run intent envelopes only.",
    requiredRecoveryAction:
      "Keep execution blocked and move next into the manual gated model provider run admission preview layer.",
    nextSafeAction:
      "Stay preview-only and do not admit or execute anything.",
  }),
] as const satisfies readonly ModelProviderRunIntentBlockerRecord[];

function buildApprovalExpiryRevocationPreview(
  packet: ModelProviderApprovalPacketRecord
): ModelProviderApprovalExpiryRevocationPreviewRecord {
  return {
    id: packet.id,
    key: buildStableApprovalExpiryRevocationKey(packet.id),
    previewVersion: "model-provider-approval-expiry-revocation-preview-v1",
    previewOnlyStatement: "approval expiry and revocation are preview-only",
    approvalPacketReference: packet.key,
    expiryPosture: "preview-only",
    revocationPosture: "preview-only",
    replayPreventionPosture: "replay block required",
    staleApprovalReasonExamples: [
      `Selected lane changed after ${packet.selectedProviderSlotLabel} review.`,
      "Approval scope changed after operator review.",
      "Privacy/redaction posture changed before any manual run admission exists.",
    ],
    operatorReApprovalRequirement: "operator re-approval required",
    auditPosture: "not persisted",
    approvalPosture: "not persisted",
    recoveryPosture: "manual review only",
    explicitNoApprovedRunStatement:
      "No approved run. Approval expiry and revocation remain preview-only.",
  };
}

const APPROVAL_EXPIRY_REVOCATION_PREVIEWS = APPROVAL_PACKETS.map((packet) =>
  buildApprovalExpiryRevocationPreview(packet)
);

export function listModelProviderApprovalPackets():
  readonly ModelProviderApprovalPacketRecord[] {
  return APPROVAL_PACKETS.map((packet) => cloneApprovalPacket(packet));
}

export function listModelProviderRunIntentPreviews():
  readonly ModelProviderRunIntentPreviewRecord[] {
  return RUN_INTENT_PREVIEWS.map((runIntent) => cloneRunIntent(runIntent));
}

export function listApprovalGateChecklistRecords():
  readonly ModelProviderApprovalGateChecklistRecord[] {
  return APPROVAL_GATE_CHECKLIST_RECORDS.map((record) =>
    cloneChecklistRecord(record)
  );
}

export function listRunIntentBlockerMatrix():
  readonly ModelProviderRunIntentBlockerRecord[] {
  return RUN_INTENT_BLOCKERS.map((blocker) => cloneRunIntentBlocker(blocker));
}

export function listApprovalExpiryRevocationPreviews():
  readonly ModelProviderApprovalExpiryRevocationPreviewRecord[] {
  return APPROVAL_EXPIRY_REVOCATION_PREVIEWS.map((preview) =>
    cloneApprovalExpiryRevocationPreview(preview)
  );
}

export function groupApprovalPacketsByCapabilityFamily():
  readonly ModelProviderApprovalPacketCapabilityFamilyGroup[] {
  const groups = new Map<
    AiModelProviderCapabilityId,
    ModelProviderApprovalPacketCapabilityFamilyGroup
  >();

  for (const packet of APPROVAL_PACKETS) {
    for (const family of packet.selectedCapabilityFamilies) {
      const existing = groups.get(family.id);
      if (!existing) {
        groups.set(family.id, {
          capabilityFamilyId: family.id,
          capabilityFamilyLabel: family.label,
          approvalPacketCount: 1,
          approvalPackets: [cloneApprovalPacket(packet)],
        });
        continue;
      }

      groups.set(family.id, {
        ...existing,
        approvalPacketCount: existing.approvalPacketCount + 1,
        approvalPackets: [...existing.approvalPackets, cloneApprovalPacket(packet)],
      });
    }
  }

  return Array.from(groups.values());
}

export function groupApprovalPacketsByWorkspaceTarget():
  readonly ModelProviderApprovalPacketWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    ModelProviderApprovalPacketWorkspaceGroup
  >();

  for (const packet of APPROVAL_PACKETS) {
    const existing = groups.get(packet.workspaceTarget);
    if (!existing) {
      groups.set(packet.workspaceTarget, {
        workspaceTarget: packet.workspaceTarget,
        approvalPacketCount: 1,
        approvalPackets: [cloneApprovalPacket(packet)],
      });
      continue;
    }

    groups.set(packet.workspaceTarget, {
      ...existing,
      approvalPacketCount: existing.approvalPacketCount + 1,
      approvalPackets: [...existing.approvalPackets, cloneApprovalPacket(packet)],
    });
  }

  return Array.from(groups.values());
}

export function buildApprovalPacketSummary():
  ModelProviderApprovalPacketSummary {
  return {
    currentBatch: MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH,
    highestDetectedPhase: MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_PHASE,
    latestCompletedBatch: MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH,
    previousCompletedBatch: ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
    nextLikelyBatch: NEXT_MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
    approvalPacketCount: APPROVAL_PACKETS.length,
    runIntentCount: RUN_INTENT_PREVIEWS.length,
    gateChecklistCount: APPROVAL_GATE_CHECKLIST_RECORDS.length,
    blockerCount: RUN_INTENT_BLOCKERS.length,
    capabilityFamilyGroupCount: groupApprovalPacketsByCapabilityFamily().length,
    workspaceTargetGroupCount: groupApprovalPacketsByWorkspaceTarget().length,
    summaryLines: cloneList(SUMMARY_LINES),
  };
}

export function buildRunIntentSummary(): ModelProviderRunIntentSummary {
  return {
    currentBatch: MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH,
    nextLikelyBatch: NEXT_MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
    runIntentCount: RUN_INTENT_PREVIEWS.length,
    uniqueWorkspaceTargetCount: groupApprovalPacketsByWorkspaceTarget().length,
    uniqueCapabilityFamilyCount: groupApprovalPacketsByCapabilityFamily().length,
    summaryLines: [
      "run intent is preview-only",
      "run admission state: not admitted",
      "prompt payload is redacted placeholder only",
      "prompt transmission state: not sent",
      "idempotency key posture is deterministic preview key only",
      "provider execution is blocked by default",
      "manual gated run admission preview next",
    ],
  };
}

export function buildRunIntentBlockerSummary():
  ModelProviderRunIntentBlockerSummary {
  return {
    currentBatch: MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH,
    nextLikelyBatch: NEXT_MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
    blockerCount: RUN_INTENT_BLOCKERS.length,
    criticalBlockerCount: RUN_INTENT_BLOCKERS.filter(
      (blocker) => blocker.severity === "critical"
    ).length,
    highBlockerCount: RUN_INTENT_BLOCKERS.filter(
      (blocker) => blocker.severity === "high"
    ).length,
    mediumBlockerCount: RUN_INTENT_BLOCKERS.filter(
      (blocker) => blocker.severity === "medium"
    ).length,
    summaryLines: [
      "run intent blockers are preview-only",
      "provider execution is blocked by default",
      "audit persistence not implemented",
      "result persistence not implemented",
      "no retry execution",
      "no fallback execution",
      "manual gated run admission preview next",
    ],
  };
}

export function buildNextManualGatedRunAdmissionChecklist():
  readonly string[] {
  return [
    NEXT_MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
    "manual gated run admission preview comes next",
    "approval packet is preview-only",
    "run intent is preview-only",
    "approval gates are preview-only",
    "run intent blockers are preview-only",
    "approval expiry and revocation are preview-only",
    "no prompt sending",
    "no LLM/model calls",
    "no provider SDK imports",
    "no provider execution",
    "server-only adapters required",
    "manual approval required",
    "manual confirmation required",
    "kill switch required",
    "audit required",
    "opaque credential references only",
    "no plaintext secrets",
  ] as const;
}
