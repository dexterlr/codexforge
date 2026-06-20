import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_DOMAIN_CLASSIFIER_PREVIEW_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectDomainClassifierPreviewStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_DOMAIN_CLASSIFIER_PREVIEW_LANGUAGE, buildProjectDomainClassifierPreviewStableKey };

const PROJECT_DOMAIN_CLASSIFIER_PREVIEW_SLUG = "project-domain-classifier-preview";

export function buildProjectDomainClassifierPreview(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_DOMAIN_CLASSIFIER_PREVIEW_SLUG, input);
}

export function buildProjectDomainClassifierPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_DOMAIN_CLASSIFIER_PREVIEW_SLUG);
}

export function buildProjectDomainClassifierPreviewBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectDomainClassifierPreview(model: { projectDomainClassifierPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_DOMAIN_CLASSIFIER_PREVIEW_SLUG, model.projectDomainClassifierPreviewItems);
}

export function buildProjectDomainClassifierPreviewModel() {
  const projectDomainClassifierPreviewItems = buildProjectDomainClassifierPreviewItems();
  const projectDomainClassifierPreviewModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_DOMAIN_CLASSIFIER_PREVIEW_SLUG, projectDomainClassifierPreviewItems);
  return { ...projectDomainClassifierPreviewModel, projectDomainClassifierPreviewItems };
}
