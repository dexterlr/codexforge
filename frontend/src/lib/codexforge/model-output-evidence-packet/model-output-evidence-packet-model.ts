import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_OUTPUT_EVIDENCE_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelOutputEvidencePacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_OUTPUT_EVIDENCE_PACKET_LANGUAGE, buildModelOutputEvidencePacketStableKey };

const MODEL_OUTPUT_EVIDENCE_PACKET_SLUG = "model-output-evidence-packet";

export function buildModelOutputEvidencePacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_OUTPUT_EVIDENCE_PACKET_SLUG, input);
}

export function buildModelOutputEvidencePacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_OUTPUT_EVIDENCE_PACKET_SLUG);
}

export function buildModelOutputEvidencePacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelOutputEvidencePacket(model: { modelOutputEvidencePacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_OUTPUT_EVIDENCE_PACKET_SLUG, model.modelOutputEvidencePacketItems);
}

export function buildModelOutputEvidencePacketModel() {
  const modelOutputEvidencePacketItems = buildModelOutputEvidencePacketItems();
  const modelOutputEvidencePacketModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_OUTPUT_EVIDENCE_PACKET_SLUG, modelOutputEvidencePacketItems);
  return { ...modelOutputEvidencePacketModel, modelOutputEvidencePacketItems };
}
