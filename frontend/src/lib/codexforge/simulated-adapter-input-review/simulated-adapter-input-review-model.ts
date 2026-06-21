import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_INPUT_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterInputReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_INPUT_REVIEW_LANGUAGE, buildSimulatedAdapterInputReviewStableKey };

const SIMULATED_ADAPTER_INPUT_REVIEW_SLUG = "simulated-adapter-input-review";

export function buildSimulatedAdapterInputReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_INPUT_REVIEW_SLUG, input);
}

export function buildSimulatedAdapterInputReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_INPUT_REVIEW_SLUG);
}

export function buildSimulatedAdapterInputReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterInputReview(model: { simulatedAdapterInputReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_INPUT_REVIEW_SLUG, model.simulatedAdapterInputReviewItems);
}

export function buildSimulatedAdapterInputReviewModel() {
  const simulatedAdapterInputReviewItems = buildSimulatedAdapterInputReviewItems();
  const simulatedAdapterInputReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_INPUT_REVIEW_SLUG, simulatedAdapterInputReviewItems);
  return { ...simulatedAdapterInputReviewModel, simulatedAdapterInputReviewItems };
}
