import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildProjectScaffoldAdapterImplementationSliceStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE, buildProjectScaffoldAdapterImplementationSliceStableKey };

const PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_SLICE_SLUG = "project-scaffold-adapter-implementation-slice";

export function buildProjectScaffoldAdapterImplementationSlice(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_SLICE_SLUG, input);
}

export function buildProjectScaffoldAdapterImplementationSliceItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_SLICE_SLUG);
}

export function buildProjectScaffoldAdapterImplementationSliceBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeProjectScaffoldAdapterImplementationSlice(model: { projectScaffoldAdapterImplementationSliceItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_SLICE_SLUG, model.projectScaffoldAdapterImplementationSliceItems);
}

export function buildProjectScaffoldAdapterImplementationSliceModel() {
  const projectScaffoldAdapterImplementationSliceItems = buildProjectScaffoldAdapterImplementationSliceItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_SLICE_SLUG, projectScaffoldAdapterImplementationSliceItems);
  return { ...model, projectScaffoldAdapterImplementationSliceItems };
}
