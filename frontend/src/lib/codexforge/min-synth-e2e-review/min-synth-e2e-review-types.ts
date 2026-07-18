import type {
  SyntheticMvpExecutionResultKey,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
} from "../minimal-synth-exec-review";
import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord,
} from "../min-synth-capture-review";
import type {
  SyntheticApprovalJoinOutputKey,
  SyntheticAuditJoinOutputKey,
} from "../min-synth-audit-join/min-synth-audit-join-types";
import type {
  BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord,
} from "../min-synth-audit-join-review";
import type {
  SyntheticResultCaptureOutputKey,
} from "../min-synth-result-capture";
import type {
  MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId,
  MinimalManualGatedSyntheticDryRunEndToEndPacketMvpKey,
  MinimalManualGatedSyntheticDryRunEndToEndPacketMvpRecord,
  SyntheticEndToEndPacketApprovalPreviewKey,
  SyntheticEndToEndPacketAuditPreviewKey,
  SyntheticEndToEndPacketBlockedLivePersistenceSummaryKey,
  SyntheticEndToEndPacketEnvelopeKey,
  SyntheticEndToEndPacketEvidencePreviewKey,
  SyntheticEndToEndPacketGateId,
  SyntheticEndToEndPacketOutputKey,
  SyntheticEndToEndPacketSafetyGateSummaryKey,
  SyntheticEndToEndPacketStageSummaryKey,
} from "../min-synth-e2e-mvp";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5610-5641 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_PHASE =
  5641;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH =
  "5578-5609 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH =
  "5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP";

export const SYNTHETIC_END_TO_END_PACKET_REVIEW_SECTION_TITLES = [
  "Backend-owned minimal synthetic end-to-end packet review",
  "Synthetic end-to-end packet output review",
  "Synthetic end-to-end packet gate failure review",
  "Synthetic end-to-end packet recovery plan",
  "Synthetic end-to-end packet recovery readiness",
  "Synthetic end-to-end packet review audit summary",
  "Synthetic end-to-end packet acceptance posture",
] as const;

export type MinimalSyntheticEndToEndPacketReviewId =
  MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId;

export type MinimalSyntheticEndToEndPacketReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review-preview-v1";
export type MinimalSyntheticEndToEndPacketOutputReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-output-review-preview-v1";
export type MinimalSyntheticEndToEndPacketGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-gate-failure-review-preview-v1";
export type MinimalSyntheticEndToEndPacketRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-recovery-plan-preview-v1";
export type MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-recovery-readiness-checklist-v1";
export type MinimalSyntheticEndToEndPacketReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review-audit-summary-preview-v1";
export type MinimalSyntheticEndToEndPacketAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-acceptance-posture-preview-v1";

export type MinimalSyntheticEndToEndPacketReviewSource =
  "Athena / Jarvis Model Gateway";
export type MinimalSyntheticEndToEndPacketReviewMode = "preview-only";
export type MinimalSyntheticEndToEndPacketReviewPosture =
  "minimal synthetic end-to-end packet review / backend-only / in-memory-only / not provider-capable / not persistent";
export type MinimalSyntheticEndToEndPacketReviewCurrentReadiness =
  "minimal-synthetic-end-to-end-packet-review-only / backend-only / in-memory-only / not provider-capable / not persistent";
export type MinimalSyntheticEndToEndPacketReviewSeverity =
  | "critical"
  | "high"
  | "medium";
export type MinimalSyntheticEndToEndPacketRecoveryPosture =
  "manual review only";
export type MinimalSyntheticEndToEndPacketRetryPosture = "disabled";
export type MinimalSyntheticEndToEndPacketFallbackPosture = "disabled";
export type MinimalSyntheticEndToEndPacketAcceptanceState =
  "not accepted for live execution / synthetic end-to-end packet MVP accepted only";
export type MinimalSyntheticEndToEndPacketReadinessState =
  | "reviewed"
  | "blocked"
  | "backend future required";
export type MinimalSyntheticEndToEndPacketReadinessOwner =
  | "operator"
  | "backend future"
  | "safety review";
export type MinimalSyntheticEndToEndPacketAuditPosture = "preview-only";
export type MinimalSyntheticEndToEndPacketPreviewOnlyStatement =
  "minimal synthetic end-to-end packet review is preview-only";
export type MinimalSyntheticEndToEndPacketOutputOnlyStatement =
  "Synthetic packet only. No real output. No persistence.";
export type MinimalSyntheticEndToEndPacketNoLiveGatePassStatement =
  "No live gate pass.";
export type MinimalSyntheticEndToEndPacketNoRetryNoFallbackNoProviderNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No persistence.";
export type MinimalSyntheticEndToEndPacketAcceptanceStatement =
  "Synthetic end-to-end packet MVP accepted only. Live execution not accepted.";

export type MinimalSyntheticEndToEndPacketReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review:${MinimalSyntheticEndToEndPacketReviewId}`;
export type MinimalSyntheticEndToEndPacketOutputReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-output-review:${MinimalSyntheticEndToEndPacketReviewId}`;
export type MinimalSyntheticEndToEndPacketGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-gate-failure-review:${MinimalSyntheticEndToEndPacketReviewId}:${SyntheticEndToEndPacketGateId}`;
export type MinimalSyntheticEndToEndPacketRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-recovery-plan:${MinimalSyntheticEndToEndPacketReviewId}`;

export type MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistId =
  | "server-only-packet-helper-reviewed"
  | "synthetic-end-to-end-packet-input-reviewed"
  | "packet-admission-check-reviewed"
  | "packet-output-reviewed"
  | "packet-envelope-reviewed"
  | "packet-stage-summary-reviewed"
  | "evidence-packet-reviewed"
  | "synthetic-execution-dependency-reviewed"
  | "synthetic-execution-result-reviewed"
  | "synthetic-result-capture-dependency-reviewed"
  | "synthetic-result-capture-output-reviewed"
  | "synthetic-audit-join-dependency-reviewed"
  | "synthetic-audit-join-output-reviewed"
  | "synthetic-approval-join-dependency-reviewed"
  | "synthetic-approval-join-output-reviewed"
  | "manual-approval-fixture-reviewed"
  | "manual-confirmation-fixture-reviewed"
  | "kill-switch-fixture-reviewed"
  | "deterministic-packet-reviewed"
  | "in-memory-only-packet-reviewed"
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

export type MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistLabel =
  | "server-only packet helper reviewed"
  | "synthetic end-to-end packet input reviewed"
  | "packet admission check reviewed"
  | "packet output reviewed"
  | "packet envelope reviewed"
  | "packet stage summary reviewed"
  | "evidence packet reviewed"
  | "synthetic execution dependency reviewed"
  | "synthetic execution result reviewed"
  | "synthetic result capture dependency reviewed"
  | "synthetic result capture output reviewed"
  | "synthetic audit join dependency reviewed"
  | "synthetic audit join output reviewed"
  | "synthetic approval join dependency reviewed"
  | "synthetic approval join output reviewed"
  | "manual approval fixture reviewed"
  | "manual confirmation fixture reviewed"
  | "kill switch fixture reviewed"
  | "deterministic packet reviewed"
  | "in-memory-only packet reviewed"
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

export type MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-recovery-readiness:${MinimalSyntheticEndToEndPacketReviewId}:${MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistId}`;
export type MinimalSyntheticEndToEndPacketReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review-audit-summary:${MinimalSyntheticEndToEndPacketReviewId}`;
export type MinimalSyntheticEndToEndPacketAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-acceptance-posture:${MinimalSyntheticEndToEndPacketReviewId}`;

export type MinimalSyntheticEndToEndPacketReviewSectionTitle =
  (typeof SYNTHETIC_END_TO_END_PACKET_REVIEW_SECTION_TITLES)[number];

export type MinimalTextModelAdapterMvpChecklist = readonly string[];
export type MinimalSyntheticEndToEndPacketReviewDisplayStrings =
  readonly string[];

export type BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord =
  Readonly<{
    id: MinimalSyntheticEndToEndPacketReviewId;
    key: MinimalSyntheticEndToEndPacketReviewKey;
    reviewVersion: MinimalSyntheticEndToEndPacketReviewVersion;
    source: MinimalSyntheticEndToEndPacketReviewSource;
    reviewMode: MinimalSyntheticEndToEndPacketReviewMode;
    reviewPosture: MinimalSyntheticEndToEndPacketReviewPosture;
    previewOnlyStatement: MinimalSyntheticEndToEndPacketPreviewOnlyStatement;
    requestLabel: string;
    label: string;
    workspaceTarget:
      MinimalManualGatedSyntheticDryRunEndToEndPacketMvpRecord["workspaceTarget"];
    sourceMinimalSyntheticEndToEndPacketMvpReference:
      MinimalManualGatedSyntheticDryRunEndToEndPacketMvpKey;
    sourceSyntheticEndToEndPacketInputReference: `${string}:${MinimalSyntheticEndToEndPacketReviewId}`;
    sourceSyntheticEndToEndPacketOutputReference: SyntheticEndToEndPacketOutputKey;
    sourceSyntheticEndToEndPacketEnvelopeReference:
      SyntheticEndToEndPacketEnvelopeKey;
    sourceSyntheticEndToEndPacketStageSummaryReference:
      SyntheticEndToEndPacketStageSummaryKey;
    sourceSyntheticEndToEndPacketEvidencePreviewReference:
      SyntheticEndToEndPacketEvidencePreviewKey;
    sourceSyntheticEndToEndPacketAuditPreviewReference:
      SyntheticEndToEndPacketAuditPreviewKey;
    sourceSyntheticEndToEndPacketApprovalPreviewReference:
      SyntheticEndToEndPacketApprovalPreviewKey;
    sourceSyntheticEndToEndPacketSafetyGateSummaryReference:
      SyntheticEndToEndPacketSafetyGateSummaryKey;
    sourceSyntheticEndToEndPacketBlockedLivePersistenceSummaryReference:
      SyntheticEndToEndPacketBlockedLivePersistenceSummaryKey;
    sourceMinimalSyntheticAuditApprovalJoinReviewReference:
      BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord["key"];
    sourceSyntheticAuditJoinOutputReference: SyntheticAuditJoinOutputKey;
    sourceSyntheticApprovalJoinOutputReference:
      SyntheticApprovalJoinOutputKey;
    sourceMinimalSyntheticResultCaptureReviewReference:
      BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord["key"];
    sourceSyntheticResultCaptureOutputReference:
      SyntheticResultCaptureOutputKey;
    sourceMinimalSyntheticExecutionReviewReference:
      BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord["key"];
    sourceSyntheticExecutionResultReference: SyntheticMvpExecutionResultKey;
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
    serverOnlyPacketHelperState: "exists";
    syntheticEndToEndPacketState: "assembled-synthetic-in-memory-only";
    deterministicPacketState: "produced in memory only";
    syntheticExecutionState: "bundled in memory only";
    syntheticCaptureState: "bundled in memory only";
    syntheticAuditJoinState: "bundled in memory only";
    syntheticApprovalJoinState: "bundled in memory only";
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
    resultReferenceState: "preview-only / not persisted";
    auditReferenceState: "preview-only / not persisted";
    approvalReferenceState: "preview-only / not persisted";
    evidencePacketState: "preview-only / not persisted";
    killSwitchState: "inactive fixture only";
    retryPosture: MinimalSyntheticEndToEndPacketRetryPosture;
    fallbackPosture: MinimalSyntheticEndToEndPacketFallbackPosture;
    nextTextModelAdapterMvpRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH;
    currentReadiness: MinimalSyntheticEndToEndPacketReviewCurrentReadiness;
  }>;

export type SyntheticEndToEndPacketOutputReviewRecord = Readonly<{
  id: MinimalSyntheticEndToEndPacketReviewId;
  key: MinimalSyntheticEndToEndPacketOutputReviewKey;
  outputReviewVersion: MinimalSyntheticEndToEndPacketOutputReviewVersion;
  endToEndPacketReviewId: MinimalSyntheticEndToEndPacketReviewId;
  sourcePacketOutputReference: SyntheticEndToEndPacketOutputKey;
  sourcePacketEnvelopeReference: SyntheticEndToEndPacketEnvelopeKey;
  sourcePacketStageSummaryReference: SyntheticEndToEndPacketStageSummaryKey;
  packetState: "assembled-synthetic-in-memory-only";
  packetIdPosture: "deterministic preview id only";
  executionIdPosture: "deterministic preview id only";
  captureIdPosture: "deterministic preview id only";
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
  explicitSyntheticPacketOnlyNoRealOutputNoPersistenceStatement:
    MinimalSyntheticEndToEndPacketOutputOnlyStatement;
}>;

export type SyntheticEndToEndPacketGateFailureReviewRecord = Readonly<{
  id: MinimalSyntheticEndToEndPacketReviewId;
  key: MinimalSyntheticEndToEndPacketGateFailureReviewKey;
  gateFailureReviewVersion:
    MinimalSyntheticEndToEndPacketGateFailureReviewVersion;
  endToEndPacketReviewId: MinimalSyntheticEndToEndPacketReviewId;
  failedGateId: SyntheticEndToEndPacketGateId;
  failedGateLabel: string;
  gateState: "blocked";
  severity: MinimalSyntheticEndToEndPacketReviewSeverity;
  affectedCapabilityFamily:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
  affectedWorkspaceTarget:
    MinimalManualGatedSyntheticDryRunEndToEndPacketMvpRecord["workspaceTarget"];
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  textModelAdapterMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH;
  nextSafeAction: string;
  explicitNoLiveGatePassStatement:
    MinimalSyntheticEndToEndPacketNoLiveGatePassStatement;
}>;

export type SyntheticEndToEndPacketRecoveryPlanPreviewRecord = Readonly<{
  id: MinimalSyntheticEndToEndPacketReviewId;
  key: MinimalSyntheticEndToEndPacketRecoveryPlanKey;
  recoveryPlanVersion: MinimalSyntheticEndToEndPacketRecoveryPlanVersion;
  endToEndPacketReviewId: MinimalSyntheticEndToEndPacketReviewId;
  recoveryPosture: MinimalSyntheticEndToEndPacketRecoveryPosture;
  serverOnlyPacketHelperRecovery: string;
  syntheticEndToEndPacketInputRecovery: string;
  packetOutputRecovery: string;
  packetEnvelopeRecovery: string;
  packetStageSummaryRecovery: string;
  executionDependencyRecovery: string;
  resultCaptureDependencyRecovery: string;
  auditJoinDependencyRecovery: string;
  approvalJoinDependencyRecovery: string;
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
  retryPosture: MinimalSyntheticEndToEndPacketRetryPosture;
  fallbackPosture: MinimalSyntheticEndToEndPacketFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH;
  explicitNoRetryNoFallbackNoProviderNoPersistenceStatement:
    MinimalSyntheticEndToEndPacketNoRetryNoFallbackNoProviderNoPersistenceStatement;
}>;

export type SyntheticEndToEndPacketRecoveryReadinessChecklistRecord =
  Readonly<{
    id: MinimalSyntheticEndToEndPacketReviewId;
    key: MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistKey;
    checklistVersion:
      MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistVersion;
    checklistId:
      MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistId;
    label: MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistLabel;
    state: MinimalSyntheticEndToEndPacketReadinessState;
    severity: MinimalSyntheticEndToEndPacketReviewSeverity;
    evidenceRequired: string;
    recoveryAction: string;
    owner: MinimalSyntheticEndToEndPacketReadinessOwner;
    currentPosture: "preview-only";
    textModelAdapterMvpDependency:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH;
    nextSafeAction: string;
  }>;

export type SyntheticEndToEndPacketReviewAuditSummaryRecord = Readonly<{
  id: MinimalSyntheticEndToEndPacketReviewId;
  key: MinimalSyntheticEndToEndPacketReviewAuditSummaryKey;
  auditSummaryVersion:
    MinimalSyntheticEndToEndPacketReviewAuditSummaryVersion;
  endToEndPacketReviewId: MinimalSyntheticEndToEndPacketReviewId;
  auditPosture: MinimalSyntheticEndToEndPacketAuditPosture;
  syntheticPacketReferenceState: "preview-only / not persisted";
  syntheticExecutionReferenceState: "preview-only / not persisted";
  syntheticCaptureReferenceState: "preview-only / not persisted";
  syntheticAuditReferenceState: "preview-only / not persisted";
  syntheticApprovalReferenceState: "preview-only / not persisted";
  evidencePacketState: "preview-only";
  serverOnlyPacketHelperEvidenceSummary: string;
  deterministicPacketEvidenceSummary: string;
  stageSummary: string;
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
  textModelAdapterMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH;
}>;

export type SyntheticEndToEndPacketAcceptancePostureRecord = Readonly<{
  id: MinimalSyntheticEndToEndPacketReviewId;
  key: MinimalSyntheticEndToEndPacketAcceptancePostureKey;
  acceptancePostureVersion:
    MinimalSyntheticEndToEndPacketAcceptancePostureVersion;
  endToEndPacketReviewId: MinimalSyntheticEndToEndPacketReviewId;
  acceptanceState: MinimalSyntheticEndToEndPacketAcceptanceState;
  syntheticOnlyAcceptanceSummary: string;
  backendOnlyAcceptanceSummary: string;
  inMemoryOnlyAcceptanceSummary: string;
  executionCaptureAuditApprovalBundleAcceptanceSummary: string;
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
  explicitSyntheticPacketAcceptedLiveExecutionNotAcceptedStatement:
    MinimalSyntheticEndToEndPacketAcceptanceStatement;
}>;

export type SyntheticEndToEndPacketReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["id"];
  capabilityFamilyLabel:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord[];
}>;

export type SyntheticEndToEndPacketReviewWorkspaceGroup = Readonly<{
  workspaceTarget:
    MinimalManualGatedSyntheticDryRunEndToEndPacketMvpRecord["workspaceTarget"];
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord[];
}>;

export type SyntheticEndToEndPacketReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH;
  reviewCount: number;
  outputReviewCount: number;
  gateFailureCount: number;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  currentReadiness: MinimalSyntheticEndToEndPacketReviewCurrentReadiness;
  acceptanceState: MinimalSyntheticEndToEndPacketAcceptanceState;
  summaryLines: readonly string[];
}>;

export type SyntheticEndToEndPacketOutputReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH;
  outputReviewCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type SyntheticEndToEndPacketGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH;
  gateFailureCount: number;
  summaryLines: readonly string[];
  topFailedGateLabels: readonly string[];
  nextSafeAction: string;
}>;

export type SyntheticEndToEndPacketRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  currentReadiness: MinimalSyntheticEndToEndPacketReviewCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;
