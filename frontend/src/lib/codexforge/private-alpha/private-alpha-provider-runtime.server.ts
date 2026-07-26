import "server-only";

import {
  createPrivateAlphaGroqProviderAdapter,
} from "./private-alpha-groq-adapter.server";
import {
  createPrivateAlphaOllamaProviderAdapter,
} from "./private-alpha-ollama-adapter.server";
import type {
  PrivateAlphaOllamaClient,
} from "./private-alpha-ollama.server";
import type {
  PrivateAlphaProviderAdapter,
  PrivateAlphaProviderAvailability,
  PrivateAlphaProviderIdentity,
} from "./private-alpha-provider.server";
import type {
  CodexForgeGroqClient,
} from "../groq-provider/groq-provider-client.server";
import type {
  CodexForgeModelKey,
  CodexForgeModelRuntimeSnapshot,
} from "../model-routing/model-routing-types";
export {
  PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_RUNTIME_MODEL_KEYS,
} from "./private-alpha-types";
import {
  PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
} from "./private-alpha-types";

export class PrivateAlphaProviderRuntimeError extends Error {
  readonly code = "unsupported_model_key" as const;
  readonly safeMessage =
    "The requested provider model is not supported by the private-alpha runtime.";

  constructor() {
    super(
      "The requested provider model is not supported by the private-alpha runtime."
    );
    this.name = "PrivateAlphaProviderRuntimeError";
  }
}

export type PrivateAlphaProviderRuntimeInspection = Readonly<{
  identity: PrivateAlphaProviderIdentity;
  availability: PrivateAlphaProviderAvailability;
  snapshot: CodexForgeModelRuntimeSnapshot;
}>;

function freezeIdentity(
  identity: PrivateAlphaProviderIdentity
): PrivateAlphaProviderIdentity {
  return Object.freeze({
    providerId: identity.providerId,
    providerLabel: identity.providerLabel,
    modelId: identity.modelId,
    modelLabel: identity.modelLabel,
    modelKey: identity.modelKey,
    locality: identity.locality,
    dataBoundary: identity.dataBoundary,
    costClass: identity.costClass,
    approvedMaximumOutputTokens: identity.approvedMaximumOutputTokens,
  });
}

function freezeAvailability(
  availability: PrivateAlphaProviderAvailability
): PrivateAlphaProviderAvailability {
  return Object.freeze({
    providerAvailable: availability.providerAvailable,
    modelAvailable: availability.modelAvailable,
    quotaState: availability.quotaState,
    errorCode: availability.errorCode,
    safeErrorMessage: availability.safeErrorMessage,
  });
}

function freezeSnapshot(
  snapshot: CodexForgeModelRuntimeSnapshot
): CodexForgeModelRuntimeSnapshot {
  return Object.freeze({
    modelKey: snapshot.modelKey,
    availability: snapshot.availability,
    quotaState: snapshot.quotaState,
    observedLatencyMs: snapshot.observedLatencyMs,
    observedAt: snapshot.observedAt,
  });
}

function defaultNow(): string {
  return new Date().toISOString();
}

function defaultMonotonicNowMs(): number {
  return typeof globalThis.performance === "object" &&
    globalThis.performance !== null &&
    typeof globalThis.performance.now === "function"
    ? globalThis.performance.now()
    : Number.NaN;
}

function calculateObservedLatencyMs(
  startedAtMs: number,
  finishedAtMs: number
): number | null {
  if (!Number.isFinite(startedAtMs) || !Number.isFinite(finishedAtMs)) {
    return null;
  }

  const observedLatencyMs = finishedAtMs - startedAtMs;
  if (!Number.isFinite(observedLatencyMs) || observedLatencyMs < 0) {
    return null;
  }

  return observedLatencyMs;
}

export function createPrivateAlphaProviderAdapterForModelKey(
  modelKey: CodexForgeModelKey,
  options?: Readonly<{
    ollamaClient?: PrivateAlphaOllamaClient;
    groqClient?: CodexForgeGroqClient;
  }>
): PrivateAlphaProviderAdapter {
  switch (modelKey) {
    case PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY:
      return createPrivateAlphaOllamaProviderAdapter({
        ollamaClient: options?.ollamaClient,
      });
    case PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:
      return createPrivateAlphaGroqProviderAdapter({
        model: "openai/gpt-oss-20b",
        groqClient: options?.groqClient,
      });
    case PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY:
      return createPrivateAlphaGroqProviderAdapter({
        model: "openai/gpt-oss-120b",
        groqClient: options?.groqClient,
      });
    default:
      throw new PrivateAlphaProviderRuntimeError();
  }
}

export async function inspectPrivateAlphaProviderRuntime(
  modelKey: CodexForgeModelKey,
  options?: Readonly<{
    ollamaClient?: PrivateAlphaOllamaClient;
    groqClient?: CodexForgeGroqClient;
    now?: () => string;
    monotonicNowMs?: () => number;
  }>
): Promise<PrivateAlphaProviderRuntimeInspection> {
  const adapter = createPrivateAlphaProviderAdapterForModelKey(modelKey, options);
  const startedAtMs = (options?.monotonicNowMs ?? defaultMonotonicNowMs)();
  const rawAvailability = await adapter.getAvailability();
  const finishedAtMs = (options?.monotonicNowMs ?? defaultMonotonicNowMs)();

  const identity = freezeIdentity(adapter.identity);
  const availability = freezeAvailability(rawAvailability);
  const snapshot = freezeSnapshot({
    modelKey: identity.modelKey,
    availability:
      availability.providerAvailable && availability.modelAvailable
        ? "available"
        : "unavailable",
    quotaState: availability.quotaState,
    observedLatencyMs: calculateObservedLatencyMs(startedAtMs, finishedAtMs),
    observedAt: (options?.now ?? defaultNow)(),
  });

  return Object.freeze({
    identity,
    availability,
    snapshot,
  });
}
