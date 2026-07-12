import type {
  AiModelProviderCapabilityId,
  AiModelProviderSlotId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";

export const ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH =
  "4810-4841 - Athena Model Routing and Provider Selection Preview";

export const ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_PHASE = 4841;

export const PREVIOUS_COMPLETED_MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH =
  "4778-4809 - Model Adapter Dry-Run Result Review and Recovery";

export const NEXT_MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH =
  "4842-4873 - Model Provider Approval Packet and Run Intent Preview";

export type AthenaModelRoutingPreviewVersion =
  "athena-model-routing-preview-v1";
export type AthenaProviderSelectionRationaleVersion =
  "athena-provider-selection-rationale-v1";
export type AthenaModelRoutingChainVersion =
  "athena-model-routing-chain-preview-v1";
export type AthenaModelRoutingSource = "Athena / Jarvis Model Gateway";
export type AthenaModelRoutingMode = "preview-only";
export type AthenaProviderSelectionPosture = "static preview only";
export type AthenaModelCallPosture = "not implemented";
export type AthenaPromptSendingPosture = "not implemented";
export type AthenaSdkPosture = "no SDK imports";
export type AthenaCredentialPosture = "opaque credential references only";
export type AthenaSecretPosture = "no plaintext secrets";
export type AthenaFrontendPosture = "blocked";
export type AthenaBackendPosture = "server-only required";
export type AthenaExecutionPosture = "blocked by default";
export type AthenaOperatorApprovalRequirement = "operator approval required";
export type AthenaManualConfirmationRequirement =
  "manual confirmation required";
export type AthenaKillSwitchRequirement = "kill switch required";
export type AthenaAuditRequirement = "audit required";
export type AthenaCredentialIsolationRequirement =
  "credential isolation required";
export type AthenaPrivacyRedactionRequirement =
  "privacy/redaction required";
export type AthenaCostAcknowledgementRequirement =
  "cost acknowledgement required";
export type AthenaRateLimitGuardRequirement =
  "rate limit guard required";
export type AthenaTimeoutCancelGuardRequirement =
  "timeout/cancel guard required";
export type AthenaIdempotencyRequirement = "idempotency required";
export type AthenaReplayBlockRequirement = "replay block required";
export type AthenaDryRunReviewDependency = "dry-run result review required";
export type AthenaAcceptanceMatrixDependency =
  "dry-run acceptance matrix required";
export type AthenaNextApprovalPacketRunIntentRequirement =
  "model provider approval packet and run intent preview next";
export type AthenaProviderSelectionCurrentState =
  "preview-only / not connected";
export type AthenaModelRoutingNoExecutionStatement =
  "No execution. No model calls. No prompt sending. No provider execution.";
export type AthenaProviderSelectionCostRatePosture =
  | "Cost acknowledgement required. Rate limit posture remains static preview only."
  | "Cost acknowledgement required. Rate limit posture remains blocked until the approval packet is drafted.";
export type AthenaProviderSelectionPrivacyDataPosture =
  | "Privacy/redaction required. Prompt payload stays redacted placeholder only. Opaque credential references only."
  | "Privacy/redaction required. Local/private posture remains preview-only. Opaque credential references only.";
export type AthenaProviderSelectionSeverity = "critical" | "high" | "medium";

export type AthenaModelRoutingPreviewId =
  | "conversational-planning-request"
  | "code-assistance-request"
  | "website-copy-code-request"
  | "product-video-request"
  | "storyboard-image-request"
  | "audio-narration-request"
  | "transcription-caption-request"
  | "embeddings-search-request"
  | "safety-moderation-review-request"
  | "local-private-inference-request"
  | "audit-recovery-explanation-request";

export type AthenaModelRoutingChainId =
  | "product-video-routing-chain"
  | "website-build-routing-chain"
  | "avatar-presenter-routing-chain"
  | "audit-review-routing-chain"
  | "local-private-routing-chain";

export type AthenaProviderSelectionBlockerId =
  | "no-server-only-adapter"
  | "no-manual-approval"
  | "kill-switch-active"
  | "missing-opaque-credential-reference"
  | "prompt-payload-not-reviewed"
  | "privacy-redaction-incomplete"
  | "cost-acknowledgement-missing"
  | "rate-limit-posture-unknown"
  | "timeout-cancel-posture-missing"
  | "dry-run-result-not-reviewed"
  | "acceptance-matrix-unresolved"
  | "audit-persistence-not-implemented"
  | "result-persistence-not-implemented"
  | "provider-sdk-unavailable-blocked-in-frontend"
  | "provider-execution-blocked-by-default";

export type AthenaModelRoutingPreviewKey =
  `athena-model-routing-preview:${AthenaModelRoutingPreviewId}`;
export type AthenaProviderSelectionRationaleKey =
  `athena-provider-selection-rationale:${AthenaModelRoutingPreviewId}`;
export type AthenaModelRoutingChainKey =
  `athena-model-routing-chain:${AthenaModelRoutingChainId}`;
export type AthenaProviderSelectionBlockerKey =
  `athena-provider-selection-blocker:${AthenaProviderSelectionBlockerId}`;
export type AthenaModelRoutingSourceCommandDraftReference =
  `athena-command-draft:${string}`;

export type AthenaModelRoutingProviderSlotLabel =
  | "OpenAI provider slot"
  | "Anthropic provider slot"
  | "Google Gemini provider slot"
  | "xAI provider slot"
  | "Mistral provider slot"
  | "Local open-weight provider slot"
  | "Image provider slot"
  | "Video provider slot"
  | "Audio / voice provider slot"
  | "Transcription provider slot"
  | "Safety / moderation provider slot"
  | "Local operator-owned inference lane";

export type AthenaModelRoutingCapabilityFamilyLabel =
  | "text/chat"
  | "code assistance"
  | "planning / reasoning"
  | "image generation"
  | "image editing"
  | "video generation"
  | "audio generation"
  | "voice narration"
  | "transcription / caption"
  | "embeddings / search"
  | "safety / moderation"
  | "local / private inference"
  | "metadata / summarization";

export type AthenaModelRoutingCapabilityFamilyRecord = Readonly<{
  id: AiModelProviderCapabilityId;
  label: AthenaModelRoutingCapabilityFamilyLabel;
}>;

export type AthenaModelRoutingProviderSlotRecord = Readonly<{
  id: AiModelProviderSlotId | "local-operator-owned-inference-lane";
  label: AthenaModelRoutingProviderSlotLabel;
}>;

export type AthenaModelRoutingPreviewRecord = Readonly<{
  id: AthenaModelRoutingPreviewId;
  key: AthenaModelRoutingPreviewKey;
  operatorGoalLabel: string;
  operatorRequestPhrase: string;
  normalizedObjective: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamilies: readonly AthenaModelRoutingCapabilityFamilyRecord[];
  candidateProviderSlots: readonly AthenaModelRoutingProviderSlotRecord[];
  routingPreviewVersion: AthenaModelRoutingPreviewVersion;
  source: AthenaModelRoutingSource;
  routingMode: AthenaModelRoutingMode;
  providerSelectionPosture: AthenaProviderSelectionPosture;
  modelCallPosture: AthenaModelCallPosture;
  promptSendingPosture: AthenaPromptSendingPosture;
  sdkPosture: AthenaSdkPosture;
  credentialPosture: AthenaCredentialPosture;
  secretPosture: AthenaSecretPosture;
  frontendPosture: AthenaFrontendPosture;
  backendPosture: AthenaBackendPosture;
  executionPosture: AthenaExecutionPosture;
  operatorApprovalRequired: AthenaOperatorApprovalRequirement;
  manualConfirmationRequired: AthenaManualConfirmationRequirement;
  killSwitchRequired: AthenaKillSwitchRequirement;
  auditRequired: AthenaAuditRequirement;
  credentialIsolationRequired: AthenaCredentialIsolationRequirement;
  privacyRedactionRequired: AthenaPrivacyRedactionRequirement;
  costAcknowledgementRequired: AthenaCostAcknowledgementRequirement;
  rateLimitGuardRequired: AthenaRateLimitGuardRequirement;
  timeoutCancelGuardRequired: AthenaTimeoutCancelGuardRequirement;
  idempotencyRequired: AthenaIdempotencyRequirement;
  replayBlockRequired: AthenaReplayBlockRequirement;
  dryRunReviewDependency: AthenaDryRunReviewDependency;
  acceptanceMatrixDependency: AthenaAcceptanceMatrixDependency;
  nextApprovalPacketRunIntentRequirement: AthenaNextApprovalPacketRunIntentRequirement;
  currentState: AthenaProviderSelectionCurrentState;
  blockedDefaultReason: string;
  nextSafeAction: string;
  noExecutionStatement: AthenaModelRoutingNoExecutionStatement;
}>;

export type AthenaProviderSelectionRationaleRecord = Readonly<{
  key: AthenaProviderSelectionRationaleKey;
  rationaleVersion: AthenaProviderSelectionRationaleVersion;
  routingPreviewId: AthenaModelRoutingPreviewId;
  operatorRequestPhrase: string;
  normalizedObjective: string;
  selectedCapabilityFamilies: readonly AthenaModelRoutingCapabilityFamilyRecord[];
  candidateProviderSlots: readonly AthenaModelRoutingProviderSlotRecord[];
  preferredProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
  backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
  localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
  selectionRationale: string;
  blockedSelectionReason: string;
  requiredApprovalGates: readonly string[];
  requiredSafetyGates: readonly string[];
  requiredAuditGates: readonly string[];
  requiredServerOnlyAdapter: string;
  requiredDryRunReview: string;
  costRatePosture: AthenaProviderSelectionCostRatePosture;
  privacyDataPosture: AthenaProviderSelectionPrivacyDataPosture;
  currentState: AthenaProviderSelectionCurrentState;
  nextSafeAction: string;
}>;

export type AthenaModelRoutingChainStepRecord = Readonly<{
  id: string;
  label: string;
  capabilityFamilies: readonly AthenaModelRoutingCapabilityFamilyRecord[];
  candidateProviderSlots: readonly AthenaModelRoutingProviderSlotRecord[];
  serverOnlyAdapterRequirement: AthenaBackendPosture;
  dryRunReviewRequirement: AthenaDryRunReviewDependency;
  approvalRequirement: AthenaOperatorApprovalRequirement;
  auditRequirement: AthenaAuditRequirement;
  blockedDefaultReason: string;
  noExecutionStatement: AthenaModelRoutingNoExecutionStatement;
}>;

export type AthenaModelRoutingChainPreviewRecord = Readonly<{
  id: AthenaModelRoutingChainId;
  key: AthenaModelRoutingChainKey;
  chainVersion: AthenaModelRoutingChainVersion;
  chainLabel: string;
  sourceCommandDraftReference: AthenaModelRoutingSourceCommandDraftReference;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  orderedCapabilitySteps: readonly AthenaModelRoutingChainStepRecord[];
  blockedDefaultReason: string;
  noExecutionStatement: AthenaModelRoutingNoExecutionStatement;
}>;

export type AthenaProviderSelectionBlockerRecord = Readonly<{
  key: AthenaProviderSelectionBlockerKey;
  blockerId: AthenaProviderSelectionBlockerId;
  severity: AthenaProviderSelectionSeverity;
  affectedCapabilityFamilies: readonly AthenaModelRoutingCapabilityFamilyRecord[];
  affectedWorkspaceTargets: readonly AiModelProviderWorkspaceTarget[];
  operatorFacingExplanation: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

export type AthenaModelRoutingPreviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  previewCount: number;
  previews: readonly AthenaModelRoutingPreviewRecord[];
}>;

export type AthenaModelRoutingPreviewWorkspaceTargetGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  previewCount: number;
  previews: readonly AthenaModelRoutingPreviewRecord[];
}>;

export type AthenaProviderSelectionSummary = Readonly<{
  currentBatch: typeof ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH;
  highestDetectedPhase: typeof ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_PHASE;
  latestCompletedBatch: typeof ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH;
  previousCompletedBatch: typeof PREVIOUS_COMPLETED_MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH;
  nextLikelyBatch: typeof NEXT_MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH;
  routingPreviewCount: number;
  rationaleCount: number;
  capabilityFamilyCount: number;
  workspaceTargetCount: number;
  summaryLines: readonly string[];
}>;

export type AthenaModelRoutingChainSummary = Readonly<{
  currentBatch: typeof ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH;
  nextLikelyBatch: typeof NEXT_MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH;
  chainCount: number;
  stepCount: number;
  summaryLines: readonly string[];
}>;

export type AthenaBlockedProviderSelectionSummary = Readonly<{
  currentBatch: typeof ATHENA_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH;
  nextLikelyBatch: typeof NEXT_MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH;
  blockerCount: number;
  criticalBlockerCount: number;
  highBlockerCount: number;
  summaryLines: readonly string[];
}>;
