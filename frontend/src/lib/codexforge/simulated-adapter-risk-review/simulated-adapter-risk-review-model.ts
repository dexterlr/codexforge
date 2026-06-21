import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_RISK_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterRiskReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_RISK_REVIEW_LANGUAGE, buildSimulatedAdapterRiskReviewStableKey };

const SIMULATED_ADAPTER_RISK_REVIEW_SLUG = "simulated-adapter-risk-review";

export function buildSimulatedAdapterRiskReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_RISK_REVIEW_SLUG, input);
}

export function buildSimulatedAdapterRiskReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_RISK_REVIEW_SLUG);
}

export function buildSimulatedAdapterRiskReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterRiskReview(model: { simulatedAdapterRiskReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_RISK_REVIEW_SLUG, model.simulatedAdapterRiskReviewItems);
}

export function buildSimulatedAdapterRiskReviewModel() {
  const simulatedAdapterRiskReviewItems = buildSimulatedAdapterRiskReviewItems();
  const simulatedAdapterRiskReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_RISK_REVIEW_SLUG, simulatedAdapterRiskReviewItems);
  return { ...simulatedAdapterRiskReviewModel, simulatedAdapterRiskReviewItems };
}
