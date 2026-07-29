import {
  CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_CHECKPOINT,
  CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_ID,
  CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_VERSION,
  CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTED_ON,
  CODEXFORGE_OLLAMA_LOCAL_FIRST_SELECTION_REQUEST_MAXIMUM_OUTPUT_TOKENS,
  CODEXFORGE_OLLAMA_LOCAL_LIVE_EXECUTION_REQUEST_MAXIMUM_OUTPUT_TOKENS,
  CODEXFORGE_OLLAMA_LOCAL_MODEL_ID,
  CODEXFORGE_OLLAMA_LOCAL_MODEL_KEY,
  CODEXFORGE_OLLAMA_LOCAL_PROVIDER_ID,
  type CodexForgeOllamaLocalFirstLiveAcceptanceRecord,
  type CodexForgeOllamaLocalFirstSelectionAcceptanceRecord,
  type CodexForgeOllamaLocalLiveExecutionAcceptanceRecord,
} from "./ollama-provider-types";

function freezeSelection(
  record: CodexForgeOllamaLocalFirstSelectionAcceptanceRecord
): CodexForgeOllamaLocalFirstSelectionAcceptanceRecord {
  return Object.freeze({ ...record, orderedAuditEvents: Object.freeze([...record.orderedAuditEvents]) as CodexForgeOllamaLocalFirstSelectionAcceptanceRecord["orderedAuditEvents"] });
}

function freezeExecution(
  record: CodexForgeOllamaLocalLiveExecutionAcceptanceRecord
): CodexForgeOllamaLocalLiveExecutionAcceptanceRecord {
  return Object.freeze({ ...record, orderedAuditEvents: Object.freeze([...record.orderedAuditEvents]) as CodexForgeOllamaLocalLiveExecutionAcceptanceRecord["orderedAuditEvents"] });
}

function freezeAcceptance(
  record: CodexForgeOllamaLocalFirstLiveAcceptanceRecord
): CodexForgeOllamaLocalFirstLiveAcceptanceRecord {
  return Object.freeze({
    ...record,
    localFirstSelection: freezeSelection(record.localFirstSelection),
    liveExecution: freezeExecution(record.liveExecution),
  });
}

function cloneAcceptance(
  record: CodexForgeOllamaLocalFirstLiveAcceptanceRecord
): CodexForgeOllamaLocalFirstLiveAcceptanceRecord {
  return freezeAcceptance({
    ...record,
    localFirstSelection: { ...record.localFirstSelection, orderedAuditEvents: [...record.localFirstSelection.orderedAuditEvents] as CodexForgeOllamaLocalFirstSelectionAcceptanceRecord["orderedAuditEvents"] },
    liveExecution: { ...record.liveExecution, orderedAuditEvents: [...record.liveExecution.orderedAuditEvents] as CodexForgeOllamaLocalLiveExecutionAcceptanceRecord["orderedAuditEvents"] },
  });
}

export const CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE = freezeAcceptance({
  acceptanceVersion: CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_VERSION,
  acceptanceId: CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_ID,
  acceptedOn: CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTED_ON,
  acceptanceCheckpointCommit: CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE_CHECKPOINT,
  acceptanceState: "admitted",
  providerId: CODEXFORGE_OLLAMA_LOCAL_PROVIDER_ID,
  modelId: CODEXFORGE_OLLAMA_LOCAL_MODEL_ID,
  modelKey: CODEXFORGE_OLLAMA_LOCAL_MODEL_KEY,
  dataBoundary: "local-machine",
  serverMode: "next-start-production",
  credentialMode: "none",
  paidExecution: false,
  localProviderModelAvailabilityConfirmed: true,
  manualApprovalRemainsRequired: true,
  executionRequiresSeparateExplicitAction: true,
  liveLocalGenerationOccurredOnlyInLane2: true,
  cloudProviderRequestOccurred: false,
  cloudPromptTransferOccurred: false,
  groqCredentialReadOrStored: false,
  rawPromptOrOutputStored: false,
  providerRequestPerformedDuringSourceAdmission: false,
  retryPerformed: false,
  fallbackPerformed: false,
  modelSubstitutionPerformed: false,
  localFirstSelection: {
    laneId: "local-first-selection-create-cancel",
    policyVersion: "codexforge-private-alpha-free-first-routing-v1",
    routingMode: "free-first",
    status: "selected-for-approval",
    selectedModelKey: CODEXFORGE_OLLAMA_LOCAL_MODEL_KEY,
    requestMaximumOutputTokens: CODEXFORGE_OLLAMA_LOCAL_FIRST_SELECTION_REQUEST_MAXIMUM_OUTPUT_TOKENS,
    runtimeSnapshotCount: 1,
    cloudProviderInspected: false,
    promptTransferredToCloud: false,
    providerGenerationPerformed: false,
    createHttpStatus: 201,
    createdState: "awaiting_approval",
    finalState: "canceled",
    finalRevision: 2,
    approvalRecorded: false,
    executionRecorded: false,
    cancellationRecorded: true,
    orderedAuditEvents: ["run.created", "approval.requested", "run.canceled"],
  },
  liveExecution: {
    laneId: "manual-approved-local-execution",
    providerId: CODEXFORGE_OLLAMA_LOCAL_PROVIDER_ID,
    modelId: CODEXFORGE_OLLAMA_LOCAL_MODEL_ID,
    modelKey: CODEXFORGE_OLLAMA_LOCAL_MODEL_KEY,
    requestMaximumOutputTokens: CODEXFORGE_OLLAMA_LOCAL_LIVE_EXECUTION_REQUEST_MAXIMUM_OUTPUT_TOKENS,
    initialCreatedState: "awaiting_approval",
    initialRevision: 1,
    approvedState: "approved",
    approvedRevision: 2,
    finalState: "succeeded",
    finalRevision: 4,
    manualApprovalRecorded: true,
    separateExplicitOperatorExecutionAction: true,
    executionAttemptCount: 1,
    providerGenerationPerformed: true,
    outputLength: 27,
    outputSha256: "a9d18133e6f4aedfbe07c1fb7c0291f3be3d98d730de2908f5494f1c63fe6db7",
    doneReason: "stop",
    persistedErrorState: "none",
    cloudTransferRequired: false,
    cloudExecutionAcknowledgementPresent: false,
    groqCredentialMode: "none",
    paidExecutionPerformed: false,
    retryPerformed: false,
    fallbackPerformed: false,
    modelSubstitutionPerformed: false,
    orderedAuditEvents: ["run.created", "approval.requested", "approval.granted", "execution.started", "execution.succeeded"],
  },
});

export function getCodexForgeOllamaLocalFirstLiveAcceptance(): CodexForgeOllamaLocalFirstLiveAcceptanceRecord {
  return cloneAcceptance(CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE);
}
