import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_SIMULATED_FILE_WRITE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFirstSimulatedFileWriteCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FIRST_SIMULATED_FILE_WRITE_CANDIDATE_LANGUAGE, buildFirstSimulatedFileWriteCandidateStableKey };

const FIRST_SIMULATED_FILE_WRITE_CANDIDATE_SLUG = "first-simulated-file-write-candidate";

export function buildFirstSimulatedFileWriteCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FIRST_SIMULATED_FILE_WRITE_CANDIDATE_SLUG, input);
}

export function buildFirstSimulatedFileWriteCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FIRST_SIMULATED_FILE_WRITE_CANDIDATE_SLUG);
}

export function buildFirstSimulatedFileWriteCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFirstSimulatedFileWriteCandidate(model: { firstSimulatedFileWriteCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FIRST_SIMULATED_FILE_WRITE_CANDIDATE_SLUG, model.firstSimulatedFileWriteCandidateItems);
}

export function buildFirstSimulatedFileWriteCandidateModel() {
  const firstSimulatedFileWriteCandidateItems = buildFirstSimulatedFileWriteCandidateItems();
  const firstSimulatedFileWriteCandidateModel = buildBuildPlanBundleReviewModelForSlug(FIRST_SIMULATED_FILE_WRITE_CANDIDATE_SLUG, firstSimulatedFileWriteCandidateItems);
  return { ...firstSimulatedFileWriteCandidateModel, firstSimulatedFileWriteCandidateItems };
}
