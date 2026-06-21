import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_OPERATOR_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandOperatorReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_OPERATOR_REVIEW_LANGUAGE, buildSimulatedCommandOperatorReviewStableKey };

const SIMULATED_COMMAND_OPERATOR_REVIEW_SLUG = "simulated-command-operator-review";

export function buildSimulatedCommandOperatorReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_OPERATOR_REVIEW_SLUG, input);
}

export function buildSimulatedCommandOperatorReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_OPERATOR_REVIEW_SLUG);
}

export function buildSimulatedCommandOperatorReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandOperatorReview(model: { simulatedCommandOperatorReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_OPERATOR_REVIEW_SLUG, model.simulatedCommandOperatorReviewItems);
}

export function buildSimulatedCommandOperatorReviewModel() {
  const simulatedCommandOperatorReviewItems = buildSimulatedCommandOperatorReviewItems();
  const simulatedCommandOperatorReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_OPERATOR_REVIEW_SLUG, simulatedCommandOperatorReviewItems);
  return { ...simulatedCommandOperatorReviewModel, simulatedCommandOperatorReviewItems };
}
