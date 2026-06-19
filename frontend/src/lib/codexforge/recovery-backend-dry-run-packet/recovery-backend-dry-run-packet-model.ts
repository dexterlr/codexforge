import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RECOVERY_BACKEND_DRY_RUN_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildRecoveryBackendDryRunPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { RECOVERY_BACKEND_DRY_RUN_PACKET_LANGUAGE, buildRecoveryBackendDryRunPacketStableKey };

const RECOVERY_BACKEND_DRY_RUN_PACKET_SLUG = "recovery-backend-dry-run-packet";

export function buildRecoveryBackendDryRunPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(RECOVERY_BACKEND_DRY_RUN_PACKET_SLUG, input);
}

export function buildRecoveryBackendDryRunPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(RECOVERY_BACKEND_DRY_RUN_PACKET_SLUG);
}

export function buildRecoveryBackendDryRunPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeRecoveryBackendDryRunPacket(model: { recoveryBackendDryRunPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(RECOVERY_BACKEND_DRY_RUN_PACKET_SLUG, model.recoveryBackendDryRunPacketItems);
}

export function buildRecoveryBackendDryRunPacketModel() {
  const recoveryBackendDryRunPacketItems = buildRecoveryBackendDryRunPacketItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(RECOVERY_BACKEND_DRY_RUN_PACKET_SLUG, recoveryBackendDryRunPacketItems);
  return { ...model, recoveryBackendDryRunPacketItems };
}
