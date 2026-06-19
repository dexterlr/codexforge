import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_COST_EFFICIENCY_SCORE_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelCostEfficiencyScorePreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_COST_EFFICIENCY_SCORE_PREVIEW_LANGUAGE, buildModelCostEfficiencyScorePreviewStableKey };

const MODEL_COST_EFFICIENCY_SCORE_PREVIEW_SLUG = "model-cost-efficiency-score-preview";

export function buildModelCostEfficiencyScorePreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_COST_EFFICIENCY_SCORE_PREVIEW_SLUG, input);
}

export function buildModelCostEfficiencyScorePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_COST_EFFICIENCY_SCORE_PREVIEW_SLUG);
}

export function buildModelCostEfficiencyScorePreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelCostEfficiencyScorePreview(model: { modelCostEfficiencyScorePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_COST_EFFICIENCY_SCORE_PREVIEW_SLUG, model.modelCostEfficiencyScorePreviewItems);
}

export function buildModelCostEfficiencyScorePreviewModel() {
  const modelCostEfficiencyScorePreviewItems = buildModelCostEfficiencyScorePreviewItems();
  const modelCostEfficiencyScorePreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_COST_EFFICIENCY_SCORE_PREVIEW_SLUG, modelCostEfficiencyScorePreviewItems);
  return { ...modelCostEfficiencyScorePreviewModel, modelCostEfficiencyScorePreviewItems };
}
