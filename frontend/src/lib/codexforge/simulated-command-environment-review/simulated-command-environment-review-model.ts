import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_ENVIRONMENT_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandEnvironmentReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_ENVIRONMENT_REVIEW_LANGUAGE, buildSimulatedCommandEnvironmentReviewStableKey };

const SIMULATED_COMMAND_ENVIRONMENT_REVIEW_SLUG = "simulated-command-environment-review";

export function buildSimulatedCommandEnvironmentReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_ENVIRONMENT_REVIEW_SLUG, input);
}

export function buildSimulatedCommandEnvironmentReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_ENVIRONMENT_REVIEW_SLUG);
}

export function buildSimulatedCommandEnvironmentReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandEnvironmentReview(model: { simulatedCommandEnvironmentReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_ENVIRONMENT_REVIEW_SLUG, model.simulatedCommandEnvironmentReviewItems);
}

export function buildSimulatedCommandEnvironmentReviewModel() {
  const simulatedCommandEnvironmentReviewItems = buildSimulatedCommandEnvironmentReviewItems();
  const simulatedCommandEnvironmentReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_ENVIRONMENT_REVIEW_SLUG, simulatedCommandEnvironmentReviewItems);
  return { ...simulatedCommandEnvironmentReviewModel, simulatedCommandEnvironmentReviewItems };
}
