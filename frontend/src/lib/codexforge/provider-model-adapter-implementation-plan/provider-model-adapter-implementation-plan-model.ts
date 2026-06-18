import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROVIDER_MODEL_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildProviderModelAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { PROVIDER_MODEL_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildProviderModelAdapterImplementationPlanStableKey };

const PROVIDER_MODEL_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "provider-model-adapter-implementation-plan";

export function buildProviderModelAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(PROVIDER_MODEL_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildProviderModelAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(PROVIDER_MODEL_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildProviderModelAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeProviderModelAdapterImplementationPlan(model: { providerModelAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(PROVIDER_MODEL_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.providerModelAdapterImplementationPlans);
}

export function buildProviderModelAdapterImplementationPlanModel() {
  const providerModelAdapterImplementationPlans = buildProviderModelAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(PROVIDER_MODEL_ADAPTER_IMPLEMENTATION_PLAN_SLUG, providerModelAdapterImplementationPlans);
  return { ...model, providerModelAdapterImplementationPlans };
}
