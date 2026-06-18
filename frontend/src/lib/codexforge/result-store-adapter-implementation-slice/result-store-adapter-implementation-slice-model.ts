import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RESULT_STORE_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildResultStoreAdapterImplementationSliceStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { RESULT_STORE_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE, buildResultStoreAdapterImplementationSliceStableKey };

const RESULT_STORE_ADAPTER_IMPLEMENTATION_SLICE_SLUG = "result-store-adapter-implementation-slice";

export function buildResultStoreAdapterImplementationSlice(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(RESULT_STORE_ADAPTER_IMPLEMENTATION_SLICE_SLUG, input);
}

export function buildResultStoreAdapterImplementationSliceItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(RESULT_STORE_ADAPTER_IMPLEMENTATION_SLICE_SLUG);
}

export function buildResultStoreAdapterImplementationSliceBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeResultStoreAdapterImplementationSlice(model: { resultStoreAdapterImplementationSliceItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(RESULT_STORE_ADAPTER_IMPLEMENTATION_SLICE_SLUG, model.resultStoreAdapterImplementationSliceItems);
}

export function buildResultStoreAdapterImplementationSliceModel() {
  const resultStoreAdapterImplementationSliceItems = buildResultStoreAdapterImplementationSliceItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(RESULT_STORE_ADAPTER_IMPLEMENTATION_SLICE_SLUG, resultStoreAdapterImplementationSliceItems);
  return { ...model, resultStoreAdapterImplementationSliceItems };
}
