import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_RESULT_HANDOFF_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedResultHandoffPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_RESULT_HANDOFF_PREVIEW_LANGUAGE, buildGuardedResultHandoffPreviewStableKey };

const GUARDED_RESULT_HANDOFF_PREVIEW_SLUG = "guarded-result-handoff-preview";

export function buildGuardedResultHandoffPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_RESULT_HANDOFF_PREVIEW_SLUG, input);
}

export function buildGuardedResultHandoffPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_RESULT_HANDOFF_PREVIEW_SLUG);
}

export function buildGuardedResultHandoffPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedResultHandoffPreview(model: { guardedResultHandoffPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_RESULT_HANDOFF_PREVIEW_SLUG, model.guardedResultHandoffPreviewItems);
}

export function buildGuardedResultHandoffPreviewModel() {
  const guardedResultHandoffPreviewItems = buildGuardedResultHandoffPreviewItems();
  const guardedResultHandoffPreviewModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_RESULT_HANDOFF_PREVIEW_SLUG, guardedResultHandoffPreviewItems);
  return { ...guardedResultHandoffPreviewModel, guardedResultHandoffPreviewItems };
}
