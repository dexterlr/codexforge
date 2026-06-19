import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_SELECTION_APPROVAL_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelSelectionApprovalPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_SELECTION_APPROVAL_PACKET_LANGUAGE, buildModelSelectionApprovalPacketStableKey };

const MODEL_SELECTION_APPROVAL_PACKET_SLUG = "model-selection-approval-packet";

export function buildModelSelectionApprovalPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_SELECTION_APPROVAL_PACKET_SLUG, input);
}

export function buildModelSelectionApprovalPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_SELECTION_APPROVAL_PACKET_SLUG);
}

export function buildModelSelectionApprovalPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelSelectionApprovalPacket(model: { modelSelectionApprovalPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_SELECTION_APPROVAL_PACKET_SLUG, model.modelSelectionApprovalPacketItems);
}

export function buildModelSelectionApprovalPacketModel() {
  const modelSelectionApprovalPacketItems = buildModelSelectionApprovalPacketItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_SELECTION_APPROVAL_PACKET_SLUG, modelSelectionApprovalPacketItems);
  return { ...model, modelSelectionApprovalPacketItems };
}
