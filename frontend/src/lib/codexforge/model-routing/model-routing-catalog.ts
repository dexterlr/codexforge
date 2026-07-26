import {
  CODEXFORGE_TASK_PROFILES,
  type CodexForgeModelCatalogSnapshot,
  type CodexForgeModelDescriptor,
  type CodexForgeModelKey,
  type CodexForgeModelPricing,
  type CodexForgeProviderDescriptor,
  type CodexForgeProviderId,
  type CodexForgeModelId,
  type CodexForgeTaskProfileScores,
} from "./model-routing-types";

export const CODEXFORGE_MODEL_ROUTING_CATALOG_VERSION =
  "codexforge-model-routing-v1";

export function buildCodexForgeModelKey(
  providerId: CodexForgeProviderId,
  modelId: CodexForgeModelId
): CodexForgeModelKey {
  return `${providerId}::${modelId}` as CodexForgeModelKey;
}

function cloneCodexForgeProviderDescriptor(
  descriptor: CodexForgeProviderDescriptor
): CodexForgeProviderDescriptor {
  return {
    providerId: descriptor.providerId,
    label: descriptor.label,
    locality: descriptor.locality,
    dataBoundary: descriptor.dataBoundary,
    catalogState: descriptor.catalogState,
    adapterId: descriptor.adapterId,
    notes: [...descriptor.notes],
  };
}

function cloneCodexForgeModelPricing(
  pricing: CodexForgeModelPricing
): CodexForgeModelPricing {
  return {
    costClass: pricing.costClass,
    currency: pricing.currency,
    inputUsdPerMillionTokens: pricing.inputUsdPerMillionTokens,
    outputUsdPerMillionTokens: pricing.outputUsdPerMillionTokens,
    pricingAsOf: pricing.pricingAsOf,
    sourceLabel: pricing.sourceLabel,
  };
}

function cloneCodexForgeTaskProfileScores(
  scores: CodexForgeTaskProfileScores
): CodexForgeTaskProfileScores {
  const clonedScores: Partial<Record<(typeof CODEXFORGE_TASK_PROFILES)[number], number>> = {};

  for (const taskProfile of CODEXFORGE_TASK_PROFILES) {
    const score = scores[taskProfile];
    if (score !== undefined) {
      clonedScores[taskProfile] = score;
    }
  }

  return clonedScores;
}

function cloneCodexForgeModelDescriptor(
  descriptor: CodexForgeModelDescriptor
): CodexForgeModelDescriptor {
  return {
    modelKey: descriptor.modelKey,
    providerId: descriptor.providerId,
    modelId: descriptor.modelId,
    label: descriptor.label,
    routingState: descriptor.routingState,
    qualificationState: descriptor.qualificationState,
    capabilities: [...descriptor.capabilities],
    approvedMaximumOutputTokens: descriptor.approvedMaximumOutputTokens,
    contextWindowTokens: descriptor.contextWindowTokens,
    pricing: cloneCodexForgeModelPricing(descriptor.pricing),
    taskProfileScores: cloneCodexForgeTaskProfileScores(descriptor.taskProfileScores),
    evidence: [...descriptor.evidence],
  };
}

function cloneCodexForgeModelCatalogSnapshot(
  snapshot: CodexForgeModelCatalogSnapshot
): CodexForgeModelCatalogSnapshot {
  return {
    catalogVersion: snapshot.catalogVersion,
    providers: snapshot.providers.map(cloneCodexForgeProviderDescriptor),
    models: snapshot.models.map(cloneCodexForgeModelDescriptor),
  };
}

function freezeCodexForgeProviderDescriptor(
  descriptor: CodexForgeProviderDescriptor
): CodexForgeProviderDescriptor {
  return Object.freeze({
    providerId: descriptor.providerId,
    label: descriptor.label,
    locality: descriptor.locality,
    dataBoundary: descriptor.dataBoundary,
    catalogState: descriptor.catalogState,
    adapterId: descriptor.adapterId,
    notes: Object.freeze([...descriptor.notes]),
  });
}

function freezeCodexForgeModelPricing(
  pricing: CodexForgeModelPricing
): CodexForgeModelPricing {
  return Object.freeze({
    costClass: pricing.costClass,
    currency: pricing.currency,
    inputUsdPerMillionTokens: pricing.inputUsdPerMillionTokens,
    outputUsdPerMillionTokens: pricing.outputUsdPerMillionTokens,
    pricingAsOf: pricing.pricingAsOf,
    sourceLabel: pricing.sourceLabel,
  });
}

function freezeCodexForgeTaskProfileScores(
  scores: CodexForgeTaskProfileScores
): CodexForgeTaskProfileScores {
  const clonedScores: Partial<Record<(typeof CODEXFORGE_TASK_PROFILES)[number], number>> = {};

  for (const taskProfile of CODEXFORGE_TASK_PROFILES) {
    const score = scores[taskProfile];
    if (score !== undefined) {
      clonedScores[taskProfile] = score;
    }
  }

  return Object.freeze(clonedScores);
}

function freezeCodexForgeModelDescriptor(
  descriptor: CodexForgeModelDescriptor
): CodexForgeModelDescriptor {
  return Object.freeze({
    modelKey: descriptor.modelKey,
    providerId: descriptor.providerId,
    modelId: descriptor.modelId,
    label: descriptor.label,
    routingState: descriptor.routingState,
    qualificationState: descriptor.qualificationState,
    capabilities: Object.freeze([...descriptor.capabilities]),
    approvedMaximumOutputTokens: descriptor.approvedMaximumOutputTokens,
    contextWindowTokens: descriptor.contextWindowTokens,
    pricing: freezeCodexForgeModelPricing(descriptor.pricing),
    taskProfileScores: freezeCodexForgeTaskProfileScores(descriptor.taskProfileScores),
    evidence: Object.freeze([...descriptor.evidence]),
  });
}

function freezeCodexForgeModelCatalogSnapshot(
  snapshot: CodexForgeModelCatalogSnapshot
): CodexForgeModelCatalogSnapshot {
  return Object.freeze({
    catalogVersion: snapshot.catalogVersion,
    providers: Object.freeze(
      snapshot.providers.map(freezeCodexForgeProviderDescriptor)
    ),
    models: Object.freeze(snapshot.models.map(freezeCodexForgeModelDescriptor)),
  });
}

function hasNonZeroRate(value: number | null): boolean {
  return value !== null && value !== 0;
}

function isMissingLabel(value: string): boolean {
  return value.trim().length === 0;
}

export function validateCodexForgeModelCatalog(
  snapshot: CodexForgeModelCatalogSnapshot
): readonly string[] {
  const errors: string[] = [];
  const providerIds = new Set<string>();
  const modelKeys = new Set<string>();
  const providerIndex = new Map<string, CodexForgeProviderDescriptor>();

  for (const provider of snapshot.providers) {
    if (providerIds.has(provider.providerId)) {
      errors.push(`Duplicate provider ID: ${provider.providerId}`);
    } else {
      providerIds.add(provider.providerId);
    }

    if (isMissingLabel(provider.label)) {
      errors.push(`Provider label must not be empty: ${provider.providerId}`);
    }

    providerIndex.set(provider.providerId, provider);
  }

  for (const model of snapshot.models) {
    if (modelKeys.has(model.modelKey)) {
      errors.push(`Duplicate model key: ${model.modelKey}`);
    } else {
      modelKeys.add(model.modelKey);
    }

    const provider = providerIndex.get(model.providerId);
    if (!provider) {
      errors.push(
        `Model references unknown provider: ${model.modelKey} -> ${model.providerId}`
      );
    }

    if (buildCodexForgeModelKey(model.providerId, model.modelId) !== model.modelKey) {
      errors.push(`Model key mismatch: ${model.modelKey}`);
    }

    if (isMissingLabel(model.label)) {
      errors.push(`Model label must not be empty: ${model.modelKey}`);
    }

    if (model.capabilities.length === 0) {
      errors.push(`Model capabilities must not be empty: ${model.modelKey}`);
    }

    for (const taskProfile of CODEXFORGE_TASK_PROFILES) {
      const score = model.taskProfileScores[taskProfile];
      if (
        score !== undefined &&
        (!Number.isInteger(score) || score < 0 || score > 100)
      ) {
        errors.push(`Task profile score out of range: ${model.modelKey} -> ${taskProfile}`);
      }
    }

    if (
      !Number.isFinite(model.approvedMaximumOutputTokens) ||
      model.approvedMaximumOutputTokens <= 0
    ) {
      errors.push(`Approved output limit must be positive: ${model.modelKey}`);
    }

    if (
      model.contextWindowTokens !== null &&
      (!Number.isFinite(model.contextWindowTokens) || model.contextWindowTokens <= 0)
    ) {
      errors.push(`Context window must be positive when present: ${model.modelKey}`);
    }

    if (model.pricing.currency !== "USD") {
      errors.push(`Model pricing currency must be USD: ${model.modelKey}`);
    }

    const inputRate = model.pricing.inputUsdPerMillionTokens;
    const outputRate = model.pricing.outputUsdPerMillionTokens;
    if (inputRate !== null && inputRate < 0) {
      errors.push(`Negative input pricing is invalid: ${model.modelKey}`);
    }

    if (outputRate !== null && outputRate < 0) {
      errors.push(`Negative output pricing is invalid: ${model.modelKey}`);
    }

    if (
      model.pricing.costClass === "local-no-provider-token-charge" &&
      (hasNonZeroRate(inputRate) || hasNonZeroRate(outputRate))
    ) {
      errors.push(`Local no-charge pricing must be zero-rate: ${model.modelKey}`);
    }

    if (
      model.pricing.costClass === "free-tier" &&
      (hasNonZeroRate(inputRate) || hasNonZeroRate(outputRate))
    ) {
      errors.push(`Free-tier pricing must be zero-rate: ${model.modelKey}`);
    }

    if (
      model.pricing.costClass === "paid" &&
      (inputRate === null || outputRate === null)
    ) {
      errors.push(`Paid pricing requires input and output rates: ${model.modelKey}`);
    }

    if (
      model.pricing.costClass === "paid" &&
      (model.pricing.pricingAsOf === null || model.pricing.pricingAsOf.trim().length === 0)
    ) {
      errors.push(`Paid pricing requires pricingAsOf: ${model.modelKey}`);
    }

    if (
      model.pricing.costClass === "unknown" &&
      (inputRate !== null || outputRate !== null)
    ) {
      errors.push(`Unknown pricing must not define rates: ${model.modelKey}`);
    }

    if (model.routingState === "automatic" && provider?.catalogState !== "enabled") {
      errors.push(
        `Automatic routing requires an enabled provider: ${model.modelKey}`
      );
    }

    if (
      model.routingState === "automatic" &&
      model.qualificationState !== "deterministic-tested" &&
      model.qualificationState !== "live-verified"
    ) {
      errors.push(
        `Automatic routing requires deterministic-tested or live-verified qualification: ${model.modelKey}`
      );
    }

    if (
      model.routingState === "automatic" &&
      (model.qualificationState === "disabled" ||
        model.qualificationState === "deprecated")
    ) {
      errors.push(
        `Disabled or deprecated models cannot be automatic: ${model.modelKey}`
      );
    }
  }

  return Object.freeze([...errors]);
}

const productionCatalogDraft: CodexForgeModelCatalogSnapshot = {
  catalogVersion: CODEXFORGE_MODEL_ROUTING_CATALOG_VERSION,
  providers: [
    {
      providerId: "ollama-local",
      label: "Local Ollama",
      locality: "local",
      dataBoundary: "local-machine",
      catalogState: "enabled",
      adapterId: "private-alpha-ollama-adapter",
      notes: [],
    },
  ],
  models: [
    {
      modelKey: buildCodexForgeModelKey("ollama-local", "gpt-oss:20b"),
      providerId: "ollama-local",
      modelId: "gpt-oss:20b",
      label: "gpt-oss:20b",
      routingState: "automatic",
      qualificationState: "live-verified",
      capabilities: ["text-generation"],
      approvedMaximumOutputTokens: 4096,
      contextWindowTokens: null,
      pricing: {
        costClass: "local-no-provider-token-charge",
        currency: "USD",
        inputUsdPerMillionTokens: 0,
        outputUsdPerMillionTokens: 0,
        pricingAsOf: null,
        sourceLabel: "Local runtime; no provider token charge",
      },
      taskProfileScores: {},
      evidence: [
        "codexforge-private-alpha-gpt-oss-visible-response-clean",
        "codexforge-private-alpha-provider-adapter-foundation-clean",
        "live Jarvis visible-output acceptance",
      ],
    },
  ],
};

const productionCatalogErrors = validateCodexForgeModelCatalog(productionCatalogDraft);

if (productionCatalogErrors.length > 0) {
  throw new Error(
    `Invalid CodexForge production model catalog: ${productionCatalogErrors.join("; ")}`
  );
}

export const CODEXFORGE_PRODUCTION_MODEL_CATALOG =
  freezeCodexForgeModelCatalogSnapshot(productionCatalogDraft);

export function getCodexForgeProductionModelCatalog(): CodexForgeModelCatalogSnapshot {
  return cloneCodexForgeModelCatalogSnapshot(CODEXFORGE_PRODUCTION_MODEL_CATALOG);
}
