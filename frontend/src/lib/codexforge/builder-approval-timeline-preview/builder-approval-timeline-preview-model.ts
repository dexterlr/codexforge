import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILDER_APPROVAL_TIMELINE_PREVIEW_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuilderApprovalTimelinePreviewStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILDER_APPROVAL_TIMELINE_PREVIEW_LANGUAGE, buildBuilderApprovalTimelinePreviewStableKey };

const BUILDER_APPROVAL_TIMELINE_PREVIEW_SLUG = "builder-approval-timeline-preview";

export function buildBuilderApprovalTimelinePreview(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILDER_APPROVAL_TIMELINE_PREVIEW_SLUG, input);
}

export function buildBuilderApprovalTimelinePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILDER_APPROVAL_TIMELINE_PREVIEW_SLUG);
}

export function buildBuilderApprovalTimelinePreviewBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuilderApprovalTimelinePreview(model: { builderApprovalTimelinePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILDER_APPROVAL_TIMELINE_PREVIEW_SLUG, model.builderApprovalTimelinePreviewItems);
}

export function buildBuilderApprovalTimelinePreviewModel() {
  const builderApprovalTimelinePreviewItems = buildBuilderApprovalTimelinePreviewItems();
  const builderApprovalTimelinePreviewModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILDER_APPROVAL_TIMELINE_PREVIEW_SLUG, builderApprovalTimelinePreviewItems);
  return { ...builderApprovalTimelinePreviewModel, builderApprovalTimelinePreviewItems };
}
