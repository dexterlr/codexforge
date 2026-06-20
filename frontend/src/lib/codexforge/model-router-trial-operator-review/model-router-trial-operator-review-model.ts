import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_TRIAL_OPERATOR_REVIEW_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildModelRouterTrialOperatorReviewStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { MODEL_ROUTER_TRIAL_OPERATOR_REVIEW_LANGUAGE, buildModelRouterTrialOperatorReviewStableKey };

const MODEL_ROUTER_TRIAL_OPERATOR_REVIEW_SLUG = "model-router-trial-operator-review";

export function buildModelRouterTrialOperatorReview(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(MODEL_ROUTER_TRIAL_OPERATOR_REVIEW_SLUG, input);
}

export function buildModelRouterTrialOperatorReviewItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(MODEL_ROUTER_TRIAL_OPERATOR_REVIEW_SLUG);
}

export function buildModelRouterTrialOperatorReviewBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeModelRouterTrialOperatorReview(model: { modelRouterTrialOperatorReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(MODEL_ROUTER_TRIAL_OPERATOR_REVIEW_SLUG, model.modelRouterTrialOperatorReviewItems);
}

export function buildModelRouterTrialOperatorReviewModel() {
  const modelRouterTrialOperatorReviewItems = buildModelRouterTrialOperatorReviewItems();
  const modelRouterTrialOperatorReviewModel = buildModelRouterProviderReadinessReviewModelForSlug(MODEL_ROUTER_TRIAL_OPERATOR_REVIEW_SLUG, modelRouterTrialOperatorReviewItems);
  return { ...modelRouterTrialOperatorReviewModel, modelRouterTrialOperatorReviewItems };
}
