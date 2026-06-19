import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_VIDEO_MODEL_USE_DRY_RUN_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistVideoModelUseDryRunStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_VIDEO_MODEL_USE_DRY_RUN_LANGUAGE, buildSpecialistVideoModelUseDryRunStableKey };

const SPECIALIST_VIDEO_MODEL_USE_DRY_RUN_SLUG = "specialist-video-model-use-dry-run";

export function buildSpecialistVideoModelUseDryRun(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_VIDEO_MODEL_USE_DRY_RUN_SLUG, input);
}

export function buildSpecialistVideoModelUseDryRunItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_VIDEO_MODEL_USE_DRY_RUN_SLUG);
}

export function buildSpecialistVideoModelUseDryRunBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistVideoModelUseDryRun(model: { specialistVideoModelUseDryRunItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_VIDEO_MODEL_USE_DRY_RUN_SLUG, model.specialistVideoModelUseDryRunItems);
}

export function buildSpecialistVideoModelUseDryRunModel() {
  const specialistVideoModelUseDryRunItems = buildSpecialistVideoModelUseDryRunItems();
  const specialistVideoModelUseDryRunModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_VIDEO_MODEL_USE_DRY_RUN_SLUG, specialistVideoModelUseDryRunItems);
  return { ...specialistVideoModelUseDryRunModel, specialistVideoModelUseDryRunItems };
}

