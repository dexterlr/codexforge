import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_CONTINUITY_HANDOFF_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelContinuityHandoffPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_CONTINUITY_HANDOFF_PACKET_LANGUAGE, buildModelContinuityHandoffPacketStableKey };

const MODEL_CONTINUITY_HANDOFF_PACKET_SLUG = "model-continuity-handoff-packet";

export function buildModelContinuityHandoffPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_CONTINUITY_HANDOFF_PACKET_SLUG, input);
}

export function buildModelContinuityHandoffPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_CONTINUITY_HANDOFF_PACKET_SLUG);
}

export function buildModelContinuityHandoffPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelContinuityHandoffPacket(model: { modelContinuityHandoffPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_CONTINUITY_HANDOFF_PACKET_SLUG, model.modelContinuityHandoffPacketItems);
}

export function buildModelContinuityHandoffPacketModel() {
  const modelContinuityHandoffPacketItems = buildModelContinuityHandoffPacketItems();
  const modelContinuityHandoffPacketModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_CONTINUITY_HANDOFF_PACKET_SLUG, modelContinuityHandoffPacketItems);
  return { ...modelContinuityHandoffPacketModel, modelContinuityHandoffPacketItems };
}
