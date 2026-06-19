import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SHARED_MODEL_MEMORY_ACCESS_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSharedModelMemoryAccessPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SHARED_MODEL_MEMORY_ACCESS_PREVIEW_LANGUAGE, buildSharedModelMemoryAccessPreviewStableKey };

const SHARED_MODEL_MEMORY_ACCESS_PREVIEW_SLUG = "shared-model-memory-access-preview";

export function buildSharedModelMemoryAccessPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SHARED_MODEL_MEMORY_ACCESS_PREVIEW_SLUG, input);
}

export function buildSharedModelMemoryAccessPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SHARED_MODEL_MEMORY_ACCESS_PREVIEW_SLUG);
}

export function buildSharedModelMemoryAccessPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSharedModelMemoryAccessPreview(model: { sharedModelMemoryAccessPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SHARED_MODEL_MEMORY_ACCESS_PREVIEW_SLUG, model.sharedModelMemoryAccessPreviewItems);
}

export function buildSharedModelMemoryAccessPreviewModel() {
  const sharedModelMemoryAccessPreviewItems = buildSharedModelMemoryAccessPreviewItems();
  const sharedModelMemoryAccessPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(SHARED_MODEL_MEMORY_ACCESS_PREVIEW_SLUG, sharedModelMemoryAccessPreviewItems);
  return { ...sharedModelMemoryAccessPreviewModel, sharedModelMemoryAccessPreviewItems };
}
