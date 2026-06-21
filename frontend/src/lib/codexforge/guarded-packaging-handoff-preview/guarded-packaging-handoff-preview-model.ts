import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_PACKAGING_HANDOFF_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedPackagingHandoffPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_PACKAGING_HANDOFF_PREVIEW_LANGUAGE, buildGuardedPackagingHandoffPreviewStableKey };

const GUARDED_PACKAGING_HANDOFF_PREVIEW_SLUG = "guarded-packaging-handoff-preview";

export function buildGuardedPackagingHandoffPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_PACKAGING_HANDOFF_PREVIEW_SLUG, input);
}

export function buildGuardedPackagingHandoffPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_PACKAGING_HANDOFF_PREVIEW_SLUG);
}

export function buildGuardedPackagingHandoffPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedPackagingHandoffPreview(model: { guardedPackagingHandoffPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_PACKAGING_HANDOFF_PREVIEW_SLUG, model.guardedPackagingHandoffPreviewItems);
}

export function buildGuardedPackagingHandoffPreviewModel() {
  const guardedPackagingHandoffPreviewItems = buildGuardedPackagingHandoffPreviewItems();
  const guardedPackagingHandoffPreviewModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_PACKAGING_HANDOFF_PREVIEW_SLUG, guardedPackagingHandoffPreviewItems);
  return { ...guardedPackagingHandoffPreviewModel, guardedPackagingHandoffPreviewItems };
}
