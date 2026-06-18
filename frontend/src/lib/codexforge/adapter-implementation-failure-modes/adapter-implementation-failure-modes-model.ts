import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_FAILURE_MODES_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildAdapterImplementationFailureModesStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { ADAPTER_IMPLEMENTATION_FAILURE_MODES_LANGUAGE, buildAdapterImplementationFailureModesStableKey };

const ADAPTER_IMPLEMENTATION_FAILURE_MODES_SLUG = "adapter-implementation-failure-modes";

export function buildAdapterImplementationFailureModes(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(ADAPTER_IMPLEMENTATION_FAILURE_MODES_SLUG, input);
}

export function buildAdapterImplementationFailureModesItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(ADAPTER_IMPLEMENTATION_FAILURE_MODES_SLUG);
}

export function buildAdapterImplementationFailureModesBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeAdapterImplementationFailureModes(model: { adapterImplementationFailureModesItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(ADAPTER_IMPLEMENTATION_FAILURE_MODES_SLUG, model.adapterImplementationFailureModesItems);
}

export function buildAdapterImplementationFailureModesModel() {
  const adapterImplementationFailureModesItems = buildAdapterImplementationFailureModesItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(ADAPTER_IMPLEMENTATION_FAILURE_MODES_SLUG, adapterImplementationFailureModesItems);
  return { ...model, adapterImplementationFailureModesItems };
}
