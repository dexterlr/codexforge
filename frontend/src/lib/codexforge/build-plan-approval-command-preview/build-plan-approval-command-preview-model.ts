import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_COMMAND_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalCommandPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_COMMAND_PREVIEW_LANGUAGE, buildBuildPlanApprovalCommandPreviewStableKey };

const BUILD_PLAN_APPROVAL_COMMAND_PREVIEW_SLUG = "build-plan-approval-command-preview";

export function buildBuildPlanApprovalCommandPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_COMMAND_PREVIEW_SLUG, input);
}

export function buildBuildPlanApprovalCommandPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_COMMAND_PREVIEW_SLUG);
}

export function buildBuildPlanApprovalCommandPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalCommandPreview(model: { buildPlanApprovalCommandPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_COMMAND_PREVIEW_SLUG, model.buildPlanApprovalCommandPreviewItems);
}

export function buildBuildPlanApprovalCommandPreviewModel() {
  const buildPlanApprovalCommandPreviewItems = buildBuildPlanApprovalCommandPreviewItems();
  const buildPlanApprovalCommandPreviewModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_COMMAND_PREVIEW_SLUG, buildPlanApprovalCommandPreviewItems);
  return { ...buildPlanApprovalCommandPreviewModel, buildPlanApprovalCommandPreviewItems };
}
