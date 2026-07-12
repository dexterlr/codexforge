import type {
  AiModelProviderCapabilityId,
  AiModelProviderSlotId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
  ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_PHASE,
  NEXT_MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH,
  type AthenaBlockedProviderSelectionSummary,
  type AthenaModelRoutingCapabilityFamilyLabel,
  type AthenaModelRoutingCapabilityFamilyRecord,
  type AthenaModelRoutingChainId,
  type AthenaModelRoutingChainPreviewRecord,
  type AthenaModelRoutingChainSummary,
  type AthenaModelRoutingChainStepRecord,
  type AthenaModelRoutingNoExecutionStatement,
  type AthenaModelRoutingPreviewCapabilityFamilyGroup,
  type AthenaModelRoutingPreviewId,
  type AthenaModelRoutingPreviewKey,
  type AthenaModelRoutingPreviewRecord,
  type AthenaModelRoutingPreviewWorkspaceTargetGroup,
  type AthenaModelRoutingProviderSlotLabel,
  type AthenaModelRoutingProviderSlotRecord,
  type AthenaProviderSelectionBlockerId,
  type AthenaProviderSelectionBlockerKey,
  type AthenaProviderSelectionBlockerRecord,
  type AthenaProviderSelectionRationaleKey,
  type AthenaProviderSelectionRationaleRecord,
  type AthenaProviderSelectionSummary,
} from "./athena-model-routing-provider-selection-preview-types";

const NO_EXECUTION_STATEMENT =
  "No execution. No model calls. No prompt sending. No provider execution." as const satisfies AthenaModelRoutingNoExecutionStatement;

const SUMMARY_LINES = [
  "Athena model routing and provider selection preview only",
  "routing is preview-only",
  "provider selection is static preview only",
  "model routing chains are preview-only",
  "provider selection blockers are preview-only",
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
  "model provider approval packet and run intent preview next",
  "approval packet and run intent preview comes next",
] as const;

const CAPABILITY_LABELS = {
  "text-chat": "text/chat",
  "code-assistance": "code assistance",
  "planning-reasoning": "planning / reasoning",
  "image-generation": "image generation",
  "image-editing": "image editing",
  "video-generation": "video generation",
  "audio-generation": "audio generation",
  "voice-narration": "voice narration",
  transcription: "transcription / caption",
  "embeddings-search": "embeddings / search",
  "safety-moderation": "safety / moderation",
  "local-inference": "local / private inference",
  "metadata-summarization": "metadata / summarization",
} as const satisfies Record<
  AiModelProviderCapabilityId,
  AthenaModelRoutingCapabilityFamilyLabel
>;

const PROVIDER_SLOT_LABELS = {
  "openai-provider-slot": "OpenAI provider slot",
  "anthropic-provider-slot": "Anthropic provider slot",
  "google-gemini-provider-slot": "Google Gemini provider slot",
  "xai-provider-slot": "xAI provider slot",
  "mistral-provider-slot": "Mistral provider slot",
  "local-open-weight-provider-slot": "Local open-weight provider slot",
  "image-provider-slot": "Image provider slot",
  "video-provider-slot": "Video provider slot",
  "audio-voice-provider-slot": "Audio / voice provider slot",
  "transcription-provider-slot": "Transcription provider slot",
  "safety-moderation-provider-slot": "Safety / moderation provider slot",
} as const satisfies Record<
  AiModelProviderSlotId,
  AthenaModelRoutingProviderSlotLabel
>;

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneCapabilityFamilies(
  capabilityFamilies: readonly AthenaModelRoutingCapabilityFamilyRecord[]
): readonly AthenaModelRoutingCapabilityFamilyRecord[] {
  return capabilityFamilies.map((capability) => ({ ...capability }));
}

function cloneProviderSlots(
  providerSlots: readonly AthenaModelRoutingProviderSlotRecord[]
): readonly AthenaModelRoutingProviderSlotRecord[] {
  return providerSlots.map((slot) => ({ ...slot }));
}

function cloneChainSteps(
  steps: readonly AthenaModelRoutingChainStepRecord[]
): readonly AthenaModelRoutingChainStepRecord[] {
  return steps.map((step) => ({
    ...step,
    capabilityFamilies: cloneCapabilityFamilies(step.capabilityFamilies),
    candidateProviderSlots: cloneProviderSlots(step.candidateProviderSlots),
  }));
}

function buildCapabilityFamily(
  capabilityId: AiModelProviderCapabilityId
): AthenaModelRoutingCapabilityFamilyRecord {
  return {
    id: capabilityId,
    label: CAPABILITY_LABELS[capabilityId],
  };
}

function buildProviderSlot(
  providerSlotId: AiModelProviderSlotId | "local-operator-owned-inference-lane"
): AthenaModelRoutingProviderSlotRecord {
  if (providerSlotId === "local-operator-owned-inference-lane") {
    return {
      id: providerSlotId,
      label: "Local operator-owned inference lane",
    };
  }

  return {
    id: providerSlotId,
    label: PROVIDER_SLOT_LABELS[providerSlotId],
  };
}

export function buildStableAthenaModelRoutingKey(
  previewId: AthenaModelRoutingPreviewId
): AthenaModelRoutingPreviewKey {
  return `athena-model-routing-preview:${previewId}`;
}

export function buildStableProviderSelectionRationaleKey(
  previewId: AthenaModelRoutingPreviewId
): AthenaProviderSelectionRationaleKey {
  return `athena-provider-selection-rationale:${previewId}`;
}

export function buildStableModelRoutingChainKey(
  chainId: AthenaModelRoutingChainId
): `athena-model-routing-chain:${AthenaModelRoutingChainId}` {
  return `athena-model-routing-chain:${chainId}`;
}

export function buildStableProviderSelectionBlockerKey(
  blockerId: AthenaProviderSelectionBlockerId
): AthenaProviderSelectionBlockerKey {
  return `athena-provider-selection-blocker:${blockerId}`;
}

function buildRoutingPreview(
  input: Omit<AthenaModelRoutingPreviewRecord, "key">
): AthenaModelRoutingPreviewRecord {
  return {
    ...input,
    key: buildStableAthenaModelRoutingKey(input.id),
    selectedCapabilityFamilies: cloneCapabilityFamilies(
      input.selectedCapabilityFamilies
    ),
    candidateProviderSlots: cloneProviderSlots(input.candidateProviderSlots),
  };
}

function buildProviderSelectionRationale(
  input: Omit<AthenaProviderSelectionRationaleRecord, "key">
): AthenaProviderSelectionRationaleRecord {
  return {
    ...input,
    key: buildStableProviderSelectionRationaleKey(input.routingPreviewId),
    selectedCapabilityFamilies: cloneCapabilityFamilies(
      input.selectedCapabilityFamilies
    ),
    candidateProviderSlots: cloneProviderSlots(input.candidateProviderSlots),
    requiredApprovalGates: cloneList(input.requiredApprovalGates),
    requiredSafetyGates: cloneList(input.requiredSafetyGates),
    requiredAuditGates: cloneList(input.requiredAuditGates),
  };
}

function buildChainPreview(
  input: Omit<AthenaModelRoutingChainPreviewRecord, "key">
): AthenaModelRoutingChainPreviewRecord {
  return {
    ...input,
    key: buildStableModelRoutingChainKey(input.id),
    orderedCapabilitySteps: cloneChainSteps(input.orderedCapabilitySteps),
  };
}

function buildProviderSelectionBlocker(
  input: Omit<AthenaProviderSelectionBlockerRecord, "key">
): AthenaProviderSelectionBlockerRecord {
  return {
    ...input,
    key: buildStableProviderSelectionBlockerKey(input.blockerId),
    affectedCapabilityFamilies: cloneCapabilityFamilies(
      input.affectedCapabilityFamilies
    ),
    affectedWorkspaceTargets: cloneList(input.affectedWorkspaceTargets),
  };
}

const REQUIRED_APPROVAL_GATES = [
  "operator approval required",
  "manual confirmation required",
  "kill switch required",
] as const;

const REQUIRED_SAFETY_GATES = [
  "privacy/redaction required",
  "cost acknowledgement required",
  "rate limit guard required",
  "timeout/cancel guard required",
  "idempotency required",
  "replay block required",
] as const;

const REQUIRED_AUDIT_GATES = [
  "audit required",
  "dry-run result review required",
  "dry-run acceptance matrix required",
] as const;

const ROUTING_PREVIEWS = [
  buildRoutingPreview({
    id: "conversational-planning-request",
    operatorGoalLabel: "conversational planning request",
    operatorRequestPhrase: "Plan the operator request before I open a workspace.",
    normalizedObjective:
      "Preview the capability routing Athena would use for conversational planning before any prompt or model call exists.",
    workspaceTarget: "Athena Command Center",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("text-chat"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("anthropic-provider-slot"),
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    routingPreviewVersion: "athena-model-routing-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    routingMode: "preview-only",
    providerSelectionPosture: "static preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix required",
    nextApprovalPacketRunIntentRequirement:
      "model provider approval packet and run intent preview next",
    currentState: "preview-only / not connected",
    blockedDefaultReason:
      "Conversational planning stays local to Athena until a server-only planning adapter, approval packet, and run intent preview are reviewed.",
    nextSafeAction:
      "Review the planning rationale, confirm approval gates, and draft the provider approval packet preview.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildRoutingPreview({
    id: "code-assistance-request",
    operatorGoalLabel: "code assistance request",
    operatorRequestPhrase: "Help me reason about a code change without executing anything.",
    normalizedObjective:
      "Preview how Athena would route code assistance toward planning and coding capability families while execution remains blocked.",
    workspaceTarget: "Athena Command Center",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("code-assistance"),
      buildCapabilityFamily("planning-reasoning"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("anthropic-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    routingPreviewVersion: "athena-model-routing-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    routingMode: "preview-only",
    providerSelectionPosture: "static preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix required",
    nextApprovalPacketRunIntentRequirement:
      "model provider approval packet and run intent preview next",
    currentState: "preview-only / not connected",
    blockedDefaultReason:
      "Code assistance stays preview-only because the provider slot selection is static and the frontend cannot call model adapters.",
    nextSafeAction:
      "Keep code assistance blocked by default and draft the approval packet preview for the coding provider lane.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildRoutingPreview({
    id: "website-copy-code-request",
    operatorGoalLabel: "website copy/code request",
    operatorRequestPhrase: "Draft website copy and code intent for Jarvis Websites.",
    normalizedObjective:
      "Preview a blended text, planning, and code routing decision for website build requests without connecting a provider.",
    workspaceTarget: "Jarvis Websites",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("text-chat"),
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("code-assistance"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("anthropic-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    routingPreviewVersion: "athena-model-routing-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    routingMode: "preview-only",
    providerSelectionPosture: "static preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix required",
    nextApprovalPacketRunIntentRequirement:
      "model provider approval packet and run intent preview next",
    currentState: "preview-only / not connected",
    blockedDefaultReason:
      "Website copy/code routing stays static because no provider slot may execute and no prompt leaves the frontend.",
    nextSafeAction:
      "Review the website build routing chain and capture the approval packet preview for copy, code, and safety gates.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildRoutingPreview({
    id: "product-video-request",
    operatorGoalLabel: "product video request",
    operatorRequestPhrase: "Plan the provider route for a product video request.",
    normalizedObjective:
      "Preview a chained planning, storyboard, video, narration, caption, and safety routing decision for Jarvis Video Studio.",
    workspaceTarget: "Jarvis Video Studio",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("image-generation"),
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("transcription"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("video-provider-slot"),
      buildProviderSlot("image-provider-slot"),
      buildProviderSlot("audio-voice-provider-slot"),
      buildProviderSlot("transcription-provider-slot"),
      buildProviderSlot("safety-moderation-provider-slot"),
    ],
    routingPreviewVersion: "athena-model-routing-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    routingMode: "preview-only",
    providerSelectionPosture: "static preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix required",
    nextApprovalPacketRunIntentRequirement:
      "model provider approval packet and run intent preview next",
    currentState: "preview-only / not connected",
    blockedDefaultReason:
      "Product video routing remains a chained static preview because every media step still needs a server-only adapter and explicit approval packet.",
    nextSafeAction:
      "Review the product video routing chain, confirm blocked steps, and draft the run intent preview with server-only adapter references.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildRoutingPreview({
    id: "storyboard-image-request",
    operatorGoalLabel: "storyboard image request",
    operatorRequestPhrase: "Show how Athena would route a storyboard image request.",
    normalizedObjective:
      "Preview planning, image-generation, image-editing, and safety capability selection for storyboard image work.",
    workspaceTarget: "Jarvis Video Studio",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("image-generation"),
      buildCapabilityFamily("image-editing"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("image-provider-slot"),
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    routingPreviewVersion: "athena-model-routing-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    routingMode: "preview-only",
    providerSelectionPosture: "static preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix required",
    nextApprovalPacketRunIntentRequirement:
      "model provider approval packet and run intent preview next",
    currentState: "preview-only / not connected",
    blockedDefaultReason:
      "Storyboard image routing remains blocked because prompt payload review, server-only adapter review, and approval packet drafting are incomplete.",
    nextSafeAction:
      "Keep storyboard routing preview-only and carry the selected image lane into the provider approval packet preview.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildRoutingPreview({
    id: "audio-narration-request",
    operatorGoalLabel: "audio narration request",
    operatorRequestPhrase: "Preview the route Athena would use for audio narration.",
    normalizedObjective:
      "Preview planning, narration, audio-generation, and safety capability selection for operator-approved narration work.",
    workspaceTarget: "Jarvis Video Studio",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("audio-generation"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("audio-voice-provider-slot"),
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    routingPreviewVersion: "athena-model-routing-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    routingMode: "preview-only",
    providerSelectionPosture: "static preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix required",
    nextApprovalPacketRunIntentRequirement:
      "model provider approval packet and run intent preview next",
    currentState: "preview-only / not connected",
    blockedDefaultReason:
      "Audio narration routing stays static because approval, rate, timeout, and privacy posture remain preview-only.",
    nextSafeAction:
      "Review the narration rationale and carry the preferred audio slot into the run intent preview.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildRoutingPreview({
    id: "transcription-caption-request",
    operatorGoalLabel: "transcription/caption request",
    operatorRequestPhrase: "Plan the route for transcription and caption review.",
    normalizedObjective:
      "Preview transcription, summarization, and safety capability routing for caption and transcript requests.",
    workspaceTarget: "Jarvis Video Studio",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("transcription"),
      buildCapabilityFamily("metadata-summarization"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("transcription-provider-slot"),
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    routingPreviewVersion: "athena-model-routing-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    routingMode: "preview-only",
    providerSelectionPosture: "static preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix required",
    nextApprovalPacketRunIntentRequirement:
      "model provider approval packet and run intent preview next",
    currentState: "preview-only / not connected",
    blockedDefaultReason:
      "Transcription and caption routing stays blocked because review, safety, and audit joins are still preview-only.",
    nextSafeAction:
      "Use the caption rationale to define the provider approval packet preview for transcription and safety lanes.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildRoutingPreview({
    id: "embeddings-search-request",
    operatorGoalLabel: "embeddings/search request",
    operatorRequestPhrase: "Show the preview routing for embeddings and search.",
    normalizedObjective:
      "Preview embeddings/search and summarization capability selection for retrieval-style requests without connecting a provider.",
    workspaceTarget: "Projects",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("embeddings-search"),
      buildCapabilityFamily("metadata-summarization"),
      buildCapabilityFamily("planning-reasoning"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("mistral-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    routingPreviewVersion: "athena-model-routing-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    routingMode: "preview-only",
    providerSelectionPosture: "static preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix required",
    nextApprovalPacketRunIntentRequirement:
      "model provider approval packet and run intent preview next",
    currentState: "preview-only / not connected",
    blockedDefaultReason:
      "Embeddings/search routing stays static because retrieval adapters and privacy review are still server-only requirements.",
    nextSafeAction:
      "Review the retrieval rationale and define the run intent preview for retrieval, summarization, and audit posture.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildRoutingPreview({
    id: "safety-moderation-review-request",
    operatorGoalLabel: "safety/moderation review request",
    operatorRequestPhrase: "Preview the route for a safety and moderation review.",
    normalizedObjective:
      "Preview moderation and summarization capability selection for safety review requests while every action stays blocked by default.",
    workspaceTarget: "Safety / Settings",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("safety-moderation"),
      buildCapabilityFamily("metadata-summarization"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("safety-moderation-provider-slot"),
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("anthropic-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    routingPreviewVersion: "athena-model-routing-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    routingMode: "preview-only",
    providerSelectionPosture: "static preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix required",
    nextApprovalPacketRunIntentRequirement:
      "model provider approval packet and run intent preview next",
    currentState: "preview-only / not connected",
    blockedDefaultReason:
      "Safety routing stays static because moderation gates, privacy review, and audit posture must be captured before any intent is drafted.",
    nextSafeAction:
      "Review the moderation rationale and capture the provider approval packet preview for safety review only.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildRoutingPreview({
    id: "local-private-inference-request",
    operatorGoalLabel: "local/private inference request",
    operatorRequestPhrase: "Show the local/private inference routing preview.",
    normalizedObjective:
      "Preview local/private inference routing with redaction and manual review dependencies while the frontend remains blocked.",
    workspaceTarget: "Athena Command Center",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("local-inference"),
      buildCapabilityFamily("safety-moderation"),
      buildCapabilityFamily("metadata-summarization"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("local-open-weight-provider-slot"),
      buildProviderSlot("mistral-provider-slot"),
      buildProviderSlot("local-operator-owned-inference-lane"),
    ],
    routingPreviewVersion: "athena-model-routing-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    routingMode: "preview-only",
    providerSelectionPosture: "static preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix required",
    nextApprovalPacketRunIntentRequirement:
      "model provider approval packet and run intent preview next",
    currentState: "preview-only / not connected",
    blockedDefaultReason:
      "Local/private inference routing remains preview-only until redaction, approval, and audit posture are reviewed alongside the local lane.",
    nextSafeAction:
      "Confirm local/private routing blockers and draft the run intent preview for the local inference lane without enabling execution.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildRoutingPreview({
    id: "audit-recovery-explanation-request",
    operatorGoalLabel: "audit/recovery explanation request",
    operatorRequestPhrase: "Explain the audit and recovery posture for a blocked request.",
    normalizedObjective:
      "Preview retrieval, summarization, planning, and safety routing for audit and recovery explanation requests.",
    workspaceTarget: "Audit / Runs",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("embeddings-search"),
      buildCapabilityFamily("metadata-summarization"),
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("anthropic-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    routingPreviewVersion: "athena-model-routing-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    routingMode: "preview-only",
    providerSelectionPosture: "static preview only",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    operatorApprovalRequired: "operator approval required",
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
    dryRunReviewDependency: "dry-run result review required",
    acceptanceMatrixDependency: "dry-run acceptance matrix required",
    nextApprovalPacketRunIntentRequirement:
      "model provider approval packet and run intent preview next",
    currentState: "preview-only / not connected",
    blockedDefaultReason:
      "Audit and recovery explanation routing stays blocked because retrieval, summarization, and safety steps still depend on server-only adapters and manual approval.",
    nextSafeAction:
      "Use the audit/recovery rationale to draft the next approval packet and run intent preview.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
] as const satisfies readonly AthenaModelRoutingPreviewRecord[];

const PROVIDER_SELECTION_RATIONALES = [
  buildProviderSelectionRationale({
    rationaleVersion: "athena-provider-selection-rationale-v1",
    routingPreviewId: "conversational-planning-request",
    operatorRequestPhrase: "Plan the operator request before I open a workspace.",
    normalizedObjective:
      "Preview the capability routing Athena would use for conversational planning before any prompt or model call exists.",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("text-chat"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("anthropic-provider-slot"),
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    preferredProviderSlotLabel: "Anthropic provider slot",
    backupProviderSlotLabel: "OpenAI provider slot",
    localPrivateAlternativeLabel: "Local open-weight provider slot",
    selectionRationale:
      "Planning-first work favors reasoning and conversational clarity, so the preview prefers a planning-oriented text slot while keeping a general text slot and a local lane visible.",
    blockedSelectionReason:
      "Provider selection remains a static preview because the planning adapter, approval packet, and run intent preview are not connected yet.",
    requiredApprovalGates: REQUIRED_APPROVAL_GATES,
    requiredSafetyGates: REQUIRED_SAFETY_GATES,
    requiredAuditGates: REQUIRED_AUDIT_GATES,
    requiredServerOnlyAdapter:
      "server-only planning / reasoning adapter contract",
    requiredDryRunReview:
      "Review the dry-run result, recovery plan, and acceptance matrix before planning intent can move into the approval packet preview.",
    costRatePosture:
      "Cost acknowledgement required. Rate limit posture remains static preview only.",
    privacyDataPosture:
      "Privacy/redaction required. Prompt payload stays redacted placeholder only. Opaque credential references only.",
    currentState: "preview-only / not connected",
    nextSafeAction:
      "Capture the preferred planning lane inside the provider approval packet and run intent preview.",
  }),
  buildProviderSelectionRationale({
    rationaleVersion: "athena-provider-selection-rationale-v1",
    routingPreviewId: "code-assistance-request",
    operatorRequestPhrase: "Help me reason about a code change without executing anything.",
    normalizedObjective:
      "Preview how Athena would route code assistance toward planning and coding capability families while execution remains blocked.",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("code-assistance"),
      buildCapabilityFamily("planning-reasoning"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("anthropic-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    preferredProviderSlotLabel: "OpenAI provider slot",
    backupProviderSlotLabel: "Anthropic provider slot",
    localPrivateAlternativeLabel: "Local open-weight provider slot",
    selectionRationale:
      "Code assistance needs strong coding coverage first and reasoning support second, so the preview prefers the coding-heavy slot while keeping a planning-oriented backup and a local path visible.",
    blockedSelectionReason:
      "No server-only coding adapter is approved for live use, so the preview can explain the choice but cannot send prompts or call a provider.",
    requiredApprovalGates: REQUIRED_APPROVAL_GATES,
    requiredSafetyGates: REQUIRED_SAFETY_GATES,
    requiredAuditGates: REQUIRED_AUDIT_GATES,
    requiredServerOnlyAdapter: "server-only code-assistance adapter contract",
    requiredDryRunReview:
      "Review the code-assistance dry-run result and acceptance blockers before a coding lane is named in the approval packet preview.",
    costRatePosture:
      "Cost acknowledgement required. Rate limit posture remains blocked until the approval packet is drafted.",
    privacyDataPosture:
      "Privacy/redaction required. Prompt payload stays redacted placeholder only. Opaque credential references only.",
    currentState: "preview-only / not connected",
    nextSafeAction:
      "Carry the preferred coding lane into the provider approval packet preview with backend-only execution still blocked.",
  }),
  buildProviderSelectionRationale({
    rationaleVersion: "athena-provider-selection-rationale-v1",
    routingPreviewId: "website-copy-code-request",
    operatorRequestPhrase: "Draft website copy and code intent for Jarvis Websites.",
    normalizedObjective:
      "Preview a blended text, planning, and code routing decision for website build requests without connecting a provider.",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("text-chat"),
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("code-assistance"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("anthropic-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    preferredProviderSlotLabel: "OpenAI provider slot",
    backupProviderSlotLabel: "Anthropic provider slot",
    localPrivateAlternativeLabel: "Local open-weight provider slot",
    selectionRationale:
      "Website build work blends planning, copy, code, and safety review, so the preview keeps a generalist text/code slot first and a planning-heavy backup second.",
    blockedSelectionReason:
      "The website routing decision is static because there is no approved server-only run intent for copy or code generation.",
    requiredApprovalGates: REQUIRED_APPROVAL_GATES,
    requiredSafetyGates: REQUIRED_SAFETY_GATES,
    requiredAuditGates: REQUIRED_AUDIT_GATES,
    requiredServerOnlyAdapter:
      "server-only website copy and code adapter bundle",
    requiredDryRunReview:
      "Review the website-related dry-run results, quality notes, and acceptance blockers before naming a provider in the packet preview.",
    costRatePosture:
      "Cost acknowledgement required. Rate limit posture remains blocked until the approval packet is drafted.",
    privacyDataPosture:
      "Privacy/redaction required. Prompt payload stays redacted placeholder only. Opaque credential references only.",
    currentState: "preview-only / not connected",
    nextSafeAction:
      "Draft the website provider approval packet preview with copy, code, and safety gates visible together.",
  }),
  buildProviderSelectionRationale({
    rationaleVersion: "athena-provider-selection-rationale-v1",
    routingPreviewId: "product-video-request",
    operatorRequestPhrase: "Plan the provider route for a product video request.",
    normalizedObjective:
      "Preview a chained planning, storyboard, video, narration, caption, and safety routing decision for Jarvis Video Studio.",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("image-generation"),
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("transcription"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("video-provider-slot"),
      buildProviderSlot("image-provider-slot"),
      buildProviderSlot("audio-voice-provider-slot"),
      buildProviderSlot("transcription-provider-slot"),
      buildProviderSlot("safety-moderation-provider-slot"),
    ],
    preferredProviderSlotLabel: "Video provider slot",
    backupProviderSlotLabel: "Image provider slot",
    localPrivateAlternativeLabel: "Local open-weight provider slot",
    selectionRationale:
      "A product video request is a chained workflow, so the preview names the dominant video slot first and keeps storyboard, narration, caption, and safety slots visible as static candidates.",
    blockedSelectionReason:
      "No live provider is selected because multi-step video work still requires a server-only approval packet and run intent for every media lane.",
    requiredApprovalGates: REQUIRED_APPROVAL_GATES,
    requiredSafetyGates: REQUIRED_SAFETY_GATES,
    requiredAuditGates: REQUIRED_AUDIT_GATES,
    requiredServerOnlyAdapter: "server-only video-generation adapter contract",
    requiredDryRunReview:
      "Review the video dry-run result, safety review, recovery plan, and acceptance matrix before any video provider lane is named in a run intent preview.",
    costRatePosture:
      "Cost acknowledgement required. Rate limit posture remains blocked until the approval packet is drafted.",
    privacyDataPosture:
      "Privacy/redaction required. Prompt payload stays redacted placeholder only. Opaque credential references only.",
    currentState: "preview-only / not connected",
    nextSafeAction:
      "Convert the chained video rationale into an approval packet preview with separate run-intent lanes for storyboard, video, audio, caption, and safety review.",
  }),
  buildProviderSelectionRationale({
    rationaleVersion: "athena-provider-selection-rationale-v1",
    routingPreviewId: "storyboard-image-request",
    operatorRequestPhrase: "Show how Athena would route a storyboard image request.",
    normalizedObjective:
      "Preview planning, image-generation, image-editing, and safety capability selection for storyboard image work.",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("image-generation"),
      buildCapabilityFamily("image-editing"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("image-provider-slot"),
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    preferredProviderSlotLabel: "Image provider slot",
    backupProviderSlotLabel: "OpenAI provider slot",
    localPrivateAlternativeLabel: "Local open-weight provider slot",
    selectionRationale:
      "Storyboard image work centers on image generation first, with planning, light editing, and safety review around it, so the preview favors the dedicated image slot.",
    blockedSelectionReason:
      "The image slot remains a static preview because there is no approved server-only image run intent yet.",
    requiredApprovalGates: REQUIRED_APPROVAL_GATES,
    requiredSafetyGates: REQUIRED_SAFETY_GATES,
    requiredAuditGates: REQUIRED_AUDIT_GATES,
    requiredServerOnlyAdapter: "server-only image-generation adapter contract",
    requiredDryRunReview:
      "Review the storyboard dry-run packets and acceptance blockers before moving the image lane into the provider approval packet preview.",
    costRatePosture:
      "Cost acknowledgement required. Rate limit posture remains blocked until the approval packet is drafted.",
    privacyDataPosture:
      "Privacy/redaction required. Prompt payload stays redacted placeholder only. Opaque credential references only.",
    currentState: "preview-only / not connected",
    nextSafeAction:
      "Draft the image provider approval packet preview with storyboard scope, safety gates, and backend-only handoff posture.",
  }),
  buildProviderSelectionRationale({
    rationaleVersion: "athena-provider-selection-rationale-v1",
    routingPreviewId: "audio-narration-request",
    operatorRequestPhrase: "Preview the route Athena would use for audio narration.",
    normalizedObjective:
      "Preview planning, narration, audio-generation, and safety capability selection for operator-approved narration work.",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("audio-generation"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("audio-voice-provider-slot"),
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    preferredProviderSlotLabel: "Audio / voice provider slot",
    backupProviderSlotLabel: "OpenAI provider slot",
    localPrivateAlternativeLabel: "Local open-weight provider slot",
    selectionRationale:
      "Narration work leans on voice output first, so the preview prefers the audio/voice lane and keeps general multimodal slots as static backups.",
    blockedSelectionReason:
      "The narration lane is static because no approved audio run intent exists and provider execution is blocked by default.",
    requiredApprovalGates: REQUIRED_APPROVAL_GATES,
    requiredSafetyGates: REQUIRED_SAFETY_GATES,
    requiredAuditGates: REQUIRED_AUDIT_GATES,
    requiredServerOnlyAdapter: "server-only audio / voice adapter contract",
    requiredDryRunReview:
      "Review the narration dry-run result and acceptance matrix before the audio lane can be named inside an approval packet preview.",
    costRatePosture:
      "Cost acknowledgement required. Rate limit posture remains blocked until the approval packet is drafted.",
    privacyDataPosture:
      "Privacy/redaction required. Prompt payload stays redacted placeholder only. Opaque credential references only.",
    currentState: "preview-only / not connected",
    nextSafeAction:
      "Use the narration rationale to draft the audio provider approval packet and run intent preview.",
  }),
  buildProviderSelectionRationale({
    rationaleVersion: "athena-provider-selection-rationale-v1",
    routingPreviewId: "transcription-caption-request",
    operatorRequestPhrase: "Plan the route for transcription and caption review.",
    normalizedObjective:
      "Preview transcription, summarization, and safety capability routing for caption and transcript requests.",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("transcription"),
      buildCapabilityFamily("metadata-summarization"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("transcription-provider-slot"),
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    preferredProviderSlotLabel: "Transcription provider slot",
    backupProviderSlotLabel: "OpenAI provider slot",
    localPrivateAlternativeLabel: "Local open-weight provider slot",
    selectionRationale:
      "Caption work depends on transcript fidelity first and summarization second, so the preview prefers the transcription lane and keeps a general multimodal lane as backup.",
    blockedSelectionReason:
      "The caption lane remains static because prompt review, privacy review, and audit joins are not implemented for live use.",
    requiredApprovalGates: REQUIRED_APPROVAL_GATES,
    requiredSafetyGates: REQUIRED_SAFETY_GATES,
    requiredAuditGates: REQUIRED_AUDIT_GATES,
    requiredServerOnlyAdapter: "server-only transcription adapter contract",
    requiredDryRunReview:
      "Review the caption dry-run result and acceptance blockers before the transcription lane is named in the run intent preview.",
    costRatePosture:
      "Cost acknowledgement required. Rate limit posture remains blocked until the approval packet is drafted.",
    privacyDataPosture:
      "Privacy/redaction required. Prompt payload stays redacted placeholder only. Opaque credential references only.",
    currentState: "preview-only / not connected",
    nextSafeAction:
      "Draft the transcription approval packet preview with caption scope, audit review, and safety gates.",
  }),
  buildProviderSelectionRationale({
    rationaleVersion: "athena-provider-selection-rationale-v1",
    routingPreviewId: "embeddings-search-request",
    operatorRequestPhrase: "Show the preview routing for embeddings and search.",
    normalizedObjective:
      "Preview embeddings/search and summarization capability selection for retrieval-style requests without connecting a provider.",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("embeddings-search"),
      buildCapabilityFamily("metadata-summarization"),
      buildCapabilityFamily("planning-reasoning"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("mistral-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    preferredProviderSlotLabel: "OpenAI provider slot",
    backupProviderSlotLabel: "Google Gemini provider slot",
    localPrivateAlternativeLabel: "Local open-weight provider slot",
    selectionRationale:
      "Retrieval-heavy work prefers the embeddings/search lane that can later pair retrieval with summarization while still preserving a local option.",
    blockedSelectionReason:
      "Retrieval routing stays static because retrieval adapters and run-intent review are server-only future work.",
    requiredApprovalGates: REQUIRED_APPROVAL_GATES,
    requiredSafetyGates: REQUIRED_SAFETY_GATES,
    requiredAuditGates: REQUIRED_AUDIT_GATES,
    requiredServerOnlyAdapter:
      "server-only embeddings/search adapter contract",
    requiredDryRunReview:
      "Review the retrieval dry-run evidence before the search lane is carried into an approval packet preview.",
    costRatePosture:
      "Cost acknowledgement required. Rate limit posture remains static preview only.",
    privacyDataPosture:
      "Privacy/redaction required. Prompt payload stays redacted placeholder only. Opaque credential references only.",
    currentState: "preview-only / not connected",
    nextSafeAction:
      "Draft the retrieval approval packet preview with embeddings, summarization, and audit posture.",
  }),
  buildProviderSelectionRationale({
    rationaleVersion: "athena-provider-selection-rationale-v1",
    routingPreviewId: "safety-moderation-review-request",
    operatorRequestPhrase: "Preview the route for a safety and moderation review.",
    normalizedObjective:
      "Preview moderation and summarization capability selection for safety review requests while every action stays blocked by default.",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("safety-moderation"),
      buildCapabilityFamily("metadata-summarization"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("safety-moderation-provider-slot"),
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("anthropic-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    preferredProviderSlotLabel: "Safety / moderation provider slot",
    backupProviderSlotLabel: "OpenAI provider slot",
    localPrivateAlternativeLabel: "Local open-weight provider slot",
    selectionRationale:
      "Safety review prioritizes moderation first and summarization second, so the preview names the dedicated moderation slot while keeping text lanes as static fallbacks.",
    blockedSelectionReason:
      "Moderation remains a static preview because approval, privacy, and audit gates have not been packaged into a run intent preview yet.",
    requiredApprovalGates: REQUIRED_APPROVAL_GATES,
    requiredSafetyGates: REQUIRED_SAFETY_GATES,
    requiredAuditGates: REQUIRED_AUDIT_GATES,
    requiredServerOnlyAdapter:
      "server-only safety / moderation adapter contract",
    requiredDryRunReview:
      "Review the safety dry-run result, redaction review, and acceptance matrix before naming the moderation lane in the approval packet preview.",
    costRatePosture:
      "Cost acknowledgement required. Rate limit posture remains static preview only.",
    privacyDataPosture:
      "Privacy/redaction required. Prompt payload stays redacted placeholder only. Opaque credential references only.",
    currentState: "preview-only / not connected",
    nextSafeAction:
      "Draft the moderation approval packet preview with audit, kill switch, and redaction posture visible.",
  }),
  buildProviderSelectionRationale({
    rationaleVersion: "athena-provider-selection-rationale-v1",
    routingPreviewId: "local-private-inference-request",
    operatorRequestPhrase: "Show the local/private inference routing preview.",
    normalizedObjective:
      "Preview local/private inference routing with redaction and manual review dependencies while the frontend remains blocked.",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("local-inference"),
      buildCapabilityFamily("safety-moderation"),
      buildCapabilityFamily("metadata-summarization"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("local-open-weight-provider-slot"),
      buildProviderSlot("mistral-provider-slot"),
      buildProviderSlot("local-operator-owned-inference-lane"),
    ],
    preferredProviderSlotLabel: "Local open-weight provider slot",
    backupProviderSlotLabel: "Mistral provider slot",
    localPrivateAlternativeLabel: "Local operator-owned inference lane",
    selectionRationale:
      "Local/private requests bias toward operator-owned or local-open-weight lanes first so privacy posture stays highest while still showing a static fallback.",
    blockedSelectionReason:
      "The local lane remains preview-only because redaction review, audit review, and manual approval still come before any run intent.",
    requiredApprovalGates: REQUIRED_APPROVAL_GATES,
    requiredSafetyGates: REQUIRED_SAFETY_GATES,
    requiredAuditGates: REQUIRED_AUDIT_GATES,
    requiredServerOnlyAdapter: "server-only local/private inference adapter",
    requiredDryRunReview:
      "Review the local/private dry-run result, redaction review, and acceptance blockers before drafting a local run intent preview.",
    costRatePosture:
      "Cost acknowledgement required. Rate limit posture remains static preview only.",
    privacyDataPosture:
      "Privacy/redaction required. Local/private posture remains preview-only. Opaque credential references only.",
    currentState: "preview-only / not connected",
    nextSafeAction:
      "Carry the local/private lane into the approval packet and run intent preview while keeping execution blocked by default.",
  }),
  buildProviderSelectionRationale({
    rationaleVersion: "athena-provider-selection-rationale-v1",
    routingPreviewId: "audit-recovery-explanation-request",
    operatorRequestPhrase: "Explain the audit and recovery posture for a blocked request.",
    normalizedObjective:
      "Preview retrieval, summarization, planning, and safety routing for audit and recovery explanation requests.",
    selectedCapabilityFamilies: [
      buildCapabilityFamily("embeddings-search"),
      buildCapabilityFamily("metadata-summarization"),
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("safety-moderation"),
    ],
    candidateProviderSlots: [
      buildProviderSlot("openai-provider-slot"),
      buildProviderSlot("anthropic-provider-slot"),
      buildProviderSlot("google-gemini-provider-slot"),
      buildProviderSlot("local-open-weight-provider-slot"),
    ],
    preferredProviderSlotLabel: "OpenAI provider slot",
    backupProviderSlotLabel: "Anthropic provider slot",
    localPrivateAlternativeLabel: "Local open-weight provider slot",
    selectionRationale:
      "Audit and recovery explanation work needs retrieval, summarization, and safety posture together, so the preview prefers a general retrieval/summarization lane with a planning-heavy backup.",
    blockedSelectionReason:
      "Audit explanation remains preview-only because retrieval adapters, audit joins, and run intent review are not connected yet.",
    requiredApprovalGates: REQUIRED_APPROVAL_GATES,
    requiredSafetyGates: REQUIRED_SAFETY_GATES,
    requiredAuditGates: REQUIRED_AUDIT_GATES,
    requiredServerOnlyAdapter:
      "server-only audit/retrieval explanation adapter bundle",
    requiredDryRunReview:
      "Review audit and recovery dry-run evidence before a retrieval/summarization lane is named in the provider approval packet preview.",
    costRatePosture:
      "Cost acknowledgement required. Rate limit posture remains static preview only.",
    privacyDataPosture:
      "Privacy/redaction required. Prompt payload stays redacted placeholder only. Opaque credential references only.",
    currentState: "preview-only / not connected",
    nextSafeAction:
      "Draft the provider approval packet preview for audit/recovery explanation with retrieval, safety, and audit posture visible.",
  }),
] as const satisfies readonly AthenaProviderSelectionRationaleRecord[];

function buildChainStep(
  chainId: AthenaModelRoutingChainId,
  stepSlug: string,
  label: string,
  capabilityIds: readonly AiModelProviderCapabilityId[],
  providerSlotIds: readonly (
    | AiModelProviderSlotId
    | "local-operator-owned-inference-lane"
  )[],
  blockedDefaultReason: string
): AthenaModelRoutingChainStepRecord {
  return {
    id: `${chainId}:${stepSlug}`,
    label,
    capabilityFamilies: capabilityIds.map((capabilityId) =>
      buildCapabilityFamily(capabilityId)
    ),
    candidateProviderSlots: providerSlotIds.map((providerSlotId) =>
      buildProviderSlot(providerSlotId)
    ),
    serverOnlyAdapterRequirement: "server-only required",
    dryRunReviewRequirement: "dry-run result review required",
    approvalRequirement: "operator approval required",
    auditRequirement: "audit required",
    blockedDefaultReason,
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  };
}

const MODEL_ROUTING_CHAINS = [
  buildChainPreview({
    id: "product-video-routing-chain",
    chainVersion: "athena-model-routing-chain-preview-v1",
    chainLabel: "product video routing chain",
    sourceCommandDraftReference: "athena-command-draft:video-generation-intent",
    workspaceTarget: "Jarvis Video Studio",
    orderedCapabilitySteps: [
      buildChainStep(
        "product-video-routing-chain",
        "text-planning",
        "text planning",
        ["planning-reasoning", "text-chat"],
        [
          "anthropic-provider-slot",
          "openai-provider-slot",
          "google-gemini-provider-slot",
        ],
        "Planning stays blocked/default until the operator approves a server-only planning lane."
      ),
      buildChainStep(
        "product-video-routing-chain",
        "image-storyboard",
        "image/storyboard",
        ["image-generation", "image-editing"],
        ["image-provider-slot", "openai-provider-slot"],
        "Storyboard generation stays blocked/default until an image adapter and prompt review are approved."
      ),
      buildChainStep(
        "product-video-routing-chain",
        "video-generation",
        "video generation",
        ["video-generation"],
        ["video-provider-slot", "image-provider-slot"],
        "Video generation stays blocked/default until the provider approval packet and run intent preview exist."
      ),
      buildChainStep(
        "product-video-routing-chain",
        "audio-narration",
        "audio narration",
        ["voice-narration", "audio-generation"],
        ["audio-voice-provider-slot", "openai-provider-slot"],
        "Narration stays blocked/default until the operator approves the voice lane and review gates."
      ),
      buildChainStep(
        "product-video-routing-chain",
        "transcription-caption",
        "transcription/caption",
        ["transcription", "metadata-summarization"],
        ["transcription-provider-slot", "openai-provider-slot"],
        "Caption routing stays blocked/default until transcript review and audit posture are included in the run intent preview."
      ),
      buildChainStep(
        "product-video-routing-chain",
        "safety-review",
        "safety review",
        ["safety-moderation", "metadata-summarization"],
        ["safety-moderation-provider-slot", "openai-provider-slot"],
        "Safety review stays blocked/default until moderation gates and audit review are approved."
      ),
    ],
    blockedDefaultReason:
      "The product video routing chain is a static preview only and every step remains blocked/default.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildChainPreview({
    id: "website-build-routing-chain",
    chainVersion: "athena-model-routing-chain-preview-v1",
    chainLabel: "website build routing chain",
    sourceCommandDraftReference: "athena-command-draft:website-build-intent",
    workspaceTarget: "Jarvis Websites",
    orderedCapabilitySteps: [
      buildChainStep(
        "website-build-routing-chain",
        "planning",
        "planning",
        ["planning-reasoning", "text-chat"],
        ["anthropic-provider-slot", "openai-provider-slot"],
        "Planning stays blocked/default until a server-only planning lane is named in the approval packet preview."
      ),
      buildChainStep(
        "website-build-routing-chain",
        "code-assistance",
        "code assistance",
        ["code-assistance", "text-chat"],
        ["openai-provider-slot", "anthropic-provider-slot"],
        "Code assistance stays blocked/default until coding adapters and backend-only execution posture are approved."
      ),
      buildChainStep(
        "website-build-routing-chain",
        "safety-review",
        "safety review",
        ["safety-moderation"],
        ["safety-moderation-provider-slot", "openai-provider-slot"],
        "Safety review stays blocked/default until moderation gates and prompt review are approved."
      ),
      buildChainStep(
        "website-build-routing-chain",
        "approval-packet",
        "approval packet",
        ["metadata-summarization", "planning-reasoning"],
        ["openai-provider-slot", "anthropic-provider-slot"],
        "Approval packet drafting stays blocked/default until the operator confirms the selected website lane."
      ),
    ],
    blockedDefaultReason:
      "The website build routing chain is preview-only and every step remains blocked/default.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildChainPreview({
    id: "avatar-presenter-routing-chain",
    chainVersion: "athena-model-routing-chain-preview-v1",
    chainLabel: "avatar presenter routing chain",
    sourceCommandDraftReference: "athena-command-draft:avatar-presenter-intent",
    workspaceTarget: "Jarvis Avatar",
    orderedCapabilitySteps: [
      buildChainStep(
        "avatar-presenter-routing-chain",
        "planning",
        "planning",
        ["planning-reasoning", "text-chat"],
        ["anthropic-provider-slot", "openai-provider-slot"],
        "Planning stays blocked/default until persona scope and approval posture are captured."
      ),
      buildChainStep(
        "avatar-presenter-routing-chain",
        "image-avatar",
        "image/avatar",
        ["image-generation", "image-editing"],
        ["image-provider-slot", "openai-provider-slot"],
        "Avatar image routing stays blocked/default until likeness and consent review are approved."
      ),
      buildChainStep(
        "avatar-presenter-routing-chain",
        "audio-voice",
        "audio/voice",
        ["voice-narration", "audio-generation"],
        ["audio-voice-provider-slot", "openai-provider-slot"],
        "Audio/voice routing stays blocked/default until voice and consent gates are approved."
      ),
      buildChainStep(
        "avatar-presenter-routing-chain",
        "video",
        "video",
        ["video-generation"],
        ["video-provider-slot", "image-provider-slot"],
        "Video routing stays blocked/default until the approval packet and run intent preview are drafted."
      ),
      buildChainStep(
        "avatar-presenter-routing-chain",
        "safety-review",
        "safety review",
        ["safety-moderation"],
        ["safety-moderation-provider-slot", "openai-provider-slot"],
        "Safety review stays blocked/default until moderation and audit posture are approved."
      ),
    ],
    blockedDefaultReason:
      "The avatar presenter routing chain is preview-only and every step remains blocked/default.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildChainPreview({
    id: "audit-review-routing-chain",
    chainVersion: "athena-model-routing-chain-preview-v1",
    chainLabel: "audit review routing chain",
    sourceCommandDraftReference: "athena-command-draft:audit-review-intent",
    workspaceTarget: "Audit / Runs",
    orderedCapabilitySteps: [
      buildChainStep(
        "audit-review-routing-chain",
        "retrieval-search",
        "retrieval/search",
        ["embeddings-search"],
        ["openai-provider-slot", "google-gemini-provider-slot"],
        "Retrieval/search stays blocked/default until retrieval adapters and audit posture are reviewed."
      ),
      buildChainStep(
        "audit-review-routing-chain",
        "summarization",
        "summarization",
        ["metadata-summarization", "planning-reasoning"],
        ["anthropic-provider-slot", "openai-provider-slot"],
        "Summarization stays blocked/default until evidence review and approval posture are captured."
      ),
      buildChainStep(
        "audit-review-routing-chain",
        "safety-review",
        "safety review",
        ["safety-moderation"],
        ["safety-moderation-provider-slot", "openai-provider-slot"],
        "Safety review stays blocked/default until moderation gates and audit joins are approved."
      ),
    ],
    blockedDefaultReason:
      "The audit review routing chain is preview-only and every step remains blocked/default.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
  buildChainPreview({
    id: "local-private-routing-chain",
    chainVersion: "athena-model-routing-chain-preview-v1",
    chainLabel: "local/private routing chain",
    sourceCommandDraftReference:
      "athena-command-draft:local-private-inference-request",
    workspaceTarget: "Athena Command Center",
    orderedCapabilitySteps: [
      buildChainStep(
        "local-private-routing-chain",
        "local-inference",
        "local inference",
        ["local-inference"],
        [
          "local-open-weight-provider-slot",
          "mistral-provider-slot",
          "local-operator-owned-inference-lane",
        ],
        "Local inference stays blocked/default until the local lane is approved for backend-only use."
      ),
      buildChainStep(
        "local-private-routing-chain",
        "redaction",
        "redaction",
        ["safety-moderation", "metadata-summarization"],
        ["safety-moderation-provider-slot", "local-open-weight-provider-slot"],
        "Redaction stays blocked/default until privacy posture and audit posture are reviewed."
      ),
      buildChainStep(
        "local-private-routing-chain",
        "manual-review",
        "manual review",
        ["planning-reasoning", "metadata-summarization"],
        ["anthropic-provider-slot", "local-open-weight-provider-slot"],
        "Manual review stays blocked/default until the operator confirms the local/private run intent preview."
      ),
    ],
    blockedDefaultReason:
      "The local/private routing chain is preview-only and every step remains blocked/default.",
    noExecutionStatement: NO_EXECUTION_STATEMENT,
  }),
] as const satisfies readonly AthenaModelRoutingChainPreviewRecord[];

const PROVIDER_SELECTION_BLOCKERS = [
  buildProviderSelectionBlocker({
    blockerId: "no-server-only-adapter",
    severity: "critical",
    affectedCapabilityFamilies: [
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("code-assistance"),
      buildCapabilityFamily("image-generation"),
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("transcription"),
      buildCapabilityFamily("embeddings-search"),
      buildCapabilityFamily("safety-moderation"),
      buildCapabilityFamily("local-inference"),
    ],
    affectedWorkspaceTargets: [
      "Athena Command Center",
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Jarvis Avatar",
      "Audit / Runs",
      "Safety / Settings",
      "Projects",
    ],
    operatorFacingExplanation:
      "Athena can preview the route, but there is no approved server-only adapter path to execute any selected provider lane.",
    requiredRecoveryAction:
      "Complete the server-only adapter review for the affected capability family before drafting a run intent preview.",
    nextSafeAction:
      "Keep routing preview-only and review server-only adapter requirements in the approval packet preview.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "no-manual-approval",
    severity: "critical",
    affectedCapabilityFamilies: cloneCapabilityFamilies(
      ROUTING_PREVIEWS.flatMap((preview) => preview.selectedCapabilityFamilies)
    ),
    affectedWorkspaceTargets: [
      "Athena Command Center",
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Jarvis Avatar",
      "Audit / Runs",
      "Safety / Settings",
      "Projects",
    ],
    operatorFacingExplanation:
      "No provider lane may advance beyond preview without explicit manual approval and manual confirmation.",
    requiredRecoveryAction:
      "Capture operator approval scope and confirmation steps inside the provider approval packet preview.",
    nextSafeAction:
      "Do not connect a provider lane. Prepare the approval packet and keep execution blocked by default.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "kill-switch-active",
    severity: "critical",
    affectedCapabilityFamilies: [
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("image-generation"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("local-inference"),
    ],
    affectedWorkspaceTargets: [
      "Jarvis Video Studio",
      "Jarvis Avatar",
      "Athena Command Center",
    ],
    operatorFacingExplanation:
      "A kill switch lock means Athena may only explain the route and cannot advance any provider lane toward execution intent.",
    requiredRecoveryAction:
      "Review the kill switch state and capture the operator decision inside the approval packet preview.",
    nextSafeAction:
      "Keep the lane blocked/default and continue with preview-only review.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "missing-opaque-credential-reference",
    severity: "high",
    affectedCapabilityFamilies: [
      buildCapabilityFamily("code-assistance"),
      buildCapabilityFamily("image-generation"),
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("transcription"),
    ],
    affectedWorkspaceTargets: [
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Jarvis Avatar",
    ],
    operatorFacingExplanation:
      "Provider routing cannot move beyond preview until the approval packet references an opaque credential label for the selected lane.",
    requiredRecoveryAction:
      "Add the opaque credential reference to the provider approval packet preview and keep secrets out of the frontend.",
    nextSafeAction:
      "Keep the selection static and review credential isolation posture only.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "prompt-payload-not-reviewed",
    severity: "high",
    affectedCapabilityFamilies: [
      buildCapabilityFamily("text-chat"),
      buildCapabilityFamily("code-assistance"),
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("image-generation"),
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("voice-narration"),
    ],
    affectedWorkspaceTargets: [
      "Athena Command Center",
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Jarvis Avatar",
    ],
    operatorFacingExplanation:
      "Prompt payload review is incomplete, so Athena may only keep the route visible as a redacted preview.",
    requiredRecoveryAction:
      "Review the redacted prompt posture and capture it in the provider approval packet preview.",
    nextSafeAction:
      "Leave prompts unsent and continue preview-only routing review.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "privacy-redaction-incomplete",
    severity: "critical",
    affectedCapabilityFamilies: [
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("transcription"),
      buildCapabilityFamily("embeddings-search"),
      buildCapabilityFamily("local-inference"),
    ],
    affectedWorkspaceTargets: [
      "Jarvis Video Studio",
      "Audit / Runs",
      "Athena Command Center",
      "Projects",
    ],
    operatorFacingExplanation:
      "Privacy and redaction posture is incomplete, so Athena cannot move the provider lane into any approval or run intent draft.",
    requiredRecoveryAction:
      "Complete privacy/redaction review and keep the prompt payload redacted placeholder only.",
    nextSafeAction:
      "Keep routing preview-only and review privacy blockers in the packet preview.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "cost-acknowledgement-missing",
    severity: "medium",
    affectedCapabilityFamilies: [
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("image-generation"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("transcription"),
      buildCapabilityFamily("embeddings-search"),
    ],
    affectedWorkspaceTargets: [
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Audit / Runs",
      "Projects",
    ],
    operatorFacingExplanation:
      "Cost acknowledgement is missing, so Athena may only show the candidate provider lanes without any live selection claim.",
    requiredRecoveryAction:
      "Add cost acknowledgement to the approval packet preview and keep rate posture blocked/default.",
    nextSafeAction:
      "Do not advance the provider lane beyond static preview.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "rate-limit-posture-unknown",
    severity: "medium",
    affectedCapabilityFamilies: [
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("transcription"),
      buildCapabilityFamily("embeddings-search"),
    ],
    affectedWorkspaceTargets: [
      "Jarvis Video Studio",
      "Jarvis Avatar",
      "Projects",
      "Audit / Runs",
    ],
    operatorFacingExplanation:
      "Rate limit posture is still unknown, so Athena may only keep the selected provider lane visible as a preview.",
    requiredRecoveryAction:
      "Document rate posture inside the provider approval packet and keep execution blocked.",
    nextSafeAction:
      "Preserve a static lane ranking only.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "timeout-cancel-posture-missing",
    severity: "medium",
    affectedCapabilityFamilies: [
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("transcription"),
      buildCapabilityFamily("local-inference"),
    ],
    affectedWorkspaceTargets: [
      "Jarvis Video Studio",
      "Jarvis Avatar",
      "Athena Command Center",
    ],
    operatorFacingExplanation:
      "Timeout/cancel posture is missing, so Athena cannot move from provider preview into run intent drafting.",
    requiredRecoveryAction:
      "Add timeout and cancel posture to the approval packet preview for the affected lane.",
    nextSafeAction:
      "Keep the provider lane blocked/default.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "dry-run-result-not-reviewed",
    severity: "critical",
    affectedCapabilityFamilies: cloneCapabilityFamilies(
      ROUTING_PREVIEWS.flatMap((preview) => preview.selectedCapabilityFamilies)
    ),
    affectedWorkspaceTargets: [
      "Athena Command Center",
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Jarvis Avatar",
      "Audit / Runs",
      "Safety / Settings",
      "Projects",
    ],
    operatorFacingExplanation:
      "Dry-run result review is a required dependency, so Athena cannot advance a provider lane until the relevant dry-run review is acknowledged.",
    requiredRecoveryAction:
      "Review the dry-run result, quality, safety, recovery, and acceptance records tied to the selected capability family.",
    nextSafeAction:
      "Stay in preview-only routing mode and complete dry-run review first.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "acceptance-matrix-unresolved",
    severity: "critical",
    affectedCapabilityFamilies: [
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("code-assistance"),
      buildCapabilityFamily("image-generation"),
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("transcription"),
      buildCapabilityFamily("embeddings-search"),
      buildCapabilityFamily("safety-moderation"),
      buildCapabilityFamily("local-inference"),
    ],
    affectedWorkspaceTargets: [
      "Athena Command Center",
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Jarvis Avatar",
      "Audit / Runs",
      "Safety / Settings",
      "Projects",
    ],
    operatorFacingExplanation:
      "Acceptance matrix blockers are unresolved, so no provider lane may advance beyond a deterministic static preview.",
    requiredRecoveryAction:
      "Resolve the dry-run acceptance matrix blockers before drafting any provider run intent preview.",
    nextSafeAction:
      "Keep the lane blocked/default and review the acceptance matrix.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "audit-persistence-not-implemented",
    severity: "medium",
    affectedCapabilityFamilies: [
      buildCapabilityFamily("planning-reasoning"),
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("embeddings-search"),
      buildCapabilityFamily("safety-moderation"),
    ],
    affectedWorkspaceTargets: [
      "Athena Command Center",
      "Jarvis Video Studio",
      "Audit / Runs",
      "Safety / Settings",
    ],
    operatorFacingExplanation:
      "Audit persistence is not implemented, so routing remains a preview-only review artifact and not an executable decision.",
    requiredRecoveryAction:
      "Keep audit posture visible in the approval packet preview and do not claim live audit storage exists.",
    nextSafeAction:
      "Stay preview-only and use static audit review notes only.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "result-persistence-not-implemented",
    severity: "medium",
    affectedCapabilityFamilies: [
      buildCapabilityFamily("video-generation"),
      buildCapabilityFamily("voice-narration"),
      buildCapabilityFamily("transcription"),
      buildCapabilityFamily("embeddings-search"),
      buildCapabilityFamily("local-inference"),
    ],
    affectedWorkspaceTargets: [
      "Jarvis Video Studio",
      "Audit / Runs",
      "Projects",
      "Athena Command Center",
    ],
    operatorFacingExplanation:
      "Result persistence is not implemented, so the selected provider lane cannot advance to execution or result capture.",
    requiredRecoveryAction:
      "Keep result posture explicit in the approval packet preview and do not claim result storage exists.",
    nextSafeAction:
      "Continue with blocked/default routing previews only.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "provider-sdk-unavailable-blocked-in-frontend",
    severity: "high",
    affectedCapabilityFamilies: cloneCapabilityFamilies(
      ROUTING_PREVIEWS.flatMap((preview) => preview.selectedCapabilityFamilies)
    ),
    affectedWorkspaceTargets: [
      "Athena Command Center",
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Jarvis Avatar",
      "Audit / Runs",
      "Safety / Settings",
      "Projects",
    ],
    operatorFacingExplanation:
      "Frontend provider SDKs are intentionally unavailable and blocked, so Athena may only preview the provider slot ranking.",
    requiredRecoveryAction:
      "Keep provider SDK imports out of the frontend and route all future execution through server-only adapters.",
    nextSafeAction:
      "Maintain a static provider preview and review backend-only requirements.",
  }),
  buildProviderSelectionBlocker({
    blockerId: "provider-execution-blocked-by-default",
    severity: "critical",
    affectedCapabilityFamilies: cloneCapabilityFamilies(
      ROUTING_PREVIEWS.flatMap((preview) => preview.selectedCapabilityFamilies)
    ),
    affectedWorkspaceTargets: [
      "Athena Command Center",
      "Jarvis Video Studio",
      "Jarvis Websites",
      "Jarvis Avatar",
      "Audit / Runs",
      "Safety / Settings",
      "Projects",
    ],
    operatorFacingExplanation:
      "Provider execution is blocked by default. Athena previews the route, but it does not send prompts, call models, or execute providers/plugins.",
    requiredRecoveryAction:
      "Keep execution blocked and move the selected lane into the provider approval packet and run intent preview only.",
    nextSafeAction:
      "Stay in preview-only routing mode until backend-only approval paths exist.",
  }),
] as const satisfies readonly AthenaProviderSelectionBlockerRecord[];

function cloneRoutingPreview(
  preview: AthenaModelRoutingPreviewRecord
): AthenaModelRoutingPreviewRecord {
  return {
    ...preview,
    selectedCapabilityFamilies: cloneCapabilityFamilies(
      preview.selectedCapabilityFamilies
    ),
    candidateProviderSlots: cloneProviderSlots(preview.candidateProviderSlots),
  };
}

function cloneProviderSelectionRationale(
  rationale: AthenaProviderSelectionRationaleRecord
): AthenaProviderSelectionRationaleRecord {
  return {
    ...rationale,
    selectedCapabilityFamilies: cloneCapabilityFamilies(
      rationale.selectedCapabilityFamilies
    ),
    candidateProviderSlots: cloneProviderSlots(rationale.candidateProviderSlots),
    requiredApprovalGates: cloneList(rationale.requiredApprovalGates),
    requiredSafetyGates: cloneList(rationale.requiredSafetyGates),
    requiredAuditGates: cloneList(rationale.requiredAuditGates),
  };
}

function cloneModelRoutingChain(
  chain: AthenaModelRoutingChainPreviewRecord
): AthenaModelRoutingChainPreviewRecord {
  return {
    ...chain,
    orderedCapabilitySteps: cloneChainSteps(chain.orderedCapabilitySteps),
  };
}

function cloneProviderSelectionBlocker(
  blocker: AthenaProviderSelectionBlockerRecord
): AthenaProviderSelectionBlockerRecord {
  return {
    ...blocker,
    affectedCapabilityFamilies: cloneCapabilityFamilies(
      blocker.affectedCapabilityFamilies
    ),
    affectedWorkspaceTargets: cloneList(blocker.affectedWorkspaceTargets),
  };
}

export function listAthenaModelRoutingPreviews():
  readonly AthenaModelRoutingPreviewRecord[] {
  return ROUTING_PREVIEWS.map((preview) => cloneRoutingPreview(preview));
}

export function listProviderSelectionRationales():
  readonly AthenaProviderSelectionRationaleRecord[] {
  return PROVIDER_SELECTION_RATIONALES.map((rationale) =>
    cloneProviderSelectionRationale(rationale)
  );
}

export function listModelRoutingChainPreviews():
  readonly AthenaModelRoutingChainPreviewRecord[] {
  return MODEL_ROUTING_CHAINS.map((chain) => cloneModelRoutingChain(chain));
}

export function listProviderSelectionBlockerMatrix():
  readonly AthenaProviderSelectionBlockerRecord[] {
  return PROVIDER_SELECTION_BLOCKERS.map((blocker) =>
    cloneProviderSelectionBlocker(blocker)
  );
}

export function groupRoutingPreviewsByCapabilityFamily():
  readonly AthenaModelRoutingPreviewCapabilityFamilyGroup[] {
  const groups = new Map<
    AiModelProviderCapabilityId,
    AthenaModelRoutingPreviewCapabilityFamilyGroup
  >();

  for (const preview of ROUTING_PREVIEWS) {
    for (const capabilityFamily of preview.selectedCapabilityFamilies) {
      const existing = groups.get(capabilityFamily.id);
      if (!existing) {
        groups.set(capabilityFamily.id, {
          capabilityFamilyId: capabilityFamily.id,
          capabilityFamilyLabel: capabilityFamily.label,
          previewCount: 1,
          previews: [cloneRoutingPreview(preview)],
        });
        continue;
      }

      groups.set(capabilityFamily.id, {
        ...existing,
        previewCount: existing.previewCount + 1,
        previews: [...existing.previews, cloneRoutingPreview(preview)],
      });
    }
  }

  return Array.from(groups.values());
}

export function groupRoutingPreviewsByWorkspaceTarget():
  readonly AthenaModelRoutingPreviewWorkspaceTargetGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    AthenaModelRoutingPreviewWorkspaceTargetGroup
  >();

  for (const preview of ROUTING_PREVIEWS) {
    const existing = groups.get(preview.workspaceTarget);
    if (!existing) {
      groups.set(preview.workspaceTarget, {
        workspaceTarget: preview.workspaceTarget,
        previewCount: 1,
        previews: [cloneRoutingPreview(preview)],
      });
      continue;
    }

    groups.set(preview.workspaceTarget, {
      ...existing,
      previewCount: existing.previewCount + 1,
      previews: [...existing.previews, cloneRoutingPreview(preview)],
    });
  }

  return Array.from(groups.values());
}

export function buildProviderSelectionSummary():
  AthenaProviderSelectionSummary {
  return {
    currentBatch: ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
    highestDetectedPhase: ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_PHASE,
    latestCompletedBatch: ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH,
    nextLikelyBatch:
      NEXT_MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH,
    routingPreviewCount: ROUTING_PREVIEWS.length,
    rationaleCount: PROVIDER_SELECTION_RATIONALES.length,
    capabilityFamilyCount: groupRoutingPreviewsByCapabilityFamily().length,
    workspaceTargetCount: groupRoutingPreviewsByWorkspaceTarget().length,
    summaryLines: cloneList(SUMMARY_LINES),
  };
}

export function buildModelRoutingChainSummary():
  AthenaModelRoutingChainSummary {
  return {
    currentBatch: ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH,
    chainCount: MODEL_ROUTING_CHAINS.length,
    stepCount: MODEL_ROUTING_CHAINS.reduce(
      (count, chain) => count + chain.orderedCapabilitySteps.length,
      0
    ),
    summaryLines: [
      "model routing chains are preview-only",
      "every step is blocked/default",
      "every step requires server-only adapters, approval, audit, and dry-run review",
      "no retry execution",
      "no fallback execution",
      "approval packet and run intent preview comes next",
    ],
  };
}

export function buildBlockedProviderSelectionSummary():
  AthenaBlockedProviderSelectionSummary {
  return {
    currentBatch: ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH,
    blockerCount: PROVIDER_SELECTION_BLOCKERS.length,
    criticalBlockerCount: PROVIDER_SELECTION_BLOCKERS.filter(
      (blocker) => blocker.severity === "critical"
    ).length,
    highBlockerCount: PROVIDER_SELECTION_BLOCKERS.filter(
      (blocker) => blocker.severity === "high"
    ).length,
    summaryLines: [
      "provider selection blockers are preview-only",
      "provider execution is blocked by default",
      "no retry execution",
      "no fallback execution",
      "result persistence not implemented",
      "audit persistence not implemented",
      "approval packet and run intent preview comes next",
    ],
  };
}

export function buildNextProviderApprovalPacketAndRunIntentChecklist():
  readonly string[] {
  return [
    NEXT_MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH,
    "approval packet and run intent preview comes next",
    "provider selection is static preview only",
    "model routing chains are preview-only",
    "provider selection blockers are preview-only",
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
