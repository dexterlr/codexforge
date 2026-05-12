export * from "./types";

export {
  createEmptyGraph,
  loadBrainGraph,
  saveBrainGraph,
  buildNodeLookup,
  buildAdjacency,
  addNode,
  updateNode,
  removeNode,
  addEdge,
  updateEdge,
  removeEdge,
  upsertNode,
  upsertEdge,
  connectNodes,
  dedupeGraph,
  findNodesByKind,
  findNodeById,
  findEdgeById,
  findConnectedNodes,
  findEdgesForNode,
} from "./graph";

export {
  LocalEngineBrain,
  createLocalEngineBrain,
} from "./local-engine-brain";

export {
  appendEvent,
  reduceGraph,
  assembleContext,
  rankMemory,
  createEpisode,
  synthesizeConcepts,
  createBrainRuntimeEventStore,
  extractExecutionLineage,
  scoreSemanticLinks,
  runBrainRuntime,
} from "./runtime";

export {
  OllamaBrain,
  createOllamaBrain,
} from "./ollama-brain";

/* ================= IMPORTS ================= */

import type { CodexForgeEngineDependencies } from "@/lib/codexforge/chat/contracts";
import {
  DEFAULT_CODEXFORGE_BRAIN_MODEL,
  DEFAULT_CODEXFORGE_BRAIN_PROVIDER,
  isCodexForgeBrainProvider,
  normalizeCodexForgeBrainFactoryOptions,
  type CodexForgeBrain,
  type CodexForgeBrainFactoryOptions,
  type CodexForgeBrainProvider,
  type NormalizedCodexForgeBrainFactoryOptions,
} from "./types";

import { createLocalEngineBrain } from "./local-engine-brain";
import { createOllamaBrain } from "./ollama-brain";

/* ================= TYPES ================= */

type BrainFactoryResult = {
  brain: CodexForgeBrain;
  selectedProvider: CodexForgeBrainProvider;
  resolvedProvider: CodexForgeBrainProvider;
  usedFallback: boolean;
  fallbackReason?: string;
};

type ProviderAvailabilityMap = {
  localEngine: boolean;
  ollama: boolean;
  openai: boolean;
  anthropic: boolean;
  custom: boolean;
};

type BrainSelectionInfo = {
  selectedProvider: CodexForgeBrainProvider;
  resolvedProvider: CodexForgeBrainProvider;
  usedFallback: boolean;
  fallbackReason?: string;
  fallbackEnabled: boolean;
  availability: ProviderAvailabilityMap;
  providers: {
    localEngine: {
      available: boolean;
      enabled: boolean;
      model: string;
    };
    ollama: {
      available: boolean;
      enabled: boolean;
      model: string;
      baseUrl: string;
      timeoutMs: number;
    };
    openai: {
      available: boolean;
      enabled: boolean;
      model: string;
    };
    anthropic: {
      available: boolean;
      enabled: boolean;
      model: string;
    };
    custom: {
      available: boolean;
      enabled: boolean;
    };
  };
};

/* ================= PROVIDER AVAILABILITY ================= */

function getProviderAvailability(
  normalized: NormalizedCodexForgeBrainFactoryOptions
): ProviderAvailabilityMap {
  return {
    localEngine: true,
    ollama: normalized.ollama.enabled,
    openai: normalized.openai.enabled,
    anthropic: normalized.anthropic.enabled,
    custom: false,
  };
}

/* ================= SELECTION ================= */

function resolvePreferredProviderFromNormalized(
  normalized: NormalizedCodexForgeBrainFactoryOptions
): CodexForgeBrainProvider {
  return isCodexForgeBrainProvider(normalized.preferredProvider)
    ? normalized.preferredProvider
    : DEFAULT_CODEXFORGE_BRAIN_PROVIDER;
}

function resolvePreferredProvider(
  options?: CodexForgeBrainFactoryOptions
): CodexForgeBrainProvider {
  return resolvePreferredProviderFromNormalized(
    normalizeCodexForgeBrainFactoryOptions(options)
  );
}

function canInstantiateProvider(
  provider: CodexForgeBrainProvider,
  normalized: NormalizedCodexForgeBrainFactoryOptions
): boolean {
  switch (provider) {
    case "local-engine":
      return true;

    case "ollama":
      return normalized.ollama.enabled;

    case "openai":
      return normalized.openai.enabled;

    case "anthropic":
      return normalized.anthropic.enabled;

    case "custom":
      return false;

    default:
      return false;
  }
}

function getFallbackReason(
  preferredProvider: CodexForgeBrainProvider,
  normalized: NormalizedCodexForgeBrainFactoryOptions
): string | undefined {
  if (preferredProvider === "local-engine") {
    return undefined;
  }

  if (!normalized.enableFallback) {
    return `${preferredProvider} is not available and fallback is disabled.`;
  }

  if (preferredProvider === "custom") {
    return "Custom provider is not implemented yet.";
  }

  return `${preferredProvider} is not enabled or not available.`;
}

function resolveProviderWithFallback(
  normalized: NormalizedCodexForgeBrainFactoryOptions,
  preferredProvider: CodexForgeBrainProvider
): {
  selectedProvider: CodexForgeBrainProvider;
  resolvedProvider: CodexForgeBrainProvider;
  usedFallback: boolean;
  fallbackReason?: string;
} {
  if (canInstantiateProvider(preferredProvider, normalized)) {
    return {
      selectedProvider: preferredProvider,
      resolvedProvider: preferredProvider,
      usedFallback: false,
    };
  }

  const fallbackReason = getFallbackReason(preferredProvider, normalized);

  if (!normalized.enableFallback) {
    return {
      selectedProvider: preferredProvider,
      resolvedProvider: preferredProvider,
      usedFallback: false,
      ...(fallbackReason ? { fallbackReason } : {}),
    };
  }

  return {
    selectedProvider: preferredProvider,
    resolvedProvider: "local-engine",
    usedFallback: preferredProvider !== "local-engine",
    ...(fallbackReason ? { fallbackReason } : {}),
  };
}

/* ================= FACTORY CORE ================= */

function instantiateBrain(
  resolvedProvider: CodexForgeBrainProvider,
  normalized: NormalizedCodexForgeBrainFactoryOptions,
  dependencies?: CodexForgeEngineDependencies
): CodexForgeBrain {
  switch (resolvedProvider) {
    case "local-engine":
      return createLocalEngineBrain(dependencies);

    case "ollama":
      return createOllamaBrain({
        preferredProvider: "ollama",
        enableFallback: normalized.enableFallback,
        ollama: {
          enabled: normalized.ollama.enabled,
          model: normalized.ollama.model,
          baseUrl: normalized.ollama.baseUrl,
          timeoutMs: normalized.ollama.timeoutMs,
        },
        openai: {
          enabled: normalized.openai.enabled,
          model: normalized.openai.model,
        },
        anthropic: {
          enabled: normalized.anthropic.enabled,
          model: normalized.anthropic.model,
        },
      });

    case "openai":
      return createLocalEngineBrain(dependencies);

    case "anthropic":
      return createLocalEngineBrain(dependencies);

    case "custom":
      return createLocalEngineBrain(dependencies);

    default:
      return createLocalEngineBrain(dependencies);
  }
}

function buildBrainFactoryResult(
  options?: CodexForgeBrainFactoryOptions,
  dependencies?: CodexForgeEngineDependencies
): BrainFactoryResult {
  const normalized = normalizeCodexForgeBrainFactoryOptions(options);
  const preferredProvider = resolvePreferredProviderFromNormalized(normalized);
  const resolution = resolveProviderWithFallback(normalized, preferredProvider);

  const safeResolvedProvider =
    canInstantiateProvider(resolution.resolvedProvider, normalized)
      ? resolution.resolvedProvider
      : "local-engine";

  const brain = instantiateBrain(
    safeResolvedProvider,
    normalized,
    dependencies
  );

  return {
    brain,
    selectedProvider: resolution.selectedProvider,
    resolvedProvider: safeResolvedProvider,
    usedFallback:
      resolution.selectedProvider !== safeResolvedProvider ||
      resolution.usedFallback,
    ...(resolution.fallbackReason
      ? { fallbackReason: resolution.fallbackReason }
      : {}),
  };
}

/* ================= PUBLIC FACTORY ================= */

export function createCodexForgeBrain(
  options?: CodexForgeBrainFactoryOptions,
  dependencies?: CodexForgeEngineDependencies
): CodexForgeBrain {
  return buildBrainFactoryResult(options, dependencies).brain;
}

export function selectBrainProvider(
  options?: CodexForgeBrainFactoryOptions
): CodexForgeBrainProvider {
  return resolvePreferredProvider(options);
}

export function resolveBrainProvider(
  options?: CodexForgeBrainFactoryOptions
): CodexForgeBrainProvider {
  return buildBrainFactoryResult(options).resolvedProvider;
}

export function getCodexForgeBrainSelectionInfo(
  options?: CodexForgeBrainFactoryOptions
): BrainSelectionInfo {
  const normalized = normalizeCodexForgeBrainFactoryOptions(options);
  const availability = getProviderAvailability(normalized);
  const result = buildBrainFactoryResult(options);

  return {
    selectedProvider: result.selectedProvider,
    resolvedProvider: result.resolvedProvider,
    usedFallback: result.usedFallback,
    fallbackReason: result.fallbackReason,
    fallbackEnabled: normalized.enableFallback,
    availability,
    providers: {
      localEngine: {
        available: availability.localEngine,
        enabled: true,
        model: DEFAULT_CODEXFORGE_BRAIN_MODEL,
      },
      ollama: {
        available: availability.ollama,
        enabled: normalized.ollama.enabled,
        model: normalized.ollama.model,
        baseUrl: normalized.ollama.baseUrl,
        timeoutMs: normalized.ollama.timeoutMs,
      },
      openai: {
        available: availability.openai,
        enabled: normalized.openai.enabled,
        model: normalized.openai.model,
      },
      anthropic: {
        available: availability.anthropic,
        enabled: normalized.anthropic.enabled,
        model: normalized.anthropic.model,
      },
      custom: {
        available: availability.custom,
        enabled: false,
      },
    },
  };
}
