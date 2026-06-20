import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  OPENAI_COMPATIBLE_ROUTER_TRIAL_RESULT_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildOpenAICompatibleRouterTrialResultStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { OPENAI_COMPATIBLE_ROUTER_TRIAL_RESULT_LANGUAGE, buildOpenAICompatibleRouterTrialResultStableKey };

const OPENAI_COMPATIBLE_ROUTER_TRIAL_RESULT_SLUG = "openai-compatible-router-trial-result";

export function buildOpenAICompatibleRouterTrialResult(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(OPENAI_COMPATIBLE_ROUTER_TRIAL_RESULT_SLUG, input);
}

export function buildOpenAICompatibleRouterTrialResultItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(OPENAI_COMPATIBLE_ROUTER_TRIAL_RESULT_SLUG);
}

export function buildOpenAICompatibleRouterTrialResultBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeOpenAICompatibleRouterTrialResult(model: { openAICompatibleRouterTrialResultItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(OPENAI_COMPATIBLE_ROUTER_TRIAL_RESULT_SLUG, model.openAICompatibleRouterTrialResultItems);
}

export function buildOpenAICompatibleRouterTrialResultModel() {
  const openAICompatibleRouterTrialResultItems = buildOpenAICompatibleRouterTrialResultItems();
  const openAICompatibleRouterTrialResultModel = buildModelRouterProviderReadinessReviewModelForSlug(OPENAI_COMPATIBLE_ROUTER_TRIAL_RESULT_SLUG, openAICompatibleRouterTrialResultItems);
  return { ...openAICompatibleRouterTrialResultModel, openAICompatibleRouterTrialResultItems };
}
