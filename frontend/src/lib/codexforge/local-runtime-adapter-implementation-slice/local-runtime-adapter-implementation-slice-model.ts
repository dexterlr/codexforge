import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildLocalRuntimeAdapterImplementationSliceStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE, buildLocalRuntimeAdapterImplementationSliceStableKey };

const LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_SLICE_SLUG = "local-runtime-adapter-implementation-slice";

export function buildLocalRuntimeAdapterImplementationSlice(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_SLICE_SLUG, input);
}

export function buildLocalRuntimeAdapterImplementationSliceItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_SLICE_SLUG);
}

export function buildLocalRuntimeAdapterImplementationSliceBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeLocalRuntimeAdapterImplementationSlice(model: { localRuntimeAdapterImplementationSliceItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_SLICE_SLUG, model.localRuntimeAdapterImplementationSliceItems);
}

export function buildLocalRuntimeAdapterImplementationSliceModel() {
  const localRuntimeAdapterImplementationSliceItems = buildLocalRuntimeAdapterImplementationSliceItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_SLICE_SLUG, localRuntimeAdapterImplementationSliceItems);
  return { ...model, localRuntimeAdapterImplementationSliceItems };
}
