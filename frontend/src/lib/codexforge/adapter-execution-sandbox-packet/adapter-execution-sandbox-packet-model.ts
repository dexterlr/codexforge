import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_EXECUTION_SANDBOX_PACKET_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildAdapterExecutionSandboxPacketStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ADAPTER_EXECUTION_SANDBOX_PACKET_LANGUAGE, buildAdapterExecutionSandboxPacketStableKey };

const ADAPTER_EXECUTION_SANDBOX_PACKET_SLUG = "adapter-execution-sandbox-packet";

export function buildAdapterExecutionSandboxPacket(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ADAPTER_EXECUTION_SANDBOX_PACKET_SLUG, input);
}

export function buildAdapterExecutionSandboxPacketItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ADAPTER_EXECUTION_SANDBOX_PACKET_SLUG);
}

export function buildAdapterExecutionSandboxPacketBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeAdapterExecutionSandboxPacket(model: { adapterExecutionSandboxPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ADAPTER_EXECUTION_SANDBOX_PACKET_SLUG, model.adapterExecutionSandboxPacketItems);
}

export function buildAdapterExecutionSandboxPacketModel() {
  const adapterExecutionSandboxPacketItems = buildAdapterExecutionSandboxPacketItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ADAPTER_EXECUTION_SANDBOX_PACKET_SLUG, adapterExecutionSandboxPacketItems);
  return { ...model, adapterExecutionSandboxPacketItems };
}
