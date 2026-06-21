import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_PROCESS_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeProcessReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_PROCESS_REVIEW_LANGUAGE, buildSimulatedRuntimeProcessReviewStableKey };

const SIMULATED_RUNTIME_PROCESS_REVIEW_SLUG = "simulated-runtime-process-review";

export function buildSimulatedRuntimeProcessReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_PROCESS_REVIEW_SLUG, input);
}

export function buildSimulatedRuntimeProcessReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_PROCESS_REVIEW_SLUG);
}

export function buildSimulatedRuntimeProcessReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeProcessReview(model: { simulatedRuntimeProcessReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_PROCESS_REVIEW_SLUG, model.simulatedRuntimeProcessReviewItems);
}

export function buildSimulatedRuntimeProcessReviewModel() {
  const simulatedRuntimeProcessReviewItems = buildSimulatedRuntimeProcessReviewItems();
  const simulatedRuntimeProcessReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_PROCESS_REVIEW_SLUG, simulatedRuntimeProcessReviewItems);
  return { ...simulatedRuntimeProcessReviewModel, simulatedRuntimeProcessReviewItems };
}
