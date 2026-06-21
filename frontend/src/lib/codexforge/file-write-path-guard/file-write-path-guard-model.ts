import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_PATH_GUARD_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWritePathGuardStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_PATH_GUARD_LANGUAGE, buildFileWritePathGuardStableKey };

const FILE_WRITE_PATH_GUARD_SLUG = "file-write-path-guard";

export function buildFileWritePathGuard(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_PATH_GUARD_SLUG, input);
}

export function buildFileWritePathGuardItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_PATH_GUARD_SLUG);
}

export function buildFileWritePathGuardBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWritePathGuard(model: { fileWritePathGuardItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_PATH_GUARD_SLUG, model.fileWritePathGuardItems);
}

export function buildFileWritePathGuardModel() {
  const fileWritePathGuardItems = buildFileWritePathGuardItems();
  const fileWritePathGuardModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_PATH_GUARD_SLUG, fileWritePathGuardItems);
  return { ...fileWritePathGuardModel, fileWritePathGuardItems };
}
