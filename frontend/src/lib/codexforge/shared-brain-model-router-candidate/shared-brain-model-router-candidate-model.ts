import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SHARED_BRAIN_MODEL_ROUTER_CANDIDATE_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSharedBrainModelRouterCandidateStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SHARED_BRAIN_MODEL_ROUTER_CANDIDATE_LANGUAGE, buildSharedBrainModelRouterCandidateStableKey };

const SHARED_BRAIN_MODEL_ROUTER_CANDIDATE_SLUG = "shared-brain-model-router-candidate";

export function buildSharedBrainModelRouterCandidate(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SHARED_BRAIN_MODEL_ROUTER_CANDIDATE_SLUG, input);
}

export function buildSharedBrainModelRouterCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SHARED_BRAIN_MODEL_ROUTER_CANDIDATE_SLUG);
}

export function buildSharedBrainModelRouterCandidateBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSharedBrainModelRouterCandidate(model: { sharedBrainModelRouterCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SHARED_BRAIN_MODEL_ROUTER_CANDIDATE_SLUG, model.sharedBrainModelRouterCandidateItems);
}

export function buildSharedBrainModelRouterCandidateModel() {
  const sharedBrainModelRouterCandidateItems = buildSharedBrainModelRouterCandidateItems();
  const sharedBrainModelRouterCandidateModel = buildBackendDryRunModelRouterPreviewModelForSlug(SHARED_BRAIN_MODEL_ROUTER_CANDIDATE_SLUG, sharedBrainModelRouterCandidateItems);
  return { ...sharedBrainModelRouterCandidateModel, sharedBrainModelRouterCandidateItems };
}
