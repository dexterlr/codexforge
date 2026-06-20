import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_QUEUE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalQueueStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_QUEUE_LANGUAGE, buildBuildPlanApprovalQueueStableKey };

const BUILD_PLAN_APPROVAL_QUEUE_SLUG = "build-plan-approval-queue";

export function buildBuildPlanApprovalQueue(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_QUEUE_SLUG, input);
}

export function buildBuildPlanApprovalQueueItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_QUEUE_SLUG);
}

export function buildBuildPlanApprovalQueueBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalQueue(model: { buildPlanApprovalQueueItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_QUEUE_SLUG, model.buildPlanApprovalQueueItems);
}

export function buildBuildPlanApprovalQueueModel() {
  const buildPlanApprovalQueueItems = buildBuildPlanApprovalQueueItems();
  const buildPlanApprovalQueueModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_QUEUE_SLUG, buildPlanApprovalQueueItems);
  return { ...buildPlanApprovalQueueModel, buildPlanApprovalQueueItems };
}
