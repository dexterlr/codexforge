import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_SIMULATED_RUNTIME_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFirstSimulatedRuntimeCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FIRST_SIMULATED_RUNTIME_CANDIDATE_LANGUAGE, buildFirstSimulatedRuntimeCandidateStableKey };

const FIRST_SIMULATED_RUNTIME_CANDIDATE_SLUG = "first-simulated-runtime-candidate";

export function buildFirstSimulatedRuntimeCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FIRST_SIMULATED_RUNTIME_CANDIDATE_SLUG, input);
}

export function buildFirstSimulatedRuntimeCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FIRST_SIMULATED_RUNTIME_CANDIDATE_SLUG);
}

export function buildFirstSimulatedRuntimeCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFirstSimulatedRuntimeCandidate(model: { firstSimulatedRuntimeCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FIRST_SIMULATED_RUNTIME_CANDIDATE_SLUG, model.firstSimulatedRuntimeCandidateItems);
}

export function buildFirstSimulatedRuntimeCandidateModel() {
  const firstSimulatedRuntimeCandidateItems = buildFirstSimulatedRuntimeCandidateItems();
  const firstSimulatedRuntimeCandidateModel = buildBuildPlanBundleReviewModelForSlug(FIRST_SIMULATED_RUNTIME_CANDIDATE_SLUG, firstSimulatedRuntimeCandidateItems);
  return { ...firstSimulatedRuntimeCandidateModel, firstSimulatedRuntimeCandidateItems };
}
