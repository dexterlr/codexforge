import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_EXECUTION_BOUNDARY_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeExecutionBoundaryStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_EXECUTION_BOUNDARY_LANGUAGE, buildSimulatedRuntimeExecutionBoundaryStableKey };

const SIMULATED_RUNTIME_EXECUTION_BOUNDARY_SLUG = "simulated-runtime-execution-boundary";

export function buildSimulatedRuntimeExecutionBoundary(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_EXECUTION_BOUNDARY_SLUG, input);
}

export function buildSimulatedRuntimeExecutionBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_EXECUTION_BOUNDARY_SLUG);
}

export function buildSimulatedRuntimeExecutionBoundaryBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeExecutionBoundary(model: { simulatedRuntimeExecutionBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_EXECUTION_BOUNDARY_SLUG, model.simulatedRuntimeExecutionBoundaryItems);
}

export function buildSimulatedRuntimeExecutionBoundaryModel() {
  const simulatedRuntimeExecutionBoundaryItems = buildSimulatedRuntimeExecutionBoundaryItems();
  const simulatedRuntimeExecutionBoundaryModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_EXECUTION_BOUNDARY_SLUG, simulatedRuntimeExecutionBoundaryItems);
  return { ...simulatedRuntimeExecutionBoundaryModel, simulatedRuntimeExecutionBoundaryItems };
}
