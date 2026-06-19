import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_RUNNER_BACKEND_ADAPTER_PREVIEW_LANGUAGE,
  buildBackendAdapterImplementationPreview,
  buildBackendAdapterImplementationPreviewBoundary,
  buildBackendAdapterImplementationPreviewModelForSlug,
  buildBackendAdapterImplementationPreviewPackets,
  buildBackendAdapterImplementationPreviewStableKey as buildCommandRunnerBackendAdapterPreviewStableKey,
  summarizeBackendAdapterImplementationPreviewForSlug,
  type BackendAdapterImplementationPreviewPacketInput,
} from "../backend-adapter-implementation-preview-kit";

export { COMMAND_RUNNER_BACKEND_ADAPTER_PREVIEW_LANGUAGE, buildCommandRunnerBackendAdapterPreviewStableKey };

const COMMAND_RUNNER_BACKEND_ADAPTER_PREVIEW_SLUG = "command-runner-backend-adapter-preview";

export function buildCommandRunnerBackendAdapterPreview(input: BackendAdapterImplementationPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendAdapterImplementationPreview(COMMAND_RUNNER_BACKEND_ADAPTER_PREVIEW_SLUG, input);
}

export function buildCommandRunnerBackendAdapterPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendAdapterImplementationPreviewPackets(COMMAND_RUNNER_BACKEND_ADAPTER_PREVIEW_SLUG);
}

export function buildCommandRunnerBackendAdapterPreviewBoundary() {
  return buildBackendAdapterImplementationPreviewBoundary();
}

export function summarizeCommandRunnerBackendAdapterPreview(model: { commandRunnerBackendAdapterPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendAdapterImplementationPreviewForSlug(COMMAND_RUNNER_BACKEND_ADAPTER_PREVIEW_SLUG, model.commandRunnerBackendAdapterPreviewItems);
}

export function buildCommandRunnerBackendAdapterPreviewModel() {
  const commandRunnerBackendAdapterPreviewItems = buildCommandRunnerBackendAdapterPreviewItems();
  const model = buildBackendAdapterImplementationPreviewModelForSlug(COMMAND_RUNNER_BACKEND_ADAPTER_PREVIEW_SLUG, commandRunnerBackendAdapterPreviewItems);
  return { ...model, commandRunnerBackendAdapterPreviewItems };
}
