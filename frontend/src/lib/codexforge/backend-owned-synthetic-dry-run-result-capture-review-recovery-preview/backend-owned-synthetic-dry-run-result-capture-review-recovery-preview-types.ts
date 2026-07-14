import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
} from "../athena-model-routing-provider-selection-preview";
import type {
  BackendOwnedSyntheticDryRunResultCaptureContractRecord,
  ResultCaptureAuditApprovalJoinKey,
  ResultCaptureContractId,
  ResultCaptureContractKey,
  ResultCaptureErrorContractRecord,
  ResultCaptureErrorKey,
  ResultCaptureGateKey,
  ResultCaptureReadinessKey,
  ResultCaptureRequestContractRecord,
  ResultCaptureRequestKey,
  ResultCaptureResponseContractRecord,
  ResultCaptureResponseKey,
  SyntheticResultEnvelopeContractRecord,
  SyntheticResultEnvelopeKey,
} from "../backend-owned-synthetic-dry-run-result-capture-contract";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5098-5129 - Backend-Owned Synthetic Dry-Run Result Capture Review and Recovery Preview";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE =
  5129;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH =
  "5066-5097 - Backend-Owned Synthetic Dry-Run Result Capture Contract";

export const NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH =
  "5130-5161 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Contract";

export type ResultCaptureReviewId = ResultCaptureContractId;

export type ResultCaptureReviewVersion =
  "backend-owned-synthetic-dry-run-result-capture-review-preview-v1";
export type ResultCaptureDecisionReviewVersion =
  "backend-owned-synthetic-dry-run-result-capture-decision-review-preview-v1";
export type ResultCaptureGateFailureReviewVersion =
  "backend-owned-synthetic-dry-run-result-capture-gate-failure-review-preview-v1";
export type ResultCaptureRecoveryPlanVersion =
  "backend-owned-synthetic-dry-run-result-capture-recovery-plan-preview-v1";
export type ResultCaptureRecoveryReadinessChecklistVersion =
  "backend-owned-synthetic-dry-run-result-capture-recovery-readiness-checklist-v1";
export type ResultCaptureReviewAuditSummaryVersion =
  "backend-owned-synthetic-dry-run-result-capture-review-audit-summary-preview-v1";
export type ResultCaptureAcceptancePostureVersion =
  "backend-owned-synthetic-dry-run-result-capture-acceptance-posture-preview-v1";

export type ResultCaptureReviewSource = "Athena / Jarvis Model Gateway";
export type ResultCaptureReviewMode = "preview-only";
export type ResultCaptureReviewPosture =
  "result capture review / not persistent";
export type ResultCaptureDecisionState = "held / not captured";
export type ResultCaptureReviewPreviewOnlyStatement =
  "synthetic result capture review is preview-only";
export type ResultCaptureDecisionReviewPreviewOnlyStatement =
  "result capture decision review is preview-only";
export type ResultCaptureGateFailureReviewPreviewOnlyStatement =
  "result capture gate failure review is preview-only";
export type ResultCaptureRecoveryPlanPreviewOnlyStatement =
  "result capture recovery plan is preview-only";
export type ResultCaptureRecoveryReadinessPreviewOnlyStatement =
  "result capture recovery readiness is preview-only";
export type ResultCaptureReviewAuditSummaryPreviewOnlyStatement =
  "result capture review audit summary is preview-only";
export type ResultCaptureAcceptancePosturePreviewOnlyStatement =
  "result capture acceptance posture is preview-only";
export type ResultCaptureManualOperatorReviewRequirement =
  "manual operator review required";
export type ResultCaptureManualRecoveryReviewRequirement =
  "manual recovery review required";
export type ResultCaptureRecoveryPosture = "manual review only";
export type ResultCaptureRetryPosture = "disabled";
export type ResultCaptureFallbackPosture = "disabled";
export type ResultCaptureReviewSeverity = "critical" | "high" | "medium";
export type ResultCaptureReviewReferenceState = "not persisted";
export type ResultCaptureAuditSummaryPosture = "preview-only";
export type ResultCaptureAcceptanceState =
  "not accepted / preview-only";
export type ResultCaptureRecoveryReadinessState =
  | "blocked"
  | "manual review required"
  | "backend future required";
export type ResultCaptureRecoveryReadinessOwner =
  | "operator"
  | "backend future"
  | "safety review";
export type ResultCaptureNoResultCaptureNoPersistenceStatement =
  "No result capture. No persistence.";
export type ResultCaptureNoGatePassStatement =
  "Gate remains blocked. No gate pass is granted.";
export type ResultCaptureNoRetryNoFallbackNoPersistenceStatement =
  "No retry. No fallback. No persistence. Manual review only.";
export type ResultCaptureNoAcceptanceNoPersistenceStatement =
  "No acceptance. No persistence. Preview-only.";

export type ResultCaptureGateFailureId =
  | "synthetic-runner-skeleton-gate"
  | "synthetic-output-fixture-gate"
  | "synthetic-error-fixture-gate"
  | "synthetic-result-envelope-gate"
  | "result-capture-request-gate"
  | "result-capture-response-gate"
  | "result-capture-error-gate"
  | "audit-join-gate"
  | "approval-join-gate"
  | "operator-approval-gate"
  | "manual-confirmation-gate"
  | "kill-switch-gate"
  | "audit-gate"
  | "server-only-boundary-gate"
  | "opaque-credential-gate"
  | "privacy-redaction-gate"
  | "cost-rate-timeout-gate"
  | "idempotency-replay-gate"
  | "single-run-lock-gate"
  | "result-persistence-gate"
  | "audit-persistence-gate"
  | "approval-persistence-gate"
  | "artifact-persistence-gate"
  | "database-write-gate"
  | "file-write-gate"
  | "queue-dispatch-gate"
  | "worker-dispatch-gate"
  | "job-execution-gate";

export type ResultCaptureGateFailureLabel =
  | "synthetic runner skeleton gate failure"
  | "synthetic output fixture gate failure"
  | "synthetic error fixture gate failure"
  | "synthetic result envelope gate failure"
  | "result capture request gate failure"
  | "result capture response gate failure"
  | "result capture error gate failure"
  | "audit join gate failure"
  | "approval join gate failure"
  | "operator approval gate failure"
  | "manual confirmation gate failure"
  | "kill switch gate failure"
  | "audit gate failure"
  | "server-only boundary gate failure"
  | "opaque credential gate failure"
  | "privacy/redaction gate failure"
  | "cost/rate/timeout gate failure"
  | "idempotency/replay gate failure"
  | "single-run lock gate failure"
  | "result persistence gate failure"
  | "audit persistence gate failure"
  | "approval persistence gate failure"
  | "artifact persistence gate failure"
  | "database write gate failure"
  | "file write gate failure"
  | "queue dispatch gate failure"
  | "worker dispatch gate failure"
  | "job execution gate failure";

export type ResultCaptureGateFailureState =
  | "held / synthetic runner skeleton still review-only"
  | "held / synthetic output fixture static placeholder only"
  | "held / synthetic error fixture static placeholder only"
  | "held / synthetic result envelope preview-only"
  | "held / result capture request not created"
  | "held / result capture response not received"
  | "held / result capture error not received"
  | "held / audit join not persisted"
  | "held / approval join not persisted"
  | "held / operator approval missing"
  | "held / manual confirmation missing"
  | "held / kill switch review required"
  | "held / audit evidence missing"
  | "held / server-only boundary required"
  | "held / opaque credential reference required"
  | "held / privacy redaction incomplete"
  | "held / cost rate timeout review incomplete"
  | "held / idempotency replay block not proven"
  | "held / single-run lock missing"
  | "held / result persistence not implemented"
  | "held / audit persistence not implemented"
  | "held / approval persistence not implemented"
  | "held / artifact persistence not implemented"
  | "held / database write not implemented"
  | "held / file write not implemented"
  | "held / queue dispatch blocked"
  | "held / worker dispatch blocked"
  | "held / job execution blocked";

export type ResultCaptureRecoveryReadinessChecklistId =
  | "synthetic-runner-skeleton-reviewed"
  | "synthetic-output-fixture-reviewed"
  | "synthetic-error-fixture-reviewed"
  | "result-envelope-reviewed"
  | "capture-request-contract-reviewed"
  | "capture-response-contract-reviewed"
  | "capture-error-contract-reviewed"
  | "capture-gates-reviewed"
  | "capture-readiness-matrix-reviewed"
  | "audit-join-preview-reviewed"
  | "approval-join-preview-reviewed"
  | "result-digest-reviewed"
  | "result-id-reviewed"
  | "privacy-redaction-reviewed"
  | "cost-rate-reviewed"
  | "timeout-cancel-reviewed"
  | "idempotency-replay-reviewed"
  | "single-run-lock-reviewed"
  | "result-persistence-still-blocked"
  | "audit-persistence-still-blocked"
  | "approval-persistence-still-blocked"
  | "database-writes-still-blocked"
  | "file-writes-still-blocked"
  | "queue-dispatch-still-blocked"
  | "worker-dispatch-still-blocked"
  | "job-execution-still-blocked";

export type ResultCaptureRecoveryReadinessChecklistLabel =
  | "synthetic runner skeleton reviewed"
  | "synthetic output fixture reviewed"
  | "synthetic error fixture reviewed"
  | "result envelope reviewed"
  | "capture request contract reviewed"
  | "capture response contract reviewed"
  | "capture error contract reviewed"
  | "capture gates reviewed"
  | "capture readiness matrix reviewed"
  | "audit join preview reviewed"
  | "approval join preview reviewed"
  | "result digest reviewed"
  | "result id reviewed"
  | "privacy/redaction reviewed"
  | "cost/rate reviewed"
  | "timeout/cancel reviewed"
  | "idempotency/replay reviewed"
  | "single-run lock reviewed"
  | "result persistence still blocked"
  | "audit persistence still blocked"
  | "approval persistence still blocked"
  | "database writes still blocked"
  | "file writes still blocked"
  | "queue dispatch still blocked"
  | "worker dispatch still blocked"
  | "job execution still blocked";

export type ResultCaptureReviewKey =
  `backend-owned-synthetic-dry-run-result-capture-review:${ResultCaptureReviewId}`;
export type ResultCaptureDecisionReviewKey =
  `backend-owned-synthetic-dry-run-result-capture-decision-review:${ResultCaptureReviewId}`;
export type ResultCaptureGateFailureReviewKey =
  `backend-owned-synthetic-dry-run-result-capture-gate-failure-review:${ResultCaptureReviewId}:${ResultCaptureGateFailureId}`;
export type ResultCaptureRecoveryPlanKey =
  `backend-owned-synthetic-dry-run-result-capture-recovery-plan:${ResultCaptureReviewId}`;
export type ResultCaptureRecoveryReadinessChecklistKey =
  `backend-owned-synthetic-dry-run-result-capture-recovery-readiness:${ResultCaptureRecoveryReadinessChecklistId}`;
export type ResultCaptureReviewAuditSummaryKey =
  `backend-owned-synthetic-dry-run-result-capture-review-audit-summary:${ResultCaptureReviewId}`;
export type ResultCaptureAcceptancePostureKey =
  `backend-owned-synthetic-dry-run-result-capture-acceptance-posture:${ResultCaptureReviewId}`;

export type BackendOwnedSyntheticDryRunResultCaptureReviewRecord = Readonly<{
  id: ResultCaptureReviewId;
  key: ResultCaptureReviewKey;
  reviewVersion: ResultCaptureReviewVersion;
  previewOnlyStatement: ResultCaptureReviewPreviewOnlyStatement;
  source: ResultCaptureReviewSource;
  reviewMode: ResultCaptureReviewMode;
  reviewPosture: ResultCaptureReviewPosture;
  label: string;
  operatorRequestPhrase: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  sourceResultCaptureContractReference: ResultCaptureContractKey;
  sourceSyntheticResultEnvelopeReference: SyntheticResultEnvelopeKey;
  sourceResultCaptureRequestReference: ResultCaptureRequestKey;
  sourceResultCaptureResponseReference: ResultCaptureResponseKey;
  sourceResultCaptureErrorReference: ResultCaptureErrorKey;
  sourceResultCaptureGateReference: ResultCaptureGateKey;
  sourceResultCaptureReadinessReference: ResultCaptureReadinessKey;
  sourceResultCaptureAuditApprovalJoinReference: ResultCaptureAuditApprovalJoinKey;
  sourceSyntheticRunnerSkeletonReference:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["sourceSyntheticRunnerSkeletonReference"];
  sourceSyntheticOutputFixtureReference:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["sourceSyntheticOutputFixtureReference"];
  sourceSyntheticErrorFixtureReference:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["sourceSyntheticErrorFixtureReference"];
  sourceRunIntentReference:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["sourceRunIntentReference"];
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  providerSlotLabel:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["providerSlotLabel"];
  backupProviderSlotLabel:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["backupProviderSlotLabel"];
  localPrivateAlternativeLabel:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["localPrivateAlternativeLabel"];
  resultCaptureState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["resultCaptureState"];
  resultPersistenceState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["resultPersistenceState"];
  auditPersistenceState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["auditPersistenceState"];
  approvalPersistenceState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["approvalPersistenceState"];
  artifactPersistenceState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["artifactPersistenceState"];
  databaseWriteState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["databaseWriteState"];
  fileWriteState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["fileWriteState"];
  providerResponseState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["providerResponseState"];
  modelOutputState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["modelOutputState"];
  syntheticFixtureResultState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["syntheticFixtureResultState"];
  resultEnvelopeState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["resultEnvelopeState"];
  resultIdState:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["resultIdState"];
  resultDigestPosture:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["resultDigestPosture"];
  auditJoinState: SyntheticResultEnvelopeContractRecord["auditJoinState"];
  approvalJoinState: SyntheticResultEnvelopeContractRecord["approvalJoinState"];
  providerCallPosture:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["providerCallPosture"];
  modelCallPosture:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["modelCallPosture"];
  promptSendingPosture:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["promptSendingPosture"];
  sdkPosture: BackendOwnedSyntheticDryRunResultCaptureContractRecord["sdkPosture"];
  credentialPosture:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["credentialPosture"];
  secretPosture:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["secretPosture"];
  frontendPosture:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["frontendPosture"];
  backendPosture:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["backendPosture"];
  executionPosture:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["executionPosture"];
  manualOperatorReviewRequired: ResultCaptureManualOperatorReviewRequirement;
  manualRecoveryReviewRequired: ResultCaptureManualRecoveryReviewRequirement;
  manualApprovalRequired:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["manualApprovalRequired"];
  manualConfirmationRequired:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["manualConfirmationRequired"];
  killSwitchRequired:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["killSwitchRequired"];
  auditRequired:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["auditRequired"];
  privacyRedactionRequired:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["privacyRedactionRequired"];
  costAcknowledgementRequired:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["costAcknowledgementRequired"];
  rateLimitGuardRequired:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["rateLimitGuardRequired"];
  timeoutCancelGuardRequired:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["timeoutCancelGuardRequired"];
  idempotencyRequired:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["idempotencyRequired"];
  replayBlockRequired:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["replayBlockRequired"];
  singleRunLockRequired:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["singleRunLockRequired"];
  noRetryExecution:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["noRetryExecution"];
  noFallbackExecution:
    BackendOwnedSyntheticDryRunResultCaptureContractRecord["noFallbackExecution"];
  nextAuditAndApprovalJoinContractRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
}>;

export type ResultCaptureDecisionReviewRecord = Readonly<{
  key: ResultCaptureDecisionReviewKey;
  decisionReviewVersion: ResultCaptureDecisionReviewVersion;
  previewOnlyStatement: ResultCaptureDecisionReviewPreviewOnlyStatement;
  resultCaptureReviewId: ResultCaptureReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  sourceCaptureContractReference: ResultCaptureContractKey;
  sourceEnvelopeReference: SyntheticResultEnvelopeKey;
  sourceCaptureRequestReference: ResultCaptureRequestKey;
  sourceCaptureResponseReference: ResultCaptureResponseKey;
  sourceCaptureErrorReference: ResultCaptureErrorKey;
  decisionState: ResultCaptureDecisionState;
  captureReasonSummary: string;
  topBlockingGates: readonly ResultCaptureGateFailureLabel[];
  topMissingEvidence: readonly string[];
  operatorReviewNotes: readonly string[];
  manualRecoveryRequirement: string;
  auditApprovalJoinDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
  nextSafeAction: string;
  explicitNoResultCaptureNoPersistenceStatement:
    ResultCaptureNoResultCaptureNoPersistenceStatement;
}>;

export type ResultCaptureGateFailureReviewRecord = Readonly<{
  key: ResultCaptureGateFailureReviewKey;
  gateFailureReviewVersion: ResultCaptureGateFailureReviewVersion;
  previewOnlyStatement: ResultCaptureGateFailureReviewPreviewOnlyStatement;
  resultCaptureReviewId: ResultCaptureReviewId;
  label: string;
  failedGateId: ResultCaptureGateFailureId;
  failedGateLabel: ResultCaptureGateFailureLabel;
  gateState: ResultCaptureGateFailureState;
  severity: ResultCaptureReviewSeverity;
  affectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  affectedWorkspaceTarget: AiModelProviderWorkspaceTarget;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  auditApprovalJoinDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
  nextSafeAction: string;
  explicitNoGatePassStatement: ResultCaptureNoGatePassStatement;
}>;

export type ResultCaptureRecoveryPlanPreviewRecord = Readonly<{
  key: ResultCaptureRecoveryPlanKey;
  recoveryPlanVersion: ResultCaptureRecoveryPlanVersion;
  previewOnlyStatement: ResultCaptureRecoveryPlanPreviewOnlyStatement;
  resultCaptureReviewId: ResultCaptureReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  recoveryPosture: ResultCaptureRecoveryPosture;
  missingSyntheticOutputRecovery: string;
  missingSyntheticErrorRecovery: string;
  resultEnvelopeReviewRecovery: string;
  captureRequestNotCreatedRecovery: string;
  captureResponseNotReceivedRecovery: string;
  captureErrorNotReceivedRecovery: string;
  resultIdNotIssuedRecovery: string;
  digestPreviewReviewRecovery: string;
  auditJoinMissingRecovery: string;
  approvalJoinMissingRecovery: string;
  resultPersistenceMissingRecovery: string;
  auditPersistenceMissingRecovery: string;
  approvalPersistenceMissingRecovery: string;
  artifactPersistenceMissingRecovery: string;
  databaseWriteBlockedRecovery: string;
  fileWriteBlockedRecovery: string;
  queueDispatchBlockedRecovery: string;
  workerDispatchBlockedRecovery: string;
  jobExecutionBlockedRecovery: string;
  privacyRedactionRecovery: string;
  retryPosture: ResultCaptureRetryPosture;
  fallbackPosture: ResultCaptureFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
  explicitNoRetryNoFallbackNoPersistenceStatement:
    ResultCaptureNoRetryNoFallbackNoPersistenceStatement;
}>;

export type ResultCaptureRecoveryReadinessChecklistRecord = Readonly<{
  key: ResultCaptureRecoveryReadinessChecklistKey;
  checklistVersion: ResultCaptureRecoveryReadinessChecklistVersion;
  previewOnlyStatement: ResultCaptureRecoveryReadinessPreviewOnlyStatement;
  checklistId: ResultCaptureRecoveryReadinessChecklistId;
  label: ResultCaptureRecoveryReadinessChecklistLabel;
  state: ResultCaptureRecoveryReadinessState;
  severity: ResultCaptureReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ResultCaptureRecoveryReadinessOwner;
  currentPosture: ResultCaptureReviewMode;
  auditApprovalJoinContractDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
  nextSafeAction: string;
}>;

export type ResultCaptureReviewAuditSummaryRecord = Readonly<{
  key: ResultCaptureReviewAuditSummaryKey;
  auditSummaryVersion: ResultCaptureReviewAuditSummaryVersion;
  previewOnlyStatement:
    ResultCaptureReviewAuditSummaryPreviewOnlyStatement;
  resultCaptureReviewId: ResultCaptureReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  auditPosture: ResultCaptureAuditSummaryPosture;
  auditReferenceState: ResultCaptureReviewReferenceState;
  approvalReferenceState: ResultCaptureReviewReferenceState;
  resultReferenceState: ResultCaptureReviewReferenceState;
  evidenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noResultPersistenceStatement: "No result persistence";
  noAuditPersistenceStatement: "No audit persistence";
  noApprovalPersistenceStatement: "No approval persistence";
  noDatabaseWriteStatement: "No database write";
  noFileWriteStatement: "No file write";
  auditApprovalJoinContractRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
}>;

export type ResultCaptureAcceptancePostureRecord = Readonly<{
  key: ResultCaptureAcceptancePostureKey;
  acceptancePostureVersion: ResultCaptureAcceptancePostureVersion;
  previewOnlyStatement: ResultCaptureAcceptancePosturePreviewOnlyStatement;
  resultCaptureReviewId: ResultCaptureReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  acceptanceState: ResultCaptureAcceptanceState;
  acceptanceBlockers: readonly string[];
  safetyBlockers: readonly string[];
  privacyBlockers: readonly string[];
  costRateBlockers: readonly string[];
  auditBlockers: readonly string[];
  approvalBlockers: readonly string[];
  captureBlockers: readonly string[];
  persistenceBlockers: readonly string[];
  databaseFileBlockers: readonly string[];
  queueWorkerJobBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitNoAcceptanceNoPersistenceStatement:
    ResultCaptureNoAcceptanceNoPersistenceStatement;
}>;

export type ResultCaptureReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  reviewCount: number;
  reviews: readonly BackendOwnedSyntheticDryRunResultCaptureReviewRecord[];
}>;

export type ResultCaptureReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  reviewCount: number;
  reviews: readonly BackendOwnedSyntheticDryRunResultCaptureReviewRecord[];
}>;

export type ResultCaptureReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
  reviewCount: number;
  decisionReviewCount: number;
  gateFailureReviewCount: number;
  recoveryPlanCount: number;
  recoveryReadinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  summaryLines: readonly string[];
}>;

export type ResultCaptureGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  gateFailureReviewCount: number;
  uniqueFailedGateCount: number;
  criticalGateCount: number;
  highGateCount: number;
  mediumGateCount: number;
  summaryLines: readonly string[];
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
}>;

export type ResultCaptureRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  recoveryPlanCount: number;
  recoveryReadinessChecklistCount: number;
  blockedChecklistCount: number;
  acceptancePostureCount: number;
  summaryLines: readonly string[];
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
  nextSafeAction: string;
}>;
