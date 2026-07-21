import type { AthenaModelRoutingPreviewId } from "../athena-model-routing-provider-selection-preview";
import type {
  BackendOwnedMinimalManualGatedTextAdapterAuditApprovalJoinReviewRecord,
  TextAdapterAuditApprovalJoinAcceptancePostureRecord,
  TextAdapterAuditApprovalJoinReviewAuditSummaryRecord,
} from "../min-text-aa-review";
import type {
  BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord,
} from "../min-text-capture-review";
import type {
  OpaqueCredentialReferenceInputKey,
  OpaqueCredentialReferenceOutputKey,
  ProviderAdapterSelectionAdmissionCheckKey,
  ProviderAdapterSelectionApprovalPreviewKey,
  ProviderAdapterSelectionAuditPreviewKey,
  ProviderAdapterSelectionBlockedLiveProviderSummaryKey,
  ProviderAdapterSelectionCapabilityFamilyLabel,
  ProviderAdapterSelectionEnvelopeKey,
  ProviderAdapterSelectionEvidencePreviewKey,
  ProviderAdapterSelectionGateId,
  ProviderAdapterSelectionInputKey,
  ProviderAdapterSelectionLocalPrivateAlternativeLabel,
  ProviderAdapterSelectionMvpId,
  ProviderAdapterSelectionMvpKey,
  ProviderAdapterSelectionOpaqueCredentialReferenceLabel,
  ProviderAdapterSelectionOutputKey,
  ProviderAdapterSelectionProviderSlotLabel,
  ProviderAdapterSelectionSafetyGateSummaryKey,
  ProviderAdapterSelectionWorkspaceTarget,
  ProviderSlotMatrixKey,
} from "../min-provider-select/min-provider-select-types";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5866-5897 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_PHASE =
  5897;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH =
  "5834-5865 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH =
  "5898-5929 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission MVP";

export const MINIMAL_PROVIDER_ADAPTER_SELECTION_REVIEW_SECTION_TITLES = [
  "Backend-owned minimal provider adapter selection and credential reference review",
  "Provider adapter selection output review",
  "Provider adapter selection gate failure review",
  "Provider adapter selection recovery plan",
  "Provider adapter selection recovery readiness",
  "Provider adapter selection review audit summary",
  "Provider adapter selection acceptance posture",
] as const;

export type ProviderSelectionReviewSectionTitle =
  (typeof MINIMAL_PROVIDER_ADAPTER_SELECTION_REVIEW_SECTION_TITLES)[number];

export type ProviderSelectionCredentialReferenceReviewId =
  | AthenaModelRoutingPreviewId
  | "fallback-disabled-request";
export type ProviderSelectionReviewRequestLabel =
  | "conversational planning request"
  | "code assistance request"
  | "website copy/code request"
  | "audit/recovery explanation request"
  | "fallback disabled request";

export type ProviderSelectionCredentialReferenceReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-review-preview-v1";
export type ProviderSelectionOutputReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-output-review-preview-v1";
export type ProviderSelectionGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-gate-failure-review-preview-v1";
export type ProviderSelectionRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-plan-preview-v1";
export type ProviderSelectionRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-readiness-checklist-v1";
export type ProviderSelectionReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-review-audit-summary-preview-v1";
export type ProviderSelectionAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-acceptance-posture-preview-v1";
export type ProviderSelectionReviewSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-review-summary-v1";
export type ProviderSelectionOutputReviewSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-output-review-summary-v1";
export type ProviderSelectionGateFailureSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-gate-failure-summary-v1";
export type ProviderSelectionRecoverySummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-summary-v1";

export type ProviderSelectionReviewSource = "Athena / Jarvis Model Gateway";
export type ProviderSelectionReviewMode = "preview-only";
export type ProviderSelectionReviewPosture =
  "minimal provider selection credential reference review / backend-only / credential-reference-only / fixture-only / not provider-capable / not persistent";
export type ProviderSelectionReviewCurrentReadiness =
  "minimal-provider-selection-credential-reference-review-only / backend-only / credential-reference-only / fixture-only / not provider-capable / not persistent";
export type ProviderSelectionReviewSeverity = "critical" | "high" | "medium";
export type ProviderSelectionRecoveryPosture = "manual review only";
export type ProviderSelectionRetryPosture = "disabled";
export type ProviderSelectionFallbackPosture = "disabled";
export type ProviderSelectionAuditPosture = "preview-only";
export type ProviderSelectionAcceptanceState =
  "not accepted for live provider execution / provider selection credential reference fixture MVP accepted only";
export type ProviderSelectionRecoveryReadinessState =
  "reviewed" | "blocked" | "backend future required";
export type ProviderSelectionRecoveryReadinessOwner =
  "operator" | "backend future" | "safety review";
export type ProviderSelectionPreviewOnlyStatement =
  "Provider adapter selection review is preview-only.";
export type ProviderSelectionFixtureOnlyStatement =
  "Provider selection fixture only. No secret read. No provider call. No persistence.";
export type ProviderSelectionNoLiveGatePassStatement =
  "No live gate pass.";
export type ProviderSelectionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence.";
export type ProviderSelectionAcceptanceStatement =
  "Provider selection credential reference fixture accepted only. Live provider execution not accepted.";

export type ProviderSelectionServerOnlyHelperState = "exists";
export type ProviderSlotSelectionState = "deterministic fixture-only";
export type ProviderSelectionPreviewState = "preview-only";
export type ProviderSelectionCredentialReferenceState = "opaque label only";
export type ProviderSelectionCredentialValueState = "not present / not read";
export type ProviderSelectionEnvVarState = "not read";
export type ProviderSelectionProviderKeyState = "not read";
export type ProviderSelectionProviderSdkImportState = "not imported";
export type ProviderSelectionProviderExecutionState = "blocked";
export type ProviderSelectionProviderResponseState = "not received";
export type ProviderSelectionModelCallState = "not called";
export type ProviderSelectionModelOutputState = "not generated";
export type ProviderSelectionRedactedPromptEnvelopeState = "preview-only";
export type ProviderSelectionPromptTransmissionState = "not sent";
export type ProviderSelectionFrontendRequestState = "not created";
export type ProviderSelectionApiRouteState = "not created";
export type ProviderSelectionDispatchState = "not dispatched";
export type ProviderSelectionJobExecutionState = "not executed";
export type ProviderSelectionPersistenceState = "not implemented";
export type ProviderSelectionApprovalFixtureState = "preview-only";
export type ProviderSelectionManualConfirmationFixtureState = "preview-only";
export type ProviderSelectionApprovalTokenState = "not issued";
export type ProviderSelectionApprovalLeaseState = "not created";
export type ProviderSelectionEvidencePacketState =
  "preview-only / not persisted";
export type ProviderSelectionKillSwitchState = "inactive fixture only";
export type ProviderSelectionOutputSelectionState =
  "selected-provider-slot-and-opaque-credential-reference-fixture-only";
export type ProviderSelectionDeterministicPreviewIdPosture =
  "deterministic preview id only";
export type ProviderSelectionDeterministicOpaqueReferenceIdPosture =
  "deterministic opaque reference id only";
export type ProviderSelectionDeterministicPreviewDigestPosture =
  "deterministic preview digest only";
export type ProviderSelectionCredentialReferencePosture =
  "opaque-reference-only";
export type ProviderSelectionOutputClassification =
  "deterministic provider selection fixture only";
export type ProviderSelectionSelectionReferenceState =
  "preview-only / not persisted";
export type ProviderSelectionCredentialReferenceAuditState =
  "opaque label only / not persisted";
export type ProviderSelectionCurrentPosture = "preview-only";
export type ProviderSelectionGateState = "blocked";

export type ProviderSelectionCredentialReferenceReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-review:${ProviderSelectionCredentialReferenceReviewId}`;
export type ProviderSelectionOutputReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-output-review:${ProviderSelectionCredentialReferenceReviewId}`;
export type ProviderSelectionGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-gate-failure-review:${ProviderSelectionCredentialReferenceReviewId}:${ProviderAdapterSelectionGateId}`;
export type ProviderSelectionRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-plan:${ProviderSelectionCredentialReferenceReviewId}`;
export type ProviderSelectionRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-readiness:${ProviderSelectionCredentialReferenceReviewId}:${ProviderSelectionRecoveryReadinessChecklistId}`;
export type ProviderSelectionReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-review-audit-summary:${ProviderSelectionCredentialReferenceReviewId}`;
export type ProviderSelectionAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-acceptance-posture:${ProviderSelectionCredentialReferenceReviewId}`;

type ReviewOnlySourceReference<Prefix extends string> =
  `${Prefix}:${ProviderSelectionCredentialReferenceReviewId}`;

export type ProviderSelectionCredentialReferenceMvpSourceReference =
  ProviderAdapterSelectionMvpKey;
export type ProviderSelectionInputSourceReference =
  | ProviderAdapterSelectionInputKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-provider-adapter-selection-input-review-source">;
export type ProviderSelectionAdmissionCheckSourceReference =
  | ProviderAdapterSelectionAdmissionCheckKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-provider-adapter-selection-admission-check-review-source">;
export type ProviderSlotMatrixSourceReference =
  | ProviderSlotMatrixKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-provider-slot-matrix-review-source">;
export type ProviderSlotSelectionOutputSourceReference =
  | ProviderAdapterSelectionOutputKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-provider-adapter-selection-output-review-source">;
export type OpaqueCredentialReferenceInputSourceReference =
  | OpaqueCredentialReferenceInputKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-opaque-credential-reference-input-review-source">;
export type OpaqueCredentialReferenceOutputSourceReference =
  | OpaqueCredentialReferenceOutputKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-opaque-credential-reference-output-review-source">;
export type ProviderSelectionEnvelopeSourceReference =
  | ProviderAdapterSelectionEnvelopeKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-provider-adapter-selection-envelope-review-source">;
export type ProviderSelectionEvidencePreviewSourceReference =
  | ProviderAdapterSelectionEvidencePreviewKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-provider-adapter-selection-evidence-preview-review-source">;
export type ProviderSelectionAuditPreviewSourceReference =
  | ProviderAdapterSelectionAuditPreviewKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-provider-adapter-selection-audit-preview-review-source">;
export type ProviderSelectionApprovalPreviewSourceReference =
  | ProviderAdapterSelectionApprovalPreviewKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-provider-adapter-selection-approval-preview-review-source">;
export type ProviderSelectionSafetyGateSummarySourceReference =
  | ProviderAdapterSelectionSafetyGateSummaryKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-provider-adapter-selection-safety-gate-summary-review-source">;
export type ProviderSelectionBlockedLiveProviderSummarySourceReference =
  | ProviderAdapterSelectionBlockedLiveProviderSummaryKey
  | ReviewOnlySourceReference<"backend-owned-minimal-manual-gated-provider-adapter-selection-blocked-live-provider-summary-review-source">;
export type TextAdapterAuditApprovalJoinReviewSourceReference =
  BackendOwnedMinimalManualGatedTextAdapterAuditApprovalJoinReviewRecord["key"];
export type TextAdapterAuditApprovalJoinAcceptancePostureSourceReference =
  TextAdapterAuditApprovalJoinAcceptancePostureRecord["key"];
export type TextAdapterAuditApprovalJoinAuditSummarySourceReference =
  TextAdapterAuditApprovalJoinReviewAuditSummaryRecord["key"];
export type TextAdapterResultCaptureReviewSourceReference =
  BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord["key"];

export type ProviderSelectionRecoveryReadinessChecklistId =
  | "server-only-provider-selection-helper-reviewed"
  | "provider-selection-input-reviewed"
  | "provider-selection-admission-check-reviewed"
  | "provider-slot-matrix-reviewed"
  | "provider-slot-selection-output-reviewed"
  | "opaque-credential-reference-input-reviewed"
  | "opaque-credential-reference-output-reviewed"
  | "provider-selection-envelope-reviewed"
  | "evidence-preview-reviewed"
  | "audit-preview-reviewed"
  | "approval-preview-reviewed"
  | "text-adapter-audit-approval-join-review-dependency-reviewed"
  | "selected-provider-slot-reviewed"
  | "backup-provider-slot-reviewed"
  | "local-private-alternative-reviewed"
  | "opaque-credential-reference-reviewed"
  | "credential-value-absent-reviewed"
  | "credential-value-not-read-reviewed"
  | "env-vars-not-read-reviewed"
  | "provider-key-not-read-reviewed"
  | "provider-sdk-import-boundary-reviewed"
  | "provider-execution-boundary-reviewed"
  | "redacted-prompt-envelope-reviewed"
  | "prompt-transmission-blocked-reviewed"
  | "manual-approval-fixture-reviewed"
  | "manual-confirmation-fixture-reviewed"
  | "kill-switch-fixture-reviewed"
  | "provider-boundary-reviewed"
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
  | "provider-adapter-dry-run-admission-not-implemented";

export type ProviderSelectionRecoveryReadinessChecklistLabel =
  | "server-only provider selection helper reviewed"
  | "provider selection input reviewed"
  | "provider selection admission check reviewed"
  | "provider slot matrix reviewed"
  | "provider slot selection output reviewed"
  | "opaque credential reference input reviewed"
  | "opaque credential reference output reviewed"
  | "provider selection envelope reviewed"
  | "evidence preview reviewed"
  | "audit preview reviewed"
  | "approval preview reviewed"
  | "text adapter audit approval join review dependency reviewed"
  | "selected provider slot reviewed"
  | "backup provider slot reviewed"
  | "local/private alternative reviewed"
  | "opaque credential reference reviewed"
  | "credential value absent reviewed"
  | "credential value not read reviewed"
  | "env vars not read reviewed"
  | "provider key not read reviewed"
  | "provider SDK import boundary reviewed"
  | "provider execution boundary reviewed"
  | "redacted prompt envelope reviewed"
  | "prompt transmission blocked reviewed"
  | "manual approval fixture reviewed"
  | "manual confirmation fixture reviewed"
  | "kill switch fixture reviewed"
  | "provider boundary reviewed"
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
  | "provider adapter dry-run admission not implemented";

export type ProviderSelectionCredentialReferenceReviewRecord = Readonly<{
  key: ProviderSelectionCredentialReferenceReviewKey;
  reviewVersion: ProviderSelectionCredentialReferenceReviewVersion;
  reviewId: ProviderSelectionCredentialReferenceReviewId;
  requestLabel: ProviderSelectionReviewRequestLabel;
  source: ProviderSelectionReviewSource;
  reviewMode: ProviderSelectionReviewMode;
  reviewPosture: ProviderSelectionReviewPosture;
  sourceProviderSelectionCredentialReferenceMvpReference: ProviderSelectionCredentialReferenceMvpSourceReference;
  sourceProviderAdapterSelectionInputReference: ProviderSelectionInputSourceReference;
  sourceProviderAdapterSelectionAdmissionCheckReference: ProviderSelectionAdmissionCheckSourceReference;
  sourceProviderSlotMatrixReference: ProviderSlotMatrixSourceReference;
  sourceProviderSlotSelectionOutputReference: ProviderSlotSelectionOutputSourceReference;
  sourceOpaqueCredentialReferenceInputReference: OpaqueCredentialReferenceInputSourceReference;
  sourceOpaqueCredentialReferenceOutputReference: OpaqueCredentialReferenceOutputSourceReference;
  sourceProviderAdapterSelectionEnvelopeReference: ProviderSelectionEnvelopeSourceReference;
  sourceProviderAdapterSelectionEvidencePreviewReference: ProviderSelectionEvidencePreviewSourceReference;
  sourceProviderAdapterSelectionAuditPreviewReference: ProviderSelectionAuditPreviewSourceReference;
  sourceProviderAdapterSelectionApprovalPreviewReference: ProviderSelectionApprovalPreviewSourceReference;
  sourceProviderAdapterSelectionSafetyGateSummaryReference: ProviderSelectionSafetyGateSummarySourceReference;
  sourceProviderAdapterSelectionBlockedLiveProviderSummaryReference: ProviderSelectionBlockedLiveProviderSummarySourceReference;
  sourceTextAdapterAuditApprovalJoinReviewReference: TextAdapterAuditApprovalJoinReviewSourceReference;
  sourceTextAdapterAuditApprovalJoinAcceptancePostureReference: TextAdapterAuditApprovalJoinAcceptancePostureSourceReference;
  sourceTextAdapterAuditApprovalJoinAuditSummaryReference: TextAdapterAuditApprovalJoinAuditSummarySourceReference;
  sourceTextAdapterResultCaptureReviewReference: TextAdapterResultCaptureReviewSourceReference;
  selectedCapabilityFamily: ProviderAdapterSelectionCapabilityFamilyLabel;
  workspaceTarget: ProviderAdapterSelectionWorkspaceTarget;
  providerSlotLabel: ProviderAdapterSelectionProviderSlotLabel;
  backupProviderSlotLabel: ProviderAdapterSelectionProviderSlotLabel;
  localPrivateAlternativeLabel: ProviderAdapterSelectionLocalPrivateAlternativeLabel;
  opaqueCredentialReferenceLabel: ProviderAdapterSelectionOpaqueCredentialReferenceLabel;
  serverOnlyProviderSelectionHelperState: ProviderSelectionServerOnlyHelperState;
  providerSlotSelectionState: ProviderSlotSelectionState;
  selectedProviderSlotState: ProviderSelectionPreviewState;
  backupProviderSlotState: ProviderSelectionPreviewState;
  localPrivateAlternativeState: ProviderSelectionPreviewState;
  credentialReferenceState: ProviderSelectionCredentialReferenceState;
  credentialValueState: ProviderSelectionCredentialValueState;
  envVarState: ProviderSelectionEnvVarState;
  providerKeyState: ProviderSelectionProviderKeyState;
  providerSdkImportState: ProviderSelectionProviderSdkImportState;
  providerExecutionState: ProviderSelectionProviderExecutionState;
  providerResponseState: ProviderSelectionProviderResponseState;
  modelCallState: ProviderSelectionModelCallState;
  modelOutputState: ProviderSelectionModelOutputState;
  redactedPromptEnvelopeState: ProviderSelectionRedactedPromptEnvelopeState;
  promptTransmissionState: ProviderSelectionPromptTransmissionState;
  frontendRequestState: ProviderSelectionFrontendRequestState;
  apiRouteState: ProviderSelectionApiRouteState;
  queueDispatchState: ProviderSelectionDispatchState;
  workerDispatchState: ProviderSelectionDispatchState;
  jobExecutionState: ProviderSelectionJobExecutionState;
  resultPersistenceState: ProviderSelectionPersistenceState;
  auditPersistenceState: ProviderSelectionPersistenceState;
  approvalPersistenceState: ProviderSelectionPersistenceState;
  databaseWriteState: ProviderSelectionPersistenceState;
  fileWriteState: ProviderSelectionPersistenceState;
  approvalFixtureState: ProviderSelectionApprovalFixtureState;
  manualConfirmationFixtureState: ProviderSelectionManualConfirmationFixtureState;
  approvalTokenState: ProviderSelectionApprovalTokenState;
  approvalLeaseState: ProviderSelectionApprovalLeaseState;
  evidencePacketState: ProviderSelectionEvidencePacketState;
  killSwitchState: ProviderSelectionKillSwitchState;
  retryPosture: ProviderSelectionRetryPosture;
  fallbackPosture: ProviderSelectionFallbackPosture;
  nextProviderAdapterDryRunAdmissionMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH;
}>;

export type ProviderSelectionOutputReviewRecord = Readonly<{
  key: ProviderSelectionOutputReviewKey;
  outputReviewVersion: ProviderSelectionOutputReviewVersion;
  providerSelectionReviewId: ProviderSelectionCredentialReferenceReviewId;
  sourceProviderSlotSelectionOutputReference: ProviderSlotSelectionOutputSourceReference;
  sourceOpaqueCredentialReferenceOutputReference: OpaqueCredentialReferenceOutputSourceReference;
  sourceProviderAdapterSelectionEnvelopeReference: ProviderSelectionEnvelopeSourceReference;
  selectionState: ProviderSelectionOutputSelectionState;
  providerSelectionIdPosture: ProviderSelectionDeterministicPreviewIdPosture;
  providerSlotIdPosture: ProviderSelectionDeterministicPreviewIdPosture;
  credentialReferenceIdPosture: ProviderSelectionDeterministicOpaqueReferenceIdPosture;
  selectionDigestPosture: ProviderSelectionDeterministicPreviewDigestPosture;
  selectedProviderSlotPosture: ProviderSelectionPreviewState;
  backupProviderSlotPosture: ProviderSelectionPreviewState;
  localPrivateAlternativePosture: ProviderSelectionPreviewState;
  credentialReferencePosture: ProviderSelectionCredentialReferencePosture;
  credentialValueState: ProviderSelectionCredentialValueState;
  envVarState: ProviderSelectionEnvVarState;
  providerKeyState: ProviderSelectionProviderKeyState;
  providerSdkImportState: ProviderSelectionProviderSdkImportState;
  providerExecutionState: ProviderSelectionProviderExecutionState;
  promptTransmissionState: ProviderSelectionPromptTransmissionState;
  providerResponseState: ProviderSelectionProviderResponseState;
  modelOutputState: ProviderSelectionModelOutputState;
  outputClassification: ProviderSelectionOutputClassification;
  resultPersistenceState: ProviderSelectionPersistenceState;
  auditPersistenceState: ProviderSelectionPersistenceState;
  approvalPersistenceState: ProviderSelectionPersistenceState;
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
  explicitProviderSelectionFixtureOnlyNoSecretReadNoProviderCallNoPersistenceStatement:
    ProviderSelectionFixtureOnlyStatement;
}>;

export type ProviderSelectionGateFailureReviewRecord = Readonly<{
  key: ProviderSelectionGateFailureReviewKey;
  gateFailureReviewVersion: ProviderSelectionGateFailureReviewVersion;
  providerSelectionReviewId: ProviderSelectionCredentialReferenceReviewId;
  failedGateId: ProviderAdapterSelectionGateId;
  failedGateLabel: string;
  gateState: ProviderSelectionGateState;
  severity: ProviderSelectionReviewSeverity;
  affectedCapabilityFamily: ProviderAdapterSelectionCapabilityFamilyLabel;
  affectedWorkspaceTarget: ProviderAdapterSelectionWorkspaceTarget;
  affectedProviderSlot: ProviderAdapterSelectionProviderSlotLabel;
  affectedCredentialReference: ProviderAdapterSelectionOpaqueCredentialReferenceLabel;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  providerAdapterDryRunAdmissionMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH;
  nextSafeAction: string;
  explicitNoLiveGatePassStatement: ProviderSelectionNoLiveGatePassStatement;
}>;

export type ProviderSelectionRecoveryPlanPreviewRecord = Readonly<{
  key: ProviderSelectionRecoveryPlanKey;
  recoveryPlanVersion: ProviderSelectionRecoveryPlanVersion;
  providerSelectionReviewId: ProviderSelectionCredentialReferenceReviewId;
  recoveryPosture: ProviderSelectionRecoveryPosture;
  serverOnlyProviderSelectionHelperRecovery: string;
  providerSelectionInputRecovery: string;
  providerSelectionAdmissionCheckRecovery: string;
  providerSlotMatrixRecovery: string;
  providerSlotSelectionOutputRecovery: string;
  opaqueCredentialReferenceInputRecovery: string;
  opaqueCredentialReferenceOutputRecovery: string;
  providerSelectionEnvelopeRecovery: string;
  evidencePreviewRecovery: string;
  auditPreviewRecovery: string;
  approvalPreviewRecovery: string;
  credentialReferenceRecovery: string;
  credentialValueBoundaryRecovery: string;
  envVarBoundaryRecovery: string;
  providerKeyBoundaryRecovery: string;
  providerSdkBoundaryRecovery: string;
  providerExecutionBoundaryRecovery: string;
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
  dryRunAdmissionMissingRecovery: string;
  retryPosture: ProviderSelectionRetryPosture;
  fallbackPosture: ProviderSelectionFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH;
  explicitNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement:
    ProviderSelectionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement;
}>;

export type ProviderSelectionRecoveryReadinessChecklistRecord = Readonly<{
  key: ProviderSelectionRecoveryReadinessChecklistKey;
  checklistVersion: ProviderSelectionRecoveryReadinessChecklistVersion;
  providerSelectionReviewId: ProviderSelectionCredentialReferenceReviewId;
  checklistId: ProviderSelectionRecoveryReadinessChecklistId;
  label: ProviderSelectionRecoveryReadinessChecklistLabel;
  state: ProviderSelectionRecoveryReadinessState;
  severity: ProviderSelectionReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ProviderSelectionRecoveryReadinessOwner;
  currentPosture: ProviderSelectionCurrentPosture;
  providerAdapterDryRunAdmissionMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH;
  nextSafeAction: string;
}>;

export type ProviderSelectionReviewAuditSummaryRecord = Readonly<{
  key: ProviderSelectionReviewAuditSummaryKey;
  auditSummaryVersion: ProviderSelectionReviewAuditSummaryVersion;
  providerSelectionReviewId: ProviderSelectionCredentialReferenceReviewId;
  auditPosture: ProviderSelectionAuditPosture;
  selectionReferenceState: ProviderSelectionSelectionReferenceState;
  providerSlotReferenceState: ProviderSelectionSelectionReferenceState;
  credentialReferenceState: ProviderSelectionCredentialReferenceAuditState;
  credentialValueState: ProviderSelectionCredentialValueState;
  envVarState: ProviderSelectionEnvVarState;
  providerKeyState: ProviderSelectionProviderKeyState;
  evidencePacketState: ProviderSelectionEvidencePacketState;
  serverOnlySelectionHelperEvidenceSummary: string;
  deterministicProviderSlotSelectionEvidenceSummary: string;
  opaqueCredentialReferenceEvidenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noSecretReadStatement: string;
  noEnvVarReadStatement: string;
  noProviderOutputStatement: string;
  noModelOutputStatement: string;
  noPromptSendingStatement: string;
  noResultPersistenceStatement: string;
  noAuditPersistenceStatement: string;
  noApprovalPersistenceStatement: string;
  noDatabaseWriteStatement: string;
  noFileWriteStatement: string;
  providerAdapterDryRunAdmissionMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH;
}>;

export type ProviderSelectionAcceptancePostureRecord = Readonly<{
  key: ProviderSelectionAcceptancePostureKey;
  acceptancePostureVersion: ProviderSelectionAcceptancePostureVersion;
  providerSelectionReviewId: ProviderSelectionCredentialReferenceReviewId;
  acceptanceState: ProviderSelectionAcceptanceState;
  fixtureOnlyAcceptanceSummary: string;
  backendOnlyAcceptanceSummary: string;
  serverOnlyAcceptanceSummary: string;
  credentialReferenceOnlyAcceptanceSummary: string;
  opaqueCredentialReferenceAcceptanceSummary: string;
  selectedProviderSlotAcceptanceSummary: string;
  backupProviderSlotAcceptanceSummary: string;
  localPrivateAlternativeAcceptanceSummary: string;
  providerBlockers: readonly string[];
  credentialValueBlockers: readonly string[];
  envVarBlockers: readonly string[];
  promptBlockers: readonly string[];
  modelBlockers: readonly string[];
  queueWorkerJobBlockers: readonly string[];
  resultPersistenceBlockers: readonly string[];
  auditPersistenceBlockers: readonly string[];
  approvalPersistenceBlockers: readonly string[];
  databaseFileBlockers: readonly string[];
  approvalBlockers: readonly string[];
  auditBlockers: readonly string[];
  dryRunAdmissionBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitProviderSelectionCredentialReferenceFixtureAcceptedLiveProviderExecutionNotAcceptedStatement:
    ProviderSelectionAcceptanceStatement;
}>;

export type ProviderSelectionReviewSummary = Readonly<{
  version: ProviderSelectionReviewSummaryVersion;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH;
  reviewCount: number;
  currentReadiness: ProviderSelectionReviewCurrentReadiness;
  acceptanceState: ProviderSelectionAcceptanceState;
  recoveryPosture: ProviderSelectionRecoveryPosture;
  retryPosture: ProviderSelectionRetryPosture;
  fallbackPosture: ProviderSelectionFallbackPosture;
  summaryLines: readonly string[];
}>;

export type ProviderSelectionOutputReviewSummary = Readonly<{
  version: ProviderSelectionOutputReviewSummaryVersion;
  recordCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderSelectionGateFailureSummary = Readonly<{
  version: ProviderSelectionGateFailureSummaryVersion;
  recordCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderSelectionRecoverySummary = Readonly<{
  version: ProviderSelectionRecoverySummaryVersion;
  planCount: number;
  checklistCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderAdapterDryRunAdmissionMvpChecklist = readonly string[];

export type ProviderSelectionReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamily: ProviderAdapterSelectionCapabilityFamilyLabel;
  reviews: readonly ProviderSelectionCredentialReferenceReviewRecord[];
}>;

export type ProviderSelectionReviewProviderSlotGroup = Readonly<{
  providerSlot: ProviderAdapterSelectionProviderSlotLabel;
  reviews: readonly ProviderSelectionCredentialReferenceReviewRecord[];
}>;

export type ProviderSelectionReviewCredentialReferenceGroup = Readonly<{
  credentialReference: ProviderAdapterSelectionOpaqueCredentialReferenceLabel;
  reviews: readonly ProviderSelectionCredentialReferenceReviewRecord[];
}>;
