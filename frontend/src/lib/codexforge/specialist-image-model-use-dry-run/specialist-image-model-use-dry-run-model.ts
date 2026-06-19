import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_IMAGE_MODEL_USE_DRY_RUN_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistImageModelUseDryRunStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_IMAGE_MODEL_USE_DRY_RUN_LANGUAGE, buildSpecialistImageModelUseDryRunStableKey };

const SPECIALIST_IMAGE_MODEL_USE_DRY_RUN_SLUG = "specialist-image-model-use-dry-run";

export function buildSpecialistImageModelUseDryRun(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_IMAGE_MODEL_USE_DRY_RUN_SLUG, input);
}

export function buildSpecialistImageModelUseDryRunItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_IMAGE_MODEL_USE_DRY_RUN_SLUG);
}

export function buildSpecialistImageModelUseDryRunBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistImageModelUseDryRun(model: { specialistImageModelUseDryRunItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_IMAGE_MODEL_USE_DRY_RUN_SLUG, model.specialistImageModelUseDryRunItems);
}

export function buildSpecialistImageModelUseDryRunModel() {
  const specialistImageModelUseDryRunItems = buildSpecialistImageModelUseDryRunItems();
  const specialistImageModelUseDryRunModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_IMAGE_MODEL_USE_DRY_RUN_SLUG, specialistImageModelUseDryRunItems);
  return { ...specialistImageModelUseDryRunModel, specialistImageModelUseDryRunItems };
}

