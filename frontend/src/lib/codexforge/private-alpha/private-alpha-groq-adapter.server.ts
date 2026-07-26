import "server-only";

import {
  CodexForgeGroqError,
  createCodexForgeGroqClient,
  type CodexForgeGroqClient,
} from "../groq-provider/groq-provider-client.server";
import type { CodexForgeGroqModelId } from "../groq-provider/groq-provider-types";
import {
  type PrivateAlphaProviderAdapter,
  type PrivateAlphaProviderAvailability,
  type PrivateAlphaProviderGenerationResult,
  type PrivateAlphaProviderIdentity,
  PrivateAlphaProviderError,
} from "./private-alpha-provider.server";

const PRIVATE_ALPHA_GROQ_PROVIDER_IDENTITIES: Readonly<
  Record<CodexForgeGroqModelId, PrivateAlphaProviderIdentity>
> = Object.freeze({
  "openai/gpt-oss-20b": Object.freeze({
    providerId: "groq-cloud",
    providerLabel: "Groq Cloud",
    modelId: "openai/gpt-oss-20b",
    modelLabel: "openai/gpt-oss-20b",
    modelKey: "groq-cloud::openai/gpt-oss-20b",
    locality: "cloud",
    dataBoundary: "cloud-provider",
    costClass: "free-tier",
    approvedMaximumOutputTokens: 4096,
  }),
  "openai/gpt-oss-120b": Object.freeze({
    providerId: "groq-cloud",
    providerLabel: "Groq Cloud",
    modelId: "openai/gpt-oss-120b",
    modelLabel: "openai/gpt-oss-120b",
    modelKey: "groq-cloud::openai/gpt-oss-120b",
    locality: "cloud",
    dataBoundary: "cloud-provider",
    costClass: "free-tier",
    approvedMaximumOutputTokens: 4096,
  }),
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

function mapAvailabilityError(
  error: CodexForgeGroqError
): PrivateAlphaProviderAvailability {
  switch (error.code) {
    case "groq_credential_missing":
    case "groq_authentication_failed":
    case "groq_unavailable":
    case "groq_timeout":
    case "groq_http_error":
    case "groq_malformed_response":
    case "groq_output_too_large":
      return freezeAvailability({
        providerAvailable: false,
        modelAvailable: false,
        quotaState: "unknown",
        errorCode: error.code,
        safeErrorMessage: error.safeMessage,
      });
    case "groq_model_unavailable":
    case "groq_rate_limited":
      return freezeAvailability({
        providerAvailable: true,
        modelAvailable: false,
        quotaState: "unknown",
        errorCode: error.code,
        safeErrorMessage: error.safeMessage,
      });
    case "groq_quota_exhausted":
      return freezeAvailability({
        providerAvailable: true,
        modelAvailable: false,
        quotaState: "exhausted",
        errorCode: error.code,
        safeErrorMessage: error.safeMessage,
      });
  }

  throw error;
}

export function createPrivateAlphaGroqProviderAdapter(
  options: Readonly<{
    model: CodexForgeGroqModelId;
    groqClient?: CodexForgeGroqClient;
  }>
): PrivateAlphaProviderAdapter {
  const identity = PRIVATE_ALPHA_GROQ_PROVIDER_IDENTITIES[options.model];
  const boundModel = options.model;
  const groqClient = options.groqClient ?? createCodexForgeGroqClient();

  return Object.freeze({
    identity,

    async getAvailability() {
      const configurationStatus = groqClient.getConfigurationStatus();
      if (!configurationStatus.configured) {
        return freezeAvailability({
          providerAvailable: false,
          modelAvailable: false,
          quotaState: "unknown",
          errorCode: "groq_credential_missing",
          safeErrorMessage: "Groq credential is not configured.",
        });
      }

      try {
        const discovery = await groqClient.discoverAllowedModels();
        const discoveredModel =
          discovery.discoveredModels.find((model) => model.modelId === boundModel) ??
          null;
        const modelAvailable =
          discoveredModel !== null && discoveredModel.active === true;

        if (modelAvailable) {
          return freezeAvailability({
            providerAvailable: true,
            modelAvailable: true,
            quotaState: "available",
            errorCode: null,
            safeErrorMessage: null,
          });
        }

        return freezeAvailability({
          providerAvailable: true,
          modelAvailable: false,
          quotaState: "unknown",
          errorCode: "groq_model_unavailable",
          safeErrorMessage:
            "Groq does not currently expose the requested model.",
        });
      } catch (error) {
        if (error instanceof CodexForgeGroqError) {
          return mapAvailabilityError(error);
        }

        throw error;
      }
    },

    async generateApprovedText(input) {
      if (input.model !== boundModel) {
        throw new PrivateAlphaProviderError(
          "groq_model_unavailable",
          "Groq adapter is bound to a different model.",
          503
        );
      }

      try {
        const generated = await groqClient.generateApprovedText({
          approvedRequestText: input.approvedRequestText,
          model: boundModel,
          maximumOutputTokens: input.maximumOutputTokens,
        });

        return freezeGenerationResult({
          outputText: generated.outputText,
          doneReason: generated.finishReason,
          totalDurationNanoseconds: generated.totalDurationNanoseconds,
          loadDurationNanoseconds: null,
          promptEvalCount: generated.promptTokens,
          evalCount: generated.outputTokens,
        });
      } catch (error) {
        if (error instanceof CodexForgeGroqError) {
          throw new PrivateAlphaProviderError(
            error.code,
            error.safeMessage,
            error.status
          );
        }

        throw error;
      }
    },
  });
}
