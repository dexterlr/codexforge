import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type WorkflowProfileRegistryStatus = "blocked" | "review-only";
export type WorkflowProfileRegistry = UniversalExecutionReviewPacket & { status: WorkflowProfileRegistryStatus };
export type WorkflowProfileRegistryBoundary = UniversalExecutionReviewBoundary;
export type WorkflowProfileRegistryModel = UniversalExecutionReviewModel & {
  title: "Workflow profile registry";
  workflowProfileRegistries: WorkflowProfileRegistry[];
};

export { buildUniversalExecutionReviewStableKey as buildWorkflowProfileRegistryStableKey } from "../universal-execution-review-kit";
