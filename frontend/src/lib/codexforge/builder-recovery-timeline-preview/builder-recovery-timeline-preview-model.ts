import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILDER_RECOVERY_TIMELINE_PREVIEW_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuilderRecoveryTimelinePreviewStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILDER_RECOVERY_TIMELINE_PREVIEW_LANGUAGE, buildBuilderRecoveryTimelinePreviewStableKey };

const BUILDER_RECOVERY_TIMELINE_PREVIEW_SLUG = "builder-recovery-timeline-preview";

export function buildBuilderRecoveryTimelinePreview(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILDER_RECOVERY_TIMELINE_PREVIEW_SLUG, input);
}

export function buildBuilderRecoveryTimelinePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILDER_RECOVERY_TIMELINE_PREVIEW_SLUG);
}

export function buildBuilderRecoveryTimelinePreviewBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuilderRecoveryTimelinePreview(model: { builderRecoveryTimelinePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILDER_RECOVERY_TIMELINE_PREVIEW_SLUG, model.builderRecoveryTimelinePreviewItems);
}

export function buildBuilderRecoveryTimelinePreviewModel() {
  const builderRecoveryTimelinePreviewItems = buildBuilderRecoveryTimelinePreviewItems();
  const builderRecoveryTimelinePreviewModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILDER_RECOVERY_TIMELINE_PREVIEW_SLUG, builderRecoveryTimelinePreviewItems);
  return { ...builderRecoveryTimelinePreviewModel, builderRecoveryTimelinePreviewItems };
}
