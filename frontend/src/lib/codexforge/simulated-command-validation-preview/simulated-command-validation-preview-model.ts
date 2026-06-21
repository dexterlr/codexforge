import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_VALIDATION_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandValidationPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_VALIDATION_PREVIEW_LANGUAGE, buildSimulatedCommandValidationPreviewStableKey };

const SIMULATED_COMMAND_VALIDATION_PREVIEW_SLUG = "simulated-command-validation-preview";

export function buildSimulatedCommandValidationPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_VALIDATION_PREVIEW_SLUG, input);
}

export function buildSimulatedCommandValidationPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_VALIDATION_PREVIEW_SLUG);
}

export function buildSimulatedCommandValidationPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandValidationPreview(model: { simulatedCommandValidationPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_VALIDATION_PREVIEW_SLUG, model.simulatedCommandValidationPreviewItems);
}

export function buildSimulatedCommandValidationPreviewModel() {
  const simulatedCommandValidationPreviewItems = buildSimulatedCommandValidationPreviewItems();
  const simulatedCommandValidationPreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_VALIDATION_PREVIEW_SLUG, simulatedCommandValidationPreviewItems);
  return { ...simulatedCommandValidationPreviewModel, simulatedCommandValidationPreviewItems };
}
