import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_SIMULATED_ADAPTER_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFirstSimulatedAdapterCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FIRST_SIMULATED_ADAPTER_CANDIDATE_LANGUAGE, buildFirstSimulatedAdapterCandidateStableKey };

const FIRST_SIMULATED_ADAPTER_CANDIDATE_SLUG = "first-simulated-adapter-candidate";

export function buildFirstSimulatedAdapterCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FIRST_SIMULATED_ADAPTER_CANDIDATE_SLUG, input);
}

export function buildFirstSimulatedAdapterCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FIRST_SIMULATED_ADAPTER_CANDIDATE_SLUG);
}

export function buildFirstSimulatedAdapterCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFirstSimulatedAdapterCandidate(model: { firstSimulatedAdapterCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FIRST_SIMULATED_ADAPTER_CANDIDATE_SLUG, model.firstSimulatedAdapterCandidateItems);
}

export function buildFirstSimulatedAdapterCandidateModel() {
  const firstSimulatedAdapterCandidateItems = buildFirstSimulatedAdapterCandidateItems();
  const firstSimulatedAdapterCandidateModel = buildBuildPlanBundleReviewModelForSlug(FIRST_SIMULATED_ADAPTER_CANDIDATE_SLUG, firstSimulatedAdapterCandidateItems);
  return { ...firstSimulatedAdapterCandidateModel, firstSimulatedAdapterCandidateItems };
}
