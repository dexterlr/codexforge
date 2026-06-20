import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PRO_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildProModelRouterTrialResultStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { PRO_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE, buildProModelRouterTrialResultStableKey };

const PRO_MODEL_ROUTER_TRIAL_RESULT_SLUG = "pro-model-router-trial-result";

export function buildProModelRouterTrialResult(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(PRO_MODEL_ROUTER_TRIAL_RESULT_SLUG, input);
}

export function buildProModelRouterTrialResultItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(PRO_MODEL_ROUTER_TRIAL_RESULT_SLUG);
}

export function buildProModelRouterTrialResultBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeProModelRouterTrialResult(model: { proModelRouterTrialResultItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(PRO_MODEL_ROUTER_TRIAL_RESULT_SLUG, model.proModelRouterTrialResultItems);
}

export function buildProModelRouterTrialResultModel() {
  const proModelRouterTrialResultItems = buildProModelRouterTrialResultItems();
  const proModelRouterTrialResultModel = buildModelRouterProviderReadinessReviewModelForSlug(PRO_MODEL_ROUTER_TRIAL_RESULT_SLUG, proModelRouterTrialResultItems);
  return { ...proModelRouterTrialResultModel, proModelRouterTrialResultItems };
}
