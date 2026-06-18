import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildEvidenceStoreAdapterImplementationSliceStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE, buildEvidenceStoreAdapterImplementationSliceStableKey };

const EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_SLICE_SLUG = "evidence-store-adapter-implementation-slice";

export function buildEvidenceStoreAdapterImplementationSlice(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_SLICE_SLUG, input);
}

export function buildEvidenceStoreAdapterImplementationSliceItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_SLICE_SLUG);
}

export function buildEvidenceStoreAdapterImplementationSliceBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeEvidenceStoreAdapterImplementationSlice(model: { evidenceStoreAdapterImplementationSliceItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_SLICE_SLUG, model.evidenceStoreAdapterImplementationSliceItems);
}

export function buildEvidenceStoreAdapterImplementationSliceModel() {
  const evidenceStoreAdapterImplementationSliceItems = buildEvidenceStoreAdapterImplementationSliceItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_SLICE_SLUG, evidenceStoreAdapterImplementationSliceItems);
  return { ...model, evidenceStoreAdapterImplementationSliceItems };
}
