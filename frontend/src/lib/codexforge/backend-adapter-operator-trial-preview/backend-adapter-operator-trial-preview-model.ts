import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BACKEND_ADAPTER_OPERATOR_TRIAL_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildBackendAdapterOperatorTrialPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { BACKEND_ADAPTER_OPERATOR_TRIAL_PREVIEW_LANGUAGE, buildBackendAdapterOperatorTrialPreviewStableKey };

const BACKEND_ADAPTER_OPERATOR_TRIAL_PREVIEW_SLUG = "backend-adapter-operator-trial-preview";

export function buildBackendAdapterOperatorTrialPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(BACKEND_ADAPTER_OPERATOR_TRIAL_PREVIEW_SLUG, input);
}

export function buildBackendAdapterOperatorTrialPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(BACKEND_ADAPTER_OPERATOR_TRIAL_PREVIEW_SLUG);
}

export function buildBackendAdapterOperatorTrialPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeBackendAdapterOperatorTrialPreview(model: { backendAdapterOperatorTrialPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(BACKEND_ADAPTER_OPERATOR_TRIAL_PREVIEW_SLUG, model.backendAdapterOperatorTrialPreviewItems);
}

export function buildBackendAdapterOperatorTrialPreviewModel() {
  const backendAdapterOperatorTrialPreviewItems = buildBackendAdapterOperatorTrialPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(BACKEND_ADAPTER_OPERATOR_TRIAL_PREVIEW_SLUG, backendAdapterOperatorTrialPreviewItems);
  return { ...model, backendAdapterOperatorTrialPreviewItems };
}
