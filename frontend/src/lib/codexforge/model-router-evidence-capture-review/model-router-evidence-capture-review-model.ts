import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTER_EVIDENCE_CAPTURE_REVIEW_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildModelRouterEvidenceCaptureReviewStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { MODEL_ROUTER_EVIDENCE_CAPTURE_REVIEW_LANGUAGE, buildModelRouterEvidenceCaptureReviewStableKey };

const MODEL_ROUTER_EVIDENCE_CAPTURE_REVIEW_SLUG = "model-router-evidence-capture-review";

export function buildModelRouterEvidenceCaptureReview(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(MODEL_ROUTER_EVIDENCE_CAPTURE_REVIEW_SLUG, input);
}

export function buildModelRouterEvidenceCaptureReviewItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(MODEL_ROUTER_EVIDENCE_CAPTURE_REVIEW_SLUG);
}

export function buildModelRouterEvidenceCaptureReviewBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeModelRouterEvidenceCaptureReview(model: { modelRouterEvidenceCaptureReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(MODEL_ROUTER_EVIDENCE_CAPTURE_REVIEW_SLUG, model.modelRouterEvidenceCaptureReviewItems);
}

export function buildModelRouterEvidenceCaptureReviewModel() {
  const modelRouterEvidenceCaptureReviewItems = buildModelRouterEvidenceCaptureReviewItems();
  const modelRouterEvidenceCaptureReviewModel = buildModelRouterProviderReadinessReviewModelForSlug(MODEL_ROUTER_EVIDENCE_CAPTURE_REVIEW_SLUG, modelRouterEvidenceCaptureReviewItems);
  return { ...modelRouterEvidenceCaptureReviewModel, modelRouterEvidenceCaptureReviewItems };
}
