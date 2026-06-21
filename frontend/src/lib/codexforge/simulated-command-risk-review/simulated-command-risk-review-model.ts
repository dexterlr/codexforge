import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_RISK_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandRiskReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_RISK_REVIEW_LANGUAGE, buildSimulatedCommandRiskReviewStableKey };

const SIMULATED_COMMAND_RISK_REVIEW_SLUG = "simulated-command-risk-review";

export function buildSimulatedCommandRiskReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_RISK_REVIEW_SLUG, input);
}

export function buildSimulatedCommandRiskReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_RISK_REVIEW_SLUG);
}

export function buildSimulatedCommandRiskReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandRiskReview(model: { simulatedCommandRiskReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_RISK_REVIEW_SLUG, model.simulatedCommandRiskReviewItems);
}

export function buildSimulatedCommandRiskReviewModel() {
  const simulatedCommandRiskReviewItems = buildSimulatedCommandRiskReviewItems();
  const simulatedCommandRiskReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_RISK_REVIEW_SLUG, simulatedCommandRiskReviewItems);
  return { ...simulatedCommandRiskReviewModel, simulatedCommandRiskReviewItems };
}
