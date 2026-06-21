import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_FAILURE_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandFailurePreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_FAILURE_PREVIEW_LANGUAGE, buildSimulatedCommandFailurePreviewStableKey };

const SIMULATED_COMMAND_FAILURE_PREVIEW_SLUG = "simulated-command-failure-preview";

export function buildSimulatedCommandFailurePreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_FAILURE_PREVIEW_SLUG, input);
}

export function buildSimulatedCommandFailurePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_FAILURE_PREVIEW_SLUG);
}

export function buildSimulatedCommandFailurePreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandFailurePreview(model: { simulatedCommandFailurePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_FAILURE_PREVIEW_SLUG, model.simulatedCommandFailurePreviewItems);
}

export function buildSimulatedCommandFailurePreviewModel() {
  const simulatedCommandFailurePreviewItems = buildSimulatedCommandFailurePreviewItems();
  const simulatedCommandFailurePreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_FAILURE_PREVIEW_SLUG, simulatedCommandFailurePreviewItems);
  return { ...simulatedCommandFailurePreviewModel, simulatedCommandFailurePreviewItems };
}
