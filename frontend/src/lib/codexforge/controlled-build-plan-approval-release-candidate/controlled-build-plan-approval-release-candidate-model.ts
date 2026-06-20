import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_BUILD_PLAN_APPROVAL_RELEASE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildControlledBuildPlanApprovalReleaseCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { CONTROLLED_BUILD_PLAN_APPROVAL_RELEASE_CANDIDATE_LANGUAGE, buildControlledBuildPlanApprovalReleaseCandidateStableKey };

const CONTROLLED_BUILD_PLAN_APPROVAL_RELEASE_CANDIDATE_SLUG = "controlled-build-plan-approval-release-candidate";

export function buildControlledBuildPlanApprovalReleaseCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(CONTROLLED_BUILD_PLAN_APPROVAL_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledBuildPlanApprovalReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(CONTROLLED_BUILD_PLAN_APPROVAL_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledBuildPlanApprovalReleaseCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeControlledBuildPlanApprovalReleaseCandidate(model: { controlledBuildPlanApprovalReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(CONTROLLED_BUILD_PLAN_APPROVAL_RELEASE_CANDIDATE_SLUG, model.controlledBuildPlanApprovalReleaseCandidateItems);
}

export function buildControlledBuildPlanApprovalReleaseCandidateModel() {
  const controlledBuildPlanApprovalReleaseCandidateItems = buildControlledBuildPlanApprovalReleaseCandidateItems();
  const controlledBuildPlanApprovalReleaseCandidateModel = buildBuildPlanBundleReviewModelForSlug(CONTROLLED_BUILD_PLAN_APPROVAL_RELEASE_CANDIDATE_SLUG, controlledBuildPlanApprovalReleaseCandidateItems);
  return { ...controlledBuildPlanApprovalReleaseCandidateModel, controlledBuildPlanApprovalReleaseCandidateItems };
}
