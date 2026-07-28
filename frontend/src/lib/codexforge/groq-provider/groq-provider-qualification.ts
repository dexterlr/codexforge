import {
  CODEXFORGE_GROQ_PROVIDER_ID,
  CODEXFORGE_GROQ_QUALIFICATION_VERSION,
  type CodexForgeGroqLiveExecutionAcceptanceReference,
  type CodexForgeGroqLiveExecutionAcceptedModelRecord,
  type CodexForgeGroqQualificationModelRecord,
  type CodexForgeGroqQualificationRecord,
} from "./groq-provider-types";
import { CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE } from "./groq-provider-live-execution-acceptance";

const CODEXFORGE_GROQ_PROVIDER_LABEL = "Groq Cloud";
const CODEXFORGE_GROQ_TRANSPORT_LIVE_VERIFIED_ON = "2026-07-26";
const CODEXFORGE_GROQ_OPERATOR_TIER_CONFIRMED_ON = "2026-07-26";
const CODEXFORGE_GROQ_PROVIDER_REPORTED_CONTEXT_WINDOW_TOKENS = 131072;
const CODEXFORGE_GROQ_PROVIDER_REPORTED_MAXIMUM_OUTPUT_TOKENS = 65536;

function freezeQualificationModelRecord(
  record: CodexForgeGroqQualificationModelRecord
): CodexForgeGroqQualificationModelRecord {
  return Object.freeze({
    ...record,
    capabilities: Object.freeze([...record.capabilities]),
    evidence: Object.freeze([...record.evidence]),
  });
}

function freezeLiveExecutionAcceptanceReference(
  reference: CodexForgeGroqLiveExecutionAcceptanceReference
): CodexForgeGroqLiveExecutionAcceptanceReference {
  return Object.freeze({
    ...reference,
  });
}

function freezeQualificationRecord(
  record: CodexForgeGroqQualificationRecord
): CodexForgeGroqQualificationRecord {
  return Object.freeze({
    ...record,
    liveExecutionAcceptance: freezeLiveExecutionAcceptanceReference(
      record.liveExecutionAcceptance
    ),
    requiredOperatorAcknowledgements: Object.freeze([
      ...record.requiredOperatorAcknowledgements,
    ]),
    models: Object.freeze(
      record.models.map(freezeQualificationModelRecord)
    ) as readonly CodexForgeGroqQualificationModelRecord[],
    policyStatements: Object.freeze([...record.policyStatements]),
  });
}

function cloneQualificationModelRecord(
  record: CodexForgeGroqQualificationModelRecord
): CodexForgeGroqQualificationModelRecord {
  return freezeQualificationModelRecord({
    ...record,
    capabilities: [...record.capabilities],
    evidence: [...record.evidence],
  });
}

function cloneLiveExecutionAcceptanceReference(
  reference: CodexForgeGroqLiveExecutionAcceptanceReference
): CodexForgeGroqLiveExecutionAcceptanceReference {
  return freezeLiveExecutionAcceptanceReference({
    ...reference,
  });
}

function cloneQualificationRecord(
  record: CodexForgeGroqQualificationRecord
): CodexForgeGroqQualificationRecord {
  return freezeQualificationRecord({
    ...record,
    liveExecutionAcceptance: cloneLiveExecutionAcceptanceReference(
      record.liveExecutionAcceptance
    ),
    requiredOperatorAcknowledgements: [...record.requiredOperatorAcknowledgements],
    models: record.models.map(cloneQualificationModelRecord),
    policyStatements: [...record.policyStatements],
  });
}

function buildQualificationModelRecord(
  acceptedModel: CodexForgeGroqLiveExecutionAcceptedModelRecord
): CodexForgeGroqQualificationModelRecord {
  return freezeQualificationModelRecord({
    modelId: acceptedModel.modelId,
    modelKey: acceptedModel.modelKey,
    transportQualificationState: "live-verified",
    manualPrivateAlphaExecutionAdmissionState: "admitted",
    routingState: "manual-only",
    automaticRoutingState: "disabled",
    accountTierState: "operator-confirmed-free",
    dataBoundary: "cloud-provider",
    capabilities: ["text-generation"],
    transportLiveVerifiedOn: CODEXFORGE_GROQ_TRANSPORT_LIVE_VERIFIED_ON,
    operatorTierConfirmedOn: CODEXFORGE_GROQ_OPERATOR_TIER_CONFIRMED_ON,
    manualPrivateAlphaExecutionAcceptedOn:
      CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptedOn,
    providerReportedContextWindowTokens:
      CODEXFORGE_GROQ_PROVIDER_REPORTED_CONTEXT_WINDOW_TOKENS,
    providerReportedMaximumOutputTokens:
      CODEXFORGE_GROQ_PROVIDER_REPORTED_MAXIMUM_OUTPUT_TOKENS,
    admittedMaximumOutputTokens: acceptedModel.acceptedMaximumOutputTokens,
    admittedExecutionEnvelope:
      CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.admittedExecutionEnvelope,
    liveExecutionAcceptanceId:
      CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptanceId,
    evidence: [
      "official Groq model identifier",
      "authenticated model discovery completed on 2026-07-26",
      "exact visible-output transport qualification completed on 2026-07-26",
      `manual Private Alpha execution admitted on ${CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptedOn}`,
      `typed acceptance record linked by ${CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptanceId}`,
      "operator confirmed Groq Free tier on 2026-07-26",
      "text-only manual Private Alpha execution envelope is capped at 512 output tokens",
    ],
  });
}

export const CODEXFORGE_GROQ_PROVIDER_QUALIFICATION = freezeQualificationRecord({
  qualificationVersion: CODEXFORGE_GROQ_QUALIFICATION_VERSION,
  providerId: CODEXFORGE_GROQ_PROVIDER_ID,
  providerLabel: CODEXFORGE_GROQ_PROVIDER_LABEL,
  providerTransportQualificationState: "live-verified",
  manualPrivateAlphaExecutionAdmissionState: "admitted",
  productionRoutingState: "manual-only",
  automaticRoutingState: "disabled",
  liveExecutionAcceptance: {
    acceptanceVersion:
      CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptanceVersion,
    acceptanceId: CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptanceId,
    acceptedOn: CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptedOn,
    acceptanceCheckpointCommit:
      CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptanceCheckpointCommit,
  },
  requiredOperatorAcknowledgements: [
    ...CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.requiredOperatorAcknowledgements,
  ],
  paidExecutionEnabled: false,
  accountTierRevalidationRequired: true,
  models: CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptedModels.map(
    buildQualificationModelRecord
  ) as readonly CodexForgeGroqQualificationModelRecord[],
  policyStatements: [
    "Provider transport qualification remains live-verified from 2026-07-26.",
    "Exact manual Private Alpha execution is admitted only for groq-cloud::openai/gpt-oss-20b and groq-cloud::openai/gpt-oss-120b.",
    "Admitted manual Private Alpha execution is text only and capped at 512 output tokens.",
    "Production routing remains manual-only and automatic Groq routing stays disabled.",
    "Explicit manual approval plus separate cloud-transfer and cloud-execution acknowledgements remain mandatory.",
    "Paid execution is not enabled.",
    "Account-tier status may change and requires revalidation.",
    `Live execution acceptance occurred on ${CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptedOn} under ${CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptanceId}.`,
  ],
});

export function getCodexForgeGroqProviderQualification(): CodexForgeGroqQualificationRecord {
  return cloneQualificationRecord(CODEXFORGE_GROQ_PROVIDER_QUALIFICATION);
}
