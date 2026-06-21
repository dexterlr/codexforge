import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_WORKING_DIRECTORY_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandWorkingDirectoryReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_WORKING_DIRECTORY_REVIEW_LANGUAGE, buildSimulatedCommandWorkingDirectoryReviewStableKey };

const SIMULATED_COMMAND_WORKING_DIRECTORY_REVIEW_SLUG = "simulated-command-working-directory-review";

export function buildSimulatedCommandWorkingDirectoryReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_WORKING_DIRECTORY_REVIEW_SLUG, input);
}

export function buildSimulatedCommandWorkingDirectoryReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_WORKING_DIRECTORY_REVIEW_SLUG);
}

export function buildSimulatedCommandWorkingDirectoryReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandWorkingDirectoryReview(model: { simulatedCommandWorkingDirectoryReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_WORKING_DIRECTORY_REVIEW_SLUG, model.simulatedCommandWorkingDirectoryReviewItems);
}

export function buildSimulatedCommandWorkingDirectoryReviewModel() {
  const simulatedCommandWorkingDirectoryReviewItems = buildSimulatedCommandWorkingDirectoryReviewItems();
  const simulatedCommandWorkingDirectoryReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_WORKING_DIRECTORY_REVIEW_SLUG, simulatedCommandWorkingDirectoryReviewItems);
  return { ...simulatedCommandWorkingDirectoryReviewModel, simulatedCommandWorkingDirectoryReviewItems };
}
