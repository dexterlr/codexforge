import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type LocalRuntimeApprovalBoundaryStatus = "blocked" | "review-only";
export type LocalRuntimeApprovalBoundary = UniversalExecutionReviewPacket & { status: LocalRuntimeApprovalBoundaryStatus };
export type LocalRuntimeApprovalBoundaryBoundary = UniversalExecutionReviewBoundary;
export type LocalRuntimeApprovalBoundaryModel = UniversalExecutionReviewModel & {
  title: "Local runtime approval boundary";
  localRuntimeApprovalBoundaries: LocalRuntimeApprovalBoundary[];
};

export { buildUniversalExecutionReviewStableKey as buildLocalRuntimeApprovalBoundaryStableKey } from "../universal-execution-review-kit";
