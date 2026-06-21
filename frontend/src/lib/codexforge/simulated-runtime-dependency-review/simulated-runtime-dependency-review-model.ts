import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_DEPENDENCY_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeDependencyReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_DEPENDENCY_REVIEW_LANGUAGE, buildSimulatedRuntimeDependencyReviewStableKey };

const SIMULATED_RUNTIME_DEPENDENCY_REVIEW_SLUG = "simulated-runtime-dependency-review";

export function buildSimulatedRuntimeDependencyReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_DEPENDENCY_REVIEW_SLUG, input);
}

export function buildSimulatedRuntimeDependencyReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_DEPENDENCY_REVIEW_SLUG);
}

export function buildSimulatedRuntimeDependencyReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeDependencyReview(model: { simulatedRuntimeDependencyReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_DEPENDENCY_REVIEW_SLUG, model.simulatedRuntimeDependencyReviewItems);
}

export function buildSimulatedRuntimeDependencyReviewModel() {
  const simulatedRuntimeDependencyReviewItems = buildSimulatedRuntimeDependencyReviewItems();
  const simulatedRuntimeDependencyReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_DEPENDENCY_REVIEW_SLUG, simulatedRuntimeDependencyReviewItems);
  return { ...simulatedRuntimeDependencyReviewModel, simulatedRuntimeDependencyReviewItems };
}
