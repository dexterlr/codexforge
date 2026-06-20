import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_EXECUTION_READINESS_CANDIDATE_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildModelRouterExecutionReadinessCandidateStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { MODEL_ROUTER_EXECUTION_READINESS_CANDIDATE_LANGUAGE, buildModelRouterExecutionReadinessCandidateStableKey };

const MODEL_ROUTER_EXECUTION_READINESS_CANDIDATE_SLUG = "model-router-execution-readiness-candidate";

export function buildModelRouterExecutionReadinessCandidate(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(MODEL_ROUTER_EXECUTION_READINESS_CANDIDATE_SLUG, input);
}

export function buildModelRouterExecutionReadinessCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(MODEL_ROUTER_EXECUTION_READINESS_CANDIDATE_SLUG);
}

export function buildModelRouterExecutionReadinessCandidateBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeModelRouterExecutionReadinessCandidate(model: { modelRouterExecutionReadinessCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(MODEL_ROUTER_EXECUTION_READINESS_CANDIDATE_SLUG, model.modelRouterExecutionReadinessCandidateItems);
}

export function buildModelRouterExecutionReadinessCandidateModel() {
  const modelRouterExecutionReadinessCandidateItems = buildModelRouterExecutionReadinessCandidateItems();
  const modelRouterExecutionReadinessCandidateModel = buildModelRouterProviderReadinessReviewModelForSlug(MODEL_ROUTER_EXECUTION_READINESS_CANDIDATE_SLUG, modelRouterExecutionReadinessCandidateItems);
  return { ...modelRouterExecutionReadinessCandidateModel, modelRouterExecutionReadinessCandidateItems };
}
