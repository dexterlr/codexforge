import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_PRIVACY_DECISION_REVIEW_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildModelRouterPrivacyDecisionReviewStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { MODEL_ROUTER_PRIVACY_DECISION_REVIEW_LANGUAGE, buildModelRouterPrivacyDecisionReviewStableKey };

const MODEL_ROUTER_PRIVACY_DECISION_REVIEW_SLUG = "model-router-privacy-decision-review";

export function buildModelRouterPrivacyDecisionReview(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(MODEL_ROUTER_PRIVACY_DECISION_REVIEW_SLUG, input);
}

export function buildModelRouterPrivacyDecisionReviewItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(MODEL_ROUTER_PRIVACY_DECISION_REVIEW_SLUG);
}

export function buildModelRouterPrivacyDecisionReviewBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeModelRouterPrivacyDecisionReview(model: { modelRouterPrivacyDecisionReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(MODEL_ROUTER_PRIVACY_DECISION_REVIEW_SLUG, model.modelRouterPrivacyDecisionReviewItems);
}

export function buildModelRouterPrivacyDecisionReviewModel() {
  const modelRouterPrivacyDecisionReviewItems = buildModelRouterPrivacyDecisionReviewItems();
  const modelRouterPrivacyDecisionReviewModel = buildModelRouterProviderReadinessReviewModelForSlug(MODEL_ROUTER_PRIVACY_DECISION_REVIEW_SLUG, modelRouterPrivacyDecisionReviewItems);
  return { ...modelRouterPrivacyDecisionReviewModel, modelRouterPrivacyDecisionReviewItems };
}
