import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_EXECUTION_BOUNDARY_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandExecutionBoundaryStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_EXECUTION_BOUNDARY_LANGUAGE, buildSimulatedCommandExecutionBoundaryStableKey };

const SIMULATED_COMMAND_EXECUTION_BOUNDARY_SLUG = "simulated-command-execution-boundary";

export function buildSimulatedCommandExecutionBoundary(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_EXECUTION_BOUNDARY_SLUG, input);
}

export function buildSimulatedCommandExecutionBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_EXECUTION_BOUNDARY_SLUG);
}

export function buildSimulatedCommandExecutionBoundaryBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandExecutionBoundary(model: { simulatedCommandExecutionBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_EXECUTION_BOUNDARY_SLUG, model.simulatedCommandExecutionBoundaryItems);
}

export function buildSimulatedCommandExecutionBoundaryModel() {
  const simulatedCommandExecutionBoundaryItems = buildSimulatedCommandExecutionBoundaryItems();
  const simulatedCommandExecutionBoundaryModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_EXECUTION_BOUNDARY_SLUG, simulatedCommandExecutionBoundaryItems);
  return { ...simulatedCommandExecutionBoundaryModel, simulatedCommandExecutionBoundaryItems };
}
