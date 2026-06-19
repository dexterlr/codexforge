import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ACTUAL_PACKAGING_BOUNDARY_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildActualPackagingBoundaryStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ACTUAL_PACKAGING_BOUNDARY_LANGUAGE, buildActualPackagingBoundaryStableKey };

const ACTUAL_PACKAGING_BOUNDARY_SLUG = "actual-packaging-boundary";

export function buildActualPackagingBoundary(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ACTUAL_PACKAGING_BOUNDARY_SLUG, input);
}

export function buildActualPackagingBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ACTUAL_PACKAGING_BOUNDARY_SLUG);
}

export function buildActualPackagingBoundaryBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeActualPackagingBoundary(model: { actualPackagingBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ACTUAL_PACKAGING_BOUNDARY_SLUG, model.actualPackagingBoundaryItems);
}

export function buildActualPackagingBoundaryModel() {
  const actualPackagingBoundaryItems = buildActualPackagingBoundaryItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ACTUAL_PACKAGING_BOUNDARY_SLUG, actualPackagingBoundaryItems);
  return { ...model, actualPackagingBoundaryItems };
}
