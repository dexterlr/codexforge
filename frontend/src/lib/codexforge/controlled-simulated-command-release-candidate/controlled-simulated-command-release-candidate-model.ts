import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_SIMULATED_COMMAND_RELEASE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildControlledSimulatedCommandReleaseCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { CONTROLLED_SIMULATED_COMMAND_RELEASE_CANDIDATE_LANGUAGE, buildControlledSimulatedCommandReleaseCandidateStableKey };

const CONTROLLED_SIMULATED_COMMAND_RELEASE_CANDIDATE_SLUG = "controlled-simulated-command-release-candidate";

export function buildControlledSimulatedCommandReleaseCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(CONTROLLED_SIMULATED_COMMAND_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledSimulatedCommandReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(CONTROLLED_SIMULATED_COMMAND_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledSimulatedCommandReleaseCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeControlledSimulatedCommandReleaseCandidate(model: { controlledSimulatedCommandReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(CONTROLLED_SIMULATED_COMMAND_RELEASE_CANDIDATE_SLUG, model.controlledSimulatedCommandReleaseCandidateItems);
}

export function buildControlledSimulatedCommandReleaseCandidateModel() {
  const controlledSimulatedCommandReleaseCandidateItems = buildControlledSimulatedCommandReleaseCandidateItems();
  const controlledSimulatedCommandReleaseCandidateModel = buildBuildPlanBundleReviewModelForSlug(CONTROLLED_SIMULATED_COMMAND_RELEASE_CANDIDATE_SLUG, controlledSimulatedCommandReleaseCandidateItems);
  return { ...controlledSimulatedCommandReleaseCandidateModel, controlledSimulatedCommandReleaseCandidateItems };
}
