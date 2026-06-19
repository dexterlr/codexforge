import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SHARED_MEMORY_HANDOFF_VALIDATION_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSharedMemoryHandoffValidationStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SHARED_MEMORY_HANDOFF_VALIDATION_LANGUAGE, buildSharedMemoryHandoffValidationStableKey };

const SHARED_MEMORY_HANDOFF_VALIDATION_SLUG = "shared-memory-handoff-validation";

export function buildSharedMemoryHandoffValidation(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SHARED_MEMORY_HANDOFF_VALIDATION_SLUG, input);
}

export function buildSharedMemoryHandoffValidationItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SHARED_MEMORY_HANDOFF_VALIDATION_SLUG);
}

export function buildSharedMemoryHandoffValidationBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSharedMemoryHandoffValidation(model: { sharedMemoryHandoffValidationItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SHARED_MEMORY_HANDOFF_VALIDATION_SLUG, model.sharedMemoryHandoffValidationItems);
}

export function buildSharedMemoryHandoffValidationModel() {
  const sharedMemoryHandoffValidationItems = buildSharedMemoryHandoffValidationItems();
  const sharedMemoryHandoffValidationModel = buildBackendDryRunModelRouterPreviewModelForSlug(SHARED_MEMORY_HANDOFF_VALIDATION_SLUG, sharedMemoryHandoffValidationItems);
  return { ...sharedMemoryHandoffValidationModel, sharedMemoryHandoffValidationItems };
}

