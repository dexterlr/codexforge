import type { AiModelProviderWorkspaceTarget } from "../ai-provider-registry";
import type {
  ManualGatedModelAdapterDryRunCapabilityFamilyLabel,
  ManualGatedModelAdapterDryRunDenialFailureKey,
  ManualGatedModelAdapterDryRunFixtureResultKey,
  ManualGatedModelAdapterDryRunRequestPacketKey,
  ManualGatedModelAdapterDryRunScenarioId,
} from "../manual-gated-model-adapter-dry-run-harness";
import type { ServerOnlyModelAdapterCapabilityFamilyId } from "../server-only-model-adapter-contracts";

export const MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH =
  "4778-4809 - Model Adapter Dry-Run Result Review and Recovery";

export const MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_PHASE = 4809;

export const PREVIOUS_COMPLETED_MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH =
  "4746-4777 - Manual Gated Model Adapter Dry-Run Harness";

export const NEXT_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH =
  "4810-4841 - Athena Model Routing and Provider Selection Preview";

export type ModelAdapterDryRunReviewSource =
  "Jarvis Model Gateway / Athena";
export type ModelAdapterDryRunReviewMode =
  "fixture-only dry-run result review";
export type ModelAdapterDryRunResultPosture = "static fixture only";
export type ModelAdapterDryRunModelOutputPosture = "not generated";
export type ModelAdapterDryRunProviderResponsePosture = "not received";
export type ModelAdapterDryRunPromptSendingPosture = "not implemented";
export type ModelAdapterDryRunSdkPosture = "no SDK imports";
export type ModelAdapterDryRunCredentialPosture =
  "opaque credential references only";
export type ModelAdapterDryRunSecretPosture = "no plaintext secrets";
export type ModelAdapterDryRunEnvironmentPosture = "no env var reads";
export type ModelAdapterDryRunFrontendPosture = "blocked";
export type ModelAdapterDryRunBackendPosture = "server-only required";
export type ModelAdapterDryRunExecutionPosture = "blocked by default";
export type ModelAdapterDryRunOperatorReviewRequirement =
  "manual operator review required";
export type ModelAdapterDryRunRecoveryReviewRequirement =
  "manual recovery review required";
export type ModelAdapterDryRunApprovalRequirement =
  "operator approval required";
export type ModelAdapterDryRunManualConfirmationRequirement =
  "manual confirmation required";
export type ModelAdapterDryRunKillSwitchRequirement =
  "kill switch required";
export type ModelAdapterDryRunAuditRequirement = "audit required";
export type ModelAdapterDryRunCredentialIsolationRequirement =
  "credential isolation required";
export type ModelAdapterDryRunPrivacyRedactionRequirement =
  "privacy/redaction required";
export type ModelAdapterDryRunCostAcknowledgementRequirement =
  "cost acknowledgement required";
export type ModelAdapterDryRunRateLimitGuardRequirement =
  "rate limit guard required";
export type ModelAdapterDryRunTimeoutCancelGuardRequirement =
  "timeout/cancel guard required";
export type ModelAdapterDryRunIdempotencyRequirement =
  "idempotency required";
export type ModelAdapterDryRunReplayBlockRequirement =
  "replay block required";
export type ModelAdapterDryRunSingleDryRunLockRequirement =
  "single dry-run lock required";
export type ModelAdapterDryRunResultCaptureRequirement =
  "result capture required in future";
export type ModelAdapterDryRunPersistenceState =
  | "result persistence not implemented"
  | "audit persistence not implemented"
  | "approval persistence not implemented";
export type ModelAdapterDryRunNextModelRoutingRequirement =
  "Athena model routing and provider selection preview next";

export type ModelAdapterDryRunResultReviewKey =
  `athena-model-adapter-dry-run-result-review:${ManualGatedModelAdapterDryRunScenarioId}`;
export type ModelAdapterDryRunResultReviewVersion =
  "jarvis-model-gateway-dry-run-result-review-v1";

export type ModelAdapterDryRunQualityReviewKey =
  `athena-model-adapter-dry-run-quality-review:${ManualGatedModelAdapterDryRunScenarioId}`;
export type ModelAdapterDryRunQualityReviewVersion =
  "jarvis-model-gateway-dry-run-quality-review-v1";
export type ModelAdapterDryRunQualityState = "static preview only";
export type ModelAdapterDryRunProviderQualityState = "not measured";

export type ModelAdapterDryRunSafetyReviewKey =
  `athena-model-adapter-dry-run-safety-review:${ManualGatedModelAdapterDryRunScenarioId}`;
export type ModelAdapterDryRunSafetyReviewVersion =
  "jarvis-model-gateway-dry-run-safety-redaction-review-v1";
export type ModelAdapterDryRunSafetyState = "static preview only";
export type ModelAdapterDryRunRedactionState = "static preview only";
export type ModelAdapterDryRunPrivacyState = "static preview only";
export type ModelAdapterDryRunLeakageCheckState = "static preview only";
export type ModelAdapterDryRunUnsafeOutputCheckState = "static preview only";

export type ModelAdapterDryRunRecoveryPlanKey =
  `athena-model-adapter-dry-run-recovery-plan:${ManualGatedModelAdapterDryRunScenarioId}`;
export type ModelAdapterDryRunRecoveryPlanVersion =
  "jarvis-model-gateway-dry-run-recovery-plan-preview-v1";
export type ModelAdapterDryRunRecoveryPosture = "manual review only";
export type ModelAdapterDryRunRetryPosture = "disabled";
export type ModelAdapterDryRunFallbackPosture = "disabled";

export type ModelAdapterDryRunAcceptanceMatrixKey =
  `athena-model-adapter-dry-run-acceptance-matrix:${ManualGatedModelAdapterDryRunScenarioId}`;
export type ModelAdapterDryRunAcceptanceMatrixVersion =
  "jarvis-model-gateway-dry-run-acceptance-matrix-v1";
export type ModelAdapterDryRunAcceptanceMatrixCurrentState =
  "blocked / fixture-only";
export type ModelAdapterDryRunOperatorDecisionState =
  "pending manual review";

export type ModelAdapterDryRunResultReviewRecord = Readonly<{
  key: ModelAdapterDryRunResultReviewKey;
  reviewVersion: ModelAdapterDryRunResultReviewVersion;
  dryRunScenarioId: ManualGatedModelAdapterDryRunScenarioId;
  capabilityId: ServerOnlyModelAdapterCapabilityFamilyId;
  capabilityFamilyLabel: ManualGatedModelAdapterDryRunCapabilityFamilyLabel;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  dryRunRequestPacketReference: ManualGatedModelAdapterDryRunRequestPacketKey;
  fixtureResultReference: ManualGatedModelAdapterDryRunFixtureResultKey;
  source: ModelAdapterDryRunReviewSource;
  reviewMode: ModelAdapterDryRunReviewMode;
  resultPosture: ModelAdapterDryRunResultPosture;
  modelOutputPosture: ModelAdapterDryRunModelOutputPosture;
  providerResponsePosture: ModelAdapterDryRunProviderResponsePosture;
  promptSendingPosture: ModelAdapterDryRunPromptSendingPosture;
  sdkPosture: ModelAdapterDryRunSdkPosture;
  credentialPosture: ModelAdapterDryRunCredentialPosture;
  secretPosture: ModelAdapterDryRunSecretPosture;
  environmentPosture: ModelAdapterDryRunEnvironmentPosture;
  frontendPosture: ModelAdapterDryRunFrontendPosture;
  backendPosture: ModelAdapterDryRunBackendPosture;
  executionPosture: ModelAdapterDryRunExecutionPosture;
  manualOperatorReviewRequired: ModelAdapterDryRunOperatorReviewRequirement;
  manualRecoveryReviewRequired: ModelAdapterDryRunRecoveryReviewRequirement;
  operatorApprovalRequired: ModelAdapterDryRunApprovalRequirement;
  manualConfirmationRequired: ModelAdapterDryRunManualConfirmationRequirement;
  killSwitchRequired: ModelAdapterDryRunKillSwitchRequirement;
  auditRequired: ModelAdapterDryRunAuditRequirement;
  credentialIsolationRequired: ModelAdapterDryRunCredentialIsolationRequirement;
  privacyRedactionRequired: ModelAdapterDryRunPrivacyRedactionRequirement;
  costAcknowledgementRequired: ModelAdapterDryRunCostAcknowledgementRequirement;
  rateLimitGuardRequired: ModelAdapterDryRunRateLimitGuardRequirement;
  timeoutCancelGuardRequired: ModelAdapterDryRunTimeoutCancelGuardRequirement;
  idempotencyRequired: ModelAdapterDryRunIdempotencyRequirement;
  replayBlockRequired: ModelAdapterDryRunReplayBlockRequirement;
  singleDryRunLockRequired: ModelAdapterDryRunSingleDryRunLockRequirement;
  resultCaptureRequiredInFuture: ModelAdapterDryRunResultCaptureRequirement;
  resultPersistenceState: "result persistence not implemented";
  auditPersistenceState: "audit persistence not implemented";
  approvalPersistenceState: "approval persistence not implemented";
  nextModelRoutingProviderSelectionRequirement: ModelAdapterDryRunNextModelRoutingRequirement;
  blockedDefaultReason: string;
  noLiveResultReviewStatement: string;
}>;

export type ModelAdapterDryRunQualityReviewRecord = Readonly<{
  key: ModelAdapterDryRunQualityReviewKey;
  qualityReviewVersion: ModelAdapterDryRunQualityReviewVersion;
  dryRunScenarioId: ManualGatedModelAdapterDryRunScenarioId;
  capabilityId: ServerOnlyModelAdapterCapabilityFamilyId;
  capabilityFamilyLabel: ManualGatedModelAdapterDryRunCapabilityFamilyLabel;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  dryRunRequestPacketReference: ManualGatedModelAdapterDryRunRequestPacketKey;
  fixtureResultReference: ManualGatedModelAdapterDryRunFixtureResultKey;
  qualityState: ModelAdapterDryRunQualityState;
  providerQualityState: ModelAdapterDryRunProviderQualityState;
  modelOutputState: ModelAdapterDryRunModelOutputPosture;
  acceptanceCriteria: readonly string[];
  blockedAcceptanceCriteria: readonly string[];
  operatorReviewNotes: readonly string[];
  missingEvidence: readonly string[];
  requiredRecoveryAction: string;
  nextSafeAction: string;
  noLiveQualityResultStatement: string;
}>;

export type ModelAdapterDryRunSafetyRedactionReviewRecord = Readonly<{
  key: ModelAdapterDryRunSafetyReviewKey;
  safetyRedactionReviewVersion: ModelAdapterDryRunSafetyReviewVersion;
  dryRunScenarioId: ManualGatedModelAdapterDryRunScenarioId;
  capabilityId: ServerOnlyModelAdapterCapabilityFamilyId;
  capabilityFamilyLabel: ManualGatedModelAdapterDryRunCapabilityFamilyLabel;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  fixtureResultReference: ManualGatedModelAdapterDryRunFixtureResultKey;
  safetyReviewState: ModelAdapterDryRunSafetyState;
  redactionReviewState: ModelAdapterDryRunRedactionState;
  privacyReviewState: ModelAdapterDryRunPrivacyState;
  promptLeakageCheckState: ModelAdapterDryRunLeakageCheckState;
  credentialLeakageCheckState: ModelAdapterDryRunLeakageCheckState;
  tokenLeakageCheckState: ModelAdapterDryRunLeakageCheckState;
  unsafeOutputCheckState: ModelAdapterDryRunUnsafeOutputCheckState;
  requiredOperatorReview: ModelAdapterDryRunOperatorReviewRequirement;
  blockedDefaultReason: string;
  noLiveSafetyResultStatement: string;
}>;

export type ModelAdapterDryRunRecoveryPlanPreviewRecord = Readonly<{
  key: ModelAdapterDryRunRecoveryPlanKey;
  recoveryPlanVersion: ModelAdapterDryRunRecoveryPlanVersion;
  dryRunScenarioId: ManualGatedModelAdapterDryRunScenarioId;
  capabilityId: ServerOnlyModelAdapterCapabilityFamilyId;
  capabilityFamilyLabel: ManualGatedModelAdapterDryRunCapabilityFamilyLabel;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  denialFailurePreviewReference: ManualGatedModelAdapterDryRunDenialFailureKey;
  fixtureResultReference: ManualGatedModelAdapterDryRunFixtureResultKey;
  recoveryPosture: ModelAdapterDryRunRecoveryPosture;
  retryPosture: ModelAdapterDryRunRetryPosture;
  fallbackPosture: ModelAdapterDryRunFallbackPosture;
  timeoutCancelPosture: string;
  missingApprovalRecovery: string;
  killSwitchBlockedRecovery: string;
  missingOpaqueCredentialRecovery: string;
  promptNotSentRecovery: string;
  providerNotCalledRecovery: string;
  resultNotGeneratedRecovery: string;
  auditNotPersistedRecovery: string;
  approvalNotPersistedRecovery: string;
  resultNotPersistedRecovery: string;
  operatorActionRequired: string;
  nextSafeBatchRecommendation: typeof NEXT_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH;
  noRetryNoFallbackNoExecutionStatement: string;
}>;

export type ModelAdapterDryRunAcceptanceMatrixRecord = Readonly<{
  key: ModelAdapterDryRunAcceptanceMatrixKey;
  acceptanceMatrixVersion: ModelAdapterDryRunAcceptanceMatrixVersion;
  scenarioId: ManualGatedModelAdapterDryRunScenarioId;
  capabilityId: ServerOnlyModelAdapterCapabilityFamilyId;
  capabilityFamilyLabel: ManualGatedModelAdapterDryRunCapabilityFamilyLabel;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  acceptanceCriteria: readonly string[];
  blockerCriteria: readonly string[];
  safetyCriteria: readonly string[];
  privacyCriteria: readonly string[];
  costRateCriteria: readonly string[];
  auditCriteria: readonly string[];
  approvalCriteria: readonly string[];
  serverOnlyCriteria: readonly string[];
  credentialIsolationCriteria: readonly string[];
  currentState: ModelAdapterDryRunAcceptanceMatrixCurrentState;
  operatorDecisionState: ModelAdapterDryRunOperatorDecisionState;
  nextAction: string;
}>;

export type ModelAdapterDryRunResultReviewCapabilityGroup = Readonly<{
  capabilityFamilyLabel: ManualGatedModelAdapterDryRunCapabilityFamilyLabel;
  reviewCount: number;
  reviews: readonly ModelAdapterDryRunResultReviewRecord[];
}>;

export type ModelAdapterDryRunResultReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  reviewCount: number;
  reviews: readonly ModelAdapterDryRunResultReviewRecord[];
}>;

export type ModelAdapterDryRunResultReviewSummary = Readonly<{
  currentBatch: typeof MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH;
  highestDetectedPhase: typeof MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_PHASE;
  latestCompletedBatch: typeof MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH;
  previousCompletedBatch: typeof PREVIOUS_COMPLETED_MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH;
  nextLikelyBatch: typeof NEXT_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH;
  resultReviewCount: number;
  qualityReviewCount: number;
  safetyReviewCount: number;
  recoveryPlanCount: number;
  acceptanceMatrixCount: number;
  capabilityFamilyCount: number;
  workspaceTargetCount: number;
  summaryLines: readonly string[];
}>;

export type ModelAdapterDryRunRecoverySummary = Readonly<{
  currentBatch: typeof MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH;
  nextLikelyBatch: typeof NEXT_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH;
  recoveryPlanCount: number;
  manualReviewOnlyCount: number;
  retryDisabledCount: number;
  fallbackDisabledCount: number;
  summaryLines: readonly string[];
}>;

export type ModelAdapterDryRunAcceptanceSummary = Readonly<{
  currentBatch: typeof MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH;
  nextLikelyBatch: typeof NEXT_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH;
  acceptanceMatrixCount: number;
  blockedFixtureOnlyCount: number;
  pendingManualReviewCount: number;
  summaryLines: readonly string[];
}>;
