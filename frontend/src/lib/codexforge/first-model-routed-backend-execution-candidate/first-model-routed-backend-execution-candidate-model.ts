import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_MODEL_ROUTED_BACKEND_EXECUTION_CANDIDATE_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildFirstModelRoutedBackendExecutionCandidateStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { FIRST_MODEL_ROUTED_BACKEND_EXECUTION_CANDIDATE_LANGUAGE, buildFirstModelRoutedBackendExecutionCandidateStableKey };

const FIRST_MODEL_ROUTED_BACKEND_EXECUTION_CANDIDATE_SLUG = "first-model-routed-backend-execution-candidate";

export function buildFirstModelRoutedBackendExecutionCandidate(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(FIRST_MODEL_ROUTED_BACKEND_EXECUTION_CANDIDATE_SLUG, input);
}

export function buildFirstModelRoutedBackendExecutionCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(FIRST_MODEL_ROUTED_BACKEND_EXECUTION_CANDIDATE_SLUG);
}

export function buildFirstModelRoutedBackendExecutionCandidateBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeFirstModelRoutedBackendExecutionCandidate(model: { firstModelRoutedBackendExecutionCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(FIRST_MODEL_ROUTED_BACKEND_EXECUTION_CANDIDATE_SLUG, model.firstModelRoutedBackendExecutionCandidateItems);
}

export function buildFirstModelRoutedBackendExecutionCandidateModel() {
  const firstModelRoutedBackendExecutionCandidateItems = buildFirstModelRoutedBackendExecutionCandidateItems();
  const firstModelRoutedBackendExecutionCandidateModel = buildBackendDryRunModelRouterPreviewModelForSlug(FIRST_MODEL_ROUTED_BACKEND_EXECUTION_CANDIDATE_SLUG, firstModelRoutedBackendExecutionCandidateItems);
  return { ...firstModelRoutedBackendExecutionCandidateModel, firstModelRoutedBackendExecutionCandidateItems };
}
