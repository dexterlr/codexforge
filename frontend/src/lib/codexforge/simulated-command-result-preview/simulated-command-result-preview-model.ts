import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_RESULT_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandResultPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_RESULT_PREVIEW_LANGUAGE, buildSimulatedCommandResultPreviewStableKey };

const SIMULATED_COMMAND_RESULT_PREVIEW_SLUG = "simulated-command-result-preview";

export function buildSimulatedCommandResultPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_RESULT_PREVIEW_SLUG, input);
}

export function buildSimulatedCommandResultPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_RESULT_PREVIEW_SLUG);
}

export function buildSimulatedCommandResultPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandResultPreview(model: { simulatedCommandResultPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_RESULT_PREVIEW_SLUG, model.simulatedCommandResultPreviewItems);
}

export function buildSimulatedCommandResultPreviewModel() {
  const simulatedCommandResultPreviewItems = buildSimulatedCommandResultPreviewItems();
  const simulatedCommandResultPreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_RESULT_PREVIEW_SLUG, simulatedCommandResultPreviewItems);
  return { ...simulatedCommandResultPreviewModel, simulatedCommandResultPreviewItems };
}
