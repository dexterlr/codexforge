import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_PERMISSION_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterPermissionReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_PERMISSION_REVIEW_LANGUAGE, buildSimulatedAdapterPermissionReviewStableKey };

const SIMULATED_ADAPTER_PERMISSION_REVIEW_SLUG = "simulated-adapter-permission-review";

export function buildSimulatedAdapterPermissionReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_PERMISSION_REVIEW_SLUG, input);
}

export function buildSimulatedAdapterPermissionReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_PERMISSION_REVIEW_SLUG);
}

export function buildSimulatedAdapterPermissionReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterPermissionReview(model: { simulatedAdapterPermissionReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_PERMISSION_REVIEW_SLUG, model.simulatedAdapterPermissionReviewItems);
}

export function buildSimulatedAdapterPermissionReviewModel() {
  const simulatedAdapterPermissionReviewItems = buildSimulatedAdapterPermissionReviewItems();
  const simulatedAdapterPermissionReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_PERMISSION_REVIEW_SLUG, simulatedAdapterPermissionReviewItems);
  return { ...simulatedAdapterPermissionReviewModel, simulatedAdapterPermissionReviewItems };
}
