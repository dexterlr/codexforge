import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_PACKAGING_PLAN_PREVIEW_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectPackagingPlanPreviewStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_PACKAGING_PLAN_PREVIEW_LANGUAGE, buildProjectPackagingPlanPreviewStableKey };

const PROJECT_PACKAGING_PLAN_PREVIEW_SLUG = "project-packaging-plan-preview";

export function buildProjectPackagingPlanPreview(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_PACKAGING_PLAN_PREVIEW_SLUG, input);
}

export function buildProjectPackagingPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_PACKAGING_PLAN_PREVIEW_SLUG);
}

export function buildProjectPackagingPlanPreviewBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectPackagingPlanPreview(model: { projectPackagingPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_PACKAGING_PLAN_PREVIEW_SLUG, model.projectPackagingPlanPreviewItems);
}

export function buildProjectPackagingPlanPreviewModel() {
  const projectPackagingPlanPreviewItems = buildProjectPackagingPlanPreviewItems();
  const projectPackagingPlanPreviewModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_PACKAGING_PLAN_PREVIEW_SLUG, projectPackagingPlanPreviewItems);
  return { ...projectPackagingPlanPreviewModel, projectPackagingPlanPreviewItems };
}
