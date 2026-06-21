import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_OPERATOR_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileOperatorReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_OPERATOR_REVIEW_LANGUAGE, buildSimulatedFileOperatorReviewStableKey };

const SIMULATED_FILE_OPERATOR_REVIEW_SLUG = "simulated-file-operator-review";

export function buildSimulatedFileOperatorReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_OPERATOR_REVIEW_SLUG, input);
}

export function buildSimulatedFileOperatorReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_OPERATOR_REVIEW_SLUG);
}

export function buildSimulatedFileOperatorReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileOperatorReview(model: { simulatedFileOperatorReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_OPERATOR_REVIEW_SLUG, model.simulatedFileOperatorReviewItems);
}

export function buildSimulatedFileOperatorReviewModel() {
  const simulatedFileOperatorReviewItems = buildSimulatedFileOperatorReviewItems();
  const simulatedFileOperatorReviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_OPERATOR_REVIEW_SLUG, simulatedFileOperatorReviewItems);
  return { ...simulatedFileOperatorReviewModel, simulatedFileOperatorReviewItems };
}
