import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_SIMULATED_RUNTIME_RELEASE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildControlledSimulatedRuntimeReleaseCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { CONTROLLED_SIMULATED_RUNTIME_RELEASE_CANDIDATE_LANGUAGE, buildControlledSimulatedRuntimeReleaseCandidateStableKey };

const CONTROLLED_SIMULATED_RUNTIME_RELEASE_CANDIDATE_SLUG = "controlled-simulated-runtime-release-candidate";

export function buildControlledSimulatedRuntimeReleaseCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(CONTROLLED_SIMULATED_RUNTIME_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledSimulatedRuntimeReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(CONTROLLED_SIMULATED_RUNTIME_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledSimulatedRuntimeReleaseCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeControlledSimulatedRuntimeReleaseCandidate(model: { controlledSimulatedRuntimeReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(CONTROLLED_SIMULATED_RUNTIME_RELEASE_CANDIDATE_SLUG, model.controlledSimulatedRuntimeReleaseCandidateItems);
}

export function buildControlledSimulatedRuntimeReleaseCandidateModel() {
  const controlledSimulatedRuntimeReleaseCandidateItems = buildControlledSimulatedRuntimeReleaseCandidateItems();
  const controlledSimulatedRuntimeReleaseCandidateModel = buildBuildPlanBundleReviewModelForSlug(CONTROLLED_SIMULATED_RUNTIME_RELEASE_CANDIDATE_SLUG, controlledSimulatedRuntimeReleaseCandidateItems);
  return { ...controlledSimulatedRuntimeReleaseCandidateModel, controlledSimulatedRuntimeReleaseCandidateItems };
}
