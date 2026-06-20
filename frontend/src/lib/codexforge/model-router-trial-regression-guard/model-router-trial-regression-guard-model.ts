import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_TRIAL_REGRESSION_GUARD_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildModelRouterTrialRegressionGuardStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { MODEL_ROUTER_TRIAL_REGRESSION_GUARD_LANGUAGE, buildModelRouterTrialRegressionGuardStableKey };

const MODEL_ROUTER_TRIAL_REGRESSION_GUARD_SLUG = "model-router-trial-regression-guard";

export function buildModelRouterTrialRegressionGuard(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(MODEL_ROUTER_TRIAL_REGRESSION_GUARD_SLUG, input);
}

export function buildModelRouterTrialRegressionGuardItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(MODEL_ROUTER_TRIAL_REGRESSION_GUARD_SLUG);
}

export function buildModelRouterTrialRegressionGuardBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeModelRouterTrialRegressionGuard(model: { modelRouterTrialRegressionGuardItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(MODEL_ROUTER_TRIAL_REGRESSION_GUARD_SLUG, model.modelRouterTrialRegressionGuardItems);
}

export function buildModelRouterTrialRegressionGuardModel() {
  const modelRouterTrialRegressionGuardItems = buildModelRouterTrialRegressionGuardItems();
  const modelRouterTrialRegressionGuardModel = buildModelRouterProviderReadinessReviewModelForSlug(MODEL_ROUTER_TRIAL_REGRESSION_GUARD_SLUG, modelRouterTrialRegressionGuardItems);
  return { ...modelRouterTrialRegressionGuardModel, modelRouterTrialRegressionGuardItems };
}
