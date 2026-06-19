import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTING_AUDIT_TRAIL_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelRoutingAuditTrailPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_ROUTING_AUDIT_TRAIL_PREVIEW_LANGUAGE, buildModelRoutingAuditTrailPreviewStableKey };

const MODEL_ROUTING_AUDIT_TRAIL_PREVIEW_SLUG = "model-routing-audit-trail-preview";

export function buildModelRoutingAuditTrailPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_ROUTING_AUDIT_TRAIL_PREVIEW_SLUG, input);
}

export function buildModelRoutingAuditTrailPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_ROUTING_AUDIT_TRAIL_PREVIEW_SLUG);
}

export function buildModelRoutingAuditTrailPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelRoutingAuditTrailPreview(model: { modelRoutingAuditTrailPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_ROUTING_AUDIT_TRAIL_PREVIEW_SLUG, model.modelRoutingAuditTrailPreviewItems);
}

export function buildModelRoutingAuditTrailPreviewModel() {
  const modelRoutingAuditTrailPreviewItems = buildModelRoutingAuditTrailPreviewItems();
  const modelRoutingAuditTrailPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_ROUTING_AUDIT_TRAIL_PREVIEW_SLUG, modelRoutingAuditTrailPreviewItems);
  return { ...modelRoutingAuditTrailPreviewModel, modelRoutingAuditTrailPreviewItems };
}
