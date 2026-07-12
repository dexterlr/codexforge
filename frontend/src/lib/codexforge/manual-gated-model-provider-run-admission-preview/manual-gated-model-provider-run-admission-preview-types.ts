import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
  AthenaModelRoutingPreviewId,
  AthenaModelRoutingProviderSlotLabel,
} from "../athena-model-routing-provider-selection-preview";
import type {
  ModelProviderApprovalExpiryRevocationKey,
  ModelProviderApprovalGateChecklistKey,
  ModelProviderApprovalPacketKey,
  ModelProviderRunIntentBlockerKey,
  ModelProviderRunIntentKey,
} from "../model-provider-approval-packet-run-intent-preview";

export const MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH =
  "4874-4905 - Manual Gated Model Provider Run Admission Preview";

export const MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_PHASE = 4905;

export const NEXT_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "4906-4937 - Model Provider Run Admission Review and Recovery Preview";

export type ManualRunAdmissionPreviewVersion =
  "manual-gated-model-provider-run-admission-preview-v1";
export type ManualRunAdmissionGateEvaluationVersion =
  "manual-run-admission-gate-evaluation-preview-v1";
export type ManualRunAdmissionTicketPreviewVersion =
  "manual-run-admission-ticket-preview-v1";
export type ManualRunAdmissionDenialRecoveryPreviewVersion =
  "manual-run-admission-denial-recovery-preview-v1";
export type ManualRunAdmissionBlockerMatrixVersion =
  "manual-run-admission-blocker-matrix-preview-v1";
export type ManualRunAdmissionAuditPreviewVersion =
  "manual-run-admission-audit-preview-v1";

export type ManualRunAdmissionPreviewOnlyStatement =
  "run admission is preview-only";
export type ManualRunAdmissionGatePreviewOnlyStatement =
  "gate evaluation is preview-only";
export type ManualRunAdmissionTicketPreviewOnlyStatement =
  "admission ticket is preview-only";
export type ManualRunAdmissionBlockerPreviewOnlyStatement =
  "admission blockers are preview-only";
export type ManualRunAdmissionSource = "Athena / Jarvis Model Gateway";
export type ManualRunAdmissionMode = "manual gated preview-only";
export type ManualRunAdmissionPosture = "not admitted";
export type ManualRunAdmissionProviderCallPosture = "not implemented";
export type ManualRunAdmissionModelCallPosture = "not implemented";
export type ManualRunAdmissionPromptSendingPosture = "not implemented";
export type ManualRunAdmissionSdkPosture = "no SDK imports";
export type ManualRunAdmissionCredentialPosture =
  "opaque credential references only";
export type ManualRunAdmissionSecretPosture = "no plaintext secrets";
export type ManualRunAdmissionFrontendPosture = "blocked";
export type ManualRunAdmissionBackendPosture = "server-only required";
export type ManualRunAdmissionExecutionPosture = "blocked by default";
export type ManualRunAdmissionDecisionState = "preview-only / held";
export type ManualRunAdmissionTokenState = "not issued";
export type ManualRunAdmissionLeaseState = "not created";
export type ManualRunAdmissionDispatchState = "not dispatched";
export type ManualRunAdmissionJobExecutionState = "not executed";
export type ManualRunAdmissionPromptPayloadPosture =
  "redacted placeholder only";
export type ManualRunAdmissionPromptTransmissionState = "not sent";
export type ManualRunAdmissionCredentialReferencePosture =
  "opaque label only";
export type ManualRunAdmissionIdempotencyKeyPosture =
  "deterministic preview key only";
export type ManualRunAdmissionManualApprovalRequirement =
  "manual approval required";
export type ManualRunAdmissionManualConfirmationRequirement =
  "manual confirmation required";
export type ManualRunAdmissionKillSwitchRequirement =
  "kill switch required";
export type ManualRunAdmissionAuditRequirement = "audit required";
export type ManualRunAdmissionPrivacyRedactionRequirement =
  "privacy/redaction required";
export type ManualRunAdmissionCostAcknowledgementRequirement =
  "cost acknowledgement required";
export type ManualRunAdmissionRateLimitGuardRequirement =
  "rate limit guard required";
export type ManualRunAdmissionTimeoutCancelGuardRequirement =
  "timeout/cancel guard required";
export type ManualRunAdmissionIdempotencyRequirement =
  "idempotency required";
export type ManualRunAdmissionReplayBlockRequirement =
  "replay block required";
export type ManualRunAdmissionSingleRunLockRequirement =
  "single-run lock required";
export type ManualRunAdmissionDryRunResultReviewRequirement =
  "dry-run result review required";
export type ManualRunAdmissionAcceptanceMatrixReviewRequirement =
  "acceptance matrix review required";
export type ManualRunAdmissionApprovalExpiryReviewRequirement =
  "approval expiry review required";
export type ManualRunAdmissionApprovalRevocationReviewRequirement =
  "approval revocation review required";
export type ManualRunAdmissionRetryExecutionPosture =
  "no retry execution";
export type ManualRunAdmissionFallbackExecutionPosture =
  "no fallback execution";
export type ManualRunAdmissionResultCaptureRequirement =
  "result capture required in future";
export type ManualRunAdmissionPersistenceState = "not implemented";
export type ManualRunAdmissionReviewRecoveryRequirement =
  "run admission review and recovery preview next";
export type ManualRunAdmissionGateState =
  | "manual approval required / not satisfied"
  | "manual confirmation required / not satisfied"
  | "kill switch required / engaged"
  | "audit required / not persisted"
  | "server-only required / frontend blocked"
  | "opaque credential reference required / not bound"
  | "prompt payload review required / redacted placeholder only"
  | "privacy/redaction required / incomplete"
  | "cost/rate/timeout review required / incomplete"
  | "idempotency/replay required / preview-only"
  | "single-run lock required / not created"
  | "dry-run result review required / pending"
  | "acceptance matrix review required / unresolved"
  | "approval expiry review required / not validated"
  | "approval revocation review required / not validated"
  | "persistence not implemented / blocked";
export type ManualRunAdmissionOverallGateDecision = "held / not admitted";
export type ManualRunAdmissionExplicitNoAdmissionStatement =
  "No admission is granted. Provider execution stays blocked.";
export type ManualRunAdmissionTicketState = "not issued";
export type ManualRunAdmissionTicketMode = "preview-only";
export type ManualRunAdmissionResultCaptureState = "not implemented";
export type ManualRunAdmissionJoinState = "not persisted";
export type ManualRunAdmissionExplicitNoTicketStatement =
  "No ticket issued. No queue dispatch. No worker dispatch. No job execution.";
export type ManualRunAdmissionRetryPosture = "disabled";
export type ManualRunAdmissionFallbackPosture = "disabled";
export type ManualRunAdmissionRecoveryPosture = "manual review only";
export type ManualRunAdmissionExplicitNoRetryFallbackExecutionStatement =
  "No retry. No fallback. No execution. Manual review only.";
export type ManualRunAdmissionBlockerSeverity = "critical" | "high" | "medium";
export type ManualRunAdmissionAuditPosture = "preview-only";
export type ManualRunAdmissionReferenceState = "not persisted";
export type ManualRunAdmissionOperatorReviewRequirement =
  "operator review required";
export type ManualRunAdmissionBlockedActionStatement = "No provider execution";
export type ManualRunAdmissionDispatchBlockedStatement =
  | "No queue dispatch"
  | "No worker dispatch";
export type ManualRunAdmissionJobBlockedStatement = "No job execution";
export type ManualRunAdmissionPersistenceBlockedStatement = "No persistence";

export type ManualRunAdmissionPreviewKey =
  `manual-run-admission-preview:${AthenaModelRoutingPreviewId}`;
export type ManualRunAdmissionGateEvaluationKey =
  `manual-run-admission-gate-evaluation:${AthenaModelRoutingPreviewId}`;
export type ManualRunAdmissionTicketPreviewKey =
  `manual-run-admission-ticket-preview:${AthenaModelRoutingPreviewId}`;
export type ManualRunAdmissionDenialRecoveryKey =
  `manual-run-admission-denial-recovery:${AthenaModelRoutingPreviewId}`;
export type ManualRunAdmissionAuditPreviewKey =
  `manual-run-admission-audit-preview:${AthenaModelRoutingPreviewId}`;

export type ManualRunAdmissionBlockerId =
  | "admission-preview-only"
  | "run-intent-not-admitted"
  | "admission-token-not-issued"
  | "admission-lease-not-created"
  | "no-manual-approval"
  | "no-manual-confirmation"
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
  | "approval-persistence-not-implemented"
  | "provider-sdk-unavailable-blocked-in-frontend"
  | "provider-execution-blocked-by-default"
  | "queue-dispatch-blocked"
  | "worker-dispatch-blocked"
  | "job-execution-blocked";

export type ManualRunAdmissionBlockerKey =
  `manual-run-admission-blocker:${ManualRunAdmissionBlockerId}`;

export type ManualRunAdmissionCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  admissionPreviewCount: number;
  admissionPreviews: readonly ManualRunAdmissionPreviewRecord[];
}>;

export type ManualRunAdmissionWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  admissionPreviewCount: number;
  admissionPreviews: readonly ManualRunAdmissionPreviewRecord[];
}>;

export type ManualRunAdmissionPreviewRecord = Readonly<{
  id: AthenaModelRoutingPreviewId;
  key: ManualRunAdmissionPreviewKey;
  admissionPreviewVersion: ManualRunAdmissionPreviewVersion;
  previewOnlyStatement: ManualRunAdmissionPreviewOnlyStatement;
  source: ManualRunAdmissionSource;
  admissionMode: ManualRunAdmissionMode;
  runAdmissionPosture: ManualRunAdmissionPosture;
  providerCallPosture: ManualRunAdmissionProviderCallPosture;
  modelCallPosture: ManualRunAdmissionModelCallPosture;
  promptSendingPosture: ManualRunAdmissionPromptSendingPosture;
  sdkPosture: ManualRunAdmissionSdkPosture;
  credentialPosture: ManualRunAdmissionCredentialPosture;
  secretPosture: ManualRunAdmissionSecretPosture;
  frontendPosture: ManualRunAdmissionFrontendPosture;
  backendPosture: ManualRunAdmissionBackendPosture;
  executionPosture: ManualRunAdmissionExecutionPosture;
  label: string;
  operatorRequestPhrase: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  sourceApprovalPacketReference: ModelProviderApprovalPacketKey;
  sourceRunIntentReference: ModelProviderRunIntentKey;
  sourceApprovalGateChecklistReference: ModelProviderApprovalGateChecklistKey;
  sourceRunIntentBlockerReference: ModelProviderRunIntentBlockerKey;
  sourceApprovalExpiryRevocationReference: ModelProviderApprovalExpiryRevocationKey;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  providerSlotLabel: AthenaModelRoutingProviderSlotLabel;
  backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
  localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
  runAdmissionState: ManualRunAdmissionPosture;
  admissionDecisionState: ManualRunAdmissionDecisionState;
  admissionTokenState: ManualRunAdmissionTokenState;
  admissionLeaseState: ManualRunAdmissionLeaseState;
  queueDispatchState: ManualRunAdmissionDispatchState;
  workerDispatchState: ManualRunAdmissionDispatchState;
  jobExecutionState: ManualRunAdmissionJobExecutionState;
  promptPayloadPosture: ManualRunAdmissionPromptPayloadPosture;
  promptTransmissionState: ManualRunAdmissionPromptTransmissionState;
  credentialReferencePosture: ManualRunAdmissionCredentialReferencePosture;
  manualApprovalRequired: ManualRunAdmissionManualApprovalRequirement;
  manualConfirmationRequired: ManualRunAdmissionManualConfirmationRequirement;
  killSwitchRequired: ManualRunAdmissionKillSwitchRequirement;
  auditRequired: ManualRunAdmissionAuditRequirement;
  privacyRedactionRequired: ManualRunAdmissionPrivacyRedactionRequirement;
  costAcknowledgementRequired: ManualRunAdmissionCostAcknowledgementRequirement;
  rateLimitGuardRequired: ManualRunAdmissionRateLimitGuardRequirement;
  timeoutCancelGuardRequired: ManualRunAdmissionTimeoutCancelGuardRequirement;
  idempotencyRequired: ManualRunAdmissionIdempotencyRequirement;
  replayBlockRequired: ManualRunAdmissionReplayBlockRequirement;
  singleRunLockRequired: ManualRunAdmissionSingleRunLockRequirement;
  dryRunResultReviewRequired: ManualRunAdmissionDryRunResultReviewRequirement;
  acceptanceMatrixReviewRequired: ManualRunAdmissionAcceptanceMatrixReviewRequirement;
  approvalExpiryReviewRequired: ManualRunAdmissionApprovalExpiryReviewRequirement;
  approvalRevocationReviewRequired: ManualRunAdmissionApprovalRevocationReviewRequirement;
  noRetryExecution: ManualRunAdmissionRetryExecutionPosture;
  noFallbackExecution: ManualRunAdmissionFallbackExecutionPosture;
  resultCaptureRequiredInFuture: ManualRunAdmissionResultCaptureRequirement;
  resultPersistenceState: ManualRunAdmissionPersistenceState;
  auditPersistenceState: ManualRunAdmissionPersistenceState;
  approvalPersistenceState: ManualRunAdmissionPersistenceState;
  nextRunAdmissionReviewRecoveryRequirement: ManualRunAdmissionReviewRecoveryRequirement;
}>;

export type ManualRunAdmissionGateEvaluationRecord = Readonly<{
  id: AthenaModelRoutingPreviewId;
  key: ManualRunAdmissionGateEvaluationKey;
  gateEvaluationVersion: ManualRunAdmissionGateEvaluationVersion;
  previewOnlyStatement: ManualRunAdmissionGatePreviewOnlyStatement;
  admissionPreviewId: AthenaModelRoutingPreviewId;
  sourceApprovalPacketReference: ModelProviderApprovalPacketKey;
  sourceRunIntentReference: ModelProviderRunIntentKey;
  operatorApprovalGateState: ManualRunAdmissionGateState;
  manualConfirmationGateState: ManualRunAdmissionGateState;
  killSwitchGateState: ManualRunAdmissionGateState;
  auditGateState: ManualRunAdmissionGateState;
  serverOnlyAdapterGateState: ManualRunAdmissionGateState;
  opaqueCredentialGateState: ManualRunAdmissionGateState;
  promptPayloadReviewGateState: ManualRunAdmissionGateState;
  privacyRedactionGateState: ManualRunAdmissionGateState;
  costRateTimeoutGateState: ManualRunAdmissionGateState;
  idempotencyReplayGateState: ManualRunAdmissionGateState;
  singleRunLockGateState: ManualRunAdmissionGateState;
  dryRunResultReviewGateState: ManualRunAdmissionGateState;
  acceptanceMatrixGateState: ManualRunAdmissionGateState;
  approvalExpiryGateState: ManualRunAdmissionGateState;
  approvalRevocationGateState: ManualRunAdmissionGateState;
  persistenceGateState: ManualRunAdmissionGateState;
  overallGateDecision: ManualRunAdmissionOverallGateDecision;
  blockedDefaultReason: string;
  explicitNoAdmissionStatement: ManualRunAdmissionExplicitNoAdmissionStatement;
}>;

export type ManualRunAdmissionTicketPreviewRecord = Readonly<{
  id: AthenaModelRoutingPreviewId;
  key: ManualRunAdmissionTicketPreviewKey;
  ticketPreviewVersion: ManualRunAdmissionTicketPreviewVersion;
  previewOnlyStatement: ManualRunAdmissionTicketPreviewOnlyStatement;
  admissionPreviewId: AthenaModelRoutingPreviewId;
  sourceRunIntentReference: ModelProviderRunIntentKey;
  ticketState: ManualRunAdmissionTicketState;
  ticketMode: ManualRunAdmissionTicketMode;
  admissionTokenState: ManualRunAdmissionTokenState;
  admissionLeaseState: ManualRunAdmissionLeaseState;
  idempotencyKeyPosture: ManualRunAdmissionIdempotencyKeyPosture;
  replayBlockPosture: ManualRunAdmissionReplayBlockRequirement;
  singleRunLockPosture: ManualRunAdmissionSingleRunLockRequirement;
  timeoutCancelPosture: ManualRunAdmissionTimeoutCancelGuardRequirement;
  queueDispatchState: ManualRunAdmissionDispatchState;
  workerDispatchState: ManualRunAdmissionDispatchState;
  jobExecutionState: ManualRunAdmissionJobExecutionState;
  resultCaptureState: ManualRunAdmissionResultCaptureState;
  auditJoinState: ManualRunAdmissionJoinState;
  approvalJoinState: ManualRunAdmissionJoinState;
  blockedDefaultReason: string;
  explicitNoTicketNoExecutionStatement: ManualRunAdmissionExplicitNoTicketStatement;
}>;

export type ManualRunAdmissionDenialRecoveryPreviewRecord = Readonly<{
  id: AthenaModelRoutingPreviewId;
  key: ManualRunAdmissionDenialRecoveryKey;
  denialRecoveryPreviewVersion: ManualRunAdmissionDenialRecoveryPreviewVersion;
  admissionPreviewId: AthenaModelRoutingPreviewId;
  deniedReasonExamples: readonly string[];
  missingManualApprovalRecovery: string;
  missingManualConfirmationRecovery: string;
  killSwitchActiveRecovery: string;
  approvalExpiredRecovery: string;
  approvalRevokedRecovery: string;
  missingOpaqueCredentialRecovery: string;
  promptPayloadNotReviewedRecovery: string;
  privacyRedactionIncompleteRecovery: string;
  costRateTimeoutIncompleteRecovery: string;
  dryRunReviewMissingRecovery: string;
  acceptanceMatrixUnresolvedRecovery: string;
  auditPersistenceMissingRecovery: string;
  resultPersistenceMissingRecovery: string;
  retryPosture: ManualRunAdmissionRetryPosture;
  fallbackPosture: ManualRunAdmissionFallbackPosture;
  recoveryPosture: ManualRunAdmissionRecoveryPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation: string;
  explicitNoRetryNoFallbackNoExecutionStatement: ManualRunAdmissionExplicitNoRetryFallbackExecutionStatement;
}>;

export type ManualRunAdmissionBlockerRecord = Readonly<{
  blockerId: ManualRunAdmissionBlockerId;
  key: ManualRunAdmissionBlockerKey;
  blockerMatrixVersion: ManualRunAdmissionBlockerMatrixVersion;
  previewOnlyStatement: ManualRunAdmissionBlockerPreviewOnlyStatement;
  severity: ManualRunAdmissionBlockerSeverity;
  affectedCapabilityFamilies: readonly AthenaModelRoutingCapabilityFamilyRecord[];
  affectedWorkspaceTargets: readonly AiModelProviderWorkspaceTarget[];
  operatorFacingExplanation: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

export type ManualRunAdmissionAuditPreviewRecord = Readonly<{
  id: AthenaModelRoutingPreviewId;
  key: ManualRunAdmissionAuditPreviewKey;
  auditPreviewVersion: ManualRunAdmissionAuditPreviewVersion;
  admissionPreviewId: AthenaModelRoutingPreviewId;
  auditPosture: ManualRunAdmissionAuditPosture;
  auditReferenceState: ManualRunAdmissionReferenceState;
  approvalReferenceState: ManualRunAdmissionReferenceState;
  resultReferenceState: ManualRunAdmissionReferenceState;
  operatorReviewRequired: ManualRunAdmissionOperatorReviewRequirement;
  gateEvidenceSummary: string;
  blockedActionSummary: string;
  noQueueDispatchStatement: ManualRunAdmissionDispatchBlockedStatement;
  noWorkerDispatchStatement: ManualRunAdmissionDispatchBlockedStatement;
  noJobExecutionStatement: ManualRunAdmissionJobBlockedStatement;
  noProviderExecutionStatement: ManualRunAdmissionBlockedActionStatement;
  noPersistenceStatement: ManualRunAdmissionPersistenceBlockedStatement;
  nextReviewRecoveryRequirement: ManualRunAdmissionReviewRecoveryRequirement;
}>;

export type ManualRunAdmissionSummary = Readonly<{
  currentBatch: string;
  highestDetectedPhase: number;
  latestCompletedBatch: string;
  previousCompletedBatch: string;
  nextLikelyBatch: string;
  admissionPreviewCount: number;
  gateEvaluationCount: number;
  ticketPreviewCount: number;
  denialRecoveryCount: number;
  blockerCount: number;
  auditPreviewCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  summaryLines: readonly string[];
}>;

export type ManualRunAdmissionGateSummary = Readonly<{
  currentBatch: string;
  nextLikelyBatch: string;
  gateEvaluationCount: number;
  heldDecisionCount: number;
  summaryLines: readonly string[];
}>;

export type ManualRunAdmissionBlockerSummary = Readonly<{
  currentBatch: string;
  nextLikelyBatch: string;
  blockerCount: number;
  criticalBlockerCount: number;
  highBlockerCount: number;
  mediumBlockerCount: number;
  summaryLines: readonly string[];
}>;
