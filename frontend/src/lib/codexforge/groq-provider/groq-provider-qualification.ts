import {
  CODEXFORGE_GROQ_MODEL_IDS,
  CODEXFORGE_GROQ_PROVIDER_ID,
  CODEXFORGE_GROQ_QUALIFICATION_VERSION,
  type CodexForgeGroqQualificationModelRecord,
  type CodexForgeGroqQualificationRecord,
} from "./groq-provider-types";

const CODEXFORGE_GROQ_PROVIDER_LABEL = "Groq Cloud";

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
    qualificationState: "deterministic-tested",
    routingState: "disabled",
    accountTierState: "operator-verification-required",
    dataBoundary: "cloud-provider",
    capabilities: ["text-generation"],
    evidence: [
      "official Groq model identifier",
      "deterministic fake-transport qualification",
      "live verification pending",
    ],
  });
}

export const CODEXFORGE_GROQ_PROVIDER_QUALIFICATION = freezeQualificationRecord({
  qualificationVersion: CODEXFORGE_GROQ_QUALIFICATION_VERSION,
  providerId: CODEXFORGE_GROQ_PROVIDER_ID,
  providerLabel: CODEXFORGE_GROQ_PROVIDER_LABEL,
  adapterState: "deterministic-tested",
  productionRoutingState: "disabled",
  models: CODEXFORGE_GROQ_MODEL_IDS.map(
    buildQualificationModelRecord
  ) as readonly CodexForgeGroqQualificationModelRecord[],
  policyStatements: [
    "Provider execution is not currently enabled.",
    "Account tier is not inferred by this qualification slice.",
    "Free-tier status requires operator verification after live qualification.",
    "Cloud data transfer requires explicit future approval.",
    "No paid execution is allowed by this slice.",
  ],
});

export function getCodexForgeGroqProviderQualification(): CodexForgeGroqQualificationRecord {
  return cloneQualificationRecord(CODEXFORGE_GROQ_PROVIDER_QUALIFICATION);
}
