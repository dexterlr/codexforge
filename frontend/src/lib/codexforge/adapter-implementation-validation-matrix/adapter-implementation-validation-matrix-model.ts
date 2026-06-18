import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_VALIDATION_MATRIX_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildAdapterImplementationValidationMatrixStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { ADAPTER_IMPLEMENTATION_VALIDATION_MATRIX_LANGUAGE, buildAdapterImplementationValidationMatrixStableKey };

const ADAPTER_IMPLEMENTATION_VALIDATION_MATRIX_SLUG = "adapter-implementation-validation-matrix";

export function buildAdapterImplementationValidationMatrix(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(ADAPTER_IMPLEMENTATION_VALIDATION_MATRIX_SLUG, input);
}

export function buildAdapterImplementationValidationMatrixItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(ADAPTER_IMPLEMENTATION_VALIDATION_MATRIX_SLUG);
}

export function buildAdapterImplementationValidationMatrixBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeAdapterImplementationValidationMatrix(model: { adapterImplementationValidationMatrixItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(ADAPTER_IMPLEMENTATION_VALIDATION_MATRIX_SLUG, model.adapterImplementationValidationMatrixItems);
}

export function buildAdapterImplementationValidationMatrixModel() {
  const adapterImplementationValidationMatrixItems = buildAdapterImplementationValidationMatrixItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(ADAPTER_IMPLEMENTATION_VALIDATION_MATRIX_SLUG, adapterImplementationValidationMatrixItems);
  return { ...model, adapterImplementationValidationMatrixItems };
}
