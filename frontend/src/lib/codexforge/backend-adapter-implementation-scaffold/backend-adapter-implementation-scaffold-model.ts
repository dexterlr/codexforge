import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BACKEND_ADAPTER_IMPLEMENTATION_SCAFFOLD_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildBackendAdapterImplementationScaffoldStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { BACKEND_ADAPTER_IMPLEMENTATION_SCAFFOLD_LANGUAGE, buildBackendAdapterImplementationScaffoldStableKey };

const BACKEND_ADAPTER_IMPLEMENTATION_SCAFFOLD_SLUG = "backend-adapter-implementation-scaffold";

export function buildBackendAdapterImplementationScaffold(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(BACKEND_ADAPTER_IMPLEMENTATION_SCAFFOLD_SLUG, input);
}

export function buildBackendAdapterImplementationScaffoldItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(BACKEND_ADAPTER_IMPLEMENTATION_SCAFFOLD_SLUG);
}

export function buildBackendAdapterImplementationScaffoldBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeBackendAdapterImplementationScaffold(model: { backendAdapterImplementationScaffoldItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(BACKEND_ADAPTER_IMPLEMENTATION_SCAFFOLD_SLUG, model.backendAdapterImplementationScaffoldItems);
}

export function buildBackendAdapterImplementationScaffoldModel() {
  const backendAdapterImplementationScaffoldItems = buildBackendAdapterImplementationScaffoldItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(BACKEND_ADAPTER_IMPLEMENTATION_SCAFFOLD_SLUG, backendAdapterImplementationScaffoldItems);
  return { ...model, backendAdapterImplementationScaffoldItems };
}
