import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SHARED_MODEL_BRAIN_CONTEXT_CONTRACT_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSharedModelBrainContextContractStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SHARED_MODEL_BRAIN_CONTEXT_CONTRACT_LANGUAGE, buildSharedModelBrainContextContractStableKey };

const SHARED_MODEL_BRAIN_CONTEXT_CONTRACT_SLUG = "shared-model-brain-context-contract";

export function buildSharedModelBrainContextContract(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SHARED_MODEL_BRAIN_CONTEXT_CONTRACT_SLUG, input);
}

export function buildSharedModelBrainContextContractItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SHARED_MODEL_BRAIN_CONTEXT_CONTRACT_SLUG);
}

export function buildSharedModelBrainContextContractBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSharedModelBrainContextContract(model: { sharedModelBrainContextContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SHARED_MODEL_BRAIN_CONTEXT_CONTRACT_SLUG, model.sharedModelBrainContextContractItems);
}

export function buildSharedModelBrainContextContractModel() {
  const sharedModelBrainContextContractItems = buildSharedModelBrainContextContractItems();
  const sharedModelBrainContextContractModel = buildBackendDryRunModelRouterPreviewModelForSlug(SHARED_MODEL_BRAIN_CONTEXT_CONTRACT_SLUG, sharedModelBrainContextContractItems);
  return { ...sharedModelBrainContextContractModel, sharedModelBrainContextContractItems };
}
