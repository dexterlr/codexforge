import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_SELECTION_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterSelectionReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_SELECTION_REVIEW_LANGUAGE, buildSimulatedAdapterSelectionReviewStableKey };

const SIMULATED_ADAPTER_SELECTION_REVIEW_SLUG = "simulated-adapter-selection-review";

export function buildSimulatedAdapterSelectionReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_SELECTION_REVIEW_SLUG, input);
}

export function buildSimulatedAdapterSelectionReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_SELECTION_REVIEW_SLUG);
}

export function buildSimulatedAdapterSelectionReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterSelectionReview(model: { simulatedAdapterSelectionReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_SELECTION_REVIEW_SLUG, model.simulatedAdapterSelectionReviewItems);
}

export function buildSimulatedAdapterSelectionReviewModel() {
  const simulatedAdapterSelectionReviewItems = buildSimulatedAdapterSelectionReviewItems();
  const simulatedAdapterSelectionReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_SELECTION_REVIEW_SLUG, simulatedAdapterSelectionReviewItems);
  return { ...simulatedAdapterSelectionReviewModel, simulatedAdapterSelectionReviewItems };
}
