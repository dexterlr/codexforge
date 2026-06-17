import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type EvidenceCaptureBoundaryStatus = "blocked" | "review-only";
export type EvidenceCaptureBoundary = UniversalExecutionReviewPacket & { status: EvidenceCaptureBoundaryStatus };
export type EvidenceCaptureBoundaryBoundary = UniversalExecutionReviewBoundary;
export type EvidenceCaptureBoundaryModel = UniversalExecutionReviewModel & {
  title: "Evidence capture boundary";
  evidenceCaptureBoundaries: EvidenceCaptureBoundary[];
};

export { buildUniversalExecutionReviewStableKey as buildEvidenceCaptureBoundaryStableKey } from "../universal-execution-review-kit";
