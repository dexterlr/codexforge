import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_EXECUTION_OPERATOR_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunExecutionOperatorReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_EXECUTION_OPERATOR_REVIEW_LANGUAGE, buildDryRunExecutionOperatorReviewStableKey };

const DRY_RUN_EXECUTION_OPERATOR_REVIEW_SLUG = "dry-run-execution-operator-review";

export function buildDryRunExecutionOperatorReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_EXECUTION_OPERATOR_REVIEW_SLUG, input);
}

export function buildDryRunExecutionOperatorReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_EXECUTION_OPERATOR_REVIEW_SLUG);
}

export function buildDryRunExecutionOperatorReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunExecutionOperatorReview(model: { dryRunExecutionOperatorReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_EXECUTION_OPERATOR_REVIEW_SLUG, model.dryRunExecutionOperatorReviewItems);
}

export function buildDryRunExecutionOperatorReviewModel() {
  const dryRunExecutionOperatorReviewItems = buildDryRunExecutionOperatorReviewItems();
  const dryRunExecutionOperatorReviewModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_EXECUTION_OPERATOR_REVIEW_SLUG, dryRunExecutionOperatorReviewItems);
  return { ...dryRunExecutionOperatorReviewModel, dryRunExecutionOperatorReviewItems };
}
