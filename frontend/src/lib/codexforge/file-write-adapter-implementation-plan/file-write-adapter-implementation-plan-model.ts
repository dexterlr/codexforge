import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildFileWriteAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { FILE_WRITE_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildFileWriteAdapterImplementationPlanStableKey };

const FILE_WRITE_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "file-write-adapter-implementation-plan";

export function buildFileWriteAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(FILE_WRITE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildFileWriteAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(FILE_WRITE_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildFileWriteAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeFileWriteAdapterImplementationPlan(model: { fileWriteAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(FILE_WRITE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.fileWriteAdapterImplementationPlans);
}

export function buildFileWriteAdapterImplementationPlanModel() {
  const fileWriteAdapterImplementationPlans = buildFileWriteAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(FILE_WRITE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, fileWriteAdapterImplementationPlans);
  return { ...model, fileWriteAdapterImplementationPlans };
}
