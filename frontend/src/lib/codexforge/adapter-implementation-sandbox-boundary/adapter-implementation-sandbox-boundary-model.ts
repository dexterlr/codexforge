import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_SANDBOX_BOUNDARY_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildAdapterImplementationSandboxBoundaryStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { ADAPTER_IMPLEMENTATION_SANDBOX_BOUNDARY_LANGUAGE, buildAdapterImplementationSandboxBoundaryStableKey };

const ADAPTER_IMPLEMENTATION_SANDBOX_BOUNDARY_SLUG = "adapter-implementation-sandbox-boundary";

export function buildAdapterImplementationSandboxBoundary(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(ADAPTER_IMPLEMENTATION_SANDBOX_BOUNDARY_SLUG, input);
}

export function buildAdapterImplementationSandboxBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(ADAPTER_IMPLEMENTATION_SANDBOX_BOUNDARY_SLUG);
}

export function buildAdapterImplementationSandboxBoundaryBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeAdapterImplementationSandboxBoundary(model: { adapterImplementationSandboxBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(ADAPTER_IMPLEMENTATION_SANDBOX_BOUNDARY_SLUG, model.adapterImplementationSandboxBoundaryItems);
}

export function buildAdapterImplementationSandboxBoundaryModel() {
  const adapterImplementationSandboxBoundaryItems = buildAdapterImplementationSandboxBoundaryItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(ADAPTER_IMPLEMENTATION_SANDBOX_BOUNDARY_SLUG, adapterImplementationSandboxBoundaryItems);
  return { ...model, adapterImplementationSandboxBoundaryItems };
}
