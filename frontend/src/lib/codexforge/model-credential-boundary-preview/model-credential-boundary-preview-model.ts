import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_CREDENTIAL_BOUNDARY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelCredentialBoundaryPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_CREDENTIAL_BOUNDARY_PREVIEW_LANGUAGE, buildModelCredentialBoundaryPreviewStableKey };

const MODEL_CREDENTIAL_BOUNDARY_PREVIEW_SLUG = "model-credential-boundary-preview";

export function buildModelCredentialBoundaryPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_CREDENTIAL_BOUNDARY_PREVIEW_SLUG, input);
}

export function buildModelCredentialBoundaryPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_CREDENTIAL_BOUNDARY_PREVIEW_SLUG);
}

export function buildModelCredentialBoundaryPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelCredentialBoundaryPreview(model: { modelCredentialBoundaryPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_CREDENTIAL_BOUNDARY_PREVIEW_SLUG, model.modelCredentialBoundaryPreviewItems);
}

export function buildModelCredentialBoundaryPreviewModel() {
  const modelCredentialBoundaryPreviewItems = buildModelCredentialBoundaryPreviewItems();
  const modelCredentialBoundaryPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_CREDENTIAL_BOUNDARY_PREVIEW_SLUG, modelCredentialBoundaryPreviewItems);
  return { ...modelCredentialBoundaryPreviewModel, modelCredentialBoundaryPreviewItems };
}
