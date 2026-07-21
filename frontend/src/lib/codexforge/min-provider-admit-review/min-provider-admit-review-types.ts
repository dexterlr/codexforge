import type {
  ProviderSelectionAcceptancePostureRecord,
  ProviderSelectionCredentialReferenceReviewId,
  ProviderSelectionReviewAuditSummaryRecord,
} from "../min-provider-review/min-provider-review-types";
import type {
  ProviderDryRunAdmissionCapabilityFamilyLabel,
  ProviderDryRunAdmissionCheckKey,
  ProviderDryRunAdmissionEnvelopeKey,
  ProviderDryRunAdmissionGateId,
  ProviderDryRunAdmissionInputKey,
  ProviderDryRunAdmissionMvpId,
  ProviderDryRunAdmissionMvpKey,
  ProviderDryRunAdmissionOutputKey,
  ProviderDryRunAdmissionProviderSlotLabel,
  ProviderDryRunAdmissionWorkspaceTarget,
  ProviderDryRunAuditPreviewKey,
  ProviderDryRunBlockedExecutionSummaryKey,
  ProviderDryRunEvidencePreviewKey,
  ProviderDryRunIntentPreviewKey,
  ProviderDryRunAdmissionOpaqueCredentialReferenceLabel,
  ProviderDryRunApprovalPreviewKey,
  ProviderDryRunReadinessMatrixRecord,
  ProviderDryRunSafetyGateSummaryKey,
} from "../min-provider-admit/min-provider-admit-types";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5930-5961 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_PHASE =
  5961;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH =
  "5898-5929 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH =
  "5962-5993 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution MVP";

export const MINIMAL_PROVIDER_DRY_RUN_ADMISSION_REVIEW_SECTION_TITLES = [
  "Backend-owned minimal provider adapter dry-run admission review",
  "Provider adapter dry-run admission output review",
  "Provider adapter dry-run admission gate failure review",
  "Provider adapter dry-run admission recovery plan",
  "Provider adapter dry-run admission recovery readiness",
  "Provider adapter dry-run admission review audit summary",
  "Provider adapter dry-run admission acceptance posture",
] as const;

export type ProviderDryRunAdmissionReviewSectionTitle =
  (typeof MINIMAL_PROVIDER_DRY_RUN_ADMISSION_REVIEW_SECTION_TITLES)[number];

export type ProviderDryRunAdmissionReviewId =
  | "conversational-planning-request"
  | "code-assistance-request"
  | "website-copy-code-request"
  | "audit-recovery-explanation-request"
  | "fallback-disabled-request";

export type ProviderDryRunAdmissionReviewRequestLabel =
  | "conversational planning request"
  | "code assistance request"
  | "website copy/code request"
  | "audit/recovery explanation request"
  | "fallback disabled request";

export type ProviderDryRunAdmissionReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-review-preview-v1";
export type ProviderDryRunAdmissionOutputReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output-review-preview-v1";
export type ProviderDryRunAdmissionGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-gate-failure-review-preview-v1";
export type ProviderDryRunAdmissionRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-recovery-plan-preview-v1";
export type ProviderDryRunAdmissionRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-recovery-readiness-checklist-v1";
export type ProviderDryRunAdmissionReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-review-audit-summary-preview-v1";
export type ProviderDryRunAdmissionAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-acceptance-posture-preview-v1";
export type ProviderDryRunAdmissionReviewSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-review-summary-v1";
export type ProviderDryRunAdmissionOutputReviewSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output-review-summary-v1";
export type ProviderDryRunAdmissionGateFailureSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-gate-failure-summary-v1";
export type ProviderDryRunAdmissionRecoverySummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-recovery-summary-v1";

export type ProviderDryRunAdmissionReviewSource =
  "Athena / Jarvis Model Gateway";
export type ProviderDryRunAdmissionReviewMode = "preview-only";
export type ProviderDryRunAdmissionReviewPosture =
  "minimal provider dry-run admission review / backend-only / admission-only / credential-reference-only / fixture-only / not-provider-executing / not persistent";
export type ProviderDryRunAdmissionReviewCurrentReadiness =
  "minimal-provider-dry-run-admission-review-only / backend-only / admission-only / credential-reference-only / fixture-only / not-provider-executing / not persistent";
export type ProviderDryRunAdmissionReviewSeverity =
  | "critical"
  | "high"
  | "medium";
export type ProviderDryRunAdmissionRecoveryPosture = "manual review only";
export type ProviderDryRunAdmissionRetryPosture = "disabled";
export type ProviderDryRunAdmissionFallbackPosture = "disabled";
export type ProviderDryRunAdmissionAuditPosture = "preview-only";
export type ProviderDryRunAdmissionAcceptanceState =
  "not accepted for live provider execution / provider dry-run admission fixture MVP accepted only";
export type ProviderDryRunAdmissionRecoveryReadinessState =
  | "reviewed"
  | "blocked"
  | "backend future required";
export type ProviderDryRunAdmissionRecoveryReadinessOwner =
  "operator" | "backend future" | "safety review";
export type ProviderDryRunAdmissionFixtureOnlyStatement =
  "Dry-run admission fixture only. No secret read. No provider call. No persistence.";
export type ProviderDryRunAdmissionNoLiveGatePassStatement =
  "No live gate pass.";
export type ProviderDryRunAdmissionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence.";
export type ProviderDryRunAdmissionAcceptanceStatement =
  "Provider dry-run admission fixture accepted only. Live provider execution not accepted.";

export type ProviderDryRunAdmissionReviewHelperState = "exists";
export type ProviderDryRunAdmissionReviewState = "deterministic fixture-only";
export type ProviderDryRunAdmissionPreviewState = "preview-only";
export type ProviderDryRunExecutionState = "blocked";
export type ProviderDryRunAdmissionCredentialReferenceState =
  "opaque label only";
export type ProviderDryRunAdmissionCredentialValueState =
  "not present / not read";
export type ProviderDryRunAdmissionEnvVarState = "not read";
export type ProviderDryRunAdmissionProviderKeyState = "not read";
export type ProviderDryRunAdmissionProviderSdkImportState = "not imported";
export type ProviderDryRunAdmissionProviderExecutionState = "blocked";
export type ProviderDryRunAdmissionProviderResponseState = "not received";
export type ProviderDryRunAdmissionModelCallState = "not called";
export type ProviderDryRunAdmissionModelOutputState = "not generated";
export type ProviderDryRunAdmissionPromptTransmissionState = "not sent";
export type ProviderDryRunAdmissionFrontendRequestState = "not created";
export type ProviderDryRunAdmissionApiRouteState = "not created";
export type ProviderDryRunAdmissionDispatchState = "not dispatched";
export type ProviderDryRunAdmissionJobExecutionState = "not executed";
export type ProviderDryRunAdmissionPersistenceState = "not implemented";
export type ProviderDryRunAdmissionApprovalFixtureState = "preview-only";
export type ProviderDryRunAdmissionManualConfirmationFixtureState =
  "preview-only";
export type ProviderDryRunAdmissionApprovalTokenState = "not issued";
export type ProviderDryRunAdmissionApprovalLeaseState = "not created";
export type ProviderDryRunAdmissionEvidencePacketState =
  "preview-only / not persisted";
export type ProviderDryRunAdmissionKillSwitchState =
  "inactive fixture only";
export type ProviderDryRunAdmissionDeterministicPreviewIdPosture =
  "deterministic preview id only";
export type ProviderDryRunAdmissionDeterministicOpaqueReferenceIdPosture =
  "deterministic opaque reference id only";
export type ProviderDryRunAdmissionDeterministicPreviewDigestPosture =
  "deterministic preview digest only";
export type ProviderDryRunAdmissionCredentialReferencePosture =
  "opaque-reference-only";
export type ProviderDryRunAdmissionOutputClassification =
  "deterministic dry-run admission fixture only";
export type ProviderDryRunAdmissionReferenceState =
  "preview-only / not persisted";
export type ProviderDryRunAdmissionCredentialReferenceAuditState =
  "opaque label only / not persisted";
export type ProviderDryRunAdmissionIntentAuditState =
  "preview-only / not executed";
export type ProviderDryRunAdmissionCurrentPosture = "preview-only";
export type ProviderDryRunAdmissionGateState = "blocked";

export type ProviderDryRunAdmissionReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-review:${ProviderDryRunAdmissionReviewId}`;
export type ProviderDryRunAdmissionOutputReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output-review:${ProviderDryRunAdmissionReviewId}`;
export type ProviderDryRunAdmissionGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-gate-failure-review:${ProviderDryRunAdmissionReviewId}:${ProviderDryRunAdmissionGateId}`;
export type ProviderDryRunAdmissionRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-recovery-plan:${ProviderDryRunAdmissionReviewId}`;
export type ProviderDryRunAdmissionRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-recovery-readiness:${ProviderDryRunAdmissionReviewId}:${ProviderDryRunAdmissionRecoveryReadinessChecklistId}`;
export type ProviderDryRunAdmissionReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-review-audit-summary:${ProviderDryRunAdmissionReviewId}`;
export type ProviderDryRunAdmissionAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-acceptance-posture:${ProviderDryRunAdmissionReviewId}`;

export type ProviderDryRunAdmissionMvpSourceReference =
  ProviderDryRunAdmissionMvpKey;
export type ProviderDryRunAdmissionInputSourceReference =
  ProviderDryRunAdmissionInputKey;
export type ProviderDryRunAdmissionCheckSourceReference =
  ProviderDryRunAdmissionCheckKey;
export type ProviderDryRunAdmissionOutputSourceReference =
  ProviderDryRunAdmissionOutputKey;
export type ProviderDryRunAdmissionEnvelopeSourceReference =
  ProviderDryRunAdmissionEnvelopeKey;
export type ProviderDryRunIntentPreviewSourceReference =
  ProviderDryRunIntentPreviewKey;
export type ProviderDryRunBlockedExecutionSummarySourceReference =
  ProviderDryRunBlockedExecutionSummaryKey;
export type ProviderDryRunEvidencePreviewSourceReference =
  ProviderDryRunEvidencePreviewKey;
export type ProviderDryRunAuditPreviewSourceReference =
  ProviderDryRunAuditPreviewKey;
export type ProviderDryRunApprovalPreviewSourceReference =
  ProviderDryRunApprovalPreviewKey;
export type ProviderDryRunSafetyGateSummarySourceReference =
  ProviderDryRunSafetyGateSummaryKey;
export type ProviderDryRunAdmissionReadinessMatrixSourceReference =
  ProviderDryRunReadinessMatrixRecord["key"];
export type ProviderSelectionCredentialReferenceReviewSourceReference =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-review:${ProviderSelectionCredentialReferenceReviewId}`;
export type ProviderSelectionAcceptancePostureSourceReference =
  ProviderSelectionAcceptancePostureRecord["key"];
export type ProviderSelectionReviewAuditSummarySourceReference =
  ProviderSelectionReviewAuditSummaryRecord["key"];

export type ProviderDryRunAdmissionRecoveryReadinessChecklistId =
  | "server-only-provider-dry-run-admission-helper-reviewed"
  | "dry-run-admission-input-reviewed"
  | "dry-run-admission-check-reviewed"
  | "dry-run-admission-output-reviewed"
  | "dry-run-admission-envelope-reviewed"
  | "dry-run-intent-preview-reviewed"
  | "dry-run-blocked-execution-summary-reviewed"
  | "evidence-preview-reviewed"
  | "audit-preview-reviewed"
  | "approval-preview-reviewed"
  | "provider-selection-credential-reference-review-dependency-reviewed"
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
  | "provider-adapter-dry-run-execution-not-implemented";

export type ProviderDryRunAdmissionRecoveryReadinessChecklistLabel =
  | "server-only provider dry-run admission helper reviewed"
  | "dry-run admission input reviewed"
  | "dry-run admission check reviewed"
  | "dry-run admission output reviewed"
  | "dry-run admission envelope reviewed"
  | "dry-run intent preview reviewed"
  | "dry-run blocked execution summary reviewed"
  | "evidence preview reviewed"
  | "audit preview reviewed"
  | "approval preview reviewed"
  | "provider selection credential reference review dependency reviewed"
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
  | "provider adapter dry-run execution not implemented";

export type ProviderDryRunAdmissionReviewRecord = Readonly<{
  key: ProviderDryRunAdmissionReviewKey;
  reviewVersion: ProviderDryRunAdmissionReviewVersion;
  reviewId: ProviderDryRunAdmissionReviewId;
  requestLabel: ProviderDryRunAdmissionReviewRequestLabel;
  source: ProviderDryRunAdmissionReviewSource;
  reviewMode: ProviderDryRunAdmissionReviewMode;
  reviewPosture: ProviderDryRunAdmissionReviewPosture;
  sourceProviderDryRunAdmissionMvpReference: ProviderDryRunAdmissionMvpSourceReference;
  sourceProviderDryRunAdmissionInputReference: ProviderDryRunAdmissionInputSourceReference;
  sourceProviderDryRunAdmissionCheckReference: ProviderDryRunAdmissionCheckSourceReference;
  sourceProviderDryRunAdmissionOutputReference: ProviderDryRunAdmissionOutputSourceReference;
  sourceProviderDryRunAdmissionEnvelopeReference: ProviderDryRunAdmissionEnvelopeSourceReference;
  sourceProviderDryRunIntentPreviewReference: ProviderDryRunIntentPreviewSourceReference;
  sourceProviderDryRunBlockedExecutionSummaryReference: ProviderDryRunBlockedExecutionSummarySourceReference;
  sourceProviderDryRunEvidencePreviewReference: ProviderDryRunEvidencePreviewSourceReference;
  sourceProviderDryRunAuditPreviewReference: ProviderDryRunAuditPreviewSourceReference;
  sourceProviderDryRunApprovalPreviewReference: ProviderDryRunApprovalPreviewSourceReference;
  sourceProviderDryRunSafetyGateSummaryReference: ProviderDryRunSafetyGateSummarySourceReference;
  sourceProviderDryRunReadinessMatrixReference: ProviderDryRunAdmissionReadinessMatrixSourceReference;
  sourceProviderSelectionCredentialReferenceReviewReference: ProviderSelectionCredentialReferenceReviewSourceReference;
  sourceProviderSelectionAcceptancePostureReference: ProviderSelectionAcceptancePostureSourceReference;
  sourceProviderSelectionAuditSummaryReference: ProviderSelectionReviewAuditSummarySourceReference;
  selectedCapabilityFamily: ProviderDryRunAdmissionCapabilityFamilyLabel;
  workspaceTarget: ProviderDryRunAdmissionWorkspaceTarget;
  providerSlotLabel: ProviderDryRunAdmissionProviderSlotLabel;
  backupProviderSlotLabel: ProviderDryRunAdmissionProviderSlotLabel;
  localPrivateAlternativeLabel: "local/private text provider dry-run slot";
  opaqueCredentialReferenceLabel: ProviderDryRunAdmissionOpaqueCredentialReferenceLabel;
  serverOnlyProviderDryRunAdmissionHelperState: ProviderDryRunAdmissionReviewHelperState;
  providerDryRunAdmissionState: ProviderDryRunAdmissionReviewState;
  dryRunIntentState: ProviderDryRunAdmissionPreviewState;
  dryRunExecutionState: ProviderDryRunExecutionState;
  selectedProviderSlotState: ProviderDryRunAdmissionPreviewState;
  backupProviderSlotState: ProviderDryRunAdmissionPreviewState;
  localPrivateAlternativeState: ProviderDryRunAdmissionPreviewState;
  credentialReferenceState: ProviderDryRunAdmissionCredentialReferenceState;
  credentialValueState: ProviderDryRunAdmissionCredentialValueState;
  envVarState: ProviderDryRunAdmissionEnvVarState;
  providerKeyState: ProviderDryRunAdmissionProviderKeyState;
  providerSdkImportState: ProviderDryRunAdmissionProviderSdkImportState;
  providerExecutionState: ProviderDryRunAdmissionProviderExecutionState;
  providerResponseState: ProviderDryRunAdmissionProviderResponseState;
  modelCallState: ProviderDryRunAdmissionModelCallState;
  modelOutputState: ProviderDryRunAdmissionModelOutputState;
  redactedPromptEnvelopeState: ProviderDryRunAdmissionPreviewState;
  promptTransmissionState: ProviderDryRunAdmissionPromptTransmissionState;
  frontendRequestState: ProviderDryRunAdmissionFrontendRequestState;
  apiRouteState: ProviderDryRunAdmissionApiRouteState;
  queueDispatchState: ProviderDryRunAdmissionDispatchState;
  workerDispatchState: ProviderDryRunAdmissionDispatchState;
  jobExecutionState: ProviderDryRunAdmissionJobExecutionState;
  resultPersistenceState: ProviderDryRunAdmissionPersistenceState;
  auditPersistenceState: ProviderDryRunAdmissionPersistenceState;
  approvalPersistenceState: ProviderDryRunAdmissionPersistenceState;
  databaseWriteState: ProviderDryRunAdmissionPersistenceState;
  fileWriteState: ProviderDryRunAdmissionPersistenceState;
  approvalFixtureState: ProviderDryRunAdmissionApprovalFixtureState;
  manualConfirmationFixtureState: ProviderDryRunAdmissionManualConfirmationFixtureState;
  approvalTokenState: ProviderDryRunAdmissionApprovalTokenState;
  approvalLeaseState: ProviderDryRunAdmissionApprovalLeaseState;
  evidencePacketState: ProviderDryRunAdmissionEvidencePacketState;
  killSwitchState: ProviderDryRunAdmissionKillSwitchState;
  retryPosture: ProviderDryRunAdmissionRetryPosture;
  fallbackPosture: ProviderDryRunAdmissionFallbackPosture;
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
  nextProviderAdapterDryRunExecutionMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH;
}>;

export type ProviderDryRunAdmissionOutputReviewRecord = Readonly<{
  key: ProviderDryRunAdmissionOutputReviewKey;
  outputReviewVersion: ProviderDryRunAdmissionOutputReviewVersion;
  providerDryRunAdmissionReviewId: ProviderDryRunAdmissionReviewId;
  sourceProviderDryRunAdmissionOutputReference: ProviderDryRunAdmissionOutputSourceReference;
  sourceProviderDryRunAdmissionEnvelopeReference: ProviderDryRunAdmissionEnvelopeSourceReference;
  sourceProviderDryRunIntentPreviewReference: ProviderDryRunIntentPreviewSourceReference;
  sourceProviderDryRunBlockedExecutionSummaryReference: ProviderDryRunBlockedExecutionSummarySourceReference;
  admissionState:
    | "admitted-for-backend-dry-run-preview-only"
    | "blocked-for-backend-dry-run-preview-only";
  admissionMode: "deterministic-fixture-only";
  dryRunExecutionState: ProviderDryRunExecutionState;
  providerDryRunAdmissionIdPosture: ProviderDryRunAdmissionDeterministicPreviewIdPosture;
  providerSlotIdPosture: ProviderDryRunAdmissionDeterministicPreviewIdPosture;
  credentialReferenceIdPosture: ProviderDryRunAdmissionDeterministicOpaqueReferenceIdPosture;
  admissionDigestPosture: ProviderDryRunAdmissionDeterministicPreviewDigestPosture;
  selectedProviderSlotPosture: ProviderDryRunAdmissionPreviewState;
  backupProviderSlotPosture: ProviderDryRunAdmissionPreviewState;
  localPrivateAlternativePosture: ProviderDryRunAdmissionPreviewState;
  credentialReferencePosture: ProviderDryRunAdmissionCredentialReferencePosture;
  credentialValueState: ProviderDryRunAdmissionCredentialValueState;
  envVarState: ProviderDryRunAdmissionEnvVarState;
  providerKeyState: ProviderDryRunAdmissionProviderKeyState;
  providerSdkImportState: ProviderDryRunAdmissionProviderSdkImportState;
  providerExecutionState: ProviderDryRunAdmissionProviderExecutionState;
  promptTransmissionState: ProviderDryRunAdmissionPromptTransmissionState;
  providerResponseState: ProviderDryRunAdmissionProviderResponseState;
  modelOutputState: ProviderDryRunAdmissionModelOutputState;
  outputClassification: ProviderDryRunAdmissionOutputClassification;
  resultPersistenceState: ProviderDryRunAdmissionPersistenceState;
  auditPersistenceState: ProviderDryRunAdmissionPersistenceState;
  approvalPersistenceState: ProviderDryRunAdmissionPersistenceState;
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
  explicitDryRunAdmissionFixtureOnlyNoSecretReadNoProviderCallNoPersistenceStatement:
    ProviderDryRunAdmissionFixtureOnlyStatement;
}>;

export type ProviderDryRunAdmissionGateFailureReviewRecord = Readonly<{
  key: ProviderDryRunAdmissionGateFailureReviewKey;
  gateFailureReviewVersion: ProviderDryRunAdmissionGateFailureReviewVersion;
  providerDryRunAdmissionReviewId: ProviderDryRunAdmissionReviewId;
  failedGateId: ProviderDryRunAdmissionGateId;
  failedGateLabel: string;
  gateState: ProviderDryRunAdmissionGateState;
  severity: ProviderDryRunAdmissionReviewSeverity;
  affectedCapabilityFamily: ProviderDryRunAdmissionCapabilityFamilyLabel;
  affectedWorkspaceTarget: ProviderDryRunAdmissionWorkspaceTarget;
  affectedProviderSlot: ProviderDryRunAdmissionProviderSlotLabel;
  affectedCredentialReference: ProviderDryRunAdmissionOpaqueCredentialReferenceLabel;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  providerAdapterDryRunExecutionMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH;
  nextSafeAction: string;
  explicitNoLiveGatePassStatement: ProviderDryRunAdmissionNoLiveGatePassStatement;
}>;

export type ProviderDryRunAdmissionRecoveryPlanPreviewRecord = Readonly<{
  key: ProviderDryRunAdmissionRecoveryPlanKey;
  recoveryPlanVersion: ProviderDryRunAdmissionRecoveryPlanVersion;
  providerDryRunAdmissionReviewId: ProviderDryRunAdmissionReviewId;
  recoveryPosture: ProviderDryRunAdmissionRecoveryPosture;
  serverOnlyProviderDryRunAdmissionHelperRecovery: string;
  dryRunAdmissionInputRecovery: string;
  dryRunAdmissionCheckRecovery: string;
  dryRunAdmissionOutputRecovery: string;
  dryRunAdmissionEnvelopeRecovery: string;
  dryRunIntentPreviewRecovery: string;
  dryRunBlockedExecutionSummaryRecovery: string;
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
  dryRunExecutionMissingRecovery: string;
  retryPosture: ProviderDryRunAdmissionRetryPosture;
  fallbackPosture: ProviderDryRunAdmissionFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH;
  explicitNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement:
    ProviderDryRunAdmissionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement;
}>;

export type ProviderDryRunAdmissionRecoveryReadinessChecklistRecord = Readonly<{
  key: ProviderDryRunAdmissionRecoveryReadinessChecklistKey;
  checklistVersion: ProviderDryRunAdmissionRecoveryReadinessChecklistVersion;
  providerDryRunAdmissionReviewId: ProviderDryRunAdmissionReviewId;
  checklistId: ProviderDryRunAdmissionRecoveryReadinessChecklistId;
  label: ProviderDryRunAdmissionRecoveryReadinessChecklistLabel;
  state: ProviderDryRunAdmissionRecoveryReadinessState;
  severity: ProviderDryRunAdmissionReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ProviderDryRunAdmissionRecoveryReadinessOwner;
  currentPosture: ProviderDryRunAdmissionCurrentPosture;
  providerAdapterDryRunExecutionMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH;
  nextSafeAction: string;
}>;

export type ProviderDryRunAdmissionReviewAuditSummaryRecord = Readonly<{
  key: ProviderDryRunAdmissionReviewAuditSummaryKey;
  auditSummaryVersion: ProviderDryRunAdmissionReviewAuditSummaryVersion;
  providerDryRunAdmissionReviewId: ProviderDryRunAdmissionReviewId;
  auditPosture: ProviderDryRunAdmissionAuditPosture;
  admissionReferenceState: ProviderDryRunAdmissionReferenceState;
  providerSlotReferenceState: ProviderDryRunAdmissionReferenceState;
  credentialReferenceState: ProviderDryRunAdmissionCredentialReferenceAuditState;
  dryRunIntentState: ProviderDryRunAdmissionIntentAuditState;
  dryRunBlockedExecutionSummary: string;
  credentialValueState: ProviderDryRunAdmissionCredentialValueState;
  envVarState: ProviderDryRunAdmissionEnvVarState;
  providerKeyState: ProviderDryRunAdmissionProviderKeyState;
  evidencePacketState: ProviderDryRunAdmissionEvidencePacketState;
  serverOnlyAdmissionHelperEvidenceSummary: string;
  deterministicDryRunAdmissionEvidenceSummary: string;
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
  providerAdapterDryRunExecutionMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH;
}>;

export type ProviderDryRunAdmissionAcceptancePostureRecord = Readonly<{
  key: ProviderDryRunAdmissionAcceptancePostureKey;
  acceptancePostureVersion: ProviderDryRunAdmissionAcceptancePostureVersion;
  providerDryRunAdmissionReviewId: ProviderDryRunAdmissionReviewId;
  acceptanceState: ProviderDryRunAdmissionAcceptanceState;
  fixtureOnlyAcceptanceSummary: string;
  backendOnlyAcceptanceSummary: string;
  serverOnlyAcceptanceSummary: string;
  admissionOnlyAcceptanceSummary: string;
  credentialReferenceOnlyAcceptanceSummary: string;
  dryRunIntentOnlyAcceptanceSummary: string;
  blockedExecutionAcceptanceSummary: string;
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
  dryRunExecutionBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitProviderDryRunAdmissionFixtureAcceptedLiveProviderExecutionNotAcceptedStatement:
    ProviderDryRunAdmissionAcceptanceStatement;
}>;

export type ProviderDryRunAdmissionReviewSummary = Readonly<{
  version: ProviderDryRunAdmissionReviewSummaryVersion;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH;
  reviewCount: number;
  currentReadiness: ProviderDryRunAdmissionReviewCurrentReadiness;
  acceptanceState: ProviderDryRunAdmissionAcceptanceState;
  recoveryPosture: ProviderDryRunAdmissionRecoveryPosture;
  retryPosture: ProviderDryRunAdmissionRetryPosture;
  fallbackPosture: ProviderDryRunAdmissionFallbackPosture;
  summaryLines: readonly string[];
}>;

export type ProviderDryRunAdmissionOutputReviewSummary = Readonly<{
  version: ProviderDryRunAdmissionOutputReviewSummaryVersion;
  recordCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderDryRunAdmissionGateFailureSummary = Readonly<{
  version: ProviderDryRunAdmissionGateFailureSummaryVersion;
  recordCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderDryRunAdmissionRecoverySummary = Readonly<{
  version: ProviderDryRunAdmissionRecoverySummaryVersion;
  planCount: number;
  checklistCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderAdapterDryRunExecutionMvpChecklist = readonly string[];

export type ProviderDryRunAdmissionReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamily: ProviderDryRunAdmissionCapabilityFamilyLabel;
  reviews: readonly ProviderDryRunAdmissionReviewRecord[];
}>;

export type ProviderDryRunAdmissionReviewProviderSlotGroup = Readonly<{
  providerSlot: ProviderDryRunAdmissionProviderSlotLabel;
  reviews: readonly ProviderDryRunAdmissionReviewRecord[];
}>;

export type ProviderDryRunAdmissionReviewCredentialReferenceGroup = Readonly<{
  credentialReference: ProviderDryRunAdmissionOpaqueCredentialReferenceLabel;
  reviews: readonly ProviderDryRunAdmissionReviewRecord[];
}>;
