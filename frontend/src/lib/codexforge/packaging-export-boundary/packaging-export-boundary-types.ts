import type { UniversalExecutionReviewBoundary, UniversalExecutionReviewModel, UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export type PackagingExportBoundaryStatus = "blocked" | "review-only";
export type PackagingExportBoundary = UniversalExecutionReviewPacket & { status: PackagingExportBoundaryStatus };
export type PackagingExportBoundaryBoundary = UniversalExecutionReviewBoundary;
export type PackagingExportBoundaryModel = UniversalExecutionReviewModel & {
  title: "Packaging export boundary";
  packagingExportBoundaries: PackagingExportBoundary[];
};

export { buildUniversalExecutionReviewStableKey as buildPackagingExportBoundaryStableKey } from "../universal-execution-review-kit";
