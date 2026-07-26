import "server-only";

import {
  PrivateAlphaOllamaError,
  createPrivateAlphaOllamaClient,
  type PrivateAlphaOllamaClient,
} from "./private-alpha-ollama.server";
import {
  type PrivateAlphaProviderAvailability,
  PrivateAlphaProviderError,
  type PrivateAlphaProviderAdapter,
  type PrivateAlphaProviderExecutionErrorCode,
  type PrivateAlphaProviderGenerationResult,
  type PrivateAlphaProviderIdentity,
} from "./private-alpha-provider.server";
import {
  PRIVATE_ALPHA_MAX_OUTPUT_TOKENS,
  PRIVATE_ALPHA_PRODUCTION_MODEL,
  PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
} from "./private-alpha-validation";

const PRIVATE_ALPHA_OLLAMA_PROVIDER_IDENTITY: PrivateAlphaProviderIdentity =
  Object.freeze({
    providerId: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
    providerLabel: "Local Ollama",
    modelId: PRIVATE_ALPHA_PRODUCTION_MODEL,
    modelLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
    modelKey: "ollama-local::gpt-oss:20b",
    locality: "local",
    dataBoundary: "local-machine",
    costClass: "local-no-provider-token-charge",
    approvedMaximumOutputTokens: PRIVATE_ALPHA_MAX_OUTPUT_TOKENS,
  });

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

function freezeGenerationResult(
  result: PrivateAlphaProviderGenerationResult
): PrivateAlphaProviderGenerationResult {
  return Object.freeze({
    outputText: result.outputText,
    doneReason: result.doneReason,
    totalDurationNanoseconds: result.totalDurationNanoseconds,
    loadDurationNanoseconds: result.loadDurationNanoseconds,
    promptEvalCount: result.promptEvalCount,
    evalCount: result.evalCount,
  });
}

function normalizeProviderExecutionErrorCode(
  code: PrivateAlphaOllamaError["code"]
): PrivateAlphaProviderExecutionErrorCode {
  switch (code) {
    case "kill_switch_blocked":
      return "ollama_http_error";
    case "ollama_unavailable":
    case "ollama_model_missing":
    case "ollama_timeout":
    case "ollama_http_error":
    case "ollama_malformed_response":
    case "ollama_empty_response":
    case "ollama_output_too_large":
      return code;
  }
}

export function createPrivateAlphaOllamaProviderAdapter(
  options?: Readonly<{
    ollamaClient?: PrivateAlphaOllamaClient;
  }>
): PrivateAlphaProviderAdapter {
  const ollamaClient = options?.ollamaClient ?? createPrivateAlphaOllamaClient();

  return Object.freeze({
    identity: PRIVATE_ALPHA_OLLAMA_PROVIDER_IDENTITY,

    async getAvailability() {
      const availability = await ollamaClient.getAvailability();

      return freezeAvailability({
        providerAvailable: availability.providerAvailable,
        modelAvailable: availability.modelAvailable,
        quotaState: "not-applicable",
        errorCode: availability.errorCode,
        safeErrorMessage: availability.safeErrorMessage,
      });
    },

    async generateApprovedText(input) {
      try {
        const generated = await ollamaClient.generateApprovedText(input);

        return freezeGenerationResult({
          outputText: generated.outputText,
          doneReason: generated.doneReason,
          totalDurationNanoseconds: generated.totalDurationNanoseconds,
          loadDurationNanoseconds: generated.loadDurationNanoseconds,
          promptEvalCount: generated.promptEvalCount,
          evalCount: generated.evalCount,
        });
      } catch (error) {
        if (error instanceof PrivateAlphaOllamaError) {
          throw new PrivateAlphaProviderError(
            normalizeProviderExecutionErrorCode(error.code),
            error.safeMessage,
            error.status
          );
        }

        throw error;
      }
    },
  });
}
