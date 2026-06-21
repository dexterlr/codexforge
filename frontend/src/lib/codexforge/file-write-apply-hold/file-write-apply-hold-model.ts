import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_APPLY_HOLD_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWriteApplyHoldStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_APPLY_HOLD_LANGUAGE, buildFileWriteApplyHoldStableKey };

const FILE_WRITE_APPLY_HOLD_SLUG = "file-write-apply-hold";

export function buildFileWriteApplyHold(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_APPLY_HOLD_SLUG, input);
}

export function buildFileWriteApplyHoldItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_APPLY_HOLD_SLUG);
}

export function buildFileWriteApplyHoldBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWriteApplyHold(model: { fileWriteApplyHoldItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_APPLY_HOLD_SLUG, model.fileWriteApplyHoldItems);
}

export function buildFileWriteApplyHoldModel() {
  const fileWriteApplyHoldItems = buildFileWriteApplyHoldItems();
  const fileWriteApplyHoldModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_APPLY_HOLD_SLUG, fileWriteApplyHoldItems);
  return { ...fileWriteApplyHoldModel, fileWriteApplyHoldItems };
}
