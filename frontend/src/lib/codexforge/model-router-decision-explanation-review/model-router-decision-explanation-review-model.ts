import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_DECISION_EXPLANATION_REVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelRouterDecisionExplanationReviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_ROUTER_DECISION_EXPLANATION_REVIEW_LANGUAGE, buildModelRouterDecisionExplanationReviewStableKey };

const MODEL_ROUTER_DECISION_EXPLANATION_REVIEW_SLUG = "model-router-decision-explanation-review";

export function buildModelRouterDecisionExplanationReview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_ROUTER_DECISION_EXPLANATION_REVIEW_SLUG, input);
}

export function buildModelRouterDecisionExplanationReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_ROUTER_DECISION_EXPLANATION_REVIEW_SLUG);
}

export function buildModelRouterDecisionExplanationReviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelRouterDecisionExplanationReview(model: { modelRouterDecisionExplanationReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_ROUTER_DECISION_EXPLANATION_REVIEW_SLUG, model.modelRouterDecisionExplanationReviewItems);
}

export function buildModelRouterDecisionExplanationReviewModel() {
  const modelRouterDecisionExplanationReviewItems = buildModelRouterDecisionExplanationReviewItems();
  const modelRouterDecisionExplanationReviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_ROUTER_DECISION_EXPLANATION_REVIEW_SLUG, modelRouterDecisionExplanationReviewItems);
  return { ...modelRouterDecisionExplanationReviewModel, modelRouterDecisionExplanationReviewItems };
}

