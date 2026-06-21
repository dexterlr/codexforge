import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_ARGUMENT_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandArgumentReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_ARGUMENT_REVIEW_LANGUAGE, buildSimulatedCommandArgumentReviewStableKey };

const SIMULATED_COMMAND_ARGUMENT_REVIEW_SLUG = "simulated-command-argument-review";

export function buildSimulatedCommandArgumentReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_ARGUMENT_REVIEW_SLUG, input);
}

export function buildSimulatedCommandArgumentReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_ARGUMENT_REVIEW_SLUG);
}

export function buildSimulatedCommandArgumentReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandArgumentReview(model: { simulatedCommandArgumentReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_ARGUMENT_REVIEW_SLUG, model.simulatedCommandArgumentReviewItems);
}

export function buildSimulatedCommandArgumentReviewModel() {
  const simulatedCommandArgumentReviewItems = buildSimulatedCommandArgumentReviewItems();
  const simulatedCommandArgumentReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_ARGUMENT_REVIEW_SLUG, simulatedCommandArgumentReviewItems);
  return { ...simulatedCommandArgumentReviewModel, simulatedCommandArgumentReviewItems };
}
