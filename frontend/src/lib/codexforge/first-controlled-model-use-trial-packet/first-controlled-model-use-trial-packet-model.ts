import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_CONTROLLED_MODEL_USE_TRIAL_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildFirstControlledModelUseTrialPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { FIRST_CONTROLLED_MODEL_USE_TRIAL_PACKET_LANGUAGE, buildFirstControlledModelUseTrialPacketStableKey };

const FIRST_CONTROLLED_MODEL_USE_TRIAL_PACKET_SLUG = "first-controlled-model-use-trial-packet";

export function buildFirstControlledModelUseTrialPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(FIRST_CONTROLLED_MODEL_USE_TRIAL_PACKET_SLUG, input);
}

export function buildFirstControlledModelUseTrialPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(FIRST_CONTROLLED_MODEL_USE_TRIAL_PACKET_SLUG);
}

export function buildFirstControlledModelUseTrialPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeFirstControlledModelUseTrialPacket(model: { firstControlledModelUseTrialPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(FIRST_CONTROLLED_MODEL_USE_TRIAL_PACKET_SLUG, model.firstControlledModelUseTrialPacketItems);
}

export function buildFirstControlledModelUseTrialPacketModel() {
  const firstControlledModelUseTrialPacketItems = buildFirstControlledModelUseTrialPacketItems();
  const firstControlledModelUseTrialPacketModel = buildBackendDryRunModelRouterPreviewModelForSlug(FIRST_CONTROLLED_MODEL_USE_TRIAL_PACKET_SLUG, firstControlledModelUseTrialPacketItems);
  return { ...firstControlledModelUseTrialPacketModel, firstControlledModelUseTrialPacketItems };
}
