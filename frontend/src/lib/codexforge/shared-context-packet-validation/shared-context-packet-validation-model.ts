import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SHARED_CONTEXT_PACKET_VALIDATION_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSharedContextPacketValidationStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SHARED_CONTEXT_PACKET_VALIDATION_LANGUAGE, buildSharedContextPacketValidationStableKey };

const SHARED_CONTEXT_PACKET_VALIDATION_SLUG = "shared-context-packet-validation";

export function buildSharedContextPacketValidation(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SHARED_CONTEXT_PACKET_VALIDATION_SLUG, input);
}

export function buildSharedContextPacketValidationItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SHARED_CONTEXT_PACKET_VALIDATION_SLUG);
}

export function buildSharedContextPacketValidationBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSharedContextPacketValidation(model: { sharedContextPacketValidationItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SHARED_CONTEXT_PACKET_VALIDATION_SLUG, model.sharedContextPacketValidationItems);
}

export function buildSharedContextPacketValidationModel() {
  const sharedContextPacketValidationItems = buildSharedContextPacketValidationItems();
  const sharedContextPacketValidationModel = buildBackendDryRunModelRouterPreviewModelForSlug(SHARED_CONTEXT_PACKET_VALIDATION_SLUG, sharedContextPacketValidationItems);
  return { ...sharedContextPacketValidationModel, sharedContextPacketValidationItems };
}

