import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_WRITE_DRY_RUN_BOUNDARY_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileWriteDryRunBoundaryStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_WRITE_DRY_RUN_BOUNDARY_LANGUAGE, buildSimulatedFileWriteDryRunBoundaryStableKey };

const SIMULATED_FILE_WRITE_DRY_RUN_BOUNDARY_SLUG = "simulated-file-write-dry-run-boundary";

export function buildSimulatedFileWriteDryRunBoundary(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_WRITE_DRY_RUN_BOUNDARY_SLUG, input);
}

export function buildSimulatedFileWriteDryRunBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_WRITE_DRY_RUN_BOUNDARY_SLUG);
}

export function buildSimulatedFileWriteDryRunBoundaryBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileWriteDryRunBoundary(model: { simulatedFileWriteDryRunBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_WRITE_DRY_RUN_BOUNDARY_SLUG, model.simulatedFileWriteDryRunBoundaryItems);
}

export function buildSimulatedFileWriteDryRunBoundaryModel() {
  const simulatedFileWriteDryRunBoundaryItems = buildSimulatedFileWriteDryRunBoundaryItems();
  const simulatedFileWriteDryRunBoundaryModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_WRITE_DRY_RUN_BOUNDARY_SLUG, simulatedFileWriteDryRunBoundaryItems);
  return { ...simulatedFileWriteDryRunBoundaryModel, simulatedFileWriteDryRunBoundaryItems };
}
