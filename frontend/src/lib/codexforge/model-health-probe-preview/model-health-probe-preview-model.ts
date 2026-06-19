import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_HEALTH_PROBE_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelHealthProbePreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_HEALTH_PROBE_PREVIEW_LANGUAGE, buildModelHealthProbePreviewStableKey };

const MODEL_HEALTH_PROBE_PREVIEW_SLUG = "model-health-probe-preview";

export function buildModelHealthProbePreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_HEALTH_PROBE_PREVIEW_SLUG, input);
}

export function buildModelHealthProbePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_HEALTH_PROBE_PREVIEW_SLUG);
}

export function buildModelHealthProbePreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelHealthProbePreview(model: { modelHealthProbePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_HEALTH_PROBE_PREVIEW_SLUG, model.modelHealthProbePreviewItems);
}

export function buildModelHealthProbePreviewModel() {
  const modelHealthProbePreviewItems = buildModelHealthProbePreviewItems();
  const modelHealthProbePreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_HEALTH_PROBE_PREVIEW_SLUG, modelHealthProbePreviewItems);
  return { ...modelHealthProbePreviewModel, modelHealthProbePreviewItems };
}
