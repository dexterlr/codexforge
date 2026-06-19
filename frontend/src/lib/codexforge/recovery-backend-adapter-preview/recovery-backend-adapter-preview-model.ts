import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RECOVERY_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildRecoveryBackendAdapterPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { RECOVERY_BACKEND_ADAPTER_PREVIEW_LANGUAGE, buildRecoveryBackendAdapterPreviewStableKey };

const RECOVERY_BACKEND_ADAPTER_PREVIEW_SLUG = "recovery-backend-adapter-preview";

export function buildRecoveryBackendAdapterPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(RECOVERY_BACKEND_ADAPTER_PREVIEW_SLUG, input);
}

export function buildRecoveryBackendAdapterPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(RECOVERY_BACKEND_ADAPTER_PREVIEW_SLUG);
}

export function buildRecoveryBackendAdapterPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeRecoveryBackendAdapterPreview(model: { recoveryBackendAdapterPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(RECOVERY_BACKEND_ADAPTER_PREVIEW_SLUG, model.recoveryBackendAdapterPreviewItems);
}

export function buildRecoveryBackendAdapterPreviewModel() {
  const recoveryBackendAdapterPreviewItems = buildRecoveryBackendAdapterPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(RECOVERY_BACKEND_ADAPTER_PREVIEW_SLUG, recoveryBackendAdapterPreviewItems);
  return { ...model, recoveryBackendAdapterPreviewItems };
}
