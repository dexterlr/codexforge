import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILDER_TARGET_RECOMMENDATION_PREVIEW_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuilderTargetRecommendationPreviewStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILDER_TARGET_RECOMMENDATION_PREVIEW_LANGUAGE, buildBuilderTargetRecommendationPreviewStableKey };

const BUILDER_TARGET_RECOMMENDATION_PREVIEW_SLUG = "builder-target-recommendation-preview";

export function buildBuilderTargetRecommendationPreview(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILDER_TARGET_RECOMMENDATION_PREVIEW_SLUG, input);
}

export function buildBuilderTargetRecommendationPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILDER_TARGET_RECOMMENDATION_PREVIEW_SLUG);
}

export function buildBuilderTargetRecommendationPreviewBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuilderTargetRecommendationPreview(model: { builderTargetRecommendationPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILDER_TARGET_RECOMMENDATION_PREVIEW_SLUG, model.builderTargetRecommendationPreviewItems);
}

export function buildBuilderTargetRecommendationPreviewModel() {
  const builderTargetRecommendationPreviewItems = buildBuilderTargetRecommendationPreviewItems();
  const builderTargetRecommendationPreviewModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILDER_TARGET_RECOMMENDATION_PREVIEW_SLUG, builderTargetRecommendationPreviewItems);
  return { ...builderTargetRecommendationPreviewModel, builderTargetRecommendationPreviewItems };
}
