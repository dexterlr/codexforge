import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_IMAGE_MODEL_PROVIDER_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistImageModelProviderPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_IMAGE_MODEL_PROVIDER_PREVIEW_LANGUAGE, buildSpecialistImageModelProviderPreviewStableKey };

const SPECIALIST_IMAGE_MODEL_PROVIDER_PREVIEW_SLUG = "specialist-image-model-provider-preview";

export function buildSpecialistImageModelProviderPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_IMAGE_MODEL_PROVIDER_PREVIEW_SLUG, input);
}

export function buildSpecialistImageModelProviderPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_IMAGE_MODEL_PROVIDER_PREVIEW_SLUG);
}

export function buildSpecialistImageModelProviderPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistImageModelProviderPreview(model: { specialistImageModelProviderPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_IMAGE_MODEL_PROVIDER_PREVIEW_SLUG, model.specialistImageModelProviderPreviewItems);
}

export function buildSpecialistImageModelProviderPreviewModel() {
  const specialistImageModelProviderPreviewItems = buildSpecialistImageModelProviderPreviewItems();
  const specialistImageModelProviderPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_IMAGE_MODEL_PROVIDER_PREVIEW_SLUG, specialistImageModelProviderPreviewItems);
  return { ...specialistImageModelProviderPreviewModel, specialistImageModelProviderPreviewItems };
}
