import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTED_EXECUTION_APPROVAL_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelRoutedExecutionApprovalPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_ROUTED_EXECUTION_APPROVAL_PACKET_LANGUAGE, buildModelRoutedExecutionApprovalPacketStableKey };

const MODEL_ROUTED_EXECUTION_APPROVAL_PACKET_SLUG = "model-routed-execution-approval-packet";

export function buildModelRoutedExecutionApprovalPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_ROUTED_EXECUTION_APPROVAL_PACKET_SLUG, input);
}

export function buildModelRoutedExecutionApprovalPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_ROUTED_EXECUTION_APPROVAL_PACKET_SLUG);
}

export function buildModelRoutedExecutionApprovalPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelRoutedExecutionApprovalPacket(model: { modelRoutedExecutionApprovalPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_ROUTED_EXECUTION_APPROVAL_PACKET_SLUG, model.modelRoutedExecutionApprovalPacketItems);
}

export function buildModelRoutedExecutionApprovalPacketModel() {
  const modelRoutedExecutionApprovalPacketItems = buildModelRoutedExecutionApprovalPacketItems();
  const modelRoutedExecutionApprovalPacketModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_ROUTED_EXECUTION_APPROVAL_PACKET_SLUG, modelRoutedExecutionApprovalPacketItems);
  return { ...modelRoutedExecutionApprovalPacketModel, modelRoutedExecutionApprovalPacketItems };
}
