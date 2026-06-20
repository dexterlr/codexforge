import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_COMMAND_PLAN_PREVIEW_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectCommandPlanPreviewStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_COMMAND_PLAN_PREVIEW_LANGUAGE, buildProjectCommandPlanPreviewStableKey };

const PROJECT_COMMAND_PLAN_PREVIEW_SLUG = "project-command-plan-preview";

export function buildProjectCommandPlanPreview(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_COMMAND_PLAN_PREVIEW_SLUG, input);
}

export function buildProjectCommandPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_COMMAND_PLAN_PREVIEW_SLUG);
}

export function buildProjectCommandPlanPreviewBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectCommandPlanPreview(model: { projectCommandPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_COMMAND_PLAN_PREVIEW_SLUG, model.projectCommandPlanPreviewItems);
}

export function buildProjectCommandPlanPreviewModel() {
  const projectCommandPlanPreviewItems = buildProjectCommandPlanPreviewItems();
  const projectCommandPlanPreviewModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_COMMAND_PLAN_PREVIEW_SLUG, projectCommandPlanPreviewItems);
  return { ...projectCommandPlanPreviewModel, projectCommandPlanPreviewItems };
}
