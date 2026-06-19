import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_ADAPTER_OPERATOR_TRIAL_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealAdapterOperatorTrialPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_ADAPTER_OPERATOR_TRIAL_PLAN_LANGUAGE, buildRealAdapterOperatorTrialPlanStableKey };

const REAL_ADAPTER_OPERATOR_TRIAL_PLAN_SLUG = "real-adapter-operator-trial-plan";

export function buildRealAdapterOperatorTrialPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_ADAPTER_OPERATOR_TRIAL_PLAN_SLUG, input);
}

export function buildRealAdapterOperatorTrialPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_ADAPTER_OPERATOR_TRIAL_PLAN_SLUG);
}

export function buildRealAdapterOperatorTrialPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealAdapterOperatorTrialPlan(model: { realAdapterOperatorTrialPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_ADAPTER_OPERATOR_TRIAL_PLAN_SLUG, model.realAdapterOperatorTrialPlanItems);
}

export function buildRealAdapterOperatorTrialPlanModel() {
  const realAdapterOperatorTrialPlanItems = buildRealAdapterOperatorTrialPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_ADAPTER_OPERATOR_TRIAL_PLAN_SLUG, realAdapterOperatorTrialPlanItems);
  return { ...model, realAdapterOperatorTrialPlanItems };
}
