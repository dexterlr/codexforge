import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_RESULT_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterResultPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_RESULT_PREVIEW_LANGUAGE, buildSimulatedAdapterResultPreviewStableKey };

const SIMULATED_ADAPTER_RESULT_PREVIEW_SLUG = "simulated-adapter-result-preview";

export function buildSimulatedAdapterResultPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_RESULT_PREVIEW_SLUG, input);
}

export function buildSimulatedAdapterResultPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_RESULT_PREVIEW_SLUG);
}

export function buildSimulatedAdapterResultPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterResultPreview(model: { simulatedAdapterResultPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_RESULT_PREVIEW_SLUG, model.simulatedAdapterResultPreviewItems);
}

export function buildSimulatedAdapterResultPreviewModel() {
  const simulatedAdapterResultPreviewItems = buildSimulatedAdapterResultPreviewItems();
  const simulatedAdapterResultPreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_RESULT_PREVIEW_SLUG, simulatedAdapterResultPreviewItems);
  return { ...simulatedAdapterResultPreviewModel, simulatedAdapterResultPreviewItems };
}
