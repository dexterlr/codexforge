import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RECOVERY_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildRecoveryAdapterImplementationSliceStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { RECOVERY_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE, buildRecoveryAdapterImplementationSliceStableKey };

const RECOVERY_ADAPTER_IMPLEMENTATION_SLICE_SLUG = "recovery-adapter-implementation-slice";

export function buildRecoveryAdapterImplementationSlice(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(RECOVERY_ADAPTER_IMPLEMENTATION_SLICE_SLUG, input);
}

export function buildRecoveryAdapterImplementationSliceItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(RECOVERY_ADAPTER_IMPLEMENTATION_SLICE_SLUG);
}

export function buildRecoveryAdapterImplementationSliceBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeRecoveryAdapterImplementationSlice(model: { recoveryAdapterImplementationSliceItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(RECOVERY_ADAPTER_IMPLEMENTATION_SLICE_SLUG, model.recoveryAdapterImplementationSliceItems);
}

export function buildRecoveryAdapterImplementationSliceModel() {
  const recoveryAdapterImplementationSliceItems = buildRecoveryAdapterImplementationSliceItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(RECOVERY_ADAPTER_IMPLEMENTATION_SLICE_SLUG, recoveryAdapterImplementationSliceItems);
  return { ...model, recoveryAdapterImplementationSliceItems };
}
