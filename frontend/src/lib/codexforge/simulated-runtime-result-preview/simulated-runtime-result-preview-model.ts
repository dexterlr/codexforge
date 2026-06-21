import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_RESULT_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeResultPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_RESULT_PREVIEW_LANGUAGE, buildSimulatedRuntimeResultPreviewStableKey };

const SIMULATED_RUNTIME_RESULT_PREVIEW_SLUG = "simulated-runtime-result-preview";

export function buildSimulatedRuntimeResultPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_RESULT_PREVIEW_SLUG, input);
}

export function buildSimulatedRuntimeResultPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_RESULT_PREVIEW_SLUG);
}

export function buildSimulatedRuntimeResultPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeResultPreview(model: { simulatedRuntimeResultPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_RESULT_PREVIEW_SLUG, model.simulatedRuntimeResultPreviewItems);
}

export function buildSimulatedRuntimeResultPreviewModel() {
  const simulatedRuntimeResultPreviewItems = buildSimulatedRuntimeResultPreviewItems();
  const simulatedRuntimeResultPreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_RESULT_PREVIEW_SLUG, simulatedRuntimeResultPreviewItems);
  return { ...simulatedRuntimeResultPreviewModel, simulatedRuntimeResultPreviewItems };
}
