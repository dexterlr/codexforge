import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ACTUAL_FILE_WRITE_ADAPTER_BOUNDARY_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildActualFileWriteAdapterBoundaryStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ACTUAL_FILE_WRITE_ADAPTER_BOUNDARY_LANGUAGE, buildActualFileWriteAdapterBoundaryStableKey };

const ACTUAL_FILE_WRITE_ADAPTER_BOUNDARY_SLUG = "actual-file-write-adapter-boundary";

export function buildActualFileWriteAdapterBoundary(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ACTUAL_FILE_WRITE_ADAPTER_BOUNDARY_SLUG, input);
}

export function buildActualFileWriteAdapterBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ACTUAL_FILE_WRITE_ADAPTER_BOUNDARY_SLUG);
}

export function buildActualFileWriteAdapterBoundaryBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeActualFileWriteAdapterBoundary(model: { actualFileWriteAdapterBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ACTUAL_FILE_WRITE_ADAPTER_BOUNDARY_SLUG, model.actualFileWriteAdapterBoundaryItems);
}

export function buildActualFileWriteAdapterBoundaryModel() {
  const actualFileWriteAdapterBoundaryItems = buildActualFileWriteAdapterBoundaryItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ACTUAL_FILE_WRITE_ADAPTER_BOUNDARY_SLUG, actualFileWriteAdapterBoundaryItems);
  return { ...model, actualFileWriteAdapterBoundaryItems };
}
