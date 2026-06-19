import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_TOOL_SUPPORT_SCORE_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelToolSupportScorePreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_TOOL_SUPPORT_SCORE_PREVIEW_LANGUAGE, buildModelToolSupportScorePreviewStableKey };

const MODEL_TOOL_SUPPORT_SCORE_PREVIEW_SLUG = "model-tool-support-score-preview";

export function buildModelToolSupportScorePreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_TOOL_SUPPORT_SCORE_PREVIEW_SLUG, input);
}

export function buildModelToolSupportScorePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_TOOL_SUPPORT_SCORE_PREVIEW_SLUG);
}

export function buildModelToolSupportScorePreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelToolSupportScorePreview(model: { modelToolSupportScorePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_TOOL_SUPPORT_SCORE_PREVIEW_SLUG, model.modelToolSupportScorePreviewItems);
}

export function buildModelToolSupportScorePreviewModel() {
  const modelToolSupportScorePreviewItems = buildModelToolSupportScorePreviewItems();
  const modelToolSupportScorePreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_TOOL_SUPPORT_SCORE_PREVIEW_SLUG, modelToolSupportScorePreviewItems);
  return { ...modelToolSupportScorePreviewModel, modelToolSupportScorePreviewItems };
}
