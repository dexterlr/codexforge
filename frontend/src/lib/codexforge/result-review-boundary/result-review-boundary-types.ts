import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type ResultReviewBoundaryStatus = "blocked" | "review-only";
export type ResultReviewBoundary = UniversalExecutionReviewPacket & { status: ResultReviewBoundaryStatus };
export type ResultReviewBoundaryBoundary = UniversalExecutionReviewBoundary;
export type ResultReviewBoundaryModel = UniversalExecutionReviewModel & {
  title: "Result review boundary";
  resultReviewBoundaries: ResultReviewBoundary[];
};

export { buildUniversalExecutionReviewStableKey as buildResultReviewBoundaryStableKey } from "../universal-execution-review-kit";
