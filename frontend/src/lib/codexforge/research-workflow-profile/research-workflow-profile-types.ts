import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type ResearchWorkflowProfileStatus = "blocked" | "review-only";
export type ResearchWorkflowProfile = UniversalExecutionReviewPacket & { status: ResearchWorkflowProfileStatus };
export type ResearchWorkflowProfileBoundary = UniversalExecutionReviewBoundary;
export type ResearchWorkflowProfileModel = UniversalExecutionReviewModel & {
  title: "Research workflow profile";
  researchWorkflowProfiles: ResearchWorkflowProfile[];
};

export { buildUniversalExecutionReviewStableKey as buildResearchWorkflowProfileStableKey } from "../universal-execution-review-kit";
