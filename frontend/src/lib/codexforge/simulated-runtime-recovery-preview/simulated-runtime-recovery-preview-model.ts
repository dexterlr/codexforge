import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_RECOVERY_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeRecoveryPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_RECOVERY_PREVIEW_LANGUAGE, buildSimulatedRuntimeRecoveryPreviewStableKey };

const SIMULATED_RUNTIME_RECOVERY_PREVIEW_SLUG = "simulated-runtime-recovery-preview";

export function buildSimulatedRuntimeRecoveryPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_RECOVERY_PREVIEW_SLUG, input);
}

export function buildSimulatedRuntimeRecoveryPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_RECOVERY_PREVIEW_SLUG);
}

export function buildSimulatedRuntimeRecoveryPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeRecoveryPreview(model: { simulatedRuntimeRecoveryPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_RECOVERY_PREVIEW_SLUG, model.simulatedRuntimeRecoveryPreviewItems);
}

export function buildSimulatedRuntimeRecoveryPreviewModel() {
  const simulatedRuntimeRecoveryPreviewItems = buildSimulatedRuntimeRecoveryPreviewItems();
  const simulatedRuntimeRecoveryPreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_RECOVERY_PREVIEW_SLUG, simulatedRuntimeRecoveryPreviewItems);
  return { ...simulatedRuntimeRecoveryPreviewModel, simulatedRuntimeRecoveryPreviewItems };
}
