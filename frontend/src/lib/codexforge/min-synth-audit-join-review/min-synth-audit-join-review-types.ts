import type { AiModelProviderWorkspaceTarget } from "../ai-provider-registry";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
} from "../minimal-synth-exec-review";
import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord,
  SyntheticResultCaptureOutputReviewRecord,
} from "../min-synth-capture-review";
import type { SyntheticResultCaptureOutputKey } from "../min-synth-result-capture";
import type {
  MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpKey,
  MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecord,
  MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId,
  SyntheticApprovalJoinOutputKey,
  SyntheticAuditApprovalEvidencePacketKey,
  SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryKey,
  SyntheticAuditApprovalJoinEnvelopeKey,
  SyntheticAuditApprovalJoinGateId,
  SyntheticAuditApprovalJoinInputKey,
  SyntheticAuditApprovalJoinSafetyGateSummaryKey,
  SyntheticAuditJoinOutputKey,
  SyntheticApprovalJoinPreviewKey,
  SyntheticAuditJoinPreviewKey,
} from "../min-synth-audit-join/min-synth-audit-join-types";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5546-5577 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE =
  5577;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH =
  "5514-5545 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH =
  "5578-5609 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP";

export const SYNTHETIC_AUDIT_APPROVAL_JOIN_REVIEW_SECTION_TITLES = [
  "Backend-owned minimal synthetic audit and approval join review",
  "Synthetic audit and approval join output review",
  "Synthetic audit and approval join gate failure review",
  "Synthetic audit and approval join recovery plan",
  "Synthetic audit and approval join recovery readiness",
  "Synthetic audit and approval join review audit summary",
  "Synthetic audit and approval join acceptance posture",
] as const;

export type MinimalSyntheticAuditApprovalJoinReviewId =
  MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;

export type MinimalSyntheticAuditApprovalJoinReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-review-preview-v1";
export type MinimalSyntheticAuditApprovalJoinOutputReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-output-review-preview-v1";
export type MinimalSyntheticAuditApprovalJoinGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-gate-failure-review-preview-v1";
export type MinimalSyntheticAuditApprovalJoinRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-recovery-plan-preview-v1";
export type MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-recovery-readiness-checklist-v1";
export type MinimalSyntheticAuditApprovalJoinReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-review-audit-summary-preview-v1";
export type MinimalSyntheticAuditApprovalJoinAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-acceptance-posture-preview-v1";

export type MinimalSyntheticAuditApprovalJoinReviewSource =
  "Athena / Jarvis Model Gateway";
export type MinimalSyntheticAuditApprovalJoinReviewMode = "preview-only";
export type MinimalSyntheticAuditApprovalJoinReviewPosture =
  "minimal synthetic audit and approval join review / backend-only / in-memory-only / not provider-capable / not persistent";
export type MinimalSyntheticAuditApprovalJoinReviewCurrentReadiness =
  "minimal-synthetic-audit-approval-join-review-only / backend-only / in-memory-only / not provider-capable / not persistent";
export type MinimalSyntheticAuditApprovalJoinReviewSeverity =
  "critical" | "high" | "medium";
export type MinimalSyntheticAuditApprovalJoinRecoveryPosture =
  "manual review only";
export type MinimalSyntheticAuditApprovalJoinRetryPosture = "disabled";
export type MinimalSyntheticAuditApprovalJoinFallbackPosture = "disabled";
export type MinimalSyntheticAuditApprovalJoinAcceptanceState =
  "not accepted for live persistence / synthetic audit approval join MVP accepted only";
export type MinimalSyntheticAuditApprovalJoinReadinessState =
  "reviewed" | "blocked" | "backend future required";
export type MinimalSyntheticAuditApprovalJoinReadinessOwner =
  "operator" | "backend future" | "safety review";
export type MinimalSyntheticAuditApprovalJoinAuditPosture = "preview-only";
export type MinimalSyntheticAuditApprovalJoinPreviewOnlyStatement =
  "minimal synthetic audit and approval join review is preview-only";
export type MinimalSyntheticAuditApprovalJoinOutputOnlyStatement =
  "Synthetic join only. No real output. No persistence.";
export type MinimalSyntheticAuditApprovalJoinNoLiveGatePassStatement =
  "No live gate pass.";
export type MinimalSyntheticAuditApprovalJoinNoRetryNoFallbackNoProviderNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No persistence.";
export type MinimalSyntheticAuditApprovalJoinAcceptanceStatement =
  "Synthetic audit approval join MVP accepted only. Live persistence not accepted.";

export type MinimalSyntheticAuditApprovalJoinReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-review:${MinimalSyntheticAuditApprovalJoinReviewId}`;
export type MinimalSyntheticAuditApprovalJoinOutputReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-output-review:${MinimalSyntheticAuditApprovalJoinReviewId}`;
export type MinimalSyntheticAuditApprovalJoinGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-gate-failure-review:${MinimalSyntheticAuditApprovalJoinReviewId}:${SyntheticAuditApprovalJoinGateId}`;
export type MinimalSyntheticAuditApprovalJoinRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-recovery-plan:${MinimalSyntheticAuditApprovalJoinReviewId}`;

export type MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistId =
  | "server-only-join-helper-reviewed"
  | "synthetic-audit-and-approval-join-input-reviewed"
  | "join-admission-check-reviewed"
  | "audit-join-output-reviewed"
  | "approval-join-output-reviewed"
  | "join-envelope-reviewed"
  | "audit-preview-reviewed"
  | "approval-preview-reviewed"
  | "evidence-packet-reviewed"
  | "synthetic-result-capture-dependency-reviewed"
  | "synthetic-result-capture-output-reviewed"
  | "manual-approval-fixture-reviewed"
  | "manual-confirmation-fixture-reviewed"
  | "kill-switch-fixture-reviewed"
  | "deterministic-audit-join-reviewed"
  | "deterministic-approval-join-reviewed"
  | "in-memory-only-join-reviewed"
  | "blocked-live-persistence-summary-reviewed"
  | "provider-boundary-reviewed"
  | "prompt-boundary-reviewed"
  | "model-boundary-reviewed"
  | "frontend-request-boundary-reviewed"
  | "api-route-boundary-reviewed"
  | "queue-dispatch-still-blocked"
  | "worker-dispatch-still-blocked"
  | "job-execution-still-blocked"
  | "result-persistence-still-blocked"
  | "audit-persistence-still-blocked"
  | "approval-persistence-still-blocked"
  | "database-writes-still-blocked"
  | "file-writes-still-blocked";

export type MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistLabel =
  | "server-only join helper reviewed"
  | "synthetic audit and approval join input reviewed"
  | "join admission check reviewed"
  | "audit join output reviewed"
  | "approval join output reviewed"
  | "join envelope reviewed"
  | "audit preview reviewed"
  | "approval preview reviewed"
  | "evidence packet reviewed"
  | "synthetic result capture dependency reviewed"
  | "synthetic result capture output reviewed"
  | "manual approval fixture reviewed"
  | "manual confirmation fixture reviewed"
  | "kill switch fixture reviewed"
  | "deterministic audit join reviewed"
  | "deterministic approval join reviewed"
  | "in-memory-only join reviewed"
  | "blocked live persistence summary reviewed"
  | "provider boundary reviewed"
  | "prompt boundary reviewed"
  | "model boundary reviewed"
  | "frontend request boundary reviewed"
  | "API route boundary reviewed"
  | "queue dispatch still blocked"
  | "worker dispatch still blocked"
  | "job execution still blocked"
  | "result persistence still blocked"
  | "audit persistence still blocked"
  | "approval persistence still blocked"
  | "database writes still blocked"
  | "file writes still blocked";

export type MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-recovery-readiness:${MinimalSyntheticAuditApprovalJoinReviewId}:${MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistId}`;
export type MinimalSyntheticAuditApprovalJoinReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-review-audit-summary:${MinimalSyntheticAuditApprovalJoinReviewId}`;
export type MinimalSyntheticAuditApprovalJoinAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-acceptance-posture:${MinimalSyntheticAuditApprovalJoinReviewId}`;

export type MinimalSyntheticAuditApprovalJoinReviewSectionTitle =
  (typeof SYNTHETIC_AUDIT_APPROVAL_JOIN_REVIEW_SECTION_TITLES)[number];

export type MinimalEndToEndPacketMvpChecklist = readonly string[];
export type MinimalSyntheticAuditApprovalJoinReviewDisplayStrings =
  readonly string[];

export type BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord =
  Readonly<{
    id: MinimalSyntheticAuditApprovalJoinReviewId;
    key: MinimalSyntheticAuditApprovalJoinReviewKey;
    reviewVersion: MinimalSyntheticAuditApprovalJoinReviewVersion;
    source: MinimalSyntheticAuditApprovalJoinReviewSource;
    reviewMode: MinimalSyntheticAuditApprovalJoinReviewMode;
    reviewPosture: MinimalSyntheticAuditApprovalJoinReviewPosture;
    previewOnlyStatement: MinimalSyntheticAuditApprovalJoinPreviewOnlyStatement;
    requestLabel: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecord["requestLabel"];
    label: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    sourceMinimalSyntheticAuditApprovalJoinMvpReference:
      MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpKey;
    sourceSyntheticAuditApprovalJoinInputReference:
      SyntheticAuditApprovalJoinInputKey;
    sourceSyntheticAuditJoinOutputReference: SyntheticAuditJoinOutputKey;
    sourceSyntheticApprovalJoinOutputReference:
      SyntheticApprovalJoinOutputKey;
    sourceSyntheticAuditApprovalJoinEnvelopeReference:
      SyntheticAuditApprovalJoinEnvelopeKey;
    sourceSyntheticAuditJoinPreviewReference: SyntheticAuditJoinPreviewKey;
    sourceSyntheticApprovalJoinPreviewReference:
      SyntheticApprovalJoinPreviewKey;
    sourceSyntheticAuditApprovalEvidencePacketReference:
      SyntheticAuditApprovalEvidencePacketKey;
    sourceSyntheticAuditApprovalJoinSafetyGateSummaryReference:
      SyntheticAuditApprovalJoinSafetyGateSummaryKey;
    sourceSyntheticAuditApprovalJoinBlockedLivePersistenceSummaryReference:
      SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryKey;
    sourceMinimalSyntheticResultCaptureReviewReference:
      BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord["key"];
    sourceSyntheticResultCaptureOutputReference: SyntheticResultCaptureOutputKey;
    sourceSyntheticResultCaptureOutputReviewReference:
      SyntheticResultCaptureOutputReviewRecord["key"];
    sourceMinimalSyntheticExecutionReviewReference:
      BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord["key"];
    sourceManualApprovalDecisionReviewReference:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
    selectedCapabilityFamily:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"];
    providerSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["providerSlotLabel"];
    backupProviderSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["backupProviderSlotLabel"];
    localPrivateAlternativeLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["localPrivateAlternativeLabel"];
    serverOnlyJoinHelperState: "exists";
    syntheticAuditAndApprovalJoinState: "joined-synthetic-in-memory-only";
    deterministicJoinState: "produced in memory only";
    frontendRequestState: "not created";
    apiRouteState: "not created";
    providerResponseState: "not received";
    modelOutputState: "not generated";
    promptSendingState: "not implemented";
    providerExecutionState: "blocked";
    queueDispatchState: "not dispatched";
    workerDispatchState: "not dispatched";
    jobExecutionState: "not executed";
    resultPersistenceState: "not implemented";
    auditPersistenceState: "not implemented";
    approvalPersistenceState: "not implemented";
    databaseWriteState: "not implemented";
    fileWriteState: "not implemented";
    approvalFixtureState: "preview-only";
    manualConfirmationFixtureState: "preview-only";
    approvalTokenState: "not issued";
    approvalLeaseState: "not created";
    auditPreviewState: "preview-only";
    approvalPreviewState: "preview-only";
    auditReferenceState: "preview-only / not persisted";
    approvalReferenceState: "preview-only / not persisted";
    resultReferenceState: "preview-only / not persisted";
    evidencePacketState: "preview-only / not persisted";
    killSwitchState: "inactive fixture only";
    retryPosture: MinimalSyntheticAuditApprovalJoinRetryPosture;
    fallbackPosture: MinimalSyntheticAuditApprovalJoinFallbackPosture;
    nextEndToEndPacketMvpRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
    currentReadiness: MinimalSyntheticAuditApprovalJoinReviewCurrentReadiness;
  }>;

export type SyntheticAuditApprovalJoinOutputReviewRecord = Readonly<{
  id: MinimalSyntheticAuditApprovalJoinReviewId;
  key: MinimalSyntheticAuditApprovalJoinOutputReviewKey;
  outputReviewVersion: MinimalSyntheticAuditApprovalJoinOutputReviewVersion;
  auditApprovalJoinReviewId: MinimalSyntheticAuditApprovalJoinReviewId;
  sourceAuditJoinOutputReference: SyntheticAuditJoinOutputKey;
  sourceApprovalJoinOutputReference: SyntheticApprovalJoinOutputKey;
  sourceJoinEnvelopeReference: SyntheticAuditApprovalJoinEnvelopeKey;
  joinState: "joined-synthetic-in-memory-only";
  auditJoinIdPosture: "deterministic preview id only";
  approvalJoinIdPosture: "deterministic preview id only";
  resultReferencePosture: "preview-only / not persisted";
  auditReferencePosture: "preview-only / not persisted";
  approvalReferencePosture: "preview-only / not persisted";
  digestPosture: "deterministic preview digest only";
  providerResponseState: "not received";
  modelOutputState: "not generated";
  outputClassification: "synthetic fixture only";
  resultPersistenceState: "not implemented";
  auditPersistenceState: "not implemented";
  approvalPersistenceState: "not implemented";
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
  explicitSyntheticJoinOnlyNoRealOutputNoPersistenceStatement:
    MinimalSyntheticAuditApprovalJoinOutputOnlyStatement;
}>;

export type SyntheticAuditApprovalJoinGateFailureReviewRecord = Readonly<{
  id: MinimalSyntheticAuditApprovalJoinReviewId;
  key: MinimalSyntheticAuditApprovalJoinGateFailureReviewKey;
  gateFailureReviewVersion:
    MinimalSyntheticAuditApprovalJoinGateFailureReviewVersion;
  auditApprovalJoinReviewId: MinimalSyntheticAuditApprovalJoinReviewId;
  failedGateId: SyntheticAuditApprovalJoinGateId;
  failedGateLabel: string;
  gateState: "blocked";
  severity: MinimalSyntheticAuditApprovalJoinReviewSeverity;
  affectedCapabilityFamily:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
  affectedWorkspaceTarget: AiModelProviderWorkspaceTarget;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  endToEndPacketMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
  nextSafeAction: string;
  explicitNoLiveGatePassStatement:
    MinimalSyntheticAuditApprovalJoinNoLiveGatePassStatement;
}>;

export type SyntheticAuditApprovalJoinRecoveryPlanPreviewRecord = Readonly<{
  id: MinimalSyntheticAuditApprovalJoinReviewId;
  key: MinimalSyntheticAuditApprovalJoinRecoveryPlanKey;
  recoveryPlanVersion: MinimalSyntheticAuditApprovalJoinRecoveryPlanVersion;
  auditApprovalJoinReviewId: MinimalSyntheticAuditApprovalJoinReviewId;
  recoveryPosture: MinimalSyntheticAuditApprovalJoinRecoveryPosture;
  serverOnlyJoinHelperRecovery: string;
  syntheticAuditAndApprovalJoinInputRecovery: string;
  auditJoinOutputRecovery: string;
  approvalJoinOutputRecovery: string;
  joinEnvelopeRecovery: string;
  auditPreviewRecovery: string;
  approvalPreviewRecovery: string;
  evidencePacketRecovery: string;
  providerBoundaryRecovery: string;
  promptBoundaryRecovery: string;
  modelBoundaryRecovery: string;
  frontendRequestBoundaryRecovery: string;
  apiRouteBoundaryRecovery: string;
  queueDispatchBlockedRecovery: string;
  workerDispatchBlockedRecovery: string;
  jobExecutionBlockedRecovery: string;
  resultPersistenceMissingRecovery: string;
  auditPersistenceMissingRecovery: string;
  approvalPersistenceMissingRecovery: string;
  databaseWriteBlockedRecovery: string;
  fileWriteBlockedRecovery: string;
  retryPosture: MinimalSyntheticAuditApprovalJoinRetryPosture;
  fallbackPosture: MinimalSyntheticAuditApprovalJoinFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
  explicitNoRetryNoFallbackNoProviderNoPersistenceStatement:
    MinimalSyntheticAuditApprovalJoinNoRetryNoFallbackNoProviderNoPersistenceStatement;
}>;

export type SyntheticAuditApprovalJoinRecoveryReadinessChecklistRecord =
  Readonly<{
    id: MinimalSyntheticAuditApprovalJoinReviewId;
    key: MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistKey;
    checklistVersion:
      MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistVersion;
    checklistId:
      MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistId;
    label: MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistLabel;
    state: MinimalSyntheticAuditApprovalJoinReadinessState;
    severity: MinimalSyntheticAuditApprovalJoinReviewSeverity;
    evidenceRequired: string;
    recoveryAction: string;
    owner: MinimalSyntheticAuditApprovalJoinReadinessOwner;
    currentPosture: "preview-only";
    endToEndPacketMvpDependency:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
    nextSafeAction: string;
  }>;

export type SyntheticAuditApprovalJoinReviewAuditSummaryRecord = Readonly<{
  id: MinimalSyntheticAuditApprovalJoinReviewId;
  key: MinimalSyntheticAuditApprovalJoinReviewAuditSummaryKey;
  auditSummaryVersion:
    MinimalSyntheticAuditApprovalJoinReviewAuditSummaryVersion;
  auditApprovalJoinReviewId: MinimalSyntheticAuditApprovalJoinReviewId;
  auditPosture: MinimalSyntheticAuditApprovalJoinAuditPosture;
  syntheticJoinReferenceState: "preview-only / not persisted";
  syntheticResultReferenceState: "preview-only / not persisted";
  auditReferenceState: "preview-only / not persisted";
  approvalReferenceState: "preview-only / not persisted";
  evidencePacketState: "preview-only";
  serverOnlyJoinHelperEvidenceSummary: string;
  deterministicJoinEvidenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noProviderOutputStatement: "No provider output.";
  noModelOutputStatement: "No model output.";
  noPromptSendingStatement: "No prompt sending.";
  noResultPersistenceStatement: "No result persistence.";
  noAuditPersistenceStatement: "No audit persistence.";
  noApprovalPersistenceStatement: "No approval persistence.";
  noDatabaseWriteStatement: "No database write.";
  noFileWriteStatement: "No file write.";
  endToEndPacketMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
}>;

export type SyntheticAuditApprovalJoinAcceptancePostureRecord = Readonly<{
  id: MinimalSyntheticAuditApprovalJoinReviewId;
  key: MinimalSyntheticAuditApprovalJoinAcceptancePostureKey;
  acceptancePostureVersion:
    MinimalSyntheticAuditApprovalJoinAcceptancePostureVersion;
  auditApprovalJoinReviewId: MinimalSyntheticAuditApprovalJoinReviewId;
  acceptanceState: MinimalSyntheticAuditApprovalJoinAcceptanceState;
  syntheticOnlyAcceptanceSummary: string;
  backendOnlyAcceptanceSummary: string;
  inMemoryOnlyAcceptanceSummary: string;
  providerBlockers: readonly string[];
  promptBlockers: readonly string[];
  modelBlockers: readonly string[];
  queueWorkerJobBlockers: readonly string[];
  resultPersistenceBlockers: readonly string[];
  auditPersistenceBlockers: readonly string[];
  approvalPersistenceBlockers: readonly string[];
  databaseFileBlockers: readonly string[];
  approvalBlockers: readonly string[];
  auditBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitSyntheticJoinAcceptedLivePersistenceNotAcceptedStatement:
    MinimalSyntheticAuditApprovalJoinAcceptanceStatement;
}>;

export type SyntheticAuditApprovalJoinReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["id"];
  capabilityFamilyLabel:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord[];
}>;

export type SyntheticAuditApprovalJoinReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord[];
}>;

export type SyntheticAuditApprovalJoinReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
  reviewCount: number;
  outputReviewCount: number;
  gateFailureCount: number;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  currentReadiness: MinimalSyntheticAuditApprovalJoinReviewCurrentReadiness;
  acceptanceState: MinimalSyntheticAuditApprovalJoinAcceptanceState;
  summaryLines: readonly string[];
}>;

export type SyntheticAuditApprovalJoinOutputReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
  outputReviewCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type SyntheticAuditApprovalJoinGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
  gateFailureCount: number;
  summaryLines: readonly string[];
  topFailedGateLabels: readonly string[];
  nextSafeAction: string;
}>;

export type SyntheticAuditApprovalJoinRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  currentReadiness: MinimalSyntheticAuditApprovalJoinReviewCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;
