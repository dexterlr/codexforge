import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_MODEL_USE_RELEASE_CANDIDATE_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildControlledModelUseReleaseCandidateStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { CONTROLLED_MODEL_USE_RELEASE_CANDIDATE_LANGUAGE, buildControlledModelUseReleaseCandidateStableKey };

const CONTROLLED_MODEL_USE_RELEASE_CANDIDATE_SLUG = "controlled-model-use-release-candidate";

export function buildControlledModelUseReleaseCandidate(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(CONTROLLED_MODEL_USE_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledModelUseReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(CONTROLLED_MODEL_USE_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledModelUseReleaseCandidateBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeControlledModelUseReleaseCandidate(model: { controlledModelUseReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(CONTROLLED_MODEL_USE_RELEASE_CANDIDATE_SLUG, model.controlledModelUseReleaseCandidateItems);
}

export function buildControlledModelUseReleaseCandidateModel() {
  const controlledModelUseReleaseCandidateItems = buildControlledModelUseReleaseCandidateItems();
  const controlledModelUseReleaseCandidateModel = buildBackendDryRunModelRouterPreviewModelForSlug(CONTROLLED_MODEL_USE_RELEASE_CANDIDATE_SLUG, controlledModelUseReleaseCandidateItems);
  return { ...controlledModelUseReleaseCandidateModel, controlledModelUseReleaseCandidateItems };
}

