import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_RESULT_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileResultPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_RESULT_PREVIEW_LANGUAGE, buildSimulatedFileResultPreviewStableKey };

const SIMULATED_FILE_RESULT_PREVIEW_SLUG = "simulated-file-result-preview";

export function buildSimulatedFileResultPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_RESULT_PREVIEW_SLUG, input);
}

export function buildSimulatedFileResultPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_RESULT_PREVIEW_SLUG);
}

export function buildSimulatedFileResultPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileResultPreview(model: { simulatedFileResultPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_RESULT_PREVIEW_SLUG, model.simulatedFileResultPreviewItems);
}

export function buildSimulatedFileResultPreviewModel() {
  const simulatedFileResultPreviewItems = buildSimulatedFileResultPreviewItems();
  const simulatedFileResultPreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_RESULT_PREVIEW_SLUG, simulatedFileResultPreviewItems);
  return { ...simulatedFileResultPreviewModel, simulatedFileResultPreviewItems };
}
