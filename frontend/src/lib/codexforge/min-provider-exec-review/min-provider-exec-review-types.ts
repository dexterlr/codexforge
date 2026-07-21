import type {
  ProviderSelectionAcceptancePostureRecord,
  ProviderSelectionCredentialReferenceReviewId,
  ProviderSelectionCredentialReferenceReviewRecord,
  ProviderSelectionReviewAuditSummaryRecord,
} from "../min-provider-review/min-provider-review-types";
import type {
  ProviderDryRunAdmissionAcceptancePostureRecord,
  ProviderDryRunAdmissionReviewAuditSummaryRecord,
  ProviderDryRunAdmissionReviewId,
  ProviderDryRunAdmissionReviewRecord,
} from "../min-provider-admit-review/min-provider-admit-review-types";
import type {
  MinimalManualGatedProviderAdapterDryRunExecutionMvpRecord,
  ProviderDryRunApprovalPreviewRecord,
  ProviderDryRunAuditPreviewRecord,
  ProviderDryRunBlockedLiveExecutionSummaryRecord,
  ProviderDryRunEvidencePreviewRecord,
  ProviderDryRunExecutionCapabilityFamilyLabel,
  ProviderDryRunExecutionEnvelopeRecord,
  ProviderDryRunExecutionGateId,
  ProviderDryRunExecutionInputRecord,
  ProviderDryRunExecutionOutputRecord,
  ProviderDryRunExecutionPlanRecord,
  ProviderDryRunExecutionProviderSlotLabel,
  ProviderDryRunExecutionWorkspaceTarget,
  ProviderDryRunFixtureResponseRecord,
  ProviderDryRunReadinessMatrixRecord,
  ProviderDryRunSafetyGateSummaryRecord,
} from "../min-provider-exec/min-provider-exec-types";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5994-6025 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_PHASE =
  6025;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH =
  "5962-5993 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH =
  "6026-6057 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP";

export const MINIMAL_PROVIDER_DRY_RUN_EXECUTION_REVIEW_SECTION_TITLES = [
  "Backend-owned minimal provider adapter dry-run execution review",
  "Provider adapter dry-run execution output review",
  "Provider adapter dry-run execution gate failure review",
  "Provider adapter dry-run execution recovery plan",
  "Provider adapter dry-run execution recovery readiness",
  "Provider adapter dry-run execution review audit summary",
  "Provider adapter dry-run execution acceptance posture",
] as const;

export type ProviderDryRunExecutionReviewSectionTitle =
  (typeof MINIMAL_PROVIDER_DRY_RUN_EXECUTION_REVIEW_SECTION_TITLES)[number];

export type ProviderDryRunExecutionReviewId =
  | "openai-compatible-text-provider-dry-run-execution-slot"
  | "anthropic-compatible-text-provider-dry-run-execution-slot"
  | "gemini-compatible-text-provider-dry-run-execution-slot"
  | "local-private-text-provider-dry-run-execution-slot"
  | "fallback-disabled-dry-run-execution-slot"
  | "conversational-planning-request"
  | "code-assistance-request"
  | "website-copy-code-request"
  | "audit-recovery-explanation-request";

export type ProviderDryRunExecutionReviewLabel =
  | "OpenAI-compatible text provider dry-run execution slot"
  | "Anthropic-compatible text provider dry-run execution slot"
  | "Gemini-compatible text provider dry-run execution slot"
  | "local/private text provider dry-run execution slot"
  | "fallback disabled dry-run execution slot"
  | "conversational planning request"
  | "code assistance request"
  | "website copy/code request"
  | "audit/recovery explanation request";

export type ProviderDryRunExecutionReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review-preview-v1";
export type ProviderDryRunExecutionOutputReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-output-review-preview-v1";
export type ProviderDryRunExecutionGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-gate-failure-review-preview-v1";
export type ProviderDryRunExecutionRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-recovery-plan-preview-v1";
export type ProviderDryRunExecutionRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-recovery-readiness-checklist-v1";
export type ProviderDryRunExecutionReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review-audit-summary-preview-v1";
export type ProviderDryRunExecutionAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-acceptance-posture-preview-v1";
export type ProviderDryRunExecutionReviewSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review-summary-v1";
export type ProviderDryRunExecutionOutputReviewSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-output-review-summary-v1";
export type ProviderDryRunExecutionGateFailureSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-gate-failure-summary-v1";
export type ProviderDryRunExecutionRecoverySummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-recovery-summary-v1";

export type ProviderDryRunExecutionReviewSource =
  "Athena / Jarvis Model Gateway";
export type ProviderDryRunExecutionReviewMode = "preview-only";
export type ProviderDryRunExecutionReviewPosture =
  "minimal provider dry-run execution review / backend-only / dry-run-fixture-only / credential-reference-only / not-live-provider-executing / not persistent";
export type ProviderDryRunExecutionReviewCurrentReadiness =
  "minimal-provider-dry-run-execution-review-only / backend-only / dry-run-fixture-only / credential-reference-only / not-live-provider-executing / not persistent";
export type ProviderDryRunExecutionReviewSeverity =
  | "critical"
  | "high"
  | "medium";
export type ProviderDryRunExecutionRecoveryPosture = "manual review only";
export type ProviderDryRunExecutionRetryPosture = "disabled";
export type ProviderDryRunExecutionFallbackPosture = "disabled";
export type ProviderDryRunExecutionAuditPosture = "preview-only";
export type ProviderDryRunExecutionAcceptanceState =
  "not accepted for live provider execution / provider dry-run execution fixture MVP accepted only";
export type ProviderDryRunExecutionRecoveryReadinessState =
  | "reviewed"
  | "blocked"
  | "backend future required";
export type ProviderDryRunExecutionRecoveryReadinessOwner =
  "operator" | "backend future" | "safety review";
export type ProviderDryRunExecutionFixtureOnlyStatement =
  "Dry-run execution fixture only. No secret read. No provider call. No persistence.";
export type ProviderDryRunExecutionNoLiveGatePassStatement =
  "No live gate pass.";
export type ProviderDryRunExecutionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence.";
export type ProviderDryRunExecutionAcceptanceStatement =
  "Provider dry-run execution fixture accepted only. Live provider execution not accepted.";

export type ProviderDryRunExecutionReviewHelperState = "exists";
export type ProviderDryRunExecutionReviewState = "deterministic fixture-only";
export type ProviderDryRunExecutionFixtureResponseReviewState =
  "produced in memory only";
export type ProviderDryRunExecutionPreviewState = "preview-only";
export type ProviderDryRunExecutionCredentialReferenceState =
  "opaque label only";
export type ProviderDryRunExecutionCredentialValueState =
  "not present / not read";
export type ProviderDryRunExecutionEnvVarState = "not read";
export type ProviderDryRunExecutionProviderKeyState = "not read";
export type ProviderDryRunExecutionProviderSdkImportState = "not imported";
export type ProviderDryRunExecutionLiveProviderExecutionState = "blocked";
export type ProviderDryRunExecutionProviderResponseState =
  "not received from provider";
export type ProviderDryRunExecutionModelCallState = "not called";
export type ProviderDryRunExecutionModelOutputState =
  "not generated by provider/model";
export type ProviderDryRunExecutionPromptTransmissionState = "not sent";
export type ProviderDryRunExecutionFrontendRequestState = "not created";
export type ProviderDryRunExecutionApiRouteState = "not created";
export type ProviderDryRunExecutionDispatchState = "not dispatched";
export type ProviderDryRunExecutionJobExecutionState = "not executed";
export type ProviderDryRunExecutionPersistenceState = "not implemented";
export type ProviderDryRunExecutionApprovalFixtureState = "preview-only";
export type ProviderDryRunExecutionManualConfirmationFixtureState =
  "preview-only";
export type ProviderDryRunExecutionApprovalTokenState = "not issued";
export type ProviderDryRunExecutionApprovalLeaseState = "not created";
export type ProviderDryRunExecutionEvidencePacketState =
  "preview-only / not persisted";
export type ProviderDryRunExecutionKillSwitchState =
  "inactive fixture only";
export type ProviderDryRunExecutionDeterministicPreviewIdPosture =
  "deterministic preview id only";
export type ProviderDryRunExecutionDeterministicOpaqueReferenceIdPosture =
  "deterministic opaque reference id only";
export type ProviderDryRunExecutionDeterministicPreviewDigestPosture =
  "deterministic preview digest only";
export type ProviderDryRunExecutionCredentialReferencePosture =
  "opaque-reference-only";
export type ProviderDryRunExecutionOutputClassification =
  "deterministic dry-run execution fixture only";
export type ProviderDryRunExecutionReferenceState =
  "preview-only / not persisted";
export type ProviderDryRunExecutionCredentialReferenceAuditState =
  "opaque label only / not persisted";
export type ProviderDryRunExecutionCurrentPosture = "preview-only";
export type ProviderDryRunExecutionGateState = "blocked";

export type ProviderDryRunExecutionReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review:${ProviderDryRunExecutionReviewId}`;
export type ProviderDryRunExecutionOutputReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-output-review:${ProviderDryRunExecutionReviewId}`;
export type ProviderDryRunExecutionGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-gate-failure-review:${ProviderDryRunExecutionReviewId}:${ProviderDryRunExecutionGateId}`;
export type ProviderDryRunExecutionRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-recovery-plan:${ProviderDryRunExecutionReviewId}`;
export type ProviderDryRunExecutionRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-recovery-readiness:${ProviderDryRunExecutionReviewId}:${ProviderDryRunExecutionRecoveryReadinessChecklistId}`;
export type ProviderDryRunExecutionReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review-audit-summary:${ProviderDryRunExecutionReviewId}`;
export type ProviderDryRunExecutionAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-acceptance-posture:${ProviderDryRunExecutionReviewId}`;

export type ProviderDryRunExecutionMvpSourceReference =
  MinimalManualGatedProviderAdapterDryRunExecutionMvpRecord["key"];
export type ProviderDryRunExecutionInputSourceReference =
  ProviderDryRunExecutionInputRecord["key"];
export type ProviderDryRunExecutionPlanSourceReference =
  ProviderDryRunExecutionPlanRecord["key"];
export type ProviderDryRunExecutionOutputSourceReference =
  ProviderDryRunExecutionOutputRecord["key"];
export type ProviderDryRunExecutionEnvelopeSourceReference =
  ProviderDryRunExecutionEnvelopeRecord["key"];
export type ProviderDryRunFixtureResponseSourceReference =
  ProviderDryRunFixtureResponseRecord["key"];
export type ProviderDryRunBlockedLiveExecutionSummarySourceReference =
  ProviderDryRunBlockedLiveExecutionSummaryRecord["key"];
export type ProviderDryRunEvidencePreviewSourceReference =
  ProviderDryRunEvidencePreviewRecord["key"];
export type ProviderDryRunAuditPreviewSourceReference =
  ProviderDryRunAuditPreviewRecord["key"];
export type ProviderDryRunApprovalPreviewSourceReference =
  ProviderDryRunApprovalPreviewRecord["key"];
export type ProviderDryRunSafetyGateSummarySourceReference =
  ProviderDryRunSafetyGateSummaryRecord["key"];
export type ProviderDryRunExecutionReadinessMatrixSourceReference =
  ProviderDryRunReadinessMatrixRecord["key"];
export type ProviderDryRunAdmissionReviewSourceReference =
  ProviderDryRunAdmissionReviewRecord["key"];
export type ProviderDryRunAdmissionAcceptancePostureSourceReference =
  ProviderDryRunAdmissionAcceptancePostureRecord["key"];
export type ProviderDryRunAdmissionReviewAuditSummarySourceReference =
  ProviderDryRunAdmissionReviewAuditSummaryRecord["key"];
export type ProviderSelectionCredentialReferenceReviewSourceReference =
  ProviderSelectionCredentialReferenceReviewRecord["key"];
export type ProviderSelectionAcceptancePostureSourceReference =
  ProviderSelectionAcceptancePostureRecord["key"];
export type ProviderSelectionReviewAuditSummarySourceReference =
  ProviderSelectionReviewAuditSummaryRecord["key"];

export type ProviderDryRunExecutionRecoveryReadinessChecklistId =
  | "server-only-provider-dry-run-execution-helper-reviewed"
  | "dry-run-execution-input-reviewed"
  | "dry-run-execution-plan-reviewed"
  | "dry-run-execution-output-reviewed"
  | "dry-run-execution-envelope-reviewed"
  | "dry-run-fixture-response-reviewed"
  | "dry-run-blocked-live-execution-summary-reviewed"
  | "evidence-preview-reviewed"
  | "audit-preview-reviewed"
  | "approval-preview-reviewed"
  | "provider-dry-run-admission-review-dependency-reviewed"
  | "provider-dry-run-admission-output-dependency-reviewed"
  | "selected-provider-slot-reviewed"
  | "backup-provider-slot-reviewed"
  | "local-private-alternative-reviewed"
  | "opaque-credential-reference-reviewed"
  | "credential-value-absent-reviewed"
  | "credential-value-not-read-reviewed"
  | "env-vars-not-read-reviewed"
  | "provider-key-not-read-reviewed"
  | "provider-sdk-import-boundary-reviewed"
  | "live-provider-execution-boundary-reviewed"
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
  | "provider-adapter-dry-run-result-capture-not-implemented";

export type ProviderDryRunExecutionRecoveryReadinessChecklistLabel =
  | "server-only provider dry-run execution helper reviewed"
  | "dry-run execution input reviewed"
  | "dry-run execution plan reviewed"
  | "dry-run execution output reviewed"
  | "dry-run execution envelope reviewed"
  | "dry-run fixture response reviewed"
  | "dry-run blocked live execution summary reviewed"
  | "evidence preview reviewed"
  | "audit preview reviewed"
  | "approval preview reviewed"
  | "provider dry-run admission review dependency reviewed"
  | "provider dry-run admission output dependency reviewed"
  | "selected provider slot reviewed"
  | "backup provider slot reviewed"
  | "local/private alternative reviewed"
  | "opaque credential reference reviewed"
  | "credential value absent reviewed"
  | "credential value not read reviewed"
  | "env vars not read reviewed"
  | "provider key not read reviewed"
  | "provider SDK import boundary reviewed"
  | "live provider execution boundary reviewed"
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
  | "provider adapter dry-run result capture not implemented";

export type BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord =
  Readonly<{
    key: ProviderDryRunExecutionReviewKey;
    reviewVersion: ProviderDryRunExecutionReviewVersion;
    reviewId: ProviderDryRunExecutionReviewId;
    reviewLabel: ProviderDryRunExecutionReviewLabel;
    source: ProviderDryRunExecutionReviewSource;
    reviewMode: ProviderDryRunExecutionReviewMode;
    reviewPosture: ProviderDryRunExecutionReviewPosture;
    sourceProviderDryRunExecutionMvpReference: ProviderDryRunExecutionMvpSourceReference;
    sourceProviderDryRunExecutionInputReference: ProviderDryRunExecutionInputSourceReference;
    sourceProviderDryRunExecutionPlanReference: ProviderDryRunExecutionPlanSourceReference;
    sourceProviderDryRunExecutionOutputReference: ProviderDryRunExecutionOutputSourceReference;
    sourceProviderDryRunExecutionEnvelopeReference: ProviderDryRunExecutionEnvelopeSourceReference;
    sourceProviderDryRunFixtureResponseReference: ProviderDryRunFixtureResponseSourceReference;
    sourceProviderDryRunBlockedLiveExecutionSummaryReference: ProviderDryRunBlockedLiveExecutionSummarySourceReference;
    sourceProviderDryRunEvidencePreviewReference: ProviderDryRunEvidencePreviewSourceReference;
    sourceProviderDryRunAuditPreviewReference: ProviderDryRunAuditPreviewSourceReference;
    sourceProviderDryRunApprovalPreviewReference: ProviderDryRunApprovalPreviewSourceReference;
    sourceProviderDryRunSafetyGateSummaryReference: ProviderDryRunSafetyGateSummarySourceReference;
    sourceProviderDryRunReadinessMatrixReference: ProviderDryRunExecutionReadinessMatrixSourceReference;
    sourceProviderDryRunAdmissionReviewReference: ProviderDryRunAdmissionReviewSourceReference;
    sourceProviderDryRunAdmissionAcceptancePostureReference: ProviderDryRunAdmissionAcceptancePostureSourceReference;
    sourceProviderDryRunAdmissionAuditSummaryReference: ProviderDryRunAdmissionReviewAuditSummarySourceReference;
    sourceProviderSelectionCredentialReferenceReviewReference: ProviderSelectionCredentialReferenceReviewSourceReference;
    sourceProviderSelectionAcceptancePostureReference: ProviderSelectionAcceptancePostureSourceReference;
    sourceProviderSelectionAuditSummaryReference: ProviderSelectionReviewAuditSummarySourceReference;
    selectedCapabilityFamily: ProviderDryRunExecutionCapabilityFamilyLabel;
    workspaceTarget: ProviderDryRunExecutionWorkspaceTarget;
    providerSlotLabel: ProviderDryRunExecutionProviderSlotLabel;
    backupProviderSlotLabel: ProviderDryRunExecutionProviderSlotLabel;
    localPrivateAlternativeLabel: MinimalManualGatedProviderAdapterDryRunExecutionMvpRecord["localPrivateAlternativeLabel"];
    opaqueCredentialReferenceLabel: MinimalManualGatedProviderAdapterDryRunExecutionMvpRecord["opaqueCredentialReferenceLabel"];
    serverOnlyProviderDryRunExecutionHelperState: ProviderDryRunExecutionReviewHelperState;
    providerDryRunExecutionState: ProviderDryRunExecutionReviewState;
    dryRunFixtureResponseState: ProviderDryRunExecutionFixtureResponseReviewState;
    liveProviderExecutionState: ProviderDryRunExecutionLiveProviderExecutionState;
    selectedProviderSlotState: ProviderDryRunExecutionPreviewState;
    backupProviderSlotState: ProviderDryRunExecutionPreviewState;
    localPrivateAlternativeState: ProviderDryRunExecutionPreviewState;
    credentialReferenceState: ProviderDryRunExecutionCredentialReferenceState;
    credentialValueState: ProviderDryRunExecutionCredentialValueState;
    envVarState: ProviderDryRunExecutionEnvVarState;
    providerKeyState: ProviderDryRunExecutionProviderKeyState;
    providerSdkImportState: ProviderDryRunExecutionProviderSdkImportState;
    providerResponseState: ProviderDryRunExecutionProviderResponseState;
    modelCallState: ProviderDryRunExecutionModelCallState;
    modelOutputState: ProviderDryRunExecutionModelOutputState;
    redactedPromptEnvelopeState: ProviderDryRunExecutionPreviewState;
    promptTransmissionState: ProviderDryRunExecutionPromptTransmissionState;
    frontendRequestState: ProviderDryRunExecutionFrontendRequestState;
    apiRouteState: ProviderDryRunExecutionApiRouteState;
    queueDispatchState: ProviderDryRunExecutionDispatchState;
    workerDispatchState: ProviderDryRunExecutionDispatchState;
    jobExecutionState: ProviderDryRunExecutionJobExecutionState;
    resultPersistenceState: ProviderDryRunExecutionPersistenceState;
    auditPersistenceState: ProviderDryRunExecutionPersistenceState;
    approvalPersistenceState: ProviderDryRunExecutionPersistenceState;
    databaseWriteState: ProviderDryRunExecutionPersistenceState;
    fileWriteState: ProviderDryRunExecutionPersistenceState;
    approvalFixtureState: ProviderDryRunExecutionApprovalFixtureState;
    manualConfirmationFixtureState: ProviderDryRunExecutionManualConfirmationFixtureState;
    approvalTokenState: ProviderDryRunExecutionApprovalTokenState;
    approvalLeaseState: ProviderDryRunExecutionApprovalLeaseState;
    evidencePacketState: ProviderDryRunExecutionEvidencePacketState;
    killSwitchState: ProviderDryRunExecutionKillSwitchState;
    retryPosture: ProviderDryRunExecutionRetryPosture;
    fallbackPosture: ProviderDryRunExecutionFallbackPosture;
    operatorFacingExplanation: string;
    remainingBlockers: readonly string[];
    nextSafeAction: string;
    currentReadiness: ProviderDryRunExecutionReviewCurrentReadiness;
    acceptanceState: ProviderDryRunExecutionAcceptanceState;
    recoveryPosture: ProviderDryRunExecutionRecoveryPosture;
    nextProviderAdapterDryRunResultCaptureMvpRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  }>;

export type ProviderDryRunExecutionOutputReviewRecord = Readonly<{
  key: ProviderDryRunExecutionOutputReviewKey;
  outputReviewVersion: ProviderDryRunExecutionOutputReviewVersion;
  providerDryRunExecutionReviewId: ProviderDryRunExecutionReviewId;
  sourceProviderDryRunExecutionOutputReference: ProviderDryRunExecutionOutputSourceReference;
  sourceProviderDryRunExecutionEnvelopeReference: ProviderDryRunExecutionEnvelopeSourceReference;
  sourceProviderDryRunFixtureResponseReference: ProviderDryRunFixtureResponseSourceReference;
  sourceProviderDryRunBlockedLiveExecutionSummaryReference: ProviderDryRunBlockedLiveExecutionSummarySourceReference;
  executionState: "executed-provider-dry-run-fixture-in-memory-only";
  executionMode: "deterministic-fixture-only";
  dryRunFixtureResponseState: ProviderDryRunExecutionFixtureResponseReviewState;
  liveProviderExecutionState: ProviderDryRunExecutionLiveProviderExecutionState;
  providerDryRunExecutionIdPosture: ProviderDryRunExecutionDeterministicPreviewIdPosture;
  providerDryRunAdmissionIdPosture: ProviderDryRunExecutionDeterministicPreviewIdPosture;
  providerSlotIdPosture: ProviderDryRunExecutionDeterministicPreviewIdPosture;
  credentialReferenceIdPosture: ProviderDryRunExecutionDeterministicOpaqueReferenceIdPosture;
  executionDigestPosture: ProviderDryRunExecutionDeterministicPreviewDigestPosture;
  selectedProviderSlotPosture: ProviderDryRunExecutionPreviewState;
  backupProviderSlotPosture: ProviderDryRunExecutionPreviewState;
  localPrivateAlternativePosture: ProviderDryRunExecutionPreviewState;
  credentialReferencePosture: ProviderDryRunExecutionCredentialReferencePosture;
  credentialValueState: ProviderDryRunExecutionCredentialValueState;
  envVarState: ProviderDryRunExecutionEnvVarState;
  providerKeyState: ProviderDryRunExecutionProviderKeyState;
  providerSdkImportState: ProviderDryRunExecutionProviderSdkImportState;
  providerResponseState: ProviderDryRunExecutionProviderResponseState;
  modelOutputState: ProviderDryRunExecutionModelOutputState;
  promptTransmissionState: ProviderDryRunExecutionPromptTransmissionState;
  outputClassification: ProviderDryRunExecutionOutputClassification;
  resultPersistenceState: ProviderDryRunExecutionPersistenceState;
  auditPersistenceState: ProviderDryRunExecutionPersistenceState;
  approvalPersistenceState: ProviderDryRunExecutionPersistenceState;
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
  explicitDryRunExecutionFixtureOnlyNoSecretReadNoProviderCallNoPersistenceStatement:
    ProviderDryRunExecutionFixtureOnlyStatement;
}>;

export type ProviderDryRunExecutionGateFailureReviewRecord = Readonly<{
  key: ProviderDryRunExecutionGateFailureReviewKey;
  gateFailureReviewVersion: ProviderDryRunExecutionGateFailureReviewVersion;
  providerDryRunExecutionReviewId: ProviderDryRunExecutionReviewId;
  failedGateId: ProviderDryRunExecutionGateId;
  failedGateLabel: string;
  gateState: ProviderDryRunExecutionGateState;
  severity: ProviderDryRunExecutionReviewSeverity;
  affectedCapabilityFamily: ProviderDryRunExecutionCapabilityFamilyLabel;
  affectedWorkspaceTarget: ProviderDryRunExecutionWorkspaceTarget;
  affectedProviderSlot: ProviderDryRunExecutionProviderSlotLabel;
  affectedCredentialReference: MinimalManualGatedProviderAdapterDryRunExecutionMvpRecord["opaqueCredentialReferenceLabel"];
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  providerAdapterDryRunResultCaptureMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  nextSafeAction: string;
  explicitNoLiveGatePassStatement:
    ProviderDryRunExecutionNoLiveGatePassStatement;
}>;

export type ProviderDryRunExecutionRecoveryPlanPreviewRecord = Readonly<{
  key: ProviderDryRunExecutionRecoveryPlanKey;
  recoveryPlanVersion: ProviderDryRunExecutionRecoveryPlanVersion;
  providerDryRunExecutionReviewId: ProviderDryRunExecutionReviewId;
  recoveryPosture: ProviderDryRunExecutionRecoveryPosture;
  serverOnlyProviderDryRunExecutionHelperRecovery: string;
  dryRunExecutionInputRecovery: string;
  dryRunExecutionPlanRecovery: string;
  dryRunExecutionOutputRecovery: string;
  dryRunExecutionEnvelopeRecovery: string;
  dryRunFixtureResponseRecovery: string;
  dryRunBlockedLiveExecutionSummaryRecovery: string;
  evidencePreviewRecovery: string;
  auditPreviewRecovery: string;
  approvalPreviewRecovery: string;
  dryRunAdmissionDependencyRecovery: string;
  providerSelectionDependencyRecovery: string;
  credentialReferenceRecovery: string;
  credentialValueBoundaryRecovery: string;
  envVarBoundaryRecovery: string;
  providerKeyBoundaryRecovery: string;
  providerSdkBoundaryRecovery: string;
  liveProviderExecutionBoundaryRecovery: string;
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
  resultCaptureMissingRecovery: string;
  retryPosture: ProviderDryRunExecutionRetryPosture;
  fallbackPosture: ProviderDryRunExecutionFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  explicitNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement:
    ProviderDryRunExecutionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement;
}>;

export type ProviderDryRunExecutionRecoveryReadinessChecklistRecord =
  Readonly<{
    key: ProviderDryRunExecutionRecoveryReadinessChecklistKey;
    checklistVersion: ProviderDryRunExecutionRecoveryReadinessChecklistVersion;
    providerDryRunExecutionReviewId: ProviderDryRunExecutionReviewId;
    checklistId: ProviderDryRunExecutionRecoveryReadinessChecklistId;
    label: ProviderDryRunExecutionRecoveryReadinessChecklistLabel;
    state: ProviderDryRunExecutionRecoveryReadinessState;
    severity: ProviderDryRunExecutionReviewSeverity;
    evidenceRequired: string;
    recoveryAction: string;
    owner: ProviderDryRunExecutionRecoveryReadinessOwner;
    currentPosture: ProviderDryRunExecutionCurrentPosture;
    providerAdapterDryRunResultCaptureMvpDependency:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
    nextSafeAction: string;
  }>;

export type ProviderDryRunExecutionReviewAuditSummaryRecord = Readonly<{
  key: ProviderDryRunExecutionReviewAuditSummaryKey;
  auditSummaryVersion: ProviderDryRunExecutionReviewAuditSummaryVersion;
  providerDryRunExecutionReviewId: ProviderDryRunExecutionReviewId;
  auditPosture: ProviderDryRunExecutionAuditPosture;
  executionReferenceState: ProviderDryRunExecutionReferenceState;
  fixtureResponseReferenceState: ProviderDryRunExecutionReferenceState;
  providerSlotReferenceState: ProviderDryRunExecutionReferenceState;
  credentialReferenceState: ProviderDryRunExecutionCredentialReferenceAuditState;
  liveProviderExecutionState: ProviderDryRunExecutionLiveProviderExecutionState;
  credentialValueState: ProviderDryRunExecutionCredentialValueState;
  envVarState: ProviderDryRunExecutionEnvVarState;
  providerKeyState: ProviderDryRunExecutionProviderKeyState;
  evidencePacketState: ProviderDryRunExecutionEvidencePacketState;
  serverOnlyExecutionHelperEvidenceSummary: string;
  deterministicDryRunExecutionEvidenceSummary: string;
  fixtureResponseEvidenceSummary: string;
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
  providerAdapterDryRunResultCaptureMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
}>;

export type ProviderDryRunExecutionAcceptancePostureRecord = Readonly<{
  key: ProviderDryRunExecutionAcceptancePostureKey;
  acceptancePostureVersion: ProviderDryRunExecutionAcceptancePostureVersion;
  providerDryRunExecutionReviewId: ProviderDryRunExecutionReviewId;
  acceptanceState: ProviderDryRunExecutionAcceptanceState;
  fixtureOnlyAcceptanceSummary: string;
  backendOnlyAcceptanceSummary: string;
  serverOnlyAcceptanceSummary: string;
  dryRunExecutionOnlyAcceptanceSummary: string;
  credentialReferenceOnlyAcceptanceSummary: string;
  fixtureResponseOnlyAcceptanceSummary: string;
  blockedLiveExecutionAcceptanceSummary: string;
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
  resultCaptureBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitProviderDryRunExecutionFixtureAcceptedLiveProviderExecutionNotAcceptedStatement:
    ProviderDryRunExecutionAcceptanceStatement;
}>;

export type ProviderDryRunExecutionReviewSummary = Readonly<{
  version: ProviderDryRunExecutionReviewSummaryVersion;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  reviewCount: number;
  currentReadiness: ProviderDryRunExecutionReviewCurrentReadiness;
  acceptanceState: ProviderDryRunExecutionAcceptanceState;
  recoveryPosture: ProviderDryRunExecutionRecoveryPosture;
  retryPosture: ProviderDryRunExecutionRetryPosture;
  fallbackPosture: ProviderDryRunExecutionFallbackPosture;
  summaryLines: readonly string[];
}>;

export type ProviderDryRunExecutionOutputReviewSummary = Readonly<{
  version: ProviderDryRunExecutionOutputReviewSummaryVersion;
  recordCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderDryRunExecutionGateFailureSummary = Readonly<{
  version: ProviderDryRunExecutionGateFailureSummaryVersion;
  recordCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderDryRunExecutionRecoverySummary = Readonly<{
  version: ProviderDryRunExecutionRecoverySummaryVersion;
  planCount: number;
  checklistCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderAdapterDryRunResultCaptureMvpChecklist = readonly string[];

export type ProviderDryRunExecutionReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamily: ProviderDryRunExecutionCapabilityFamilyLabel;
  reviews: readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord[];
}>;

export type ProviderDryRunExecutionReviewProviderSlotGroup = Readonly<{
  providerSlot: ProviderDryRunExecutionProviderSlotLabel;
  reviews: readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord[];
}>;

export type ProviderDryRunExecutionReviewCredentialReferenceGroup = Readonly<{
  credentialReference: MinimalManualGatedProviderAdapterDryRunExecutionMvpRecord["opaqueCredentialReferenceLabel"];
  reviews: readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord[];
}>;
