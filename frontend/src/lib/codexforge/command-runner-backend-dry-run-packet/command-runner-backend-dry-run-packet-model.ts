import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_RUNNER_BACKEND_DRY_RUN_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildCommandRunnerBackendDryRunPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { COMMAND_RUNNER_BACKEND_DRY_RUN_PACKET_LANGUAGE, buildCommandRunnerBackendDryRunPacketStableKey };

const COMMAND_RUNNER_BACKEND_DRY_RUN_PACKET_SLUG = "command-runner-backend-dry-run-packet";

export function buildCommandRunnerBackendDryRunPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(COMMAND_RUNNER_BACKEND_DRY_RUN_PACKET_SLUG, input);
}

export function buildCommandRunnerBackendDryRunPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(COMMAND_RUNNER_BACKEND_DRY_RUN_PACKET_SLUG);
}

export function buildCommandRunnerBackendDryRunPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeCommandRunnerBackendDryRunPacket(model: { commandRunnerBackendDryRunPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(COMMAND_RUNNER_BACKEND_DRY_RUN_PACKET_SLUG, model.commandRunnerBackendDryRunPacketItems);
}

export function buildCommandRunnerBackendDryRunPacketModel() {
  const commandRunnerBackendDryRunPacketItems = buildCommandRunnerBackendDryRunPacketItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(COMMAND_RUNNER_BACKEND_DRY_RUN_PACKET_SLUG, commandRunnerBackendDryRunPacketItems);
  return { ...model, commandRunnerBackendDryRunPacketItems };
}
