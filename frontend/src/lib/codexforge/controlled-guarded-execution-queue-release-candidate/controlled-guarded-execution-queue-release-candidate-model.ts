import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_GUARDED_EXECUTION_QUEUE_RELEASE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildControlledGuardedExecutionQueueReleaseCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { CONTROLLED_GUARDED_EXECUTION_QUEUE_RELEASE_CANDIDATE_LANGUAGE, buildControlledGuardedExecutionQueueReleaseCandidateStableKey };

const CONTROLLED_GUARDED_EXECUTION_QUEUE_RELEASE_CANDIDATE_SLUG = "controlled-guarded-execution-queue-release-candidate";

export function buildControlledGuardedExecutionQueueReleaseCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(CONTROLLED_GUARDED_EXECUTION_QUEUE_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledGuardedExecutionQueueReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(CONTROLLED_GUARDED_EXECUTION_QUEUE_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledGuardedExecutionQueueReleaseCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeControlledGuardedExecutionQueueReleaseCandidate(model: { controlledGuardedExecutionQueueReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(CONTROLLED_GUARDED_EXECUTION_QUEUE_RELEASE_CANDIDATE_SLUG, model.controlledGuardedExecutionQueueReleaseCandidateItems);
}

export function buildControlledGuardedExecutionQueueReleaseCandidateModel() {
  const controlledGuardedExecutionQueueReleaseCandidateItems = buildControlledGuardedExecutionQueueReleaseCandidateItems();
  const controlledGuardedExecutionQueueReleaseCandidateModel = buildBuildPlanBundleReviewModelForSlug(CONTROLLED_GUARDED_EXECUTION_QUEUE_RELEASE_CANDIDATE_SLUG, controlledGuardedExecutionQueueReleaseCandidateItems);
  return { ...controlledGuardedExecutionQueueReleaseCandidateModel, controlledGuardedExecutionQueueReleaseCandidateItems };
}
