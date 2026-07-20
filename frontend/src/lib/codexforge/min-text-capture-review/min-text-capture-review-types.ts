import type {
  AthenaModelRoutingPreviewId,
  AthenaModelRoutingPreviewRecord,
} from "../athena-model-routing-provider-selection-preview";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord,
} from "../min-synth-e2e-review";
import type {
  MinimalTextAdapterOutputReviewKey,
  MinimalTextAdapterOutputReviewRecord,
} from "../min-text-adapter-review";
import type {
  TextAdapterDeterministicFixtureResponseKey,
  TextAdapterRedactedPromptEnvelopeKey,
} from "../min-text-adapter";
import type {
  BackendOwnedMinimalManualGatedTextAdapterReviewRecord,
} from "../min-text-adapter-review";
import type {
  MinimalTextAdapterResultCaptureMvpId,
  MinimalTextAdapterResultCaptureMvpKey,
  TextAdapterCapturedFixtureResultOutputKey,
  TextAdapterResultCaptureAdmissionCheckKey,
  TextAdapterResultCaptureApprovalPreviewKey,
  TextAdapterResultCaptureAuditPreviewKey,
  TextAdapterResultCaptureBlockedLivePersistenceSummaryKey,
  TextAdapterResultCaptureEnvelopeKey,
  TextAdapterResultCaptureEvidencePreviewKey,
  TextAdapterResultCaptureGateId,
  TextAdapterResultCaptureGateRecord,
  TextAdapterResultCaptureInputKey,
  TextAdapterResultCaptureSafetyGateSummaryKey,
} from "../min-text-capture";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE =
  5769;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH =
  "5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH =
  "5770-5801 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP";

export const MINIMAL_TEXT_ADAPTER_RESULT_CAPTURE_REVIEW_SECTION_TITLES = [
  "Backend-owned minimal text adapter result capture review",
  "Text adapter result capture output review",
  "Text adapter result capture gate failure review",
  "Text adapter result capture recovery plan",
  "Text adapter result capture recovery readiness",
  "Text adapter result capture review audit summary",
  "Text adapter result capture acceptance posture",
] as const;

export type MinimalTextAdapterResultCaptureReviewId =
  AthenaModelRoutingPreviewId;
export type MinimalTextAdapterResultCaptureReviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-review-preview-v1";
export type TextAdapterResultCaptureOutputReviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-output-review-preview-v1";
export type TextAdapterResultCaptureGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate-failure-review-preview-v1";
export type TextAdapterResultCaptureRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-recovery-plan-preview-v1";
export type TextAdapterResultCaptureRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-recovery-readiness-checklist-v1";
export type TextAdapterResultCaptureReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-review-audit-summary-preview-v1";
export type TextAdapterResultCaptureAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-acceptance-posture-preview-v1";

export type MinimalTextAdapterResultCaptureReviewSource =
  "Athena / Jarvis Model Gateway";
export type MinimalTextAdapterResultCaptureReviewMode = "preview-only";
export type MinimalTextAdapterResultCaptureReviewPosture =
  "minimal text adapter result capture review / backend-only / fixture-only / in-memory-only / not persistent";
export type MinimalTextAdapterResultCaptureReviewCurrentReadiness =
  "minimal-text-adapter-result-capture-review-only / backend-only / fixture-only / in-memory-only / not persistent";
export type MinimalTextAdapterResultCaptureReviewSeverity =
  "critical" | "high" | "medium";
export type MinimalTextAdapterResultCaptureRecoveryPosture =
  "manual review only";
export type MinimalTextAdapterResultCaptureRetryPosture = "disabled";
export type MinimalTextAdapterResultCaptureFallbackPosture = "disabled";
export type MinimalTextAdapterResultCaptureAuditPosture = "preview-only";
export type MinimalTextAdapterResultCaptureAcceptanceState =
  "not accepted for live persistence / text adapter result capture fixture MVP accepted only";
export type MinimalTextAdapterResultCaptureReadinessState =
  "reviewed" | "blocked" | "backend future required";
export type MinimalTextAdapterResultCaptureReadinessOwner =
  "operator" | "backend future" | "safety review";
export type MinimalTextAdapterResultCapturePreviewOnlyStatement =
  "minimal text adapter result capture review is preview-only";
export type MinimalTextAdapterResultCaptureOutputOnlyStatement =
  "Fixture capture only. No real output. No provider call. No persistence.";
export type MinimalTextAdapterResultCaptureNoLiveGatePassStatement =
  "No live gate pass.";
export type MinimalTextAdapterResultCaptureNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No persistence.";
export type MinimalTextAdapterResultCaptureAcceptanceStatement =
  "Text adapter result capture fixture accepted only. Live persistence not accepted.";

export type MinimalTextAdapterResultCaptureReviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-review:${MinimalTextAdapterResultCaptureReviewId}`;
export type TextAdapterResultCaptureOutputReviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-output-review:${MinimalTextAdapterResultCaptureReviewId}`;
export type TextAdapterResultCaptureGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate-failure-review:${MinimalTextAdapterResultCaptureReviewId}:${TextAdapterResultCaptureGateId}`;
export type TextAdapterResultCaptureRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-recovery-plan:${MinimalTextAdapterResultCaptureReviewId}`;

type ReviewOnlySourceReference<Prefix extends string> =
  `${Prefix}:${Exclude<MinimalTextAdapterResultCaptureReviewId, MinimalTextAdapterResultCaptureMvpId>}`;

export type MinimalTextAdapterResultCaptureMvpSourceReference =
  | MinimalTextAdapterResultCaptureMvpKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-result-capture-mvp-review-source">;
export type TextAdapterResultCaptureInputSourceReference =
  | TextAdapterResultCaptureInputKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-result-capture-input-review-source">;
export type TextAdapterResultCaptureAdmissionCheckSourceReference =
  | TextAdapterResultCaptureAdmissionCheckKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-result-capture-admission-check-review-source">;
export type TextAdapterCapturedFixtureResultOutputSourceReference =
  | TextAdapterCapturedFixtureResultOutputKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-captured-fixture-result-output-review-source">;
export type TextAdapterResultCaptureEnvelopeSourceReference =
  | TextAdapterResultCaptureEnvelopeKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-result-capture-envelope-review-source">;
export type TextAdapterResultCaptureEvidencePreviewSourceReference =
  | TextAdapterResultCaptureEvidencePreviewKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-result-capture-evidence-preview-review-source">;
export type TextAdapterResultCaptureAuditPreviewSourceReference =
  | TextAdapterResultCaptureAuditPreviewKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-result-capture-audit-preview-review-source">;
export type TextAdapterResultCaptureApprovalPreviewSourceReference =
  | TextAdapterResultCaptureApprovalPreviewKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-result-capture-approval-preview-review-source">;
export type TextAdapterResultCaptureSafetyGateSummarySourceReference =
  | TextAdapterResultCaptureSafetyGateSummaryKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-result-capture-safety-gate-summary-review-source">;
export type TextAdapterResultCaptureBlockedLivePersistenceSummarySourceReference =
  | TextAdapterResultCaptureBlockedLivePersistenceSummaryKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-result-capture-blocked-live-persistence-summary-review-source">;
export type TextAdapterResultCaptureDeterministicFixtureResponseSourceReference =
  | TextAdapterDeterministicFixtureResponseKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-deterministic-fixture-response-review-source">;
export type TextAdapterResultCaptureRedactedPromptEnvelopeSourceReference =
  | TextAdapterRedactedPromptEnvelopeKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-redacted-prompt-envelope-review-source">;

export type TextAdapterResultCaptureRecoveryReadinessChecklistId =
  | "server-only-text-adapter-result-capture-helper-reviewed"
  | "text-adapter-result-capture-input-reviewed"
  | "result-capture-admission-check-reviewed"
  | "captured-fixture-result-output-reviewed"
  | "result-capture-envelope-reviewed"
  | "evidence-preview-reviewed"
  | "audit-preview-reviewed"
  | "approval-preview-reviewed"
  | "minimal-text-adapter-review-dependency-reviewed"
  | "text-adapter-deterministic-fixture-response-reviewed"
  | "text-adapter-output-review-reviewed"
  | "redacted-prompt-envelope-reviewed"
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

export type TextAdapterResultCaptureRecoveryReadinessChecklistLabel =
  | "server-only text adapter result capture helper reviewed"
  | "text adapter result capture input reviewed"
  | "result capture admission check reviewed"
  | "captured fixture result output reviewed"
  | "result capture envelope reviewed"
  | "evidence preview reviewed"
  | "audit preview reviewed"
  | "approval preview reviewed"
  | "minimal text adapter review dependency reviewed"
  | "text adapter deterministic fixture response reviewed"
  | "text adapter output review reviewed"
  | "redacted prompt envelope reviewed"
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

export type TextAdapterResultCaptureRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-recovery-readiness:${MinimalTextAdapterResultCaptureReviewId}:${TextAdapterResultCaptureRecoveryReadinessChecklistId}`;
export type TextAdapterResultCaptureReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-review-audit-summary:${MinimalTextAdapterResultCaptureReviewId}`;
export type TextAdapterResultCaptureAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-acceptance-posture:${MinimalTextAdapterResultCaptureReviewId}`;

export type MinimalTextAdapterResultCaptureReviewSectionTitle =
  (typeof MINIMAL_TEXT_ADAPTER_RESULT_CAPTURE_REVIEW_SECTION_TITLES)[number];
export type MinimalTextAdapterAuditApprovalJoinMvpChecklist =
  readonly string[];
export type TextAdapterResultCaptureReviewDisplayStrings = readonly string[];

export type BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord =
  Readonly<{
    id: MinimalTextAdapterResultCaptureReviewId;
    key: MinimalTextAdapterResultCaptureReviewKey;
    reviewVersion: MinimalTextAdapterResultCaptureReviewVersion;
    source: MinimalTextAdapterResultCaptureReviewSource;
    reviewMode: MinimalTextAdapterResultCaptureReviewMode;
    reviewPosture: MinimalTextAdapterResultCaptureReviewPosture;
    previewOnlyStatement: MinimalTextAdapterResultCapturePreviewOnlyStatement;
    requestLabel: AthenaModelRoutingPreviewRecord["operatorGoalLabel"];
    label: string;
    operatorRequestPhrase: AthenaModelRoutingPreviewRecord["operatorRequestPhrase"];
    workspaceTarget: AthenaModelRoutingPreviewRecord["workspaceTarget"];
    sourceMinimalTextAdapterResultCaptureMvpReference:
      MinimalTextAdapterResultCaptureMvpSourceReference;
    sourceTextAdapterResultCaptureInputReference:
      TextAdapterResultCaptureInputSourceReference;
    sourceTextAdapterResultCaptureAdmissionCheckReference:
      TextAdapterResultCaptureAdmissionCheckSourceReference;
    sourceTextAdapterCapturedFixtureResultOutputReference:
      TextAdapterCapturedFixtureResultOutputSourceReference;
    sourceTextAdapterResultCaptureEnvelopeReference:
      TextAdapterResultCaptureEnvelopeSourceReference;
    sourceTextAdapterResultCaptureEvidencePreviewReference:
      TextAdapterResultCaptureEvidencePreviewSourceReference;
    sourceTextAdapterResultCaptureAuditPreviewReference:
      TextAdapterResultCaptureAuditPreviewSourceReference;
    sourceTextAdapterResultCaptureApprovalPreviewReference:
      TextAdapterResultCaptureApprovalPreviewSourceReference;
    sourceTextAdapterResultCaptureSafetyGateSummaryReference:
      TextAdapterResultCaptureSafetyGateSummarySourceReference;
    sourceTextAdapterResultCaptureBlockedLivePersistenceSummaryReference:
      TextAdapterResultCaptureBlockedLivePersistenceSummarySourceReference;
    sourceMinimalTextAdapterReviewReference:
      BackendOwnedMinimalManualGatedTextAdapterReviewRecord["key"];
    sourceTextAdapterDeterministicFixtureResponseReference:
      TextAdapterResultCaptureDeterministicFixtureResponseSourceReference;
    sourceTextAdapterOutputReviewReference:
      MinimalTextAdapterOutputReviewRecord["key"];
    sourceTextAdapterRedactedPromptEnvelopeReference:
      TextAdapterResultCaptureRedactedPromptEnvelopeSourceReference;
    sourceSyntheticEndToEndPacketReviewReference:
      BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["key"];
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
    serverOnlyTextAdapterResultCaptureHelperState: "exists";
    textAdapterResultCaptureState: "captured-text-adapter-fixture-in-memory-only";
    deterministicCaptureState: "produced in memory only";
    capturedFixtureResponseState: "captured in memory only";
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
    retryPosture: MinimalTextAdapterResultCaptureRetryPosture;
    fallbackPosture: MinimalTextAdapterResultCaptureFallbackPosture;
    nextTextAdapterAuditApprovalJoinMvpRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH;
    currentReadiness: MinimalTextAdapterResultCaptureReviewCurrentReadiness;
    operatorFacingExplanation: string;
  }>;

export type TextAdapterResultCaptureOutputReviewRecord = Readonly<{
  id: MinimalTextAdapterResultCaptureReviewId;
  key: TextAdapterResultCaptureOutputReviewKey;
  outputReviewVersion: TextAdapterResultCaptureOutputReviewVersion;
  textAdapterResultCaptureReviewId: MinimalTextAdapterResultCaptureReviewId;
  sourceCapturedFixtureResultOutputReference:
    TextAdapterCapturedFixtureResultOutputSourceReference;
  sourceResultCaptureEnvelopeReference:
    TextAdapterResultCaptureEnvelopeSourceReference;
  sourceRedactedPromptEnvelopeReference:
    TextAdapterResultCaptureRedactedPromptEnvelopeSourceReference;
  captureState: "captured-text-adapter-fixture-in-memory-only";
  adapterIdPosture: "deterministic preview id only";
  fixtureResponseIdPosture: "deterministic preview id only";
  captureIdPosture: "deterministic preview id only";
  digestPosture: "deterministic preview digest only";
  promptTransmissionState: "not sent";
  providerResponseState: "not received";
  modelOutputState: "not generated";
  outputClassification: "captured deterministic fixture only";
  resultPersistenceState: "not implemented";
  auditPersistenceState: "not implemented";
  approvalPersistenceState: "not implemented";
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
  explicitFixtureCaptureOnlyNoRealOutputNoProviderCallNoPersistenceStatement:
    MinimalTextAdapterResultCaptureOutputOnlyStatement;
}>;

export type TextAdapterResultCaptureGateFailureReviewRecord = Readonly<{
  id: MinimalTextAdapterResultCaptureReviewId;
  key: TextAdapterResultCaptureGateFailureReviewKey;
  gateFailureReviewVersion: TextAdapterResultCaptureGateFailureReviewVersion;
  textAdapterResultCaptureReviewId: MinimalTextAdapterResultCaptureReviewId;
  failedGateId: TextAdapterResultCaptureGateId;
  failedGateLabel: string;
  gateState: TextAdapterResultCaptureGateRecord["currentState"];
  severity: MinimalTextAdapterResultCaptureReviewSeverity;
  affectedCapabilityFamily:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
  affectedWorkspaceTarget:
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["workspaceTarget"];
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  auditApprovalJoinMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  nextSafeAction: string;
  explicitNoLiveGatePassStatement:
    MinimalTextAdapterResultCaptureNoLiveGatePassStatement;
}>;

export type TextAdapterResultCaptureRecoveryPlanPreviewRecord = Readonly<{
  id: MinimalTextAdapterResultCaptureReviewId;
  key: TextAdapterResultCaptureRecoveryPlanKey;
  recoveryPlanVersion: TextAdapterResultCaptureRecoveryPlanVersion;
  textAdapterResultCaptureReviewId: MinimalTextAdapterResultCaptureReviewId;
  recoveryPosture: MinimalTextAdapterResultCaptureRecoveryPosture;
  serverOnlyTextAdapterResultCaptureHelperRecovery: string;
  textAdapterResultCaptureInputRecovery: string;
  resultCaptureAdmissionCheckRecovery: string;
  capturedFixtureResultOutputRecovery: string;
  resultCaptureEnvelopeRecovery: string;
  evidencePreviewRecovery: string;
  auditPreviewRecovery: string;
  approvalPreviewRecovery: string;
  redactedPromptEnvelopeRecovery: string;
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
  retryPosture: MinimalTextAdapterResultCaptureRetryPosture;
  fallbackPosture: MinimalTextAdapterResultCaptureFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  explicitNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement:
    MinimalTextAdapterResultCaptureNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement;
}>;

export type TextAdapterResultCaptureRecoveryReadinessChecklistRecord =
  Readonly<{
    id: MinimalTextAdapterResultCaptureReviewId;
    key: TextAdapterResultCaptureRecoveryReadinessChecklistKey;
    checklistVersion:
      TextAdapterResultCaptureRecoveryReadinessChecklistVersion;
    textAdapterResultCaptureReviewId: MinimalTextAdapterResultCaptureReviewId;
    checklistId: TextAdapterResultCaptureRecoveryReadinessChecklistId;
    label: TextAdapterResultCaptureRecoveryReadinessChecklistLabel;
    state: MinimalTextAdapterResultCaptureReadinessState;
    severity: MinimalTextAdapterResultCaptureReviewSeverity;
    evidenceRequired: string;
    recoveryAction: string;
    owner: MinimalTextAdapterResultCaptureReadinessOwner;
    currentPosture: "preview-only";
    auditApprovalJoinMvpDependency:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH;
    nextSafeAction: string;
  }>;

export type TextAdapterResultCaptureReviewAuditSummaryRecord = Readonly<{
  id: MinimalTextAdapterResultCaptureReviewId;
  key: TextAdapterResultCaptureReviewAuditSummaryKey;
  auditSummaryVersion: TextAdapterResultCaptureReviewAuditSummaryVersion;
  textAdapterResultCaptureReviewId: MinimalTextAdapterResultCaptureReviewId;
  auditPosture: MinimalTextAdapterResultCaptureAuditPosture;
  captureReferenceState: "preview-only / not persisted";
  adapterReferenceState: "preview-only / not persisted";
  fixtureResponseReferenceState: "preview-only / not persisted";
  auditReferenceState: "preview-only / not persisted";
  approvalReferenceState: "preview-only / not persisted";
  evidencePacketState: "preview-only";
  serverOnlyCaptureHelperEvidenceSummary: string;
  deterministicCaptureEvidenceSummary: string;
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
  textAdapterAuditApprovalJoinMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH;
}>;

export type TextAdapterResultCaptureAcceptancePostureRecord = Readonly<{
  id: MinimalTextAdapterResultCaptureReviewId;
  key: TextAdapterResultCaptureAcceptancePostureKey;
  acceptancePostureVersion: TextAdapterResultCaptureAcceptancePostureVersion;
  textAdapterResultCaptureReviewId: MinimalTextAdapterResultCaptureReviewId;
  acceptanceState: MinimalTextAdapterResultCaptureAcceptanceState;
  fixtureOnlyAcceptanceSummary: string;
  backendOnlyAcceptanceSummary: string;
  serverOnlyAcceptanceSummary: string;
  inMemoryOnlyAcceptanceSummary: string;
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
  explicitTextAdapterResultCaptureFixtureAcceptedLivePersistenceNotAcceptedStatement:
    MinimalTextAdapterResultCaptureAcceptanceStatement;
}>;

export type TextAdapterResultCaptureReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["id"];
  capabilityFamilyLabel:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord[];
}>;

export type TextAdapterResultCaptureReviewWorkspaceGroup = Readonly<{
  workspaceTarget:
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["workspaceTarget"];
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord[];
}>;

export type TextAdapterResultCaptureReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  reviewCount: number;
  outputReviewCount: number;
  gateFailureCount: number;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  currentReadiness: MinimalTextAdapterResultCaptureReviewCurrentReadiness;
  acceptanceState: MinimalTextAdapterResultCaptureAcceptanceState;
  summaryLines: readonly string[];
}>;

export type TextAdapterResultCaptureOutputReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  outputReviewCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type TextAdapterResultCaptureGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  gateFailureCount: number;
  summaryLines: readonly string[];
  topFailedGateLabels: readonly string[];
  nextSafeAction: string;
}>;

export type TextAdapterResultCaptureRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  currentReadiness: MinimalTextAdapterResultCaptureReviewCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;
