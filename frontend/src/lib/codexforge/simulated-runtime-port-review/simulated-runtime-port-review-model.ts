import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_PORT_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimePortReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_PORT_REVIEW_LANGUAGE, buildSimulatedRuntimePortReviewStableKey };

const SIMULATED_RUNTIME_PORT_REVIEW_SLUG = "simulated-runtime-port-review";

export function buildSimulatedRuntimePortReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_PORT_REVIEW_SLUG, input);
}

export function buildSimulatedRuntimePortReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_PORT_REVIEW_SLUG);
}

export function buildSimulatedRuntimePortReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimePortReview(model: { simulatedRuntimePortReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_PORT_REVIEW_SLUG, model.simulatedRuntimePortReviewItems);
}

export function buildSimulatedRuntimePortReviewModel() {
  const simulatedRuntimePortReviewItems = buildSimulatedRuntimePortReviewItems();
  const simulatedRuntimePortReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_PORT_REVIEW_SLUG, simulatedRuntimePortReviewItems);
  return { ...simulatedRuntimePortReviewModel, simulatedRuntimePortReviewItems };
}
