import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BACKEND_DRY_RUN_MODEL_ROUTER_CANDIDATE_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildBackendDryRunModelRouterCandidateStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { BACKEND_DRY_RUN_MODEL_ROUTER_CANDIDATE_LANGUAGE, buildBackendDryRunModelRouterCandidateStableKey };

const BACKEND_DRY_RUN_MODEL_ROUTER_CANDIDATE_SLUG = "backend-dry-run-model-router-candidate";

export function buildBackendDryRunModelRouterCandidate(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(BACKEND_DRY_RUN_MODEL_ROUTER_CANDIDATE_SLUG, input);
}

export function buildBackendDryRunModelRouterCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(BACKEND_DRY_RUN_MODEL_ROUTER_CANDIDATE_SLUG);
}

export function buildBackendDryRunModelRouterCandidateBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeBackendDryRunModelRouterCandidate(model: { backendDryRunModelRouterCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(BACKEND_DRY_RUN_MODEL_ROUTER_CANDIDATE_SLUG, model.backendDryRunModelRouterCandidateItems);
}

export function buildBackendDryRunModelRouterCandidateModel() {
  const backendDryRunModelRouterCandidateItems = buildBackendDryRunModelRouterCandidateItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(BACKEND_DRY_RUN_MODEL_ROUTER_CANDIDATE_SLUG, backendDryRunModelRouterCandidateItems);
  return { ...model, backendDryRunModelRouterCandidateItems };
}
