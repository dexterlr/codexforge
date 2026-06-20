import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_EVIDENCE_PLAN_PREVIEW_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectEvidencePlanPreviewStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_EVIDENCE_PLAN_PREVIEW_LANGUAGE, buildProjectEvidencePlanPreviewStableKey };

const PROJECT_EVIDENCE_PLAN_PREVIEW_SLUG = "project-evidence-plan-preview";

export function buildProjectEvidencePlanPreview(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_EVIDENCE_PLAN_PREVIEW_SLUG, input);
}

export function buildProjectEvidencePlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_EVIDENCE_PLAN_PREVIEW_SLUG);
}

export function buildProjectEvidencePlanPreviewBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectEvidencePlanPreview(model: { projectEvidencePlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_EVIDENCE_PLAN_PREVIEW_SLUG, model.projectEvidencePlanPreviewItems);
}

export function buildProjectEvidencePlanPreviewModel() {
  const projectEvidencePlanPreviewItems = buildProjectEvidencePlanPreviewItems();
  const projectEvidencePlanPreviewModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_EVIDENCE_PLAN_PREVIEW_SLUG, projectEvidencePlanPreviewItems);
  return { ...projectEvidencePlanPreviewModel, projectEvidencePlanPreviewItems };
}
