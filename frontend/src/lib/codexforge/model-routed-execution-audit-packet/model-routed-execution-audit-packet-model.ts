import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTED_EXECUTION_AUDIT_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelRoutedExecutionAuditPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_ROUTED_EXECUTION_AUDIT_PACKET_LANGUAGE, buildModelRoutedExecutionAuditPacketStableKey };

const MODEL_ROUTED_EXECUTION_AUDIT_PACKET_SLUG = "model-routed-execution-audit-packet";

export function buildModelRoutedExecutionAuditPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_ROUTED_EXECUTION_AUDIT_PACKET_SLUG, input);
}

export function buildModelRoutedExecutionAuditPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_ROUTED_EXECUTION_AUDIT_PACKET_SLUG);
}

export function buildModelRoutedExecutionAuditPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelRoutedExecutionAuditPacket(model: { modelRoutedExecutionAuditPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_ROUTED_EXECUTION_AUDIT_PACKET_SLUG, model.modelRoutedExecutionAuditPacketItems);
}

export function buildModelRoutedExecutionAuditPacketModel() {
  const modelRoutedExecutionAuditPacketItems = buildModelRoutedExecutionAuditPacketItems();
  const modelRoutedExecutionAuditPacketModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_ROUTED_EXECUTION_AUDIT_PACKET_SLUG, modelRoutedExecutionAuditPacketItems);
  return { ...modelRoutedExecutionAuditPacketModel, modelRoutedExecutionAuditPacketItems };
}
