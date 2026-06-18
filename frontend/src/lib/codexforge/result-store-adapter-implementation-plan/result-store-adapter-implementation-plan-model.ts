import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RESULT_STORE_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildResultStoreAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { RESULT_STORE_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildResultStoreAdapterImplementationPlanStableKey };

const RESULT_STORE_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "result-store-adapter-implementation-plan";

export function buildResultStoreAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(RESULT_STORE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildResultStoreAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(RESULT_STORE_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildResultStoreAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeResultStoreAdapterImplementationPlan(model: { resultStoreAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(RESULT_STORE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.resultStoreAdapterImplementationPlans);
}

export function buildResultStoreAdapterImplementationPlanModel() {
  const resultStoreAdapterImplementationPlans = buildResultStoreAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(RESULT_STORE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, resultStoreAdapterImplementationPlans);
  return { ...model, resultStoreAdapterImplementationPlans };
}
