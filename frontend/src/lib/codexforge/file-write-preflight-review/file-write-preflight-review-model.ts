import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_PREFLIGHT_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWritePreflightReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_PREFLIGHT_REVIEW_LANGUAGE, buildFileWritePreflightReviewStableKey };

const FILE_WRITE_PREFLIGHT_REVIEW_SLUG = "file-write-preflight-review";

export function buildFileWritePreflightReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_PREFLIGHT_REVIEW_SLUG, input);
}

export function buildFileWritePreflightReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_PREFLIGHT_REVIEW_SLUG);
}

export function buildFileWritePreflightReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWritePreflightReview(model: { fileWritePreflightReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_PREFLIGHT_REVIEW_SLUG, model.fileWritePreflightReviewItems);
}

export function buildFileWritePreflightReviewModel() {
  const fileWritePreflightReviewItems = buildFileWritePreflightReviewItems();
  const fileWritePreflightReviewModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_PREFLIGHT_REVIEW_SLUG, fileWritePreflightReviewItems);
  return { ...fileWritePreflightReviewModel, fileWritePreflightReviewItems };
}
