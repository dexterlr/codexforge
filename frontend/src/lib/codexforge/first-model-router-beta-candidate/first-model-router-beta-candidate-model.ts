import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_MODEL_ROUTER_BETA_CANDIDATE_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildFirstModelRouterBetaCandidateStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { FIRST_MODEL_ROUTER_BETA_CANDIDATE_LANGUAGE, buildFirstModelRouterBetaCandidateStableKey };

const FIRST_MODEL_ROUTER_BETA_CANDIDATE_SLUG = "first-model-router-beta-candidate";

export function buildFirstModelRouterBetaCandidate(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(FIRST_MODEL_ROUTER_BETA_CANDIDATE_SLUG, input);
}

export function buildFirstModelRouterBetaCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(FIRST_MODEL_ROUTER_BETA_CANDIDATE_SLUG);
}

export function buildFirstModelRouterBetaCandidateBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeFirstModelRouterBetaCandidate(model: { firstModelRouterBetaCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(FIRST_MODEL_ROUTER_BETA_CANDIDATE_SLUG, model.firstModelRouterBetaCandidateItems);
}

export function buildFirstModelRouterBetaCandidateModel() {
  const firstModelRouterBetaCandidateItems = buildFirstModelRouterBetaCandidateItems();
  const firstModelRouterBetaCandidateModel = buildModelRouterProviderReadinessReviewModelForSlug(FIRST_MODEL_ROUTER_BETA_CANDIDATE_SLUG, firstModelRouterBetaCandidateItems);
  return { ...firstModelRouterBetaCandidateModel, firstModelRouterBetaCandidateItems };
}
