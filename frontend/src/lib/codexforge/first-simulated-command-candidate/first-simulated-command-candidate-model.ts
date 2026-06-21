import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_SIMULATED_COMMAND_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFirstSimulatedCommandCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FIRST_SIMULATED_COMMAND_CANDIDATE_LANGUAGE, buildFirstSimulatedCommandCandidateStableKey };

const FIRST_SIMULATED_COMMAND_CANDIDATE_SLUG = "first-simulated-command-candidate";

export function buildFirstSimulatedCommandCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FIRST_SIMULATED_COMMAND_CANDIDATE_SLUG, input);
}

export function buildFirstSimulatedCommandCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FIRST_SIMULATED_COMMAND_CANDIDATE_SLUG);
}

export function buildFirstSimulatedCommandCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFirstSimulatedCommandCandidate(model: { firstSimulatedCommandCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FIRST_SIMULATED_COMMAND_CANDIDATE_SLUG, model.firstSimulatedCommandCandidateItems);
}

export function buildFirstSimulatedCommandCandidateModel() {
  const firstSimulatedCommandCandidateItems = buildFirstSimulatedCommandCandidateItems();
  const firstSimulatedCommandCandidateModel = buildBuildPlanBundleReviewModelForSlug(FIRST_SIMULATED_COMMAND_CANDIDATE_SLUG, firstSimulatedCommandCandidateItems);
  return { ...firstSimulatedCommandCandidateModel, firstSimulatedCommandCandidateItems };
}
