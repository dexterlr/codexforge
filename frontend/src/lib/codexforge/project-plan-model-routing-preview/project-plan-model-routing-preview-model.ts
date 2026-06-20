import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_PLAN_MODEL_ROUTING_PREVIEW_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectPlanModelRoutingPreviewStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_PLAN_MODEL_ROUTING_PREVIEW_LANGUAGE, buildProjectPlanModelRoutingPreviewStableKey };

const PROJECT_PLAN_MODEL_ROUTING_PREVIEW_SLUG = "project-plan-model-routing-preview";

export function buildProjectPlanModelRoutingPreview(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_PLAN_MODEL_ROUTING_PREVIEW_SLUG, input);
}

export function buildProjectPlanModelRoutingPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_PLAN_MODEL_ROUTING_PREVIEW_SLUG);
}

export function buildProjectPlanModelRoutingPreviewBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectPlanModelRoutingPreview(model: { projectPlanModelRoutingPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_PLAN_MODEL_ROUTING_PREVIEW_SLUG, model.projectPlanModelRoutingPreviewItems);
}

export function buildProjectPlanModelRoutingPreviewModel() {
  const projectPlanModelRoutingPreviewItems = buildProjectPlanModelRoutingPreviewItems();
  const projectPlanModelRoutingPreviewModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_PLAN_MODEL_ROUTING_PREVIEW_SLUG, projectPlanModelRoutingPreviewItems);
  return { ...projectPlanModelRoutingPreviewModel, projectPlanModelRoutingPreviewItems };
}
