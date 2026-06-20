import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_TRIAL_SUMMARY_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildModelRouterTrialSummaryStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { MODEL_ROUTER_TRIAL_SUMMARY_LANGUAGE, buildModelRouterTrialSummaryStableKey };

const MODEL_ROUTER_TRIAL_SUMMARY_SLUG = "model-router-trial-summary";

export function buildModelRouterTrialSummary(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(MODEL_ROUTER_TRIAL_SUMMARY_SLUG, input);
}

export function buildModelRouterTrialSummaryItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(MODEL_ROUTER_TRIAL_SUMMARY_SLUG);
}

export function buildModelRouterTrialSummaryBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeModelRouterTrialSummary(model: { modelRouterTrialSummaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(MODEL_ROUTER_TRIAL_SUMMARY_SLUG, model.modelRouterTrialSummaryItems);
}

export function buildModelRouterTrialSummaryModel() {
  const modelRouterTrialSummaryItems = buildModelRouterTrialSummaryItems();
  const modelRouterTrialSummaryModel = buildModelRouterProviderReadinessReviewModelForSlug(MODEL_ROUTER_TRIAL_SUMMARY_SLUG, modelRouterTrialSummaryItems);
  return { ...modelRouterTrialSummaryModel, modelRouterTrialSummaryItems };
}
