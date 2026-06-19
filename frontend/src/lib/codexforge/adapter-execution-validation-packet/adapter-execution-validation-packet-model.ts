import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_EXECUTION_VALIDATION_PACKET_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildAdapterExecutionValidationPacketStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ADAPTER_EXECUTION_VALIDATION_PACKET_LANGUAGE, buildAdapterExecutionValidationPacketStableKey };

const ADAPTER_EXECUTION_VALIDATION_PACKET_SLUG = "adapter-execution-validation-packet";

export function buildAdapterExecutionValidationPacket(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ADAPTER_EXECUTION_VALIDATION_PACKET_SLUG, input);
}

export function buildAdapterExecutionValidationPacketItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ADAPTER_EXECUTION_VALIDATION_PACKET_SLUG);
}

export function buildAdapterExecutionValidationPacketBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeAdapterExecutionValidationPacket(model: { adapterExecutionValidationPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ADAPTER_EXECUTION_VALIDATION_PACKET_SLUG, model.adapterExecutionValidationPacketItems);
}

export function buildAdapterExecutionValidationPacketModel() {
  const adapterExecutionValidationPacketItems = buildAdapterExecutionValidationPacketItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ADAPTER_EXECUTION_VALIDATION_PACKET_SLUG, adapterExecutionValidationPacketItems);
  return { ...model, adapterExecutionValidationPacketItems };
}
