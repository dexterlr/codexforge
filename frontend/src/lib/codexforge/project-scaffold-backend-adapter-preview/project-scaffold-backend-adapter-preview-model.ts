import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_SCAFFOLD_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildProjectScaffoldBackendAdapterPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { PROJECT_SCAFFOLD_BACKEND_ADAPTER_PREVIEW_LANGUAGE, buildProjectScaffoldBackendAdapterPreviewStableKey };

const PROJECT_SCAFFOLD_BACKEND_ADAPTER_PREVIEW_SLUG = "project-scaffold-backend-adapter-preview";

export function buildProjectScaffoldBackendAdapterPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(PROJECT_SCAFFOLD_BACKEND_ADAPTER_PREVIEW_SLUG, input);
}

export function buildProjectScaffoldBackendAdapterPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(PROJECT_SCAFFOLD_BACKEND_ADAPTER_PREVIEW_SLUG);
}

export function buildProjectScaffoldBackendAdapterPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeProjectScaffoldBackendAdapterPreview(model: { projectScaffoldBackendAdapterPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(PROJECT_SCAFFOLD_BACKEND_ADAPTER_PREVIEW_SLUG, model.projectScaffoldBackendAdapterPreviewItems);
}

export function buildProjectScaffoldBackendAdapterPreviewModel() {
  const projectScaffoldBackendAdapterPreviewItems = buildProjectScaffoldBackendAdapterPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(PROJECT_SCAFFOLD_BACKEND_ADAPTER_PREVIEW_SLUG, projectScaffoldBackendAdapterPreviewItems);
  return { ...model, projectScaffoldBackendAdapterPreviewItems };
}
