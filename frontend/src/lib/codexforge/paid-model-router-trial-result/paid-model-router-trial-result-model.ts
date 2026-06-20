import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PAID_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildPaidModelRouterTrialResultStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { PAID_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE, buildPaidModelRouterTrialResultStableKey };

const PAID_MODEL_ROUTER_TRIAL_RESULT_SLUG = "paid-model-router-trial-result";

export function buildPaidModelRouterTrialResult(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(PAID_MODEL_ROUTER_TRIAL_RESULT_SLUG, input);
}

export function buildPaidModelRouterTrialResultItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(PAID_MODEL_ROUTER_TRIAL_RESULT_SLUG);
}

export function buildPaidModelRouterTrialResultBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizePaidModelRouterTrialResult(model: { paidModelRouterTrialResultItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(PAID_MODEL_ROUTER_TRIAL_RESULT_SLUG, model.paidModelRouterTrialResultItems);
}

export function buildPaidModelRouterTrialResultModel() {
  const paidModelRouterTrialResultItems = buildPaidModelRouterTrialResultItems();
  const paidModelRouterTrialResultModel = buildModelRouterProviderReadinessReviewModelForSlug(PAID_MODEL_ROUTER_TRIAL_RESULT_SLUG, paidModelRouterTrialResultItems);
  return { ...paidModelRouterTrialResultModel, paidModelRouterTrialResultItems };
}
