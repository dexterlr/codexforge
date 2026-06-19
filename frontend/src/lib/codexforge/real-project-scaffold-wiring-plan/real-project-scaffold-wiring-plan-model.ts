import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_PROJECT_SCAFFOLD_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealProjectScaffoldWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_PROJECT_SCAFFOLD_WIRING_PLAN_LANGUAGE, buildRealProjectScaffoldWiringPlanStableKey };

const REAL_PROJECT_SCAFFOLD_WIRING_PLAN_SLUG = "real-project-scaffold-wiring-plan";

export function buildRealProjectScaffoldWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_PROJECT_SCAFFOLD_WIRING_PLAN_SLUG, input);
}

export function buildRealProjectScaffoldWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_PROJECT_SCAFFOLD_WIRING_PLAN_SLUG);
}

export function buildRealProjectScaffoldWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealProjectScaffoldWiringPlan(model: { realProjectScaffoldWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_PROJECT_SCAFFOLD_WIRING_PLAN_SLUG, model.realProjectScaffoldWiringPlanItems);
}

export function buildRealProjectScaffoldWiringPlanModel() {
  const realProjectScaffoldWiringPlanItems = buildRealProjectScaffoldWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_PROJECT_SCAFFOLD_WIRING_PLAN_SLUG, realProjectScaffoldWiringPlanItems);
  return { ...model, realProjectScaffoldWiringPlanItems };
}
