import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_FAILURE_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeFailurePreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_FAILURE_PREVIEW_LANGUAGE, buildSimulatedRuntimeFailurePreviewStableKey };

const SIMULATED_RUNTIME_FAILURE_PREVIEW_SLUG = "simulated-runtime-failure-preview";

export function buildSimulatedRuntimeFailurePreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_FAILURE_PREVIEW_SLUG, input);
}

export function buildSimulatedRuntimeFailurePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_FAILURE_PREVIEW_SLUG);
}

export function buildSimulatedRuntimeFailurePreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeFailurePreview(model: { simulatedRuntimeFailurePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_FAILURE_PREVIEW_SLUG, model.simulatedRuntimeFailurePreviewItems);
}

export function buildSimulatedRuntimeFailurePreviewModel() {
  const simulatedRuntimeFailurePreviewItems = buildSimulatedRuntimeFailurePreviewItems();
  const simulatedRuntimeFailurePreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_FAILURE_PREVIEW_SLUG, simulatedRuntimeFailurePreviewItems);
  return { ...simulatedRuntimeFailurePreviewModel, simulatedRuntimeFailurePreviewItems };
}
