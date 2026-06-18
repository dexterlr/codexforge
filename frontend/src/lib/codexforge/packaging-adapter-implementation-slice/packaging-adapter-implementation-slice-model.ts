import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PACKAGING_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildPackagingAdapterImplementationSliceStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { PACKAGING_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE, buildPackagingAdapterImplementationSliceStableKey };

const PACKAGING_ADAPTER_IMPLEMENTATION_SLICE_SLUG = "packaging-adapter-implementation-slice";

export function buildPackagingAdapterImplementationSlice(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(PACKAGING_ADAPTER_IMPLEMENTATION_SLICE_SLUG, input);
}

export function buildPackagingAdapterImplementationSliceItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(PACKAGING_ADAPTER_IMPLEMENTATION_SLICE_SLUG);
}

export function buildPackagingAdapterImplementationSliceBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizePackagingAdapterImplementationSlice(model: { packagingAdapterImplementationSliceItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(PACKAGING_ADAPTER_IMPLEMENTATION_SLICE_SLUG, model.packagingAdapterImplementationSliceItems);
}

export function buildPackagingAdapterImplementationSliceModel() {
  const packagingAdapterImplementationSliceItems = buildPackagingAdapterImplementationSliceItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(PACKAGING_ADAPTER_IMPLEMENTATION_SLICE_SLUG, packagingAdapterImplementationSliceItems);
  return { ...model, packagingAdapterImplementationSliceItems };
}
