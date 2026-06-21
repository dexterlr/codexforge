import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_SIMULATED_FILE_WRITE_RELEASE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildControlledSimulatedFileWriteReleaseCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { CONTROLLED_SIMULATED_FILE_WRITE_RELEASE_CANDIDATE_LANGUAGE, buildControlledSimulatedFileWriteReleaseCandidateStableKey };

const CONTROLLED_SIMULATED_FILE_WRITE_RELEASE_CANDIDATE_SLUG = "controlled-simulated-file-write-release-candidate";

export function buildControlledSimulatedFileWriteReleaseCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(CONTROLLED_SIMULATED_FILE_WRITE_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledSimulatedFileWriteReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(CONTROLLED_SIMULATED_FILE_WRITE_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledSimulatedFileWriteReleaseCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeControlledSimulatedFileWriteReleaseCandidate(model: { controlledSimulatedFileWriteReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(CONTROLLED_SIMULATED_FILE_WRITE_RELEASE_CANDIDATE_SLUG, model.controlledSimulatedFileWriteReleaseCandidateItems);
}

export function buildControlledSimulatedFileWriteReleaseCandidateModel() {
  const controlledSimulatedFileWriteReleaseCandidateItems = buildControlledSimulatedFileWriteReleaseCandidateItems();
  const controlledSimulatedFileWriteReleaseCandidateModel = buildBuildPlanBundleReviewModelForSlug(CONTROLLED_SIMULATED_FILE_WRITE_RELEASE_CANDIDATE_SLUG, controlledSimulatedFileWriteReleaseCandidateItems);
  return { ...controlledSimulatedFileWriteReleaseCandidateModel, controlledSimulatedFileWriteReleaseCandidateItems };
}
