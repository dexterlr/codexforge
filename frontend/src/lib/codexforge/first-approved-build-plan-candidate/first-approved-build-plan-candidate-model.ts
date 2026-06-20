import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_APPROVED_BUILD_PLAN_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFirstApprovedBuildPlanCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FIRST_APPROVED_BUILD_PLAN_CANDIDATE_LANGUAGE, buildFirstApprovedBuildPlanCandidateStableKey };

const FIRST_APPROVED_BUILD_PLAN_CANDIDATE_SLUG = "first-approved-build-plan-candidate";

export function buildFirstApprovedBuildPlanCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FIRST_APPROVED_BUILD_PLAN_CANDIDATE_SLUG, input);
}

export function buildFirstApprovedBuildPlanCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FIRST_APPROVED_BUILD_PLAN_CANDIDATE_SLUG);
}

export function buildFirstApprovedBuildPlanCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFirstApprovedBuildPlanCandidate(model: { firstApprovedBuildPlanCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FIRST_APPROVED_BUILD_PLAN_CANDIDATE_SLUG, model.firstApprovedBuildPlanCandidateItems);
}

export function buildFirstApprovedBuildPlanCandidateModel() {
  const firstApprovedBuildPlanCandidateItems = buildFirstApprovedBuildPlanCandidateItems();
  const firstApprovedBuildPlanCandidateModel = buildBuildPlanBundleReviewModelForSlug(FIRST_APPROVED_BUILD_PLAN_CANDIDATE_SLUG, firstApprovedBuildPlanCandidateItems);
  return { ...firstApprovedBuildPlanCandidateModel, firstApprovedBuildPlanCandidateItems };
}
