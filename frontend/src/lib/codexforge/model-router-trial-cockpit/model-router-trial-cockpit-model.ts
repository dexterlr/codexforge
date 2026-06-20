import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_TRIAL_COCKPIT_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildModelRouterTrialCockpitStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { MODEL_ROUTER_TRIAL_COCKPIT_LANGUAGE, buildModelRouterTrialCockpitStableKey };

const MODEL_ROUTER_TRIAL_COCKPIT_SLUG = "model-router-trial-cockpit";

export function buildModelRouterTrialCockpit(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(MODEL_ROUTER_TRIAL_COCKPIT_SLUG, input);
}

export function buildModelRouterTrialCockpitItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(MODEL_ROUTER_TRIAL_COCKPIT_SLUG);
}

export function buildModelRouterTrialCockpitBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeModelRouterTrialCockpit(model: { modelRouterTrialCockpitItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(MODEL_ROUTER_TRIAL_COCKPIT_SLUG, model.modelRouterTrialCockpitItems);
}

export function buildModelRouterTrialCockpitModel() {
  const modelRouterTrialCockpitItems = buildModelRouterTrialCockpitItems();
  const modelRouterTrialCockpitModel = buildModelRouterProviderReadinessReviewModelForSlug(MODEL_ROUTER_TRIAL_COCKPIT_SLUG, modelRouterTrialCockpitItems);
  return { ...modelRouterTrialCockpitModel, modelRouterTrialCockpitItems };
}
