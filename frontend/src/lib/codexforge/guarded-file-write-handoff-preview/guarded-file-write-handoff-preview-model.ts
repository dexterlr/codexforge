import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_FILE_WRITE_HANDOFF_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedFileWriteHandoffPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_FILE_WRITE_HANDOFF_PREVIEW_LANGUAGE, buildGuardedFileWriteHandoffPreviewStableKey };

const GUARDED_FILE_WRITE_HANDOFF_PREVIEW_SLUG = "guarded-file-write-handoff-preview";

export function buildGuardedFileWriteHandoffPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_FILE_WRITE_HANDOFF_PREVIEW_SLUG, input);
}

export function buildGuardedFileWriteHandoffPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_FILE_WRITE_HANDOFF_PREVIEW_SLUG);
}

export function buildGuardedFileWriteHandoffPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedFileWriteHandoffPreview(model: { guardedFileWriteHandoffPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_FILE_WRITE_HANDOFF_PREVIEW_SLUG, model.guardedFileWriteHandoffPreviewItems);
}

export function buildGuardedFileWriteHandoffPreviewModel() {
  const guardedFileWriteHandoffPreviewItems = buildGuardedFileWriteHandoffPreviewItems();
  const guardedFileWriteHandoffPreviewModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_FILE_WRITE_HANDOFF_PREVIEW_SLUG, guardedFileWriteHandoffPreviewItems);
  return { ...guardedFileWriteHandoffPreviewModel, guardedFileWriteHandoffPreviewItems };
}
