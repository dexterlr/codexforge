import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_OPERATOR_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeOperatorReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_OPERATOR_REVIEW_LANGUAGE, buildSimulatedRuntimeOperatorReviewStableKey };

const SIMULATED_RUNTIME_OPERATOR_REVIEW_SLUG = "simulated-runtime-operator-review";

export function buildSimulatedRuntimeOperatorReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_OPERATOR_REVIEW_SLUG, input);
}

export function buildSimulatedRuntimeOperatorReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_OPERATOR_REVIEW_SLUG);
}

export function buildSimulatedRuntimeOperatorReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeOperatorReview(model: { simulatedRuntimeOperatorReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_OPERATOR_REVIEW_SLUG, model.simulatedRuntimeOperatorReviewItems);
}

export function buildSimulatedRuntimeOperatorReviewModel() {
  const simulatedRuntimeOperatorReviewItems = buildSimulatedRuntimeOperatorReviewItems();
  const simulatedRuntimeOperatorReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_OPERATOR_REVIEW_SLUG, simulatedRuntimeOperatorReviewItems);
  return { ...simulatedRuntimeOperatorReviewModel, simulatedRuntimeOperatorReviewItems };
}
