import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_EXECUTION_HANDOFF_BOUNDARY_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunExecutionHandoffBoundaryStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_EXECUTION_HANDOFF_BOUNDARY_LANGUAGE, buildDryRunExecutionHandoffBoundaryStableKey };

const DRY_RUN_EXECUTION_HANDOFF_BOUNDARY_SLUG = "dry-run-execution-handoff-boundary";

export function buildDryRunExecutionHandoffBoundary(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_EXECUTION_HANDOFF_BOUNDARY_SLUG, input);
}

export function buildDryRunExecutionHandoffBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_EXECUTION_HANDOFF_BOUNDARY_SLUG);
}

export function buildDryRunExecutionHandoffBoundaryBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunExecutionHandoffBoundary(model: { dryRunExecutionHandoffBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_EXECUTION_HANDOFF_BOUNDARY_SLUG, model.dryRunExecutionHandoffBoundaryItems);
}

export function buildDryRunExecutionHandoffBoundaryModel() {
  const dryRunExecutionHandoffBoundaryItems = buildDryRunExecutionHandoffBoundaryItems();
  const dryRunExecutionHandoffBoundaryModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_EXECUTION_HANDOFF_BOUNDARY_SLUG, dryRunExecutionHandoffBoundaryItems);
  return { ...dryRunExecutionHandoffBoundaryModel, dryRunExecutionHandoffBoundaryItems };
}
