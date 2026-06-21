import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_EXECUTION_BOUNDARY_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterExecutionBoundaryStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_EXECUTION_BOUNDARY_LANGUAGE, buildSimulatedAdapterExecutionBoundaryStableKey };

const SIMULATED_ADAPTER_EXECUTION_BOUNDARY_SLUG = "simulated-adapter-execution-boundary";

export function buildSimulatedAdapterExecutionBoundary(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_EXECUTION_BOUNDARY_SLUG, input);
}

export function buildSimulatedAdapterExecutionBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_EXECUTION_BOUNDARY_SLUG);
}

export function buildSimulatedAdapterExecutionBoundaryBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterExecutionBoundary(model: { simulatedAdapterExecutionBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_EXECUTION_BOUNDARY_SLUG, model.simulatedAdapterExecutionBoundaryItems);
}

export function buildSimulatedAdapterExecutionBoundaryModel() {
  const simulatedAdapterExecutionBoundaryItems = buildSimulatedAdapterExecutionBoundaryItems();
  const simulatedAdapterExecutionBoundaryModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_EXECUTION_BOUNDARY_SLUG, simulatedAdapterExecutionBoundaryItems);
  return { ...simulatedAdapterExecutionBoundaryModel, simulatedAdapterExecutionBoundaryItems };
}
