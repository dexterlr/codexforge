import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ACTUAL_LOCAL_RUNTIME_ADAPTER_BOUNDARY_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildActualLocalRuntimeAdapterBoundaryStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ACTUAL_LOCAL_RUNTIME_ADAPTER_BOUNDARY_LANGUAGE, buildActualLocalRuntimeAdapterBoundaryStableKey };

const ACTUAL_LOCAL_RUNTIME_ADAPTER_BOUNDARY_SLUG = "actual-local-runtime-adapter-boundary";

export function buildActualLocalRuntimeAdapterBoundary(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ACTUAL_LOCAL_RUNTIME_ADAPTER_BOUNDARY_SLUG, input);
}

export function buildActualLocalRuntimeAdapterBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ACTUAL_LOCAL_RUNTIME_ADAPTER_BOUNDARY_SLUG);
}

export function buildActualLocalRuntimeAdapterBoundaryBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeActualLocalRuntimeAdapterBoundary(model: { actualLocalRuntimeAdapterBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ACTUAL_LOCAL_RUNTIME_ADAPTER_BOUNDARY_SLUG, model.actualLocalRuntimeAdapterBoundaryItems);
}

export function buildActualLocalRuntimeAdapterBoundaryModel() {
  const actualLocalRuntimeAdapterBoundaryItems = buildActualLocalRuntimeAdapterBoundaryItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ACTUAL_LOCAL_RUNTIME_ADAPTER_BOUNDARY_SLUG, actualLocalRuntimeAdapterBoundaryItems);
  return { ...model, actualLocalRuntimeAdapterBoundaryItems };
}
