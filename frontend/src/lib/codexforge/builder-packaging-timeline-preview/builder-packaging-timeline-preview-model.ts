import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILDER_PACKAGING_TIMELINE_PREVIEW_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuilderPackagingTimelinePreviewStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILDER_PACKAGING_TIMELINE_PREVIEW_LANGUAGE, buildBuilderPackagingTimelinePreviewStableKey };

const BUILDER_PACKAGING_TIMELINE_PREVIEW_SLUG = "builder-packaging-timeline-preview";

export function buildBuilderPackagingTimelinePreview(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILDER_PACKAGING_TIMELINE_PREVIEW_SLUG, input);
}

export function buildBuilderPackagingTimelinePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILDER_PACKAGING_TIMELINE_PREVIEW_SLUG);
}

export function buildBuilderPackagingTimelinePreviewBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuilderPackagingTimelinePreview(model: { builderPackagingTimelinePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILDER_PACKAGING_TIMELINE_PREVIEW_SLUG, model.builderPackagingTimelinePreviewItems);
}

export function buildBuilderPackagingTimelinePreviewModel() {
  const builderPackagingTimelinePreviewItems = buildBuilderPackagingTimelinePreviewItems();
  const builderPackagingTimelinePreviewModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILDER_PACKAGING_TIMELINE_PREVIEW_SLUG, builderPackagingTimelinePreviewItems);
  return { ...builderPackagingTimelinePreviewModel, builderPackagingTimelinePreviewItems };
}
