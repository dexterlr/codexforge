import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_PRACTICAL_GUIDED_BUILD_CANDIDATE_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildFirstPracticalGuidedBuildCandidateStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { FIRST_PRACTICAL_GUIDED_BUILD_CANDIDATE_LANGUAGE, buildFirstPracticalGuidedBuildCandidateStableKey };

const FIRST_PRACTICAL_GUIDED_BUILD_CANDIDATE_SLUG = "first-practical-guided-build-candidate";

export function buildFirstPracticalGuidedBuildCandidate(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(FIRST_PRACTICAL_GUIDED_BUILD_CANDIDATE_SLUG, input);
}

export function buildFirstPracticalGuidedBuildCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(FIRST_PRACTICAL_GUIDED_BUILD_CANDIDATE_SLUG);
}

export function buildFirstPracticalGuidedBuildCandidateBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeFirstPracticalGuidedBuildCandidate(model: { firstPracticalGuidedBuildCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(FIRST_PRACTICAL_GUIDED_BUILD_CANDIDATE_SLUG, model.firstPracticalGuidedBuildCandidateItems);
}

export function buildFirstPracticalGuidedBuildCandidateModel() {
  const firstPracticalGuidedBuildCandidateItems = buildFirstPracticalGuidedBuildCandidateItems();
  const firstPracticalGuidedBuildCandidateModel = buildGuidedBuildWorkflowReviewModelForSlug(FIRST_PRACTICAL_GUIDED_BUILD_CANDIDATE_SLUG, firstPracticalGuidedBuildCandidateItems);
  return { ...firstPracticalGuidedBuildCandidateModel, firstPracticalGuidedBuildCandidateItems };
}

