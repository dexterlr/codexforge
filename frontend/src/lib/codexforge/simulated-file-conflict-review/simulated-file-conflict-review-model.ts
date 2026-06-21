import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_CONFLICT_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileConflictReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_CONFLICT_REVIEW_LANGUAGE, buildSimulatedFileConflictReviewStableKey };

const SIMULATED_FILE_CONFLICT_REVIEW_SLUG = "simulated-file-conflict-review";

export function buildSimulatedFileConflictReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_CONFLICT_REVIEW_SLUG, input);
}

export function buildSimulatedFileConflictReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_CONFLICT_REVIEW_SLUG);
}

export function buildSimulatedFileConflictReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileConflictReview(model: { simulatedFileConflictReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_CONFLICT_REVIEW_SLUG, model.simulatedFileConflictReviewItems);
}

export function buildSimulatedFileConflictReviewModel() {
  const simulatedFileConflictReviewItems = buildSimulatedFileConflictReviewItems();
  const simulatedFileConflictReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_CONFLICT_REVIEW_SLUG, simulatedFileConflictReviewItems);
  return { ...simulatedFileConflictReviewModel, simulatedFileConflictReviewItems };
}
