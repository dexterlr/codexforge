import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_ADAPTER_HANDOFF_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedAdapterHandoffPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_ADAPTER_HANDOFF_PREVIEW_LANGUAGE, buildGuardedAdapterHandoffPreviewStableKey };

const GUARDED_ADAPTER_HANDOFF_PREVIEW_SLUG = "guarded-adapter-handoff-preview";

export function buildGuardedAdapterHandoffPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_ADAPTER_HANDOFF_PREVIEW_SLUG, input);
}

export function buildGuardedAdapterHandoffPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_ADAPTER_HANDOFF_PREVIEW_SLUG);
}

export function buildGuardedAdapterHandoffPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedAdapterHandoffPreview(model: { guardedAdapterHandoffPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_ADAPTER_HANDOFF_PREVIEW_SLUG, model.guardedAdapterHandoffPreviewItems);
}

export function buildGuardedAdapterHandoffPreviewModel() {
  const guardedAdapterHandoffPreviewItems = buildGuardedAdapterHandoffPreviewItems();
  const guardedAdapterHandoffPreviewModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_ADAPTER_HANDOFF_PREVIEW_SLUG, guardedAdapterHandoffPreviewItems);
  return { ...guardedAdapterHandoffPreviewModel, guardedAdapterHandoffPreviewItems };
}
