import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_CANDIDATE_RANKING_REVIEW_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildModelRouterCandidateRankingReviewStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { MODEL_ROUTER_CANDIDATE_RANKING_REVIEW_LANGUAGE, buildModelRouterCandidateRankingReviewStableKey };

const MODEL_ROUTER_CANDIDATE_RANKING_REVIEW_SLUG = "model-router-candidate-ranking-review";

export function buildModelRouterCandidateRankingReview(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(MODEL_ROUTER_CANDIDATE_RANKING_REVIEW_SLUG, input);
}

export function buildModelRouterCandidateRankingReviewItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(MODEL_ROUTER_CANDIDATE_RANKING_REVIEW_SLUG);
}

export function buildModelRouterCandidateRankingReviewBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeModelRouterCandidateRankingReview(model: { modelRouterCandidateRankingReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(MODEL_ROUTER_CANDIDATE_RANKING_REVIEW_SLUG, model.modelRouterCandidateRankingReviewItems);
}

export function buildModelRouterCandidateRankingReviewModel() {
  const modelRouterCandidateRankingReviewItems = buildModelRouterCandidateRankingReviewItems();
  const modelRouterCandidateRankingReviewModel = buildModelRouterProviderReadinessReviewModelForSlug(MODEL_ROUTER_CANDIDATE_RANKING_REVIEW_SLUG, modelRouterCandidateRankingReviewItems);
  return { ...modelRouterCandidateRankingReviewModel, modelRouterCandidateRankingReviewItems };
}
