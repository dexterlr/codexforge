import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_BOUNDARY_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalBoundaryStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_BOUNDARY_LANGUAGE, buildBuildPlanApprovalBoundaryStableKey };

const BUILD_PLAN_APPROVAL_BOUNDARY_SLUG = "build-plan-approval-boundary";

export function buildBuildPlanApprovalBoundary(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_BOUNDARY_SLUG, input);
}

export function buildBuildPlanApprovalBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_BOUNDARY_SLUG);
}

export function buildBuildPlanApprovalBoundaryBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalBoundary(model: { buildPlanApprovalBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_BOUNDARY_SLUG, model.buildPlanApprovalBoundaryItems);
}

export function buildBuildPlanApprovalBoundaryModel() {
  const buildPlanApprovalBoundaryItems = buildBuildPlanApprovalBoundaryItems();
  const buildPlanApprovalBoundaryModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_BOUNDARY_SLUG, buildPlanApprovalBoundaryItems);
  return { ...buildPlanApprovalBoundaryModel, buildPlanApprovalBoundaryItems };
}
