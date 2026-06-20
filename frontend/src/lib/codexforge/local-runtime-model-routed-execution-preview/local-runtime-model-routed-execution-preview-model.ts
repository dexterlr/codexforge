import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_RUNTIME_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildLocalRuntimeModelRoutedExecutionPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { LOCAL_RUNTIME_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE, buildLocalRuntimeModelRoutedExecutionPreviewStableKey };

const LOCAL_RUNTIME_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG = "local-runtime-model-routed-execution-preview";

export function buildLocalRuntimeModelRoutedExecutionPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(LOCAL_RUNTIME_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, input);
}

export function buildLocalRuntimeModelRoutedExecutionPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(LOCAL_RUNTIME_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG);
}

export function buildLocalRuntimeModelRoutedExecutionPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeLocalRuntimeModelRoutedExecutionPreview(model: { localRuntimeModelRoutedExecutionPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(LOCAL_RUNTIME_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, model.localRuntimeModelRoutedExecutionPreviewItems);
}

export function buildLocalRuntimeModelRoutedExecutionPreviewModel() {
  const localRuntimeModelRoutedExecutionPreviewItems = buildLocalRuntimeModelRoutedExecutionPreviewItems();
  const localRuntimeModelRoutedExecutionPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(LOCAL_RUNTIME_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, localRuntimeModelRoutedExecutionPreviewItems);
  return { ...localRuntimeModelRoutedExecutionPreviewModel, localRuntimeModelRoutedExecutionPreviewItems };
}
