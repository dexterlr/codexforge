import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type FileWriteApprovalBoundaryStatus = "blocked" | "review-only";
export type FileWriteApprovalBoundary = UniversalExecutionReviewPacket & { status: FileWriteApprovalBoundaryStatus };
export type FileWriteApprovalBoundaryBoundary = UniversalExecutionReviewBoundary;
export type FileWriteApprovalBoundaryModel = UniversalExecutionReviewModel & {
  title: "File write approval boundary";
  fileWriteApprovalBoundaries: FileWriteApprovalBoundary[];
};

export { buildUniversalExecutionReviewStableKey as buildFileWriteApprovalBoundaryStableKey } from "../universal-execution-review-kit";
