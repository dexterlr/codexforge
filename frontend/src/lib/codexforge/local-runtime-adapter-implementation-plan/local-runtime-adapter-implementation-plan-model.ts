import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildLocalRuntimeAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildLocalRuntimeAdapterImplementationPlanStableKey };

const LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "local-runtime-adapter-implementation-plan";

export function buildLocalRuntimeAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildLocalRuntimeAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildLocalRuntimeAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeLocalRuntimeAdapterImplementationPlan(model: { localRuntimeAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.localRuntimeAdapterImplementationPlans);
}

export function buildLocalRuntimeAdapterImplementationPlanModel() {
  const localRuntimeAdapterImplementationPlans = buildLocalRuntimeAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_PLAN_SLUG, localRuntimeAdapterImplementationPlans);
  return { ...model, localRuntimeAdapterImplementationPlans };
}
