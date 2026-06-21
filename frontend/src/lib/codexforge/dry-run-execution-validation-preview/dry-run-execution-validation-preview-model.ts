import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_EXECUTION_VALIDATION_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunExecutionValidationPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_EXECUTION_VALIDATION_PREVIEW_LANGUAGE, buildDryRunExecutionValidationPreviewStableKey };

const DRY_RUN_EXECUTION_VALIDATION_PREVIEW_SLUG = "dry-run-execution-validation-preview";

export function buildDryRunExecutionValidationPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_EXECUTION_VALIDATION_PREVIEW_SLUG, input);
}

export function buildDryRunExecutionValidationPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_EXECUTION_VALIDATION_PREVIEW_SLUG);
}

export function buildDryRunExecutionValidationPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunExecutionValidationPreview(model: { dryRunExecutionValidationPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_EXECUTION_VALIDATION_PREVIEW_SLUG, model.dryRunExecutionValidationPreviewItems);
}

export function buildDryRunExecutionValidationPreviewModel() {
  const dryRunExecutionValidationPreviewItems = buildDryRunExecutionValidationPreviewItems();
  const dryRunExecutionValidationPreviewModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_EXECUTION_VALIDATION_PREVIEW_SLUG, dryRunExecutionValidationPreviewItems);
  return { ...dryRunExecutionValidationPreviewModel, dryRunExecutionValidationPreviewItems };
}
