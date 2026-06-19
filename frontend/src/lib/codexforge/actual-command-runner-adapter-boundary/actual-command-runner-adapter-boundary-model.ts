import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ACTUAL_COMMAND_RUNNER_ADAPTER_BOUNDARY_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildActualCommandRunnerAdapterBoundaryStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ACTUAL_COMMAND_RUNNER_ADAPTER_BOUNDARY_LANGUAGE, buildActualCommandRunnerAdapterBoundaryStableKey };

const ACTUAL_COMMAND_RUNNER_ADAPTER_BOUNDARY_SLUG = "actual-command-runner-adapter-boundary";

export function buildActualCommandRunnerAdapterBoundary(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ACTUAL_COMMAND_RUNNER_ADAPTER_BOUNDARY_SLUG, input);
}

export function buildActualCommandRunnerAdapterBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ACTUAL_COMMAND_RUNNER_ADAPTER_BOUNDARY_SLUG);
}

export function buildActualCommandRunnerAdapterBoundaryBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeActualCommandRunnerAdapterBoundary(model: { actualCommandRunnerAdapterBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ACTUAL_COMMAND_RUNNER_ADAPTER_BOUNDARY_SLUG, model.actualCommandRunnerAdapterBoundaryItems);
}

export function buildActualCommandRunnerAdapterBoundaryModel() {
  const actualCommandRunnerAdapterBoundaryItems = buildActualCommandRunnerAdapterBoundaryItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ACTUAL_COMMAND_RUNNER_ADAPTER_BOUNDARY_SLUG, actualCommandRunnerAdapterBoundaryItems);
  return { ...model, actualCommandRunnerAdapterBoundaryItems };
}
