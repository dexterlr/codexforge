import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_GUIDED_BUILD_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildControlledGuidedBuildWorkflowReleaseCandidateStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { CONTROLLED_GUIDED_BUILD_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE, buildControlledGuidedBuildWorkflowReleaseCandidateStableKey };

const CONTROLLED_GUIDED_BUILD_WORKFLOW_RELEASE_CANDIDATE_SLUG = "controlled-guided-build-workflow-release-candidate";

export function buildControlledGuidedBuildWorkflowReleaseCandidate(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(CONTROLLED_GUIDED_BUILD_WORKFLOW_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledGuidedBuildWorkflowReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(CONTROLLED_GUIDED_BUILD_WORKFLOW_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledGuidedBuildWorkflowReleaseCandidateBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeControlledGuidedBuildWorkflowReleaseCandidate(model: { controlledGuidedBuildWorkflowReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(CONTROLLED_GUIDED_BUILD_WORKFLOW_RELEASE_CANDIDATE_SLUG, model.controlledGuidedBuildWorkflowReleaseCandidateItems);
}

export function buildControlledGuidedBuildWorkflowReleaseCandidateModel() {
  const controlledGuidedBuildWorkflowReleaseCandidateItems = buildControlledGuidedBuildWorkflowReleaseCandidateItems();
  const controlledGuidedBuildWorkflowReleaseCandidateModel = buildGuidedBuildWorkflowReviewModelForSlug(CONTROLLED_GUIDED_BUILD_WORKFLOW_RELEASE_CANDIDATE_SLUG, controlledGuidedBuildWorkflowReleaseCandidateItems);
  return { ...controlledGuidedBuildWorkflowReleaseCandidateModel, controlledGuidedBuildWorkflowReleaseCandidateItems };
}

