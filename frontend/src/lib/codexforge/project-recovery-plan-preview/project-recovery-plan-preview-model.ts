import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_RECOVERY_PLAN_PREVIEW_LANGUAGE,
  buildProjectBuilderMvpReview,
  buildProjectBuilderMvpReviewBoundary,
  buildProjectBuilderMvpReviewModelForSlug,
  buildProjectBuilderMvpReviewPackets,
  buildProjectBuilderMvpReviewStableKey as buildProjectRecoveryPlanPreviewStableKey,
  summarizeProjectBuilderMvpReviewForSlug,
  type ProjectBuilderMvpReviewPacketInput,
} from "../project-builder-mvp-preview-kit";

export { PROJECT_RECOVERY_PLAN_PREVIEW_LANGUAGE, buildProjectRecoveryPlanPreviewStableKey };

const PROJECT_RECOVERY_PLAN_PREVIEW_SLUG = "project-recovery-plan-preview";

export function buildProjectRecoveryPlanPreview(input: ProjectBuilderMvpReviewPacketInput): UniversalExecutionReviewPacket {
  return buildProjectBuilderMvpReview(PROJECT_RECOVERY_PLAN_PREVIEW_SLUG, input);
}

export function buildProjectRecoveryPlanPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildProjectBuilderMvpReviewPackets(PROJECT_RECOVERY_PLAN_PREVIEW_SLUG);
}

export function buildProjectRecoveryPlanPreviewBoundary() {
  return buildProjectBuilderMvpReviewBoundary();
}

export function summarizeProjectRecoveryPlanPreview(model: { projectRecoveryPlanPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeProjectBuilderMvpReviewForSlug(PROJECT_RECOVERY_PLAN_PREVIEW_SLUG, model.projectRecoveryPlanPreviewItems);
}

export function buildProjectRecoveryPlanPreviewModel() {
  const projectRecoveryPlanPreviewItems = buildProjectRecoveryPlanPreviewItems();
  const projectRecoveryPlanPreviewModel = buildProjectBuilderMvpReviewModelForSlug(PROJECT_RECOVERY_PLAN_PREVIEW_SLUG, projectRecoveryPlanPreviewItems);
  return { ...projectRecoveryPlanPreviewModel, projectRecoveryPlanPreviewItems };
}
