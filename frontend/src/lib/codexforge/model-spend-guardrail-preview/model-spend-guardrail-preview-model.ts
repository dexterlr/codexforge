import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_SPEND_GUARDRAIL_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelSpendGuardrailPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_SPEND_GUARDRAIL_PREVIEW_LANGUAGE, buildModelSpendGuardrailPreviewStableKey };

const MODEL_SPEND_GUARDRAIL_PREVIEW_SLUG = "model-spend-guardrail-preview";

export function buildModelSpendGuardrailPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_SPEND_GUARDRAIL_PREVIEW_SLUG, input);
}

export function buildModelSpendGuardrailPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_SPEND_GUARDRAIL_PREVIEW_SLUG);
}

export function buildModelSpendGuardrailPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelSpendGuardrailPreview(model: { modelSpendGuardrailPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_SPEND_GUARDRAIL_PREVIEW_SLUG, model.modelSpendGuardrailPreviewItems);
}

export function buildModelSpendGuardrailPreviewModel() {
  const modelSpendGuardrailPreviewItems = buildModelSpendGuardrailPreviewItems();
  const modelSpendGuardrailPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_SPEND_GUARDRAIL_PREVIEW_SLUG, modelSpendGuardrailPreviewItems);
  return { ...modelSpendGuardrailPreviewModel, modelSpendGuardrailPreviewItems };
}
