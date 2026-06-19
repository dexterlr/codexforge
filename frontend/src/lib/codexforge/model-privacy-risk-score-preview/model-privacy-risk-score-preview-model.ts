import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_PRIVACY_RISK_SCORE_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelPrivacyRiskScorePreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_PRIVACY_RISK_SCORE_PREVIEW_LANGUAGE, buildModelPrivacyRiskScorePreviewStableKey };

const MODEL_PRIVACY_RISK_SCORE_PREVIEW_SLUG = "model-privacy-risk-score-preview";

export function buildModelPrivacyRiskScorePreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_PRIVACY_RISK_SCORE_PREVIEW_SLUG, input);
}

export function buildModelPrivacyRiskScorePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_PRIVACY_RISK_SCORE_PREVIEW_SLUG);
}

export function buildModelPrivacyRiskScorePreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelPrivacyRiskScorePreview(model: { modelPrivacyRiskScorePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_PRIVACY_RISK_SCORE_PREVIEW_SLUG, model.modelPrivacyRiskScorePreviewItems);
}

export function buildModelPrivacyRiskScorePreviewModel() {
  const modelPrivacyRiskScorePreviewItems = buildModelPrivacyRiskScorePreviewItems();
  const modelPrivacyRiskScorePreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_PRIVACY_RISK_SCORE_PREVIEW_SLUG, modelPrivacyRiskScorePreviewItems);
  return { ...modelPrivacyRiskScorePreviewModel, modelPrivacyRiskScorePreviewItems };
}
