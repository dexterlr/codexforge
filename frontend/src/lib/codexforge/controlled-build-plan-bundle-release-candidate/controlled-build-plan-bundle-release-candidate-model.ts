import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_BUILD_PLAN_BUNDLE_RELEASE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildControlledBuildPlanBundleReleaseCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { CONTROLLED_BUILD_PLAN_BUNDLE_RELEASE_CANDIDATE_LANGUAGE, buildControlledBuildPlanBundleReleaseCandidateStableKey };

const CONTROLLED_BUILD_PLAN_BUNDLE_RELEASE_CANDIDATE_SLUG = "controlled-build-plan-bundle-release-candidate";

export function buildControlledBuildPlanBundleReleaseCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(CONTROLLED_BUILD_PLAN_BUNDLE_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledBuildPlanBundleReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(CONTROLLED_BUILD_PLAN_BUNDLE_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledBuildPlanBundleReleaseCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeControlledBuildPlanBundleReleaseCandidate(model: { controlledBuildPlanBundleReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(CONTROLLED_BUILD_PLAN_BUNDLE_RELEASE_CANDIDATE_SLUG, model.controlledBuildPlanBundleReleaseCandidateItems);
}

export function buildControlledBuildPlanBundleReleaseCandidateModel() {
  const controlledBuildPlanBundleReleaseCandidateItems = buildControlledBuildPlanBundleReleaseCandidateItems();
  const controlledBuildPlanBundleReleaseCandidateModel = buildBuildPlanBundleReviewModelForSlug(CONTROLLED_BUILD_PLAN_BUNDLE_RELEASE_CANDIDATE_SLUG, controlledBuildPlanBundleReleaseCandidateItems);
  return { ...controlledBuildPlanBundleReleaseCandidateModel, controlledBuildPlanBundleReleaseCandidateItems };
}
