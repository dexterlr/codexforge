import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SPECIALIST_RESEARCH_MODEL_USE_DRY_RUN_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSpecialistResearchModelUseDryRunStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SPECIALIST_RESEARCH_MODEL_USE_DRY_RUN_LANGUAGE, buildSpecialistResearchModelUseDryRunStableKey };

const SPECIALIST_RESEARCH_MODEL_USE_DRY_RUN_SLUG = "specialist-research-model-use-dry-run";

export function buildSpecialistResearchModelUseDryRun(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SPECIALIST_RESEARCH_MODEL_USE_DRY_RUN_SLUG, input);
}

export function buildSpecialistResearchModelUseDryRunItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SPECIALIST_RESEARCH_MODEL_USE_DRY_RUN_SLUG);
}

export function buildSpecialistResearchModelUseDryRunBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSpecialistResearchModelUseDryRun(model: { specialistResearchModelUseDryRunItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SPECIALIST_RESEARCH_MODEL_USE_DRY_RUN_SLUG, model.specialistResearchModelUseDryRunItems);
}

export function buildSpecialistResearchModelUseDryRunModel() {
  const specialistResearchModelUseDryRunItems = buildSpecialistResearchModelUseDryRunItems();
  const specialistResearchModelUseDryRunModel = buildBackendDryRunModelRouterPreviewModelForSlug(SPECIALIST_RESEARCH_MODEL_USE_DRY_RUN_SLUG, specialistResearchModelUseDryRunItems);
  return { ...specialistResearchModelUseDryRunModel, specialistResearchModelUseDryRunItems };
}

