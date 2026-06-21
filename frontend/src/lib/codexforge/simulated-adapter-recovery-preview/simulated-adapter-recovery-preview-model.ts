import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_RECOVERY_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterRecoveryPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_RECOVERY_PREVIEW_LANGUAGE, buildSimulatedAdapterRecoveryPreviewStableKey };

const SIMULATED_ADAPTER_RECOVERY_PREVIEW_SLUG = "simulated-adapter-recovery-preview";

export function buildSimulatedAdapterRecoveryPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_RECOVERY_PREVIEW_SLUG, input);
}

export function buildSimulatedAdapterRecoveryPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_RECOVERY_PREVIEW_SLUG);
}

export function buildSimulatedAdapterRecoveryPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterRecoveryPreview(model: { simulatedAdapterRecoveryPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_RECOVERY_PREVIEW_SLUG, model.simulatedAdapterRecoveryPreviewItems);
}

export function buildSimulatedAdapterRecoveryPreviewModel() {
  const simulatedAdapterRecoveryPreviewItems = buildSimulatedAdapterRecoveryPreviewItems();
  const simulatedAdapterRecoveryPreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_RECOVERY_PREVIEW_SLUG, simulatedAdapterRecoveryPreviewItems);
  return { ...simulatedAdapterRecoveryPreviewModel, simulatedAdapterRecoveryPreviewItems };
}
