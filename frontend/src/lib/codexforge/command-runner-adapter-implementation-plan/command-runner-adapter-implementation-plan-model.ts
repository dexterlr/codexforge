import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildCommandRunnerAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildCommandRunnerAdapterImplementationPlanStableKey };

const COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "command-runner-adapter-implementation-plan";

export function buildCommandRunnerAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildCommandRunnerAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildCommandRunnerAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeCommandRunnerAdapterImplementationPlan(model: { commandRunnerAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.commandRunnerAdapterImplementationPlans);
}

export function buildCommandRunnerAdapterImplementationPlanModel() {
  const commandRunnerAdapterImplementationPlans = buildCommandRunnerAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_PLAN_SLUG, commandRunnerAdapterImplementationPlans);
  return { ...model, commandRunnerAdapterImplementationPlans };
}
