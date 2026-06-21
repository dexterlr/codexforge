import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_GUARDED_EXECUTION_QUEUE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFirstGuardedExecutionQueueCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FIRST_GUARDED_EXECUTION_QUEUE_CANDIDATE_LANGUAGE, buildFirstGuardedExecutionQueueCandidateStableKey };

const FIRST_GUARDED_EXECUTION_QUEUE_CANDIDATE_SLUG = "first-guarded-execution-queue-candidate";

export function buildFirstGuardedExecutionQueueCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FIRST_GUARDED_EXECUTION_QUEUE_CANDIDATE_SLUG, input);
}

export function buildFirstGuardedExecutionQueueCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FIRST_GUARDED_EXECUTION_QUEUE_CANDIDATE_SLUG);
}

export function buildFirstGuardedExecutionQueueCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFirstGuardedExecutionQueueCandidate(model: { firstGuardedExecutionQueueCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FIRST_GUARDED_EXECUTION_QUEUE_CANDIDATE_SLUG, model.firstGuardedExecutionQueueCandidateItems);
}

export function buildFirstGuardedExecutionQueueCandidateModel() {
  const firstGuardedExecutionQueueCandidateItems = buildFirstGuardedExecutionQueueCandidateItems();
  const firstGuardedExecutionQueueCandidateModel = buildBuildPlanBundleReviewModelForSlug(FIRST_GUARDED_EXECUTION_QUEUE_CANDIDATE_SLUG, firstGuardedExecutionQueueCandidateItems);
  return { ...firstGuardedExecutionQueueCandidateModel, firstGuardedExecutionQueueCandidateItems };
}
