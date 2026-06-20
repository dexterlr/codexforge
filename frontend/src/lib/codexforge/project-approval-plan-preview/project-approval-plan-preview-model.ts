import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_APPROVAL_PLAN_PREVIEW_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectApprovalPlanPreviewStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_APPROVAL_PLAN_PREVIEW_LANGUAGE, buildProjectApprovalPlanPreviewStableKey };

const PROJECT_APPROVAL_PLAN_PREVIEW_SLUG = "project-approval-plan-preview";

export function buildProjectApprovalPlanPreview(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_APPROVAL_PLAN_PREVIEW_SLUG, input);
}

export function buildProjectApprovalPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_APPROVAL_PLAN_PREVIEW_SLUG);
}

export function buildProjectApprovalPlanPreviewBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectApprovalPlanPreview(model: { projectApprovalPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_APPROVAL_PLAN_PREVIEW_SLUG, model.projectApprovalPlanPreviewItems);
}

export function buildProjectApprovalPlanPreviewModel() {
  const projectApprovalPlanPreviewItems = buildProjectApprovalPlanPreviewItems();
  const projectApprovalPlanPreviewModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_APPROVAL_PLAN_PREVIEW_SLUG, projectApprovalPlanPreviewItems);
  return { ...projectApprovalPlanPreviewModel, projectApprovalPlanPreviewItems };
}
