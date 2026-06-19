import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_COST_QUALITY_POLICY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelCostQualityPolicyPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_COST_QUALITY_POLICY_PREVIEW_LANGUAGE, buildModelCostQualityPolicyPreviewStableKey };

const MODEL_COST_QUALITY_POLICY_PREVIEW_SLUG = "model-cost-quality-policy-preview";

export function buildModelCostQualityPolicyPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_COST_QUALITY_POLICY_PREVIEW_SLUG, input);
}

export function buildModelCostQualityPolicyPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_COST_QUALITY_POLICY_PREVIEW_SLUG);
}

export function buildModelCostQualityPolicyPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelCostQualityPolicyPreview(model: { modelCostQualityPolicyPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_COST_QUALITY_POLICY_PREVIEW_SLUG, model.modelCostQualityPolicyPreviewItems);
}

export function buildModelCostQualityPolicyPreviewModel() {
  const modelCostQualityPolicyPreviewItems = buildModelCostQualityPolicyPreviewItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_COST_QUALITY_POLICY_PREVIEW_SLUG, modelCostQualityPolicyPreviewItems);
  return { ...model, modelCostQualityPolicyPreviewItems };
}
