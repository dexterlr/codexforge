import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BOUNDED_ADAPTER_IMPLEMENTATION_SLICE_INVENTORY_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildBoundedAdapterImplementationSliceInventoryStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { BOUNDED_ADAPTER_IMPLEMENTATION_SLICE_INVENTORY_LANGUAGE, buildBoundedAdapterImplementationSliceInventoryStableKey };

const BOUNDED_ADAPTER_IMPLEMENTATION_SLICE_INVENTORY_SLUG = "bounded-adapter-implementation-slice-inventory";

export function buildBoundedAdapterImplementationSliceInventory(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(BOUNDED_ADAPTER_IMPLEMENTATION_SLICE_INVENTORY_SLUG, input);
}

export function buildBoundedAdapterImplementationSliceInventoryItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(BOUNDED_ADAPTER_IMPLEMENTATION_SLICE_INVENTORY_SLUG);
}

export function buildBoundedAdapterImplementationSliceInventoryBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeBoundedAdapterImplementationSliceInventory(model: { boundedAdapterImplementationSliceInventoryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(BOUNDED_ADAPTER_IMPLEMENTATION_SLICE_INVENTORY_SLUG, model.boundedAdapterImplementationSliceInventoryItems);
}

export function buildBoundedAdapterImplementationSliceInventoryModel() {
  const boundedAdapterImplementationSliceInventoryItems = buildBoundedAdapterImplementationSliceInventoryItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(BOUNDED_ADAPTER_IMPLEMENTATION_SLICE_INVENTORY_SLUG, boundedAdapterImplementationSliceInventoryItems);
  return { ...model, boundedAdapterImplementationSliceInventoryItems };
}
