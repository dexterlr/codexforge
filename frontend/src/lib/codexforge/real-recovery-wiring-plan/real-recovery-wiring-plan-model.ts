import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_RECOVERY_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealRecoveryWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_RECOVERY_WIRING_PLAN_LANGUAGE, buildRealRecoveryWiringPlanStableKey };

const REAL_RECOVERY_WIRING_PLAN_SLUG = "real-recovery-wiring-plan";

export function buildRealRecoveryWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_RECOVERY_WIRING_PLAN_SLUG, input);
}

export function buildRealRecoveryWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_RECOVERY_WIRING_PLAN_SLUG);
}

export function buildRealRecoveryWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealRecoveryWiringPlan(model: { realRecoveryWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_RECOVERY_WIRING_PLAN_SLUG, model.realRecoveryWiringPlanItems);
}

export function buildRealRecoveryWiringPlanModel() {
  const realRecoveryWiringPlanItems = buildRealRecoveryWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_RECOVERY_WIRING_PLAN_SLUG, realRecoveryWiringPlanItems);
  return { ...model, realRecoveryWiringPlanItems };
}
