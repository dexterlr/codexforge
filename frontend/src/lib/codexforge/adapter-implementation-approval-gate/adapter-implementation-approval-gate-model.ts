import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_APPROVAL_GATE_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildAdapterImplementationApprovalGateStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { ADAPTER_IMPLEMENTATION_APPROVAL_GATE_LANGUAGE, buildAdapterImplementationApprovalGateStableKey };

const ADAPTER_IMPLEMENTATION_APPROVAL_GATE_SLUG = "adapter-implementation-approval-gate";

export function buildAdapterImplementationApprovalGate(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(ADAPTER_IMPLEMENTATION_APPROVAL_GATE_SLUG, input);
}

export function buildAdapterImplementationApprovalGateItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(ADAPTER_IMPLEMENTATION_APPROVAL_GATE_SLUG);
}

export function buildAdapterImplementationApprovalGateBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeAdapterImplementationApprovalGate(model: { adapterImplementationApprovalGateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(ADAPTER_IMPLEMENTATION_APPROVAL_GATE_SLUG, model.adapterImplementationApprovalGateItems);
}

export function buildAdapterImplementationApprovalGateModel() {
  const adapterImplementationApprovalGateItems = buildAdapterImplementationApprovalGateItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(ADAPTER_IMPLEMENTATION_APPROVAL_GATE_SLUG, adapterImplementationApprovalGateItems);
  return { ...model, adapterImplementationApprovalGateItems };
}
