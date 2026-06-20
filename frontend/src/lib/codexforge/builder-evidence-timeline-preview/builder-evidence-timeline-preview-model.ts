import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILDER_EVIDENCE_TIMELINE_PREVIEW_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuilderEvidenceTimelinePreviewStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILDER_EVIDENCE_TIMELINE_PREVIEW_LANGUAGE, buildBuilderEvidenceTimelinePreviewStableKey };

const BUILDER_EVIDENCE_TIMELINE_PREVIEW_SLUG = "builder-evidence-timeline-preview";

export function buildBuilderEvidenceTimelinePreview(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILDER_EVIDENCE_TIMELINE_PREVIEW_SLUG, input);
}

export function buildBuilderEvidenceTimelinePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILDER_EVIDENCE_TIMELINE_PREVIEW_SLUG);
}

export function buildBuilderEvidenceTimelinePreviewBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuilderEvidenceTimelinePreview(model: { builderEvidenceTimelinePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILDER_EVIDENCE_TIMELINE_PREVIEW_SLUG, model.builderEvidenceTimelinePreviewItems);
}

export function buildBuilderEvidenceTimelinePreviewModel() {
  const builderEvidenceTimelinePreviewItems = buildBuilderEvidenceTimelinePreviewItems();
  const builderEvidenceTimelinePreviewModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILDER_EVIDENCE_TIMELINE_PREVIEW_SLUG, builderEvidenceTimelinePreviewItems);
  return { ...builderEvidenceTimelinePreviewModel, builderEvidenceTimelinePreviewItems };
}
