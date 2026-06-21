import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_GUARDED_FILE_WRITE_ADAPTER_BOUNDARY_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildRealGuardedFileWriteAdapterBoundaryStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { REAL_GUARDED_FILE_WRITE_ADAPTER_BOUNDARY_LANGUAGE, buildRealGuardedFileWriteAdapterBoundaryStableKey };

const REAL_GUARDED_FILE_WRITE_ADAPTER_BOUNDARY_SLUG = "real-guarded-file-write-adapter-boundary";

export function buildRealGuardedFileWriteAdapterBoundary(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(REAL_GUARDED_FILE_WRITE_ADAPTER_BOUNDARY_SLUG, input);
}

export function buildRealGuardedFileWriteAdapterBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(REAL_GUARDED_FILE_WRITE_ADAPTER_BOUNDARY_SLUG);
}

export function buildRealGuardedFileWriteAdapterBoundaryBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeRealGuardedFileWriteAdapterBoundary(model: { realGuardedFileWriteAdapterBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(REAL_GUARDED_FILE_WRITE_ADAPTER_BOUNDARY_SLUG, model.realGuardedFileWriteAdapterBoundaryItems);
}

export function buildRealGuardedFileWriteAdapterBoundaryModel() {
  const realGuardedFileWriteAdapterBoundaryItems = buildRealGuardedFileWriteAdapterBoundaryItems();
  const realGuardedFileWriteAdapterBoundaryModel = buildBuildPlanBundleReviewModelForSlug(REAL_GUARDED_FILE_WRITE_ADAPTER_BOUNDARY_SLUG, realGuardedFileWriteAdapterBoundaryItems);
  return { ...realGuardedFileWriteAdapterBoundaryModel, realGuardedFileWriteAdapterBoundaryItems };
}
