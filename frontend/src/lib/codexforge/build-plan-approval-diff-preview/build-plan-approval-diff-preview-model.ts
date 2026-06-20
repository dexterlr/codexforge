import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_DIFF_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalDiffPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_DIFF_PREVIEW_LANGUAGE, buildBuildPlanApprovalDiffPreviewStableKey };

const BUILD_PLAN_APPROVAL_DIFF_PREVIEW_SLUG = "build-plan-approval-diff-preview";

export function buildBuildPlanApprovalDiffPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_DIFF_PREVIEW_SLUG, input);
}

export function buildBuildPlanApprovalDiffPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_DIFF_PREVIEW_SLUG);
}

export function buildBuildPlanApprovalDiffPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalDiffPreview(model: { buildPlanApprovalDiffPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_DIFF_PREVIEW_SLUG, model.buildPlanApprovalDiffPreviewItems);
}

export function buildBuildPlanApprovalDiffPreviewModel() {
  const buildPlanApprovalDiffPreviewItems = buildBuildPlanApprovalDiffPreviewItems();
  const buildPlanApprovalDiffPreviewModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_DIFF_PREVIEW_SLUG, buildPlanApprovalDiffPreviewItems);
  return { ...buildPlanApprovalDiffPreviewModel, buildPlanApprovalDiffPreviewItems };
}
