import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LIVE_PROVIDER_READINESS_BOUNDARY_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildLiveProviderReadinessBoundaryStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { LIVE_PROVIDER_READINESS_BOUNDARY_LANGUAGE, buildLiveProviderReadinessBoundaryStableKey };

const LIVE_PROVIDER_READINESS_BOUNDARY_SLUG = "live-provider-readiness-boundary";

export function buildLiveProviderReadinessBoundary(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(LIVE_PROVIDER_READINESS_BOUNDARY_SLUG, input);
}

export function buildLiveProviderReadinessBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(LIVE_PROVIDER_READINESS_BOUNDARY_SLUG);
}

export function buildLiveProviderReadinessBoundaryBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeLiveProviderReadinessBoundary(model: { liveProviderReadinessBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(LIVE_PROVIDER_READINESS_BOUNDARY_SLUG, model.liveProviderReadinessBoundaryItems);
}

export function buildLiveProviderReadinessBoundaryModel() {
  const liveProviderReadinessBoundaryItems = buildLiveProviderReadinessBoundaryItems();
  const liveProviderReadinessBoundaryModel = buildModelRouterProviderReadinessReviewModelForSlug(LIVE_PROVIDER_READINESS_BOUNDARY_SLUG, liveProviderReadinessBoundaryItems);
  return { ...liveProviderReadinessBoundaryModel, liveProviderReadinessBoundaryItems };
}
