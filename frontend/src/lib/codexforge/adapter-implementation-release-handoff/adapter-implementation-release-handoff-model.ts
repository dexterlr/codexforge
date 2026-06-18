import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_RELEASE_HANDOFF_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildAdapterImplementationReleaseHandoffStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { ADAPTER_IMPLEMENTATION_RELEASE_HANDOFF_LANGUAGE, buildAdapterImplementationReleaseHandoffStableKey };

const ADAPTER_IMPLEMENTATION_RELEASE_HANDOFF_SLUG = "adapter-implementation-release-handoff";

export function buildAdapterImplementationReleaseHandoff(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(ADAPTER_IMPLEMENTATION_RELEASE_HANDOFF_SLUG, input);
}

export function buildAdapterImplementationReleaseHandoffItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(ADAPTER_IMPLEMENTATION_RELEASE_HANDOFF_SLUG);
}

export function buildAdapterImplementationReleaseHandoffBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeAdapterImplementationReleaseHandoff(model: { adapterImplementationReleaseHandoffItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(ADAPTER_IMPLEMENTATION_RELEASE_HANDOFF_SLUG, model.adapterImplementationReleaseHandoffItems);
}

export function buildAdapterImplementationReleaseHandoffModel() {
  const adapterImplementationReleaseHandoffItems = buildAdapterImplementationReleaseHandoffItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(ADAPTER_IMPLEMENTATION_RELEASE_HANDOFF_SLUG, adapterImplementationReleaseHandoffItems);
  return { ...model, adapterImplementationReleaseHandoffItems };
}
