import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  AUTOMATION_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildAutomationAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { AUTOMATION_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildAutomationAdapterImplementationPlanStableKey };

const AUTOMATION_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "automation-adapter-implementation-plan";

export function buildAutomationAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(AUTOMATION_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildAutomationAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(AUTOMATION_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildAutomationAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeAutomationAdapterImplementationPlan(model: { automationAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(AUTOMATION_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.automationAdapterImplementationPlans);
}

export function buildAutomationAdapterImplementationPlanModel() {
  const automationAdapterImplementationPlans = buildAutomationAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(AUTOMATION_ADAPTER_IMPLEMENTATION_PLAN_SLUG, automationAdapterImplementationPlans);
  return { ...model, automationAdapterImplementationPlans };
}
