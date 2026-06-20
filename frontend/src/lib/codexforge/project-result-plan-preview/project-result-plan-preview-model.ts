import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_RESULT_PLAN_PREVIEW_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectResultPlanPreviewStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_RESULT_PLAN_PREVIEW_LANGUAGE, buildProjectResultPlanPreviewStableKey };

const PROJECT_RESULT_PLAN_PREVIEW_SLUG = "project-result-plan-preview";

export function buildProjectResultPlanPreview(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_RESULT_PLAN_PREVIEW_SLUG, input);
}

export function buildProjectResultPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_RESULT_PLAN_PREVIEW_SLUG);
}

export function buildProjectResultPlanPreviewBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectResultPlanPreview(model: { projectResultPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_RESULT_PLAN_PREVIEW_SLUG, model.projectResultPlanPreviewItems);
}

export function buildProjectResultPlanPreviewModel() {
  const projectResultPlanPreviewItems = buildProjectResultPlanPreviewItems();
  const projectResultPlanPreviewModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_RESULT_PLAN_PREVIEW_SLUG, projectResultPlanPreviewItems);
  return { ...projectResultPlanPreviewModel, projectResultPlanPreviewItems };
}
