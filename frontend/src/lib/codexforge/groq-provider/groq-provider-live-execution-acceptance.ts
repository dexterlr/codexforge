import {
  CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS,
  CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_CHECKPOINT,
  CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_ID,
  CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_VERSION,
  CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTED_ON,
  CODEXFORGE_GROQ_PROVIDER_ID,
  type CodexForgeGroq120bLiveExecutionAcceptedModelRecord,
  type CodexForgeGroq20bLiveExecutionAcceptedModelRecord,
  type CodexForgeGroqLiveExecutionAcceptanceRecord,
  type CodexForgeGroqLiveExecutionAcceptedModelRecord,
  type CodexForgeGroqLiveExecutionAcceptedModels,
} from "./groq-provider-types";

function freezeAcceptedModelRecord<T extends CodexForgeGroqLiveExecutionAcceptedModelRecord>(
  record: T
): T {
  return Object.freeze({
    ...record,
  });
}

function freezeAcceptedModels(
  records: CodexForgeGroqLiveExecutionAcceptedModels
): CodexForgeGroqLiveExecutionAcceptedModels {
  return Object.freeze([
    freezeAcceptedModelRecord(records[0]),
    freezeAcceptedModelRecord(records[1]),
  ] as const);
}

function freezeAcceptanceRecord(
  record: CodexForgeGroqLiveExecutionAcceptanceRecord
): CodexForgeGroqLiveExecutionAcceptanceRecord {
  return Object.freeze({
    ...record,
    requiredOperatorAcknowledgements: Object.freeze([
      ...record.requiredOperatorAcknowledgements,
    ]),
    acceptedModels: freezeAcceptedModels(record.acceptedModels),
  });
}

function cloneAcceptedModelRecord<T extends CodexForgeGroqLiveExecutionAcceptedModelRecord>(
  record: T
): T {
  return freezeAcceptedModelRecord({
    ...record,
  });
}

function cloneAcceptedModels(
  records: CodexForgeGroqLiveExecutionAcceptedModels
): CodexForgeGroqLiveExecutionAcceptedModels {
  return Object.freeze([
    cloneAcceptedModelRecord(records[0]),
    cloneAcceptedModelRecord(records[1]),
  ] as const);
}

function cloneAcceptanceRecord(
  record: CodexForgeGroqLiveExecutionAcceptanceRecord
): CodexForgeGroqLiveExecutionAcceptanceRecord {
  return freezeAcceptanceRecord({
    ...record,
    requiredOperatorAcknowledgements: [...record.requiredOperatorAcknowledgements],
    acceptedModels: cloneAcceptedModels(record.acceptedModels),
  });
}

const CODEXFORGE_GROQ_20B_LIVE_EXECUTION_ACCEPTANCE_RECORD: CodexForgeGroq20bLiveExecutionAcceptedModelRecord =
  {
    modelId: "openai/gpt-oss-20b",
    modelKey: "groq-cloud::openai/gpt-oss-20b",
    executionState: "succeeded",
    acceptedMaximumOutputTokens: CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS,
    promptTokens: 107,
    outputTokens: 34,
    durationMilliseconds: 43.6,
    outputSha256:
      "7260eac34af33fdbf6c21ad8633820e0ef6152036b2217d8026170b7b8b01553",
  };

const CODEXFORGE_GROQ_120B_LIVE_EXECUTION_ACCEPTANCE_RECORD: CodexForgeGroq120bLiveExecutionAcceptedModelRecord =
  {
    modelId: "openai/gpt-oss-120b",
    modelKey: "groq-cloud::openai/gpt-oss-120b",
    executionState: "succeeded",
    acceptedMaximumOutputTokens: CODEXFORGE_GROQ_ACCEPTED_MAXIMUM_OUTPUT_TOKENS,
    promptTokens: 107,
    outputTokens: 46,
    durationMilliseconds: 99.67,
    outputSha256:
      "015dc137038a67c0055c2702def41ec2b3673d46fe714d80c9f57075f015ac76",
  };

export const CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE =
  freezeAcceptanceRecord({
    acceptanceVersion: CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_VERSION,
    acceptanceId: CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_ID,
    acceptedOn: CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTED_ON,
    acceptanceCheckpointCommit:
      CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_CHECKPOINT,
    providerId: CODEXFORGE_GROQ_PROVIDER_ID,
    serverMode: "next-start-production",
    verificationMode: "read-only-persisted-record-verification",
    executionAdmissionState: "admitted",
    admittedExecutionEnvelope: "text-only",
    requiredOperatorAcknowledgements: [
      "explicit-manual-approval",
      "cloud-transfer-acknowledgement",
      "cloud-execution-acknowledgement",
    ],
    acceptedModels: [
      CODEXFORGE_GROQ_20B_LIVE_EXECUTION_ACCEPTANCE_RECORD,
      CODEXFORGE_GROQ_120B_LIVE_EXECUTION_ACCEPTANCE_RECORD,
    ],
    manualProviderSelectionUsed: true,
    exactModelSelectionUsed: true,
    genericManualApprovalRecorded: true,
    cloudTransferAcknowledgementRecorded: true,
    cloudExecutionAcknowledgementRecorded: true,
    exactApprovedPromptsUsed: true,
    exactProviderModelBindingsPersisted: true,
    exactVisibleOutputsAndHashesPersisted: true,
    successfulAuditSequenceState: "complete-and-ordered",
    persistedErrorState: "none",
    credentialStored: false,
    automaticRoutingUsed: false,
    retryUsed: false,
    fallbackUsed: false,
    modelSubstitutionUsed: false,
    providerRequestPerformedDuringVerification: false,
  });

export function getCodexForgeGroqLiveExecutionAcceptance(): CodexForgeGroqLiveExecutionAcceptanceRecord {
  return cloneAcceptanceRecord(CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE);
}
