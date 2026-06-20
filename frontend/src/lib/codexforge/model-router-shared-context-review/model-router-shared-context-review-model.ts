import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_SHARED_CONTEXT_REVIEW_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildModelRouterSharedContextReviewStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { MODEL_ROUTER_SHARED_CONTEXT_REVIEW_LANGUAGE, buildModelRouterSharedContextReviewStableKey };

const MODEL_ROUTER_SHARED_CONTEXT_REVIEW_SLUG = "model-router-shared-context-review";

export function buildModelRouterSharedContextReview(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(MODEL_ROUTER_SHARED_CONTEXT_REVIEW_SLUG, input);
}

export function buildModelRouterSharedContextReviewItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(MODEL_ROUTER_SHARED_CONTEXT_REVIEW_SLUG);
}

export function buildModelRouterSharedContextReviewBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeModelRouterSharedContextReview(model: { modelRouterSharedContextReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(MODEL_ROUTER_SHARED_CONTEXT_REVIEW_SLUG, model.modelRouterSharedContextReviewItems);
}

export function buildModelRouterSharedContextReviewModel() {
  const modelRouterSharedContextReviewItems = buildModelRouterSharedContextReviewItems();
  const modelRouterSharedContextReviewModel = buildModelRouterProviderReadinessReviewModelForSlug(MODEL_ROUTER_SHARED_CONTEXT_REVIEW_SLUG, modelRouterSharedContextReviewItems);
  return { ...modelRouterSharedContextReviewModel, modelRouterSharedContextReviewItems };
}
