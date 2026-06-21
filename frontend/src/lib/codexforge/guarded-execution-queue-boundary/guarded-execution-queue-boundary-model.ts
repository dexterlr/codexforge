import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_EXECUTION_QUEUE_BOUNDARY_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedExecutionQueueBoundaryStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_EXECUTION_QUEUE_BOUNDARY_LANGUAGE, buildGuardedExecutionQueueBoundaryStableKey };

const GUARDED_EXECUTION_QUEUE_BOUNDARY_SLUG = "guarded-execution-queue-boundary";

export function buildGuardedExecutionQueueBoundary(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_EXECUTION_QUEUE_BOUNDARY_SLUG, input);
}

export function buildGuardedExecutionQueueBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_EXECUTION_QUEUE_BOUNDARY_SLUG);
}

export function buildGuardedExecutionQueueBoundaryBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedExecutionQueueBoundary(model: { guardedExecutionQueueBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_EXECUTION_QUEUE_BOUNDARY_SLUG, model.guardedExecutionQueueBoundaryItems);
}

export function buildGuardedExecutionQueueBoundaryModel() {
  const guardedExecutionQueueBoundaryItems = buildGuardedExecutionQueueBoundaryItems();
  const guardedExecutionQueueBoundaryModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_EXECUTION_QUEUE_BOUNDARY_SLUG, guardedExecutionQueueBoundaryItems);
  return { ...guardedExecutionQueueBoundaryModel, guardedExecutionQueueBoundaryItems };
}
