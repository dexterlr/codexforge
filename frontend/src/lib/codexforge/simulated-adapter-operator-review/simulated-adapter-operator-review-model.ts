import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_OPERATOR_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterOperatorReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_OPERATOR_REVIEW_LANGUAGE, buildSimulatedAdapterOperatorReviewStableKey };

const SIMULATED_ADAPTER_OPERATOR_REVIEW_SLUG = "simulated-adapter-operator-review";

export function buildSimulatedAdapterOperatorReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_OPERATOR_REVIEW_SLUG, input);
}

export function buildSimulatedAdapterOperatorReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_OPERATOR_REVIEW_SLUG);
}

export function buildSimulatedAdapterOperatorReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterOperatorReview(model: { simulatedAdapterOperatorReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_OPERATOR_REVIEW_SLUG, model.simulatedAdapterOperatorReviewItems);
}

export function buildSimulatedAdapterOperatorReviewModel() {
  const simulatedAdapterOperatorReviewItems = buildSimulatedAdapterOperatorReviewItems();
  const simulatedAdapterOperatorReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_OPERATOR_REVIEW_SLUG, simulatedAdapterOperatorReviewItems);
  return { ...simulatedAdapterOperatorReviewModel, simulatedAdapterOperatorReviewItems };
}
