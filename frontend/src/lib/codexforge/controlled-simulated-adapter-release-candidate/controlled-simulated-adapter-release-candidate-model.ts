import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_SIMULATED_ADAPTER_RELEASE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildControlledSimulatedAdapterReleaseCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { CONTROLLED_SIMULATED_ADAPTER_RELEASE_CANDIDATE_LANGUAGE, buildControlledSimulatedAdapterReleaseCandidateStableKey };

const CONTROLLED_SIMULATED_ADAPTER_RELEASE_CANDIDATE_SLUG = "controlled-simulated-adapter-release-candidate";

export function buildControlledSimulatedAdapterReleaseCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(CONTROLLED_SIMULATED_ADAPTER_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledSimulatedAdapterReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(CONTROLLED_SIMULATED_ADAPTER_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledSimulatedAdapterReleaseCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeControlledSimulatedAdapterReleaseCandidate(model: { controlledSimulatedAdapterReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(CONTROLLED_SIMULATED_ADAPTER_RELEASE_CANDIDATE_SLUG, model.controlledSimulatedAdapterReleaseCandidateItems);
}

export function buildControlledSimulatedAdapterReleaseCandidateModel() {
  const controlledSimulatedAdapterReleaseCandidateItems = buildControlledSimulatedAdapterReleaseCandidateItems();
  const controlledSimulatedAdapterReleaseCandidateModel = buildBuildPlanBundleReviewModelForSlug(CONTROLLED_SIMULATED_ADAPTER_RELEASE_CANDIDATE_SLUG, controlledSimulatedAdapterReleaseCandidateItems);
  return { ...controlledSimulatedAdapterReleaseCandidateModel, controlledSimulatedAdapterReleaseCandidateItems };
}
