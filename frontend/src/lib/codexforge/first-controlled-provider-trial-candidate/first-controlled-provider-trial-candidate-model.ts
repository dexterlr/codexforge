import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_CONTROLLED_PROVIDER_TRIAL_CANDIDATE_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildFirstControlledProviderTrialCandidateStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { FIRST_CONTROLLED_PROVIDER_TRIAL_CANDIDATE_LANGUAGE, buildFirstControlledProviderTrialCandidateStableKey };

const FIRST_CONTROLLED_PROVIDER_TRIAL_CANDIDATE_SLUG = "first-controlled-provider-trial-candidate";

export function buildFirstControlledProviderTrialCandidate(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(FIRST_CONTROLLED_PROVIDER_TRIAL_CANDIDATE_SLUG, input);
}

export function buildFirstControlledProviderTrialCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(FIRST_CONTROLLED_PROVIDER_TRIAL_CANDIDATE_SLUG);
}

export function buildFirstControlledProviderTrialCandidateBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeFirstControlledProviderTrialCandidate(model: { firstControlledProviderTrialCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(FIRST_CONTROLLED_PROVIDER_TRIAL_CANDIDATE_SLUG, model.firstControlledProviderTrialCandidateItems);
}

export function buildFirstControlledProviderTrialCandidateModel() {
  const firstControlledProviderTrialCandidateItems = buildFirstControlledProviderTrialCandidateItems();
  const firstControlledProviderTrialCandidateModel = buildModelRouterProviderReadinessReviewModelForSlug(FIRST_CONTROLLED_PROVIDER_TRIAL_CANDIDATE_SLUG, firstControlledProviderTrialCandidateItems);
  return { ...firstControlledProviderTrialCandidateModel, firstControlledProviderTrialCandidateItems };
}
