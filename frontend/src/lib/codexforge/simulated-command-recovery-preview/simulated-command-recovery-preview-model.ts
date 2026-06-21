import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_RECOVERY_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandRecoveryPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_RECOVERY_PREVIEW_LANGUAGE, buildSimulatedCommandRecoveryPreviewStableKey };

const SIMULATED_COMMAND_RECOVERY_PREVIEW_SLUG = "simulated-command-recovery-preview";

export function buildSimulatedCommandRecoveryPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_RECOVERY_PREVIEW_SLUG, input);
}

export function buildSimulatedCommandRecoveryPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_RECOVERY_PREVIEW_SLUG);
}

export function buildSimulatedCommandRecoveryPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandRecoveryPreview(model: { simulatedCommandRecoveryPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_RECOVERY_PREVIEW_SLUG, model.simulatedCommandRecoveryPreviewItems);
}

export function buildSimulatedCommandRecoveryPreviewModel() {
  const simulatedCommandRecoveryPreviewItems = buildSimulatedCommandRecoveryPreviewItems();
  const simulatedCommandRecoveryPreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_RECOVERY_PREVIEW_SLUG, simulatedCommandRecoveryPreviewItems);
  return { ...simulatedCommandRecoveryPreviewModel, simulatedCommandRecoveryPreviewItems };
}
