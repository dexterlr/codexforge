import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RESEARCH_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildResearchAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { RESEARCH_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildResearchAdapterImplementationPlanStableKey };

const RESEARCH_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "research-adapter-implementation-plan";

export function buildResearchAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(RESEARCH_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildResearchAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(RESEARCH_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildResearchAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeResearchAdapterImplementationPlan(model: { researchAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(RESEARCH_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.researchAdapterImplementationPlans);
}

export function buildResearchAdapterImplementationPlanModel() {
  const researchAdapterImplementationPlans = buildResearchAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(RESEARCH_ADAPTER_IMPLEMENTATION_PLAN_SLUG, researchAdapterImplementationPlans);
  return { ...model, researchAdapterImplementationPlans };
}
