import type {
  AthenaModelRoutingPreviewId,
} from "../athena-model-routing-provider-selection-preview";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord,
  SyntheticEndToEndPacketAcceptancePostureRecord,
  SyntheticEndToEndPacketReviewAuditSummaryRecord,
} from "../min-synth-e2e-review";
import type {
  MinimalTextModelAdapterMvpId,
  MinimalTextModelAdapterMvpKey,
  TextAdapterAdmissionCheckKey,
  TextAdapterApprovalPreviewKey,
  TextAdapterAuditPreviewKey,
  TextAdapterBlockedLiveProviderSummaryKey,
  TextAdapterDeterministicFixtureResponseKey,
  TextAdapterEvidencePreviewKey,
  TextAdapterGateId,
  TextAdapterGateRecord,
  TextAdapterInputKey,
  TextAdapterNormalizedRequestKey,
  TextAdapterRedactedPromptEnvelopeKey,
  TextAdapterResponseEnvelopeKey,
  TextAdapterErrorEnvelopeKey,
} from "../min-text-adapter";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5674-5705 - Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_PHASE =
  5705;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH =
  "5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH =
  "5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP";

export const MINIMAL_TEXT_ADAPTER_REVIEW_SECTION_TITLES = [
  "Backend-owned minimal text adapter review",
  "Text adapter output review",
  "Text adapter gate failure review",
  "Text adapter recovery plan",
  "Text adapter recovery readiness",
  "Text adapter review audit summary",
  "Text adapter acceptance posture",
] as const;

export type MinimalTextAdapterReviewId = AthenaModelRoutingPreviewId;
export type MinimalTextAdapterReviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-review-preview-v1";
export type MinimalTextAdapterOutputReviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-output-review-preview-v1";
export type MinimalTextAdapterGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-gate-failure-review-preview-v1";
export type MinimalTextAdapterRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-recovery-plan-preview-v1";
export type MinimalTextAdapterRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-recovery-readiness-checklist-v1";
export type MinimalTextAdapterReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-review-audit-summary-preview-v1";
export type MinimalTextAdapterAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-acceptance-posture-preview-v1";

export type MinimalTextAdapterReviewSource = "Athena / Jarvis Model Gateway";
export type MinimalTextAdapterReviewMode = "preview-only";
export type MinimalTextAdapterReviewPosture =
  "minimal text adapter review / backend-only / fixture-only / not provider-capable / not persistent";
export type MinimalTextAdapterReviewCurrentReadiness =
  "minimal-text-adapter-review-only / backend-only / fixture-only / not provider-capable / not persistent";
export type MinimalTextAdapterReviewSeverity = "critical" | "high" | "medium";
export type MinimalTextAdapterRecoveryPosture = "manual review only";
export type MinimalTextAdapterRetryPosture = "disabled";
export type MinimalTextAdapterFallbackPosture = "disabled";
export type MinimalTextAdapterAuditPosture = "preview-only";
export type MinimalTextAdapterAcceptanceState =
  "not accepted for live provider execution / text adapter fixture MVP accepted only";
export type MinimalTextAdapterReadinessState =
  | "reviewed"
  | "blocked"
  | "backend future required";
export type MinimalTextAdapterReadinessOwner =
  | "operator"
  | "backend future"
  | "safety review";
export type MinimalTextAdapterPreviewOnlyStatement =
  "minimal text adapter review is preview-only";
export type MinimalTextAdapterOutputOnlyStatement =
  "Fixture response only. No real output. No provider call. No persistence.";
export type MinimalTextAdapterNoLiveGatePassStatement =
  "No live gate pass.";
export type MinimalTextAdapterNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No persistence.";
export type MinimalTextAdapterAcceptanceStatement =
  "Text adapter fixture accepted only. Live provider execution not accepted.";

export type MinimalTextAdapterReviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-review:${MinimalTextAdapterReviewId}`;
export type MinimalTextAdapterOutputReviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-output-review:${MinimalTextAdapterReviewId}`;
export type MinimalTextAdapterGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-gate-failure-review:${MinimalTextAdapterReviewId}:${TextAdapterGateId}`;
export type MinimalTextAdapterRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-recovery-plan:${MinimalTextAdapterReviewId}`;

type ReviewOnlySourceReference<Prefix extends string> =
  `${Prefix}:${Exclude<MinimalTextAdapterReviewId, MinimalTextModelAdapterMvpId>}`;

export type MinimalTextAdapterInputSourceReference =
  | TextAdapterInputKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-input-review-source">;
export type MinimalTextAdapterAdmissionCheckSourceReference =
  | TextAdapterAdmissionCheckKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-admission-check-review-source">;
export type MinimalTextAdapterNormalizedRequestSourceReference =
  | TextAdapterNormalizedRequestKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-normalized-request-review-source">;
export type MinimalTextAdapterRedactedPromptEnvelopeSourceReference =
  | TextAdapterRedactedPromptEnvelopeKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-redacted-prompt-envelope-review-source">;
export type MinimalTextAdapterDeterministicFixtureResponseSourceReference =
  | TextAdapterDeterministicFixtureResponseKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-deterministic-fixture-response-review-source">;
export type MinimalTextAdapterResponseEnvelopeSourceReference =
  | TextAdapterResponseEnvelopeKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-response-envelope-review-source">;
export type MinimalTextAdapterErrorEnvelopeSourceReference =
  | TextAdapterErrorEnvelopeKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-error-envelope-review-source">;
export type MinimalTextAdapterEvidencePreviewSourceReference =
  | TextAdapterEvidencePreviewKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-evidence-preview-review-source">;
export type MinimalTextAdapterAuditPreviewSourceReference =
  | TextAdapterAuditPreviewKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-audit-preview-review-source">;
export type MinimalTextAdapterApprovalPreviewSourceReference =
  | TextAdapterApprovalPreviewKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-approval-preview-review-source">;
export type MinimalTextAdapterSafetyGateSummarySourceReference =
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-safety-gate-summary-review-source">
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-safety-gate-summary-source">
  | TextAdapterBlockedLiveProviderSummaryKey;
export type MinimalTextAdapterBlockedLiveProviderSummarySourceReference =
  | TextAdapterBlockedLiveProviderSummaryKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-blocked-live-provider-summary-review-source">;

export type MinimalTextAdapterRecoveryReadinessChecklistId =
  | "server-only-text-adapter-helper-reviewed"
  | "text-adapter-input-reviewed"
  | "adapter-admission-check-reviewed"
  | "normalized-request-reviewed"
  | "redacted-prompt-envelope-reviewed"
  | "deterministic-fixture-response-reviewed"
  | "response-envelope-reviewed"
  | "error-envelope-reviewed"
  | "evidence-preview-reviewed"
  | "audit-preview-reviewed"
  | "approval-preview-reviewed"
  | "synthetic-end-to-end-packet-review-dependency-reviewed"
  | "manual-approval-fixture-reviewed"
  | "manual-confirmation-fixture-reviewed"
  | "kill-switch-fixture-reviewed"
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

export type MinimalTextAdapterRecoveryReadinessChecklistLabel =
  | "server-only text adapter helper reviewed"
  | "text adapter input reviewed"
  | "adapter admission check reviewed"
  | "normalized request reviewed"
  | "redacted prompt envelope reviewed"
  | "deterministic fixture response reviewed"
  | "response envelope reviewed"
  | "error envelope reviewed"
  | "evidence preview reviewed"
  | "audit preview reviewed"
  | "approval preview reviewed"
  | "synthetic end-to-end packet review dependency reviewed"
  | "manual approval fixture reviewed"
  | "manual confirmation fixture reviewed"
  | "kill switch fixture reviewed"
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

export type MinimalTextAdapterRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-recovery-readiness:${MinimalTextAdapterReviewId}:${MinimalTextAdapterRecoveryReadinessChecklistId}`;
export type MinimalTextAdapterReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-review-audit-summary:${MinimalTextAdapterReviewId}`;
export type MinimalTextAdapterAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-acceptance-posture:${MinimalTextAdapterReviewId}`;

export type MinimalTextAdapterReviewSectionTitle =
  (typeof MINIMAL_TEXT_ADAPTER_REVIEW_SECTION_TITLES)[number];
export type MinimalTextAdapterResultCaptureMvpChecklist = readonly string[];
export type MinimalTextAdapterReviewDisplayStrings = readonly string[];

export type BackendOwnedMinimalManualGatedTextAdapterReviewRecord =
  Readonly<{
    id: MinimalTextAdapterReviewId;
    key: MinimalTextAdapterReviewKey;
    reviewVersion: MinimalTextAdapterReviewVersion;
    source: MinimalTextAdapterReviewSource;
    reviewMode: MinimalTextAdapterReviewMode;
    reviewPosture: MinimalTextAdapterReviewPosture;
    previewOnlyStatement: MinimalTextAdapterPreviewOnlyStatement;
    requestLabel: string;
    label: string;
    operatorRequestPhrase: string;
    workspaceTarget:
      BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["workspaceTarget"];
    sourceMinimalTextAdapterMvpReference: MinimalTextModelAdapterMvpKey;
    sourceTextAdapterInputReference:
      MinimalTextAdapterInputSourceReference;
    sourceTextAdapterAdmissionCheckReference:
      MinimalTextAdapterAdmissionCheckSourceReference;
    sourceTextAdapterNormalizedRequestReference:
      MinimalTextAdapterNormalizedRequestSourceReference;
    sourceTextAdapterRedactedPromptEnvelopeReference:
      MinimalTextAdapterRedactedPromptEnvelopeSourceReference;
    sourceTextAdapterDeterministicFixtureResponseReference:
      MinimalTextAdapterDeterministicFixtureResponseSourceReference;
    sourceTextAdapterResponseEnvelopeReference:
      MinimalTextAdapterResponseEnvelopeSourceReference;
    sourceTextAdapterErrorEnvelopeReference:
      MinimalTextAdapterErrorEnvelopeSourceReference;
    sourceTextAdapterEvidencePreviewReference:
      MinimalTextAdapterEvidencePreviewSourceReference;
    sourceTextAdapterAuditPreviewReference:
      MinimalTextAdapterAuditPreviewSourceReference;
    sourceTextAdapterApprovalPreviewReference:
      MinimalTextAdapterApprovalPreviewSourceReference;
    sourceTextAdapterSafetyGateSummaryReference:
      MinimalTextAdapterSafetyGateSummarySourceReference;
    sourceTextAdapterBlockedLiveProviderSummaryReference:
      MinimalTextAdapterBlockedLiveProviderSummarySourceReference;
    sourceSyntheticEndToEndPacketReviewReference:
      BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["key"];
    sourceSyntheticEndToEndPacketAcceptancePostureReference:
      SyntheticEndToEndPacketAcceptancePostureRecord["key"];
    sourceSyntheticEndToEndPacketAuditSummaryReference:
      SyntheticEndToEndPacketReviewAuditSummaryRecord["key"];
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
    serverOnlyTextAdapterHelperState: "exists";
    textAdapterState: "completed-text-adapter-fixture-only";
    deterministicFixtureResponseState: "produced in memory only";
    redactedPromptEnvelopeState: "preview-only";
    promptTransmissionState: "not sent";
    frontendRequestState: "not created";
    apiRouteState: "not created";
    providerSdkImportState: "not imported";
    providerExecutionState: "blocked";
    providerResponseState: "not received";
    modelCallState: "not called";
    modelOutputState: "not generated";
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
    retryPosture: MinimalTextAdapterRetryPosture;
    fallbackPosture: MinimalTextAdapterFallbackPosture;
    nextTextAdapterResultCaptureMvpRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH;
    currentReadiness: MinimalTextAdapterReviewCurrentReadiness;
    operatorFacingExplanation: string;
  }>;

export type MinimalTextAdapterOutputReviewRecord = Readonly<{
  id: MinimalTextAdapterReviewId;
  key: MinimalTextAdapterOutputReviewKey;
  outputReviewVersion: MinimalTextAdapterOutputReviewVersion;
  textAdapterReviewId: MinimalTextAdapterReviewId;
  sourceDeterministicFixtureResponseReference:
    MinimalTextAdapterDeterministicFixtureResponseSourceReference;
  sourceResponseEnvelopeReference:
    MinimalTextAdapterResponseEnvelopeSourceReference;
  sourceRedactedPromptEnvelopeReference:
    MinimalTextAdapterRedactedPromptEnvelopeSourceReference;
  adapterState: "completed-text-adapter-fixture-only";
  adapterIdPosture: "deterministic preview id only";
  requestIdPosture: "deterministic preview id only";
  responseIdPosture: "deterministic preview id only";
  digestPosture: "deterministic preview digest only";
  promptTransmissionState: "not sent";
  providerResponseState: "not received";
  modelOutputState: "not generated";
  outputClassification: "deterministic fixture only";
  resultPersistenceState: "not implemented";
  auditPersistenceState: "not implemented";
  approvalPersistenceState: "not implemented";
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
  explicitFixtureResponseOnlyNoRealOutputNoProviderCallNoPersistenceStatement:
    MinimalTextAdapterOutputOnlyStatement;
}>;

export type MinimalTextAdapterGateFailureReviewRecord = Readonly<{
  id: MinimalTextAdapterReviewId;
  key: MinimalTextAdapterGateFailureReviewKey;
  gateFailureReviewVersion:
    MinimalTextAdapterGateFailureReviewVersion;
  textAdapterReviewId: MinimalTextAdapterReviewId;
  failedGateId: TextAdapterGateId;
  failedGateLabel: string;
  gateState: TextAdapterGateRecord["currentState"];
  severity: MinimalTextAdapterReviewSeverity;
  affectedCapabilityFamily:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
  affectedWorkspaceTarget:
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["workspaceTarget"];
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  resultCaptureMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH;
  nextSafeAction: string;
  explicitNoLiveGatePassStatement:
    MinimalTextAdapterNoLiveGatePassStatement;
}>;

export type MinimalTextAdapterRecoveryPlanPreviewRecord = Readonly<{
  id: MinimalTextAdapterReviewId;
  key: MinimalTextAdapterRecoveryPlanKey;
  recoveryPlanVersion: MinimalTextAdapterRecoveryPlanVersion;
  textAdapterReviewId: MinimalTextAdapterReviewId;
  recoveryPosture: MinimalTextAdapterRecoveryPosture;
  serverOnlyTextAdapterHelperRecovery: string;
  textAdapterInputRecovery: string;
  adapterAdmissionCheckRecovery: string;
  normalizedRequestRecovery: string;
  redactedPromptEnvelopeRecovery: string;
  deterministicFixtureResponseRecovery: string;
  responseEnvelopeRecovery: string;
  errorEnvelopeRecovery: string;
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
  retryPosture: MinimalTextAdapterRetryPosture;
  fallbackPosture: MinimalTextAdapterFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH;
  explicitNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement:
    MinimalTextAdapterNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement;
}>;

export type MinimalTextAdapterRecoveryReadinessChecklistRecord =
  Readonly<{
    id: MinimalTextAdapterReviewId;
    key: MinimalTextAdapterRecoveryReadinessChecklistKey;
    checklistVersion:
      MinimalTextAdapterRecoveryReadinessChecklistVersion;
    checklistId: MinimalTextAdapterRecoveryReadinessChecklistId;
    label: MinimalTextAdapterRecoveryReadinessChecklistLabel;
    state: MinimalTextAdapterReadinessState;
    severity: MinimalTextAdapterReviewSeverity;
    evidenceRequired: string;
    recoveryAction: string;
    owner: MinimalTextAdapterReadinessOwner;
    currentPosture: "preview-only";
    resultCaptureMvpDependency:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH;
    nextSafeAction: string;
  }>;

export type MinimalTextAdapterReviewAuditSummaryRecord = Readonly<{
  id: MinimalTextAdapterReviewId;
  key: MinimalTextAdapterReviewAuditSummaryKey;
  auditSummaryVersion:
    MinimalTextAdapterReviewAuditSummaryVersion;
  textAdapterReviewId: MinimalTextAdapterReviewId;
  auditPosture: MinimalTextAdapterAuditPosture;
  adapterReferenceState: "preview-only / not persisted";
  requestReferenceState: "preview-only / not persisted";
  responseReferenceState: "preview-only / not persisted";
  auditReferenceState: "preview-only / not persisted";
  approvalReferenceState: "preview-only / not persisted";
  evidencePacketState: "preview-only";
  serverOnlyAdapterHelperEvidenceSummary: string;
  deterministicFixtureResponseEvidenceSummary: string;
  redactedPromptEvidenceSummary: string;
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
  textAdapterResultCaptureMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH;
}>;

export type MinimalTextAdapterAcceptancePostureRecord = Readonly<{
  id: MinimalTextAdapterReviewId;
  key: MinimalTextAdapterAcceptancePostureKey;
  acceptancePostureVersion:
    MinimalTextAdapterAcceptancePostureVersion;
  textAdapterReviewId: MinimalTextAdapterReviewId;
  acceptanceState: MinimalTextAdapterAcceptanceState;
  fixtureOnlyAcceptanceSummary: string;
  backendOnlyAcceptanceSummary: string;
  serverOnlyAcceptanceSummary: string;
  redactedPromptAcceptanceSummary: string;
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
  explicitTextAdapterFixtureAcceptedLiveProviderExecutionNotAcceptedStatement:
    MinimalTextAdapterAcceptanceStatement;
}>;

export type MinimalTextAdapterReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["id"];
  capabilityFamilyLabel:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedTextAdapterReviewRecord[];
}>;

export type MinimalTextAdapterReviewWorkspaceGroup = Readonly<{
  workspaceTarget:
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["workspaceTarget"];
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedTextAdapterReviewRecord[];
}>;

export type MinimalTextAdapterReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH;
  reviewCount: number;
  outputReviewCount: number;
  gateFailureCount: number;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  currentReadiness: MinimalTextAdapterReviewCurrentReadiness;
  acceptanceState: MinimalTextAdapterAcceptanceState;
  summaryLines: readonly string[];
}>;

export type MinimalTextAdapterOutputReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH;
  outputReviewCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type MinimalTextAdapterGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH;
  gateFailureCount: number;
  summaryLines: readonly string[];
  topFailedGateLabels: readonly string[];
  nextSafeAction: string;
}>;

export type MinimalTextAdapterRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  currentReadiness: MinimalTextAdapterReviewCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;
