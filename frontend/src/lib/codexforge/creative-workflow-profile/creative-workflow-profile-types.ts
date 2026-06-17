import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type CreativeWorkflowProfileStatus = "blocked" | "review-only";
export type CreativeWorkflowProfile = UniversalExecutionReviewPacket & { status: CreativeWorkflowProfileStatus };
export type CreativeWorkflowProfileBoundary = UniversalExecutionReviewBoundary;
export type CreativeWorkflowProfileModel = UniversalExecutionReviewModel & {
  title: "Creative workflow profile";
  creativeWorkflowProfiles: CreativeWorkflowProfile[];
};

export { buildUniversalExecutionReviewStableKey as buildCreativeWorkflowProfileStableKey } from "../universal-execution-review-kit";
