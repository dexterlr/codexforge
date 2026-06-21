import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_DIFF_BUILDER_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWriteDiffBuilderStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_DIFF_BUILDER_LANGUAGE, buildFileWriteDiffBuilderStableKey };

const FILE_WRITE_DIFF_BUILDER_SLUG = "file-write-diff-builder";

export function buildFileWriteDiffBuilder(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_DIFF_BUILDER_SLUG, input);
}

export function buildFileWriteDiffBuilderItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_DIFF_BUILDER_SLUG);
}

export function buildFileWriteDiffBuilderBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWriteDiffBuilder(model: { fileWriteDiffBuilderItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_DIFF_BUILDER_SLUG, model.fileWriteDiffBuilderItems);
}

export function buildFileWriteDiffBuilderModel() {
  const fileWriteDiffBuilderItems = buildFileWriteDiffBuilderItems();
  const fileWriteDiffBuilderModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_DIFF_BUILDER_SLUG, fileWriteDiffBuilderItems);
  return { ...fileWriteDiffBuilderModel, fileWriteDiffBuilderItems };
}
