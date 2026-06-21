import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_EXECUTION_QUEUE_ITEM_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedExecutionQueueItemStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_EXECUTION_QUEUE_ITEM_LANGUAGE, buildGuardedExecutionQueueItemStableKey };

const GUARDED_EXECUTION_QUEUE_ITEM_SLUG = "guarded-execution-queue-item";

export function buildGuardedExecutionQueueItem(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_EXECUTION_QUEUE_ITEM_SLUG, input);
}

export function buildGuardedExecutionQueueItemItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_EXECUTION_QUEUE_ITEM_SLUG);
}

export function buildGuardedExecutionQueueItemBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedExecutionQueueItem(model: { guardedExecutionQueueItemItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_EXECUTION_QUEUE_ITEM_SLUG, model.guardedExecutionQueueItemItems);
}

export function buildGuardedExecutionQueueItemModel() {
  const guardedExecutionQueueItemItems = buildGuardedExecutionQueueItemItems();
  const guardedExecutionQueueItemModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_EXECUTION_QUEUE_ITEM_SLUG, guardedExecutionQueueItemItems);
  return { ...guardedExecutionQueueItemModel, guardedExecutionQueueItemItems };
}
