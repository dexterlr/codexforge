import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_OUTPUT_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterOutputReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_OUTPUT_REVIEW_LANGUAGE, buildSimulatedAdapterOutputReviewStableKey };

const SIMULATED_ADAPTER_OUTPUT_REVIEW_SLUG = "simulated-adapter-output-review";

export function buildSimulatedAdapterOutputReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_OUTPUT_REVIEW_SLUG, input);
}

export function buildSimulatedAdapterOutputReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_OUTPUT_REVIEW_SLUG);
}

export function buildSimulatedAdapterOutputReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterOutputReview(model: { simulatedAdapterOutputReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_OUTPUT_REVIEW_SLUG, model.simulatedAdapterOutputReviewItems);
}

export function buildSimulatedAdapterOutputReviewModel() {
  const simulatedAdapterOutputReviewItems = buildSimulatedAdapterOutputReviewItems();
  const simulatedAdapterOutputReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_OUTPUT_REVIEW_SLUG, simulatedAdapterOutputReviewItems);
  return { ...simulatedAdapterOutputReviewModel, simulatedAdapterOutputReviewItems };
}
