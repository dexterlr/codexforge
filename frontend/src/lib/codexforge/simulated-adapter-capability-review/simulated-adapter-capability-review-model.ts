import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_CAPABILITY_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterCapabilityReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_CAPABILITY_REVIEW_LANGUAGE, buildSimulatedAdapterCapabilityReviewStableKey };

const SIMULATED_ADAPTER_CAPABILITY_REVIEW_SLUG = "simulated-adapter-capability-review";

export function buildSimulatedAdapterCapabilityReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_CAPABILITY_REVIEW_SLUG, input);
}

export function buildSimulatedAdapterCapabilityReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_CAPABILITY_REVIEW_SLUG);
}

export function buildSimulatedAdapterCapabilityReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterCapabilityReview(model: { simulatedAdapterCapabilityReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_CAPABILITY_REVIEW_SLUG, model.simulatedAdapterCapabilityReviewItems);
}

export function buildSimulatedAdapterCapabilityReviewModel() {
  const simulatedAdapterCapabilityReviewItems = buildSimulatedAdapterCapabilityReviewItems();
  const simulatedAdapterCapabilityReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_CAPABILITY_REVIEW_SLUG, simulatedAdapterCapabilityReviewItems);
  return { ...simulatedAdapterCapabilityReviewModel, simulatedAdapterCapabilityReviewItems };
}
