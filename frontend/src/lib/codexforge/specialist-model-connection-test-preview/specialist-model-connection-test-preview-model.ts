import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistModelConnectionTestPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_MODEL_CONNECTION_TEST_PREVIEW_LANGUAGE, buildSpecialistModelConnectionTestPreviewStableKey };

const SPECIALIST_MODEL_CONNECTION_TEST_PREVIEW_SLUG = "specialist-model-connection-test-preview";

export function buildSpecialistModelConnectionTestPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_MODEL_CONNECTION_TEST_PREVIEW_SLUG, input);
}

export function buildSpecialistModelConnectionTestPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_MODEL_CONNECTION_TEST_PREVIEW_SLUG);
}

export function buildSpecialistModelConnectionTestPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistModelConnectionTestPreview(model: { specialistModelConnectionTestPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_MODEL_CONNECTION_TEST_PREVIEW_SLUG, model.specialistModelConnectionTestPreviewItems);
}

export function buildSpecialistModelConnectionTestPreviewModel() {
  const specialistModelConnectionTestPreviewItems = buildSpecialistModelConnectionTestPreviewItems();
  const specialistModelConnectionTestPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_MODEL_CONNECTION_TEST_PREVIEW_SLUG, specialistModelConnectionTestPreviewItems);
  return { ...specialistModelConnectionTestPreviewModel, specialistModelConnectionTestPreviewItems };
}
