export const CODEXFORGE_OLLAMA_LOCAL_PROVIDER_ID = "ollama-local" as const;
export const CODEXFORGE_OLLAMA_LOCAL_MODEL_ID = "gpt-oss:20b" as const;
export const CODEXFORGE_OLLAMA_LOCAL_MODEL_KEY =
  "ollama-local::gpt-oss:20b" as const;
export const CODEXFORGE_OLLAMA_LOCAL_QUALIFICATION_VERSION =
  "codexforge-ollama-local-qualification-v1" as const;
export const CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_VERSION =
  "codexforge-ollama-local-first-live-acceptance-v1" as const;
export const CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_ID =
  "codexforge-ollama-local-private-alpha-local-first-live-acceptance-20260728" as const;
export const CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTED_ON =
  "2026-07-28" as const;
export const CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_CHECKPOINT =
  "041a36d39858ee90f7c7bd320f73c4c0e820d8c8" as const;
export const CODEXFORGE_OLLAMA_LOCAL_FIRST_SELECTION_REQUEST_MAXIMUM_OUTPUT_TOKENS =
  512 as const;
export const CODEXFORGE_OLLAMA_LOCAL_LIVE_EXECUTION_REQUEST_MAXIMUM_OUTPUT_TOKENS =
  64 as const;
export const CODEXFORGE_OLLAMA_LOCAL_CATALOG_APPROVED_MAXIMUM_OUTPUT_TOKENS =
  4096 as const;

export type CodexForgeOllamaLocalFirstSelectionAcceptanceRecord = Readonly<{
  laneId: "local-first-selection-create-cancel";
  policyVersion: "codexforge-private-alpha-free-first-routing-v1";
  routingMode: "free-first";
  status: "selected-for-approval";
  selectedModelKey: typeof CODEXFORGE_OLLAMA_LOCAL_MODEL_KEY;
  requestMaximumOutputTokens: typeof CODEXFORGE_OLLAMA_LOCAL_FIRST_SELECTION_REQUEST_MAXIMUM_OUTPUT_TOKENS;
  runtimeSnapshotCount: 1;
  cloudProviderInspected: false;
  promptTransferredToCloud: false;
  providerGenerationPerformed: false;
  createHttpStatus: 201;
  createdState: "awaiting_approval";
  finalState: "canceled";
  finalRevision: 2;
  approvalRecorded: false;
  executionRecorded: false;
  cancellationRecorded: true;
  orderedAuditEvents: readonly [
    "run.created",
    "approval.requested",
    "run.canceled",
  ];
}>;

export type CodexForgeOllamaLocalLiveExecutionAcceptanceRecord = Readonly<{
  laneId: "manual-approved-local-execution";
  providerId: typeof CODEXFORGE_OLLAMA_LOCAL_PROVIDER_ID;
  modelId: typeof CODEXFORGE_OLLAMA_LOCAL_MODEL_ID;
  modelKey: typeof CODEXFORGE_OLLAMA_LOCAL_MODEL_KEY;
  requestMaximumOutputTokens: typeof CODEXFORGE_OLLAMA_LOCAL_LIVE_EXECUTION_REQUEST_MAXIMUM_OUTPUT_TOKENS;
  initialCreatedState: "awaiting_approval";
  initialRevision: 1;
  approvedState: "approved";
  approvedRevision: 2;
  finalState: "succeeded";
  finalRevision: 4;
  manualApprovalRecorded: true;
  separateExplicitOperatorExecutionAction: true;
  executionAttemptCount: 1;
  providerGenerationPerformed: true;
  outputLength: 27;
  outputSha256: "a9d18133e6f4aedfbe07c1fb7c0291f3be3d98d730de2908f5494f1c63fe6db7";
  doneReason: "stop";
  persistedErrorState: "none";
  cloudTransferRequired: false;
  cloudExecutionAcknowledgementPresent: false;
  groqCredentialMode: "none";
  paidExecutionPerformed: false;
  retryPerformed: false;
  fallbackPerformed: false;
  modelSubstitutionPerformed: false;
  orderedAuditEvents: readonly [
    "run.created",
    "approval.requested",
    "approval.granted",
    "execution.started",
    "execution.succeeded",
  ];
}>;

export type CodexForgeOllamaLocalFirstLiveAcceptanceReference = Readonly<{
  acceptanceVersion: typeof CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_VERSION;
  acceptanceId: typeof CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_ID;
  acceptedOn: typeof CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTED_ON;
  acceptanceCheckpointCommit: typeof CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_CHECKPOINT;
}>;

export type CodexForgeOllamaLocalFirstLiveAcceptanceRecord =
  CodexForgeOllamaLocalFirstLiveAcceptanceReference &
    Readonly<{
      acceptanceState: "admitted";
      providerId: typeof CODEXFORGE_OLLAMA_LOCAL_PROVIDER_ID;
      modelId: typeof CODEXFORGE_OLLAMA_LOCAL_MODEL_ID;
      modelKey: typeof CODEXFORGE_OLLAMA_LOCAL_MODEL_KEY;
      dataBoundary: "local-machine";
      serverMode: "next-start-production";
      credentialMode: "none";
      paidExecution: false;
      localProviderModelAvailabilityConfirmed: true;
      manualApprovalRemainsRequired: true;
      executionRequiresSeparateExplicitAction: true;
      liveLocalGenerationOccurredOnlyInLane2: true;
      cloudProviderRequestOccurred: false;
      cloudPromptTransferOccurred: false;
      groqCredentialReadOrStored: false;
      rawPromptOrOutputStored: false;
      providerRequestPerformedDuringSourceAdmission: false;
      retryPerformed: false;
      fallbackPerformed: false;
      modelSubstitutionPerformed: false;
      localFirstSelection: CodexForgeOllamaLocalFirstSelectionAcceptanceRecord;
      liveExecution: CodexForgeOllamaLocalLiveExecutionAcceptanceRecord;
    }>;

export type CodexForgeOllamaLocalQualificationModelRecord = Readonly<{
  modelId: typeof CODEXFORGE_OLLAMA_LOCAL_MODEL_ID;
  modelKey: typeof CODEXFORGE_OLLAMA_LOCAL_MODEL_KEY;
  capability: "text-generation";
  dataBoundary: "local-machine";
  costClass: "local-no-provider-token-charge";
  catalogApprovedMaximumOutputTokens: typeof CODEXFORGE_OLLAMA_LOCAL_CATALOG_APPROVED_MAXIMUM_OUTPUT_TOKENS;
  credentialRequired: false;
  paidExecutionEnabled: false;
  retryAllowed: false;
  fallbackAllowed: false;
  modelSubstitutionAllowed: false;
}>;

export type CodexForgeOllamaLocalQualificationRecord = Readonly<{
  qualificationVersion: typeof CODEXFORGE_OLLAMA_LOCAL_QUALIFICATION_VERSION;
  providerId: typeof CODEXFORGE_OLLAMA_LOCAL_PROVIDER_ID;
  transportQualification: "live-verified";
  manualPrivateAlphaExecutionAdmission: "admitted";
  routingState: "automatic";
  automaticAdmissionId: "codexforge-ollama-local-automatic-routing-v1";
  automaticModes: readonly [
    "local-only",
    "free-only",
    "free-first",
    "best-within-budget",
  ];
  liveAcceptance: CodexForgeOllamaLocalFirstLiveAcceptanceReference;
  model: CodexForgeOllamaLocalQualificationModelRecord;
}>;
