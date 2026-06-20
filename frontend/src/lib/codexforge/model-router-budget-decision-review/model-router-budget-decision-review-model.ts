import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_BUDGET_DECISION_REVIEW_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildModelRouterBudgetDecisionReviewStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { MODEL_ROUTER_BUDGET_DECISION_REVIEW_LANGUAGE, buildModelRouterBudgetDecisionReviewStableKey };

const MODEL_ROUTER_BUDGET_DECISION_REVIEW_SLUG = "model-router-budget-decision-review";

export function buildModelRouterBudgetDecisionReview(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(MODEL_ROUTER_BUDGET_DECISION_REVIEW_SLUG, input);
}

export function buildModelRouterBudgetDecisionReviewItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(MODEL_ROUTER_BUDGET_DECISION_REVIEW_SLUG);
}

export function buildModelRouterBudgetDecisionReviewBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeModelRouterBudgetDecisionReview(model: { modelRouterBudgetDecisionReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(MODEL_ROUTER_BUDGET_DECISION_REVIEW_SLUG, model.modelRouterBudgetDecisionReviewItems);
}

export function buildModelRouterBudgetDecisionReviewModel() {
  const modelRouterBudgetDecisionReviewItems = buildModelRouterBudgetDecisionReviewItems();
  const modelRouterBudgetDecisionReviewModel = buildModelRouterProviderReadinessReviewModelForSlug(MODEL_ROUTER_BUDGET_DECISION_REVIEW_SLUG, modelRouterBudgetDecisionReviewItems);
  return { ...modelRouterBudgetDecisionReviewModel, modelRouterBudgetDecisionReviewItems };
}
