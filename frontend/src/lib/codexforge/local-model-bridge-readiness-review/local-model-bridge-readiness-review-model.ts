import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_MODEL_BRIDGE_READINESS_REVIEW_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildLocalModelBridgeReadinessReviewStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { LOCAL_MODEL_BRIDGE_READINESS_REVIEW_LANGUAGE, buildLocalModelBridgeReadinessReviewStableKey };

const LOCAL_MODEL_BRIDGE_READINESS_REVIEW_SLUG = "local-model-bridge-readiness-review";

export function buildLocalModelBridgeReadinessReview(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(LOCAL_MODEL_BRIDGE_READINESS_REVIEW_SLUG, input);
}

export function buildLocalModelBridgeReadinessReviewItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(LOCAL_MODEL_BRIDGE_READINESS_REVIEW_SLUG);
}

export function buildLocalModelBridgeReadinessReviewBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeLocalModelBridgeReadinessReview(model: { localModelBridgeReadinessReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(LOCAL_MODEL_BRIDGE_READINESS_REVIEW_SLUG, model.localModelBridgeReadinessReviewItems);
}

export function buildLocalModelBridgeReadinessReviewModel() {
  const localModelBridgeReadinessReviewItems = buildLocalModelBridgeReadinessReviewItems();
  const localModelBridgeReadinessReviewModel = buildModelRouterProviderReadinessReviewModelForSlug(LOCAL_MODEL_BRIDGE_READINESS_REVIEW_SLUG, localModelBridgeReadinessReviewItems);
  return { ...localModelBridgeReadinessReviewModel, localModelBridgeReadinessReviewItems };
}
