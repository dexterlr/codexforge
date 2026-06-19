import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_EXECUTION_FAILURE_PACKET_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildAdapterExecutionFailurePacketStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ADAPTER_EXECUTION_FAILURE_PACKET_LANGUAGE, buildAdapterExecutionFailurePacketStableKey };

const ADAPTER_EXECUTION_FAILURE_PACKET_SLUG = "adapter-execution-failure-packet";

export function buildAdapterExecutionFailurePacket(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ADAPTER_EXECUTION_FAILURE_PACKET_SLUG, input);
}

export function buildAdapterExecutionFailurePacketItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ADAPTER_EXECUTION_FAILURE_PACKET_SLUG);
}

export function buildAdapterExecutionFailurePacketBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeAdapterExecutionFailurePacket(model: { adapterExecutionFailurePacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ADAPTER_EXECUTION_FAILURE_PACKET_SLUG, model.adapterExecutionFailurePacketItems);
}

export function buildAdapterExecutionFailurePacketModel() {
  const adapterExecutionFailurePacketItems = buildAdapterExecutionFailurePacketItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ADAPTER_EXECUTION_FAILURE_PACKET_SLUG, adapterExecutionFailurePacketItems);
  return { ...model, adapterExecutionFailurePacketItems };
}
