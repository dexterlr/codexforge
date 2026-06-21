import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_EXECUTION_TRACE_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunExecutionTracePreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_EXECUTION_TRACE_PREVIEW_LANGUAGE, buildDryRunExecutionTracePreviewStableKey };

const DRY_RUN_EXECUTION_TRACE_PREVIEW_SLUG = "dry-run-execution-trace-preview";

export function buildDryRunExecutionTracePreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_EXECUTION_TRACE_PREVIEW_SLUG, input);
}

export function buildDryRunExecutionTracePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_EXECUTION_TRACE_PREVIEW_SLUG);
}

export function buildDryRunExecutionTracePreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunExecutionTracePreview(model: { dryRunExecutionTracePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_EXECUTION_TRACE_PREVIEW_SLUG, model.dryRunExecutionTracePreviewItems);
}

export function buildDryRunExecutionTracePreviewModel() {
  const dryRunExecutionTracePreviewItems = buildDryRunExecutionTracePreviewItems();
  const dryRunExecutionTracePreviewModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_EXECUTION_TRACE_PREVIEW_SLUG, dryRunExecutionTracePreviewItems);
  return { ...dryRunExecutionTracePreviewModel, dryRunExecutionTracePreviewItems };
}
