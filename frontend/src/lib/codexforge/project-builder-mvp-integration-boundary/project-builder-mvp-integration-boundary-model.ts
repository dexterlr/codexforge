import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_BUILDER_MVP_INTEGRATION_BOUNDARY_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectBuilderMvpIntegrationBoundaryStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_BUILDER_MVP_INTEGRATION_BOUNDARY_LANGUAGE, buildProjectBuilderMvpIntegrationBoundaryStableKey };

const PROJECT_BUILDER_MVP_INTEGRATION_BOUNDARY_SLUG = "project-builder-mvp-integration-boundary";

export function buildProjectBuilderMvpIntegrationBoundary(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_BUILDER_MVP_INTEGRATION_BOUNDARY_SLUG, input);
}

export function buildProjectBuilderMvpIntegrationBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_BUILDER_MVP_INTEGRATION_BOUNDARY_SLUG);
}

export function buildProjectBuilderMvpIntegrationBoundaryBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectBuilderMvpIntegrationBoundary(model: { projectBuilderMvpIntegrationBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_BUILDER_MVP_INTEGRATION_BOUNDARY_SLUG, model.projectBuilderMvpIntegrationBoundaryItems);
}

export function buildProjectBuilderMvpIntegrationBoundaryModel() {
  const projectBuilderMvpIntegrationBoundaryItems = buildProjectBuilderMvpIntegrationBoundaryItems();
  const projectBuilderMvpIntegrationBoundaryModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_BUILDER_MVP_INTEGRATION_BOUNDARY_SLUG, projectBuilderMvpIntegrationBoundaryItems);
  return { ...projectBuilderMvpIntegrationBoundaryModel, projectBuilderMvpIntegrationBoundaryItems };
}
