import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_RECOVERY_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileRecoveryPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_RECOVERY_PREVIEW_LANGUAGE, buildSimulatedFileRecoveryPreviewStableKey };

const SIMULATED_FILE_RECOVERY_PREVIEW_SLUG = "simulated-file-recovery-preview";

export function buildSimulatedFileRecoveryPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_RECOVERY_PREVIEW_SLUG, input);
}

export function buildSimulatedFileRecoveryPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_RECOVERY_PREVIEW_SLUG);
}

export function buildSimulatedFileRecoveryPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileRecoveryPreview(model: { simulatedFileRecoveryPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_RECOVERY_PREVIEW_SLUG, model.simulatedFileRecoveryPreviewItems);
}

export function buildSimulatedFileRecoveryPreviewModel() {
  const simulatedFileRecoveryPreviewItems = buildSimulatedFileRecoveryPreviewItems();
  const simulatedFileRecoveryPreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_RECOVERY_PREVIEW_SLUG, simulatedFileRecoveryPreviewItems);
  return { ...simulatedFileRecoveryPreviewModel, simulatedFileRecoveryPreviewItems };
}
