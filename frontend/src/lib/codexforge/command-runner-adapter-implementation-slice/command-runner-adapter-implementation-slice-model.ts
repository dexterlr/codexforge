import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildCommandRunnerAdapterImplementationSliceStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE, buildCommandRunnerAdapterImplementationSliceStableKey };

const COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_SLICE_SLUG = "command-runner-adapter-implementation-slice";

export function buildCommandRunnerAdapterImplementationSlice(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_SLICE_SLUG, input);
}

export function buildCommandRunnerAdapterImplementationSliceItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_SLICE_SLUG);
}

export function buildCommandRunnerAdapterImplementationSliceBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeCommandRunnerAdapterImplementationSlice(model: { commandRunnerAdapterImplementationSliceItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_SLICE_SLUG, model.commandRunnerAdapterImplementationSliceItems);
}

export function buildCommandRunnerAdapterImplementationSliceModel() {
  const commandRunnerAdapterImplementationSliceItems = buildCommandRunnerAdapterImplementationSliceItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_SLICE_SLUG, commandRunnerAdapterImplementationSliceItems);
  return { ...model, commandRunnerAdapterImplementationSliceItems };
}
