import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONNECTOR_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildConnectorAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { CONNECTOR_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildConnectorAdapterImplementationPlanStableKey };

const CONNECTOR_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "connector-adapter-implementation-plan";

export function buildConnectorAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(CONNECTOR_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildConnectorAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(CONNECTOR_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildConnectorAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeConnectorAdapterImplementationPlan(model: { connectorAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(CONNECTOR_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.connectorAdapterImplementationPlans);
}

export function buildConnectorAdapterImplementationPlanModel() {
  const connectorAdapterImplementationPlans = buildConnectorAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(CONNECTOR_ADAPTER_IMPLEMENTATION_PLAN_SLUG, connectorAdapterImplementationPlans);
  return { ...model, connectorAdapterImplementationPlans };
}
