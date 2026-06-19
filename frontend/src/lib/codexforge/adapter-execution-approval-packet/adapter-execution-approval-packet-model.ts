import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_EXECUTION_APPROVAL_PACKET_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildAdapterExecutionApprovalPacketStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ADAPTER_EXECUTION_APPROVAL_PACKET_LANGUAGE, buildAdapterExecutionApprovalPacketStableKey };

const ADAPTER_EXECUTION_APPROVAL_PACKET_SLUG = "adapter-execution-approval-packet";

export function buildAdapterExecutionApprovalPacket(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ADAPTER_EXECUTION_APPROVAL_PACKET_SLUG, input);
}

export function buildAdapterExecutionApprovalPacketItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ADAPTER_EXECUTION_APPROVAL_PACKET_SLUG);
}

export function buildAdapterExecutionApprovalPacketBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeAdapterExecutionApprovalPacket(model: { adapterExecutionApprovalPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ADAPTER_EXECUTION_APPROVAL_PACKET_SLUG, model.adapterExecutionApprovalPacketItems);
}

export function buildAdapterExecutionApprovalPacketModel() {
  const adapterExecutionApprovalPacketItems = buildAdapterExecutionApprovalPacketItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ADAPTER_EXECUTION_APPROVAL_PACKET_SLUG, adapterExecutionApprovalPacketItems);
  return { ...model, adapterExecutionApprovalPacketItems };
}
