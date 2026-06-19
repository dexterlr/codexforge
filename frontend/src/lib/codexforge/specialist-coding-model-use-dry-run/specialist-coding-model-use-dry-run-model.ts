import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_CODING_MODEL_USE_DRY_RUN_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistCodingModelUseDryRunStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_CODING_MODEL_USE_DRY_RUN_LANGUAGE, buildSpecialistCodingModelUseDryRunStableKey };

const SPECIALIST_CODING_MODEL_USE_DRY_RUN_SLUG = "specialist-coding-model-use-dry-run";

export function buildSpecialistCodingModelUseDryRun(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_CODING_MODEL_USE_DRY_RUN_SLUG, input);
}

export function buildSpecialistCodingModelUseDryRunItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_CODING_MODEL_USE_DRY_RUN_SLUG);
}

export function buildSpecialistCodingModelUseDryRunBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistCodingModelUseDryRun(model: { specialistCodingModelUseDryRunItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_CODING_MODEL_USE_DRY_RUN_SLUG, model.specialistCodingModelUseDryRunItems);
}

export function buildSpecialistCodingModelUseDryRunModel() {
  const specialistCodingModelUseDryRunItems = buildSpecialistCodingModelUseDryRunItems();
  const specialistCodingModelUseDryRunModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_CODING_MODEL_USE_DRY_RUN_SLUG, specialistCodingModelUseDryRunItems);
  return { ...specialistCodingModelUseDryRunModel, specialistCodingModelUseDryRunItems };
}

