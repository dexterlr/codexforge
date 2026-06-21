import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_EXECUTION_HOLD_RELEASE_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunExecutionHoldReleasePreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_EXECUTION_HOLD_RELEASE_PREVIEW_LANGUAGE, buildDryRunExecutionHoldReleasePreviewStableKey };

const DRY_RUN_EXECUTION_HOLD_RELEASE_PREVIEW_SLUG = "dry-run-execution-hold-release-preview";

export function buildDryRunExecutionHoldReleasePreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_EXECUTION_HOLD_RELEASE_PREVIEW_SLUG, input);
}

export function buildDryRunExecutionHoldReleasePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_EXECUTION_HOLD_RELEASE_PREVIEW_SLUG);
}

export function buildDryRunExecutionHoldReleasePreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunExecutionHoldReleasePreview(model: { dryRunExecutionHoldReleasePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_EXECUTION_HOLD_RELEASE_PREVIEW_SLUG, model.dryRunExecutionHoldReleasePreviewItems);
}

export function buildDryRunExecutionHoldReleasePreviewModel() {
  const dryRunExecutionHoldReleasePreviewItems = buildDryRunExecutionHoldReleasePreviewItems();
  const dryRunExecutionHoldReleasePreviewModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_EXECUTION_HOLD_RELEASE_PREVIEW_SLUG, dryRunExecutionHoldReleasePreviewItems);
  return { ...dryRunExecutionHoldReleasePreviewModel, dryRunExecutionHoldReleasePreviewItems };
}
