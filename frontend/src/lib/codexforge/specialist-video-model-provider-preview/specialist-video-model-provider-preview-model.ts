import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_VIDEO_MODEL_PROVIDER_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistVideoModelProviderPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_VIDEO_MODEL_PROVIDER_PREVIEW_LANGUAGE, buildSpecialistVideoModelProviderPreviewStableKey };

const SPECIALIST_VIDEO_MODEL_PROVIDER_PREVIEW_SLUG = "specialist-video-model-provider-preview";

export function buildSpecialistVideoModelProviderPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_VIDEO_MODEL_PROVIDER_PREVIEW_SLUG, input);
}

export function buildSpecialistVideoModelProviderPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_VIDEO_MODEL_PROVIDER_PREVIEW_SLUG);
}

export function buildSpecialistVideoModelProviderPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistVideoModelProviderPreview(model: { specialistVideoModelProviderPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_VIDEO_MODEL_PROVIDER_PREVIEW_SLUG, model.specialistVideoModelProviderPreviewItems);
}

export function buildSpecialistVideoModelProviderPreviewModel() {
  const specialistVideoModelProviderPreviewItems = buildSpecialistVideoModelProviderPreviewItems();
  const specialistVideoModelProviderPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_VIDEO_MODEL_PROVIDER_PREVIEW_SLUG, specialistVideoModelProviderPreviewItems);
  return { ...specialistVideoModelProviderPreviewModel, specialistVideoModelProviderPreviewItems };
}
