import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SHARED_MODEL_KNOWLEDGE_ACCESS_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildSharedModelKnowledgeAccessPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { SHARED_MODEL_KNOWLEDGE_ACCESS_PREVIEW_LANGUAGE, buildSharedModelKnowledgeAccessPreviewStableKey };

const SHARED_MODEL_KNOWLEDGE_ACCESS_PREVIEW_SLUG = "shared-model-knowledge-access-preview";

export function buildSharedModelKnowledgeAccessPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(SHARED_MODEL_KNOWLEDGE_ACCESS_PREVIEW_SLUG, input);
}

export function buildSharedModelKnowledgeAccessPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(SHARED_MODEL_KNOWLEDGE_ACCESS_PREVIEW_SLUG);
}

export function buildSharedModelKnowledgeAccessPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeSharedModelKnowledgeAccessPreview(model: { sharedModelKnowledgeAccessPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(SHARED_MODEL_KNOWLEDGE_ACCESS_PREVIEW_SLUG, model.sharedModelKnowledgeAccessPreviewItems);
}

export function buildSharedModelKnowledgeAccessPreviewModel() {
  const sharedModelKnowledgeAccessPreviewItems = buildSharedModelKnowledgeAccessPreviewItems();
  const sharedModelKnowledgeAccessPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(SHARED_MODEL_KNOWLEDGE_ACCESS_PREVIEW_SLUG, sharedModelKnowledgeAccessPreviewItems);
  return { ...sharedModelKnowledgeAccessPreviewModel, sharedModelKnowledgeAccessPreviewItems };
}
