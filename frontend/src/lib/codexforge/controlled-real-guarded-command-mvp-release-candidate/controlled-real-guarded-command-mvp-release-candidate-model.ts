import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_REAL_GUARDED_COMMAND_MVP_RELEASE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildControlledRealGuardedCommandMvpReleaseCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { CONTROLLED_REAL_GUARDED_COMMAND_MVP_RELEASE_CANDIDATE_LANGUAGE, buildControlledRealGuardedCommandMvpReleaseCandidateStableKey };

const CONTROLLED_REAL_GUARDED_COMMAND_MVP_RELEASE_CANDIDATE_SLUG = "controlled-real-guarded-command-mvp-release-candidate";

export function buildControlledRealGuardedCommandMvpReleaseCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(CONTROLLED_REAL_GUARDED_COMMAND_MVP_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledRealGuardedCommandMvpReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(CONTROLLED_REAL_GUARDED_COMMAND_MVP_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledRealGuardedCommandMvpReleaseCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeControlledRealGuardedCommandMvpReleaseCandidate(model: { controlledRealGuardedCommandMvpReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(CONTROLLED_REAL_GUARDED_COMMAND_MVP_RELEASE_CANDIDATE_SLUG, model.controlledRealGuardedCommandMvpReleaseCandidateItems);
}

export function buildControlledRealGuardedCommandMvpReleaseCandidateModel() {
  const controlledRealGuardedCommandMvpReleaseCandidateItems = buildControlledRealGuardedCommandMvpReleaseCandidateItems();
  const controlledRealGuardedCommandMvpReleaseCandidateModel = buildBuildPlanBundleReviewModelForSlug(CONTROLLED_REAL_GUARDED_COMMAND_MVP_RELEASE_CANDIDATE_SLUG, controlledRealGuardedCommandMvpReleaseCandidateItems);
  return { ...controlledRealGuardedCommandMvpReleaseCandidateModel, controlledRealGuardedCommandMvpReleaseCandidateItems };
}
