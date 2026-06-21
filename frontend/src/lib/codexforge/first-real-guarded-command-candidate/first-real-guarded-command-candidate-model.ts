import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_REAL_GUARDED_COMMAND_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFirstRealGuardedCommandCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FIRST_REAL_GUARDED_COMMAND_CANDIDATE_LANGUAGE, buildFirstRealGuardedCommandCandidateStableKey };

const FIRST_REAL_GUARDED_COMMAND_CANDIDATE_SLUG = "first-real-guarded-command-candidate";

export function buildFirstRealGuardedCommandCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FIRST_REAL_GUARDED_COMMAND_CANDIDATE_SLUG, input);
}

export function buildFirstRealGuardedCommandCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FIRST_REAL_GUARDED_COMMAND_CANDIDATE_SLUG);
}

export function buildFirstRealGuardedCommandCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFirstRealGuardedCommandCandidate(model: { firstRealGuardedCommandCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FIRST_REAL_GUARDED_COMMAND_CANDIDATE_SLUG, model.firstRealGuardedCommandCandidateItems);
}

export function buildFirstRealGuardedCommandCandidateModel() {
  const firstRealGuardedCommandCandidateItems = buildFirstRealGuardedCommandCandidateItems();
  const firstRealGuardedCommandCandidateModel = buildBuildPlanBundleReviewModelForSlug(FIRST_REAL_GUARDED_COMMAND_CANDIDATE_SLUG, firstRealGuardedCommandCandidateItems);
  return { ...firstRealGuardedCommandCandidateModel, firstRealGuardedCommandCandidateItems };
}
