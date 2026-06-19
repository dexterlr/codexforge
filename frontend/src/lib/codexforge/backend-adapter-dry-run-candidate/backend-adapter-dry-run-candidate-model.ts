import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BACKEND_ADAPTER_DRY_RUN_CANDIDATE_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildBackendAdapterDryRunCandidateStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { BACKEND_ADAPTER_DRY_RUN_CANDIDATE_LANGUAGE, buildBackendAdapterDryRunCandidateStableKey };

const BACKEND_ADAPTER_DRY_RUN_CANDIDATE_SLUG = "backend-adapter-dry-run-candidate";

export function buildBackendAdapterDryRunCandidate(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(BACKEND_ADAPTER_DRY_RUN_CANDIDATE_SLUG, input);
}

export function buildBackendAdapterDryRunCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(BACKEND_ADAPTER_DRY_RUN_CANDIDATE_SLUG);
}

export function buildBackendAdapterDryRunCandidateBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeBackendAdapterDryRunCandidate(model: { backendAdapterDryRunCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(BACKEND_ADAPTER_DRY_RUN_CANDIDATE_SLUG, model.backendAdapterDryRunCandidateItems);
}

export function buildBackendAdapterDryRunCandidateModel() {
  const backendAdapterDryRunCandidateItems = buildBackendAdapterDryRunCandidateItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(BACKEND_ADAPTER_DRY_RUN_CANDIDATE_SLUG, backendAdapterDryRunCandidateItems);
  return { ...model, backendAdapterDryRunCandidateItems };
}
