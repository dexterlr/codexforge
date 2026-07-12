import type {
  AiModelProviderSlotId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  ServerOnlyModelAdapterApprovalDraftReference,
  ServerOnlyModelAdapterCapabilityFamilyId,
  ServerOnlyModelAdapterCommandDraftReference,
  ServerOnlyModelAdapterContractId,
  ServerOnlyModelAdapterRequestEnvelopeKey,
  ServerOnlyModelAdapterResponseEnvelopeKey,
} from "../server-only-model-adapter-contracts";

export const MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH =
  "4746-4777 - Manual Gated Model Adapter Dry-Run Harness";

export const MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_PHASE = 4777;

export const PREVIOUS_COMPLETED_SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH =
  "4714-4745 - Server-Only Model Adapter Contracts";

export const MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH =
  "4778-4809 - Model Adapter Dry-Run Result Review and Recovery";

export type ManualGatedModelAdapterDryRunHarnessKey =
  "athena-model-adapter-dry-run-harness:manual-gated";
export type ManualGatedModelAdapterDryRunHarnessVersion =
  "jarvis-model-gateway-manual-gated-dry-run-harness-v1";
export type ManualGatedModelAdapterDryRunSource =
  "Jarvis Model Gateway / Athena";
export type ManualGatedModelAdapterDryRunHarnessMode =
  "manual gated dry-run only";
export type ManualGatedModelAdapterDryRunFixtureMode = "fixture-only";
export type ManualGatedModelAdapterDryRunProviderCallPosture =
  "not implemented";
export type ManualGatedModelAdapterDryRunModelCallPosture = "not implemented";
export type ManualGatedModelAdapterDryRunPromptSendingPosture =
  "not implemented";
export type ManualGatedModelAdapterDryRunSdkPosture = "no SDK imports";
export type ManualGatedModelAdapterDryRunCredentialPosture =
  "opaque credential references only";
export type ManualGatedModelAdapterDryRunSecretPosture =
  "no plaintext secrets";
export type ManualGatedModelAdapterDryRunEnvironmentPosture =
  "no env var reads";
export type ManualGatedModelAdapterDryRunFrontendPosture = "blocked";
export type ManualGatedModelAdapterDryRunBackendPosture =
  "server-only required";
export type ManualGatedModelAdapterDryRunExecutionPosture =
  "blocked by default";
export type ManualGatedModelAdapterDryRunManualApprovalRequirement =
  "manual operator approval required";
export type ManualGatedModelAdapterDryRunManualConfirmationRequirement =
  "manual confirmation required";
export type ManualGatedModelAdapterDryRunKillSwitchRequirement =
  "kill switch required";
export type ManualGatedModelAdapterDryRunAuditRequirement = "audit required";
export type ManualGatedModelAdapterDryRunCredentialIsolationRequirement =
  "credential isolation required";
export type ManualGatedModelAdapterDryRunPrivacyRedactionRequirement =
  "privacy/redaction required";
export type ManualGatedModelAdapterDryRunCostAcknowledgementRequirement =
  "cost acknowledgement required";
export type ManualGatedModelAdapterDryRunRateLimitGuardRequirement =
  "rate limit guard required";
export type ManualGatedModelAdapterDryRunTimeoutCancelGuardRequirement =
  "timeout/cancel guard required";
export type ManualGatedModelAdapterDryRunIdempotencyRequirement =
  "idempotency required";
export type ManualGatedModelAdapterDryRunReplayBlockRequirement =
  "replay block required";
export type ManualGatedModelAdapterDryRunSingleLockRequirement =
  "single dry-run lock required";
export type ManualGatedModelAdapterDryRunResultCaptureRequirement =
  "result capture required in future";
export type ManualGatedModelAdapterDryRunPersistenceState =
  | "result persistence not implemented"
  | "audit persistence not implemented"
  | "approval persistence not implemented";
export type ManualGatedModelAdapterDryRunNextReviewRequirement =
  "dry-run result review and recovery comes next";

export type ManualGatedModelAdapterDryRunScenarioId =
  | "text-planning-dry-run-scenario"
  | "code-assistance-dry-run-scenario"
  | "image-storyboard-dry-run-scenario"
  | "video-prompt-planning-dry-run-scenario"
  | "audio-narration-dry-run-scenario"
  | "transcription-caption-dry-run-scenario"
  | "embeddings-search-dry-run-scenario"
  | "safety-moderation-dry-run-scenario"
  | "local-private-inference-dry-run-scenario";
export type ManualGatedModelAdapterDryRunScenarioKey =
  `athena-model-adapter-dry-run-scenario:${ManualGatedModelAdapterDryRunScenarioId}`;
export type ManualGatedModelAdapterDryRunCapabilityFamilyLabel =
  | "text planning"
  | "code assistance"
  | "image storyboard"
  | "video prompt planning"
  | "audio narration"
  | "transcription/caption"
  | "embeddings/search"
  | "safety/moderation"
  | "local/private inference";
export type ManualGatedModelAdapterDryRunScenarioState =
  "blocked by default";
export type ManualGatedModelAdapterDryRunFixturePacketPosture =
  "fixture-only packets";

export type ManualGatedModelAdapterDryRunRequestPacketKey =
  `athena-model-adapter-dry-run-request-packet:${ManualGatedModelAdapterDryRunScenarioId}`;
export type ManualGatedModelAdapterDryRunRequestPacketVersion =
  "jarvis-model-gateway-dry-run-request-packet-preview-v1";
export type ManualGatedModelAdapterDryRunFixtureInputState =
  "static fixture only";
export type ManualGatedModelAdapterDryRunPromptPayloadPosture =
  "redacted placeholder only";
export type ManualGatedModelAdapterDryRunPromptTransmissionState = "not sent";
export type ManualGatedModelAdapterDryRunCredentialReferencePosture =
  "opaque label only";
export type ManualGatedModelAdapterDryRunApprovalReferencePosture =
  "preview-only";
export type ManualGatedModelAdapterDryRunAuditReferencePosture =
  "preview-only";
export type ManualGatedModelAdapterDryRunIdempotencyKeyPosture =
  "deterministic preview key only";

export type ManualGatedModelAdapterDryRunFixtureResultKey =
  `athena-model-adapter-dry-run-fixture-result:${ManualGatedModelAdapterDryRunScenarioId}`;
export type ManualGatedModelAdapterDryRunFixtureResultVersion =
  "jarvis-model-gateway-dry-run-fixture-result-preview-v1";
export type ManualGatedModelAdapterDryRunFixtureResultState =
  "static placeholder only";
export type ManualGatedModelAdapterDryRunProviderResponseState =
  "not received";
export type ManualGatedModelAdapterDryRunModelOutputState = "not generated";
export type ManualGatedModelAdapterDryRunTokenCostAccountingState =
  "estimated placeholder only";
export type ManualGatedModelAdapterDryRunSafetyReviewState =
  "static preview only";
export type ManualGatedModelAdapterDryRunRedactionState =
  "static preview only";
export type ManualGatedModelAdapterDryRunJoinState = "not persisted";
export type ManualGatedModelAdapterDryRunResultCaptureState =
  "not implemented";
export type ManualGatedModelAdapterDryRunFailureRecoveryState =
  "not implemented";

export type ManualGatedModelAdapterDryRunDenialFailureKey =
  `athena-model-adapter-dry-run-denial:${ManualGatedModelAdapterDryRunScenarioId}`;
export type ManualGatedModelAdapterDryRunDenialFailureVersion =
  "jarvis-model-gateway-dry-run-denial-preview-v1";
export type ManualGatedModelAdapterDryRunRetryFallbackPosture = "disabled";
export type ManualGatedModelAdapterDryRunRecoveryPosture =
  "future manual review only";
export type ManualGatedModelAdapterDryRunAuditPosture = "not persisted";

export type ManualGatedModelAdapterDryRunGateId =
  | "manual-operator-approval"
  | "manual-confirmation"
  | "kill-switch"
  | "audit-preview"
  | "server-only-boundary"
  | "no-frontend-provider-call"
  | "no-provider-sdk-import-in-frontend"
  | "no-prompt-sending"
  | "opaque-credential-reference"
  | "no-plaintext-secrets"
  | "no-env-var-reads-from-frontend"
  | "privacy-redaction"
  | "cost-rate-timeout"
  | "idempotency-replay-block"
  | "single-dry-run-lock"
  | "fixture-only-result"
  | "manual-review"
  | "no-persistence-until-future-backend-batch";

export type ManualGatedModelAdapterDryRunHarnessRecord = Readonly<{
  key: ManualGatedModelAdapterDryRunHarnessKey;
  harnessVersion: ManualGatedModelAdapterDryRunHarnessVersion;
  currentBatch: typeof MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH;
  highestDetectedPhase: typeof MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_PHASE;
  latestCompletedBatch: typeof MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH;
  previousCompletedBatch: typeof PREVIOUS_COMPLETED_SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH;
  nextLikelyBatch: typeof MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH;
  source: ManualGatedModelAdapterDryRunSource;
  harnessMode: ManualGatedModelAdapterDryRunHarnessMode;
  fixtureMode: ManualGatedModelAdapterDryRunFixtureMode;
  providerCallPosture: ManualGatedModelAdapterDryRunProviderCallPosture;
  modelCallPosture: ManualGatedModelAdapterDryRunModelCallPosture;
  promptSendingPosture: ManualGatedModelAdapterDryRunPromptSendingPosture;
  sdkPosture: ManualGatedModelAdapterDryRunSdkPosture;
  credentialPosture: ManualGatedModelAdapterDryRunCredentialPosture;
  secretPosture: ManualGatedModelAdapterDryRunSecretPosture;
  environmentPosture: ManualGatedModelAdapterDryRunEnvironmentPosture;
  frontendPosture: ManualGatedModelAdapterDryRunFrontendPosture;
  backendPosture: ManualGatedModelAdapterDryRunBackendPosture;
  executionPosture: ManualGatedModelAdapterDryRunExecutionPosture;
  manualOperatorApprovalRequired: ManualGatedModelAdapterDryRunManualApprovalRequirement;
  manualConfirmationRequired: ManualGatedModelAdapterDryRunManualConfirmationRequirement;
  killSwitchRequired: ManualGatedModelAdapterDryRunKillSwitchRequirement;
  auditRequired: ManualGatedModelAdapterDryRunAuditRequirement;
  credentialIsolationRequired: ManualGatedModelAdapterDryRunCredentialIsolationRequirement;
  privacyRedactionRequired: ManualGatedModelAdapterDryRunPrivacyRedactionRequirement;
  costAcknowledgementRequired: ManualGatedModelAdapterDryRunCostAcknowledgementRequirement;
  rateLimitGuardRequired: ManualGatedModelAdapterDryRunRateLimitGuardRequirement;
  timeoutCancelGuardRequired: ManualGatedModelAdapterDryRunTimeoutCancelGuardRequirement;
  idempotencyRequired: ManualGatedModelAdapterDryRunIdempotencyRequirement;
  replayBlockRequired: ManualGatedModelAdapterDryRunReplayBlockRequirement;
  singleDryRunLockRequired: ManualGatedModelAdapterDryRunSingleLockRequirement;
  resultCaptureRequiredInFuture: ManualGatedModelAdapterDryRunResultCaptureRequirement;
  resultPersistenceState: "result persistence not implemented";
  auditPersistenceState: "audit persistence not implemented";
  approvalPersistenceState: "approval persistence not implemented";
  nextResultReviewRecoveryRequirement: ManualGatedModelAdapterDryRunNextReviewRequirement;
  blockedDefaultReason: string;
  noExecutionStatement: string;
}>;

export type ManualGatedModelAdapterDryRunScenarioRecord = Readonly<{
  id: ManualGatedModelAdapterDryRunScenarioId;
  key: ManualGatedModelAdapterDryRunScenarioKey;
  label: string;
  capabilityFamilyLabel: ManualGatedModelAdapterDryRunCapabilityFamilyLabel;
  adapterCapabilityId: ServerOnlyModelAdapterCapabilityFamilyId;
  adapterContractId: ServerOnlyModelAdapterContractId;
  providerSlotId: AiModelProviderSlotId;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  summary: string;
  fixturePacketPosture: ManualGatedModelAdapterDryRunFixturePacketPosture;
  defaultState: ManualGatedModelAdapterDryRunScenarioState;
  blockedDefaultReason: string;
  noExecutionStatement: string;
}>;

export type ManualGatedModelAdapterDryRunRequestPacketPreviewRecord = Readonly<{
  key: ManualGatedModelAdapterDryRunRequestPacketKey;
  requestPacketVersion: ManualGatedModelAdapterDryRunRequestPacketVersion;
  dryRunScenarioId: ManualGatedModelAdapterDryRunScenarioId;
  adapterContractId: ServerOnlyModelAdapterContractId;
  capabilityId: ServerOnlyModelAdapterCapabilityFamilyId;
  providerSlotId: AiModelProviderSlotId;
  sourceCommandDraftReference: ServerOnlyModelAdapterCommandDraftReference;
  sourceApprovalDraftReference: ServerOnlyModelAdapterApprovalDraftReference;
  sourceAdapterRequestEnvelopeReference: ServerOnlyModelAdapterRequestEnvelopeKey;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  operatorObjective: string;
  promptPayloadPosture: ManualGatedModelAdapterDryRunPromptPayloadPosture;
  promptTransmissionState: ManualGatedModelAdapterDryRunPromptTransmissionState;
  fixtureInputState: ManualGatedModelAdapterDryRunFixtureInputState;
  credentialReferencePosture: ManualGatedModelAdapterDryRunCredentialReferencePosture;
  approvalReferencePosture: ManualGatedModelAdapterDryRunApprovalReferencePosture;
  auditReferencePosture: ManualGatedModelAdapterDryRunAuditReferencePosture;
  idempotencyKeyPosture: ManualGatedModelAdapterDryRunIdempotencyKeyPosture;
  privacyRedactionSummary: string;
  costRateSummary: string;
  timeoutCancelSummary: string;
  manualApprovalGateState: ManualGatedModelAdapterDryRunManualApprovalRequirement;
  killSwitchGateState: ManualGatedModelAdapterDryRunKillSwitchRequirement;
  blockedDefaultReason: string;
  noExecutionStatement: string;
}>;

export type ManualGatedModelAdapterDryRunFixtureResultPreviewRecord = Readonly<{
  key: ManualGatedModelAdapterDryRunFixtureResultKey;
  fixtureResultVersion: ManualGatedModelAdapterDryRunFixtureResultVersion;
  dryRunRequestPacketReference: ManualGatedModelAdapterDryRunRequestPacketKey;
  adapterResponseEnvelopeReference: ServerOnlyModelAdapterResponseEnvelopeKey;
  fixtureResultState: ManualGatedModelAdapterDryRunFixtureResultState;
  providerResponseState: ManualGatedModelAdapterDryRunProviderResponseState;
  modelOutputState: ManualGatedModelAdapterDryRunModelOutputState;
  tokenCostAccountingState: ManualGatedModelAdapterDryRunTokenCostAccountingState;
  safetyReviewState: ManualGatedModelAdapterDryRunSafetyReviewState;
  redactionState: ManualGatedModelAdapterDryRunRedactionState;
  auditJoinState: ManualGatedModelAdapterDryRunJoinState;
  approvalJoinState: ManualGatedModelAdapterDryRunJoinState;
  resultCaptureState: ManualGatedModelAdapterDryRunResultCaptureState;
  failureRecoveryState: ManualGatedModelAdapterDryRunFailureRecoveryState;
  blockedDefaultReason: string;
  noLiveResultStatement: string;
}>;

export type ManualGatedModelAdapterDryRunDenialFailurePreviewRecord = Readonly<{
  key: ManualGatedModelAdapterDryRunDenialFailureKey;
  denialFailureVersion: ManualGatedModelAdapterDryRunDenialFailureVersion;
  dryRunScenarioId: ManualGatedModelAdapterDryRunScenarioId;
  deniedReasonExamples: readonly string[];
  localValidationErrorExamples: readonly string[];
  killSwitchBlockedExample: string;
  missingApprovalExample: string;
  missingOpaqueCredentialReferenceExample: string;
  promptNotSentReason: string;
  providerNotCalledReason: string;
  timeoutCancelPosture: string;
  retryFallbackPosture: ManualGatedModelAdapterDryRunRetryFallbackPosture;
  recoveryPosture: ManualGatedModelAdapterDryRunRecoveryPosture;
  auditPosture: ManualGatedModelAdapterDryRunAuditPosture;
  operatorActionRequired: string;
  noProviderErrorReceivedStatement: string;
}>;

export type ManualGatedModelAdapterDryRunGateChecklistRecord = Readonly<{
  id: ManualGatedModelAdapterDryRunGateId;
  label: string;
  summary: string;
}>;

export type ManualGatedModelAdapterDryRunScenarioCapabilityGroup = Readonly<{
  capabilityFamilyLabel: ManualGatedModelAdapterDryRunCapabilityFamilyLabel;
  scenarioCount: number;
  scenarios: readonly ManualGatedModelAdapterDryRunScenarioRecord[];
}>;

export type ManualGatedModelAdapterDryRunScenarioWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  scenarioCount: number;
  scenarios: readonly ManualGatedModelAdapterDryRunScenarioRecord[];
}>;

export type ManualGatedModelAdapterDryRunReadinessSummary = Readonly<{
  currentBatch: typeof MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH;
  highestDetectedPhase: typeof MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_PHASE;
  latestCompletedBatch: typeof MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH;
  previousCompletedBatch: typeof PREVIOUS_COMPLETED_SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH;
  nextLikelyBatch: typeof MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH;
  scenarioCount: number;
  requestPacketCount: number;
  fixtureResultCount: number;
  denialFailureCount: number;
  gateCount: number;
  workspaceTargetCount: number;
  summaryLines: readonly string[];
}>;

export type ManualGatedModelAdapterDryRunBlockedExecutionSummary = Readonly<{
  summary: string;
  blockedLines: readonly string[];
}>;
