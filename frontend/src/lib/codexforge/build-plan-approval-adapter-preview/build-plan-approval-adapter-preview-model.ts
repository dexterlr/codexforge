import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_ADAPTER_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalAdapterPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_ADAPTER_PREVIEW_LANGUAGE, buildBuildPlanApprovalAdapterPreviewStableKey };

const BUILD_PLAN_APPROVAL_ADAPTER_PREVIEW_SLUG = "build-plan-approval-adapter-preview";

export function buildBuildPlanApprovalAdapterPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_ADAPTER_PREVIEW_SLUG, input);
}

export function buildBuildPlanApprovalAdapterPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_ADAPTER_PREVIEW_SLUG);
}

export function buildBuildPlanApprovalAdapterPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalAdapterPreview(model: { buildPlanApprovalAdapterPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_ADAPTER_PREVIEW_SLUG, model.buildPlanApprovalAdapterPreviewItems);
}

export function buildBuildPlanApprovalAdapterPreviewModel() {
  const buildPlanApprovalAdapterPreviewItems = buildBuildPlanApprovalAdapterPreviewItems();
  const buildPlanApprovalAdapterPreviewModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_ADAPTER_PREVIEW_SLUG, buildPlanApprovalAdapterPreviewItems);
  return { ...buildPlanApprovalAdapterPreviewModel, buildPlanApprovalAdapterPreviewItems };
}
