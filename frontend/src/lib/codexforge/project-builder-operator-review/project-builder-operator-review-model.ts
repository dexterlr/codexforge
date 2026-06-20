import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_BUILDER_OPERATOR_REVIEW_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectBuilderOperatorReviewStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_BUILDER_OPERATOR_REVIEW_LANGUAGE, buildProjectBuilderOperatorReviewStableKey };

const PROJECT_BUILDER_OPERATOR_REVIEW_SLUG = "project-builder-operator-review";

export function buildProjectBuilderOperatorReview(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_BUILDER_OPERATOR_REVIEW_SLUG, input);
}

export function buildProjectBuilderOperatorReviewItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_BUILDER_OPERATOR_REVIEW_SLUG);
}

export function buildProjectBuilderOperatorReviewBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectBuilderOperatorReview(model: { projectBuilderOperatorReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_BUILDER_OPERATOR_REVIEW_SLUG, model.projectBuilderOperatorReviewItems);
}

export function buildProjectBuilderOperatorReviewModel() {
  const projectBuilderOperatorReviewItems = buildProjectBuilderOperatorReviewItems();
  const projectBuilderOperatorReviewModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_BUILDER_OPERATOR_REVIEW_SLUG, projectBuilderOperatorReviewItems);
  return { ...projectBuilderOperatorReviewModel, projectBuilderOperatorReviewItems };
}
