import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_COMMAND_RUNNER_ADAPTER_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealCommandRunnerAdapterWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_COMMAND_RUNNER_ADAPTER_WIRING_PLAN_LANGUAGE, buildRealCommandRunnerAdapterWiringPlanStableKey };

const REAL_COMMAND_RUNNER_ADAPTER_WIRING_PLAN_SLUG = "real-command-runner-adapter-wiring-plan";

export function buildRealCommandRunnerAdapterWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_COMMAND_RUNNER_ADAPTER_WIRING_PLAN_SLUG, input);
}

export function buildRealCommandRunnerAdapterWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_COMMAND_RUNNER_ADAPTER_WIRING_PLAN_SLUG);
}

export function buildRealCommandRunnerAdapterWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealCommandRunnerAdapterWiringPlan(model: { realCommandRunnerAdapterWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_COMMAND_RUNNER_ADAPTER_WIRING_PLAN_SLUG, model.realCommandRunnerAdapterWiringPlanItems);
}

export function buildRealCommandRunnerAdapterWiringPlanModel() {
  const realCommandRunnerAdapterWiringPlanItems = buildRealCommandRunnerAdapterWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_COMMAND_RUNNER_ADAPTER_WIRING_PLAN_SLUG, realCommandRunnerAdapterWiringPlanItems);
  return { ...model, realCommandRunnerAdapterWiringPlanItems };
}
