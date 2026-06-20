import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_FILE_PLAN_PREVIEW_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectFilePlanPreviewStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_FILE_PLAN_PREVIEW_LANGUAGE, buildProjectFilePlanPreviewStableKey };

const PROJECT_FILE_PLAN_PREVIEW_SLUG = "project-file-plan-preview";

export function buildProjectFilePlanPreview(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_FILE_PLAN_PREVIEW_SLUG, input);
}

export function buildProjectFilePlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_FILE_PLAN_PREVIEW_SLUG);
}

export function buildProjectFilePlanPreviewBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectFilePlanPreview(model: { projectFilePlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_FILE_PLAN_PREVIEW_SLUG, model.projectFilePlanPreviewItems);
}

export function buildProjectFilePlanPreviewModel() {
  const projectFilePlanPreviewItems = buildProjectFilePlanPreviewItems();
  const projectFilePlanPreviewModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_FILE_PLAN_PREVIEW_SLUG, projectFilePlanPreviewItems);
  return { ...projectFilePlanPreviewModel, projectFilePlanPreviewItems };
}
