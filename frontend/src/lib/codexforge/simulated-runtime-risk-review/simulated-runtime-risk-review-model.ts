import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_RISK_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeRiskReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_RISK_REVIEW_LANGUAGE, buildSimulatedRuntimeRiskReviewStableKey };

const SIMULATED_RUNTIME_RISK_REVIEW_SLUG = "simulated-runtime-risk-review";

export function buildSimulatedRuntimeRiskReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_RISK_REVIEW_SLUG, input);
}

export function buildSimulatedRuntimeRiskReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_RISK_REVIEW_SLUG);
}

export function buildSimulatedRuntimeRiskReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeRiskReview(model: { simulatedRuntimeRiskReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_RISK_REVIEW_SLUG, model.simulatedRuntimeRiskReviewItems);
}

export function buildSimulatedRuntimeRiskReviewModel() {
  const simulatedRuntimeRiskReviewItems = buildSimulatedRuntimeRiskReviewItems();
  const simulatedRuntimeRiskReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_RISK_REVIEW_SLUG, simulatedRuntimeRiskReviewItems);
  return { ...simulatedRuntimeRiskReviewModel, simulatedRuntimeRiskReviewItems };
}
