import "server-only";

import {
  PrivateAlphaOllamaError,
  createPrivateAlphaOllamaClient,
  type PrivateAlphaOllamaClient,
} from "./private-alpha-ollama.server";
import {
  PrivateAlphaProviderError,
  type PrivateAlphaProviderAdapter,
  type PrivateAlphaProviderExecutionErrorCode,
} from "./private-alpha-provider.server";

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

  return {
    async getAvailability() {
      const availability = await ollamaClient.getAvailability();

      return {
        providerAvailable: availability.providerAvailable,
        modelAvailable: availability.modelAvailable,
        errorCode: availability.errorCode,
        safeErrorMessage: availability.safeErrorMessage,
      };
    },

    async generateApprovedText(input) {
      try {
        const generated = await ollamaClient.generateApprovedText(input);

        return {
          outputText: generated.outputText,
          doneReason: generated.doneReason,
          totalDurationNanoseconds: generated.totalDurationNanoseconds,
          loadDurationNanoseconds: generated.loadDurationNanoseconds,
          promptEvalCount: generated.promptEvalCount,
          evalCount: generated.evalCount,
        };
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
  };
}
