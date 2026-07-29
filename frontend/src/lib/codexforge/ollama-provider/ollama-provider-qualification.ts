import {
  CODEXFORGE_OLLAMA_LOCAL_CATALOG_APPROVED_MAXIMUM_OUTPUT_TOKENS,
  CODEXFORGE_OLLAMA_LOCAL_MODEL_ID,
  CODEXFORGE_OLLAMA_LOCAL_MODEL_KEY,
  CODEXFORGE_OLLAMA_LOCAL_PROVIDER_ID,
  CODEXFORGE_OLLAMA_LOCAL_QUALIFICATION_VERSION,
  type CodexForgeOllamaLocalQualificationRecord,
} from "./ollama-provider-types";
import { CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE } from "./ollama-provider-local-first-live-acceptance";

function freezeQualification(
  record: CodexForgeOllamaLocalQualificationRecord
): CodexForgeOllamaLocalQualificationRecord {
  return Object.freeze({
    ...record,
    automaticModes: Object.freeze([...record.automaticModes]) as CodexForgeOllamaLocalQualificationRecord["automaticModes"],
    liveAcceptance: Object.freeze({ ...record.liveAcceptance }),
    model: Object.freeze({ ...record.model }),
  });
}

function cloneQualification(
  record: CodexForgeOllamaLocalQualificationRecord
): CodexForgeOllamaLocalQualificationRecord {
  return freezeQualification({
    ...record,
    automaticModes: [...record.automaticModes] as CodexForgeOllamaLocalQualificationRecord["automaticModes"],
    liveAcceptance: { ...record.liveAcceptance },
    model: { ...record.model },
  });
}

export const CODEXFORGE_OLLAMA_LOCAL_PROVIDER_QUALIFICATION = freezeQualification({
  qualificationVersion: CODEXFORGE_OLLAMA_LOCAL_QUALIFICATION_VERSION,
  providerId: CODEXFORGE_OLLAMA_LOCAL_PROVIDER_ID,
  transportQualification: "live-verified",
  manualPrivateAlphaExecutionAdmission: "admitted",
  routingState: "automatic",
  automaticAdmissionId: "codexforge-ollama-local-automatic-routing-v1",
  automaticModes: ["local-only", "free-only", "free-first", "best-within-budget"],
  liveAcceptance: {
    acceptanceVersion: CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE.acceptanceVersion,
    acceptanceId: CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE.acceptanceId,
    acceptedOn: CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE.acceptedOn,
    acceptanceCheckpointCommit: CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE.acceptanceCheckpointCommit,
  },
  model: {
    modelId: CODEXFORGE_OLLAMA_LOCAL_MODEL_ID,
    modelKey: CODEXFORGE_OLLAMA_LOCAL_MODEL_KEY,
    capability: "text-generation",
    dataBoundary: "local-machine",
    costClass: "local-no-provider-token-charge",
    catalogApprovedMaximumOutputTokens: CODEXFORGE_OLLAMA_LOCAL_CATALOG_APPROVED_MAXIMUM_OUTPUT_TOKENS,
    credentialRequired: false,
    paidExecutionEnabled: false,
    retryAllowed: false,
    fallbackAllowed: false,
    modelSubstitutionAllowed: false,
  },
});

export function getCodexForgeOllamaLocalProviderQualification(): CodexForgeOllamaLocalQualificationRecord {
  return cloneQualification(CODEXFORGE_OLLAMA_LOCAL_PROVIDER_QUALIFICATION);
}
