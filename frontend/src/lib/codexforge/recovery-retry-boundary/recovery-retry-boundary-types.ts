import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type RecoveryRetryBoundaryStatus = "blocked" | "review-only";
export type RecoveryRetryBoundary = UniversalExecutionReviewPacket & { status: RecoveryRetryBoundaryStatus };
export type RecoveryRetryBoundaryBoundary = UniversalExecutionReviewBoundary;
export type RecoveryRetryBoundaryModel = UniversalExecutionReviewModel & {
  title: "Recovery retry boundary";
  recoveryRetryBoundaries: RecoveryRetryBoundary[];
};

export { buildUniversalExecutionReviewStableKey as buildRecoveryRetryBoundaryStableKey } from "../universal-execution-review-kit";
