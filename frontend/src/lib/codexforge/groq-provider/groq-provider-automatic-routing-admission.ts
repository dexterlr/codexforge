import {
  CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION_VERSION,
  CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_ID,
} from "./groq-provider-types";

export type CodexForgeGroqAutomaticRoutingAdmissionRecord = Readonly<{
  admissionVersion: typeof CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION_VERSION;
  admissionState: "admitted";
  routingMode: "free-first";
  providerId: "groq-cloud";
  automaticModelKey: "groq-cloud::openai/gpt-oss-20b";
  manualOnlyModelKey: "groq-cloud::openai/gpt-oss-120b";
  sourceAcceptanceId: typeof CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_ID;
  envelope: "text-only";
  maximumOutputTokens: 512;
  requiredCostClass: "free-tier";
  paidExecutionAllowed: false;
  retryAllowed: false;
  fallbackAllowed: false;
  modelSubstitutionAllowed: false;
  requiredAcknowledgements: readonly [
    "explicit-manual-approval",
    "cloud-transfer-acknowledgement",
    "cloud-execution-acknowledgement",
  ];
}>;

function freezeAutomaticRoutingAdmissionRecord(
  record: CodexForgeGroqAutomaticRoutingAdmissionRecord
): CodexForgeGroqAutomaticRoutingAdmissionRecord {
  return Object.freeze({
    ...record,
    requiredAcknowledgements: Object.freeze([...record.requiredAcknowledgements]) as readonly [
      "explicit-manual-approval",
      "cloud-transfer-acknowledgement",
      "cloud-execution-acknowledgement",
    ],
  });
}

function cloneAutomaticRoutingAdmissionRecord(
  record: CodexForgeGroqAutomaticRoutingAdmissionRecord
): CodexForgeGroqAutomaticRoutingAdmissionRecord {
  return freezeAutomaticRoutingAdmissionRecord({
    ...record,
    requiredAcknowledgements: [...record.requiredAcknowledgements] as readonly [
      "explicit-manual-approval",
      "cloud-transfer-acknowledgement",
      "cloud-execution-acknowledgement",
    ],
  });
}

export const CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION =
  freezeAutomaticRoutingAdmissionRecord({
    admissionVersion: CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION_VERSION,
    admissionState: "admitted",
    routingMode: "free-first",
    providerId: "groq-cloud",
    automaticModelKey: "groq-cloud::openai/gpt-oss-20b",
    manualOnlyModelKey: "groq-cloud::openai/gpt-oss-120b",
    sourceAcceptanceId: CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE_ID,
    envelope: "text-only",
    maximumOutputTokens: 512,
    requiredCostClass: "free-tier",
    paidExecutionAllowed: false,
    retryAllowed: false,
    fallbackAllowed: false,
    modelSubstitutionAllowed: false,
    requiredAcknowledgements: [
      "explicit-manual-approval",
      "cloud-transfer-acknowledgement",
      "cloud-execution-acknowledgement",
    ],
  });

export function getCodexForgeGroqAutomaticRoutingAdmission(): CodexForgeGroqAutomaticRoutingAdmissionRecord {
  return cloneAutomaticRoutingAdmissionRecord(
    CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION
  );
}
