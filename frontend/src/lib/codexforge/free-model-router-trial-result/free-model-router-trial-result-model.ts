import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FREE_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildFreeModelRouterTrialResultStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { FREE_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE, buildFreeModelRouterTrialResultStableKey };

const FREE_MODEL_ROUTER_TRIAL_RESULT_SLUG = "free-model-router-trial-result";

export function buildFreeModelRouterTrialResult(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(FREE_MODEL_ROUTER_TRIAL_RESULT_SLUG, input);
}

export function buildFreeModelRouterTrialResultItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(FREE_MODEL_ROUTER_TRIAL_RESULT_SLUG);
}

export function buildFreeModelRouterTrialResultBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeFreeModelRouterTrialResult(model: { freeModelRouterTrialResultItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(FREE_MODEL_ROUTER_TRIAL_RESULT_SLUG, model.freeModelRouterTrialResultItems);
}

export function buildFreeModelRouterTrialResultModel() {
  const freeModelRouterTrialResultItems = buildFreeModelRouterTrialResultItems();
  const freeModelRouterTrialResultModel = buildModelRouterProviderReadinessReviewModelForSlug(FREE_MODEL_ROUTER_TRIAL_RESULT_SLUG, freeModelRouterTrialResultItems);
  return { ...freeModelRouterTrialResultModel, freeModelRouterTrialResultItems };
}
