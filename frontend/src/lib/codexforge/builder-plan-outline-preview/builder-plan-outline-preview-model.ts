import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILDER_PLAN_OUTLINE_PREVIEW_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuilderPlanOutlinePreviewStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILDER_PLAN_OUTLINE_PREVIEW_LANGUAGE, buildBuilderPlanOutlinePreviewStableKey };

const BUILDER_PLAN_OUTLINE_PREVIEW_SLUG = "builder-plan-outline-preview";

export function buildBuilderPlanOutlinePreview(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILDER_PLAN_OUTLINE_PREVIEW_SLUG, input);
}

export function buildBuilderPlanOutlinePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILDER_PLAN_OUTLINE_PREVIEW_SLUG);
}

export function buildBuilderPlanOutlinePreviewBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuilderPlanOutlinePreview(model: { builderPlanOutlinePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILDER_PLAN_OUTLINE_PREVIEW_SLUG, model.builderPlanOutlinePreviewItems);
}

export function buildBuilderPlanOutlinePreviewModel() {
  const builderPlanOutlinePreviewItems = buildBuilderPlanOutlinePreviewItems();
  const builderPlanOutlinePreviewModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILDER_PLAN_OUTLINE_PREVIEW_SLUG, builderPlanOutlinePreviewItems);
  return { ...builderPlanOutlinePreviewModel, builderPlanOutlinePreviewItems };
}
