import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  RECOVERY_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildRecoveryAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { RECOVERY_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildRecoveryAdapterImplementationPlanStableKey };

const RECOVERY_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "recovery-adapter-implementation-plan";

export function buildRecoveryAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(RECOVERY_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildRecoveryAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(RECOVERY_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildRecoveryAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeRecoveryAdapterImplementationPlan(model: { recoveryAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(RECOVERY_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.recoveryAdapterImplementationPlans);
}

export function buildRecoveryAdapterImplementationPlanModel() {
  const recoveryAdapterImplementationPlans = buildRecoveryAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(RECOVERY_ADAPTER_IMPLEMENTATION_PLAN_SLUG, recoveryAdapterImplementationPlans);
  return { ...model, recoveryAdapterImplementationPlans };
}
