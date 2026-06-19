import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ACTUAL_RESULT_STORE_BOUNDARY_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildActualResultStoreBoundaryStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ACTUAL_RESULT_STORE_BOUNDARY_LANGUAGE, buildActualResultStoreBoundaryStableKey };

const ACTUAL_RESULT_STORE_BOUNDARY_SLUG = "actual-result-store-boundary";

export function buildActualResultStoreBoundary(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ACTUAL_RESULT_STORE_BOUNDARY_SLUG, input);
}

export function buildActualResultStoreBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ACTUAL_RESULT_STORE_BOUNDARY_SLUG);
}

export function buildActualResultStoreBoundaryBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeActualResultStoreBoundary(model: { actualResultStoreBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ACTUAL_RESULT_STORE_BOUNDARY_SLUG, model.actualResultStoreBoundaryItems);
}

export function buildActualResultStoreBoundaryModel() {
  const actualResultStoreBoundaryItems = buildActualResultStoreBoundaryItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ACTUAL_RESULT_STORE_BOUNDARY_SLUG, actualResultStoreBoundaryItems);
  return { ...model, actualResultStoreBoundaryItems };
}
