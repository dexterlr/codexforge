import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ACTUAL_RECOVERY_BOUNDARY_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildActualRecoveryBoundaryStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ACTUAL_RECOVERY_BOUNDARY_LANGUAGE, buildActualRecoveryBoundaryStableKey };

const ACTUAL_RECOVERY_BOUNDARY_SLUG = "actual-recovery-boundary";

export function buildActualRecoveryBoundary(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ACTUAL_RECOVERY_BOUNDARY_SLUG, input);
}

export function buildActualRecoveryBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ACTUAL_RECOVERY_BOUNDARY_SLUG);
}

export function buildActualRecoveryBoundaryBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeActualRecoveryBoundary(model: { actualRecoveryBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ACTUAL_RECOVERY_BOUNDARY_SLUG, model.actualRecoveryBoundaryItems);
}

export function buildActualRecoveryBoundaryModel() {
  const actualRecoveryBoundaryItems = buildActualRecoveryBoundaryItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ACTUAL_RECOVERY_BOUNDARY_SLUG, actualRecoveryBoundaryItems);
  return { ...model, actualRecoveryBoundaryItems };
}
