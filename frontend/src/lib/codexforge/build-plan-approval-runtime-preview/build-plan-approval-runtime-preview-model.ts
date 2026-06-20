import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_RUNTIME_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalRuntimePreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_RUNTIME_PREVIEW_LANGUAGE, buildBuildPlanApprovalRuntimePreviewStableKey };

const BUILD_PLAN_APPROVAL_RUNTIME_PREVIEW_SLUG = "build-plan-approval-runtime-preview";

export function buildBuildPlanApprovalRuntimePreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_RUNTIME_PREVIEW_SLUG, input);
}

export function buildBuildPlanApprovalRuntimePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_RUNTIME_PREVIEW_SLUG);
}

export function buildBuildPlanApprovalRuntimePreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalRuntimePreview(model: { buildPlanApprovalRuntimePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_RUNTIME_PREVIEW_SLUG, model.buildPlanApprovalRuntimePreviewItems);
}

export function buildBuildPlanApprovalRuntimePreviewModel() {
  const buildPlanApprovalRuntimePreviewItems = buildBuildPlanApprovalRuntimePreviewItems();
  const buildPlanApprovalRuntimePreviewModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_RUNTIME_PREVIEW_SLUG, buildPlanApprovalRuntimePreviewItems);
  return { ...buildPlanApprovalRuntimePreviewModel, buildPlanApprovalRuntimePreviewItems };
}
