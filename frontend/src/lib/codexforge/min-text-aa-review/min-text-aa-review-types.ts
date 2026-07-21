import type {
  AthenaModelRoutingPreviewId,
  AthenaModelRoutingPreviewRecord,
} from "../athena-model-routing-provider-selection-preview";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  BackendOwnedMinimalManualGatedTextAdapterReviewRecord,
  MinimalTextAdapterOutputReviewRecord,
} from "../min-text-adapter-review";
import type {
  TextAdapterDeterministicFixtureResponseKey,
  TextAdapterRedactedPromptEnvelopeKey,
} from "../min-text-adapter";
import type {
  BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord,
} from "../min-text-capture-review";
import type {
  TextAdapterCapturedFixtureResultOutputKey,
} from "../min-text-capture";
import type {
  MinimalTextAdapterAuditApprovalJoinMvpId,
  MinimalTextAdapterAuditApprovalJoinMvpKey,
  TextAdapterApprovalJoinOutputKey,
  TextAdapterAuditApprovalEvidencePreviewKey,
  TextAdapterAuditApprovalJoinEnvelopeKey,
  TextAdapterAuditApprovalJoinGateRecord,
  TextAdapterAuditApprovalJoinInputKey,
  TextAdapterAuditApprovalJoinSafetyGateSummaryKey,
  TextAdapterAuditJoinOutputKey,
} from "../min-text-audit-join/min-text-audit-join-types";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5802-5833 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE =
  5833;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH =
  "5770-5801 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH =
  "5834-5865 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP";

export const MINIMAL_TEXT_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_SECTION_TITLES = [
  "Backend-owned minimal text adapter audit and approval join review",
  "Text adapter audit and approval join output review",
  "Text adapter audit and approval join gate failure review",
  "Text adapter audit and approval join recovery plan",
  "Text adapter audit and approval join recovery readiness",
  "Text adapter audit and approval join review audit summary",
  "Text adapter audit and approval join acceptance posture",
] as const;

export type MinimalTextAdapterAuditApprovalJoinReviewId =
  AthenaModelRoutingPreviewId;
export type MinimalTextAdapterAuditApprovalJoinReviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-review-preview-v1";
export type TextAdapterAuditApprovalJoinOutputReviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-output-review-preview-v1";
export type TextAdapterAuditApprovalJoinGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-gate-failure-review-preview-v1";
export type TextAdapterAuditApprovalJoinRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-recovery-plan-preview-v1";
export type TextAdapterAuditApprovalJoinRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-recovery-readiness-checklist-v1";
export type TextAdapterAuditApprovalJoinReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-review-audit-summary-preview-v1";
export type TextAdapterAuditApprovalJoinAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-acceptance-posture-preview-v1";

export type MinimalTextAdapterAuditApprovalJoinReviewSource =
  "Athena / Jarvis Model Gateway";
export type MinimalTextAdapterAuditApprovalJoinReviewMode = "preview-only";
export type MinimalTextAdapterAuditApprovalJoinReviewPosture =
  "minimal text adapter audit approval join review / backend-only / fixture-only / in-memory-only / not persistent";
export type MinimalTextAdapterAuditApprovalJoinReviewCurrentReadiness =
  "minimal-text-adapter-audit-approval-join-review-only / backend-only / fixture-only / in-memory-only / not persistent";
export type MinimalTextAdapterAuditApprovalJoinReviewSeverity =
  "critical" | "high" | "medium";
export type MinimalTextAdapterAuditApprovalJoinRecoveryPosture =
  "manual review only";
export type MinimalTextAdapterAuditApprovalJoinRetryPosture = "disabled";
export type MinimalTextAdapterAuditApprovalJoinFallbackPosture = "disabled";
export type MinimalTextAdapterAuditApprovalJoinAuditPosture = "preview-only";
export type MinimalTextAdapterAuditApprovalJoinAcceptanceState =
  "not accepted for live provider execution / text adapter audit approval join fixture MVP accepted only";
export type MinimalTextAdapterAuditApprovalJoinReadinessState =
  "reviewed" | "blocked" | "backend future required";
export type MinimalTextAdapterAuditApprovalJoinReadinessOwner =
  "operator" | "backend future" | "safety review";
export type MinimalTextAdapterAuditApprovalJoinPreviewOnlyStatement =
  "minimal text adapter audit and approval join review is preview-only";
export type MinimalTextAdapterAuditApprovalJoinOutputOnlyStatement =
  "Audit approval join fixture only. No real output. No provider call. No persistence.";
export type MinimalTextAdapterAuditApprovalJoinNoLiveGatePassStatement =
  "No live gate pass.";
export type MinimalTextAdapterAuditApprovalJoinNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No persistence.";
export type MinimalTextAdapterAuditApprovalJoinAcceptanceStatement =
  "Text adapter audit approval join fixture accepted only. Live provider execution not accepted.";

export type MinimalTextAdapterAuditApprovalJoinReviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-review:${MinimalTextAdapterAuditApprovalJoinReviewId}`;
export type TextAdapterAuditApprovalJoinOutputReviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-output-review:${MinimalTextAdapterAuditApprovalJoinReviewId}`;
export type TextAdapterAuditApprovalJoinGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-gate-failure-review:${MinimalTextAdapterAuditApprovalJoinReviewId}:${TextAdapterAuditApprovalJoinGateFailureReviewId}`;
export type TextAdapterAuditApprovalJoinRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-recovery-plan:${MinimalTextAdapterAuditApprovalJoinReviewId}`;
export type TextAdapterAuditApprovalJoinRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-recovery-readiness:${MinimalTextAdapterAuditApprovalJoinReviewId}:${TextAdapterAuditApprovalJoinRecoveryReadinessChecklistId}`;
export type TextAdapterAuditApprovalJoinReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-review-audit-summary:${MinimalTextAdapterAuditApprovalJoinReviewId}`;
export type TextAdapterAuditApprovalJoinAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-acceptance-posture:${MinimalTextAdapterAuditApprovalJoinReviewId}`;

type ReviewOnlySourceReference<Prefix extends string> =
  `${Prefix}:${Exclude<MinimalTextAdapterAuditApprovalJoinReviewId, MinimalTextAdapterAuditApprovalJoinMvpId>}`;

export type MinimalTextAdapterAuditApprovalJoinMvpSourceReference =
  | MinimalTextAdapterAuditApprovalJoinMvpKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-mvp-review-source">;
export type TextAdapterAuditApprovalJoinInputSourceReference =
  | TextAdapterAuditApprovalJoinInputKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-input-review-source">;
export type TextAdapterAuditJoinOutputSourceReference =
  | TextAdapterAuditJoinOutputKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-audit-join-output-review-source">;
export type TextAdapterApprovalJoinOutputSourceReference =
  | TextAdapterApprovalJoinOutputKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-approval-join-output-review-source">;
export type TextAdapterAuditApprovalJoinEnvelopeSourceReference =
  | TextAdapterAuditApprovalJoinEnvelopeKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-envelope-review-source">;
export type TextAdapterAuditApprovalEvidencePreviewSourceReference =
  | TextAdapterAuditApprovalEvidencePreviewKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-evidence-preview-review-source">;
export type TextAdapterAuditApprovalJoinSafetyGateSummarySourceReference =
  | TextAdapterAuditApprovalJoinSafetyGateSummaryKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-safety-gate-summary-review-source">;
export type TextAdapterAuditApprovalJoinReadinessMatrixSourceReference =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-readiness-matrix-review-source:${MinimalTextAdapterAuditApprovalJoinReviewId}`;
export type TextAdapterResultCaptureReviewSourceReference =
  BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord["key"];
export type TextAdapterResultCaptureOutputSourceReference =
  | TextAdapterCapturedFixtureResultOutputKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-result-capture-output-review-source">;
export type MinimalTextAdapterReviewSourceReference =
  BackendOwnedMinimalManualGatedTextAdapterReviewRecord["key"];
export type TextAdapterDeterministicFixtureResponseSourceReference =
  | TextAdapterDeterministicFixtureResponseKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-deterministic-fixture-response-review-source">;
export type TextAdapterRedactedPromptEnvelopeSourceReference =
  | TextAdapterRedactedPromptEnvelopeKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-text-model-adapter-redacted-prompt-envelope-review-source">;
export type ManualApprovalDecisionReviewSourceReference =
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];

export type TextAdapterAuditApprovalJoinGateFailureReviewId =
  | "backend-only-boundary"
  | "server-only-audit-approval-join-module-boundary"
  | "text-adapter-audit-approval-fixture-join-mode"
  | "text-adapter-result-capture-review-dependency"
  | "deterministic-captured-fixture-response-present"
  | "audit-preview-present"
  | "approval-preview-present"
  | "redacted-prompt-envelope-present"
  | "prompt-not-sent"
  | "provider-sdk-not-imported"
  | "provider-response-not-received"
  | "model-output-not-generated"
  | "manual-approval-fixture"
  | "manual-confirmation-fixture"
  | "deterministic-adapter-id"
  | "deterministic-capture-id"
  | "deterministic-audit-join-id"
  | "deterministic-approval-join-id"
  | "deterministic-envelope-id"
  | "deterministic-join-digest"
  | "in-memory-only-result-reference"
  | "in-memory-only-audit-reference"
  | "in-memory-only-approval-reference"
  | "no-real-approval-request"
  | "no-real-approval-recording"
  | "no-approval-token-issuance"
  | "no-approval-lease-issuance"
  | "no-frontend-request"
  | "no-api-route"
  | "no-fetch-network"
  | "no-provider-sdk-import"
  | "no-provider-execution"
  | "no-model-call"
  | "no-prompt-sending"
  | "no-queue-dispatch"
  | "no-worker-dispatch"
  | "no-job-execution"
  | "no-result-persistence"
  | "no-audit-persistence"
  | "no-approval-persistence"
  | "no-database-write"
  | "no-file-write"
  | "single-run-lock-preview"
  | "idempotency-replay-preview"
  | "timeout-cancel-preview"
  | "privacy-redaction-preview"
  | "kill-switch-fixture";

export type TextAdapterAuditApprovalJoinRecoveryReadinessChecklistId =
  | "server-only-text-adapter-audit-approval-join-helper-reviewed"
  | "text-adapter-audit-approval-join-input-reviewed"
  | "audit-join-output-reviewed"
  | "approval-join-output-reviewed"
  | "audit-and-approval-join-envelope-reviewed"
  | "evidence-preview-reviewed"
  | "audit-preview-reviewed"
  | "approval-preview-reviewed"
  | "text-adapter-result-capture-review-dependency-reviewed"
  | "captured-fixture-result-output-reviewed"
  | "text-adapter-deterministic-fixture-response-reviewed"
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
  | "file-writes-still-blocked"
  | "provider-adapter-selection-not-implemented"
  | "credential-reference-binding-not-implemented";

export type TextAdapterAuditApprovalJoinRecoveryReadinessChecklistLabel =
  | "server-only text adapter audit approval join helper reviewed"
  | "text adapter audit approval join input reviewed"
  | "audit join output reviewed"
  | "approval join output reviewed"
  | "audit and approval join envelope reviewed"
  | "evidence preview reviewed"
  | "audit preview reviewed"
  | "approval preview reviewed"
  | "text adapter result capture review dependency reviewed"
  | "captured fixture result output reviewed"
  | "text adapter deterministic fixture response reviewed"
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
  | "file writes still blocked"
  | "provider adapter selection not implemented"
  | "credential reference binding not implemented";

export type MinimalTextAdapterAuditApprovalJoinReviewSectionTitle =
  (typeof MINIMAL_TEXT_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_SECTION_TITLES)[number];
export type ProviderAdapterSelectionAndCredentialReferenceMvpChecklist =
  readonly string[];
export type TextAdapterAuditApprovalJoinReviewDisplayStrings =
  readonly string[];

export type BackendOwnedMinimalManualGatedTextAdapterAuditApprovalJoinReviewRecord =
  Readonly<{
    id: MinimalTextAdapterAuditApprovalJoinReviewId;
    key: MinimalTextAdapterAuditApprovalJoinReviewKey;
    reviewVersion: MinimalTextAdapterAuditApprovalJoinReviewVersion;
    source: MinimalTextAdapterAuditApprovalJoinReviewSource;
    reviewMode: MinimalTextAdapterAuditApprovalJoinReviewMode;
    reviewPosture: MinimalTextAdapterAuditApprovalJoinReviewPosture;
    previewOnlyStatement: MinimalTextAdapterAuditApprovalJoinPreviewOnlyStatement;
    requestLabel: AthenaModelRoutingPreviewRecord["operatorGoalLabel"];
    label: string;
    operatorRequestPhrase: AthenaModelRoutingPreviewRecord["operatorRequestPhrase"];
    workspaceTarget: AthenaModelRoutingPreviewRecord["workspaceTarget"];
    sourceMinimalTextAdapterAuditApprovalJoinMvpReference:
      MinimalTextAdapterAuditApprovalJoinMvpSourceReference;
    sourceTextAdapterAuditApprovalJoinInputReference:
      TextAdapterAuditApprovalJoinInputSourceReference;
    sourceTextAdapterAuditJoinOutputReference:
      TextAdapterAuditJoinOutputSourceReference;
    sourceTextAdapterApprovalJoinOutputReference:
      TextAdapterApprovalJoinOutputSourceReference;
    sourceTextAdapterAuditApprovalJoinEnvelopeReference:
      TextAdapterAuditApprovalJoinEnvelopeSourceReference;
    sourceTextAdapterAuditApprovalEvidencePreviewReference:
      TextAdapterAuditApprovalEvidencePreviewSourceReference;
    sourceTextAdapterAuditApprovalJoinSafetyGateSummaryReference:
      TextAdapterAuditApprovalJoinSafetyGateSummarySourceReference;
    sourceTextAdapterAuditApprovalJoinReadinessMatrixReference:
      TextAdapterAuditApprovalJoinReadinessMatrixSourceReference;
    sourceTextAdapterResultCaptureReviewReference:
      TextAdapterResultCaptureReviewSourceReference;
    sourceTextAdapterResultCaptureOutputReference:
      TextAdapterResultCaptureOutputSourceReference;
    sourceMinimalTextAdapterReviewReference:
      MinimalTextAdapterReviewSourceReference;
    sourceTextAdapterDeterministicFixtureResponseReference:
      TextAdapterDeterministicFixtureResponseSourceReference;
    sourceTextAdapterRedactedPromptEnvelopeReference:
      TextAdapterRedactedPromptEnvelopeSourceReference;
    sourceManualApprovalDecisionReviewReference:
      ManualApprovalDecisionReviewSourceReference;
    selectedCapabilityFamily:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"];
    providerSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["providerSlotLabel"];
    backupProviderSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["backupProviderSlotLabel"];
    localPrivateAlternativeLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["localPrivateAlternativeLabel"];
    serverOnlyTextAdapterAuditAndApprovalJoinHelperState: "exists";
    textAdapterAuditAndApprovalJoinState: "produced in memory only";
    deterministicAuditJoinState: "produced in memory only";
    deterministicApprovalJoinState: "produced in memory only";
    textAdapterResultCaptureState: "not persistent";
    capturedFixtureResponseState: "preview-only / not persisted";
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
    retryPosture: MinimalTextAdapterAuditApprovalJoinRetryPosture;
    fallbackPosture: MinimalTextAdapterAuditApprovalJoinFallbackPosture;
    nextProviderAdapterSelectionAndCredentialReferenceMvpRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH;
    currentReadiness:
      MinimalTextAdapterAuditApprovalJoinReviewCurrentReadiness;
    operatorFacingExplanation: string;
  }>;

export type TextAdapterAuditApprovalJoinOutputReviewRecord = Readonly<{
  id: MinimalTextAdapterAuditApprovalJoinReviewId;
  key: TextAdapterAuditApprovalJoinOutputReviewKey;
  outputReviewVersion: TextAdapterAuditApprovalJoinOutputReviewVersion;
  textAdapterAuditApprovalJoinReviewId:
    MinimalTextAdapterAuditApprovalJoinReviewId;
  sourceAuditJoinOutputReference: TextAdapterAuditJoinOutputSourceReference;
  sourceApprovalJoinOutputReference:
    TextAdapterApprovalJoinOutputSourceReference;
  sourceAuditAndApprovalJoinEnvelopeReference:
    TextAdapterAuditApprovalJoinEnvelopeSourceReference;
  sourceResultCaptureOutputReference:
    TextAdapterResultCaptureOutputSourceReference;
  sourceRedactedPromptEnvelopeReference:
    TextAdapterRedactedPromptEnvelopeSourceReference;
  joinState: "produced-in-memory-only";
  auditJoinIdPosture: "deterministic preview id only";
  approvalJoinIdPosture: "deterministic preview id only";
  envelopeIdPosture: "deterministic preview id only";
  digestPosture: "deterministic preview digest only";
  promptTransmissionState: "not sent";
  providerResponseState: "not received";
  modelOutputState: "not generated";
  outputClassification: "deterministic audit approval fixture join only";
  resultPersistenceState: "not implemented";
  auditPersistenceState: "not implemented";
  approvalPersistenceState: "not implemented";
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
  explicitAuditApprovalJoinFixtureOnlyNoRealOutputNoProviderCallNoPersistenceStatement:
    MinimalTextAdapterAuditApprovalJoinOutputOnlyStatement;
}>;

export type TextAdapterAuditApprovalJoinGateFailureReviewRecord = Readonly<{
  id: MinimalTextAdapterAuditApprovalJoinReviewId;
  key: TextAdapterAuditApprovalJoinGateFailureReviewKey;
  gateFailureReviewVersion:
    TextAdapterAuditApprovalJoinGateFailureReviewVersion;
  textAdapterAuditApprovalJoinReviewId:
    MinimalTextAdapterAuditApprovalJoinReviewId;
  failedGateId: TextAdapterAuditApprovalJoinGateFailureReviewId;
  failedGateLabel: string;
  gateState: TextAdapterAuditApprovalJoinGateRecord["currentState"] | string;
  severity: MinimalTextAdapterAuditApprovalJoinReviewSeverity;
  affectedCapabilityFamily:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
  affectedWorkspaceTarget: AthenaModelRoutingPreviewRecord["workspaceTarget"];
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  providerAdapterSelectionCredentialReferenceMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH;
  nextSafeAction: string;
  explicitNoLiveGatePassStatement:
    MinimalTextAdapterAuditApprovalJoinNoLiveGatePassStatement;
}>;

export type TextAdapterAuditApprovalJoinRecoveryPlanPreviewRecord =
  Readonly<{
    id: MinimalTextAdapterAuditApprovalJoinReviewId;
    key: TextAdapterAuditApprovalJoinRecoveryPlanKey;
    recoveryPlanVersion: TextAdapterAuditApprovalJoinRecoveryPlanVersion;
    textAdapterAuditApprovalJoinReviewId:
      MinimalTextAdapterAuditApprovalJoinReviewId;
    recoveryPosture: MinimalTextAdapterAuditApprovalJoinRecoveryPosture;
    serverOnlyTextAdapterAuditApprovalJoinHelperRecovery: string;
    textAdapterAuditApprovalJoinInputRecovery: string;
    auditJoinOutputRecovery: string;
    approvalJoinOutputRecovery: string;
    auditAndApprovalJoinEnvelopeRecovery: string;
    evidencePreviewRecovery: string;
    resultCaptureDependencyRecovery: string;
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
    credentialReferenceMissingRecovery: string;
    providerSelectionMissingRecovery: string;
    retryPosture: MinimalTextAdapterAuditApprovalJoinRetryPosture;
    fallbackPosture: MinimalTextAdapterAuditApprovalJoinFallbackPosture;
    operatorActionRequired: string;
    nextSafeBatchRecommendation:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH;
    explicitNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement:
      MinimalTextAdapterAuditApprovalJoinNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement;
  }>;

export type TextAdapterAuditApprovalJoinRecoveryReadinessChecklistRecord =
  Readonly<{
    id: MinimalTextAdapterAuditApprovalJoinReviewId;
    key: TextAdapterAuditApprovalJoinRecoveryReadinessChecklistKey;
    checklistVersion:
      TextAdapterAuditApprovalJoinRecoveryReadinessChecklistVersion;
    textAdapterAuditApprovalJoinReviewId:
      MinimalTextAdapterAuditApprovalJoinReviewId;
    checklistId: TextAdapterAuditApprovalJoinRecoveryReadinessChecklistId;
    label: TextAdapterAuditApprovalJoinRecoveryReadinessChecklistLabel;
    state: MinimalTextAdapterAuditApprovalJoinReadinessState;
    severity: MinimalTextAdapterAuditApprovalJoinReviewSeverity;
    evidenceRequired: string;
    recoveryAction: string;
    owner: MinimalTextAdapterAuditApprovalJoinReadinessOwner;
    currentPosture: "preview-only";
    providerAdapterSelectionCredentialReferenceMvpDependency:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH;
    nextSafeAction: string;
  }>;

export type TextAdapterAuditApprovalJoinReviewAuditSummaryRecord = Readonly<{
  id: MinimalTextAdapterAuditApprovalJoinReviewId;
  key: TextAdapterAuditApprovalJoinReviewAuditSummaryKey;
  auditSummaryVersion: TextAdapterAuditApprovalJoinReviewAuditSummaryVersion;
  textAdapterAuditApprovalJoinReviewId:
    MinimalTextAdapterAuditApprovalJoinReviewId;
  auditPosture: MinimalTextAdapterAuditApprovalJoinAuditPosture;
  joinReferenceState: "preview-only / not persisted";
  captureReferenceState: "preview-only / not persisted";
  adapterReferenceState: "preview-only / not persisted";
  fixtureResponseReferenceState: "preview-only / not persisted";
  auditReferenceState: "preview-only / not persisted";
  approvalReferenceState: "preview-only / not persisted";
  evidencePacketState: "preview-only";
  serverOnlyJoinHelperEvidenceSummary: string;
  deterministicAuditJoinEvidenceSummary: string;
  deterministicApprovalJoinEvidenceSummary: string;
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
  providerAdapterSelectionAndCredentialReferenceMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH;
}>;

export type TextAdapterAuditApprovalJoinAcceptancePostureRecord = Readonly<{
  id: MinimalTextAdapterAuditApprovalJoinReviewId;
  key: TextAdapterAuditApprovalJoinAcceptancePostureKey;
  acceptancePostureVersion:
    TextAdapterAuditApprovalJoinAcceptancePostureVersion;
  textAdapterAuditApprovalJoinReviewId:
    MinimalTextAdapterAuditApprovalJoinReviewId;
  acceptanceState: MinimalTextAdapterAuditApprovalJoinAcceptanceState;
  fixtureOnlyAcceptanceSummary: string;
  backendOnlyAcceptanceSummary: string;
  serverOnlyAcceptanceSummary: string;
  inMemoryOnlyAcceptanceSummary: string;
  redactedPromptAcceptanceSummary: string;
  auditJoinAcceptanceSummary: string;
  approvalJoinAcceptanceSummary: string;
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
  credentialReferenceBlockers: readonly string[];
  providerSelectionBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitTextAdapterAuditApprovalJoinFixtureAcceptedLiveProviderExecutionNotAcceptedStatement:
    MinimalTextAdapterAuditApprovalJoinAcceptanceStatement;
}>;

export type TextAdapterAuditApprovalJoinReviewCapabilityFamilyGroup =
  Readonly<{
    capabilityFamilyId:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["id"];
    capabilityFamilyLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
    reviewCount: number;
    reviews: readonly BackendOwnedMinimalManualGatedTextAdapterAuditApprovalJoinReviewRecord[];
  }>;

export type TextAdapterAuditApprovalJoinReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AthenaModelRoutingPreviewRecord["workspaceTarget"];
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedTextAdapterAuditApprovalJoinReviewRecord[];
}>;

export type TextAdapterAuditApprovalJoinReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH;
  reviewCount: number;
  outputReviewCount: number;
  gateFailureCount: number;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  currentReadiness: MinimalTextAdapterAuditApprovalJoinReviewCurrentReadiness;
  acceptanceState: MinimalTextAdapterAuditApprovalJoinAcceptanceState;
  summaryLines: readonly string[];
}>;

export type TextAdapterAuditApprovalJoinOutputReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH;
  outputReviewCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type TextAdapterAuditApprovalJoinGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH;
  gateFailureCount: number;
  summaryLines: readonly string[];
  topFailedGateLabels: readonly string[];
  nextSafeAction: string;
}>;

export type TextAdapterAuditApprovalJoinRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  currentReadiness: MinimalTextAdapterAuditApprovalJoinReviewCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;
