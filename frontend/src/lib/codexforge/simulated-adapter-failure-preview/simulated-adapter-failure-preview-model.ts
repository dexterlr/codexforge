import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_FAILURE_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterFailurePreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_FAILURE_PREVIEW_LANGUAGE, buildSimulatedAdapterFailurePreviewStableKey };

const SIMULATED_ADAPTER_FAILURE_PREVIEW_SLUG = "simulated-adapter-failure-preview";

export function buildSimulatedAdapterFailurePreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_FAILURE_PREVIEW_SLUG, input);
}

export function buildSimulatedAdapterFailurePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_FAILURE_PREVIEW_SLUG);
}

export function buildSimulatedAdapterFailurePreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterFailurePreview(model: { simulatedAdapterFailurePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_FAILURE_PREVIEW_SLUG, model.simulatedAdapterFailurePreviewItems);
}

export function buildSimulatedAdapterFailurePreviewModel() {
  const simulatedAdapterFailurePreviewItems = buildSimulatedAdapterFailurePreviewItems();
  const simulatedAdapterFailurePreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_FAILURE_PREVIEW_SLUG, simulatedAdapterFailurePreviewItems);
  return { ...simulatedAdapterFailurePreviewModel, simulatedAdapterFailurePreviewItems };
}
