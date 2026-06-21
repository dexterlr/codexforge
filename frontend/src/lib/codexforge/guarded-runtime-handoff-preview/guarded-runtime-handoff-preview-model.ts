import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_RUNTIME_HANDOFF_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedRuntimeHandoffPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_RUNTIME_HANDOFF_PREVIEW_LANGUAGE, buildGuardedRuntimeHandoffPreviewStableKey };

const GUARDED_RUNTIME_HANDOFF_PREVIEW_SLUG = "guarded-runtime-handoff-preview";

export function buildGuardedRuntimeHandoffPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_RUNTIME_HANDOFF_PREVIEW_SLUG, input);
}

export function buildGuardedRuntimeHandoffPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_RUNTIME_HANDOFF_PREVIEW_SLUG);
}

export function buildGuardedRuntimeHandoffPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedRuntimeHandoffPreview(model: { guardedRuntimeHandoffPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_RUNTIME_HANDOFF_PREVIEW_SLUG, model.guardedRuntimeHandoffPreviewItems);
}

export function buildGuardedRuntimeHandoffPreviewModel() {
  const guardedRuntimeHandoffPreviewItems = buildGuardedRuntimeHandoffPreviewItems();
  const guardedRuntimeHandoffPreviewModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_RUNTIME_HANDOFF_PREVIEW_SLUG, guardedRuntimeHandoffPreviewItems);
  return { ...guardedRuntimeHandoffPreviewModel, guardedRuntimeHandoffPreviewItems };
}
