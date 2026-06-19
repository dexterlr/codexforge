import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ACTUAL_PROJECT_SCAFFOLD_BOUNDARY_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildActualProjectScaffoldBoundaryStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ACTUAL_PROJECT_SCAFFOLD_BOUNDARY_LANGUAGE, buildActualProjectScaffoldBoundaryStableKey };

const ACTUAL_PROJECT_SCAFFOLD_BOUNDARY_SLUG = "actual-project-scaffold-boundary";

export function buildActualProjectScaffoldBoundary(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ACTUAL_PROJECT_SCAFFOLD_BOUNDARY_SLUG, input);
}

export function buildActualProjectScaffoldBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ACTUAL_PROJECT_SCAFFOLD_BOUNDARY_SLUG);
}

export function buildActualProjectScaffoldBoundaryBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeActualProjectScaffoldBoundary(model: { actualProjectScaffoldBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ACTUAL_PROJECT_SCAFFOLD_BOUNDARY_SLUG, model.actualProjectScaffoldBoundaryItems);
}

export function buildActualProjectScaffoldBoundaryModel() {
  const actualProjectScaffoldBoundaryItems = buildActualProjectScaffoldBoundaryItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ACTUAL_PROJECT_SCAFFOLD_BOUNDARY_SLUG, actualProjectScaffoldBoundaryItems);
  return { ...model, actualProjectScaffoldBoundaryItems };
}
