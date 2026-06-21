import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_SAFETY_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileSafetyReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_SAFETY_REVIEW_LANGUAGE, buildSimulatedFileSafetyReviewStableKey };

const SIMULATED_FILE_SAFETY_REVIEW_SLUG = "simulated-file-safety-review";

export function buildSimulatedFileSafetyReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_SAFETY_REVIEW_SLUG, input);
}

export function buildSimulatedFileSafetyReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_SAFETY_REVIEW_SLUG);
}

export function buildSimulatedFileSafetyReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileSafetyReview(model: { simulatedFileSafetyReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_SAFETY_REVIEW_SLUG, model.simulatedFileSafetyReviewItems);
}

export function buildSimulatedFileSafetyReviewModel() {
  const simulatedFileSafetyReviewItems = buildSimulatedFileSafetyReviewItems();
  const simulatedFileSafetyReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_SAFETY_REVIEW_SLUG, simulatedFileSafetyReviewItems);
  return { ...simulatedFileSafetyReviewModel, simulatedFileSafetyReviewItems };
}
