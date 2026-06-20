import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_RUNNER_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildCommandRunnerModelRoutedExecutionPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { COMMAND_RUNNER_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE, buildCommandRunnerModelRoutedExecutionPreviewStableKey };

const COMMAND_RUNNER_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG = "command-runner-model-routed-execution-preview";

export function buildCommandRunnerModelRoutedExecutionPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(COMMAND_RUNNER_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, input);
}

export function buildCommandRunnerModelRoutedExecutionPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(COMMAND_RUNNER_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG);
}

export function buildCommandRunnerModelRoutedExecutionPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeCommandRunnerModelRoutedExecutionPreview(model: { commandRunnerModelRoutedExecutionPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(COMMAND_RUNNER_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, model.commandRunnerModelRoutedExecutionPreviewItems);
}

export function buildCommandRunnerModelRoutedExecutionPreviewModel() {
  const commandRunnerModelRoutedExecutionPreviewItems = buildCommandRunnerModelRoutedExecutionPreviewItems();
  const commandRunnerModelRoutedExecutionPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(COMMAND_RUNNER_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, commandRunnerModelRoutedExecutionPreviewItems);
  return { ...commandRunnerModelRoutedExecutionPreviewModel, commandRunnerModelRoutedExecutionPreviewItems };
}
