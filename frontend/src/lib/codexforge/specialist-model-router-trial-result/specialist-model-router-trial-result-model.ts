import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildSpecialistModelRouterTrialResultStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { SPECIALIST_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE, buildSpecialistModelRouterTrialResultStableKey };

const SPECIALIST_MODEL_ROUTER_TRIAL_RESULT_SLUG = "specialist-model-router-trial-result";

export function buildSpecialistModelRouterTrialResult(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(SPECIALIST_MODEL_ROUTER_TRIAL_RESULT_SLUG, input);
}

export function buildSpecialistModelRouterTrialResultItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(SPECIALIST_MODEL_ROUTER_TRIAL_RESULT_SLUG);
}

export function buildSpecialistModelRouterTrialResultBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeSpecialistModelRouterTrialResult(model: { specialistModelRouterTrialResultItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(SPECIALIST_MODEL_ROUTER_TRIAL_RESULT_SLUG, model.specialistModelRouterTrialResultItems);
}

export function buildSpecialistModelRouterTrialResultModel() {
  const specialistModelRouterTrialResultItems = buildSpecialistModelRouterTrialResultItems();
  const specialistModelRouterTrialResultModel = buildModelRouterProviderReadinessReviewModelForSlug(SPECIALIST_MODEL_ROUTER_TRIAL_RESULT_SLUG, specialistModelRouterTrialResultItems);
  return { ...specialistModelRouterTrialResultModel, specialistModelRouterTrialResultItems };
}
