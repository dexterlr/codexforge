import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_APPROVAL_QUEUE_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildApprovalQueueStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_APPROVAL_QUEUE_LANGUAGE, buildGuidedBuildApprovalQueueStableKey };

const GUIDED_BUILD_APPROVAL_QUEUE_SLUG = "guided-build-approval-queue";

export function buildGuidedBuildApprovalQueue(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_APPROVAL_QUEUE_SLUG, input);
}

export function buildGuidedBuildApprovalQueueItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_APPROVAL_QUEUE_SLUG);
}

export function buildGuidedBuildApprovalQueueBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildApprovalQueue(model: { guidedBuildApprovalQueueItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_APPROVAL_QUEUE_SLUG, model.guidedBuildApprovalQueueItems);
}

export function buildGuidedBuildApprovalQueueModel() {
  const guidedBuildApprovalQueueItems = buildGuidedBuildApprovalQueueItems();
  const guidedBuildApprovalQueueModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_APPROVAL_QUEUE_SLUG, guidedBuildApprovalQueueItems);
  return { ...guidedBuildApprovalQueueModel, guidedBuildApprovalQueueItems };
}

