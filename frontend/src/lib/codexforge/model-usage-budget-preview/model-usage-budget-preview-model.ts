import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_USAGE_BUDGET_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelUsageBudgetPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_USAGE_BUDGET_PREVIEW_LANGUAGE, buildModelUsageBudgetPreviewStableKey };

const MODEL_USAGE_BUDGET_PREVIEW_SLUG = "model-usage-budget-preview";

export function buildModelUsageBudgetPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_USAGE_BUDGET_PREVIEW_SLUG, input);
}

export function buildModelUsageBudgetPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_USAGE_BUDGET_PREVIEW_SLUG);
}

export function buildModelUsageBudgetPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelUsageBudgetPreview(model: { modelUsageBudgetPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_USAGE_BUDGET_PREVIEW_SLUG, model.modelUsageBudgetPreviewItems);
}

export function buildModelUsageBudgetPreviewModel() {
  const modelUsageBudgetPreviewItems = buildModelUsageBudgetPreviewItems();
  const modelUsageBudgetPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_USAGE_BUDGET_PREVIEW_SLUG, modelUsageBudgetPreviewItems);
  return { ...modelUsageBudgetPreviewModel, modelUsageBudgetPreviewItems };
}
