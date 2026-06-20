import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_RUNTIME_PLAN_PREVIEW_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectRuntimePlanPreviewStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_RUNTIME_PLAN_PREVIEW_LANGUAGE, buildProjectRuntimePlanPreviewStableKey };

const PROJECT_RUNTIME_PLAN_PREVIEW_SLUG = "project-runtime-plan-preview";

export function buildProjectRuntimePlanPreview(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_RUNTIME_PLAN_PREVIEW_SLUG, input);
}

export function buildProjectRuntimePlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_RUNTIME_PLAN_PREVIEW_SLUG);
}

export function buildProjectRuntimePlanPreviewBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectRuntimePlanPreview(model: { projectRuntimePlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_RUNTIME_PLAN_PREVIEW_SLUG, model.projectRuntimePlanPreviewItems);
}

export function buildProjectRuntimePlanPreviewModel() {
  const projectRuntimePlanPreviewItems = buildProjectRuntimePlanPreviewItems();
  const projectRuntimePlanPreviewModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_RUNTIME_PLAN_PREVIEW_SLUG, projectRuntimePlanPreviewItems);
  return { ...projectRuntimePlanPreviewModel, projectRuntimePlanPreviewItems };
}
