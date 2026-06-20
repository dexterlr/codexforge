import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILDER_RESULT_TIMELINE_PREVIEW_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuilderResultTimelinePreviewStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILDER_RESULT_TIMELINE_PREVIEW_LANGUAGE, buildBuilderResultTimelinePreviewStableKey };

const BUILDER_RESULT_TIMELINE_PREVIEW_SLUG = "builder-result-timeline-preview";

export function buildBuilderResultTimelinePreview(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILDER_RESULT_TIMELINE_PREVIEW_SLUG, input);
}

export function buildBuilderResultTimelinePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILDER_RESULT_TIMELINE_PREVIEW_SLUG);
}

export function buildBuilderResultTimelinePreviewBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuilderResultTimelinePreview(model: { builderResultTimelinePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILDER_RESULT_TIMELINE_PREVIEW_SLUG, model.builderResultTimelinePreviewItems);
}

export function buildBuilderResultTimelinePreviewModel() {
  const builderResultTimelinePreviewItems = buildBuilderResultTimelinePreviewItems();
  const builderResultTimelinePreviewModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILDER_RESULT_TIMELINE_PREVIEW_SLUG, builderResultTimelinePreviewItems);
  return { ...builderResultTimelinePreviewModel, builderResultTimelinePreviewItems };
}
