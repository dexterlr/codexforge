import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_CONTROLLED_MODEL_ROUTER_TRIAL_REVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildFirstControlledModelRouterTrialReviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { FIRST_CONTROLLED_MODEL_ROUTER_TRIAL_REVIEW_LANGUAGE, buildFirstControlledModelRouterTrialReviewStableKey };

const FIRST_CONTROLLED_MODEL_ROUTER_TRIAL_REVIEW_SLUG = "first-controlled-model-router-trial-review";

export function buildFirstControlledModelRouterTrialReview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(FIRST_CONTROLLED_MODEL_ROUTER_TRIAL_REVIEW_SLUG, input);
}

export function buildFirstControlledModelRouterTrialReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(FIRST_CONTROLLED_MODEL_ROUTER_TRIAL_REVIEW_SLUG);
}

export function buildFirstControlledModelRouterTrialReviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeFirstControlledModelRouterTrialReview(model: { firstControlledModelRouterTrialReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(FIRST_CONTROLLED_MODEL_ROUTER_TRIAL_REVIEW_SLUG, model.firstControlledModelRouterTrialReviewItems);
}

export function buildFirstControlledModelRouterTrialReviewModel() {
  const firstControlledModelRouterTrialReviewItems = buildFirstControlledModelRouterTrialReviewItems();
  const firstControlledModelRouterTrialReviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(FIRST_CONTROLLED_MODEL_ROUTER_TRIAL_REVIEW_SLUG, firstControlledModelRouterTrialReviewItems);
  return { ...firstControlledModelRouterTrialReviewModel, firstControlledModelRouterTrialReviewItems };
}

