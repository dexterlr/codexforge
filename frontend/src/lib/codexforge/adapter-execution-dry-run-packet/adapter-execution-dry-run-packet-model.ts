import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_EXECUTION_DRY_RUN_PACKET_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildAdapterExecutionDryRunPacketStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ADAPTER_EXECUTION_DRY_RUN_PACKET_LANGUAGE, buildAdapterExecutionDryRunPacketStableKey };

const ADAPTER_EXECUTION_DRY_RUN_PACKET_SLUG = "adapter-execution-dry-run-packet";

export function buildAdapterExecutionDryRunPacket(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ADAPTER_EXECUTION_DRY_RUN_PACKET_SLUG, input);
}

export function buildAdapterExecutionDryRunPacketItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ADAPTER_EXECUTION_DRY_RUN_PACKET_SLUG);
}

export function buildAdapterExecutionDryRunPacketBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeAdapterExecutionDryRunPacket(model: { adapterExecutionDryRunPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ADAPTER_EXECUTION_DRY_RUN_PACKET_SLUG, model.adapterExecutionDryRunPacketItems);
}

export function buildAdapterExecutionDryRunPacketModel() {
  const adapterExecutionDryRunPacketItems = buildAdapterExecutionDryRunPacketItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ADAPTER_EXECUTION_DRY_RUN_PACKET_SLUG, adapterExecutionDryRunPacketItems);
  return { ...model, adapterExecutionDryRunPacketItems };
}
