import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_DRY_RUN_HARNESS_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWriteDryRunHarnessStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_DRY_RUN_HARNESS_LANGUAGE, buildFileWriteDryRunHarnessStableKey };

const FILE_WRITE_DRY_RUN_HARNESS_SLUG = "file-write-dry-run-harness";

export function buildFileWriteDryRunHarness(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_DRY_RUN_HARNESS_SLUG, input);
}

export function buildFileWriteDryRunHarnessItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_DRY_RUN_HARNESS_SLUG);
}

export function buildFileWriteDryRunHarnessBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWriteDryRunHarness(model: { fileWriteDryRunHarnessItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_DRY_RUN_HARNESS_SLUG, model.fileWriteDryRunHarnessItems);
}

export function buildFileWriteDryRunHarnessModel() {
  const fileWriteDryRunHarnessItems = buildFileWriteDryRunHarnessItems();
  const fileWriteDryRunHarnessModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_DRY_RUN_HARNESS_SLUG, fileWriteDryRunHarnessItems);
  return { ...fileWriteDryRunHarnessModel, fileWriteDryRunHarnessItems };
}
