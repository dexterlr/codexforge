import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_EXECUTION_AUDIT_PACKET_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildAdapterExecutionAuditPacketStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ADAPTER_EXECUTION_AUDIT_PACKET_LANGUAGE, buildAdapterExecutionAuditPacketStableKey };

const ADAPTER_EXECUTION_AUDIT_PACKET_SLUG = "adapter-execution-audit-packet";

export function buildAdapterExecutionAuditPacket(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ADAPTER_EXECUTION_AUDIT_PACKET_SLUG, input);
}

export function buildAdapterExecutionAuditPacketItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ADAPTER_EXECUTION_AUDIT_PACKET_SLUG);
}

export function buildAdapterExecutionAuditPacketBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeAdapterExecutionAuditPacket(model: { adapterExecutionAuditPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ADAPTER_EXECUTION_AUDIT_PACKET_SLUG, model.adapterExecutionAuditPacketItems);
}

export function buildAdapterExecutionAuditPacketModel() {
  const adapterExecutionAuditPacketItems = buildAdapterExecutionAuditPacketItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ADAPTER_EXECUTION_AUDIT_PACKET_SLUG, adapterExecutionAuditPacketItems);
  return { ...model, adapterExecutionAuditPacketItems };
}
