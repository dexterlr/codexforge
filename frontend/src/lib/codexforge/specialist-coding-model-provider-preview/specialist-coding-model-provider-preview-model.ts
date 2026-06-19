import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_CODING_MODEL_PROVIDER_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistCodingModelProviderPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_CODING_MODEL_PROVIDER_PREVIEW_LANGUAGE, buildSpecialistCodingModelProviderPreviewStableKey };

const SPECIALIST_CODING_MODEL_PROVIDER_PREVIEW_SLUG = "specialist-coding-model-provider-preview";

export function buildSpecialistCodingModelProviderPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_CODING_MODEL_PROVIDER_PREVIEW_SLUG, input);
}

export function buildSpecialistCodingModelProviderPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_CODING_MODEL_PROVIDER_PREVIEW_SLUG);
}

export function buildSpecialistCodingModelProviderPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistCodingModelProviderPreview(model: { specialistCodingModelProviderPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_CODING_MODEL_PROVIDER_PREVIEW_SLUG, model.specialistCodingModelProviderPreviewItems);
}

export function buildSpecialistCodingModelProviderPreviewModel() {
  const specialistCodingModelProviderPreviewItems = buildSpecialistCodingModelProviderPreviewItems();
  const specialistCodingModelProviderPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_CODING_MODEL_PROVIDER_PREVIEW_SLUG, specialistCodingModelProviderPreviewItems);
  return { ...specialistCodingModelProviderPreviewModel, specialistCodingModelProviderPreviewItems };
}
