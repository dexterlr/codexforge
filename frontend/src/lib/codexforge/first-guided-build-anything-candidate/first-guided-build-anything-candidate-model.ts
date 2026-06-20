import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_GUIDED_BUILD_ANYTHING_CANDIDATE_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildFirstGuidedBuildAnythingCandidateStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { FIRST_GUIDED_BUILD_ANYTHING_CANDIDATE_LANGUAGE, buildFirstGuidedBuildAnythingCandidateStableKey };

const FIRST_GUIDED_BUILD_ANYTHING_CANDIDATE_SLUG = "first-guided-build-anything-candidate";

export function buildFirstGuidedBuildAnythingCandidate(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(FIRST_GUIDED_BUILD_ANYTHING_CANDIDATE_SLUG, input);
}

export function buildFirstGuidedBuildAnythingCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(FIRST_GUIDED_BUILD_ANYTHING_CANDIDATE_SLUG);
}

export function buildFirstGuidedBuildAnythingCandidateBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeFirstGuidedBuildAnythingCandidate(model: { firstGuidedBuildAnythingCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(FIRST_GUIDED_BUILD_ANYTHING_CANDIDATE_SLUG, model.firstGuidedBuildAnythingCandidateItems);
}

export function buildFirstGuidedBuildAnythingCandidateModel() {
  const firstGuidedBuildAnythingCandidateItems = buildFirstGuidedBuildAnythingCandidateItems();
  const firstGuidedBuildAnythingCandidateModel = buildUniversalBuilderCockpitReviewModelForSlug(FIRST_GUIDED_BUILD_ANYTHING_CANDIDATE_SLUG, firstGuidedBuildAnythingCandidateItems);
  return { ...firstGuidedBuildAnythingCandidateModel, firstGuidedBuildAnythingCandidateItems };
}
