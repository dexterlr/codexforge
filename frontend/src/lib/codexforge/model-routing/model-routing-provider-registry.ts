import { CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION } from "../groq-provider/groq-provider-automatic-routing-admission";
import { CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE } from "../groq-provider/groq-provider-live-execution-acceptance";
import { CODEXFORGE_GROQ_PROVIDER_QUALIFICATION } from "../groq-provider/groq-provider-qualification";
import { CODEXFORGE_GROQ_PROVIDER_ID } from "../groq-provider/groq-provider-types";
import {
  CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE,
  CODEXFORGE_OLLAMA_LOCAL_PROVIDER_QUALIFICATION,
} from "../ollama-provider";
import type {
  CodexForgeAutomaticRoutingAdmission,
  CodexForgeFreeOrLocalModelDescriptor,
  CodexForgeFreeOrLocalModelPricing,
  CodexForgeFreeOrLocalProviderRegistration,
  CodexForgeModelDescriptor,
  CodexForgeProviderDescriptor,
} from "./model-routing-types";

const OLLAMA_PROVIDER_ID = "ollama-local";
const KILL_SWITCH_CHECKPOINTS = [
  "before-provider-adapter-resolution-or-credential-work",
  "immediately-before-provider-generation",
] as const;

function freezeProvider(provider: CodexForgeProviderDescriptor): CodexForgeProviderDescriptor {
  return Object.freeze({ ...provider, notes: Object.freeze([...provider.notes]) });
}

function freezePricing(pricing: CodexForgeFreeOrLocalModelPricing): CodexForgeFreeOrLocalModelPricing {
  return Object.freeze({ ...pricing });
}

function freezeAdmission(admission: CodexForgeAutomaticRoutingAdmission): CodexForgeAutomaticRoutingAdmission {
  return Object.freeze({ ...admission, modes: Object.freeze([...admission.modes]) });
}

function freezeModel(model: CodexForgeFreeOrLocalModelDescriptor): CodexForgeFreeOrLocalModelDescriptor {
  return Object.freeze({
    ...model,
    automaticRoutingAdmission: model.automaticRoutingAdmission === null ? null : freezeAdmission(model.automaticRoutingAdmission),
    capabilities: Object.freeze([...model.capabilities]),
    pricing: freezePricing(model.pricing),
    taskProfileScores: Object.freeze({ ...model.taskProfileScores }),
    evidence: Object.freeze([...model.evidence]),
  });
}

function freezeRegistration(registration: CodexForgeFreeOrLocalProviderRegistration): CodexForgeFreeOrLocalProviderRegistration {
  return Object.freeze({
    provider: freezeProvider(registration.provider),
    models: Object.freeze(registration.models.map(freezeModel)),
    credentialPosture: registration.credentialPosture,
    freeTierRevalidationRequirement: registration.freeTierRevalidationRequirement,
    qualificationEvidence: Object.freeze({ ...registration.qualificationEvidence }),
    executionPosture: Object.freeze({
      ...registration.executionPosture,
      requiredOperatorAcknowledgements: Object.freeze([...registration.executionPosture.requiredOperatorAcknowledgements]),
      killSwitchCheckpoints: Object.freeze([...registration.executionPosture.killSwitchCheckpoints]) as CodexForgeFreeOrLocalProviderRegistration["executionPosture"]["killSwitchCheckpoints"],
    }),
  });
}

function cloneRegistration(registration: CodexForgeFreeOrLocalProviderRegistration): CodexForgeFreeOrLocalProviderRegistration {
  return freezeRegistration({
    provider: { ...registration.provider, notes: [...registration.provider.notes] },
    models: registration.models.map((model) => ({
      ...model,
      automaticRoutingAdmission: model.automaticRoutingAdmission === null ? null : { ...model.automaticRoutingAdmission, modes: [...model.automaticRoutingAdmission.modes] },
      capabilities: [...model.capabilities], pricing: { ...model.pricing }, taskProfileScores: { ...model.taskProfileScores }, evidence: [...model.evidence],
    })),
    credentialPosture: registration.credentialPosture,
    freeTierRevalidationRequirement: registration.freeTierRevalidationRequirement,
    qualificationEvidence: { ...registration.qualificationEvidence },
    executionPosture: {
      ...registration.executionPosture,
      requiredOperatorAcknowledgements: [...registration.executionPosture.requiredOperatorAcknowledgements],
      killSwitchCheckpoints: [...registration.executionPosture.killSwitchCheckpoints] as CodexForgeFreeOrLocalProviderRegistration["executionPosture"]["killSwitchCheckpoints"],
    },
  });
}

function buildOllamaRegistration(): CodexForgeFreeOrLocalProviderRegistration {
  const qualification = CODEXFORGE_OLLAMA_LOCAL_PROVIDER_QUALIFICATION;
  const acceptance = CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE;
  return {
    provider: { providerId: OLLAMA_PROVIDER_ID, label: "Local Ollama", locality: "local", dataBoundary: "local-machine", catalogState: "enabled", adapterId: "private-alpha-ollama-adapter", notes: [
      `Local-first live acceptance admitted by ${acceptance.acceptanceId}.`, `Accepted on ${acceptance.acceptedOn} at ${acceptance.acceptanceCheckpointCommit}.`, `Provider qualification ${qualification.qualificationVersion} remains live-verified.`
    ] },
    models: [{ modelKey: qualification.model.modelKey, providerId: OLLAMA_PROVIDER_ID, modelId: qualification.model.modelId, label: qualification.model.modelId, routingState: "automatic", automaticRoutingAdmission: { admissionId: qualification.automaticAdmissionId, modes: [...qualification.automaticModes] }, qualificationState: "live-verified", capabilities: [qualification.model.capability], approvedMaximumOutputTokens: qualification.model.catalogApprovedMaximumOutputTokens, contextWindowTokens: null, pricing: { costClass: "local-no-provider-token-charge", currency: "USD", inputUsdPerMillionTokens: 0, outputUsdPerMillionTokens: 0, pricingAsOf: null, sourceLabel: "Local runtime; no provider token charge" }, taskProfileScores: {}, evidence: ["codexforge-private-alpha-gpt-oss-visible-response-clean", "codexforge-private-alpha-provider-adapter-foundation-clean", "live Jarvis visible-output acceptance", `Local-first live acceptance ${acceptance.acceptanceId} accepted on ${acceptance.acceptedOn}.`, `Accepted live execution used ${acceptance.liveExecution.requestMaximumOutputTokens} output tokens; catalog maximum remains ${qualification.model.catalogApprovedMaximumOutputTokens}.`, `Local provider qualification links ${qualification.liveAcceptance.acceptanceId}.`] }],
    credentialPosture: "none", freeTierRevalidationRequirement: "not-applicable",
    qualificationEvidence: { qualificationVersion: qualification.qualificationVersion, liveAcceptanceVersion: acceptance.acceptanceVersion, liveAcceptanceId: acceptance.acceptanceId, acceptanceCheckpointCommit: acceptance.acceptanceCheckpointCommit },
    executionPosture: { manualApprovalRequired: true, separateExplicitExecutionActionRequired: true, requiredOperatorAcknowledgements: ["explicit-manual-approval"], killSwitchCheckpoints: KILL_SWITCH_CHECKPOINTS, maximumProviderAttempts: 1, paidExecutionEnabled: false, retryAllowed: false, fallbackAllowed: false, modelSubstitutionAllowed: false },
  };
}

function buildGroqRegistration(): CodexForgeFreeOrLocalProviderRegistration {
  const qualification = CODEXFORGE_GROQ_PROVIDER_QUALIFICATION;
  const acceptance = CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE;
  return {
    provider: { providerId: CODEXFORGE_GROQ_PROVIDER_ID, label: "Groq Cloud", locality: "cloud", dataBoundary: "cloud-provider", catalogState: "enabled", adapterId: "groq-provider-client", notes: ["Transport qualification remains live-verified from 2026-07-26.", "Exact manual Private Alpha execution is connected for the admitted Groq model keys.", `Exact 20B and 120B manual execution paths were live-accepted on ${acceptance.acceptedOn}.`, `Acceptance evidence links to ${acceptance.acceptanceId}.`, `Automatic free-first routing is admitted only for ${CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION.automaticModelKey}.`, `Automatic routing remains disabled for ${CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION.manualOnlyModelKey}.`, "Capability remains text-generation only across the cloud-provider boundary.", "Operator-confirmed Groq Free tier may change and requires request-scoped reconfirmation.", "Paid execution, retry, fallback, and substitution remain disabled by the admitted execution posture.", "The admitted manual Private Alpha execution envelope must not exceed 512 output tokens."] },
    models: acceptance.acceptedModels.map((acceptedModel) => {
      const automatic = acceptedModel.modelKey === CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION.automaticModelKey;
      return { modelKey: acceptedModel.modelKey, providerId: CODEXFORGE_GROQ_PROVIDER_ID, modelId: acceptedModel.modelId, label: acceptedModel.modelId, routingState: automatic ? "automatic" : "manual-only", automaticRoutingAdmission: automatic ? { admissionId: CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION.admissionVersion, modes: [CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION.routingMode] } : null, qualificationState: "live-verified", capabilities: ["text-generation"], approvedMaximumOutputTokens: acceptedModel.acceptedMaximumOutputTokens, contextWindowTokens: 131072, pricing: { costClass: "free-tier", currency: "USD", inputUsdPerMillionTokens: 0, outputUsdPerMillionTokens: 0, pricingAsOf: "2026-07-26", sourceLabel: "Operator-confirmed Groq Free tier on 2026-07-26; account tier may change and requires revalidation" }, taskProfileScores: {}, evidence: ["codexforge-groq-qualification-v3", acceptance.acceptanceId, `exact manual Private Alpha execution admitted on ${acceptance.acceptedOn}`, automatic ? `automatic free-first admission linked by ${CODEXFORGE_GROQ_AUTOMATIC_ROUTING_ADMISSION.admissionVersion}` : "manual-only production routing for this exact Groq model", "text-generation only across the cloud-provider boundary", "request-scoped operator reconfirmation is required before each automatic Groq Free-tier selection", "paid execution, retry, fallback, and model substitution remain disabled", `admitted manual execution envelope is capped at ${acceptedModel.acceptedMaximumOutputTokens} output tokens`] };
    }),
    credentialPosture: "server-environment-only", freeTierRevalidationRequirement: "request-scoped-operator-confirmation",
    qualificationEvidence: { qualificationVersion: qualification.qualificationVersion, liveAcceptanceVersion: acceptance.acceptanceVersion, liveAcceptanceId: acceptance.acceptanceId, acceptanceCheckpointCommit: acceptance.acceptanceCheckpointCommit },
    executionPosture: { manualApprovalRequired: true, separateExplicitExecutionActionRequired: true, requiredOperatorAcknowledgements: [...acceptance.requiredOperatorAcknowledgements], killSwitchCheckpoints: KILL_SWITCH_CHECKPOINTS, maximumProviderAttempts: 1, paidExecutionEnabled: false, retryAllowed: false, fallbackAllowed: false, modelSubstitutionAllowed: false },
  };
}

function hasExactOrder(values: readonly string[], expected: readonly string[]): boolean { return values.length === expected.length && values.every((value, index) => value === expected[index]); }

export function validateCodexForgeFreeOrLocalProviderRegistry(registrations: readonly CodexForgeFreeOrLocalProviderRegistration[]): readonly string[] {
  const errors: string[] = [];
  const expectedProviders = [OLLAMA_PROVIDER_ID, CODEXFORGE_GROQ_PROVIDER_ID];
  const expectedModels = ["ollama-local::gpt-oss:20b", "groq-cloud::openai/gpt-oss-20b", "groq-cloud::openai/gpt-oss-120b"];
  if (registrations.length === 0) errors.push("Registry must not be empty");
  if (!hasExactOrder(registrations.map((entry) => entry.provider.providerId), expectedProviders)) errors.push("Canonical provider ordering or inventory is invalid");
  const seenProviders = new Set<string>(); const seenModels = new Set<string>(); const flattened: string[] = [];
  for (const entry of registrations) {
    const { provider, executionPosture } = entry;
    if (seenProviders.has(provider.providerId)) errors.push(`Duplicate provider ID: ${provider.providerId}`); else seenProviders.add(provider.providerId);
    if (entry.models.length === 0) errors.push(`Provider registration has no models: ${provider.providerId}`);
    if (provider.catalogState !== "enabled") errors.push(`Provider must be enabled: ${provider.providerId}`);
    if (provider.providerId === OLLAMA_PROVIDER_ID && provider.locality !== "local") errors.push("Ollama provider locality is invalid");
    if (provider.providerId === CODEXFORGE_GROQ_PROVIDER_ID && provider.locality !== "cloud") errors.push("Groq provider locality is invalid");
    if (provider.locality === "local" && (provider.dataBoundary !== "local-machine" || entry.credentialPosture !== "none" || entry.freeTierRevalidationRequirement !== "not-applicable")) errors.push(`Local provider posture is invalid: ${provider.providerId}`);
    if (provider.locality === "cloud" && (provider.dataBoundary !== "cloud-provider" || entry.credentialPosture !== "server-environment-only" || entry.freeTierRevalidationRequirement !== "request-scoped-operator-confirmation")) errors.push(`Cloud provider posture is invalid: ${provider.providerId}`);
    if (!executionPosture.manualApprovalRequired || !executionPosture.separateExplicitExecutionActionRequired || executionPosture.maximumProviderAttempts !== 1 || executionPosture.paidExecutionEnabled || executionPosture.retryAllowed || executionPosture.fallbackAllowed || executionPosture.modelSubstitutionAllowed) errors.push(`Execution posture is invalid: ${provider.providerId}`);
    if (!hasExactOrder(executionPosture.killSwitchCheckpoints, KILL_SWITCH_CHECKPOINTS)) errors.push(`Kill-switch checkpoints are invalid: ${provider.providerId}`);
    const acknowledgements = provider.locality === "local" ? ["explicit-manual-approval"] : ["explicit-manual-approval", "cloud-transfer-acknowledgement", "cloud-execution-acknowledgement"];
    if (!hasExactOrder(executionPosture.requiredOperatorAcknowledgements, acknowledgements)) errors.push(`Operator acknowledgements are invalid: ${provider.providerId}`);
    for (const model of entry.models) {
      flattened.push(model.modelKey);
      if (seenModels.has(model.modelKey)) errors.push(`Duplicate model key: ${model.modelKey}`); else seenModels.add(model.modelKey);
      if (model.providerId !== provider.providerId) errors.push(`Model references a different provider: ${model.modelKey}`);
      if (model.modelKey !== `${model.providerId}::${model.modelId}`) errors.push(`Model key mismatch: ${model.modelKey}`);
      if (provider.locality === "local" && model.pricing.costClass !== "local-no-provider-token-charge") errors.push(`Local model pricing is invalid: ${model.modelKey}`);
      if (provider.locality === "cloud" && model.pricing.costClass !== "free-tier") errors.push(`Cloud model pricing is invalid: ${model.modelKey}`);
      if (model.pricing.inputUsdPerMillionTokens !== 0 || model.pricing.outputUsdPerMillionTokens !== 0) errors.push(`Registry pricing must be zero-rate: ${model.modelKey}`);
      if (model.qualificationState !== "live-verified") errors.push(`Model qualification is invalid: ${model.modelKey}`);
      if (model.modelKey === "ollama-local::gpt-oss:20b" && (model.approvedMaximumOutputTokens !== 4096 || model.routingState !== "automatic" || model.automaticRoutingAdmission?.admissionId !== "codexforge-ollama-local-automatic-routing-v1" || !hasExactOrder(model.automaticRoutingAdmission.modes, ["local-only", "free-only", "free-first", "best-within-budget"]))) errors.push("Ollama admission is invalid");
      if (model.modelKey === "groq-cloud::openai/gpt-oss-20b" && (model.approvedMaximumOutputTokens !== 512 || model.routingState !== "automatic" || model.automaticRoutingAdmission?.admissionId !== "codexforge-groq-automatic-routing-admission-v1" || !hasExactOrder(model.automaticRoutingAdmission.modes, ["free-first"]))) errors.push("Groq 20B admission is invalid");
      if (model.modelKey === "groq-cloud::openai/gpt-oss-120b" && (model.approvedMaximumOutputTokens !== 512 || model.routingState !== "manual-only" || model.automaticRoutingAdmission !== null)) errors.push("Groq 120B admission is invalid");
    }
    if (!entry.qualificationEvidence.qualificationVersion || !entry.qualificationEvidence.liveAcceptanceVersion || !entry.qualificationEvidence.liveAcceptanceId || !entry.qualificationEvidence.acceptanceCheckpointCommit) errors.push(`Qualification evidence is invalid: ${provider.providerId}`);
    if (provider.providerId === OLLAMA_PROVIDER_ID && (
      entry.qualificationEvidence.qualificationVersion !== CODEXFORGE_OLLAMA_LOCAL_PROVIDER_QUALIFICATION.qualificationVersion ||
      entry.qualificationEvidence.liveAcceptanceVersion !== CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE.acceptanceVersion ||
      entry.qualificationEvidence.liveAcceptanceId !== CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE.acceptanceId ||
      entry.qualificationEvidence.acceptanceCheckpointCommit !== CODEXFORGE_OLLAMA_LOCAL_FIRST_LIVE_ACCEPTANCE.acceptanceCheckpointCommit
    )) errors.push("Ollama qualification evidence is invalid");
    if (provider.providerId === CODEXFORGE_GROQ_PROVIDER_ID && (
      entry.qualificationEvidence.qualificationVersion !== CODEXFORGE_GROQ_PROVIDER_QUALIFICATION.qualificationVersion ||
      entry.qualificationEvidence.liveAcceptanceVersion !== CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptanceVersion ||
      entry.qualificationEvidence.liveAcceptanceId !== CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptanceId ||
      entry.qualificationEvidence.acceptanceCheckpointCommit !== CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE.acceptanceCheckpointCommit
    )) errors.push("Groq qualification evidence is invalid");
  }
  if (!hasExactOrder(flattened, expectedModels)) errors.push("Canonical flattened model ordering or inventory is invalid");
  return Object.freeze([...errors]);
}

const registryDraft = [buildOllamaRegistration(), buildGroqRegistration()];
const registryErrors = validateCodexForgeFreeOrLocalProviderRegistry(registryDraft);
if (registryErrors.length > 0) throw new Error(`Invalid CodexForge production free/local provider registry: ${registryErrors.join("; ")}`);
export const CODEXFORGE_PRODUCTION_FREE_OR_LOCAL_PROVIDER_REGISTRY = Object.freeze(registryDraft.map(freezeRegistration));
export function getCodexForgeProductionFreeOrLocalProviderRegistry(): readonly CodexForgeFreeOrLocalProviderRegistration[] { return Object.freeze(CODEXFORGE_PRODUCTION_FREE_OR_LOCAL_PROVIDER_REGISTRY.map(cloneRegistration)); }
