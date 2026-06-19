import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_MODEL_ROUTER_READINESS_CANDIDATE_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildControlledModelRouterReadinessCandidateStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { CONTROLLED_MODEL_ROUTER_READINESS_CANDIDATE_LANGUAGE, buildControlledModelRouterReadinessCandidateStableKey };

const CONTROLLED_MODEL_ROUTER_READINESS_CANDIDATE_SLUG = "controlled-model-router-readiness-candidate";

export function buildControlledModelRouterReadinessCandidate(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(CONTROLLED_MODEL_ROUTER_READINESS_CANDIDATE_SLUG, input);
}

export function buildControlledModelRouterReadinessCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(CONTROLLED_MODEL_ROUTER_READINESS_CANDIDATE_SLUG);
}

export function buildControlledModelRouterReadinessCandidateBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeControlledModelRouterReadinessCandidate(model: { controlledModelRouterReadinessCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(CONTROLLED_MODEL_ROUTER_READINESS_CANDIDATE_SLUG, model.controlledModelRouterReadinessCandidateItems);
}

export function buildControlledModelRouterReadinessCandidateModel() {
  const controlledModelRouterReadinessCandidateItems = buildControlledModelRouterReadinessCandidateItems();
  const controlledModelRouterReadinessCandidateModel = buildBackendDryRunModelRouterPreviewModelForSlug(CONTROLLED_MODEL_ROUTER_READINESS_CANDIDATE_SLUG, controlledModelRouterReadinessCandidateItems);
  return { ...controlledModelRouterReadinessCandidateModel, controlledModelRouterReadinessCandidateItems };
}
