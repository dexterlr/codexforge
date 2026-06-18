import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_AUDIT_TRAIL_LANGUAGE,
  buildBoundedAdapterImplementationSlice,
  buildBoundedAdapterImplementationSliceBoundary,
  buildBoundedAdapterImplementationSliceModelForSlug,
  buildBoundedAdapterImplementationSlicePackets,
  buildBoundedAdapterImplementationSliceStableKey as buildAdapterImplementationAuditTrailStableKey,
  summarizeBoundedAdapterImplementationSliceForSlug,
  type BoundedAdapterImplementationSlicePacketInput,
} from "../bounded-adapter-implementation-slice-kit";

export { ADAPTER_IMPLEMENTATION_AUDIT_TRAIL_LANGUAGE, buildAdapterImplementationAuditTrailStableKey };

const ADAPTER_IMPLEMENTATION_AUDIT_TRAIL_SLUG = "adapter-implementation-audit-trail";

export function buildAdapterImplementationAuditTrail(input: BoundedAdapterImplementationSlicePacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationSlice(ADAPTER_IMPLEMENTATION_AUDIT_TRAIL_SLUG, input);
}

export function buildAdapterImplementationAuditTrailItems(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationSlicePackets(ADAPTER_IMPLEMENTATION_AUDIT_TRAIL_SLUG);
}

export function buildAdapterImplementationAuditTrailBoundary() {
  return buildBoundedAdapterImplementationSliceBoundary();
}

export function summarizeAdapterImplementationAuditTrail(model: { adapterImplementationAuditTrailItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationSliceForSlug(ADAPTER_IMPLEMENTATION_AUDIT_TRAIL_SLUG, model.adapterImplementationAuditTrailItems);
}

export function buildAdapterImplementationAuditTrailModel() {
  const adapterImplementationAuditTrailItems = buildAdapterImplementationAuditTrailItems();
  const model = buildBoundedAdapterImplementationSliceModelForSlug(ADAPTER_IMPLEMENTATION_AUDIT_TRAIL_SLUG, adapterImplementationAuditTrailItems);
  return { ...model, adapterImplementationAuditTrailItems };
}
