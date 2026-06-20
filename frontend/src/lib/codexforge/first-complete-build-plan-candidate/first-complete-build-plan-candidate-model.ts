import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_COMPLETE_BUILD_PLAN_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFirstCompleteBuildPlanCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FIRST_COMPLETE_BUILD_PLAN_CANDIDATE_LANGUAGE, buildFirstCompleteBuildPlanCandidateStableKey };

const FIRST_COMPLETE_BUILD_PLAN_CANDIDATE_SLUG = "first-complete-build-plan-candidate";

export function buildFirstCompleteBuildPlanCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FIRST_COMPLETE_BUILD_PLAN_CANDIDATE_SLUG, input);
}

export function buildFirstCompleteBuildPlanCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FIRST_COMPLETE_BUILD_PLAN_CANDIDATE_SLUG);
}

export function buildFirstCompleteBuildPlanCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFirstCompleteBuildPlanCandidate(model: { firstCompleteBuildPlanCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FIRST_COMPLETE_BUILD_PLAN_CANDIDATE_SLUG, model.firstCompleteBuildPlanCandidateItems);
}

export function buildFirstCompleteBuildPlanCandidateModel() {
  const firstCompleteBuildPlanCandidateItems = buildFirstCompleteBuildPlanCandidateItems();
  const firstCompleteBuildPlanCandidateModel = buildBuildPlanBundleReviewModelForSlug(FIRST_COMPLETE_BUILD_PLAN_CANDIDATE_SLUG, firstCompleteBuildPlanCandidateItems);
  return { ...firstCompleteBuildPlanCandidateModel, firstCompleteBuildPlanCandidateItems };
}
