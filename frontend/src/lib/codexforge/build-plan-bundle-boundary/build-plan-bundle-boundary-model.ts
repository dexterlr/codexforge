import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_BUNDLE_BOUNDARY_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanBundleBoundaryStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_BUNDLE_BOUNDARY_LANGUAGE, buildBuildPlanBundleBoundaryStableKey };

const BUILD_PLAN_BUNDLE_BOUNDARY_SLUG = "build-plan-bundle-boundary";

export function buildBuildPlanBundleBoundary(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_BUNDLE_BOUNDARY_SLUG, input);
}

export function buildBuildPlanBundleBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_BUNDLE_BOUNDARY_SLUG);
}

export function buildBuildPlanBundleBoundaryBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanBundleBoundary(model: { buildPlanBundleBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_BUNDLE_BOUNDARY_SLUG, model.buildPlanBundleBoundaryItems);
}

export function buildBuildPlanBundleBoundaryModel() {
  const buildPlanBundleBoundaryItems = buildBuildPlanBundleBoundaryItems();
  const buildPlanBundleBoundaryModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_BUNDLE_BOUNDARY_SLUG, buildPlanBundleBoundaryItems);
  return { ...buildPlanBundleBoundaryModel, buildPlanBundleBoundaryItems };
}
