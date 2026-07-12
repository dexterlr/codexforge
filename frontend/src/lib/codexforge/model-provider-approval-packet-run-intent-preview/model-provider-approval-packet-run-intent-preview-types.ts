import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
  AthenaModelRoutingChainKey,
  AthenaModelRoutingPreviewId,
  AthenaModelRoutingPreviewKey,
  AthenaModelRoutingProviderSlotLabel,
  AthenaProviderSelectionRationaleKey,
} from "../athena-model-routing-provider-selection-preview";
import type { ModelAdapterDryRunAcceptanceMatrixKey } from "../model-adapter-dry-run-result-review-recovery";
import type { ModelAdapterDryRunResultReviewKey } from "../model-adapter-dry-run-result-review-recovery";
import type { ServerOnlyModelAdapterContractKey } from "../server-only-model-adapter-contracts";

export const MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH =
  "4842-4873 - Model Provider Approval Packet and Run Intent Preview";

export const MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_PHASE = 4873;

export const NEXT_MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH =
  "4874-4905 - Manual Gated Model Provider Run Admission Preview";

export type ModelProviderPreviewSource = "Athena / Jarvis Model Gateway";
export type ModelProviderPreviewMode = "preview-only";
export type ModelProviderApprovalPosture = "operator review only";
export type ModelProviderRunPosture = "intent preview only";
export type ModelProviderModelCallPosture = "not implemented";
export type ModelProviderPromptSendingPosture = "not implemented";
export type ModelProviderSdkPosture = "no SDK imports";
export type ModelProviderCredentialPosture =
  "opaque credential references only";
export type ModelProviderSecretPosture = "no plaintext secrets";
export type ModelProviderFrontendPosture = "blocked";
export type ModelProviderBackendPosture = "server-only required";
export type ModelProviderExecutionPosture = "blocked by default";
export type ModelProviderPromptPayloadPosture =
  "redacted placeholder only";
export type ModelProviderPromptTransmissionState = "not sent";
export type ModelProviderCredentialReferencePosture =
  "opaque label only";
export type ModelProviderManualApprovalRequirement =
  "manual approval required";
export type ModelProviderManualConfirmationRequirement =
  "manual confirmation required";
export type ModelProviderKillSwitchRequirement = "kill switch required";
export type ModelProviderAuditRequirement = "audit required";
export type ModelProviderPrivacyRedactionRequirement =
  "privacy/redaction required";
export type ModelProviderCostAcknowledgementRequirement =
  "cost acknowledgement required";
export type ModelProviderRateLimitGuardRequirement =
  "rate limit guard required";
export type ModelProviderTimeoutCancelGuardRequirement =
  "timeout/cancel guard required";
export type ModelProviderIdempotencyRequirement = "idempotency required";
export type ModelProviderReplayBlockRequirement = "replay block required";
export type ModelProviderSingleRunLockRequirement = "single-run lock required";
export type ModelProviderDryRunReviewDependency =
  "dry-run result review required";
export type ModelProviderAcceptanceMatrixDependency =
  "dry-run acceptance matrix review required";
export type ModelProviderApprovalLifecyclePosture = "preview-only";
export type ModelProviderPersistenceState = "not implemented";
export type ModelProviderResultCaptureRequirement =
  "result capture required in future";
export type ModelProviderNextRunAdmissionRequirement =
  "manual gated model provider run admission preview next";
export type ModelProviderApprovalReferencePosture = "preview-only";
export type ModelProviderAuditReferencePosture = "preview-only";
export type ModelProviderIdempotencyKeyPosture =
  "deterministic preview key only";
export type ModelProviderRunAdmissionState = "not admitted";
export type ModelProviderManualConfirmationState = "not confirmed";
export type ModelProviderKillSwitchState = "engaged / review-only";
export type ModelProviderTimeoutCancelPosture =
  "timeout/cancel guard required";
export type ModelProviderCostRatePosture =
  "cost acknowledgement and rate limit guard required";
export type ModelProviderPrivacyRedactionPosture =
  "privacy/redaction required";
export type ModelProviderPreviewOnlyStatement =
  | "approval packet is preview-only"
  | "run intent is preview-only"
  | "approval gates are preview-only"
  | "run intent blockers are preview-only"
  | "approval expiry and revocation are preview-only";
export type ModelProviderNoExecutionStatement =
  "No execution. No prompt sending. No model calls. No provider execution. No plugin execution.";
export type ModelProviderApprovalPacketVersion =
  "model-provider-approval-packet-preview-v1";
export type ModelProviderRunIntentPreviewVersion =
  "model-provider-run-intent-preview-v1";
export type ModelProviderApprovalGateChecklistVersion =
  "model-provider-approval-gate-checklist-preview-v1";
export type ModelProviderRunIntentBlockerMatrixVersion =
  "model-provider-run-intent-blocker-matrix-preview-v1";
export type ModelProviderApprovalExpiryRevocationPreviewVersion =
  "model-provider-approval-expiry-revocation-preview-v1";
export type ModelProviderRunIntentSeverity = "critical" | "high" | "medium";
export type ModelProviderApprovalPacketCommandDraftReference =
  `athena-command-draft:${string}`;
export type ModelProviderApprovalDraftReference =
  `athena-approval-draft:${string}`;
export type ModelProviderRunIntentId =
  `model-provider-run-intent:${AthenaModelRoutingPreviewId}`;
export type ModelProviderApprovalPacketKey =
  `model-provider-approval-packet:${AthenaModelRoutingPreviewId}`;
export type ModelProviderRunIntentKey =
  `model-provider-run-intent-preview:${AthenaModelRoutingPreviewId}`;

export type ModelProviderApprovalGateChecklistId =
  | "operator-approval"
  | "manual-confirmation"
  | "approval-scope"
  | "approval-expiry"
  | "approval-revocation"
  | "kill-switch"
  | "audit"
  | "server-only-boundary"
  | "no-frontend-provider-call"
  | "no-provider-sdk-import-in-frontend"
  | "no-prompt-sending"
  | "opaque-credential-reference"
  | "no-plaintext-secrets"
  | "privacy-redaction"
  | "cost-rate-timeout"
  | "idempotency-replay-block"
  | "single-run-lock"
  | "dry-run-result-review"
  | "acceptance-matrix-review"
  | "manual-recovery-state"
  | "no-persistence-until-future-backend-batch";

export type ModelProviderApprovalGateChecklistKey =
  `model-provider-approval-gate:${ModelProviderApprovalGateChecklistId}`;

export type ModelProviderRunIntentBlockerId =
  | "approval-packet-preview-only"
  | "no-manual-approval"
  | "no-manual-confirmation"
  | "approval-scope-unresolved"
  | "approval-expired"
  | "approval-revoked"
  | "kill-switch-active"
  | "no-server-only-adapter"
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

export type ModelProviderRunIntentBlockerKey =
  `model-provider-run-intent-blocker:${ModelProviderRunIntentBlockerId}`;
export type ModelProviderApprovalExpiryRevocationKey =
  `model-provider-approval-expiry-revocation:${AthenaModelRoutingPreviewId}`;
export type ModelProviderApprovalPacketCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  approvalPacketCount: number;
  approvalPackets: readonly ModelProviderApprovalPacketRecord[];
}>;

export type ModelProviderApprovalPacketWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  approvalPacketCount: number;
  approvalPackets: readonly ModelProviderApprovalPacketRecord[];
}>;

export type ModelProviderApprovalPacketRecord = Readonly<{
  id: AthenaModelRoutingPreviewId;
  key: ModelProviderApprovalPacketKey;
  approvalPacketVersion: ModelProviderApprovalPacketVersion;
  previewOnlyStatement: "approval packet is preview-only";
  source: ModelProviderPreviewSource;
  packetMode: ModelProviderPreviewMode;
  approvalPosture: ModelProviderApprovalPosture;
  runPosture: ModelProviderRunPosture;
  modelCallPosture: ModelProviderModelCallPosture;
  promptSendingPosture: ModelProviderPromptSendingPosture;
  sdkPosture: ModelProviderSdkPosture;
  credentialPosture: ModelProviderCredentialPosture;
  secretPosture: ModelProviderSecretPosture;
  frontendPosture: ModelProviderFrontendPosture;
  backendPosture: ModelProviderBackendPosture;
  executionPosture: ModelProviderExecutionPosture;
  label: string;
  operatorRequestPhrase: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  sourceCommandDraftReference: ModelProviderApprovalPacketCommandDraftReference;
  sourceApprovalDraftReference: ModelProviderApprovalDraftReference;
  sourceRoutingPreviewReference: AthenaModelRoutingPreviewKey;
  sourceProviderSelectionRationaleReference: AthenaProviderSelectionRationaleKey;
  sourceRoutingChainReference: AthenaModelRoutingChainKey;
  selectedCapabilityFamilies: readonly AthenaModelRoutingCapabilityFamilyRecord[];
  selectedProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
  backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
  localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
  approvalScopeSummary: string;
  approvedActionSummary: string;
  disallowedActionSummary: string;
  promptPayloadPosture: ModelProviderPromptPayloadPosture;
  promptTransmissionState: ModelProviderPromptTransmissionState;
  credentialReferencePosture: ModelProviderCredentialReferencePosture;
  manualApprovalRequired: ModelProviderManualApprovalRequirement;
  manualConfirmationRequired: ModelProviderManualConfirmationRequirement;
  killSwitchRequired: ModelProviderKillSwitchRequirement;
  auditRequired: ModelProviderAuditRequirement;
  privacyRedactionRequired: ModelProviderPrivacyRedactionRequirement;
  costAcknowledgementRequired: ModelProviderCostAcknowledgementRequirement;
  rateLimitGuardRequired: ModelProviderRateLimitGuardRequirement;
  timeoutCancelGuardRequired: ModelProviderTimeoutCancelGuardRequirement;
  idempotencyRequired: ModelProviderIdempotencyRequirement;
  replayBlockRequired: ModelProviderReplayBlockRequirement;
  singleRunLockRequired: ModelProviderSingleRunLockRequirement;
  dryRunReviewDependency: ModelProviderDryRunReviewDependency;
  acceptanceMatrixDependency: ModelProviderAcceptanceMatrixDependency;
  approvalExpiryPosture: ModelProviderApprovalLifecyclePosture;
  approvalRevocationPosture: ModelProviderApprovalLifecyclePosture;
  resultCaptureRequiredInFuture: ModelProviderResultCaptureRequirement;
  resultPersistenceState: ModelProviderPersistenceState;
  auditPersistenceState: ModelProviderPersistenceState;
  approvalPersistenceState: ModelProviderPersistenceState;
  nextManualGatedRunAdmissionRequirement: ModelProviderNextRunAdmissionRequirement;
  noExecutionStatement: ModelProviderNoExecutionStatement;
}>;

export type ModelProviderRunIntentPreviewRecord = Readonly<{
  id: AthenaModelRoutingPreviewId;
  key: ModelProviderRunIntentKey;
  runIntentVersion: ModelProviderRunIntentPreviewVersion;
  runIntentId: ModelProviderRunIntentId;
  previewOnlyStatement: "run intent is preview-only";
  label: string;
  operatorRequestPhrase: string;
  sourceApprovalPacketReference: ModelProviderApprovalPacketKey;
  sourceRoutingPreviewReference: AthenaModelRoutingPreviewKey;
  sourceProviderSelectionRationaleReference: AthenaProviderSelectionRationaleKey;
  sourceModelRoutingChainReference: AthenaModelRoutingChainKey;
  adapterContractReference: ServerOnlyModelAdapterContractKey;
  dryRunReviewReference: ModelAdapterDryRunResultReviewKey;
  acceptanceMatrixReference: ModelAdapterDryRunAcceptanceMatrixKey;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  capabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  providerSlotLabel: AthenaModelRoutingProviderSlotLabel;
  backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
  localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
  runMode: ModelProviderPreviewMode;
  runAdmissionState: ModelProviderRunAdmissionState;
  promptPayloadPosture: ModelProviderPromptPayloadPosture;
  promptTransmissionState: ModelProviderPromptTransmissionState;
  credentialReferencePosture: ModelProviderCredentialReferencePosture;
  approvalReferencePosture: ModelProviderApprovalReferencePosture;
  auditReferencePosture: ModelProviderAuditReferencePosture;
  idempotencyKeyPosture: ModelProviderIdempotencyKeyPosture;
  replayBlockPosture: ModelProviderReplayBlockRequirement;
  singleRunLockPosture: ModelProviderSingleRunLockRequirement;
  manualConfirmationState: ModelProviderManualConfirmationState;
  killSwitchState: ModelProviderKillSwitchState;
  timeoutCancelPosture: ModelProviderTimeoutCancelPosture;
  costRatePosture: ModelProviderCostRatePosture;
  privacyRedactionPosture: ModelProviderPrivacyRedactionPosture;
  blockedDefaultReason: string;
  explicitNoExecutionStatement: ModelProviderNoExecutionStatement;
}>;

export type ModelProviderApprovalGateChecklistRecord = Readonly<{
  id: ModelProviderApprovalGateChecklistId;
  key: ModelProviderApprovalGateChecklistKey;
  checklistVersion: ModelProviderApprovalGateChecklistVersion;
  previewOnlyStatement: "approval gates are preview-only";
  label: string;
  requirementState: "required";
  summary: string;
  nextOperatorAction: string;
}>;

export type ModelProviderRunIntentBlockerRecord = Readonly<{
  blockerId: ModelProviderRunIntentBlockerId;
  key: ModelProviderRunIntentBlockerKey;
  blockerMatrixVersion: ModelProviderRunIntentBlockerMatrixVersion;
  previewOnlyStatement: "run intent blockers are preview-only";
  severity: ModelProviderRunIntentSeverity;
  affectedCapabilityFamilies: readonly AthenaModelRoutingCapabilityFamilyRecord[];
  affectedWorkspaceTargets: readonly AiModelProviderWorkspaceTarget[];
  operatorFacingExplanation: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

export type ModelProviderApprovalExpiryRevocationPreviewRecord = Readonly<{
  id: AthenaModelRoutingPreviewId;
  key: ModelProviderApprovalExpiryRevocationKey;
  previewVersion: ModelProviderApprovalExpiryRevocationPreviewVersion;
  previewOnlyStatement: "approval expiry and revocation are preview-only";
  approvalPacketReference: ModelProviderApprovalPacketKey;
  expiryPosture: ModelProviderApprovalLifecyclePosture;
  revocationPosture: ModelProviderApprovalLifecyclePosture;
  replayPreventionPosture: ModelProviderReplayBlockRequirement;
  staleApprovalReasonExamples: readonly string[];
  operatorReApprovalRequirement: "operator re-approval required";
  auditPosture: "not persisted";
  approvalPosture: "not persisted";
  recoveryPosture: "manual review only";
  explicitNoApprovedRunStatement:
    "No approved run. Approval expiry and revocation remain preview-only.";
}>;

export type ModelProviderApprovalPacketSummary = Readonly<{
  currentBatch: string;
  highestDetectedPhase: number;
  latestCompletedBatch: string;
  previousCompletedBatch: string;
  nextLikelyBatch: string;
  approvalPacketCount: number;
  runIntentCount: number;
  gateChecklistCount: number;
  blockerCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  summaryLines: readonly string[];
}>;

export type ModelProviderRunIntentSummary = Readonly<{
  currentBatch: string;
  nextLikelyBatch: string;
  runIntentCount: number;
  uniqueWorkspaceTargetCount: number;
  uniqueCapabilityFamilyCount: number;
  summaryLines: readonly string[];
}>;

export type ModelProviderRunIntentBlockerSummary = Readonly<{
  currentBatch: string;
  nextLikelyBatch: string;
  blockerCount: number;
  criticalBlockerCount: number;
  highBlockerCount: number;
  mediumBlockerCount: number;
  summaryLines: readonly string[];
}>;
