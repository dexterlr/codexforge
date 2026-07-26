import {
  CODEXFORGE_GROQ_MODEL_IDS,
  CODEXFORGE_GROQ_PROVIDER_ID,
  CODEXFORGE_GROQ_QUALIFICATION_VERSION,
  type CodexForgeGroqQualificationModelRecord,
  type CodexForgeGroqQualificationRecord,
} from "./groq-provider-types";

const CODEXFORGE_GROQ_PROVIDER_LABEL = "Groq Cloud";
const CODEXFORGE_GROQ_LIVE_VERIFIED_ON = "2026-07-26";
const CODEXFORGE_GROQ_OPERATOR_TIER_CONFIRMED_ON = "2026-07-26";
const CODEXFORGE_GROQ_PROVIDER_REPORTED_CONTEXT_WINDOW_TOKENS = 131072;
const CODEXFORGE_GROQ_PROVIDER_REPORTED_MAXIMUM_OUTPUT_TOKENS = 65536;
const CODEXFORGE_GROQ_APPROVED_MAXIMUM_OUTPUT_TOKENS = 4096;

function freezeQualificationModelRecord(
  record: CodexForgeGroqQualificationModelRecord
): CodexForgeGroqQualificationModelRecord {
  return Object.freeze({
    ...record,
    capabilities: Object.freeze([...record.capabilities]),
    evidence: Object.freeze([...record.evidence]),
  });
}

function freezeQualificationRecord(
  record: CodexForgeGroqQualificationRecord
): CodexForgeGroqQualificationRecord {
  return Object.freeze({
    ...record,
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

function cloneQualificationRecord(
  record: CodexForgeGroqQualificationRecord
): CodexForgeGroqQualificationRecord {
  return freezeQualificationRecord({
    ...record,
    models: record.models.map(cloneQualificationModelRecord),
    policyStatements: [...record.policyStatements],
  });
}

function buildQualificationModelRecord(
  modelId: (typeof CODEXFORGE_GROQ_MODEL_IDS)[number]
): CodexForgeGroqQualificationModelRecord {
  return freezeQualificationModelRecord({
    modelId,
    qualificationState: "live-verified",
    routingState: "manual-only",
    accountTierState: "operator-confirmed-free",
    dataBoundary: "cloud-provider",
    capabilities: ["text-generation"],
    liveVerifiedOn: CODEXFORGE_GROQ_LIVE_VERIFIED_ON,
    operatorTierConfirmedOn: CODEXFORGE_GROQ_OPERATOR_TIER_CONFIRMED_ON,
    providerReportedContextWindowTokens:
      CODEXFORGE_GROQ_PROVIDER_REPORTED_CONTEXT_WINDOW_TOKENS,
    providerReportedMaximumOutputTokens:
      CODEXFORGE_GROQ_PROVIDER_REPORTED_MAXIMUM_OUTPUT_TOKENS,
    approvedMaximumOutputTokens: CODEXFORGE_GROQ_APPROVED_MAXIMUM_OUTPUT_TOKENS,
    evidence: [
      "official Groq model identifier",
      "deterministic fake-transport qualification",
      "authenticated model discovery completed on 2026-07-26",
      "exact visible-output qualification completed on 2026-07-26",
      "reasoning was not exposed in live qualification",
      "operator confirmed Groq Free tier on 2026-07-26",
    ],
  });
}

export const CODEXFORGE_GROQ_PROVIDER_QUALIFICATION = freezeQualificationRecord({
  qualificationVersion: CODEXFORGE_GROQ_QUALIFICATION_VERSION,
  providerId: CODEXFORGE_GROQ_PROVIDER_ID,
  providerLabel: CODEXFORGE_GROQ_PROVIDER_LABEL,
  adapterState: "live-verified",
  productionRoutingState: "manual-only",
  models: CODEXFORGE_GROQ_MODEL_IDS.map(
    buildQualificationModelRecord
  ) as readonly CodexForgeGroqQualificationModelRecord[],
  policyStatements: [
    "Provider metadata is admitted for manual routing only.",
    "Automatic Groq routing remains disabled.",
    "Current private-alpha execution remains local-only.",
    "The Groq Free tier was operator-confirmed on 2026-07-26.",
    "Account-tier status must be revalidated if the organisation changes.",
    "Cloud data transfer requires explicit future approval.",
    "Paid execution is not enabled.",
    "Catalog admission is not execution integration.",
  ],
});

export function getCodexForgeGroqProviderQualification(): CodexForgeGroqQualificationRecord {
  return cloneQualificationRecord(CODEXFORGE_GROQ_PROVIDER_QUALIFICATION);
}
