import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_RESEARCH_MODEL_PROVIDER_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistResearchModelProviderPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_RESEARCH_MODEL_PROVIDER_PREVIEW_LANGUAGE, buildSpecialistResearchModelProviderPreviewStableKey };

const SPECIALIST_RESEARCH_MODEL_PROVIDER_PREVIEW_SLUG = "specialist-research-model-provider-preview";

export function buildSpecialistResearchModelProviderPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_RESEARCH_MODEL_PROVIDER_PREVIEW_SLUG, input);
}

export function buildSpecialistResearchModelProviderPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_RESEARCH_MODEL_PROVIDER_PREVIEW_SLUG);
}

export function buildSpecialistResearchModelProviderPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistResearchModelProviderPreview(model: { specialistResearchModelProviderPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_RESEARCH_MODEL_PROVIDER_PREVIEW_SLUG, model.specialistResearchModelProviderPreviewItems);
}

export function buildSpecialistResearchModelProviderPreviewModel() {
  const specialistResearchModelProviderPreviewItems = buildSpecialistResearchModelProviderPreviewItems();
  const specialistResearchModelProviderPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_RESEARCH_MODEL_PROVIDER_PREVIEW_SLUG, specialistResearchModelProviderPreviewItems);
  return { ...specialistResearchModelProviderPreviewModel, specialistResearchModelProviderPreviewItems };
}
