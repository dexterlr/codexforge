import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildFileWriteAdapterImplementationSliceStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { FILE_WRITE_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE, buildFileWriteAdapterImplementationSliceStableKey };

const FILE_WRITE_ADAPTER_IMPLEMENTATION_SLICE_SLUG = "file-write-adapter-implementation-slice";

export function buildFileWriteAdapterImplementationSlice(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(FILE_WRITE_ADAPTER_IMPLEMENTATION_SLICE_SLUG, input);
}

export function buildFileWriteAdapterImplementationSliceItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(FILE_WRITE_ADAPTER_IMPLEMENTATION_SLICE_SLUG);
}

export function buildFileWriteAdapterImplementationSliceBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeFileWriteAdapterImplementationSlice(model: { fileWriteAdapterImplementationSliceItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(FILE_WRITE_ADAPTER_IMPLEMENTATION_SLICE_SLUG, model.fileWriteAdapterImplementationSliceItems);
}

export function buildFileWriteAdapterImplementationSliceModel() {
  const fileWriteAdapterImplementationSliceItems = buildFileWriteAdapterImplementationSliceItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(FILE_WRITE_ADAPTER_IMPLEMENTATION_SLICE_SLUG, fileWriteAdapterImplementationSliceItems);
  return { ...model, fileWriteAdapterImplementationSliceItems };
}
