import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_ENVIRONMENT_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeEnvironmentReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_ENVIRONMENT_REVIEW_LANGUAGE, buildSimulatedRuntimeEnvironmentReviewStableKey };

const SIMULATED_RUNTIME_ENVIRONMENT_REVIEW_SLUG = "simulated-runtime-environment-review";

export function buildSimulatedRuntimeEnvironmentReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_ENVIRONMENT_REVIEW_SLUG, input);
}

export function buildSimulatedRuntimeEnvironmentReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_ENVIRONMENT_REVIEW_SLUG);
}

export function buildSimulatedRuntimeEnvironmentReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeEnvironmentReview(model: { simulatedRuntimeEnvironmentReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_ENVIRONMENT_REVIEW_SLUG, model.simulatedRuntimeEnvironmentReviewItems);
}

export function buildSimulatedRuntimeEnvironmentReviewModel() {
  const simulatedRuntimeEnvironmentReviewItems = buildSimulatedRuntimeEnvironmentReviewItems();
  const simulatedRuntimeEnvironmentReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_ENVIRONMENT_REVIEW_SLUG, simulatedRuntimeEnvironmentReviewItems);
  return { ...simulatedRuntimeEnvironmentReviewModel, simulatedRuntimeEnvironmentReviewItems };
}
