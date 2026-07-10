import type {
  AiModelProviderSlotId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";

export const SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH =
  "4714-4745 - Server-Only Model Adapter Contracts";

export const SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_PHASE = 4745;

export const MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH =
  "4746-4777 - Manual Gated Model Adapter Dry-Run Harness";

export type ServerOnlyModelAdapterContractVersion =
  "jarvis-model-gateway-server-only-model-adapter-contract-v1";
export type ServerOnlyModelAdapterSource = "Jarvis Model Gateway / Athena";
export type ServerOnlyModelAdapterContractMode = "preview-only";
export type ServerOnlyModelAdapterEnvelopeVersion =
  | "jarvis-model-gateway-request-envelope-preview-v1"
  | "jarvis-model-gateway-response-envelope-preview-v1"
  | "jarvis-model-gateway-error-envelope-preview-v1";
export type ServerOnlyModelAdapterCapabilityFamilyId =
  | "text-chat"
  | "code-assistance"
  | "planning-reasoning"
  | "image-generation"
  | "image-editing"
  | "video-generation"
  | "audio-voice"
  | "transcription"
  | "embeddings-search"
  | "safety-moderation"
  | "local-inference";
export type ServerOnlyModelAdapterContractId =
  | "text-chat-adapter-contract"
  | "code-assistance-adapter-contract"
  | "planning-reasoning-adapter-contract"
  | "image-generation-adapter-contract"
  | "image-editing-adapter-contract"
  | "video-generation-adapter-contract"
  | "audio-voice-adapter-contract"
  | "transcription-adapter-contract"
  | "embeddings-search-adapter-contract"
  | "safety-moderation-adapter-contract"
  | "local-inference-adapter-contract";
export type ServerOnlyModelAdapterContractKey =
  `athena-model-adapter-contract:${ServerOnlyModelAdapterContractId}`;
export type ServerOnlyModelAdapterRequestEnvelopeKey =
  `athena-model-adapter-request-envelope:${ServerOnlyModelAdapterContractId}`;
export type ServerOnlyModelAdapterResponseEnvelopeKey =
  `athena-model-adapter-response-envelope:${ServerOnlyModelAdapterContractId}`;
export type ServerOnlyModelAdapterErrorEnvelopeKey =
  `athena-model-adapter-error-envelope:${ServerOnlyModelAdapterContractId}`;
export type ServerOnlyModelAdapterCommandDraftReference =
  `athena-command-draft:${string}`;
export type ServerOnlyModelAdapterApprovalDraftReference =
  `athena-approval-draft:${string}`;
export type ServerOnlyModelAdapterAdapterPosture = "server-only required";
export type ServerOnlyModelAdapterFrontendPosture = "blocked";
export type ServerOnlyModelAdapterProviderCallPosture = "not implemented";
export type ServerOnlyModelAdapterModelCallPosture = "not implemented";
export type ServerOnlyModelAdapterPromptSendingPosture = "not implemented";
export type ServerOnlyModelAdapterSdkPosture = "no SDK imports";
export type ServerOnlyModelAdapterCredentialPosture =
  "opaque credential references only";
export type ServerOnlyModelAdapterSecretPosture = "no plaintext secrets";
export type ServerOnlyModelAdapterEnvironmentPosture = "no env var reads";
export type ServerOnlyModelAdapterExecutionPosture = "blocked by default";
export type ServerOnlyModelAdapterOperatorApprovalRequirement =
  "operator approval required";
export type ServerOnlyModelAdapterKillSwitchRequirement =
  "kill switch required";
export type ServerOnlyModelAdapterAuditRequirement = "audit required";
export type ServerOnlyModelAdapterCredentialIsolationRequirement =
  "credential isolation required";
export type ServerOnlyModelAdapterPrivacyRedactionRequirement =
  "privacy/redaction required";
export type ServerOnlyModelAdapterCostAcknowledgementRequirement =
  "cost acknowledgement required";
export type ServerOnlyModelAdapterRateLimitGuardRequirement =
  "rate limit guard required";
export type ServerOnlyModelAdapterTimeoutCancelGuardRequirement =
  "timeout/cancel guard required";
export type ServerOnlyModelAdapterIdempotencyRequirement =
  "idempotency required";
export type ServerOnlyModelAdapterReplayBlockRequirement =
  "replay block required";
export type ServerOnlyModelAdapterResultCaptureRequirement =
  "result capture required in future";
export type ServerOnlyModelAdapterPersistenceState =
  | "result persistence not implemented"
  | "audit persistence not implemented"
  | "approval persistence not implemented";
export type ServerOnlyModelAdapterPromptPayloadPosture =
  "redacted placeholder only";
export type ServerOnlyModelAdapterPromptTransmissionState = "not sent";
export type ServerOnlyModelAdapterCredentialReferencePosture =
  "opaque label only";
export type ServerOnlyModelAdapterApprovalReferencePosture = "preview-only";
export type ServerOnlyModelAdapterAuditReferencePosture = "preview-only";
export type ServerOnlyModelAdapterIdempotencyKeyPosture =
  "deterministic preview key only";
export type ServerOnlyModelAdapterResponseResultState = "placeholder only";
export type ServerOnlyModelAdapterProviderResponseState = "not received";
export type ServerOnlyModelAdapterTokenCostAccountingState = "not available";
export type ServerOnlyModelAdapterFutureBackendState =
  "pending future backend result";
export type ServerOnlyModelAdapterJoinState = "not persisted";
export type ServerOnlyModelAdapterResultCaptureState = "not implemented";
export type ServerOnlyModelAdapterFailureRecoveryState = "not implemented";
export type ServerOnlyModelAdapterProviderErrorState = "not received";
export type ServerOnlyModelAdapterRetryFallbackPosture = "disabled";
export type ServerOnlyModelAdapterRecoveryPosture =
  "future manual review only";
export type ServerOnlyModelAdapterManualReviewRequirement =
  "manual review required";
export type ServerOnlyModelAdapterNoPersistenceRequirement =
  "no persistence until future backend batch";
export type ServerOnlyModelAdapterGateId =
  | "server-only-boundary"
  | "no-frontend-provider-call"
  | "no-provider-sdk-import-in-frontend"
  | "no-prompt-sending-from-frontend"
  | "opaque-credential-reference"
  | "no-plaintext-secrets"
  | "no-env-var-reads-from-frontend"
  | "operator-approval"
  | "kill-switch"
  | "audit"
  | "privacy-redaction"
  | "cost-rate-timeout"
  | "idempotency-replay-block"
  | "result-capture"
  | "manual-review"
  | "no-persistence-until-future-backend-batch";

export type ServerOnlyModelAdapterContractRecord = Readonly<{
  id: ServerOnlyModelAdapterContractId;
  key: ServerOnlyModelAdapterContractKey;
  label: string;
  capabilityFamilyId: ServerOnlyModelAdapterCapabilityFamilyId;
  capabilityFamilyLabel: string;
  targetProviderSlotId: AiModelProviderSlotId;
  workspaceTargets: readonly AiModelProviderWorkspaceTarget[];
  summary: string;
  contractVersion: ServerOnlyModelAdapterContractVersion;
  source: ServerOnlyModelAdapterSource;
  contractMode: ServerOnlyModelAdapterContractMode;
  adapterPosture: ServerOnlyModelAdapterAdapterPosture;
  frontendPosture: ServerOnlyModelAdapterFrontendPosture;
  providerCallPosture: ServerOnlyModelAdapterProviderCallPosture;
  modelCallPosture: ServerOnlyModelAdapterModelCallPosture;
  promptSendingPosture: ServerOnlyModelAdapterPromptSendingPosture;
  sdkPosture: ServerOnlyModelAdapterSdkPosture;
  credentialPosture: ServerOnlyModelAdapterCredentialPosture;
  secretPosture: ServerOnlyModelAdapterSecretPosture;
  environmentPosture: ServerOnlyModelAdapterEnvironmentPosture;
  executionPosture: ServerOnlyModelAdapterExecutionPosture;
  operatorApprovalRequired: ServerOnlyModelAdapterOperatorApprovalRequirement;
  killSwitchRequired: ServerOnlyModelAdapterKillSwitchRequirement;
  auditRequired: ServerOnlyModelAdapterAuditRequirement;
  credentialIsolationRequired: ServerOnlyModelAdapterCredentialIsolationRequirement;
  privacyRedactionRequired: ServerOnlyModelAdapterPrivacyRedactionRequirement;
  costAcknowledgementRequired: ServerOnlyModelAdapterCostAcknowledgementRequirement;
  rateLimitGuardRequired: ServerOnlyModelAdapterRateLimitGuardRequirement;
  timeoutCancelGuardRequired: ServerOnlyModelAdapterTimeoutCancelGuardRequirement;
  idempotencyRequired: ServerOnlyModelAdapterIdempotencyRequirement;
  replayBlockRequired: ServerOnlyModelAdapterReplayBlockRequirement;
  resultCaptureRequiredInFuture: ServerOnlyModelAdapterResultCaptureRequirement;
  resultPersistenceState: "result persistence not implemented";
  auditPersistenceState: "audit persistence not implemented";
  approvalPersistenceState: "approval persistence not implemented";
  nextDryRunHarnessRequirement: string;
}>;

export type ServerOnlyModelAdapterRequestEnvelopePreviewRecord = Readonly<{
  requestEnvelopeKey: ServerOnlyModelAdapterRequestEnvelopeKey;
  requestEnvelopeVersion: "jarvis-model-gateway-request-envelope-preview-v1";
  adapterContractId: ServerOnlyModelAdapterContractId;
  capabilityId: ServerOnlyModelAdapterCapabilityFamilyId;
  capabilityLabel: string;
  targetProviderSlotId: AiModelProviderSlotId;
  sourceCommandDraftReference: ServerOnlyModelAdapterCommandDraftReference;
  sourceApprovalDraftReference: ServerOnlyModelAdapterApprovalDraftReference;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  operatorObjective: string;
  promptPayloadPosture: ServerOnlyModelAdapterPromptPayloadPosture;
  promptTransmissionState: ServerOnlyModelAdapterPromptTransmissionState;
  credentialReferencePosture: ServerOnlyModelAdapterCredentialReferencePosture;
  approvalReferencePosture: ServerOnlyModelAdapterApprovalReferencePosture;
  auditReferencePosture: ServerOnlyModelAdapterAuditReferencePosture;
  idempotencyKeyPosture: ServerOnlyModelAdapterIdempotencyKeyPosture;
  privacyRedactionSummary: string;
  costRateSummary: string;
  timeoutCancelSummary: string;
  blockedDefaultReason: string;
  noExecutionStatement: string;
}>;

export type ServerOnlyModelAdapterResponseEnvelopePreviewRecord = Readonly<{
  responseEnvelopeKey: ServerOnlyModelAdapterResponseEnvelopeKey;
  responseEnvelopeVersion: "jarvis-model-gateway-response-envelope-preview-v1";
  adapterContractId: ServerOnlyModelAdapterContractId;
  requestEnvelopeReference: ServerOnlyModelAdapterRequestEnvelopeKey;
  resultState: ServerOnlyModelAdapterResponseResultState;
  providerResponseState: ServerOnlyModelAdapterProviderResponseState;
  tokenCostAccountingState: ServerOnlyModelAdapterTokenCostAccountingState;
  safetyReviewState: ServerOnlyModelAdapterFutureBackendState;
  redactionState: ServerOnlyModelAdapterFutureBackendState;
  auditJoinState: ServerOnlyModelAdapterJoinState;
  approvalJoinState: ServerOnlyModelAdapterJoinState;
  resultCaptureState: ServerOnlyModelAdapterResultCaptureState;
  failureRecoveryState: ServerOnlyModelAdapterFailureRecoveryState;
  blockedDefaultReason: string;
  noResultStatement: string;
}>;

export type ServerOnlyModelAdapterErrorEnvelopePreviewRecord = Readonly<{
  errorEnvelopeKey: ServerOnlyModelAdapterErrorEnvelopeKey;
  errorEnvelopeVersion: "jarvis-model-gateway-error-envelope-preview-v1";
  adapterContractId: ServerOnlyModelAdapterContractId;
  requestEnvelopeReference: ServerOnlyModelAdapterRequestEnvelopeKey;
  providerErrorState: ServerOnlyModelAdapterProviderErrorState;
  localValidationErrorExamples: readonly string[];
  blockedDefaultReason: string;
  timeoutCancelPosture: string;
  retryFallbackPosture: ServerOnlyModelAdapterRetryFallbackPosture;
  recoveryPosture: ServerOnlyModelAdapterRecoveryPosture;
  auditPosture: "not persisted";
  operatorActionRequired: string;
  noProviderErrorReceivedStatement: string;
}>;

export type ServerOnlyModelAdapterGateChecklistRecord = Readonly<{
  id: ServerOnlyModelAdapterGateId;
  label: string;
  summary: string;
}>;

export type ServerOnlyModelAdapterCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: ServerOnlyModelAdapterCapabilityFamilyId;
  capabilityFamilyLabel: string;
  contractCount: number;
  contracts: readonly ServerOnlyModelAdapterContractRecord[];
}>;

export type ServerOnlyModelAdapterWorkspaceTargetGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  contractCount: number;
  contracts: readonly ServerOnlyModelAdapterContractRecord[];
}>;

export type ServerOnlyModelAdapterReadinessSummary = Readonly<{
  currentBatch: typeof SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH;
  highestDetectedPhase: typeof SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_PHASE;
  latestCompletedBatch: typeof SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH;
  previousCompletedBatch:
    "4682-4713 - AI Model Provider Registry and Capability Matrix";
  nextLikelyBatch: typeof MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH;
  contractCount: number;
  requestEnvelopeCount: number;
  responseEnvelopeCount: number;
  errorEnvelopeCount: number;
  workspaceTargetCount: number;
  summaryLines: readonly string[];
}>;

export type ServerOnlyModelExecutionBlockedSummary = Readonly<{
  summary: string;
  blockedLines: readonly string[];
}>;
