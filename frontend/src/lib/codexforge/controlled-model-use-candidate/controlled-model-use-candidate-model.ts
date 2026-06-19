import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_MODEL_USE_CANDIDATE_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildControlledModelUseCandidateStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { CONTROLLED_MODEL_USE_CANDIDATE_LANGUAGE, buildControlledModelUseCandidateStableKey };

const CONTROLLED_MODEL_USE_CANDIDATE_SLUG = "controlled-model-use-candidate";

export function buildControlledModelUseCandidate(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(CONTROLLED_MODEL_USE_CANDIDATE_SLUG, input);
}

export function buildControlledModelUseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(CONTROLLED_MODEL_USE_CANDIDATE_SLUG);
}

export function buildControlledModelUseCandidateBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeControlledModelUseCandidate(model: { controlledModelUseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(CONTROLLED_MODEL_USE_CANDIDATE_SLUG, model.controlledModelUseCandidateItems);
}

export function buildControlledModelUseCandidateModel() {
  const controlledModelUseCandidateItems = buildControlledModelUseCandidateItems();
  const controlledModelUseCandidateModel = buildBackendDryRunModelRouterPreviewModelForSlug(CONTROLLED_MODEL_USE_CANDIDATE_SLUG, controlledModelUseCandidateItems);
  return { ...controlledModelUseCandidateModel, controlledModelUseCandidateItems };
}
